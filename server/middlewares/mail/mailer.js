const test = () => {
  const options = {
    from: process.env.MAIL_GENELY,
    to: process.env.MAIL_ADMIN,
    subject: 'Genely test',
    html: '<p>Test 01</p>'
  }
  transporter.sendMail(options, (err, info) => { if (err) console.log(err) })
}

//module.exports = { test }