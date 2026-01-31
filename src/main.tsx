import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider } from "./context/AuthContext";
import { RegistrationsProvider } from "./context/RegistrationsContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <RegistrationsProvider>
        <App />
      </RegistrationsProvider>
    </AuthProvider>
  </StrictMode>
);
