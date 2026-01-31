import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useRegistrations } from "../../context/RegistrationsContext";
import { getEventById, getClubById } from "../../data/mockData";

export default function EventDetail() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { getCountForEvent, isRegistered, addRegistration } = useRegistrations();

  const event = id ? getEventById(id) : undefined;
  const club = event ? getClubById(event.clubId) : undefined;

  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  if (!event) {
    return (
      <div className="student-main--detail" style={{ textAlign: "center", padding: "3rem" }}>
        <h1>Event not found</h1>
        <Link to="/student/dashboard">Back to dashboard</Link>
      </div>
    );
  }

  const registeredCount = getCountForEvent(event.id);
  const spotsLeft = Math.max(0, event.registrationLimit - registeredCount);
  const full = spotsLeft === 0;
  const alreadyRegistered = user ? isRegistered(user.id, event.id) : false;

  const handleRegister = () => {
    if (!user) {
      setMessage({ type: "error", text: "Please log in to register." });
      return;
    }
    if (alreadyRegistered) {
      setMessage({ type: "error", text: "You're already registered for this event." });
      return;
    }
    if (full) {
      setMessage({ type: "error", text: "This event is full. Registration is closed." });
      return;
    }
    setMessage(null);
    setLoading(true);
    setTimeout(() => {
      addRegistration(user.id, event.id);
      setMessage({ type: "success", text: "You're registered! We'll send a confirmation." });
      setLoading(false);
    }, 400);
  };

  return (
    <div className="student-main--detail">
      <Link to="/student/events" className="event-detail-back">← Back to events</Link>

      <article className="event-detail">
        <div className="event-detail__header">
          <span className="event-detail__club">{club?.name}</span>
          <span className="event-detail__date">{event.date} · {event.time}</span>
        </div>
        <h1 className="event-detail__title">{event.title}</h1>
        <p className="event-detail__desc">{event.description}</p>
        <div className="event-detail__meta">
          <span>📍 {event.venue}</span>
          <span>{registeredCount} / {event.registrationLimit} registered</span>
          {full && <span className="event-detail__full">Event full</span>}
        </div>

        {message && (
          <div className={`event-detail__message event-detail__message--${message.type}`} role="alert">
            {message.text}
          </div>
        )}

        <div className="event-detail__actions">
          {alreadyRegistered ? (
            <span className="event-detail__badge">You're registered</span>
          ) : full ? (
            <span className="event-detail__badge event-detail__badge--full">Registration closed</span>
          ) : (
            <button
              type="button"
              className="event-detail__register"
              onClick={handleRegister}
              disabled={loading}
            >
              {loading ? "Registering…" : "Register for this event"}
            </button>
          )}
        </div>
      </article>
    </div>
  );
}
