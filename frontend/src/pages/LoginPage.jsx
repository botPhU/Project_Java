import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getRoleLabel, useAuth } from "../context/AuthContext";
import { getDemoAccounts, login } from "../services/authService";

const demoAccounts = getDemoAccounts();

const productHighlights = [
  "Theo dõi xu hướng công bố theo keyword, tác giả và journal",
  "Tra cứu chi tiết bài báo từ nhiều nguồn học thuật",
  "Quản trị nguồn dữ liệu và tiến trình đồng bộ tập trung"
];

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn } = useAuth();
  const [credentials, setCredentials] = useState({
    username: "admin",
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
      navigate(nextPath, { replace: true });
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
        <p>
          Giao diện này đã sẵn sàng cho cả lúc kết nối backend và lúc demo nội bộ.
          Bạn có thể dùng tài khoản mẫu để kiểm tra toàn bộ luồng frontend ngay lập tức.
        </p>

        <div className="auth-metrics">
          <div className="metric-card">
            <strong>24,8K</strong>
            <span>Bản ghi bài báo đã đồng bộ</span>
          </div>
          <div className="metric-card">
            <strong>380+</strong>
            <span>Từ khóa được theo dõi mỗi tháng</span>
          </div>
        </div>

        <div className="highlight-list">
          {productHighlights.map((item) => (
            <div className="highlight-row" key={item}>
              <span className="highlight-dot" />
              <p>{item}</p>
            </div>
          ))}
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
          <p className="panel-kicker">Scientific Journal Tracker</p>
          <h3>Đăng nhập</h3>
        </div>

        {error ? <div className="state-box error-box inline-state">{error}</div> : null}

        <label className="field">
          <span>Tên đăng nhập</span>
          <input name="username" value={credentials.username} onChange={handleChange} autoComplete="username" />
        </label>

        <label className="field">
          <span>Mật khẩu</span>
          <input
            name="password"
            value={credentials.password}
            onChange={handleChange}
            type="password"
            autoComplete="current-password"
          />
        </label>

        <div className="inline-row">
          <span className="status-pill">{getRoleLabel(selectedDemoAccount?.role ?? "LECTURER_STUDENT")}</span>
          <span className="helper-link">Nếu backend chưa bật, hệ thống sẽ tự chuyển sang chế độ demo.</span>
        </div>

        <button type="submit" className="primary-cta" disabled={isSubmitting}>
          {isSubmitting ? "Đang đăng nhập..." : "Đăng nhập vào hệ thống"}
        </button>

        <button type="button" className="ghost-cta" disabled>
          Tạo tài khoản
        </button>
      </form>
    </section>
  );
}
