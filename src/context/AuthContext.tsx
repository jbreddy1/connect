import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { MOCK_USERS, type User, type Role } from "../data/mockData";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

interface AuthContextValue extends AuthState {
  login: (email: string, password: string, role?: Role) => User | null;
  signup: (name: string, email: string, password: string, role: Role) => User | null;
  logout: () => void;
  updateUser: (updates: Partial<Pick<User, "name" | "email" | "class" | "section" | "rollNo" | "mobile">>) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback((email: string, _password: string, role?: Role): User | null => {
    const found = MOCK_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (found) {
      setUser(found);
      return found;
    }
    // Guest login: create temp student with chosen role
    const newUser: User = {
      id: "guest-" + Date.now(),
      name: email.split("@")[0],
      email,
      role: role ?? "student",
    };
    setUser(newUser);
    return newUser;
  }, []);

  const signup = useCallback((name: string, email: string, _password: string, role: Role): User | null => {
    const newUser: User = {
      id: "user-" + Date.now(),
      name,
      email,
      role,
    };
    setUser(newUser);
    return newUser;
  }, []);

  const logout = useCallback(() => setUser(null), []);

  const updateUser = useCallback((updates: Partial<Pick<User, "name" | "email" | "class" | "section" | "rollNo" | "mobile">>) => {
    setUser((prev) => (prev ? { ...prev, ...updates } : null));
  }, []);

  const value: AuthContextValue = {
    user,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
