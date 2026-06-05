export function Header() {
  return (
    <header className="site-header">
      <div className="brand">
        <span className="brand-mark">SJ</span>
        <div>
          <p className="brand-title">Scientific Journal Tracker</p>
          <p className="brand-subtitle">He thong theo doi xu huong cong bo khoa hoc</p>
        </div>
      </div>
      <nav className="site-nav">
        <a href="#tong-quan">Tong quan</a>
        <a href="#module">Module</a>
        <a href="#quy-trinh">Quy trinh</a>
      </nav>
    </header>
  );
}
