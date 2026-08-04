import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";

const messages = {
  "auth/invalid-credential": "Email അല്ലെങ്കിൽ password തെറ്റാണ്.",
  "auth/invalid-email": "ശരിയായ email address നൽകുക.",
  "auth/too-many-requests": "കൂടുതൽ ശ്രമങ്ങൾ നടന്നു. കുറച്ച് കഴിഞ്ഞ് വീണ്ടും ശ്രമിക്കുക."
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  async function handleSubmit(event) {
    event.preventDefault();
    setError(""); setInfo(""); setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      navigate(location.state?.from?.pathname || "/dashboard", { replace: true });
    } catch (err) {
      setError(messages[err.code] || "Login ചെയ്യാൻ കഴിഞ്ഞില്ല. വീണ്ടും ശ്രമിക്കുക.");
    } finally {
      setLoading(false);
    }
  }

  async function resetPassword() {
    setError(""); setInfo("");
    if (!email.trim()) return setError("ആദ്യം email address നൽകുക.");
    try {
      await sendPasswordResetEmail(auth, email.trim());
      setInfo("Password reset link email-ലേക്ക് അയച്ചു.");
    } catch (err) {
      setError(messages[err.code] || "Reset email അയയ്ക്കാൻ കഴിഞ്ഞില്ല.");
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <Link className="brand auth-brand" to="/">🔔 <span>Remindly</span></Link>
        <p className="eyebrow">WELCOME BACK</p>
        <h1>Login to your account</h1>
        <p className="auth-copy">Your reminders are waiting for you.</p>
        <form onSubmit={handleSubmit} className="auth-form">
          <label>Email<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" autoComplete="email" required /></label>
          <label>Password<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Minimum 6 characters" autoComplete="current-password" required /></label>
          {error && <p className="form-message error">{error}</p>}
          {info && <p className="form-message success">{info}</p>}
          <button className="primary auth-submit" disabled={loading}>{loading ? "Logging in…" : "Login"}</button>
        </form>
        <button className="text-button" type="button" onClick={resetPassword}>Forgot password?</button>
        <p className="auth-switch">New to Remindly? <Link to="/register">Create account</Link></p>
      </section>
    </main>
  );
}
