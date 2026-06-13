const express = require('express');
const router = express.Router();
const { trackShipment } = require('../controllers/trackingController');

// GET /api/track/:id
router.get('/:id', trackShipment);

module.exports = router;
