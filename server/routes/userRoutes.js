const bodyParser = require('body-parser');
const express = require('express');
const {
  validDname,
  validEmail,
  sendOtpEmail,
  updateUserDetails,
  updateUser,
  updatePassword,
  listUser,
  userByUserdname,
  createUser,
  checkLogin,
} = require('../controllers/userController');

const router = express.Router();

router.post('/check-login', bodyParser.json(), checkLogin);
router.post('/valid-dname', bodyParser.json(), validEmail);
router.post('/valid-email', bodyParser.json(), validDname);
router.post('/send-otp-email', bodyParser.json(), sendOtpEmail);
router.post('/update-user-point', bodyParser.json(), updateUserPoint);
router.post('/update-user-details', bodyParser.json(), updateUserDetails);
router.post('/update-user', bodyParser.json(), updateUser);
router.post('/update-password', bodyParser.json(), updatePassword);
router.post('/create-user', bodyParser.json(), createUser);
router.post('/user-by-userdname', bodyParser.json(), userByUserdname);
router.post('/list-user', bodyParser.json(), listUser);

module.exports = router;
