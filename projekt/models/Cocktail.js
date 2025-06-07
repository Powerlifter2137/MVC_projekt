const mongoose = require('mongoose');

const cocktailSchema = new mongoose.Schema({
  nazwa: {
    type: String,
    required: [true, 'Nazwa koktajlu jest wymagana'],
    trim: true,
    minlength: [3, 'Nazwa musi mieć co najmniej 3 znaki'],
    maxlength: [100, 'Nazwa nie może przekraczać 100 znaków']
  },
  skladniki: {
    type: String,
    required: [true, 'Składniki są wymagane'],
    minlength: [10, 'Opis składników musi mieć co najmniej 10 znaków']
  },
  instrukcje: {
    type: String,
    required: [true, 'Instrukcje przygotowania są wymagane'],
    minlength: [20, 'Instrukcje muszą mieć co najmniej 20 znaków']
  },
  kategoria: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: false
  },
  trudnosc: {
    type: String,
    enum: ['łatwy', 'średni', 'trudny'],
    default: 'średni'
  },
  czasPrzygotowania: {
    type: Number,
    min: [1, 'Czas przygotowania musi być większy niż 0'],
    max: [60, 'Czas przygotowania nie może przekraczać 60 minut']
  },
  zdjecie: {
    type: String,
    default: '/images/default-cocktail.jpg'
  },
  oceny: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Rating'
  }],
  sredniaOcena: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  }
}, {
  timestamps: true
});

// Metoda do obliczania średniej oceny
cocktailSchema.methods.obliczSredniaOcene = async function() {
  if (this.oceny.length === 0) {
    this.sredniaOcena = 0;
    return;
  }
  
  await this.populate('oceny');
  const suma = this.oceny.reduce((acc, ocena) => acc + ocena.wartosc, 0);
  this.sredniaOcena = Math.round((suma / this.oceny.length) * 10) / 10;
  await this.save();
};

// Wirtualna właściwość dla sformatowanych składników
cocktailSchema.virtual('skladnikiLista').get(function() {
  return this.skladniki.split('\n').filter(s => s.trim());
});

// Wyszukiwanie tekstowe
cocktailSchema.index({ nazwa: 'text', skladniki: 'text' });

const Cocktail = mongoose.model('Cocktail', cocktailSchema);

module.exports = Cocktail;