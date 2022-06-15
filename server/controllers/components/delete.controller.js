const db = require('../../db/export')
const Components = db.schema.components
const Users = db.schema.users

module.exports = async(req, res) => {
  // Delete a component
  const id = req.params.id
  const component = await Components.findOne({ id })
  await component.delete()
  
  // Update total components count of user
  const user = await Users.findOne({ id: component.creator.id })
  
  if (component.isPublic) user.publicComponents--
  else user.privateComponents--
  
  await user.save()
  
  res.status(200).send({ status: 200, msg: `Component ${id} deleted` })
} 