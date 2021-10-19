const protectedLocal = (req, res, next) => {
  if (req.params._id == '615dd193fe931672d6fc97f9') {
    res.json({ success: false, message: 'this location is protected' });
    console.log('protected');
  } else {
    next();
  }
};

module.exports = protectedLocal;
