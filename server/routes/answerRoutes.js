const express = require('express');
const { addAlike, removeAlike, createAnswer } = require('../controllers/answerController');

const router = express.Router();

router.post('/', createAnswer);
router.put('/add-like', addAlike);
router.put('/remove-like', removeAlike);

module.exports = router;
