import { NavLink } from "react-router-dom";
import { getRoleLabel, useAuth } from "../context/AuthContext";

export function Header() {
  const { session, isAuthenticated, signOut } = useAuth();

  return (
    <header className="site-header">
      <div className="brand">
        <span className="brand-mark">SJ</span>
        <div>
          <p className="brand-title">Scientific Journal Tracker</p>
          <p className="brand-subtitle">Theo dõi xu hướng công bố khoa học</p>
        </div>
      </div>
      <nav className="site-nav">
        {isAuthenticated ? (
          <>
            <NavLink to="/dashboard" className={({ isActive }) => isActive ? "active-nav" : ""}>Dashboard</NavLink>
            <NavLink to="/papers" className={({ isActive }) => isActive ? "active-nav" : ""}>Bài báo</NavLink>
            {session?.role === "ADMIN" ? (
              <NavLink to="/admin" className={({ isActive }) => isActive ? "active-nav" : ""}>System Administrator</NavLink>
            ) : null}
            <span className="session-badge">{getRoleLabel(session?.role)}</span>
            <button type="button" className="nav-button" onClick={signOut}>Đăng xuất</button>
          </>
        ) : (
          <NavLink to="/login" className={({ isActive }) => isActive ? "active-nav" : ""}>Đăng nhập</NavLink>
        )}
      </nav>
    </header>
  );
}
