import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [trainer, setTrainer] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const activeUser = localStorage.getItem("loggedTrainer");

    if (!activeUser) {
      navigate("/login");
    } else {
      setTrainer(activeUser);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("loggedTrainer");
    navigate("/login");
  };

  return (
    <div className="container">
      <h2>Zalogowany jako {trainer}</h2>
      <p style={{ marginBottom: "2rem", color: "#94a3b8" }}></p>
      <button
        onClick={handleLogout}
        style={{ background: "#334155", color: "white" }}
      >
        Wyloguj się
      </button>
    </div>
  );
}
