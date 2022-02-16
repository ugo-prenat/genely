const transporter = require('../transporter')
const domain = process.env.APP_DOMAIN

module.exports = (to, token) => {
  const options = {
    from: process.env.MAIL_GENELY,
    to,
    subject: 'Genely - Réinitialisation du mot de passe',
    html: `<p>Cliquez ici pour réinitialiser votre mot de passe <a href="${domain}/reset/password/${token}">lien</a></p>`
  }
  transporter.sendMail(options, (err, info) => { if (err) console.log(err) })
}