import { MOCK_CLUBS } from "../../data/mockData";
import ClubCard from "../../components/ClubCard";

export default function StudentClubsPage() {
  return (
    <>
      <section className="student-hero">
        <h1>Clubs</h1>
        <p>Explore clubs and their upcoming events.</p>
      </section>
      <section className="student-section">
        <div className="club-grid">
          {MOCK_CLUBS.map((club) => (
            <ClubCard key={club.id} club={club} />
          ))}
        </div>
      </section>
    </>
  );
}
