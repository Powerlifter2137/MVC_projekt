# Kolekcja Ulubionych Przepisów do Koktajli


## Opis projektu
Aplikacja webowa do zarządzania kolekcją przepisów na koktajle, zbudowana w oparciu o wzorzec architektoniczny MVC. Umożliwia dodawanie, edycję, usuwanie oraz przeglądanie przepisów na ulubione drinki.

## Funkcjonalności

### Podstawowe funkcjonalności:
- **Wyświetlanie listy koktajli** - strona główna z listą wszystkich przepisów
- **Dodawanie nowych przepisów** - formularz do dodawania nowych koktajli
- **Edycja istniejących przepisów** - możliwość modyfikacji zapisanych przepisów
- **Usuwanie przepisów** - funkcja usuwania niepotrzebnych przepisów
- **Widok szczegółowy** - strona z pełnym opisem pojedynczego koktajlu

### Dodatkowe funkcjonalności (na wyższą ocenę):
- **Walidacja danych** - sprawdzanie poprawności wprowadzanych danych po stronie serwera i klienta
- **Wyszukiwanie i filtrowanie** - możliwość wyszukiwania koktajli po nazwie oraz filtrowania po typie
- **Kategorie koktajli** - dodatkowy model "Kategoria" z relacją do koktajli
- **Oceny koktajli** - dodatkowy model "Ocena" pozwalający na ocenianie przepisów
- **Stylizacja** - estetyczny interfejs użytkownika z wykorzystaniem CSS i Bootstrap
- **Testy jednostkowe** - podstawowe testy dla modeli i kontrolerów

## Wymagania systemowe
- Node.js (wersja 14.x lub nowsza)
- npm (wersja 6.x lub nowsza)
- MongoDB (wersja 4.x lub nowsza)

## Instrukcja instalacji

1. **Sklonuj repozytorium:**
  klonujemy i wchodzimy w folder projektu
   

2. **Zainstaluj zależności:**
   
   npm install
   

3. **Skonfiguruj bazę danych:**
   - Opcja 1: Zainstaluj MongoDB lokalnie i użyj `mongodb://localhost:27017/cocktail-db`
   - Opcja 2: Użyj MongoDB Atlas (darmowe konto) i podmień connection string
   - Upewnij się, że MongoDB jest uruchomione

4. **Załaduj przykładowe dane (opcjonalnie):**
   
   npm run seed
   

## Uruchomienie aplikacji

1. **Tryb produkcyjny:**
   
   npm start
   

2. **Tryb deweloperski (z automatycznym restartem):**
   
   npm run dev
   

3. **Uruchomienie testów:**
   
   npm test
   

Aplikacja będzie dostępna pod adresem: `http://localhost:3000`

## Struktura projektu
```
projekt/
├── config/
│   └── database.js          # Konfiguracja połączenia z bazą danych
├── controllers/
│   ├── cocktailController.js # Kontroler główny dla koktajli
│   └── categoryController.js # Kontroler dla kategorii
├── models/
│   ├── Cocktail.js          # Model koktajlu
│   ├── Category.js          # Model kategorii
│   └── Rating.js            # Model oceny
├── views/
│   ├── layouts/
│   │   └── main.ejs         # Główny szablon
│   ├── cocktails/
│   │   ├── index.ejs        # Lista koktajli
│   │   ├── show.ejs         # Widok pojedynczego koktajlu
│   │   ├── new.ejs          # Formularz dodawania
│   │   └── edit.ejs         # Formularz edycji
│   └── partials/
│       └── navbar.ejs       # Nawigacja
├── public/
│   ├── css/
│   │   └── style.css        # Style CSS
│   └── js/
│       └── validation.js    # Walidacja po stronie klienta
├── routes/
│   ├── cocktails.js         # Routing dla koktajli
│   └── categories.js        # Routing dla kategorii
├── tests/
│   ├── cocktail.test.js     # Testy modelu Cocktail
│   └── controller.test.js   # Testy kontrolera
├── seeds/
│   └── seedData.js          # Przykładowe dane
├── .gitignore
├── package.json
├── package-lock.json
├── server.js                # Główny plik aplikacji
└── README.md               # Ten plik
```

## Technologie
- **Backend:**
  - Node.js
  - Express.js
  - MongoDB z Mongoose ODM
- **Frontend:**
  - EJS (Embedded JavaScript templates)
  - Bootstrap 5
  - Vanilla JavaScript
- **Narzędzia:**
  - Nodemon (development)
  - Jest (testy)
  - Express-validator (walidacja)

## Autor
Michał Nowacki
Nr indeksu: 51331