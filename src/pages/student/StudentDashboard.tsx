import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useRegistrations } from "../../context/RegistrationsContext";
import { MOCK_EVENTS, MOCK_CLUBS } from "../../data/mockData";

export default function StudentDashboard() {
  const { user } = useAuth();
  const { getForUser } = useRegistrations();

  const myRegistrations = user ? getForUser(user.id) : [];
  const myCount = myRegistrations.length;
  const eventsCount = MOCK_EVENTS.filter((e) => e.status === "approved").length;
  const clubsCount = MOCK_CLUBS.length;

  return (
    <>
      <section className="student-hero">
        <h1>Welcome back, {user?.name?.split(" ")[0] ?? "Student"}.</h1>
        <p>Discover events, explore clubs, and manage your registrations.</p>
      </section>

      <section className="student-section">
        <div className="overview-cards">
          <Link to="/student/events" className="overview-card">
            <span className="overview-card__count">{eventsCount}</span>
            <span className="overview-card__label">Upcoming events</span>
            <span className="overview-card__desc">Browse and register</span>
          </Link>
          <Link to="/student/registrations" className="overview-card">
            <span className="overview-card__count">{myCount}</span>
            <span className="overview-card__label">My registrations</span>
            <span className="overview-card__desc">Events you’re in</span>
          </Link>
          <Link to="/student/clubs" className="overview-card">
            <span className="overview-card__count">{clubsCount}</span>
            <span className="overview-card__label">Clubs</span>
            <span className="overview-card__desc">Explore clubs</span>
          </Link>
          <Link to="/student/chat" className="overview-card overview-card--chat">
            <span className="overview-card__icon" aria-hidden>💬</span>
            <span className="overview-card__label">Discussion Hub</span>
            <span className="overview-card__desc">Chat & network</span>
          </Link>
        </div>
      </section>
    </>
  );
}
