const mongoose = require('mongoose');
const Cocktail = require('../models/Cocktail');
const Category = require('../models/Category');
const Rating = require('../models/Rating');
require('dotenv').config();

// Połączenie z bazą danych
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/cocktail-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Przykładowe kategorie
const categories = [
    {
        nazwa: 'Klasyczne',
        opis: 'Tradycyjne koktajle znane na całym świecie',
        kolor: '#8B4513'
    },
    {
        nazwa: 'Tropikalne',
        opis: 'Koktajle z egzotycznymi owocami',
        kolor: '#FFD700'
    },
    {
        nazwa: 'Bezalkoholowe',
        opis: 'Mocktaile dla każdego',
        kolor: '#32CD32'
    },
    {
        nazwa: 'Shots',
        opis: 'Małe, ale mocne',
        kolor: '#FF6347'
    },
    {
        nazwa: 'Letnie',
        opis: 'Orzeźwiające koktajle na upalne dni',
        kolor: '#00CED1'
    }
];

// Przykładowe koktajle
const cocktailsData = [
    {
        nazwa: 'Mojito',
        skladniki: `50ml białego rumu
10 liści świeżej mięty
2 łyżeczki cukru
25ml soku z limonki
Woda gazowana
Kruszony lód`,
        instrukcje: 'W szklance typu highball umieść liście mięty i cukier. Delikatnie ugniataj muddlerem przez około 30 sekund. Dodaj sok z limonki i rum, wymieszaj. Napełnij szklankę kruszonym lodem i dolej wodę gazowaną. Delikatnie wymieszaj i udekoruj gałązką mięty.',
        trudnosc: 'łatwy',
        czasPrzygotowania: 5
    },
    {
        nazwa: 'Margarita',
        skladniki: `50ml tequili
25ml likieru pomarańczowego (Cointreau)
25ml świeżego soku z limonki
Sól do dekoracji brzegu szklanki
Lód`,
        instrukcje: 'Brzeg kieliszka typu margarita zwilż sokiem z limonki i zanurz w soli. W shakerze umieść lód, tequilę, likier pomarańczowy i sok z limonki. Energicznie wstrząsaj przez 15 sekund. Przecedź do przygotowanego kieliszka.',
        trudnosc: 'średni',
        czasPrzygotowania: 5
    },
    {
        nazwa: 'Piña Colada',
        skladniki: `60ml białego rumu
90ml soku ananasowego
30ml mleczka kokosowego
1 plaster ananasa
Kruszony lód`,
        instrukcje: 'Wszystkie składniki umieść w blenderze z kruszononym lodem. Blenduj przez około 30 sekund do uzyskania gładkiej konsystencji. Przelej do szklanki hurricane i udekoruj plastrem ananasa i wisienką koktajlową.',
        trudnosc: 'łatwy',
        czasPrzygotowania: 5
    },
    {
        nazwa: 'Cosmopolitan',
        skladniki: `40ml wódki cytrusowej
15ml likieru pomarańczowego
15ml soku z limonki
30ml soku żurawinowego
Lód`,
        instrukcje: 'W shakerze umieść lód i wszystkie składniki. Energicznie wstrząsaj przez 15 sekund. Przecedź do schłodzonego kieliszka koktajlowego. Udekoruj skórką z limonki.',
        trudnosc: 'średni',
        czasPrzygotowania: 3
    },
    {
        nazwa: 'Aperol Spritz',
        skladniki: `60ml Aperola
90ml Prosecco
Plasterek pomarańczy
Lód
Woda gazowana (opcjonalnie)`,
        instrukcje: 'Do kieliszka do wina z lodem wlej Aperol, następnie Prosecco. Delikatnie wymieszaj. Jeśli lubisz lżejsze koktajle, dodaj odrobinę wody gazowanej. Udekoruj plasterkiem pomarańczy.',
        trudnosc: 'łatwy',
        czasPrzygotowania: 2
    },
    {
        nazwa: 'Whiskey Sour',
        skladniki: `50ml bourbon whiskey
25ml świeżego soku z cytryny
15ml syropu cukrowego
Białko jajka (opcjonalnie)
Angostura bitters
Lód`,
        instrukcje: 'W shakerze umieść whiskey, sok z cytryny, syrop cukrowy i białko (jeśli używasz). Najpierw wstrząsaj bez lodu przez 15 sekund. Dodaj lód i wstrząsaj ponownie. Przecedź do szklanki old fashioned z lodem. Skrop kilkoma kroplami Angostury.',
        trudnosc: 'średni',
        czasPrzygotowania: 5
    },
    {
        nazwa: 'Virgin Mojito',
        skladniki: `10 liści świeżej mięty
2 łyżeczki cukru trzcinowego
30ml soku z limonki
Woda gazowana
Kruszony lód
Plasterek limonki do dekoracji`,
        instrukcje: 'W wysokiej szklance umieść miętę i cukier. Delikatnie ugniataj przez 30 sekund. Dodaj sok z limonki i wypełnij szklankę kruszonym lodem. Dolej wodę gazowaną i delikatnie wymieszaj. Udekoruj limonką i miętą.',
        trudnosc: 'łatwy',
        czasPrzygotowania: 5
    },
    {
        nazwa: 'Kamikaze',
        skladniki: `30ml wódki
30ml likieru Blue Curaçao
30ml soku z limonki
Lód`,
        instrukcje: 'Wszystkie składniki umieść w shakerze z lodem. Energicznie wstrząsaj przez 10 sekund. Przecedź do kieliszków shot. Podawaj natychmiast.',
        trudnosc: 'łatwy',
        czasPrzygotowania: 2
    },
    {
        nazwa: 'Strawberry Daiquiri',
        skladniki: `60ml białego rumu
30ml soku z limonki
15ml syropu cukrowego
6-8 świeżych truskawek
Kruszony lód`,
        instrukcje: 'Truskawki, rum, sok z limonki i syrop umieść w blenderze. Dodaj szklankę kruszonego lodu i blenduj do uzyskania gładkiej konsystencji. Przelej do kieliszka margarita i udekoruj truskawką.',
        trudnosc: 'łatwy',
        czasPrzygotowania: 5
    },
    {
        nazwa: 'Blue Lagoon',
        skladniki: `50ml wódki
20ml Blue Curaçao
150ml lemoniady
Plasterek cytryny
Wisienka koktajlowa
Lód`,
        instrukcje: 'Do wysokiej szklanki z lodem wlej wódkę i Blue Curaçao. Dopełnij lemoniadą i delikatnie wymieszaj. Udekoruj plasterkiem cytryny i wisienką na wykałaczce.',
        trudnosc: 'łatwy',
        czasPrzygotowania: 3
    }
];

async function seedDatabase() {
    try {
        // Wyczyść istniejące dane
        await Cocktail.deleteMany({});
        await Category.deleteMany({});
        await Rating.deleteMany({});
        
        console.log('Usunięto istniejące dane');
        
        // Dodaj kategorie
        const createdCategories = await Category.create(categories);
        console.log(`Dodano ${createdCategories.length} kategorii`);
        
        // Przypisz kategorie do koktajli
        const cocktailsWithCategories = cocktailsData.map((cocktail, index) => {
            // Przydziel kategorie w sposób cykliczny
            const categoryIndex = index % createdCategories.length;
            return {
                ...cocktail,
                kategoria: createdCategories[categoryIndex]._id
            };
        });
        
        // Dodaj koktajle
        const createdCocktails = await Cocktail.create(cocktailsWithCategories);
        console.log(`Dodano ${createdCocktails.length} koktajli`);
        
        // Dodaj przykładowe oceny
        const ratings = [];
        for (let cocktail of createdCocktails.slice(0, 5)) { // Tylko dla pierwszych 5 koktajli
            const numberOfRatings = Math.floor(Math.random() * 3) + 2; // 2-4 oceny
            
            for (let i = 0; i < numberOfRatings; i++) {
                const rating = {
                    wartosc: Math.floor(Math.random() * 2) + 4, // Oceny 4-5
                    komentarz: [
                        'Świetny koktajl!',
                        'Bardzo smaczny, polecam!',
                        'Idealny na letnie wieczory',
                        'Będę robić częściej',
                        'Pyszny i orzeźwiający'
                    ][Math.floor(Math.random() * 5)],
                    cocktail: cocktail._id
                };
                ratings.push(rating);
            }
        }
        
        const createdRatings = await Rating.create(ratings);
        console.log(`Dodano ${createdRatings.length} ocen`);
        
        // Zaktualizuj średnie oceny
        for (let rating of createdRatings) {
            const cocktail = await Cocktail.findById(rating.cocktail);
            cocktail.oceny.push(rating._id);
            await cocktail.obliczSredniaOcene();
            await cocktail.save();
        }
        
        console.log('Zaktualizowano średnie oceny');
        console.log('Seedowanie zakończone pomyślnie!');
        
        process.exit(0);
    } catch (error) {
        console.error('Błąd podczas seedowania:', error);
        process.exit(1);
    }
}

seedDatabase();