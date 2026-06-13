import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddClient() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [credits, setCredits] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Podstawowa walidacja (wymóg z projektu)
    if (!firstName || !lastName || !credits) {
      setError("Wszystkie pola są wymagane!");
      return;
    }

    if (Number(credits) <= 0) {
      setError("Liczba treningów musi być większa niż 0!");
      return;
    }

    // Tworzymy obiekt nowego klienta
    const newClient = {
      id: Date.now(), // generujemy unikalne ID na podstawie czasu
      firstName,
      lastName,
      creditsLeft: Number(credits),
    };

    // Pobieramy dotychczasowych "nowych" klientów z localStorage
    const savedClients = JSON.parse(localStorage.getItem("newClients")) || [];

    // Dodajemy nowego i zapisujemy
    localStorage.setItem(
      "newClients",
      JSON.stringify([...savedClients, newClient]),
    );

    // Wracamy na stronę główną
    navigate("/");
  };

  return (
    <div className="container">
      <h2>Dodaj Podopiecznego</h2>
      {error && <p className="error-text">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Imię:</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Np. Adam"
          />
        </div>

        <div className="input-group">
          <label>Nazwisko:</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Np. Nowak"
          />
        </div>

        <div className="input-group">
          <label>Pakiet treningów (ilość):</label>
          <input
            type="number"
            value={credits}
            onChange={(e) => setCredits(e.target.value)}
            placeholder="Np. 10"
          />
        </div>

        <button type="submit" style={{ marginBottom: "1rem" }}>
          Zapisz klienta
        </button>
        <button
          type="button"
          onClick={() => navigate("/")}
          style={{ background: "#334155" }}
        >
          Anuluj i wróć
        </button>
      </form>
    </div>
  );
}
