const bcrypt = require('bcrypt')
const saltRounds = 10;

const db = require('../../db/export')
const Users = db.schema.users

const mailer = require('../../middlewares/mail/export')
const generateAccessToken = require('../../middlewares/token/generateToken')

const update = async(req, res) => {
  // Update a user's profil
  let user
  const data = req.body
  
  if (data.password) {
    // If it's a password update, hash the new password before update
    const newPassword = bcrypt.hashSync(req.body.password, saltRounds)
    user = await Users.findByIdAndUpdate(req.user._id, { password: newPassword })
  } else {
    user = await Users.findByIdAndUpdate(req.user._id, data)
  }
  
  user.save(() => {
    res.status(200).send({ status: 200, msg: 'Modification effectuée'})
  })
}
const resetPassword = async(req, res) => {
  // Send an email with a reset password link
  const email = req.body.email
  const user = await Users.findOne({ email })
  
  if (!user) {
    return res.status(400).send({ status: 400, error: { input: 'email', msg: 'Cet email n\'est rattaché à aucun compte' }})
  } else if (user.isAuthWithGoogle) {
    return res.status(400).send({ status: 400, error: { input: 'email', msg: 'Connectez-vous avec Google' }})
  }
  
  mailer.send.resetPassword(email, generateAccessToken(user))
  return res.status(200).send({ status: 200, msg: 'Email sent to ' + email })
}
const get = async(req, res) => {
  // Return a specific usern 
  const username = req.params.username
  const user = await Users.findOne({ username })
  
  if (!user) return res.status(404).send({ status: 404, error: 'User not found'})
  
  return res.status(200).send({ status: 200, user })
}

module.exports = { update, resetPassword, get }