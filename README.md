# 🏋️‍♂️ Personal Trainer Dashboard

Prosta i responsywna aplikacja webowa typu Single Page Application (SPA) zbudowana w bibliotece React. Projekt został stworzony z myślą o trenerach personalnych pomagających podopiecznym z różnymi celami sylwetkowymi – od budowy masy mięśniowej po redukcję – aby ułatwić im organizację pakietów treningowych i historii spotkań.

Projekt zrealizowany w ramach zajęć laboratoryjnych w Akademii Nauk Stosowanych w Tarnowie.

## ✨ Funkcjonalności

- **🔐 Autentykacja (Mock):** Zabezpieczony routing aplikacji. Główny panel dostępny jest tylko po zalogowaniu.
- **📋 Zarządzanie podopiecznymi:** Wyświetlanie listy klientów wraz z pozostałą liczbą treningów w pakiecie, z podziałem na strony (paginacja/ograniczenie widoku).
- **➕ Dodawanie nowych klientów:** Formularz z podstawową walidacją znaków (obsługa pustych spacji) i zapisem stanu do `localStorage`.
- **🔍 Inteligentna wyszukiwarka (RxJS):** Reaktywna wyszukiwarka klientów po imieniu i nazwisku. Wykorzystuje strumienie i operatory RxJS (`debounceTime`, `map`, `switchMap`) w celu optymalizacji zapytań i odciążenia aplikacji.
- **💾 Pobieranie Danych:** Wykorzystanie interfejsu `fetch` do pobierania asynchronicznych danych (Mock API z pliku JSON).

## 🛠️ Technologie

- **React 18** (z wykorzystaniem włączonego StrictMode)
- **React Router v6** (obsługa nawigacji i chronionych ścieżek)
- **RxJS** (programowanie reaktywne, obiekt Subject i strumienie)
- **HTML5 & CSS3** (Flexbox, zmienne CSS, ciemny i czytelny interfejs)

## 🚀 Uruchomienie projektu lokalnie

Aby poprawnie uruchomić projekt na swoim komputerze, upewnij się, że masz zainstalowane środowisko Node.js.

### 1. Pobranie i instalacja podstawowych zależności

Sklonuj repozytorium lub rozpakuj pliki projektu, a następnie w terminalu w głównym folderze wpisz:

    npm install

### 2. Instalacja wymaganych bibliotek (Kluczowe!)

Do prawidłowego działania nawigacji oraz wyszukiwarki musisz doinstalować dwie dodatkowe paczki. Wpisz w terminalu:

    npm install react-router-dom rxjs

### 3. Uruchomienie aplikacji

Aby wystartować lokalny serwer deweloperski, użyj polecenia:

    npm run dev

_(lub `npm start`, w zależności od użytego bundlera)_

Aplikacja uruchomi się domyślnie pod adresem `http://localhost:5173` lub `http://localhost:3000`.

## 🔑 Dane do logowania testowego

Aby przetestować aplikację, użyj jednego z poniższych kont:

- **Login:** `DominikKrol` | **Hasło:** `Admin123`
- **Login:** `RonnieColeman` | **Hasło:** `Admin123`

---

_Projekt przygotowany na zaliczenie laboratorium z technologii frontendowych._
