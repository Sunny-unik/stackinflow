const express = require('express');
const { sendFeedback } = require('../controllers/feedbackController');

const router = express.Router();

router.post('/send-feedback', sendFeedback);

module.exports = router;
