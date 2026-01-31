import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

export default function ProfilePage() {
  const { user, updateUser } = useAuth();
  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({ name: name.trim(), email: email.trim() });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (!user) return null;

  return (
    <div className="profile-page">
      <h1 className="profile-page__title">Profile</h1>
      <p className="profile-page__subtitle">Edit your information.</p>

      <form className="profile-form" onSubmit={handleSubmit}>
        {saved && (
          <div className="profile-form__saved" role="alert">
            Profile updated.
          </div>
        )}
        <label className="auth-label">
          <span>Full name</span>
          <input
            type="text"
            className="auth-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            autoComplete="name"
          />
        </label>
        <label className="auth-label">
          <span>Email</span>
          <input
            type="email"
            className="auth-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
          />
        </label>
        <p className="profile-form__role">
          Role: <strong>{user.role.replace("_", " ")}</strong> (cannot be changed here)
        </p>
        <button type="submit" className="auth-submit">
          Save changes
        </button>
      </form>
    </div>
  );
}
