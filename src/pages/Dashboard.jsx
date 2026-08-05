import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { auth } from "../firebase/firebase";
import { useAuth } from "../context/AuthContext";
import { getReminders } from "../services/reminderService";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  async function loadReminders() {
    try {
      const data = await getReminders();
      setReminders(data);
    } catch (err) {
      console.error("Failed to load reminders:", err);
    } finally {
      setLoading(false);
    }
  }

  loadReminders();

  if ("Notification" in window && Notification.permission !== "granted") {
    Notification.requestPermission();
  }

}, []);

  async function logout() {
    await signOut(auth);
    navigate("/login", { replace: true });
  }

  const name =
    user?.displayName ||
    user?.email?.split("@")[0] ||
    "there";

  const today = new Date().toISOString().split("T")[0];

  const todayCount = reminders.filter(
    (reminder) =>
      reminder.date === today && !reminder.completed
  ).length;

  const upcomingCount = reminders.filter(
    (reminder) =>
      reminder.date > today && !reminder.completed
  ).length;

  const completedCount = reminders.filter(
    (reminder) => reminder.completed
  ).length;

  return (
    <main className="dashboard-page">
      <header className="dashboard-nav">
        <div className="brand">
          🔔 <span>Remindly</span>
        </div>

        <button className="secondary" onClick={logout}>
          Logout
        </button>
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
              <strong>{todayCount}</strong>
            </div>
          </article>

          <article className="dashboard-stat-card">
            <div className="stat-icon">⏰</div>
            <div>
              <span>Upcoming</span>
              <strong>{upcomingCount}</strong>
            </div>
          </article>

          <article className="dashboard-stat-card">
            <div className="stat-icon">✅</div>
            <div>
              <span>Completed</span>
              <strong>{completedCount}</strong>
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

          {loading ? (
            <div className="empty-state">
              <h2>Loading reminders...</h2>
            </div>
          ) : reminders.length === 0 ? (
            <div className="empty-state">
              <div>📝</div>
              <h2>No reminders yet</h2>
              <p>Your first reminder will appear here.</p>

              <button
                className="primary"
                onClick={() => navigate("/add-reminder")}
              >
                + Add Reminder
              </button>
            </div>
          ) : (
            <div className="reminder-list">
              {reminders.map((reminder) => (
                <article
                  className="reminder-card"
                  key={reminder.id}
                >
                  <div>
                    <h3>{reminder.title}</h3>

                    {reminder.description && (
                      <p>{reminder.description}</p>
                    )}

                    <small>
                      📅 {reminder.date || "No date"}{" "}
                      ⏰ {reminder.time || "No time"}
                    </small>
                  </div>

                  <span className="reminder-priority">
                    {reminder.priority || "Medium"}
                  </span>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
