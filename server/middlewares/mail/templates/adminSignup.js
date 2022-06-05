const transporter = require('../transporter')
const template = require('../models/adminSignup')


module.exports = user => {
  const options = {
    from: process.env.MAIL_GENELY,
    to: process.env.MAIL_ADMIN,
    subject: 'Genely - Nouveau compte créé',
    html: template(user)
  }
  transporter.sendMail(options, (err, info) => { if (err) console.log(err) })
}