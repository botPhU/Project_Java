import { createContext, useContext, useMemo, useState } from "react";

export const AUTH_STORAGE_KEY = "sj_tracker_auth";

const AuthContext = createContext(null);

function readStoredSession() {
  try {
    const raw = window.localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) {
      return null;
    }

    const session = JSON.parse(raw);
    const isValidBackendSession = Boolean(
      session?.username && session?.authMode === "backend" && session?.basicAuthToken
    );

    if (!isValidBackendSession) {
      window.localStorage.removeItem(AUTH_STORAGE_KEY);
      return null;
    }

    return session;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(readStoredSession);

  function signIn(user) {
    setSession(user);
    window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
  }

  function signOut() {
    setSession(null);
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
  }

  const value = useMemo(() => ({
    session,
    isAuthenticated: Boolean(session),
    signIn,
    signOut
  }), [session]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider.");
  }
  return context;
}

export function getRoleLabel(role) {
  switch (role) {
    case "RESEARCHER":
      return "Nhà nghiên cứu";
    case "LECTURER_STUDENT":
      return "Giảng viên / Sinh viên";
    case "ADMIN":
      return "Quản trị hệ thống";
    default:
      return role ?? "";
  }
}
