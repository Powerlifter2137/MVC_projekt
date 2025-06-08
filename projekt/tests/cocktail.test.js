const mongoose = require('mongoose');
const Cocktail = require('../models/Cocktail');

describe('Model Cocktail', () => {
    beforeAll(async () => {
        await mongoose.connect('mongodb://localhost:27017/cocktail-test-db', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    afterEach(async () => {
        await Cocktail.deleteMany({});
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    test('powinien utworzyć nowy koktajl z poprawnymi danymi', async () => {
        const validCocktail = {
            nazwa: 'Test Mojito',
            skladniki: 'Rum, mięta, limonka, cukier',
            instrukcje: 'Wymieszaj wszystkie składniki i podawaj z lodem',
            trudnosc: 'łatwy',
            czasPrzygotowania: 5
        };

        const cocktail = new Cocktail(validCocktail);
        const savedCocktail = await cocktail.save();

        expect(savedCocktail._id).toBeDefined();
        expect(savedCocktail.nazwa).toBe(validCocktail.nazwa);
        expect(savedCocktail.skladniki).toBe(validCocktail.skladniki);
        expect(savedCocktail.instrukcje).toBe(validCocktail.instrukcje);
        expect(savedCocktail.sredniaOcena).toBe(0);
    });

    test('powinien wymagać nazwy koktajlu', async () => {
        const cocktailWithoutName = new Cocktail({
            skladniki: 'Rum, mięta',
            instrukcje: 'Wymieszaj'
        });

        let err;
        try {
            await cocktailWithoutName.save();
        } catch (error) {
            err = error;
        }

        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
        expect(err.errors.nazwa).toBeDefined();
    });

    test('nazwa powinna mieć minimum 3 znaki', async () => {
        const cocktailShortName = new Cocktail({
            nazwa: 'Ab',
            skladniki: 'Rum, mięta, limonka',
            instrukcje: 'Wymieszaj wszystkie składniki minimum 20 znaków'
        });

        let err;
        try {
            await cocktailShortName.save();
        } catch (error) {
            err = error;
        }

        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
        expect(err.errors.nazwa).toBeDefined();
    });

    test('powinien poprawnie obliczać średnią ocenę', async () => {
        const cocktail = new Cocktail({
            nazwa: 'Test Cocktail',
            skladniki: 'Testowe składniki minimum 10 znaków',
            instrukcje: 'Testowe instrukcje minimum 20 znaków długości'
        });

        const savedCocktail = await cocktail.save();
        
        // Symulacja ocen - dodaj oceny bezpośrednio do obiektu
        savedCocktail.oceny = [
            { wartosc: 5 },
            { wartosc: 4 },
            { wartosc: 5 }
        ];

        await savedCocktail.obliczSredniaOcene();
        expect(savedCocktail.sredniaOcena).toBeCloseTo(4.7, 1);
    });

    test('powinien zwracać listę składników', () => {
        const cocktail = new Cocktail({
            nazwa: 'Test Cocktail',
            skladniki: 'Rum\nMięta\nLimonka\nCukier',
            instrukcje: 'Test instrukcji z minimum 20 znakami'
        });

        const skladnikiLista = cocktail.skladnikiLista;
        expect(skladnikiLista).toHaveLength(4);
        expect(skladnikiLista[0]).toBe('Rum');
        expect(skladnikiLista[1]).toBe('Mięta');
    });
});