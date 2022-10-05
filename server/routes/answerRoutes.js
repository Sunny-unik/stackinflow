const express = require("express");
const {
  addAlike,
  removeAlike,
  createAnswer
} = require("../controllers/answerController");
const validAnswer = require("../validations/validAnswer");

const router = express.Router();

router.post("/", validAnswer(), createAnswer);
router.put("/add-like", validAnswer(), addAlike);
router.put("/remove-like", validAnswer(), removeAlike);

module.exports = router;
