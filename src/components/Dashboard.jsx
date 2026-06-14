import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ClientCard from "./ClientCard";

export default function Dashboard() {
  const [trainer, setTrainer] = useState("");
  const [clients, setClients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const activeUser = localStorage.getItem("loggedTrainer");

    if (!activeUser) {
      navigate("/login");
    } else {
      setTrainer(activeUser);

      // Pobieranie danych z JSON
      fetch("/clients.json")
        .then((response) => response.json())
        .then((data) => {
          // Kiedy pobierzemy mocki, sprawdzamy czy mamy kogoś nowego w localStorage
          const newClients =
            JSON.parse(localStorage.getItem("newClients")) || [];
          // Łączymy obie tablice w jedną listę
          setClients([...data, ...newClients]);
        })
        .catch((error) => console.error("Błąd pobierania danych:", error));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("loggedTrainer");
    navigate("/login");
  };

  if (!trainer) return null;

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

        {clients.length > 0 ? (
          clients.map((client) => (
            <ClientCard key={client.id} client={client} />
          ))
        ) : (
          <p>Brak klientów w bazie.</p>
        )}
      </div>
    </div>
  );
}
