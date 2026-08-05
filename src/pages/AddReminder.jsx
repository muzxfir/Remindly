import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addReminder } from "../services/reminderService";

export default function AddReminder() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [category, setCategory] = useState("Personal");
  const [priority, setPriority] = useState("Medium");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!title.trim()) {
      alert("Please enter a reminder title.");
      return;
    }

    try {
      setSaving(true);

      await addReminder({
        title: title.trim(),
        description: description.trim(),
        date,
        time,
        category,
        priority,
      });

      alert("✅ Reminder saved successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Reminder save error:", err);
      alert("❌ Failed to save reminder.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="dashboard-page">
      <header className="dashboard-nav">
        <button
          className="secondary"
          onClick={() => navigate("/dashboard")}
        >
          ← Back
        </button>

        <div className="brand">
          🔔 <span>Remindly</span>
        </div>
      </header>

      <section className="add-reminder-shell">
        <p className="eyebrow">CREATE REMINDER</p>
        <h1>Add Reminder</h1>

        <p className="dashboard-copy">
          Add the details below and keep your day organized.
        </p>

        <form className="reminder-form" onSubmit={handleSubmit}>
          <label>
            Title
            <input
              type="text"
              placeholder="Pay electricity bill"
              required
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </label>

          <label>
            Description
            <textarea
              placeholder="Add a short note..."
              rows="4"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </label>

          <div className="form-grid">
            <label>
              Date
              <input
                type="date"
                required
                value={date}
                onChange={(event) => setDate(event.target.value)}
              />
            </label>

            <label>
              Time
              <input
                type="time"
                required
                value={time}
                onChange={(event) => setTime(event.target.value)}
              />
            </label>
          </div>

          <div className="form-grid">
            <label>
              Category
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
              >
                <option value="Personal">Personal</option>
                <option value="Work">Work</option>
                <option value="Bills">Bills</option>
                <option value="Health">Health</option>
                <option value="Study">Study</option>
              </select>
            </label>

            <label>
              Priority
              <select
                value={priority}
                onChange={(event) => setPriority(event.target.value)}
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </label>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="secondary"
              onClick={() => navigate("/dashboard")}
              disabled={saving}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="primary"
              disabled={saving}
            >
              {saving ? "Saving..." : "Save Reminder"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
