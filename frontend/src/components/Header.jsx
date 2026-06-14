import { NavLink } from "react-router-dom";
import { getRoleLabel, useAuth } from "../context/AuthContext";

function navClassName({ isActive }) {
  return isActive ? "active-nav" : "";
}

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
            <NavLink to="/dashboard" className={navClassName}>Dashboard</NavLink>
            <NavLink to="/papers" className={navClassName}>Bài báo</NavLink>
            {session?.role === "ADMIN" ? (
              <NavLink to="/admin" className={navClassName}>Quản trị</NavLink>
            ) : null}
            <div className="session-stack">
              <span className="session-name">{session?.fullName ?? session?.username}</span>
              <span className="session-badge">{getRoleLabel(session?.role)}</span>
              <span className={session?.authMode === "demo" ? "mode-badge demo" : "mode-badge"}>
                {session?.authMode === "demo" ? "Chế độ demo" : "Kết nối backend"}
              </span>
            </div>
            <button type="button" className="nav-button" onClick={signOut}>Đăng xuất</button>
          </>
        ) : (
          <NavLink to="/login" className={navClassName}>Đăng nhập</NavLink>
        )}
      </nav>
    </header>
  );
}
