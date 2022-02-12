require('dotenv').config()
const jwt = require('jsonwebtoken')
const express = require('express')
const router = express.Router()

const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

const db = require('../db/export')
const Users = db.schema.users

router.get('/', (req, res) => {
  res.status(200).send({ msg: 'auth' })
})
router.post('/login/google', async (req, res) => {
  // Login with Google
  const { token } = req.body
  
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID
  })
  const { email } = ticket.getPayload()
  
  
  res.status(200).send({ status: 200, data: email })
})
router.post('/signup/google', async(req, res) => {
  // Signup with Google
  const { token } = req.body
  
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID
  })
  
  // Check if email already exists
  const { name, email, picture } = ticket.getPayload()
  const isEmailExists = await Users.findOne({ email })
  
  if (isEmailExists) res.status(400).send({ status: 400, msg: 'Un compte est déjà rattaché à cette adresse mail' })
  else {
    const userId = await getNewId()
    const username = await getUsername(ticket.getPayload(), userId)
    
    
    const user = new Users({
      id: userId,
      username,
      fullName: name,
      email,
      password: undefined,
      avatarUrl: picture,
      isAdmin: false,
      publicComponents: 0,
      privateComponents: 0
    })
    
    const jwtToken = generateAccessToken(user)
    
    await user.save(err => {
      if (err) res.status(400).send({ status: 400, msg: err })
      else res.status(200).send({ status: 200, token: jwtToken })
    })
  }
})


/* FUNCTIONS */
async function getNewId() {
  // Return the highest id in users list, more 1
  const users = await Users.find()
  
  const highestId = Math.max.apply(Math, users.map(user => { return user.id; }))
  return highestId + 1
}
async function getUsername(data, userId) {
  // Get user's data from Google token
  const firstName = data.given_name.toLowerCase()
  const lastName = data.family_name ? data.family_name.toLowerCase() : false

  let username = firstName
  if (lastName) username += lastName.length < 10 ? `-${lastName}` : ''
  
  // Check if the generated username already exists
  const user = await Users.findOne({ username })
  if (user) {
    // If a user is find, regenerate a username
    username = `${firstName}-${userId}`
  }
  
  return username
}
function generateAccessToken(user) {
  return jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_SECRET)
}

module.exports = router