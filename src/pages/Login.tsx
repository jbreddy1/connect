import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { Role } from "../data/mockData";

function getRedirectForRole(role: Role): string {
  if (role === "student") return "/student/dashboard";
  if (role === "club_lead") return "/club-lead/dashboard";
  if (role === "admin") return "/admin/dashboard";
  return "/student/dashboard";
}

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email.trim() || !password) {
      setError("Please enter email and password.");
      return;
    }
    const user = login(email, password);
    if (user) navigate(getRedirectForRole(user.role));
    else setError("Invalid credentials. Try a mock email (e.g. alex@uni.edu) or any email to continue as guest.");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <Link to="/" className="auth-brand">Connect</Link>
        <h1 className="auth-title">Log in</h1>
        <p className="auth-subtitle">Enter your credentials to continue.</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          {error && <div className="auth-error" role="alert">{error}</div>}
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
              autoComplete="current-password"
            />
          </label>
          <button type="submit" className="auth-submit">Log in</button>
        </form>

        <p className="auth-switch">
          Don’t have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
