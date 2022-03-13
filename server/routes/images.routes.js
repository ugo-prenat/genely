const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')


// Initiation of gridfs stream
const connect = mongoose.createConnection(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
let gfs;
connect.once('open', () => {
  gfs = new mongoose.mongo.GridFSBucket(connect.db, { bucketName: 'images' })
})


router.get('/:date/:filename', (req, res) => {
  // Return an image to render it in browser
  gfs.find({ filename: req.params.filename }).toArray((err, files) => {
    
    if (!files[0] || files.length === 0) {
      return res.status(400).send({ status: 400, msg: 'No files available' })
    }

    if (
      files[0].contentType === 'image/jpeg' ||
      files[0].contentType === 'image/png' ||
      files[0].contentType === 'image/svg+xml'
    ) {
      gfs.openDownloadStreamByName(req.params.filename).pipe(res);
    }
    else {
      res.status(400).send({ status: 400,  msg: 'Requested file isn\'t an image' })
    }
  })
})

module.exports = router