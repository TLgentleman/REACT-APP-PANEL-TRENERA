import { useEffect, useRef } from "react";
import { fromEvent, of } from "rxjs";
import { debounceTime, map, switchMap } from "rxjs/operators";

export default function RxSearch({ allClients, setFilteredClients }) {
  const inputRef = useRef(null);

  useEffect(() => {
    const searchStream$ = fromEvent(inputRef.current, "input").pipe(
      debounceTime(300),

      map((event) => event.target.value.toLowerCase()),

      switchMap((searchTerm) => {
        const filtered = allClients.filter(
          (client) =>
            client.lastName.toLowerCase().includes(searchTerm) ||
            client.firstName.toLowerCase().includes(searchTerm),
        );
        return of(filtered);
      }),
    );

    const subscription = searchStream$.subscribe((result) => {});

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
