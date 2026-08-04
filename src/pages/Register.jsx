import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebase";

const messages = {
  "auth/email-already-in-use": "ഈ email ഉപയോഗിച്ച് account ഇതിനകം ഉണ്ട്.",
  "auth/invalid-email": "ശരിയായ email address നൽകുക.",
  "auth/weak-password": "കുറഞ്ഞത് 6 characters ഉള്ള password നൽകുക."
};

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    if (password !== confirmPassword) return setError("Passwords രണ്ടും ഒരുപോലെ അല്ല.");
    if (password.length < 6) return setError("Password കുറഞ്ഞത് 6 characters വേണം.");
    setLoading(true);
    try {
      const credential = await createUserWithEmailAndPassword(auth, email.trim(), password);
      await updateProfile(credential.user, { displayName: name.trim() });
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(messages[err.code] || "Account create ചെയ്യാൻ കഴിഞ്ഞില്ല.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <Link className="brand auth-brand" to="/">🔔 <span>Remindly</span></Link>
        <p className="eyebrow">GET STARTED</p>
        <h1>Create your account</h1>
        <p className="auth-copy">Save reminders and access them on every device.</p>
        <form onSubmit={handleSubmit} className="auth-form">
          <label>Name<input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" autoComplete="name" required /></label>
          <label>Email<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" autoComplete="email" required /></label>
          <label>Password<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Minimum 6 characters" autoComplete="new-password" required /></label>
          <label>Confirm password<input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Enter password again" autoComplete="new-password" required /></label>
          {error && <p className="form-message error">{error}</p>}
          <button className="primary auth-submit" disabled={loading}>{loading ? "Creating…" : "Create Account"}</button>
        </form>
        <p className="auth-switch">Already have an account? <Link to="/login">Login</Link></p>
      </section>
    </main>
  );
}
