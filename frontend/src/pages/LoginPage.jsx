import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getRoleLabel, useAuth } from "../context/AuthContext";
import { login } from "../services/authService";

const demoAccounts = [
  { username: "admin", password: "123456", label: "System Administrator demo", role: "ADMIN" },
  { username: "student01", password: "123456", label: "Lecturer / Student demo", role: "LECTURER_STUDENT" },
  { username: "researcher01", password: "123456", label: "Researcher demo", role: "RESEARCHER" }
];

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn } = useAuth();
  const [credentials, setCredentials] = useState({
    username: "student01",
    password: "123456"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const selectedDemoAccount = demoAccounts.find((account) => account.username === credentials.username);

  function handleChange(event) {
    const { name, value } = event.target;
    setCredentials((currentState) => ({
      ...currentState,
      [name]: value
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const user = await login(credentials);
      signIn(user);

      const fallbackPath = user.role === "ADMIN" ? "/admin" : "/dashboard";
      const nextPath = location.state?.from ?? fallbackPath;
      navigate(nextPath);
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="mock-screen auth-screen">
      <div className="auth-art">
        <p className="eyebrow">Đăng nhập hệ thống</p>
        <h2>Truy cập kho dữ liệu xu hướng công bố khoa học</h2>
        <div className="auth-metrics">
          <div className="metric-card">
            <strong>24.8K</strong>
            <span>paper đã đồng bộ</span>
          </div>
          <div className="metric-card">
            <strong>380+</strong>
            <span>keyword theo dõi hằng tháng</span>
          </div>
        </div>
        <div className="demo-account-list">
          {demoAccounts.map((account) => (
            <button
              key={account.username}
              type="button"
              className="demo-chip"
              onClick={() => setCredentials({ username: account.username, password: account.password })}
            >
              {account.label}
            </button>
          ))}
        </div>
      </div>
      <form className="auth-panel" onSubmit={handleSubmit}>
        <div className="panel-head">
          <h3>Đăng nhập</h3>
        </div>
        {error ? <div className="state-box error-box inline-state">{error}</div> : null}
        <label className="field">
          <span>Tên đăng nhập</span>
          <input name="username" value={credentials.username} onChange={handleChange} />
        </label>
        <label className="field">
          <span>Mật khẩu</span>
          <input name="password" value={credentials.password} onChange={handleChange} type="password" />
        </label>
        <div className="inline-row">
          <span className="status-pill">{getRoleLabel(selectedDemoAccount?.role ?? "LECTURER_STUDENT")}</span>
          <span className="helper-link">Quên mật khẩu?</span>
        </div>
        <button type="submit" className="primary-cta" disabled={isSubmitting}>
          {isSubmitting ? "Đang đăng nhập..." : "Đăng nhập vào dashboard"}
        </button>
        <button type="button" className="ghost-cta">Tạo tài khoản</button>
      </form>
    </section>
  );
}
