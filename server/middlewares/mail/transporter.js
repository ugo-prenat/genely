require('dotenv').config()
const nodemailer = require('nodemailer')

module.exports = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.MAIL_GENELY,
    pass: process.env.MAIL_APP_PASSWORD
  }
})