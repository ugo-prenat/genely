const jwt = require('jsonwebtoken')

const db = require('../../db/export')
const Components = db.schema.components


module.exports = async(req, res) => {
  // Return a list of components
  const filtersQuery = req.query.filters
  const dateQuery = req.query.date
  const date = dateQuery && dateQuery === 'asc' ? 1 : -1
  const usernameQuery = req.query.username
  const isUserAuth = checkIsUserAuth(req.query.visibility, usernameQuery, req.headers.authorization)
  
  const findParams = {}
  if (filtersQuery) findParams.filters = { $in: filtersQuery.toLowerCase().split(',') }
  if (usernameQuery) findParams['creator.username'] = usernameQuery
  if (!isUserAuth) findParams.isPublic = true
  
  const components = await Components
  .find(findParams)
  .sort({ createdAt: date })
  
  console.log(findParams);

  res.status(200).send({ status: 200, components })
}

function checkIsUserAuth(arg, username, authHeader) {
  // Check if the given token match to user's username attached to it
  const token = authHeader && authHeader.split(' ')[1]
  
  if (arg === 'all' && token) {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (user.username === username) return true
      else return
    })
  }
  return false
}