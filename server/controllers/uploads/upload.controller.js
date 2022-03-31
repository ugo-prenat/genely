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


const uploadFiles = async (req, res) => {
  // Save files in DB
  let filesUrl = []
  req.files.map(file => {
    const isImage = checkIsImage(file.mimetype)

    filesUrl.push({
      url: `/uploads/${isImage ? 'image' : 'file'}/${encodeURI(file.urlName)}`
    })
  })
  
  res.status(200).send({ status: 200, data: filesUrl })
}
const getImage = async (req, res) => {
  // Return a specific image to render it in browser
  gfs.find({ filename: req.params.filename }).toArray((err, files) => {
    
    if (!files[0] || files.length === 0) {
      return res.status(400).send('this file does not exist' )
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
}
const getFile = async (req, res) => {
  // Return a specific file
  gfs.find({ filename: req.params.filename }).toArray((err, files) => {
    if (!files[0] || files.length === 0) {
      return res.status(400).send('error')
    }
    gfs.openDownloadStreamByName(req.params.filename).pipe(res)
  })
}


/* FUNCTIONS */
function checkIsImage(fileType) {
  // Check if the given file type is an image
  if (fileType.split('/')[0] === 'image') return true
  return false
}

module.exports = { uploadFiles, getImage, getFile }