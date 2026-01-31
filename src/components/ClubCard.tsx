import { Link } from "react-router-dom";
import { getEventsByClubId } from "../data/mockData";
import type { Club } from "../data/mockData";

interface ClubCardProps {
  club: Club;
}

export default function ClubCard({ club }: ClubCardProps) {
  const eventsCount = getEventsByClubId(club.id).length;

  return (
    <Link to={`/student/clubs/${club.id}`} className="club-card">
      <div className="club-card__icon" aria-hidden>
        {club.name.charAt(0)}
      </div>
      <div className="club-card__body">
        <h3 className="club-card__title">{club.name}</h3>
        <p className="club-card__desc">{club.description}</p>
        <div className="club-card__meta">
          <span>{club.memberCount} members</span>
          <span>{eventsCount} upcoming events</span>
        </div>
      </div>
    </Link>
  );
}
