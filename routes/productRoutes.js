const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { authMiddleware, gerantMiddleware } = require('../middleware/authMiddleware');

router.get('/', authMiddleware, productController);
router.get('/getSupply', authMiddleware, productController);
router.post('/update-quantity', authMiddleware, gerantMiddleware, productController);

module.exports = router;
