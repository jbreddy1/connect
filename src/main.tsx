import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider } from "./context/AuthContext";
import { RegistrationsProvider } from "./context/RegistrationsContext";
import { ChatProvider } from "./context/ChatContext";
import { ClubLeadNotificationsProvider } from "./context/ClubLeadNotificationsContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <RegistrationsProvider>
        <ClubLeadNotificationsProvider>
          <ChatProvider>
            <App />
          </ChatProvider>
        </ClubLeadNotificationsProvider>
      </RegistrationsProvider>
    </AuthProvider>
  </StrictMode>
);
