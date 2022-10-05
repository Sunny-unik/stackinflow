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
  updateUserPoint
} = require("../controllers/userController");
const validUser = require("../validations/validUser");

const router = express.Router();

router.get("/list", listUser);
router.get("/", userById);
router.get("/login", validUser(), checkLogin);
router.get("/dname", validUser(), validDname);
router.get("/email", validUser(), validEmail);
router.get("/otp-mail", validUser(), sendOtpEmail);
router.put("/points", validUser(), updateUserPoint);
router.put("/", validUser(), updateUserDetails);
router.put("/profile", updateUserProfile);
router.put("/password", validUser(), updatePassword);
router.post("/", validUser(), createUser);

module.exports = router;
