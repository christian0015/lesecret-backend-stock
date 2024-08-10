const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

router.post('/', authMiddleware, adminMiddleware, categoryController.createCategory);
router.get('/', authMiddleware, categoryController.getCategories);

module.exports = router;
