const Category = require('../models/Category');
const Cocktail = require('../models/Cocktail');

// Wyświetl wszystkie kategorie
exports.index = async (req, res) => {
  try {
    const categories = await Category.find().populate('liczbaKoktajli');
    res.render('categories/index', { categories });
  } catch (error) {
    console.error(error);
    res.status(500).send('Błąd serwera');
  }
};

// Utwórz nową kategorię
exports.create = async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.redirect('/categories');
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Błąd podczas tworzenia kategorii' });
  }
};

// Usuń kategorię
exports.delete = async (req, res) => {
  try {
    // Najpierw usuń referencje do kategorii z koktajli
    await Cocktail.updateMany(
      { kategoria: req.params.id },
      { $unset: { kategoria: 1 } }
    );
    
    // Usuń kategorię
    await Category.findByIdAndDelete(req.params.id);
    
    res.redirect('/categories');
  } catch (error) {
    console.error(error);
    res.status(500).send('Błąd serwera');
  }
};