const express = require("express");
const {
  addFeedback,
  listFeedback
} = require("../controllers/feedbackController");
const validFeedback = require("../validations/validFeedback");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/add-feedback", auth, validFeedback(), addFeedback);
router.get("/list-feedback", auth, listFeedback);

module.exports = router;
