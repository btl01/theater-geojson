const admin = require('firebase-admin')

const serverAccount = require(process.cwd() + '/theater-geo.json')
admin.initializeApp({
  credential: admin.credential.cert(serverAccount),
})

const checkAuthenticated = async (req, res, next) => {
  if (req.headers.authorization) {
    try {
      const authToken = req.headers.authorization.split(' ')[1]
      await admin.auth().verifyIdToken(authToken)
      // console.log(idToken)
      next()
    } catch (error) {
      res.status(401).send({ success: false, message: 'You are not authorized to make this request' })
    }
  } else {
    res.status(401).send({ success: false, message: 'You are not authorized to make this request' })
  }
}

module.exports = checkAuthenticated
