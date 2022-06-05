const transporter = require('../transporter')
const template = require('../models/signup')


module.exports = to => {
  const options = {
    from: process.env.MAIL_GENELY,
    to,
    subject: 'Bienvenu sur Genely !',
    html: template()
  }
  transporter.sendMail(options, (err, info) => { if (err) console.log(err) })
}