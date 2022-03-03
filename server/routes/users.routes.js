const express = require('express')
const router = express.Router()

const authenticateToken = require('../middlewares/token/authenticateToken')
const userController = require('../controllers/users/users.controller')

router.patch('/', authenticateToken, userController.update)
router.post('/reset/password', userController.resetPassword)

module.exports = router