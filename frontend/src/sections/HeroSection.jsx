export function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-copy">
        <p className="eyebrow">De tai Java Web Application</p>
        <h1>Theo doi xu huong cong bo khoa hoc mot cach truc quan va de mo rong</h1>
        <p className="hero-text">
          He thong giup sinh vien, giang vien va researcher tim kiem bai bao, phan tich xu huong
          cong bo theo thoi gian va theo doi cac chu de nghien cuu noi bat.
        </p>
        <div className="hero-actions">
          <a className="primary-button" href="#module">Xem cau truc module</a>
          <a className="secondary-button" href="#quy-trinh">Xem quy trinh xu ly</a>
        </div>
      </div>
      <div className="hero-panel">
        <div className="stat-card">
          <span className="stat-value">03</span>
          <span className="stat-label">Nguon hoc thuat du kien</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">08+</span>
          <span className="stat-label">Module nghiep vu chinh</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">02</span>
          <span className="stat-label">Thanh phan chinh: Frontend va Backend</span>
        </div>
      </div>
    </section>
  );
}
