const transporter = require('../transporter')

module.exports = () => {
  const options = {
    from: process.env.MAIL_GENELY,
    to: process.env.MAIL_ADMIN,
    subject: 'Genely - Confirmation de réinitialisation du mot de passe',
    html: '<p>Votre mot de passe à bien été modifié</p>'
  }
  transporter.sendMail(options, (err, info) => { if (err) console.log(err) })
}