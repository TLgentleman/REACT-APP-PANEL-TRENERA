import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ClientCard from "./ClientCard";
import RxSearch from "./RxSearch"; // <--- DODANY IMPORT

export default function Dashboard() {
  const [trainer, setTrainer] = useState("");

  // Dwa osobne stany: jeden na wszystkich klientów z bazy, drugi na tych wyszukanych
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const activeUser = localStorage.getItem("loggedTrainer");

    if (!activeUser) {
      navigate("/login");
    } else {
      setTrainer(activeUser);

      fetch("/clients.json")
        .then((response) => response.json())
        .then((data) => {
          const newClients =
            JSON.parse(localStorage.getItem("newClients")) || [];
          const combinedList = [...data, ...newClients];

          setClients(combinedList); // Zapisujemy wszystkich jako baza
          setFilteredClients(combinedList); // Na start pokazujemy wszystkich
        })
        .catch((error) => console.error("Błąd pobierania danych:", error));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("loggedTrainer");
    navigate("/login");
  };

  if (!trainer) return null;

  // Wymóg ograniczania widocznych elementów: ucinamy tablicę do maksymalnie 5 wyników
  const displayedClients = filteredClients.slice(0, 5);

  return (
    <div className="container" style={{ maxWidth: "500px" }}>
      <h2>Zalogowany jako {trainer}</h2>

      <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
        <button
          onClick={() => navigate("/add-client")}
          style={{ background: "#00f2fe", color: "#0f172a" }}
        >
          + Dodaj klienta
        </button>
        <button
          onClick={handleLogout}
          style={{ background: "#ef4444", color: "white" }}
        >
          Wyloguj się
        </button>
      </div>

      <div style={{ textAlign: "left" }}>
        <h3
          style={{ borderBottom: "1px solid #334155", paddingBottom: "0.5rem" }}
        >
          Twoi Podopieczni:
        </h3>

        {/* Nasza wyszukiwarka RxJS */}
        <RxSearch
          allClients={clients}
          setFilteredClients={setFilteredClients}
        />

        {displayedClients.length > 0 ? (
          displayedClients.map((client) => (
            <ClientCard key={client.id} client={client} />
          ))
        ) : (
          <p>Brak wyników wyszukiwania.</p>
        )}
      </div>
    </div>
  );
}
