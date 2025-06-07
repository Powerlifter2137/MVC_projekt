const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  nazwa: {
    type: String,
    required: [true, 'Nazwa kategorii jest wymagana'],
    unique: true,
    trim: true
  },
  opis: {
    type: String,
    maxlength: [200, 'Opis nie może przekraczać 200 znaków']
  },
  kolor: {
    type: String,
    default: '#007bff'
  }
}, {
  timestamps: true
});

// Wirtualna właściwość dla liczby koktajli w kategorii
categorySchema.virtual('liczbaKoktajli', {
  ref: 'Cocktail',
  localField: '_id',
  foreignField: 'kategoria',
  count: true
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;