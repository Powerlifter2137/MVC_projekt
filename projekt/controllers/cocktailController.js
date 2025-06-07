const Cocktail = require('../models/Cocktail');
const Category = require('../models/Category');
const Rating = require('../models/Rating');
const { validationResult } = require('express-validator');

// Wyświetl wszystkie koktajle
exports.index = async (req, res) => {
  try {
    const { search, kategoria, sortuj } = req.query;
    let query = {};
    
    // Wyszukiwanie
    if (search) {
      query.$or = [
        { nazwa: { $regex: search, $options: 'i' } },
        { skladniki: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Filtrowanie po kategorii
    if (kategoria) {
      query.kategoria = kategoria;
    }
    
    // Sortowanie
    let sortOptions = {};
    switch (sortuj) {
      case 'nazwa':
        sortOptions = { nazwa: 1 };
        break;
      case 'ocena':
        sortOptions = { sredniaOcena: -1 };
        break;
      case 'najnowsze':
        sortOptions = { createdAt: -1 };
        break;
      default:
        sortOptions = { createdAt: -1 };
    }
    
    const cocktails = await Cocktail.find(query)
      .populate('kategoria')
      .sort(sortOptions);
    
    const categories = await Category.find();
    
    res.render('cocktails/index', { 
      cocktails, 
      categories,
      search: search || '',
      selectedCategory: kategoria || '',
      sortBy: sortuj || 'najnowsze'
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Błąd serwera');
  }
};

// Pokaż formularz dodawania
exports.new = async (req, res) => {
  try {
    const categories = await Category.find();
    res.render('cocktails/new', { 
      categories,
      errors: [],
      oldInput: {}
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Błąd serwera');
  }
};

// Utwórz nowy koktajl
exports.create = async (req, res) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    const categories = await Category.find();
    return res.render('cocktails/new', {
      errors: errors.array(),
      oldInput: req.body,
      categories
    });
  }
  
  try {
    const cocktail = new Cocktail(req.body);
    await cocktail.save();
    res.redirect(`/cocktails/${cocktail._id}`);
  } catch (error) {
    console.error(error);
    const categories = await Category.find();
    res.render('cocktails/new', {
      errors: [{ msg: 'Błąd podczas zapisywania koktajlu' }],
      oldInput: req.body,
      categories
    });
  }
};

// Pokaż pojedynczy koktajl
exports.show = async (req, res) => {
  try {
    const cocktail = await Cocktail.findById(req.params.id)
      .populate('kategoria')
      .populate('oceny');
    
    if (!cocktail) {
      return res.status(404).render('error', { 
        message: 'Koktajl nie został znaleziony' 
      });
    }
    
    res.render('cocktails/show', { cocktail });
  } catch (error) {
    console.error(error);
    res.status(500).send('Błąd serwera');
  }
};

// Pokaż formularz edycji
exports.edit = async (req, res) => {
  try {
    const cocktail = await Cocktail.findById(req.params.id);
    const categories = await Category.find();
    
    if (!cocktail) {
      return res.status(404).render('error', { 
        message: 'Koktajl nie został znaleziony' 
      });
    }
    
    res.render('cocktails/edit', { 
      cocktail, 
      categories,
      errors: [],
      oldInput: cocktail
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Błąd serwera');
  }
};

// Zaktualizuj koktajl
exports.update = async (req, res) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    const categories = await Category.find();
    return res.render('cocktails/edit', {
      errors: errors.array(),
      oldInput: req.body,
      categories,
      cocktail: { _id: req.params.id }
    });
  }
  
  try {
    const cocktail = await Cocktail.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!cocktail) {
      return res.status(404).render('error', { 
        message: 'Koktajl nie został znaleziony' 
      });
    }
    
    res.redirect(`/cocktails/${cocktail._id}`);
  } catch (error) {
    console.error(error);
    const categories = await Category.find();
    res.render('cocktails/edit', {
      errors: [{ msg: 'Błąd podczas aktualizacji koktajlu' }],
      oldInput: req.body,
      categories,
      cocktail: { _id: req.params.id }
    });
  }
};

// Usuń koktajl
exports.delete = async (req, res) => {
  try {
    const cocktail = await Cocktail.findById(req.params.id);
    
    if (!cocktail) {
      return res.status(404).render('error', { 
        message: 'Koktajl nie został znaleziony' 
      });
    }
    
    // Usuń powiązane oceny
    await Rating.deleteMany({ cocktail: cocktail._id });
    
    // Usuń koktajl
    await cocktail.deleteOne();
    
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('Błąd serwera');
  }
};

// Dodaj ocenę
exports.addRating = async (req, res) => {
  try {
    const cocktail = await Cocktail.findById(req.params.id);
    
    if (!cocktail) {
      return res.status(404).json({ error: 'Koktajl nie został znaleziony' });
    }
    
    const rating = new Rating({
      wartosc: req.body.wartosc,
      komentarz: req.body.komentarz,
      cocktail: cocktail._id
    });
    
    await rating.save();
    
    cocktail.oceny.push(rating._id);
    await cocktail.save();
    await cocktail.obliczSredniaOcene();
    
    res.redirect(`/cocktails/${cocktail._id}`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Błąd podczas dodawania oceny' });
  }
};