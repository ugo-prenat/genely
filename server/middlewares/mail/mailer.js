require('dotenv').config()
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  /* host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  requireTLS: true, */
  auth: {
    user: process.env.MAIL_ADMIN,
    pass: process.env.MAIL_APP_PASSWORD
  }
})

const test = () => {
  const options = {
    from: process.env.MAIL_GENELY,
    to: process.env.MAIL_ADMIN,
    subject: 'Genely test',
    html: '<p>Test 01</p>'
  }
  transporter.sendMail(options, (err, info) => { if (err) console.log(err); else console.log(info) })
}

test()
//module.exports = { test }