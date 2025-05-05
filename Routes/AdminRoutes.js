const express = require('express');
const router = express.Router();    
const adminController = require('../controllers/adminControlers');    

// POST /api/admin
router.post('/', adminController.register);

module.exports = router;
