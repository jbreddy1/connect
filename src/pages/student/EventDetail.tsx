import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useRegistrations } from "../../context/RegistrationsContext";
import { useClubLeadNotifications } from "../../context/ClubLeadNotificationsContext";
import { getEventById, getClubById } from "../../data/mockData";

const RAZORPAY_LINK = "https://razorpay.me/@jbreddy";
const QR_API = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=";

function getTimeLeft(dateStr: string, timeStr: string): string {
  const [y, m, d] = dateStr.split("-").map(Number);
  const [timePart, period] = timeStr.split(" ");
  const [h, min] = timePart.split(":").map(Number);
  let hour = h;
  if (period === "PM" && h < 12) hour += 12;
  if (period === "AM" && h === 12) hour = 0;
  const eventDate = new Date(y, m - 1, d, hour, min);
  const now = new Date();
  const diff = eventDate.getTime() - now.getTime();
  if (diff < 0) return "Event ended";
  const days = Math.floor(diff / (24 * 60 * 60 * 1000));
  const hours = Math.floor((diff % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
  if (days > 0) return `${days} day${days === 1 ? "" : "s"} to go`;
  if (hours > 0) return `${hours} hour${hours === 1 ? "" : "s"} to go`;
  return "Today";
}

export default function EventDetail() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { getCountForEvent, isRegistered, addRegistration, removeRegistration, getRegistration } = useRegistrations();
  const { notifyPaidRegistration } = useClubLeadNotifications();

  const event = id ? getEventById(id) : undefined;
  const club = event ? getClubById(event.clubId) : undefined;
  const reg = user && event ? getRegistration(user.id, event.id) : undefined;

  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  if (!event) {
    return (
      <div className="student-main--detail" style={{ textAlign: "center", padding: "3rem" }}>
        <h1>Event not found</h1>
        <Link to="/student/events">Back to events</Link>
      </div>
    );
  }

  const registeredCount = getCountForEvent(event.id);
  const spotsLeft = Math.max(0, event.registrationLimit - registeredCount);
  const full = spotsLeft === 0;
  const alreadyRegistered = !!reg;
  const isPaid = event.isPaid && (event.price ?? 0) > 0;
  const razorpayLink = event.razorpayLink || RAZORPAY_LINK;
  const timeLeft = getTimeLeft(event.date, event.time);
  const qrData = user && reg ? `CONNECT-REG-${user.id}-${event.id}` : "";

  const handleRegisterFree = () => {
    if (!user) {
      setMessage({ type: "error", text: "Please log in to register." });
      return;
    }
    if (alreadyRegistered) return;
    if (full) {
      setMessage({ type: "error", text: "This event is full. Registration is closed." });
      return;
    }
    setMessage(null);
    setLoading(true);
    setTimeout(() => {
      addRegistration(user.id, event.id, false);
      setMessage({ type: "success", text: "You're registered! Show your QR to the club lead at the event." });
      setLoading(false);
    }, 400);
  };

  const handleConfirmPaymentDone = () => {
    if (!user || alreadyRegistered) return;
    if (full) {
      setMessage({ type: "error", text: "This event is full." });
      return;
    }
    setMessage(null);
    setLoading(true);
    setTimeout(() => {
      addRegistration(user.id, event.id, true);
      notifyPaidRegistration({
        eventId: event.id,
        eventTitle: event.title,
        userId: user.id,
        userName: user.name,
        userEmail: user.email,
      });
      setMessage({ type: "success", text: "Payment confirmed! You're registered. Details sent to club lead dashboard." });
      setLoading(false);
    }, 400);
  };

  const handleDeregister = () => {
    if (!user || !reg) return;
    if (!window.confirm("De-register from this event? You can register again if spots are available.")) return;
    removeRegistration(user.id, event.id);
    setMessage({ type: "success", text: "You've been de-registered from this event." });
  };

  return (
    <div className="student-main--detail">
      <Link to="/student/events" className="event-detail-back">← Back to events</Link>

      <article className="event-detail">
        <div className="event-detail__header">
          <span className="event-detail__club">{club?.name}</span>
          <span className="event-detail__date">{event.date} · {event.time}</span>
        </div>
        <h1 className="event-detail__title">{event.title}</h1>
        <p className="event-detail__desc">{event.description}</p>
        <div className="event-detail__meta">
          <span>📍 {event.venue}</span>
          <span>{registeredCount} / {event.registrationLimit} registered</span>
          {isPaid && <span className="event-detail__price">₹{event.price ?? 1}</span>}
          {full && !alreadyRegistered && <span className="event-detail__full">Event full</span>}
        </div>

        {message && (
          <div className={`event-detail__message event-detail__message--${message.type}`} role="alert">
            {message.text}
          </div>
        )}

        {/* Not registered: show Register or Pay flow */}
        {!alreadyRegistered && (
          <div className="event-detail__actions">
            {full ? (
              <span className="event-detail__badge event-detail__badge--full">Registration closed</span>
            ) : isPaid ? (
              <div className="event-detail__paid-flow">
                <p className="event-detail__paid-desc">This is a paid event (₹1). Pay via Razorpay, then confirm below.</p>
                <a
                  href={razorpayLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="event-detail__register event-detail__register--pay"
                >
                  Pay ₹1 via Razorpay
                </a>
                <button
                  type="button"
                  className="event-detail__register"
                  onClick={handleConfirmPaymentDone}
                  disabled={loading}
                >
                  {loading ? "Registering…" : "I've completed payment — Register me"}
                </button>
              </div>
            ) : (
              <button
                type="button"
                className="event-detail__register"
                onClick={handleRegisterFree}
                disabled={loading}
              >
                {loading ? "Registering…" : "Register for this event"}
              </button>
            )}
          </div>
        )}

        {/* Registered: checklist, timer, QR, WhatsApp, de-register */}
        {alreadyRegistered && reg && (
          <div className="event-registered">
            <div className="event-registered__timer">{timeLeft}</div>

            <div className="event-registered__checklist">
              <div className="event-registered__check-item">
                <span className={`event-registered__checkbox ${reg.attended ? "event-registered__checkbox--done" : ""}`}>
                  {reg.attended ? "✓" : ""}
                </span>
                <span>Attended event (show QR to club lead to mark attendance)</span>
              </div>
              <div className="event-registered__check-item">
                <span className={`event-registered__checkbox ${reg.certificateIssued ? "event-registered__checkbox--done" : ""}`}>
                  {reg.certificateIssued ? "✓" : ""}
                </span>
                <span>Certificate issued</span>
              </div>
            </div>

            <div className="event-registered__qr">
              <p className="event-registered__qr-label">Show this QR to the club lead at the event</p>
              <img
                src={QR_API + encodeURIComponent(qrData)}
                alt="Registration QR"
                className="event-registered__qr-img"
              />
              <p className="event-registered__qr-code">{qrData}</p>
            </div>

            {event.whatsappGroupLink && (
              <a
                href={event.whatsappGroupLink}
                target="_blank"
                rel="noopener noreferrer"
                className="event-registered__whatsapp"
              >
                Join WhatsApp group for this event
              </a>
            )}

            <button
              type="button"
              className="event-registered__deregister"
              onClick={handleDeregister}
            >
              De-register from this event
            </button>
          </div>
        )}
      </article>
    </div>
  );
}
