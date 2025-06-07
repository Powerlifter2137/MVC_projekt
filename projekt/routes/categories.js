const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.get('/', categoryController.index);
router.post('/', categoryController.create);
router.delete('/:id', categoryController.delete);

module.exports = router;