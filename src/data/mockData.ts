export type Role = "student" | "club_lead" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export interface Club {
  id: string;
  name: string;
  description: string;
  leadId: string;
  memberCount: number;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  clubId: string;
  registrationLimit: number;
  status: "approved" | "pending";
  imagePlaceholder?: string;
}

export interface Registration {
  userId: string;
  eventId: string;
  registeredAt: string;
}

// Students (and other users)
export const MOCK_USERS: User[] = [
  { id: "u1", name: "Alex Chen", email: "alex@uni.edu", role: "student" },
  { id: "u2", name: "Sam Rivera", email: "sam@uni.edu", role: "student" },
  { id: "u3", name: "Jordan Lee", email: "jordan@uni.edu", role: "student" },
  { id: "u4", name: "Taylor Kim", email: "taylor@uni.edu", role: "student" },
  { id: "u5", name: "Morgan Davis", email: "morgan@uni.edu", role: "student" },
  { id: "u6", name: "Riley Adams", email: "riley@uni.edu", role: "club_lead" },
  { id: "u7", name: "Casey Brown", email: "casey@uni.edu", role: "club_lead" },
  { id: "u8", name: "Admin User", email: "admin@uni.edu", role: "admin" },
];

// Clubs
export const MOCK_CLUBS: Club[] = [
  { id: "c1", name: "Tech & Code", description: "Coding workshops, hackathons, and dev talks.", leadId: "u6", memberCount: 120 },
  { id: "c2", name: "Design Studio", description: "UI/UX, graphic design, and creative projects.", leadId: "u7", memberCount: 85 },
  { id: "c3", name: "Startup Hub", description: "Entrepreneurship, pitching, and startup events.", leadId: "u6", memberCount: 95 },
  { id: "c4", name: "Data Science Club", description: "ML, analytics, and data visualization.", leadId: "u7", memberCount: 70 },
  { id: "c5", name: "Robotics & IoT", description: "Hardware, robotics, and IoT projects.", leadId: "u6", memberCount: 55 },
  { id: "c6", name: "Gaming League", description: "Esports, game jams, and casual gaming.", leadId: "u7", memberCount: 200 },
];

// Events (varied dates, venues, limits)
export const MOCK_EVENTS: Event[] = [
  { id: "e1", title: "Intro to React Workshop", description: "Hands-on session building a small app with React and hooks.", date: "2025-03-15", time: "2:00 PM", venue: "Room 101, CS Building", clubId: "c1", registrationLimit: 40, status: "approved" },
  { id: "e2", title: "Design Critique Night", description: "Bring your designs and get feedback from peers and mentors.", date: "2025-03-16", time: "6:00 PM", venue: "Design Lab", clubId: "c2", registrationLimit: 25, status: "approved" },
  { id: "e3", title: "Pitch Practice", description: "Practice your startup pitch and get judged by founders.", date: "2025-03-18", time: "4:00 PM", venue: "Innovation Hub", clubId: "c3", registrationLimit: 30, status: "approved" },
  { id: "e4", title: "Kaggle Sprint", description: "One-day data science competition with real datasets.", date: "2025-03-20", time: "10:00 AM", venue: "Lab 3", clubId: "c4", registrationLimit: 50, status: "approved" },
  { id: "e5", title: "Arduino Basics", description: "Build your first circuit and blink an LED.", date: "2025-03-22", time: "3:00 PM", venue: "Maker Space", clubId: "c5", registrationLimit: 20, status: "approved" },
  { id: "e6", title: "Game Jam Kickoff", description: "48-hour game jam with themes and prizes.", date: "2025-03-25", time: "6:00 PM", venue: "Online + Room 204", clubId: "c6", registrationLimit: 80, status: "approved" },
  { id: "e7", title: "API Design Talk", description: "REST vs GraphQL and best practices.", date: "2025-03-28", time: "5:00 PM", venue: "Room 101", clubId: "c1", registrationLimit: 35, status: "approved" },
  { id: "e8", title: "Portfolio Review", description: "Get your portfolio reviewed by industry designers.", date: "2025-03-30", time: "2:00 PM", venue: "Design Lab", clubId: "c2", registrationLimit: 15, status: "approved" },
  { id: "e9", title: "VC Office Hours", description: "Q&A with local VCs and angel investors.", date: "2025-04-02", time: "11:00 AM", venue: "Innovation Hub", clubId: "c3", registrationLimit: 20, status: "approved" },
  { id: "e10", title: "Python for Data", description: "Pandas, NumPy, and Jupyter from scratch.", date: "2025-04-05", time: "1:00 PM", venue: "Lab 3", clubId: "c4", registrationLimit: 45, status: "approved" },
];

// Pre-filled registrations (some students already registered for some events)
export const MOCK_REGISTRATIONS: Registration[] = [
  { userId: "u1", eventId: "e1", registeredAt: "2025-03-01T10:00:00Z" },
  { userId: "u1", eventId: "e3", registeredAt: "2025-03-02T14:00:00Z" },
  { userId: "u2", eventId: "e2", registeredAt: "2025-03-01T11:00:00Z" },
  { userId: "u2", eventId: "e6", registeredAt: "2025-03-03T09:00:00Z" },
  { userId: "u3", eventId: "e1", registeredAt: "2025-03-02T08:00:00Z" },
  { userId: "u3", eventId: "e4", registeredAt: "2025-03-04T16:00:00Z" },
  { userId: "u4", eventId: "e5", registeredAt: "2025-03-01T12:00:00Z" },
  { userId: "u5", eventId: "e6", registeredAt: "2025-03-02T10:00:00Z" },
];

export function getClubById(id: string): Club | undefined {
  return MOCK_CLUBS.find((c) => c.id === id);
}

export function getEventById(id: string): Event | undefined {
  return MOCK_EVENTS.find((e) => e.id === id);
}

export function getEventsByClubId(clubId: string): Event[] {
  return MOCK_EVENTS.filter((e) => e.clubId === clubId && e.status === "approved");
}

export function getRegistrationsForEvent(eventId: string): Registration[] {
  return MOCK_REGISTRATIONS.filter((r) => r.eventId === eventId);
}

export function getRegistrationsForUser(userId: string): Registration[] {
  return MOCK_REGISTRATIONS.filter((r) => r.userId === userId);
}

export function isUserRegistered(userId: string, eventId: string): boolean {
  return MOCK_REGISTRATIONS.some((r) => r.userId === userId && r.eventId === eventId);
}
