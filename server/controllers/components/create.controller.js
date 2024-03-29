const db = require('../../db/export')
const Components = db.schema.components
const Users = db.schema.users
const mailer = require('../../middlewares/mail/export')

module.exports = async(req, res) => {
  // Create a component
  const user = await Users.findOne({ id: req.user.id })
  const step = parseInt(req.query.step)
  const data = req.body
  
  if (step === 1) return await checkStep1(res, user, data)
  
  const componentId = await getComponentId()
  
  const newComponent = new Components({
    id: componentId,
    url: `/${user.username}/${data.shortname}`,
    shortname: data.shortname,
    fullname: data.fullname,
    description: data.description,
    creator: { id: user.id },
    isPublic: data.visibility === 'public',
    tree: data.tree,
    filters: data.filters,
    illustrations: data.illustrations
  })
  
  // Update the user's profile
  if (data.visibility === 'public') user.publicComponents++
  else user.privateComponents++
  
  await user.save()
  newComponent.save(() => {
    mailer.sendAdmin.componentCreation(newComponent.url, user.fullname)
    res.status(200).send({ status: 200, msg: `Component ${componentId} created` })
  })
}




/* FUNCTIONS */
async function getComponentId() {
  // Return the highest id in components list, more 1
  const components = await Components.find()
  
  const highestId = Math.max.apply(Math, components.map(component => { return component.id; }))
  return highestId === -Infinity ? 0 : highestId + 1
}
async function checkStep1(res, user, data) {
  // Check the first step of the form : component's fullname and shortname
  const userComponents = await Components.find({ 'creator.id': user.id })
  
  const fullnameComponents = userComponents.filter(component =>{
    return(component.fullname.toLowerCase() === data.fullname.toLowerCase())
  })
  const shortnameComponents = userComponents.filter(component =>
    component.shortname === data.shortname
  )
  
  if (fullnameComponents.length > 0) {
    return res.status(400).send({ status: 400, error: { input: 'fullname', msg: 'Ce nom est déjà pris' }})
  } 
  else if (shortnameComponents.length > 0) {
    return res.status(400).send({ status: 400, error: { input: 'shortname', msg: 'Ce nom est déjà pris' }})
  }
  
  return res.status(200).send({ status: 200, msg: 'Step 1 checked' })
}