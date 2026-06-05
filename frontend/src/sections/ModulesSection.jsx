const modules = [
  "Auth va phan quyen",
  "Quan ly user",
  "Tim kiem paper",
  "Trend tracking",
  "Dashboard",
  "Bookmark va follow",
  "Notification",
  "Dong bo academic API",
  "Quan tri he thong"
];

export function ModulesSection() {
  return (
    <section className="section" id="module">
      <div className="section-heading">
        <p className="eyebrow">Kien truc module</p>
        <h2>Cac khoi chuc nang duoc tach ro de chia viec</h2>
      </div>
      <div className="module-list">
        {modules.map((moduleName, index) => (
          <div className="module-item" key={moduleName}>
            <span className="module-index">{String(index + 1).padStart(2, "0")}</span>
            <span className="module-name">{moduleName}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
