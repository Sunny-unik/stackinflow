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
  updateUserPoint,
} = require('../controllers/userController');

const router = express.Router();

router.get('/list', listUser);
router.get('/by-dname', userByUserdname);
router.get('/login', checkLogin);
router.get('/dname', validEmail);
router.get('/email', validDname);
router.get('/otp-email', sendOtpEmail);
router.put('/points', updateUserPoint);
router.put('/details', updateUserDetails);
router.put('/', updateUser);
router.put('/password', updatePassword);
router.post('/register', createUser);

module.exports = router;
