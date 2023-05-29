const path = require('path');
const multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Corrected parentheses placement
  },
  filename: function (req, file, cb) {
    let ext = path.extname(file.originalname);
    cb(null, file.originalname );
  },
});

var upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    if (
      file.mimetype == 'image/png' ||
      file.mimetype == 'image/jpeg' // Corrected 'image/png' repeated
    ) {
      callback(null, true);
    } else {
      console.log('Invalid Format');
      callback(null, false);
    }
  },
});

module.exports = upload;
