const express = require("express");
const {
  listQuestions,
  questionsPerPage,
  createQuestion,
  updateQlikes,
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
router.get("/per-user", questionsPerUser);
router.get("/user-liked", auth, userLikedQuestions);
router.get("/tagged", questionByTag);
router.get("/newest", questionsPerPage);
router.get("/oldest", oldestWithLimit);
router.get("/most-liked", mostLikedWithLimit);
router.get("/answer-filter", filterByAnswerWithLimit);
router.get("/search", questionsSearch);
router.get("/", questionById);
router.post("/", auth, validQuestion(), createQuestion);
router.put("/qlikes", auth, validQuestion(), updateQlikes);
router.delete("/", auth, deleteQuestion);
router.put("/", auth, validQuestion(), updateQuestion);

module.exports = router;
