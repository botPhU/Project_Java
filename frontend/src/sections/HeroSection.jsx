export function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-copy">
        <p className="eyebrow">Phân tích xu hướng nghiên cứu</p>
        <h1>Theo dõi công bố khoa học một cách trực quan, rõ ràng và dễ sử dụng</h1>
        <p className="hero-text">
          Nền tảng hỗ trợ người học, giảng viên và nhà nghiên cứu tra cứu bài báo,
          theo dõi xu hướng công bố theo thời gian và phát hiện các chủ đề nổi bật.
        </p>
        <div className="hero-actions">
          <a className="primary-button" href="#module">Khám phá tính năng</a>
          <a className="secondary-button" href="#quy-trinh">Xem cách hệ thống vận hành</a>
        </div>
      </div>
      <div className="hero-panel">
        <div className="stat-card">
          <span className="stat-value">03</span>
          <span className="stat-label">Nguồn học thuật đang theo dõi</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">08+</span>
          <span className="stat-label">Nhóm chức năng hỗ trợ nghiên cứu</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">24K+</span>
          <span className="stat-label">Bản ghi có thể mở rộng để phân tích xu hướng</span>
        </div>
      </div>
    </section>
  );
}
