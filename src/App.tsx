import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import StudentLayout from "./layouts/StudentLayout";
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentEventsPage from "./pages/student/StudentEventsPage";
import StudentRegistrationsPage from "./pages/student/StudentRegistrationsPage";
import StudentClubsPage from "./pages/student/StudentClubsPage";
import StudentChatPage from "./pages/student/StudentChatPage";
import ProfilePage from "./pages/student/ProfilePage";
import EventDetail from "./pages/student/EventDetail";
import ClubDetail from "./pages/student/ClubDetail";
import ClubLeadDashboard from "./pages/ClubLeadDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/student" element={<StudentLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<StudentDashboard />} />
          <Route path="events" element={<StudentEventsPage />} />
          <Route path="events/:id" element={<EventDetail />} />
          <Route path="registrations" element={<StudentRegistrationsPage />} />
          <Route path="clubs" element={<StudentClubsPage />} />
          <Route path="clubs/:id" element={<ClubDetail />} />
          <Route path="chat" element={<StudentChatPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>

        <Route path="/club-lead/dashboard" element={<ClubLeadDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/dashboard" element={<Navigate to="/student/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
