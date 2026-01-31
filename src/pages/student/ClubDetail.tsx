import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useRegistrations } from "../../context/RegistrationsContext";
import { getClubById, getEventsByClubId } from "../../data/mockData";
import EventCard from "../../components/EventCard";

export default function ClubDetail() {
  const { id } = useParams<{ id: string }>();
  const { user, logout } = useAuth();
  const { getCountForEvent, isRegistered } = useRegistrations();

  const club = id ? getClubById(id) : undefined;
  const events = club ? getEventsByClubId(club.id) : [];

  if (!club) {
    return (
      <div className="student-dashboard">
        <header className="student-header">
          <Link to="/student/dashboard" className="student-brand">Connect</Link>
          <Link to="/student/dashboard" className="student-logout">← Back</Link>
        </header>
        <main className="student-main" style={{ textAlign: "center", padding: "3rem" }}>
          <h1>Club not found</h1>
          <Link to="/student/dashboard">Back to dashboard</Link>
        </main>
      </div>
    );
  }

  return (
    <div className="student-dashboard">
      <header className="student-header">
        <div className="student-header__left">
          <Link to="/student/dashboard" className="student-brand">Connect</Link>
          <span className="student-role">Student</span>
        </div>
        <div className="student-header__right">
          <span className="student-user">{user?.name ?? "Student"}</span>
          <button type="button" className="student-logout" onClick={logout}>
            Log out
          </button>
        </div>
      </header>

      <main className="student-main student-main--detail">
        <Link to="/student/dashboard" className="event-detail-back">← Back to dashboard</Link>

        <div className="club-detail">
          <div className="club-detail__icon">{club.name.charAt(0)}</div>
          <h1 className="club-detail__title">{club.name}</h1>
          <p className="club-detail__desc">{club.description}</p>
          <p className="club-detail__meta">{club.memberCount} members · {events.length} upcoming events</p>
        </div>

        <section className="student-section">
          <h2 className="student-section__title">Upcoming events</h2>
          {events.length === 0 ? (
            <p className="student-empty">No upcoming events from this club.</p>
          ) : (
            <div className="event-grid">
              {events.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  registeredCount={getCountForEvent(event.id)}
                  isRegistered={user ? isRegistered(user.id, event.id) : false}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
