import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useClubLeadNotifications } from "../context/ClubLeadNotificationsContext";
import { useRegistrations } from "../context/RegistrationsContext";

export default function ClubLeadDashboard() {
  const { user, logout } = useAuth();
  const { paidRegistrations } = useClubLeadNotifications();
  const { markAttended } = useRegistrations();
  const [scanCode, setScanCode] = useState("");
  const [scanMessage, setScanMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleMarkAttendance = (e: React.FormEvent) => {
    e.preventDefault();
    setScanMessage(null);
    const match = scanCode.trim().match(/^CONNECT-REG-(.+)-(.+)$/);
    if (!match) {
      setScanMessage({ type: "error", text: "Invalid code. Use format: CONNECT-REG-userId-eventId" });
      return;
    }
    const [, userId, eventId] = match;
    markAttended(userId, eventId);
    setScanCode("");
    setScanMessage({ type: "success", text: "Attendance marked for this registration." });
  };

  return (
    <div className="dashboard-placeholder">
      <header className="dashboard-placeholder-header">
        <Link to="/" className="dashboard-placeholder-brand">Connect</Link>
        <div>
          <span className="student-user" style={{ marginRight: "1rem" }}>{user?.name}</span>
          <button type="button" className="student-logout" onClick={logout}>Log out</button>
        </div>
      </header>
      <main className="dashboard-placeholder-main club-lead-main">
        <h1>Club Lead Dashboard</h1>
        <p className="club-lead-desc">Manage events, view paid registrations, and mark attendance.</p>

        {paidRegistrations.length > 0 && (
          <section className="club-lead-section">
            <h2>Paid registrations (details sent here)</h2>
            <ul className="club-lead-paid-list">
              {paidRegistrations.map((pr) => (
                <li key={pr.id} className="club-lead-paid-item">
                  <span className="club-lead-paid-event">{pr.eventTitle}</span>
                  <span className="club-lead-paid-user">{pr.userName} ({pr.userEmail})</span>
                  <span className="club-lead-paid-date">{new Date(pr.paidAt).toLocaleString()}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="club-lead-section">
          <h2>Mark attendance (scan QR or enter code)</h2>
          <p className="club-lead-scan-desc">Student shows QR at event; code format: CONNECT-REG-userId-eventId</p>
          <form onSubmit={handleMarkAttendance} className="club-lead-scan-form">
            <input
              type="text"
              className="auth-input"
              placeholder="CONNECT-REG-userId-eventId"
              value={scanCode}
              onChange={(e) => setScanCode(e.target.value)}
            />
            <button type="submit" className="auth-submit">Mark attended</button>
          </form>
          {scanMessage && (
            <div className={`event-detail__message event-detail__message--${scanMessage.type}`} role="alert">
              {scanMessage.text}
            </div>
          )}
        </section>

        <Link to="/" className="dashboard-placeholder-back">← Back to home</Link>
      </main>
    </div>
  );
}
