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
  questionById,
} = require('../controllers/questionController');

const router = express.Router();

router.get('/list', listQuestions);
router.get('/onpage', questionsPerPage);
router.get('/search', questionsSearch);
router.get('/', questionById);
router.post('/', createQuestion);
router.put('/add-like', addQlike);
router.put('/remove-like', removeQlike);
router.delete('/', deleteQuestion);
router.put('/', updateQuestion);

module.exports = router;
