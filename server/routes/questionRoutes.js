const bodyParser = require('body-parser');
const express = require('express');
const {
  questionLength,
  listQuestions,
  questionsPerPage,
  questionById,
  questionByQuestion,
  createQuestion,
  addQlike,
  removeQlike,
  removeAlike,
  addAlike,
} = require('../controller/questionController');
const { deleteQuestion } = require('../controllers/questionController');

const router = express.Router();

router.get('/list-question-length', questionLength);
router.get('/list-question', listQuestions);
router.get('/list-question-bypage', questionsPerPage);
router.get('/question-by-id', questionById);
router.get('/list-question-byquestion', bodyParser.json(), questionByQuestion);
router.post('/create-question', bodyParser.json(), createQuestion);
router.post('/create-answer', bodyParser.json(), createAnswer);
router.put('/add-qlike', bodyParser.json(), addQlike);
router.put('/remove-qlike', bodyParser.json(), removeQlike);
router.put('/add-alike', bodyParser.json(), addAlike);
router.put('/remove-alike', bodyParser.json(), removeAlike);
router.put('/delete-question', bodyParser.json(), deleteQuestion);
router.put('/update-question', bodyParser.json(), removeAlike);

router.delete('/', deleteProduct);

module.exports = router;
