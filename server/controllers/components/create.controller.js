const db = require('../../db/export')
const Components = db.schema.components

module.exports = async(req, res) => {
  // Create a component
  const user = req.user
  const step = parseInt(req.query.step)
  const data = req.body
  
  if (step === 1) return await checkStep1(res, user, data)
  
  const newComponent = new Components({
    id: await getComponentId(),
    shortname: data.shortname,
    fullname: data.fullname,
    creator: {
      id: user.id,
      username: user.username,
      avatarUrl: user.avatarUrl
    },
    isPublic: data.visibility === 'public',
    tree: data.tree,
    technologies: {
      framework: {
        name: 'React',
        icon: 'icon'
      },
      css: {
        name: 'Sass',
        icon: 'icon'
      }
    },
    filters: [ 'React', 'Sass' ]
  })
  
  console.log('new component created', newComponent);
  //res.status(200).send({ status: 200, msg: `Component ${newComponent.id} created` })
  
  /* newComponent.save(() => {
    res.status(200).send({ status: 200, msg: `Component ${newComponent.id} created` })
  }) */
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
    
  const fullnameComponents = userComponents.filter(component =>
    component.fullname.toLowerCase() === data.fullname.toLowerCase()
  )
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