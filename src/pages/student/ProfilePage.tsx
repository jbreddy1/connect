import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

export default function ProfilePage() {
  const { user, updateUser } = useAuth();
  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [classVal, setClassVal] = useState(user?.class ?? "");
  const [section, setSection] = useState(user?.section ?? "");
  const [rollNo, setRollNo] = useState(user?.rollNo ?? "");
  const [mobile, setMobile] = useState(user?.mobile ?? "");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setClassVal(user.class ?? "");
      setSection(user.section ?? "");
      setRollNo(user.rollNo ?? "");
      setMobile(user.mobile ?? "");
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({
      name: name.trim(),
      email: email.trim(),
      class: classVal.trim() || undefined,
      section: section.trim() || undefined,
      rollNo: rollNo.trim() || undefined,
      mobile: mobile.trim() || undefined,
    });
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
        <label className="auth-label">
          <span>Class</span>
          <input
            type="text"
            className="auth-input"
            value={classVal}
            onChange={(e) => setClassVal(e.target.value)}
            placeholder="e.g. 3"
            autoComplete="off"
          />
        </label>
        <label className="auth-label">
          <span>Section</span>
          <input
            type="text"
            className="auth-input"
            value={section}
            onChange={(e) => setSection(e.target.value)}
            placeholder="e.g. A"
            autoComplete="off"
          />
        </label>
        <label className="auth-label">
          <span>Roll no</span>
          <input
            type="text"
            className="auth-input"
            value={rollNo}
            onChange={(e) => setRollNo(e.target.value)}
            placeholder="e.g. 101"
            autoComplete="off"
          />
        </label>
        <label className="auth-label">
          <span>Mobile number</span>
          <input
            type="tel"
            className="auth-input"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="e.g. 9876543210"
            autoComplete="tel"
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
