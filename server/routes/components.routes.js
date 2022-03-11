const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const Grid = require('gridfs-stream')

const authenticateToken = require('../middlewares/token/authenticateToken')
const componentController = require('../controllers/components/export.controller')

const upload = require('../middlewares/upload')


let gfs;
const conn = mongoose.connection;
conn.once("open", () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("photos");
});


router.post('/', authenticateToken, componentController.create)
router.post('/testfiles', authenticateToken, upload.single("file"), async (req, res) => {
  // Upload files test
  const file = req.file
  
  if (file === undefined) return res.status(400).send({ status: 400, msg: 'Aucun fichier trouvé' })
  
  const imgUrl = `http://localhost:4000/components/${file.filename}`

  res.status(200).send({ status: 200, img: imgUrl })
})
router.get("/:filename", async (req, res) => {
  try {
    const file = await gfs.files.findOne({ filename: req.params.filename });
    console.log(file);
    const readStream = gfs.createReadStream(file.filename);
    readStream.pipe(res);
  } catch (error) {
    //console.log(error);
    res.send("not found");
  }
});

router.get('/', componentController.get)


module.exports = router