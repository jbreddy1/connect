export type Role = "student" | "club_lead" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  class?: string;
  section?: string;
  rollNo?: string;
  mobile?: string;
}

export interface ClubTeamMember {
  name: string;
  role: string;
}

export interface PastEvent {
  id: string;
  title: string;
  date: string;
}

export interface Club {
  id: string;
  name: string;
  description: string;
  about: string;
  leadId: string;
  memberCount: number;
  pastEvents: PastEvent[];
  teamMembers: ClubTeamMember[];
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
  isPaid?: boolean;
  price?: number;
  razorpayLink?: string;
  whatsappGroupLink?: string;
}

export interface Registration {
  userId: string;
  eventId: string;
  registeredAt: string;
  attended?: boolean;
  certificateIssued?: boolean;
  paymentDone?: boolean;
}

const RAZORPAY_LINK = "https://razorpay.me/@jbreddy";
const DEFAULT_WHATSAPP = "https://chat.whatsapp.com/example";

// Students (and other users)
export const MOCK_USERS: User[] = [
  { id: "u1", name: "Alex Chen", email: "alex@uni.edu", role: "student", class: "3", section: "A", rollNo: "101", mobile: "9876543210" },
  { id: "u2", name: "Sam Rivera", email: "sam@uni.edu", role: "student", class: "2", section: "B", rollNo: "205", mobile: "9876543211" },
  { id: "u3", name: "Jordan Lee", email: "jordan@uni.edu", role: "student", class: "4", section: "A", rollNo: "302", mobile: "9876543212" },
  { id: "u4", name: "Taylor Kim", email: "taylor@uni.edu", role: "student", class: "3", section: "C", rollNo: "418", mobile: "9876543213" },
  { id: "u5", name: "Morgan Davis", email: "morgan@uni.edu", role: "student", class: "2", section: "A", rollNo: "501", mobile: "9876543214" },
  { id: "u6", name: "Riley Adams", email: "riley@uni.edu", role: "club_lead" },
  { id: "u7", name: "Casey Brown", email: "casey@uni.edu", role: "club_lead" },
  { id: "u8", name: "Admin User", email: "admin@uni.edu", role: "admin" },
];

// Clubs with about, past events, team members (max 20)
export const MOCK_CLUBS: Club[] = [
  {
    id: "c1",
    name: "Tech & Code",
    description: "Coding workshops, hackathons, and dev talks.",
    about: "Tech & Code is the official coding club. We run weekly workshops on web dev, competitive programming, and open source. We also organise hackathons and invite industry speakers.",
    leadId: "u6",
    memberCount: 120,
    pastEvents: [
      { id: "pe1", title: "Git & GitHub Workshop", date: "2025-02-10" },
      { id: "pe2", title: "Hackathon 2025", date: "2025-01-25" },
      { id: "pe3", title: "Open Source 101", date: "2024-12-05" },
    ],
    teamMembers: [
      { name: "Riley Adams", role: "Lead" },
      { name: "Jamie Fox", role: "Core" },
      { name: "Skyler White", role: "Core" },
      { name: "Drew Bell", role: "Member" },
      { name: "Sam Cole", role: "Member" },
    ],
  },
  {
    id: "c2",
    name: "Design Studio",
    description: "UI/UX, graphic design, and creative projects.",
    about: "Design Studio brings together designers and creatives. We cover UI/UX, Figma, branding, and illustration. Join us for critique nights and portfolio reviews.",
    leadId: "u7",
    memberCount: 85,
    pastEvents: [
      { id: "pe4", title: "Figma Basics", date: "2025-02-15" },
      { id: "pe5", title: "Design Sprint", date: "2025-01-20" },
    ],
    teamMembers: [
      { name: "Casey Brown", role: "Lead" },
      { name: "Jordan Lee", role: "Core" },
      { name: "Alex Chen", role: "Member" },
      { name: "Morgan Davis", role: "Member" },
    ],
  },
  {
    id: "c3",
    name: "Startup Hub",
    description: "Entrepreneurship, pitching, and startup events.",
    about: "Startup Hub supports student founders and anyone curious about startups. We run pitch practices, VC office hours, and networking events with the local startup ecosystem.",
    leadId: "u6",
    memberCount: 95,
    pastEvents: [
      { id: "pe6", title: "Founder Fireside", date: "2025-02-01" },
      { id: "pe7", title: "Pitch Night", date: "2024-11-18" },
    ],
    teamMembers: [
      { name: "Riley Adams", role: "Lead" },
      { name: "Taylor Kim", role: "Core" },
      { name: "Sam Rivera", role: "Member" },
      { name: "Drew Bell", role: "Member" },
      { name: "Jamie Fox", role: "Member" },
    ],
  },
  {
    id: "c4",
    name: "Data Science Club",
    description: "ML, analytics, and data visualization.",
    about: "Data Science Club focuses on ML, statistics, and data viz. We run Kaggle sprints, tool workshops (Python, R, Tableau), and talks from data scientists.",
    leadId: "u7",
    memberCount: 70,
    pastEvents: [
      { id: "pe8", title: "Intro to ML", date: "2025-02-08" },
      { id: "pe9", title: "Data Viz Workshop", date: "2024-12-12" },
    ],
    teamMembers: [
      { name: "Casey Brown", role: "Lead" },
      { name: "Jordan Lee", role: "Core" },
      { name: "Skyler White", role: "Member" },
      { name: "Drew Bell", role: "Member" },
    ],
  },
  {
    id: "c5",
    name: "Robotics & IoT",
    description: "Hardware, robotics, and IoT projects.",
    about: "Robotics & IoT is for hardware enthusiasts. We work with Arduino, Raspberry Pi, sensors, and simple robots. No prior experience required.",
    leadId: "u6",
    memberCount: 55,
    pastEvents: [
      { id: "pe10", title: "IoT Demo Day", date: "2025-01-30" },
    ],
    teamMembers: [
      { name: "Riley Adams", role: "Lead" },
      { name: "Jamie Fox", role: "Core" },
      { name: "Morgan Davis", role: "Member" },
      { name: "Sam Cole", role: "Member" },
    ],
  },
  {
    id: "c6",
    name: "Gaming League",
    description: "Esports, game jams, and casual gaming.",
    about: "Gaming League runs esports tournaments, game jams, and casual gaming sessions. We cover both competitive and indie game development.",
    leadId: "u7",
    memberCount: 200,
    pastEvents: [
      { id: "pe11", title: "Game Jam Winter", date: "2025-01-15" },
      { id: "pe12", title: "Esports Finals", date: "2024-12-20" },
    ],
    teamMembers: [
      { name: "Casey Brown", role: "Lead" },
      { name: "Alex Chen", role: "Core" },
      { name: "Taylor Kim", role: "Core" },
      { name: "Sam Rivera", role: "Member" },
      { name: "Drew Bell", role: "Member" },
      { name: "Skyler White", role: "Member" },
    ],
  },
];

// Events: some free, some paid (₹1 only). All paid use same Razorpay link.
export const MOCK_EVENTS: Event[] = [
  { id: "e1", title: "Intro to React Workshop", description: "Hands-on session building a small app with React and hooks.", date: "2025-03-15", time: "2:00 PM", venue: "Room 101, CS Building", clubId: "c1", registrationLimit: 40, status: "approved", whatsappGroupLink: DEFAULT_WHATSAPP },
  { id: "e2", title: "Design Critique Night", description: "Bring your designs and get feedback from peers and mentors.", date: "2025-03-16", time: "6:00 PM", venue: "Design Lab", clubId: "c2", registrationLimit: 25, status: "approved", isPaid: true, price: 1, razorpayLink: RAZORPAY_LINK, whatsappGroupLink: DEFAULT_WHATSAPP },
  { id: "e3", title: "Pitch Practice", description: "Practice your startup pitch and get judged by founders.", date: "2025-03-18", time: "4:00 PM", venue: "Innovation Hub", clubId: "c3", registrationLimit: 30, status: "approved", whatsappGroupLink: DEFAULT_WHATSAPP },
  { id: "e4", title: "Kaggle Sprint", description: "One-day data science competition with real datasets.", date: "2025-03-20", time: "10:00 AM", venue: "Lab 3", clubId: "c4", registrationLimit: 50, status: "approved", isPaid: true, price: 1, razorpayLink: RAZORPAY_LINK, whatsappGroupLink: DEFAULT_WHATSAPP },
  { id: "e5", title: "Arduino Basics", description: "Build your first circuit and blink an LED.", date: "2025-03-22", time: "3:00 PM", venue: "Maker Space", clubId: "c5", registrationLimit: 20, status: "approved", whatsappGroupLink: DEFAULT_WHATSAPP },
  { id: "e6", title: "Game Jam Kickoff", description: "48-hour game jam with themes and prizes.", date: "2025-03-25", time: "6:00 PM", venue: "Online + Room 204", clubId: "c6", registrationLimit: 80, status: "approved", isPaid: true, price: 1, razorpayLink: RAZORPAY_LINK, whatsappGroupLink: DEFAULT_WHATSAPP },
  { id: "e7", title: "API Design Talk", description: "REST vs GraphQL and best practices.", date: "2025-03-28", time: "5:00 PM", venue: "Room 101", clubId: "c1", registrationLimit: 35, status: "approved", whatsappGroupLink: DEFAULT_WHATSAPP },
  { id: "e8", title: "Portfolio Review", description: "Get your portfolio reviewed by industry designers.", date: "2025-03-30", time: "2:00 PM", venue: "Design Lab", clubId: "c2", registrationLimit: 15, status: "approved", isPaid: true, price: 1, razorpayLink: RAZORPAY_LINK, whatsappGroupLink: DEFAULT_WHATSAPP },
  { id: "e9", title: "VC Office Hours", description: "Q&A with local VCs and angel investors.", date: "2025-04-02", time: "11:00 AM", venue: "Innovation Hub", clubId: "c3", registrationLimit: 20, status: "approved", whatsappGroupLink: DEFAULT_WHATSAPP },
  { id: "e10", title: "Python for Data", description: "Pandas, NumPy, and Jupyter from scratch.", date: "2025-04-05", time: "1:00 PM", venue: "Lab 3", clubId: "c4", registrationLimit: 45, status: "approved", whatsappGroupLink: DEFAULT_WHATSAPP },
];

// Pre-filled registrations (some with attended/certificate for demo)
export const MOCK_REGISTRATIONS: Registration[] = [
  { userId: "u1", eventId: "e1", registeredAt: "2025-03-01T10:00:00Z", attended: true, certificateIssued: true },
  { userId: "u1", eventId: "e3", registeredAt: "2025-03-02T14:00:00Z" },
  { userId: "u2", eventId: "e2", registeredAt: "2025-03-01T11:00:00Z", paymentDone: true, attended: false, certificateIssued: false },
  { userId: "u2", eventId: "e6", registeredAt: "2025-03-03T09:00:00Z", paymentDone: true },
  { userId: "u3", eventId: "e1", registeredAt: "2025-03-02T08:00:00Z", attended: true, certificateIssued: false },
  { userId: "u3", eventId: "e4", registeredAt: "2025-03-04T16:00:00Z", paymentDone: true },
  { userId: "u4", eventId: "e5", registeredAt: "2025-03-01T12:00:00Z" },
  { userId: "u5", eventId: "e6", registeredAt: "2025-03-02T10:00:00Z", paymentDone: true },
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
