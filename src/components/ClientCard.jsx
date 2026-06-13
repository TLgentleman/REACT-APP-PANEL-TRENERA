export default function ClientCard({ client }) {
  return (
    <div
      style={{
        background: "#334155",
        padding: "1rem",
        margin: "1rem 0",
        borderRadius: "8px",
        textAlign: "left",
        borderLeft:
          client.creditsLeft === 0 ? "4px solid #ef4444" : "4px solid #00f2fe",
      }}
    >
      <h3 style={{ margin: "0 0 0.5rem 0" }}>
        {client.firstName} {client.lastName}
      </h3>
      <p style={{ margin: 0, color: "#94a3b8" }}>
        Pozostałe treningi:{" "}
        <strong
          style={{ color: client.creditsLeft === 0 ? "#ef4444" : "#e2e8f0" }}
        >
          {client.creditsLeft}
        </strong>
      </p>
    </div>
  );
}
