const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = async (req, res, next) => {
  if (req.method === 'OPTIONS') {
    next()
  }
  try {
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
      res.status(402).json({message: 'Нет авторизации'})
    }
    const decoded = await jwt.verify(token, config.get('jwtSecret'))
    req.user = decoded
    next()
  } catch (e) {
    console.log('(/middleware): ' + e.message);
    res.status(401).json({message: 'Нет авторизации'})
  }
}