import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { MOCK_REGISTRATIONS, type Registration } from "../data/mockData";

interface RegistrationsContextValue {
  registrations: Registration[];
  addRegistration: (userId: string, eventId: string) => void;
  isRegistered: (userId: string, eventId: string) => boolean;
  getCountForEvent: (eventId: string) => number;
  getForUser: (userId: string) => Registration[];
}

const RegistrationsContext = createContext<RegistrationsContextValue | null>(null);

export function RegistrationsProvider({ children }: { children: ReactNode }) {
  const [registrations, setRegistrations] = useState<Registration[]>(MOCK_REGISTRATIONS);

  const addRegistration = useCallback((userId: string, eventId: string) => {
    setRegistrations((prev) => {
      if (prev.some((r) => r.userId === userId && r.eventId === eventId)) return prev;
      return [
        ...prev,
        { userId, eventId, registeredAt: new Date().toISOString() },
      ];
    });
  }, []);

  const isRegistered = useCallback(
    (userId: string, eventId: string) =>
      registrations.some((r) => r.userId === userId && r.eventId === eventId),
    [registrations]
  );

  const getCountForEvent = useCallback(
    (eventId: string) => registrations.filter((r) => r.eventId === eventId).length,
    [registrations]
  );

  const getForUser = useCallback(
    (userId: string) => registrations.filter((r) => r.userId === userId),
    [registrations]
  );

  const value: RegistrationsContextValue = {
    registrations,
    addRegistration,
    isRegistered,
    getCountForEvent,
    getForUser,
  };

  return (
    <RegistrationsContext.Provider value={value}>
      {children}
    </RegistrationsContext.Provider>
  );
}

export function useRegistrations() {
  const ctx = useContext(RegistrationsContext);
  if (!ctx) throw new Error("useRegistrations must be used within RegistrationsProvider");
  return ctx;
}
