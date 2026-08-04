import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { getReminders } from "../services/reminderService";

const [reminders, setReminders] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  async function loadReminders() {
    try {
      const data = await getReminders();
      setReminders(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  loadReminders();
}, []);

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  async function logout() {
    await signOut(auth);
    navigate("/login", { replace: true });
  }

  const name = user?.displayName || user?.email?.split("@")[0] || "there";

  return (
    <main className="dashboard-page">
      <header className="dashboard-nav">
        <div className="brand">
          🔔 <span>Remindly</span>
        </div>
        <button className="secondary" onClick={logout}>Logout</button>
      </header>

      <section className="dashboard-shell">
        <div className="dashboard-heading">
          <div>
            <p className="eyebrow">YOUR DASHBOARD</p>
            <h1>Welcome, {name} 👋</h1>
            <p className="dashboard-copy">
              Keep track of your day and never miss an important reminder.
            </p>
          </div>

          <button
            className="primary dashboard-add-button"
            onClick={() => navigate("/add-reminder")}
          >
            + Add Reminder
          </button>
        </div>

        <div className="top-cards">
          <article className="dashboard-stat-card">
            <div className="stat-icon">📅</div>
            <div>
              <span>Today</span>
              <strong>0</strong>
            </div>
          </article>

          <article className="dashboard-stat-card">
            <div className="stat-icon">⏰</div>
            <div>
              <span>Upcoming</span>
              <strong>0</strong>
            </div>
          </article>

          <article className="dashboard-stat-card">
            <div className="stat-icon">✅</div>
            <div>
              <span>Completed</span>
              <strong>0</strong>
            </div>
          </article>
        </div>

        <div className="reminder-box">
          <div className="reminder-box-heading">
            <div>
              <p className="eyebrow">REMINDERS</p>
              <h2>My Reminders</h2>
            </div>
            <button
              className="secondary"
              onClick={() => navigate("/add-reminder")}
            >
              Add New
            </button>
          </div>

          <div className="empty-state">
            <div className="empty-icon">📝</div>
            <h2>No reminders yet</h2>
            <p>Your first reminder will appear here.</p>
            <button
              className="primary"
              onClick={() => navigate("/add-reminder")}
            >
              + Add Reminder
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
