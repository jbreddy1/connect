import { useAuth } from "../../context/AuthContext";
import { useRegistrations } from "../../context/RegistrationsContext";
import { MOCK_EVENTS } from "../../data/mockData";
import EventCard from "../../components/EventCard";

export default function StudentRegistrationsPage() {
  const { user } = useAuth();
  const { getForUser, getCountForEvent } = useRegistrations();

  const myRegistrations = user ? getForUser(user.id) : [];
  const myEventIds = new Set(myRegistrations.map((r) => r.eventId));
  const approvedEvents = MOCK_EVENTS.filter((e) => e.status === "approved");
  const myEvents = approvedEvents.filter((e) => myEventIds.has(e.id));

  return (
    <>
      <section className="student-hero">
        <h1>My registrations</h1>
        <p>Events you’re registered for.</p>
      </section>
      <section className="student-section">
        {myEvents.length === 0 ? (
          <p className="student-empty">
            You haven’t registered for any events yet. Go to Events to browse and register.
          </p>
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
    </>
  );
}
