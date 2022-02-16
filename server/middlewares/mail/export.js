const componentCreation = require('./templates/componentCreation')
const confirmResetPassword = require('./templates/confirmResetPassword')
const resetPassword = require('./templates/resetPassword')
const signup = require('./templates/signup')

module.exports = {
  send: { componentCreation, confirmResetPassword, resetPassword, signup }
}