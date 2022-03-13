const express = require('express')
const router = express.Router()
const mongoose = require('mongoose');
const authenticateToken = require('../middlewares/token/authenticateToken');

const upload = require('../middlewares/imgUpload')
const imgController = require('../controllers/uploads/upload.controller')


router.post('/', authenticateToken, upload.array('files'), imgController.uploadFiles)
router.get('/image/:date/:filename', imgController.getImage)
router.get('/file/:date/:filename', imgController.getFile)

module.exports = router