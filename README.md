# HomeBudgetApp

## Opis ogólny projektu

HomeBudgetApp to aplikacja do zarządzania budżetem domowym. Aplikacja umożliwia użytkownikowi tworzenie, usuwanie oraz edycję budżetów a następnie dodawanie, usuwanie oraz edycję transakcji. Użytkownicy mogę śledzić wpływ transakcji na budżet oraz przeglądać ich historię. Aplikacja uruchamia się na oknie głównym, z którego przechodzimy do okna logowania. Po zalogowaniu możemy przejść do części dotyczącej budżetów lub dotyczącej transakcji. 

## Instrukcja uruchamiania

## Backend 
### Krok 1: Klonowanie repozytorium
- Sklonuj repozytorium z Github: git clone https://github.com/michalruba/HomeBudgetApp.git

### Krok 2: Instalacja zależności (Backend)
- Otwórz projekt w Visual Studio 
- Przywróć zależności NuGet (kliknij prawym przyciskiem na solucję i wybierz "Restore NuGet Packages")

### Krok 3: Utworzenie bazy danych 
- W MSSQL Server Management Studio wykonaj skrypt SQL znajdujący się w pliku HomeBudgetDatabase.sql (który zawiera kod SQL do utworzenia tabel i inicjalnych danych).

### Krok 4: Konfiguracja bazy danych
- Zaktualizuj plik appsettings.json w projekcie WebApi, aby wskazywał na twoją instancję SQL Server. 

### Krok 5: Uruchomienie Backend
- Uruchom projekt WebApi.

## Frontend 
### Krok 6: Instalacja zależności - w terminalu 
- npm install

### Krok 7: Uruchomienie Frontend - w terminalu
- npm start

## MOSCOW

###  MUST HAVE

### Backend:
1. **Stworzenie bazy danych w MSSQL Server Management Studio (3SP)**
    - Stworzenie tabel
    - Uzupełnienie danych startowych
2. **Rozplanowanie szkieletu aplikacji:(2SP)**
   - Stworzenie projektów typu ClassLibrary dla modeli, serwisów, repozytoriów, łączności z bazą danych.
   - Stworzenie projektu ASP.NET Core Web API, w nim przestrzeni na kontrolery.
3. **Połączenie z bazą danych: (3SP)**
   - Utworzenie klasy `BudgetDbContext`
   - Ustawienie `ConnectionString`
4. **Implementacja CRUD dla użytkowników, modeli, budżetów: (5SP)**
   - Stworzenie repozytorium
   - Stworzenie kontrolera
   - Stworzenie serwisu
5. **Implementacja autoryzacji logowania przy użyciu JWT: (3SP)**
   - Wygenerowanie klucza do autoryzacji
6. **Implementacja wszystkiego w `Program.cs`: (3SP)**
   - Konfiguracja bazy danych
   - Rejestracja repozytoriów
   - Rejestracja serwisów
   - Konfiguracja uwierzytelniania JWT
   - Dodanie kontrolerów
   - Dodanie Swaggera
   - Dodanie obsługi uwierzytelniania i autoryzacji
7. **Zweryfikowane działanie logowania i operacji (2SP)**

### Frontend:
1. **Stworzenie struktury projektu frontendowego (2SP)**
2. **Integracja z backendem (2SP)**
3. **Implementacja logowania użytkowników (2SP)**
4. **Utworzenie widoków dla użytkownika do tworzenia, edycji i usuwania budżetu (4SP)**
5. **Utworzenie widoków dla użytkownika do tworzenia, edycji i usuwania transakcji (4SP)**
6. **Zweryfikowanie działania dodawania budżetów (1SP)**
7. **Zweryfikowanie działania dodawanych transakcji i ich wpływu na budżety (1SP)**

## SHOULD HAVE

- Testy
- Utworzenie widoku dla Administratora do tworzenia, edycji i usuwania użytkowników
- Generowanie wykresów na podstawie transakcji

## COULD HAVE

- Filtrowanie transakcji (np. po kategorii, dacie)
- Generowanie raportów
- Powiadomienia dla użytkowników o zbliżającym się końcu budżetu
- Możliwość importowania i eksportowania danych finansowych
- Wprowadzenie walut dla transakcji

