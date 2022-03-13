require('dotenv').config()
const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const Grid = require('gridfs-stream')

const authenticateToken = require('../middlewares/token/authenticateToken')
const componentController = require('../controllers/components/export.controller')

const upload = require('../middlewares/upload')


/* let gfs;
const connection = mongoose.connection;
connection.once('open', () => {
  gfs = Grid(connection.db, mongoose.mongo);
  gfs.collection("photos");
}); */

const connect = mongoose.createConnection(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

let gfs;
connect.once('open', () => {
  gfs = new mongoose.mongo.GridFSBucket(connect.db, { bucketName: 'images' })
})

router.post('/', authenticateToken, componentController.create)

router.post('/testfiles', authenticateToken, upload.single('file'), async (req, res) => {
  // Upload files test
  /* const file = req.file
  if (file === undefined) return res.status(400).send({ status: 400, msg: 'Aucun fichier trouvé' })
  const imgUrl = `http://localhost:4000/components/${file.filename}`
  res.status(200).send({ status: 200, img: imgUrl }) */
  
  console.log(req.body);
  
  let newImage = {
    caption: req.body.caption,
    filename: req.file.filename,
    fileId: req.file.id,
  }
  console.log(newImage);

  res.status(200).send({ status: 200, img: newImage })
})

router.get("/:filename", async (req, res) => {
  /* try {
    const file = await gfs.files.findOne({ filename: req.params.filename });
    console.log(file);
    const readStream = gfs.createReadStream(file.filename);
    readStream.pipe(res);
  } catch (error) {
    //console.log(error);
    res.send("not found");
  } */
  gfs.find({ filename: req.params.filename }).toArray((err, files) => {
    if (!files[0] || files.length === 0) {
        return res.status(200).json({
            success: false,
            message: 'No files available',
        });
    }

    if (files[0].contentType === 'image/jpeg' || files[0].contentType === 'image/png' || files[0].contentType === 'image/svg+xml') {
        // render image to browser
        gfs.openDownloadStreamByName(req.params.filename).pipe(res);
    } else {
        res.status(404).json({
            err: 'Not an image',
        });
    }
});
});

router.get('/', componentController.get)


module.exports = router