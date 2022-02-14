require('dotenv').config()

const bcrypt = require('bcrypt')
const saltRounds = 10;

const jwt = require('jsonwebtoken')
const authenticateToken = require('../middlewares/authenticateToken')

const express = require('express')
const router = express.Router()

const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

const db = require('../db/export')
const Users = db.schema.users

router.get('/', authenticateToken, (req, res) => {
  // Return a user based on his authentication token
  res.status(200).send({ status: 200, user: req.user })
})
router.post('/login/google', async (req, res) => {
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
    res.status(400).send({ status: 400, msg: 'Aucun compte n\'est rattaché à cet email' })
    return
  } 
  const jwtToken = generateAccessToken(user)
  res.status(200).send({ status: 200, token: jwtToken })
})
router.post('/login', async (req, res) => {
  // Login manually
  const data = req.body
  const email = data.email
  const user = await Users.findOne({ email })
  
  if (!user || !user.password) {
    return res.status(400).send({ status: 400, error: { input: 'email', msg: 'Cet email n\'est rattaché à aucun compte' }})
  }
  // Check if the given password is correct
  else if (!bcrypt.compareSync(data.password, user.password)) {
    return res.status(400).send({ status: 400, error: { input: 'password', msg: 'mot de passe incorrect' }})
  }

  const jwtToken = generateAccessToken(user)
  res.status(200).send({ status: 200, token: jwtToken })
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
  
  if (isEmailExists) {
    res.status(400).send({ status: 400, msg: 'Un compte est déjà rattaché à cette adresse mail' })
    return
  }
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
    if (err) res.status(401).send({ status: 400, error: { msg: err }})
    else res.status(200).send({ status: 200, token: jwtToken })
  })
  
})
router.post('/signup', async (req, res) => {
  // Signup manually
  const data = req.body
  const email = data.email.toLowerCase()
  const username = data.username.toLowerCase()
  
  if (await Users.findOne({ email })) {
    res.status(400).send({ status: 400, error: { input: 'email', msg: 'Cet email est rattaché à un compte' }})
    return;
  }
  if (await Users.findOne({ username })) {
    res.status(400).send({ status: 400, error: { input: 'username', msg: 'Nom d\'utilisateur déjà pris' }})
    return;
  }
  
  const fullName = data.firstname + ' ' + data.lastname
  const password = await bcrypt.hash(data.password, saltRounds)
  const user = new Users({
    id: await getNewId(),
    username,
    fullName,
    email,
    password,
    avatarUrl: 'https://oasys.ch/wp-content/uploads/2019/03/photo-avatar-profil.png',
    isAdmin: false,
    publicComponents: 0,
    privateComponents: 0
  })
  
  const jwtToken = generateAccessToken(user)
  
  await user.save(err => {
    if (err) res.status(401).send({ status: 401, error: { msg: err }})
    else res.status(200).send({ status: 200, token: jwtToken })
  })
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