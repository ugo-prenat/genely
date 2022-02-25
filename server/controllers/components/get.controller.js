const db = require('../../db/export')
const Components = db.schema.components

module.exports = async(req, res) => {
  // Return a list of components
  const filtersQuery = req.query.filters
  const dateQuery = req.query.date
  
  
  if (filtersQuery) {
    const filters = filtersQuery.toLowerCase().split(',')
    //const components = await Components.find({ filters: { $all: filters } })
    //const components = await Components.find({ filters: { $in: filters } })
    components.filter(component => (component.filters.includes(filters)))
  }
  if (dateQuery) {
    const date = dateQuery === 'asc' ? 1 : -1
    const components = await Components.find().sort({created_at: date})
    
    res.status(200).send({ status: 200, data: components })
  }
}