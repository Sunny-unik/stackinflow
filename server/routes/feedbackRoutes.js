const express = require('express');
const { addFeedback, listFeedback } = require('../controllers/feedbackController');

const router = express.Router();

router.post('/add-feedback', addFeedback);
router.get('/list-feedback', listFeedback);

module.exports = router;