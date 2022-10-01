const express = require('express');
const {
  listQuestions,
  questionsPerPage,
  createQuestion,
  addQlike,
  removeQlike,
  deleteQuestion,
  updateQuestion,
  questionsSearch,
} = require('../controllers/questionController');

const router = express.Router();

router.get('/list-question', listQuestions);
router.get('/list-question-bypage', questionsPerPage);
router.get('/questionSearch', questionsSearch);
router.post('/create-question', createQuestion);
router.put('/add-qlike', addQlike);
router.put('/remove-qlike', removeQlike);
router.put('/delete-question', deleteQuestion);
router.put('/update-question', updateQuestion);

module.exports = router;
