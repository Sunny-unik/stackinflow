const express = require('express');
const {
  validDname,
  validEmail,
  sendOtpEmail,
  updateUserDetails,
  updateUserProfile,
  updatePassword,
  listUser,
  userByUserdname,
  createUser,
  checkLogin,
  updateUserPoint,
} = require('../controllers/userController');

const router = express.Router();

router.get('/list', listUser);
router.get('/', userByUserdname);
router.get('/login', checkLogin);
router.get('/dname', validDname);
router.get('/email', validEmail);
router.get('/otp-mail', sendOtpEmail);
router.put('/points', updateUserPoint);
router.put('/details', updateUserDetails);
router.put('/', updateUserProfile);
router.put('/password', updatePassword);
router.post('/', createUser);

module.exports = router;
