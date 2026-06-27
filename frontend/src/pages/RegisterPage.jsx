import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../services/authService";

const roleOptions = [
  { value: "LECTURER_STUDENT", label: "Giảng viên / Sinh viên" },
  { value: "RESEARCHER", label: "Nhà nghiên cứu" }
];

const initialFormState = {
  fullName: "",
  username: "",
  email: "",
  role: "LECTURER_STUDENT",
  institution: "",
  researchInterests: "",
  password: "",
  confirmPassword: ""
};

export function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialFormState);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((currentState) => ({
      ...currentState,
      [name]: value
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Mật khẩu xác nhận không khớp.");
      return;
    }

    setIsSubmitting(true);

    try {
      await register(form);
      navigate("/login", {
        replace: true,
        state: {
          message: "Tạo tài khoản thành công. Bạn có thể đăng nhập ngay bây giờ.",
          prefillUsername: form.username.trim(),
          prefillPassword: form.password
        }
      });
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="mock-screen auth-screen">
      <div className="auth-art">
        <p className="eyebrow">Tạo tài khoản</p>
        <h2>Tạo hồ sơ để theo dõi bài báo và xu hướng nghiên cứu</h2>
        <p>
          Điền thông tin cơ bản để bắt đầu theo dõi chủ đề bạn quan tâm,
          lưu bài báo quan trọng và sử dụng không gian phân tích cá nhân.
        </p>

        <div className="highlight-list">
          <div className="highlight-row">
            <span className="highlight-dot" />
            <p>Tạo hồ sơ với thông tin học thuật rõ ràng để cá nhân hóa trải nghiệm sử dụng.</p>
          </div>
          <div className="highlight-row">
            <span className="highlight-dot" />
            <p>Chọn vai trò phù hợp với nhu cầu sử dụng ngay từ khi đăng ký tài khoản.</p>
          </div>
          <div className="highlight-row">
            <span className="highlight-dot" />
            <p>Sau khi tạo tài khoản xong, bạn có thể đăng nhập ngay với thông tin vừa đăng ký.</p>
          </div>
        </div>
      </div>

      <form className="auth-panel" onSubmit={handleSubmit}>
        <div className="panel-head">
          <p className="panel-kicker">Scientific Journal Tracker</p>
          <h3>Đăng ký tài khoản</h3>
        </div>

        {error ? <div className="state-box error-box inline-state">{error}</div> : null}

        <label className="field">
          <span>Họ và tên</span>
          <input
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            autoComplete="name"
            required
          />
        </label>

        <label className="field">
          <span>Tên đăng nhập</span>
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            autoComplete="username"
            minLength={3}
            required
          />
        </label>

        <label className="field">
          <span>Email</span>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
            required
          />
        </label>

        <label className="field">
          <span>Vai trò</span>
          <select name="role" value={form.role} onChange={handleChange} required>
            {roleOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="field">
          <span>Trường / Đơn vị công tác</span>
          <input
            name="institution"
            value={form.institution}
            onChange={handleChange}
            autoComplete="organization"
            placeholder="Ví dụ: FPT University"
          />
        </label>

        <label className="field">
          <span>Lĩnh vực quan tâm</span>
          <textarea
            name="researchInterests"
            value={form.researchInterests}
            onChange={handleChange}
            rows={3}
            placeholder="Ví dụ: Machine learning, bibliometrics, data mining"
          />
        </label>

        <label className="field">
          <span>Mật khẩu</span>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            autoComplete="new-password"
            minLength={6}
            required
          />
        </label>

        <label className="field">
          <span>Xác nhận mật khẩu</span>
          <input
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
            autoComplete="new-password"
            minLength={6}
            required
          />
        </label>

        <button type="submit" className="primary-cta" disabled={isSubmitting}>
          {isSubmitting ? "Đang tạo tài khoản..." : "Tạo tài khoản"}
        </button>

        <div className="auth-secondary-actions">
          <span className="helper-link">Đã có tài khoản?</span>
          <Link to="/login" className="text-link">Quay lại đăng nhập</Link>
        </div>
      </form>
    </section>
  );
}
