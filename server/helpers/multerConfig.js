const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage(
  {
    destination: (req, file, callback) => {
      callback(null, 'userProfiles');
    },
    filename: (req, file, cb) => {
      const extension = path.extname(file.originalname);
      console.log('Uploading ' + file.fieldname.slice(0, 3) + '-' + Date.now() + extension);
      cb(null, file.fieldname.slice(0, 3) + '-' + Date.now() + extension);
    },
  }
  //   profile-234763458969876.jpg
);

const multerOptions = {
  storage: storage,
  fileFilter: function (req, file, callback) {
    const extension = path.extname(file.originalname);
    const fieldName = file.fieldname;
    if (fieldName == 'profile') {
      if (extension !== '.png' && extension !== '.jpg' && extension !== '.jpeg') {
        return callback(
          new Error(`Only png, jpg, jpeg extension's images are allowed for profile`)
        );
      }
      callback(null, true);
    }
  },
};

const upload = multer(multerOptions).fields([{ name: 'profile', maxCount: 1 }]);
module.exports = upload;
