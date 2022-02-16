const transporter = require('../transporter')

module.exports = () => {
  const options = {
    from: process.env.MAIL_GENELY,
    to: process.env.MAIL_ADMIN,
    subject: 'Genely - Nouveau composant créé',
    html: '<p>Salut admin, un nouveau composant vient d\'être créé</p>'
  }
  transporter.sendMail(options, (err, info) => { if (err) console.log(err) })
}