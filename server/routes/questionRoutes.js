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
  mostLikedWithLimit,
  filterByAnswerWithLimit,
  countQuestions,
  questionsPerUser,
  userLikedQuestions,
  questionByTag
} = require("../controllers/questionController");
const validQuestion = require("../validations/validQuestion");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/list", listQuestions);
router.get("/count", countQuestions);
router.get("/peruser", questionsPerUser);
router.get("/userliked", auth, userLikedQuestions);
router.get("/bytag", questionByTag);
router.get("/newest", questionsPerPage);
router.get("/oldest", oldestWithLimit);
router.get("/most-liked", mostLikedWithLimit);
router.get("/answer-filter", filterByAnswerWithLimit);
router.get("/search", questionsSearch);
router.get("/", questionById);
router.post("/", auth, validQuestion(), createQuestion);
router.put("/add-like", auth, validQuestion(), addQlike);
router.put("/remove-like", auth, validQuestion(), removeQlike);
router.delete("/", auth, validQuestion(), deleteQuestion);
router.put("/", auth, validQuestion(), updateQuestion);

module.exports = router;
