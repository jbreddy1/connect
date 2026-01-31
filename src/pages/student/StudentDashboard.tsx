import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useRegistrations } from "../../context/RegistrationsContext";
import { MOCK_EVENTS, MOCK_CLUBS } from "../../data/mockData";
import EventCard from "../../components/EventCard";
import ClubCard from "../../components/ClubCard";

export default function StudentDashboard() {
  const { user, logout } = useAuth();
  const { getCountForEvent, isRegistered, getForUser } = useRegistrations();

  const approvedEvents = MOCK_EVENTS.filter((e) => e.status === "approved").sort(
    (a, b) => a.date.localeCompare(b.date)
  );
  const myRegistrations = user ? getForUser(user.id) : [];
  const myEventIds = new Set(myRegistrations.map((r) => r.eventId));
  const myEvents = approvedEvents.filter((e) => myEventIds.has(e.id));

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

      <main className="student-main">
        <section className="student-hero">
          <h1>Welcome back, {user?.name?.split(" ")[0] ?? "Student"}.</h1>
          <p>Discover events, explore clubs, and manage your registrations.</p>
        </section>

        <section className="student-section">
          <h2 className="student-section__title">Upcoming events</h2>
          <div className="event-grid">
            {approvedEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                registeredCount={getCountForEvent(event.id)}
                isRegistered={user ? isRegistered(user.id, event.id) : false}
              />
            ))}
          </div>
        </section>

        <section className="student-section">
          <h2 className="student-section__title">My registrations</h2>
          {myEvents.length === 0 ? (
            <p className="student-empty">You haven’t registered for any events yet. Browse above and register.</p>
          ) : (
            <div className="event-grid event-grid--compact">
              {myEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  registeredCount={getCountForEvent(event.id)}
                  isRegistered
                  compact
                />
              ))}
            </div>
          )}
        </section>

        <section className="student-section">
          <h2 className="student-section__title">Clubs</h2>
          <div className="club-grid">
            {MOCK_CLUBS.map((club) => (
              <ClubCard key={club.id} club={club} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
