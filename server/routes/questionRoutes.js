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
  questionByTag,
  tagsPerPage
} = require("../controllers/questionController");
const validQuestion = require("../validations/validQuestion");

const router = express.Router();

router.get("/list", listQuestions);
router.get("/count", countQuestions);
router.get("/peruser", questionsPerUser);
router.get("/userliked", userLikedQuestions);
router.get("/bytag", questionByTag);
router.get("/onpage", questionsPerPage);
router.get("/oldest", oldestWithLimit);
router.get("/mostliked", mostLikedWithLimit);
router.get("/answerfilter", filterByAnswerWithLimit);
router.get("/search", questionsSearch);
router.get("/", questionById);
router.post("/", validQuestion(), createQuestion);
router.post("/tags", tagsPerPage);
router.put("/add-like", validQuestion(), addQlike);
router.put("/remove-like", validQuestion(), removeQlike);
router.delete("/", validQuestion(), deleteQuestion);
router.put("/", validQuestion(), updateQuestion);

module.exports = router;
