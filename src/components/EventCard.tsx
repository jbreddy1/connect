import { Link } from "react-router-dom";
import { getClubById } from "../data/mockData";
import type { Event } from "../data/mockData";

interface EventCardProps {
  event: Event;
  registeredCount: number;
  isRegistered?: boolean;
  compact?: boolean;
}

export default function EventCard({ event, registeredCount, isRegistered, compact }: EventCardProps) {
  const club = getClubById(event.clubId);
  const spotsLeft = Math.max(0, event.registrationLimit - registeredCount);
  const isFull = spotsLeft === 0;

  if (compact) {
    return (
      <Link to={`/student/events/${event.id}`} className="event-card event-card--compact">
        <div className="event-card__meta">
          <span className="event-card__date">{event.date}</span>
          <span className="event-card__club">{club?.name}</span>
        </div>
        <h3 className="event-card__title">{event.title}</h3>
        <div className="event-card__footer">
          <span className="event-card__venue">{event.venue}</span>
          {isRegistered && <span className="event-card__badge event-card__badge--registered">Registered</span>}
          {isFull && !isRegistered && <span className="event-card__badge event-card__badge--full">Full</span>}
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/student/events/${event.id}`} className="event-card">
      <div className="event-card__top">
        <span className="event-card__club">{club?.name}</span>
        <span className="event-card__date">{event.date} · {event.time}</span>
      </div>
      <h3 className="event-card__title">{event.title}</h3>
      <p className="event-card__desc">{event.description}</p>
      <div className="event-card__meta-row">
        <span className="event-card__venue">📍 {event.venue}</span>
      </div>
      <div className="event-card__footer">
        <span className="event-card__spots">
          {registeredCount} / {event.registrationLimit} registered
        </span>
        {isRegistered && <span className="event-card__badge event-card__badge--registered">You're in</span>}
        {isFull && !isRegistered && <span className="event-card__badge event-card__badge--full">Full</span>}
      </div>
    </Link>
  );
}
