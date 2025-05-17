const express = require('express');
const router = express.Router();    
const reviewController = require('../controllers/reviewControlers');    

// POST /api/review
router.post('/', reviewController.review);

module.exports = router;
