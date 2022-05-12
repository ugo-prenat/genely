const jwt = require('jsonwebtoken')

const db = require('../../db/export')
const Components = db.schema.components


const getAll = async(req, res) => {
  // Return a list of components
  
  // Query params gestion
  const findParams = {}
  
  const filtersQuery = req.query.filters
  if (filtersQuery) {
    findParams.$and = filtersQuery
      .split(',')
      .map(filter => {return({ filters: { $elemMatch: { lowercase: filter.toLowerCase() }}})})
  }
  
  const searchQuery = req.query.search
  if (searchQuery) {
    findParams.$or = [
      { fullname: { $regex: searchQuery, $options: "i" } },
      { shortname: { $regex: searchQuery, $options: "i" } }
    ]
  }
  
  const dateQuery = req.query.date
  const date = dateQuery && dateQuery === 'asc' ? 1 : -1

  const usernameQuery = req.query.username
  const isUserAuth = checkIsUserAuth(req.query.visibility, usernameQuery, req.headers.authorization)
  
  
  if (usernameQuery) findParams['creator.username'] = usernameQuery.toLowerCase()
  if (!isUserAuth) findParams.isPublic = true
  
  const components = await Components
  .find(findParams)
  .sort({ createdAt: date })
  
  res.status(200).send({ status: 200, components })
}
const getSpecific = async(req, res) => {
  // Return a specific component
  const creator = req.params.creator
  const shortname = req.params.name
  
  const component = await Components.findOne({ 'creator.username': creator, shortname })
  if (!component) return res.status(400).send({ status: 400, msg: 'component not found' })
  res.status(200).send({ status: 200, component })
}
const getLiked = async(req, res) => {
  // Return the list of the liked user's components
  const usernameQuery = req.query.username
  
  if (!usernameQuery) return res.status(400).send({ status: 400, error: 'username not provided in query' })
  
  const components = await Components.find({ 'creator.username': usernameQuery })
  res.status(200).send({ status: 200, components })
}




/* FUNCTIONS */
function checkIsUserAuth(arg, username, authHeader) {
  // Check if the given token match to user's username attached to it
  let toReturn = false
  const token = authHeader && authHeader.split(' ')[1]
  
  
  if (arg === 'all' && token) {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (user?.username === username) toReturn = true
    })
  }
  return toReturn
}

module.exports = { getAll, getSpecific, getLiked }