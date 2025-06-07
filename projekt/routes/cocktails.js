const express = require('express');
const router = express.Router();
const cocktailController = require('../controllers/cocktailController');
const { body } = require('express-validator');

// Walidacja dla koktajli
const cocktailValidation = [
  body('nazwa')
    .trim()
    .isLength({ min: 3 }).withMessage('Nazwa musi mieć co najmniej 3 znaki')
    .isLength({ max: 100 }).withMessage('Nazwa nie może przekraczać 100 znaków'),
  body('skladniki')
    .trim()
    .isLength({ min: 10 }).withMessage('Składniki muszą mieć co najmniej 10 znaków'),
  body('instrukcje')
    .trim()
    .isLength({ min: 20 }).withMessage('Instrukcje muszą mieć co najmniej 20 znaków'),
  body('czasPrzygotowania')
    .optional()
    .isInt({ min: 1, max: 60 }).withMessage('Czas przygotowania musi być między 1 a 60 minut')
];

// Routes
router.get('/', cocktailController.index);
router.get('/cocktails', cocktailController.index);
router.get('/cocktails/new', cocktailController.new);
router.post('/cocktails', cocktailValidation, cocktailController.create);
router.get('/cocktails/:id', cocktailController.show);
router.get('/cocktails/:id/edit', cocktailController.edit);
router.put('/cocktails/:id', cocktailValidation, cocktailController.update);
router.delete('/cocktails/:id', cocktailController.delete);
router.post('/cocktails/:id/rate', cocktailController.addRating);

module.exports = router;