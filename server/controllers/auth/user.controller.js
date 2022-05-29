const db = require('../../db/export')
const Users = db.schema.users

module.exports = async(req, res) => {
  // Return user based on his authentication token
  const user = await Users.findOne({ username: req.user.username })
  res.status(200).send({ status: 200, user })
}