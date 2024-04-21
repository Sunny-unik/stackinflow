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
  checkOtp,
  removeUnverified,
  countUser,
  userByDname
} = require("../controllers/userController");
const validUser = require("../validations/validUser");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/list", listUser);
router.get("/count", countUser);
router.get("/", userById);
router.get("/by-dname", userByDname);
router.get("/authenticate", auth, authenticate);
router.get("/most-liked", userByLikes);
router.get("/logout", logout);

router.post("/", validUser(), createUser);
router.post("/check-otp", checkOtp);
router.post("/dname", validUser(), validDname);
router.post("/email", validUser(), validEmail);
router.post("/login", validUser(), checkLogin);
router.post("/forgot-password", validUser(), forgotPasswordEmail);
router.post("/remove-unverified", removeUnverified);

router.put("/points", validUser(), auth, updateUserPoint);
router.put("/", validUser(), auth, updateUserDetails);
router.put("/profile", auth, updateUserProfile);
router.put("/password", validUser(), auth, updatePassword);

module.exports = router;
