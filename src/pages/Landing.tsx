import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="landing">
      <header className="landing-header">
        <div className="landing-brand">Connect</div>
        <nav className="landing-nav">
          <Link to="/login" className="landing-nav-link">Log in</Link>
          <Link to="/signup" className="landing-nav-cta">Sign up</Link>
        </nav>
      </header>

      <main className="landing-hero">
        <div className="landing-hero-bg" aria-hidden />
        <div className="landing-hero-content">
          <p className="landing-tagline">Events &amp; Clubs — One platform</p>
          <h1 className="landing-title">
            Discover events.
            <br />
            <span className="landing-title-accent">Register. Attend. Scale.</span>
          </h1>
          <p className="landing-desc">
            Student discovers event → registers → attends → club tracks → admin monitors → platform scales.
          </p>
          <div className="landing-actions">
            <Link to="/signup" className="landing-btn landing-btn-primary">Get started</Link>
            <Link to="/login" className="landing-btn landing-btn-ghost">Log in</Link>
          </div>
        </div>
      </main>

      <footer className="landing-footer">
        <span className="landing-footer-text">Role-based access · Event lifecycle · Hackathon ready</span>
      </footer>
    </div>
  );
}
