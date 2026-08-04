import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-glow" />
      <p className="eyebrow">YOUR PERSONAL REMINDER SPACE</p>
      <h1>Never Forget<br />Anything Again</h1>
      <p className="hero-copy">Save reminders securely and access them from every device.</p>
      <div className="hero-actions">
        <Link className="primary large" to="/register">Get Started</Link>
        <Link className="secondary large" to="/login">Login</Link>
      </div>
    </section>
  );
}
