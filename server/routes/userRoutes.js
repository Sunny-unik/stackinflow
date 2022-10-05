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

const router = express.Router();

router.get("/list", listUser);
router.get("/", userById);
router.get("/login", checkLogin);
router.get("/dname", validDname);
router.get("/email", validEmail);
router.get("/otp-mail", sendOtpEmail);
router.put("/points", updateUserPoint);
router.put("/", updateUserDetails);
router.put("/profile", updateUserProfile);
router.put("/password", updatePassword);
router.post("/", createUser);

module.exports = router;
