import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { Role } from "../data/mockData";

const ROLES: { value: Role; label: string }[] = [
  { value: "student", label: "Student" },
  { value: "club_lead", label: "Club Lead" },
  { value: "admin", label: "Admin" },
];

function getRedirectForRole(role: Role): string {
  if (role === "student") return "/student/dashboard";
  if (role === "club_lead") return "/club-lead/dashboard";
  if (role === "admin") return "/admin/dashboard";
  return "/student/dashboard";
}

export default function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("student");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!name.trim() || !email.trim() || !password) {
      setError("Please fill in all fields.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    const user = signup(name, email, password, role);
    if (user) navigate(getRedirectForRole(user.role));
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <Link to="/" className="auth-brand">Connect</Link>
        <h1 className="auth-title">Sign up</h1>
        <p className="auth-subtitle">Create an account and choose your role.</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          {error && <div className="auth-error" role="alert">{error}</div>}
          <label className="auth-label">
            <span>Full name</span>
            <input
              type="text"
              className="auth-input"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
            />
          </label>
          <label className="auth-label">
            <span>Email</span>
            <input
              type="email"
              className="auth-input"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </label>
          <label className="auth-label">
            <span>Password</span>
            <input
              type="password"
              className="auth-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
            />
          </label>
          <label className="auth-label">
            <span>Role</span>
            <select
              className="auth-input auth-select"
              value={role}
              onChange={(e) => setRole(e.target.value as Role)}
            >
              {ROLES.map((r) => (
                <option key={r.value} value={r.value}>{r.label}</option>
              ))}
            </select>
          </label>
          <button type="submit" className="auth-submit">Create account</button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
}
