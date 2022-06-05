const resetPassword = require('./templates/resetPassword')
const signup = require('./templates/signup')
const adminSignup = require('./templates/adminSignup')
const componentCreation = require('./templates/componentCreation')


module.exports = {
  send: { resetPassword, signup },
  sendAdmin: { componentCreation, adminSignup }
}