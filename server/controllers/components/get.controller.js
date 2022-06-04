const jwt = require('jsonwebtoken')

const db = require('../../db/export')
const Components = db.schema.components
const Users = db.schema.users


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
  
  const comps = await Components
  .find(findParams)
  .sort({ createdAt: date })
  
  // Get component's creator data for each components
  let components = []
  const tempComps = comps.map(async component => {
    const creator = await Users.findOne({ id: component.creator.id })
    component.creator = {
      id: component.creator.id,
      username: creator ? creator.username : 'Utilisateur supprimé',
      fullname: creator ? creator.fullname : 'Utilisateur supprimé',
      avatarUrl: creator ? creator.avatarUrl : 'https://oasys.ch/wp-content/uploads/2019/03/photo-avatar-profil.png'
    }
    components.push(component)
  })
  await Promise.all(tempComps)
  
  res.status(200).send({ status: 200, components })
}
const getSpecific = async(req, res) => {
  // Return a specific component
  const creator = await Users.findOne({ username: req.params.creator })
  const shortname = req.params.name
  
  const component = await Components.findOne({ 'creator.id': creator.id, shortname })
  if (!component) return res.status(400).send({ status: 400, msg: 'component not found' })
  
  // Set the author's component data
  component.creator = {
    id: creator.id,
    username: creator ? creator.username : 'Utilisateur supprimé',
    fullname: creator ? creator.fullname : 'Utilisateur supprimé',
    avatarUrl: creator ? creator.avatarUrl : 'https://oasys.ch/wp-content/uploads/2019/03/photo-avatar-profil.png'
  }
  
  res.status(200).send({ status: 200, component })
}
const getLiked = async(req, res) => {
  // Return the list of the liked user's components
  const usernameQuery = req.query.username
  
  if (!usernameQuery) return res.status(400).send({ status: 400, error: 'username not provided in query' })
  
  const user = await Users.findOne({ username: usernameQuery })
  // Get all liked components
  let components = []
  const tempLiked = user.likedComponents.map(async componentId => {
    const comp = await Components.findOne({ id: componentId })
    
    if (comp) {
      // Set the creator's component data
      const creator = await Users.findOne({ id: comp.creator.id })
      comp.creator = {
        id: comp.creator.id,
        username: creator ? creator.username : 'Utilisateur supprimé',
        fullname: creator ? creator.fullname : 'Utilisateur supprimé',
        avatarUrl: creator ? creator.avatarUrl : 'https://oasys.ch/wp-content/uploads/2019/03/photo-avatar-profil.png'
      }
      components.push(comp)
    } 
  })
  await Promise.all(tempLiked)
  
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