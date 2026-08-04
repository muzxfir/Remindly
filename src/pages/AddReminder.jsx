export default function AddReminder() {
  return (
    <main className="dashboard-page">
      <section className="dashboard-shell">
        <h1>Add Reminder</h1>

        <form>
          <input type="text" placeholder="Title" />
          <textarea placeholder="Description"></textarea>

          <input type="date" />
          <input type="time" />

          <select>
            <option>Personal</option>
            <option>Work</option>
            <option>Bills</option>
            <option>Health</option>
          </select>

          <select>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>

          <button className="primary">
            Save Reminder
          </button>
        </form>
      </section>
    </main>
  );
}
