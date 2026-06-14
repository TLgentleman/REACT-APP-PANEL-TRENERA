import { useEffect, useRef } from "react";
import { fromEvent, of } from "rxjs";
import { debounceTime, map, switchMap } from "rxjs/operators";

export default function RxSearch({ allClients, setFilteredClients }) {
  // useRef pozwala nam "złapać" ten konkretny input w HTML-u
  const inputRef = useRef(null);

  useEffect(() => {
    // 1. fromEvent: Zaczynamy nasłuchiwać wpisywania na klawiaturze (zdarzenie 'input')
    const searchStream$ = fromEvent(inputRef.current, "input").pipe(
      // 2. debounceTime: Czekamy 300 milisekund po ostatnim wciśnięciu klawisza
      debounceTime(300),

      // 3. map: Wyciągamy z tego zdarzenia sam tekst i zmieniamy na małe litery
      map((event) => event.target.value.toLowerCase()),

      // 4. switchMap: Anuluje poprzednie zapytania, jeśli znów zaczniesz pisać
      switchMap((searchTerm) => {
        // Tu normalnie byłoby zapytanie do serwera. My filtrujemy naszą pobraną listę:
        const filtered = allClients.filter(
          (client) =>
            client.lastName.toLowerCase().includes(searchTerm) ||
            client.firstName.toLowerCase().includes(searchTerm),
        );
        // Zwracamy wynik jako nowy strumień (wymóg działania switchMap)
        return of(filtered);
      }),
    );

    // Subskrybujemy nasz strumień, żeby reagował w rzeczywistości
    const subscription = searchStream$.subscribe((result) => {
      setFilteredClients(result); // Aktualizujemy listę klientów widoczną na ekranie
    });

    // Czyszczenie pamięci, gdy komponent znika z ekranu
    return () => subscription.unsubscribe();
  }, [allClients, setFilteredClients]);

  return (
    <div className="input-group" style={{ marginBottom: "1rem" }}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Wyszukaj klienta po nazwisku lub imieniu..."
      />
    </div>
  );
}
