require('dotenv').config()
const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')

const authenticateToken = require('../middlewares/token/authenticateToken')
const componentController = require('../controllers/components/export.controller')

const upload = require('../middlewares/imgUpload')


router.post('/', authenticateToken, componentController.create)

router.post( '/testfiles', authenticateToken, upload.array('files'), async (req, res) => {
  // Upload files test
  console.log(req.files);
  /* req.files.forEach(file => {
    const newImage = {
      filename: file.filename,
      id: file.id,
      url: `/uploads/${Date.now()}/${file.filename}`
    }
  })*/
  res.status(200).send({ status: 200, msg: req.files })
})

router.get('/', componentController.get)


module.exports = router