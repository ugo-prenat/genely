const jwt = require('jsonwebtoken')

module.exports = user => {
  return jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_SECRET)
}