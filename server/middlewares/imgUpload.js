const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");

// Gridfs storge system
const storage = new GridFsStorage({
  url: process.env.DB_URI,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const filename = file.originalname.replace(' ', '-')
    return { bucketName: 'images', filename }
  },
})

module.exports = multer({ storage });