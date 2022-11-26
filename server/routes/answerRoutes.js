const express = require("express");
const {
  addAlike,
  removeAlike,
  createAnswer,
  listAnswer,
  deleteAnswer
} = require("../controllers/answerController");
const validAnswer = require("../validations/validAnswer");

const router = express.Router();

router.get("/list", listAnswer);
router.post("/", validAnswer(), createAnswer);
router.put("/add-like", validAnswer(), addAlike);
router.put("/remove-like", validAnswer(), removeAlike);
router.delete("/", validAnswer(), deleteAnswer);

module.exports = router;
