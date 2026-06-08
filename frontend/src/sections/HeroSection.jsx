export function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-copy">
        <p className="eyebrow">Đề tài Java Web Application</p>
        <h1>Theo dõi xu hướng công bố khoa học một cách trực quan và dễ mở rộng</h1>
        <p className="hero-text">
          Hệ thống giúp sinh viên, giảng viên và researcher tìm kiếm bài báo, phân tích xu hướng
          công bố theo thời gian và theo dõi các chủ đề nghiên cứu nổi bật.
        </p>
        <div className="hero-actions">
          <a className="primary-button" href="#module">Xem cấu trúc module</a>
          <a className="secondary-button" href="#quy-trinh">Xem quy trình xử lý</a>
        </div>
      </div>
      <div className="hero-panel">
        <div className="stat-card">
          <span className="stat-value">03</span>
          <span className="stat-label">Nguồn học thuật dự kiến</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">08+</span>
          <span className="stat-label">Module nghiệp vụ chính</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">02</span>
          <span className="stat-label">Thành phần chính: Frontend và Backend</span>
        </div>
      </div>
    </section>
  );
}
