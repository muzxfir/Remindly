export default function Features() {
  const features = [
    "☁️ Cloud Sync",
    "🔒 Secure Login",
    "📱 Multi Device",
    "🔔 Smart Notifications",
  ];

  return (
    <section
      style={{
        background: "#0f172a",
        color: "white",
        padding: "80px 20px",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "40px" }}>
        Features
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
        }}
      >
        {features.map((f) => (
          <div
            key={f}
            style={{
              background: "#1e293b",
              padding: "30px",
              borderRadius: "15px",
              textAlign: "center",
            }}
          >
            {f}
          </div>
        ))}
      </div>
    </section>
  );
}
