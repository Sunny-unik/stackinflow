const express = require("express");
const {
  listQuestions,
  questionsPerPage,
  createQuestion,
  addQlike,
  removeQlike,
  deleteQuestion,
  updateQuestion,
  questionsSearch,
  questionById,
  oldestWithLimit,
  mostLikedWithLimit
} = require("../controllers/questionController");
const validQuestion = require("../validations/validQuestion");

const router = express.Router();

router.get("/list", listQuestions);
router.get("/onpage", questionsPerPage);
router.get("/oldest", oldestWithLimit);
router.get("/mostliked", mostLikedWithLimit);
router.get("/search", questionsSearch);
router.get("/", questionById);
router.post("/", validQuestion(), createQuestion);
router.put("/add-like", validQuestion(), addQlike);
router.put("/remove-like", validQuestion(), removeQlike);
router.delete("/", validQuestion(), deleteQuestion);
router.put("/", validQuestion(), updateQuestion);

module.exports = router;
