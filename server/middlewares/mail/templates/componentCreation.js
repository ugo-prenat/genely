const transporter = require('../transporter')
const template = require('../models/componentCreation')

module.exports = (compUrl, username) => {
  const options = {
    from: process.env.MAIL_GENELY,
    to: process.env.MAIL_ADMIN,
    subject: 'Genely - Nouveau composant créé',
    html: template(compUrl, username)
  }
  transporter.sendMail(options, (err, info) => { if (err) console.log(err) })
}