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

      fetch("/clients.json")
        .then((response) => response.json())
        .then((data) => setClients(data))
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
      <button
        onClick={handleLogout}
        style={{
          background: "#ef4444",
          color: "white",
          marginBottom: "2rem",
          padding: "0.5rem",
        }}
      >
        Wyloguj się
      </button>

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
          <p>Pobieranie danych...</p>
        )}
      </div>
    </div>
  );
}
