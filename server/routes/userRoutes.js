const express = require("express");
const {
  validDname,
  validEmail,
  forgotPasswordEmail,
  updateUserDetails,
  updateUserProfile,
  updatePassword,
  listUser,
  userById,
  createUser,
  checkLogin,
  updateUserPoint,
  authenticate,
  logout,
  userByLikes,
  checkOtp
} = require("../controllers/userController");
const validUser = require("../validations/validUser");

const router = express.Router();

router.get("/list", listUser);
router.get("/", userById);
router.get("/authenticate", authenticate);
router.get("/mostliked", userByLikes);
router.get("/logout", logout);

router.post("/", validUser(), createUser);
router.post("/check-otp", checkOtp);
router.post("/dname", validUser(), validDname);
router.post("/email", validUser(), validEmail);
router.post("/login", validUser(), checkLogin);
router.post("/forgot-password", validUser(), forgotPasswordEmail);

router.put("/points", validUser(), updateUserPoint);
router.put("/", validUser(), updateUserDetails);
router.put("/profile", updateUserProfile);
router.put("/password", validUser(), updatePassword);

module.exports = router;
