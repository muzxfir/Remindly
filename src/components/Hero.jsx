export default function Hero() {
  return (
    <section
      style={{
        background: "#020617",
        color: "white",
        textAlign: "center",
        padding: "120px 20px",
      }}
    >
      <h1 style={{ fontSize: "55px" }}>
        Never Forget Anything Again
      </h1>

      <p
        style={{
          color: "#94a3b8",
          marginTop: "20px",
          fontSize: "20px",
        }}
      >
        Save reminders securely and access them from every device.
      </p>

      <button
        style={{
          marginTop: "40px",
          background: "#3b82f6",
          color: "white",
          padding: "15px 30px",
          border: "none",
          borderRadius: "10px",
          fontSize: "18px",
        }}
      >
        Get Started
      </button>
    </section>
  );
}
