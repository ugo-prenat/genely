const bcrypt = require('bcrypt')
const saltRounds = 10;

const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

const db = require('../../db/export')
const Users = db.schema.users

const mailer = require('../../middlewares/mail/export')
const generateAccessToken = require('../../middlewares/token/generateToken')


const manuallySignup = async (req, res) => {
  // Signup manually
  const data = req.body
  const email = data.email.toLowerCase()
  const username = data.username.toLowerCase()
  
  if (await Users.findOne({ email })) {
    return res.status(400).send({ status: 400, error: { input: 'email', msg: 'Cet email est rattaché à un compte' }})
  }
  if (await Users.findOne({ username })) {
    return res.status(400).send({ status: 400, error: { input: 'username', msg: 'Nom d\'utilisateur déjà pris' }})
  }
  
  const fullName = data.firstname + ' ' + data.lastname
  const password = await bcrypt.hash(data.password, saltRounds)
  const user = new Users({
    id: await getNewId(),
    username,
    fullName,
    email,
    password,
    isAuthWithGoogle: false,
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
}

const googleSignup = async(req, res) => {
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
    return res.status(400).send({ status: 400, msg: 'Un compte est déjà rattaché à cette adresse mail' })
  }
  const userId = await getNewId()
  const username = await getUsername(ticket.getPayload(), userId)
  
  const user = new Users({
    id: userId,
    username,
    fullName: name,
    email,
    password: null,
    isAuthWithGoogle: true,
    avatarUrl: picture,
    isAdmin: false,
    publicComponents: 0,
    privateComponents: 0
  })
  
  const jwtToken = generateAccessToken(user)
  
  await user.save(err => {
    if (err) res.status(401).send({ status: 400, error: { msg: err }})
    else {
      mailer.send.signup(email)
      res.status(200).send({ status: 200, token: jwtToken })
    }
  })
}

/* FUNCTIONS */
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
async function getNewId() {
  // Return the highest id in users list, more 1
  const users = await Users.find()
  
  const highestId = Math.max.apply(Math, users.map(user => { return user.id; }))
  return highestId === -Infinity ? 0 : highestId + 1
}


module.exports = { manuallySignup, googleSignup }