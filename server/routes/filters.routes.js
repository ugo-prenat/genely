const express = require('express')
const router = express.Router()

const db = require('../db/export')
const Filters = db.schema.filters
const Comp = db.schema.components

const authenticateToken = require('../middlewares/token/authenticateToken')

router.get('/', async(req, res) => {
  // Return all filters
  const techFilters = (await Filters.find({ type: 'technology' }))
  .map(filter => ({ name: filter.name, type: filter.type, lowercase: filter.lowercase }))
  
  const categoryFilters = (await Filters.find({ type: 'category' }))
  .map(filter => ({ name: filter.name, type: filter.type, lowercase: filter.lowercase }))
  
  res.status(200).send({ status: 200, techFilters, categoryFilters })
})
router.post('/', authenticateToken, async(req, res) => {
  // Create a filter
  const data = req.body
  if (!req.user.isAdmin) {
    return res.status(401).send({ status: 401, msg: 'Only admins can create filters' })
  }
  
  const newFilter = new Filters({ name: data.name, type: data.type })
  newFilter.save(() => {
    res.status(200).send({ status: 200, msg: 'Filter created' })
  })
})

module.exports = router