const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  wartosc: {
    type: Number,
    required: [true, 'Ocena jest wymagana'],
    min: [1, 'Ocena musi być między 1 a 5'],
    max: [5, 'Ocena musi być między 1 a 5']
  },
  komentarz: {
    type: String,
    maxlength: [500, 'Komentarz nie może przekraczać 500 znaków']
  },
  cocktail: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cocktail',
    required: true
  }
}, {
  timestamps: true
});

const Rating = mongoose.model('Rating', ratingSchema);

module.exports = Rating;