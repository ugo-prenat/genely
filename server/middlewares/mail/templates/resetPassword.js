const transporter = require('../transporter')
const template = require('../models/resetPassword')

module.exports = (to, token) => {
  const options = {
    from: process.env.MAIL_GENELY,
    to,
    subject: 'Genely - Réinitialisation du mot de passe',
    html: template(token)
  }
  transporter.sendMail(options, (err, info) => { if (err) console.log(err) })
}