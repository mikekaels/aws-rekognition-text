const multer = require('multer')

var uploader = multer().single('image')

module.exports = uploader;