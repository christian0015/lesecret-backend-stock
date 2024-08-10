const express = require('express');
const router = express.Router();
const saleController = require('../controllers/saleController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.post('/', authMiddleware, saleController);
router.get('/', authMiddleware, saleController);

module.exports = router;
