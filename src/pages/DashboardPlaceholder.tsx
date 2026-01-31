import { Link } from "react-router-dom";

export default function DashboardPlaceholder() {
  return (
    <div className="dashboard-placeholder">
      <header className="dashboard-placeholder-header">
        <Link to="/" className="dashboard-placeholder-brand">Connect</Link>
        <Link to="/" className="dashboard-placeholder-logout">Log out</Link>
      </header>
      <main className="dashboard-placeholder-main">
        <h1>Dashboard</h1>
        <p>Role-based dashboard (Student / Club Lead / Admin) will be built in the next step.</p>
        <Link to="/" className="dashboard-placeholder-back">← Back to home</Link>
      </main>
    </div>
  );
}
