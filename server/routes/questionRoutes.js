const express = require('express');
const {
  listQuestions,
  questionsPerPage,
  createQuestion,
  addQlike,
  removeQlike,
  removeAlike,
  addAlike,
  deleteQuestion,
  updateQuestion,
  questionsLength,
  questionsById,
  questionsByQuestion,
  createAnswer,
} = require('../controllers/questionController');

const router = express.Router();

router.get('/list-question-length', questionsLength);
router.get('/list-question', listQuestions);
router.get('/list-question-bypage', questionsPerPage);
router.get('/question-by-id', questionsById);
router.get('/list-question-byquestion', questionsByQuestion);
router.post('/create-question', createQuestion);
router.post('/create-answer', createAnswer);
router.put('/add-qlike', addQlike);
router.put('/remove-qlike', removeQlike);
router.put('/add-alike', addAlike);
router.put('/remove-alike', removeAlike);
router.put('/delete-question', deleteQuestion);
router.put('/update-question', updateQuestion);

module.exports = router;
