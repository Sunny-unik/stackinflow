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

router.post('/check-login', checkLogin);
router.post('/valid-dname', validEmail);
router.post('/valid-email', validDname);
router.post('/send-otp-email', sendOtpEmail);
router.post('/update-user-point', updateUserPoint);
router.post('/update-user-details', updateUserDetails);
router.post('/update-user', updateUser);
router.post('/update-password', updatePassword);
router.post('/create-user', createUser);
router.post('/user-by-userdname', userByUserdname);
router.post('/list-user', listUser);

module.exports = router;
