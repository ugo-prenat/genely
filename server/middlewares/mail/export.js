const transporter = require('./transporter')

module.exports = {
  componentCreation: require('./templates/componentCreation'),
  confirmResetPassword: require('./templates/confirmResetPassword'),
  resetPassword: require('./templates/resetPassword'),
  signup: require('./templates/signup')
}