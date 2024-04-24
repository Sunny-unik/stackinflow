const express = require("express");
const {
  addAlike,
  removeAlike,
  createAnswer,
  listAnswer,
  deleteAnswer,
  answersPerUser
} = require("../controllers/answerController");
const validAnswer = require("../validations/validAnswer");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/list", listAnswer);
router.get("/per-user", answersPerUser);
router.post("/", auth, validAnswer(), createAnswer);
router.put("/add-like", auth, validAnswer(), addAlike);
router.put("/remove-like", auth, validAnswer(), removeAlike);
router.delete("/", auth, validAnswer(), deleteAnswer);

module.exports = router;
