import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { MOCK_REGISTRATIONS, type Registration } from "../data/mockData";

interface RegistrationsContextValue {
  registrations: Registration[];
  addRegistration: (userId: string, eventId: string, paymentDone?: boolean) => void;
  removeRegistration: (userId: string, eventId: string) => void;
  markAttended: (userId: string, eventId: string) => void;
  markCertificateIssued: (userId: string, eventId: string) => void;
  isRegistered: (userId: string, eventId: string) => boolean;
  getCountForEvent: (eventId: string) => number;
  getForUser: (userId: string) => Registration[];
  getRegistration: (userId: string, eventId: string) => Registration | undefined;
}

const RegistrationsContext = createContext<RegistrationsContextValue | null>(null);

export function RegistrationsProvider({ children }: { children: ReactNode }) {
  const [registrations, setRegistrations] = useState<Registration[]>(MOCK_REGISTRATIONS);

  const addRegistration = useCallback((userId: string, eventId: string, paymentDone = false) => {
    setRegistrations((prev) => {
      if (prev.some((r) => r.userId === userId && r.eventId === eventId)) return prev;
      return [
        ...prev,
        { userId, eventId, registeredAt: new Date().toISOString(), paymentDone, attended: false, certificateIssued: false },
      ];
    });
  }, []);

  const removeRegistration = useCallback((userId: string, eventId: string) => {
    setRegistrations((prev) => prev.filter((r) => !(r.userId === userId && r.eventId === eventId)));
  }, []);

  const markAttended = useCallback((userId: string, eventId: string) => {
    setRegistrations((prev) =>
      prev.map((r) =>
        r.userId === userId && r.eventId === eventId ? { ...r, attended: true } : r
      )
    );
  }, []);

  const markCertificateIssued = useCallback((userId: string, eventId: string) => {
    setRegistrations((prev) =>
      prev.map((r) =>
        r.userId === userId && r.eventId === eventId ? { ...r, certificateIssued: true } : r
      )
    );
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

  const getRegistration = useCallback(
    (userId: string, eventId: string) =>
      registrations.find((r) => r.userId === userId && r.eventId === eventId),
    [registrations]
  );

  const value: RegistrationsContextValue = {
    registrations,
    addRegistration,
    removeRegistration,
    markAttended,
    markCertificateIssued,
    isRegistered,
    getCountForEvent,
    getForUser,
    getRegistration,
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
