import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  async function logout() {
    await signOut(auth);
    navigate("/login", { replace: true });
  }

  return (
    <main className="dashboard-page">
      <header className="dashboard-nav">
        <div className="brand">🔔 <span>Remindly</span></div>
        <button className="secondary" onClick={logout}>Logout</button>
      </header>
      <section className="dashboard-shell">
        <p className="eyebrow">YOUR DASHBOARD</p>
        <h1>Welcome, {user?.displayName || user?.email?.split("@")[0]} 👋</h1>
        <p className="dashboard-copy">Login system working successfully. അടുത്തതായി reminders cloud-ൽ save ചെയ്യാം.</p>
        <div className="stat-grid">
          <article><span>Today</span><strong>0</strong></article>
          <article><span>Upcoming</span><strong>0</strong></article>
          <article><span>Completed</span><strong>0</strong></article>
        </div>
        <div className="empty-state"><div>📝</div><h2>No reminders yet</h2><p>Your first reminder will appear here.</p><button className="primary">+ Add Reminder</button></div>
      </section>
    </main>
  );
}
