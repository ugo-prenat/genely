require('dotenv').config()

const express = require('express')
const router = express.Router()

const authenticateToken = require('../middlewares/token/authenticateToken')
const authController = require('../controllers/auth/export.controller')


router.get('/', authenticateToken, authController.user)

router.post('/login', authController.login.manuallyLogin)
router.post('/login/google', authController.login.googleLogin)

router.post('/signup', authController.signup.manuallySignup)
router.post('/signup/google', authController.signup.googleSignup)


module.exports = router