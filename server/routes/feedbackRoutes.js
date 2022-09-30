const express = require('express');
const bodyParser = require('body-parser');
const { sendFeedback } = require('../controllers/feedbackController');

const router = express.Router();

router.post('/send-feedback', bodyParser.json(), sendFeedback);

module.exports = router;
