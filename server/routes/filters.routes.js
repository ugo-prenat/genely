const express = require('express')
const router = express.Router()

const db = require('../db/export')
const Filters = db.schema.filters

const authenticateToken = require('../middlewares/token/authenticateToken')

router.get('/', async(req, res) => {
  // Return all filters
  const filters = (await Filters.find()).map(filter => ({ name: filter.name, type: filter.type }))
  res.status(200).send({ status: 200, filters })
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