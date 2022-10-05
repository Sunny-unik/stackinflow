const express = require("express");
const {
  addFeedback,
  listFeedback
} = require("../controllers/feedbackController");
const validFeedback = require("../validations/validFeedback");

const router = express.Router();

router.post("/add-feedback", validFeedback(), addFeedback);
router.get("/list-feedback", listFeedback);

module.exports = router;
