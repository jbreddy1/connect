import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import StudentDashboard from "./pages/student/StudentDashboard";
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
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/events/:id" element={<EventDetail />} />
        <Route path="/student/clubs/:id" element={<ClubDetail />} />
        <Route path="/club-lead/dashboard" element={<ClubLeadDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/dashboard" element={<Navigate to="/student/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
