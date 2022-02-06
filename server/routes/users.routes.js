const express = require('express')
const router = express.Router()

const db = require('../db/export')
const Users = db.schema.users

router.get('/', (req, res) => {
  res.status(200).send({ msg: 'users' })
})

module.exports = router