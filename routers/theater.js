const express = require('express');
const Theater = require('../models/Theater');

const router = express.Router();

const form = {
  type: 'Feature',
  geometry: { type: 'Point', coordinates: [-93.24565, 44.85466] },
  properties: { address: '340 W Market, Bloomington' },
};
const s = {
  location: {
    address: {
      street1: '340 W Market',
      city: 'Bloomington',
      state: 'MN',
      zipcode: 55425,
    },
    geo: { type: 'Point', coordinates: [-93.24565, 44.85466] },
  },
  _id: '59a47286cfa9a3a73e51e72c',
  theaterId: 1000,
};

function convertGeo(theater) {
  if (theater.location.address.zipcode === undefined)
    theater.location.address.zipcode = '';
  return {
    type: 'Feature',
    geometry: theater.location.geo,
    properties: { address: theater.location.address },
    _id: theater._id,
  };
}

router.get('/', async (req, res) => {
  let data = await Theater.find().limit(5);
  res.json(data);
});

router.get('/geojson', async (req, res) => {
  let data = await Theater.find();
  data = data.map(convertGeo);
  res.json({
    type: 'FeatureCollection',
    features: data,
  });
});

router.delete('/geojson/:_id', (req, res) => {
  const _id = req.params._id;
  Theater.findByIdAndDelete(_id, function (err, data) {
    if (err) {
      console.log(err.message);
      res.end();
      return;
    }
    console.log(data);
    res.json(data);
  });
});

module.exports = router;
