const transporter = require('../transporter')

module.exports = () => {
  const options = {
    from: process.env.MAIL_GENELY,
    to: process.env.MAIL_ADMIN,
    subject: 'Genely - Réinitialisation du mot de passe',
    html: '<p>Cliquez ici pour réinitialiser votre mot de passe</p>'
  }
  transporter.sendMail(options, (err, info) => { if (err) console.log(err) })
}