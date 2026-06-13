import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (
      (username === "DominikKrol" || username === "RonnieColeman") &&
      password === "Admin123"
    ) {
      localStorage.setItem("loggedTrainer", username);
      navigate("/");
    } else {
      setError("Nieprawidłowy login lub hasło!");
    }
  };

  return (
    <div className="container">
      <h2>Panel Logowania</h2>
      {error && <p className="error-text">{error}</p>}

      <form onSubmit={handleLogin}>
        <div className="input-group">
          <label>Login:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Wpisz login"
          />
        </div>

        <div className="input-group">
          <label>Hasło:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Wpisz hasło"
          />
        </div>

        <button type="submit">Zaloguj się</button>
      </form>
    </div>
  );
}
