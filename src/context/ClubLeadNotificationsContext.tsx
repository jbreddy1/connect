import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export interface PaidRegistrationNotification {
  id: string;
  eventId: string;
  eventTitle: string;
  userId: string;
  userName: string;
  userEmail: string;
  paidAt: string;
}

interface ClubLeadNotificationsContextValue {
  paidRegistrations: PaidRegistrationNotification[];
  notifyPaidRegistration: (payload: Omit<PaidRegistrationNotification, "id" | "paidAt">) => void;
}

const ClubLeadNotificationsContext = createContext<ClubLeadNotificationsContextValue | null>(null);

export function ClubLeadNotificationsProvider({ children }: { children: ReactNode }) {
  const [paidRegistrations, setPaidRegistrations] = useState<PaidRegistrationNotification[]>([]);

  const notifyPaidRegistration = useCallback(
    (payload: Omit<PaidRegistrationNotification, "id" | "paidAt">) => {
      const entry: PaidRegistrationNotification = {
        ...payload,
        id: "notif-" + Date.now(),
        paidAt: new Date().toISOString(),
      };
      setPaidRegistrations((prev) => [entry, ...prev]);
    },
    []
  );

  const value: ClubLeadNotificationsContextValue = {
    paidRegistrations,
    notifyPaidRegistration,
  };

  return (
    <ClubLeadNotificationsContext.Provider value={value}>
      {children}
    </ClubLeadNotificationsContext.Provider>
  );
}

export function useClubLeadNotifications() {
  const ctx = useContext(ClubLeadNotificationsContext);
  if (!ctx) throw new Error("useClubLeadNotifications must be used within ClubLeadNotificationsProvider");
  return ctx;
}
