require('dotenv').config()
const express = require('express')
const router = express.Router()

const authenticateToken = require('../middlewares/token/authenticateToken')
const componentController = require('../controllers/components/export.controller')


router.post('/', authenticateToken, componentController.create)
router.get('/', componentController.get)


module.exports = router