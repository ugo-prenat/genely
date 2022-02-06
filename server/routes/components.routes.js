const express = require('express')
const router = express.Router()

const db = require('../db/export')
const Components = db.schema.components

router.get('/', (req, res) => {
  res.status(200).send({ msg: 'components' })
})

module.exports = router