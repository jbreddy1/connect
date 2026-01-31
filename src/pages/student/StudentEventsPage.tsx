import { useAuth } from "../../context/AuthContext";
import { useRegistrations } from "../../context/RegistrationsContext";
import { MOCK_EVENTS } from "../../data/mockData";
import EventCard from "../../components/EventCard";

export default function StudentEventsPage() {
  const { user } = useAuth();
  const { getCountForEvent, isRegistered } = useRegistrations();

  const approvedEvents = MOCK_EVENTS.filter((e) => e.status === "approved").sort((a, b) =>
    a.date.localeCompare(b.date)
  );

  return (
    <>
      <section className="student-hero">
        <h1>Upcoming events</h1>
        <p>Browse and register for events from all clubs.</p>
      </section>
      <section className="student-section">
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
    </>
  );
}
