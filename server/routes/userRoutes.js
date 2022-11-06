const express = require("express");
const {
  validDname,
  validEmail,
  sendOtpEmail,
  updateUserDetails,
  updateUserProfile,
  updatePassword,
  listUser,
  userById,
  createUser,
  checkLogin,
  updateUserPoint,
  authenticate,
  sendOtp
} = require("../controllers/userController");
const validUser = require("../validations/validUser");

const router = express.Router();

router.get("/list", listUser);
router.get("/", userById);
router.get("/authenticate", authenticate);
router.get("/send-otp", sendOtp);
router.post("/dname", validUser(), validDname);
router.post("/email", validUser(), validEmail);
router.post("/login", validUser(), checkLogin);
router.post("/otp-mail", validUser(), sendOtpEmail);
router.put("/points", validUser(), updateUserPoint);
router.put("/", validUser(), updateUserDetails);
router.put("/profile", updateUserProfile);
router.put("/password", validUser(), updatePassword);
router.post("/", validUser(), createUser);

module.exports = router;
