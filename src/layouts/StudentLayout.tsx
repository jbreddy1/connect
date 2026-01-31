import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const navItems = [
  { to: "/student/dashboard", label: "Overview" },
  { to: "/student/events", label: "Events" },
  { to: "/student/registrations", label: "My Registrations" },
  { to: "/student/clubs", label: "Clubs" },
  { to: "/student/chat", label: "Discussion Hub" },
];

export default function StudentLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="student-dashboard">
      <header className="student-header">
        <div className="student-header__left">
          <Link to="/student/dashboard" className="student-brand">
            Connect
          </Link>
          <span className="student-role">Student</span>
          <nav className="student-nav">
            {navItems.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  "student-nav__link" + (isActive ? " student-nav__link--active" : "")
                }
                end={to === "/student/dashboard"}
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
        <div className="student-header__right">
          {user?.name && <span className="student-user">{user.name}</span>}
          <Link to="/student/profile" className="student-profile-link">
            Profile
          </Link>
          <button type="button" className="student-logout" onClick={handleLogout}>
            Log out
          </button>
        </div>
      </header>
      <main className="student-main">
        <Outlet />
      </main>
    </div>
  );
}
