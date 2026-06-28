import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { login } from "../services/authService";

const productHighlights = [
  "Theo dõi xu hướng công bố theo từ khóa, tác giả và tạp chí",
  "Tra cứu chi tiết bài báo từ nhiều nguồn học thuật",
  "Lưu bài báo quan tâm và theo dõi các chủ đề nổi bật"
];

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn } = useAuth();
  const [credentials, setCredentials] = useState({
    username: location.state?.prefillUsername ?? "",
    password: location.state?.prefillPassword ?? ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(location.state?.message ?? "");

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
        <p className="eyebrow">Không gian nghiên cứu</p>
        <h2>Đăng nhập để theo dõi xu hướng công bố khoa học</h2>
        <p>
          Truy cập tài khoản của bạn để xem tổng quan xu hướng, tìm kiếm bài báo,
          quản lý danh sách lưu và theo dõi các chủ đề nghiên cứu quan trọng.
        </p>

        <div className="auth-metrics">
          <div className="metric-card">
            <strong>24,8K</strong>
            <span>Bản ghi bài báo đang được theo dõi</span>
          </div>
          <div className="metric-card">
            <strong>380+</strong>
            <span>Từ khóa nổi bật được tổng hợp mỗi tháng</span>
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
      </div>

      <form className="auth-panel" onSubmit={handleSubmit}>
        <div className="panel-head">
          <p className="panel-kicker">Scientific Journal Tracker</p>
          <h3>Đăng nhập</h3>
        </div>

        {error ? <div className="state-box error-box inline-state">{error}</div> : null}

        <label className="field">
          <span>Tên đăng nhập</span>
          <input name="username" value={credentials.username} onChange={handleChange} autoComplete="username" required />
        </label>

        <label className="field">
          <span>Mật khẩu</span>
          <input
            name="password"
            value={credentials.password}
            onChange={handleChange}
            type="password"
            autoComplete="current-password"
            required
          />
        </label>

        <div className="inline-row">
          <span className="helper-link">Sử dụng tài khoản đã đăng ký để truy cập không gian làm việc cá nhân.</span>
        </div>

        <button type="submit" className="primary-cta" disabled={isSubmitting}>
          {isSubmitting ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>

        <div className="auth-secondary-actions">
          <span className="helper-link">Chưa có tài khoản?</span>
          <Link to="/register" className="text-link">Tạo tài khoản mới</Link>
        </div>
      </form>
    </section>
  );
}
