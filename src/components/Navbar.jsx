export default function Navbar() {
  return (
    <nav
      style={{
        background: "#0f172a",
        color: "#fff",
        padding: "18px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h2>🔔 Remindly</h2>

      <div>
        <button
          style={{
            marginRight: "10px",
            padding: "10px 18px",
            borderRadius: "8px",
          }}
        >
          Login
        </button>

        <button
          style={{
            padding: "10px 18px",
            borderRadius: "8px",
            background: "#3b82f6",
            color: "#fff",
            border: "none",
          }}
        >
          Sign Up
        </button>
      </div>
    </nav>
  );
}
