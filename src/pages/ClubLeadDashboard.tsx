import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ClubLeadDashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="dashboard-placeholder">
      <header className="dashboard-placeholder-header">
        <Link to="/" className="dashboard-placeholder-brand">Connect</Link>
        <div>
          <span className="student-user" style={{ marginRight: "1rem" }}>{user?.name}</span>
          <button type="button" className="student-logout" onClick={logout}>Log out</button>
        </div>
      </header>
      <main className="dashboard-placeholder-main">
        <h1>Club Lead Dashboard</h1>
        <p>Club management, event creation, and approval queue — coming in the next step.</p>
        <Link to="/" className="dashboard-placeholder-back">← Back to home</Link>
      </main>
    </div>
  );
}
