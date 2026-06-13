const express = require('express');
const router = express.Router();
const { calculateQuote } = require('../controllers/quoteController');

// POST /api/quote
router.post('/', calculateQuote);

module.exports = router;
