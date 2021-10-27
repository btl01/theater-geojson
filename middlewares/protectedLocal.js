const fs = require('fs')

const protectedLocal = (req, res, next) => {
  fs.readFile(process.cwd() + '/protectedIds.txt', 'utf-8', (err, data) => {
    if (err) next()
    const ids = data.split(/\s+/)
    if (ids.includes(req.params._id)) {
      res.json({ success: false, message: 'this location is protected' })
      console.log('protected')
    } else {
      next()
    }
  })
}

module.exports = protectedLocal
