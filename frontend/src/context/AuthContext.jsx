import { createContext, useContext, useMemo, useState } from "react";

const STORAGE_KEY = "sj_tracker_auth";

const AuthContext = createContext(null);

function readStoredSession() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(readStoredSession);

  function signIn(user) {
    setSession(user);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  }

  function signOut() {
    setSession(null);
    window.localStorage.removeItem(STORAGE_KEY);
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
