const express = require('express');

const Theater = require('../models/Theater');
const protectedLocal = require("../middlewares/protectedLocal");
const { convertGeo, revertGeo } = require('../utils/convertGeo');

const router = express.Router();

// @route GET api/theater
// @desc get all theater info
// @access Public
router.get('/', async (req, res) => {
  let data = await Theater.find();
  res.json(data);
});

// @route GET api/theater/geojson
// @desc get theater geojson ALL or LIMIT
// @ access Public
router.get('/geojson', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit);
    let data = limit ? await Theater.find().limit(limit) : await Theater.find();
    data = data.map(convertGeo);
    res.json({
      success: true,
      type: 'FeatureCollection',
      features: data,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

// @route GET api/theater/geojson/area
// @desc get theater geojson by box area
// @ access Public
router.get('/geojson/box', async (req, res) => {
  try {
    const _ne = req.query._ne.split(',').map(x => parseFloat(x));
    const _sw = req.query._sw.split(',').map(x => parseFloat(x));
    let data = await Theater.find({
      'location.geo': { $geoWithin: { $box: [_ne, _sw] } },
    });
    data = data.map(convertGeo);
    res.json({ success: true, type: 'FeatureCollection', features: data });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
});

// @route GET api/theater/geojson
// @desc get theater geojson by ID
// @ access Public
router.get('/geojson/:_id', async (req, res) => {
  try {
    let data = await Theater.findById(req.params._id);
    data = convertGeo(data);
    res.json({
      success: true,
      data,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

// @route POST api/theater/geojson
// @desc post theater geojson
// @ access Public
router.post('/geojson', async (req, res) => {
  try {
    const theater = revertGeo(req.body);
    let data = await Theater.create(theater);
    data = convertGeo(data);
    res.json({ success: true, data });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

// @route PUT api/theater/geojson
// @desc update theater geojson
// @ access Public
router.put('/geojson/:_id', protectedLocal, async (req, res) => {
  try {
    const _id = req.params._id;
    const theater = revertGeo(req.body);
    let data = await Theater.findByIdAndUpdate(_id, theater, { new: true });
    data = convertGeo(data);
    res.json({ success: true, data });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

// @route DELETE api/theater/geojson
// @desc delete theater geojson by ID
// @ access Public
router.delete('/geojson/:_id', protectedLocal, (req, res) => {
  Theater.findByIdAndDelete(req.params._id, function (err, data) {
    if (err) {
      console.log(err.message);
      res.json({ success: false, message: err.message });
      return;
    }
    data = data === null ? data : convertGeo(data);
    res.json({ success: true, data });
  });
});

module.exports = router;
