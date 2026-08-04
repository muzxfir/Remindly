import { useNavigate } from "react-router-dom";

export default function AddReminder() {
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    alert("Reminder cloud save will be connected in the next update.");
  }

  return (
    <main className="dashboard-page">
      <header className="dashboard-nav">
        <button className="secondary" onClick={() => navigate("/dashboard")}>← Back</button>
        <div className="brand">🔔 <span>Remindly</span></div>
      </header>

      <section className="add-reminder-shell">
        <p className="eyebrow">CREATE REMINDER</p>
        <h1>Add Reminder</h1>
        <p className="dashboard-copy">Add the details below and keep your day organized.</p>

        <form className="reminder-form" onSubmit={handleSubmit}>
          <label>
            Title
            <input type="text" placeholder="Pay electricity bill" required />
          </label>

          <label>
            Description
            <textarea placeholder="Add a short note..." rows="4" />
          </label>

          <div className="form-grid">
            <label>
              Date
              <input type="date" required />
            </label>

            <label>
              Time
              <input type="time" required />
            </label>
          </div>

          <div className="form-grid">
            <label>
              Category
              <select defaultValue="Personal">
                <option>Personal</option>
                <option>Work</option>
                <option>Bills</option>
                <option>Health</option>
                <option>Study</option>
              </select>
            </label>

            <label>
              Priority
              <select defaultValue="Medium">
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </label>
          </div>

          <div className="form-actions">
            <button type="button" className="secondary" onClick={() => navigate("/dashboard")}>Cancel</button>
            <button type="submit" className="primary">Save Reminder</button>
          </div>
        </form>
      </section>
    </main>
  );
}
