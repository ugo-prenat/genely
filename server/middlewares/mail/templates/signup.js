const transporter = require('../transporter')

module.exports = () => {
  const options = {
    from: process.env.MAIL_GENELY,
    to: process.env.MAIL_ADMIN,
    subject: 'Genely - Inscription',
    html: '<p>Merci de vous être inscrit sur Genely</p>'
  }
  transporter.sendMail(options, (err, info) => { if (err) console.log(err) })
}