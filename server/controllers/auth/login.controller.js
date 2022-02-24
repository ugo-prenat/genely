const bcrypt = require('bcrypt')

const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

const generateAccessToken = require('../../middlewares/token/generateToken')

const db = require('../../db/export')
const Users = db.schema.users

const manuallyLogin = async (req, res) => {
  // Login manually
  const data = req.body
  const email = data.email
  const user = await Users.findOne({ email })
  
  if (!user) {
    return res.status(400).send({ status: 400, error: { input: 'email', msg: 'Cet email n\'est rattaché à aucun compte' }})
  }
  else if (user.isAuthWithGoogle) {
    return res.status(400).send({ status: 400, error: { input: 'email', msg: 'Connectez-vous avec Google' }})
  }
  // Check if the given password is correct
  else if (!bcrypt.compareSync(data.password, user.password)) {
    return res.status(400).send({ status: 400, error: { input: 'password', msg: 'mot de passe incorrect' }})
  }

  const jwtToken = generateAccessToken(user)
  res.status(200).send({ status: 200, token: jwtToken })
}

const googleLogin = async (req, res) => {
  // Login with Google
  const { token } = req.body
  
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID
  })
  const { email } = ticket.getPayload()
  
  // Check if user exists
  const user = await Users.findOne({ email })
  if (!user) {
    return res.status(400).send({ status: 400, msg: 'Aucun compte n\'est rattaché à cet email' })
  } 
  const jwtToken = generateAccessToken(user)
  res.status(200).send({ status: 200, token: jwtToken })
}

module.exports = { googleLogin, manuallyLogin }