const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const shortId = require('short-uuid');

// Gridfs storge system
const storage = new GridFsStorage({
  url: process.env.DB_URI,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const fileId = shortId.generate()
    const filename = `${fileId}-${file.originalname.replace(' ', '-')}`
    file.urlName = filename
    return { bucketName: 'images', filename }
  },
})

module.exports = multer({ storage });