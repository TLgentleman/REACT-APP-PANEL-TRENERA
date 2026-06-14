import { useEffect, useMemo } from "react";
import { Subject, of } from "rxjs";
import { debounceTime, map, switchMap } from "rxjs/operators";

export default function RxSearch({ allClients, setFilteredClients }) {
  const searchSubject = useMemo(() => new Subject(), []);

  useEffect(() => {
    const subscription = searchSubject
      .pipe(
        debounceTime(300),

        map((text) => text.toLowerCase().trim()),

        switchMap((searchTerm) => {
          const filtered = allClients.filter(
            (client) =>
              client.lastName.toLowerCase().includes(searchTerm) ||
              client.firstName.toLowerCase().includes(searchTerm),
          );
          return of(filtered);
        }),
      )
      .subscribe((result) => {
        setFilteredClients(result);
      });

    return () => subscription.unsubscribe();
  }, [allClients, setFilteredClients, searchSubject]);

  const handleChange = (e) => {
    searchSubject.next(e.target.value);
  };

  return (
    <div className="input-group" style={{ marginBottom: "1rem" }}>
      <input
        type="text"
        onChange={handleChange}
        placeholder="Wyszukaj klienta po nazwisku lub imieniu..."
      />
    </div>
  );
}
