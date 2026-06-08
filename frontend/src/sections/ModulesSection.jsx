const modules = [
  "Auth và phân quyền",
  "Quản lý user",
  "Tìm kiếm paper",
  "Trend tracking",
  "Dashboard",
  "Bookmark và follow",
  "Notification",
  "Đồng bộ academic API",
  "Quản trị hệ thống"
];

export function ModulesSection() {
  return (
    <section className="section" id="module">
      <div className="section-heading">
        <p className="eyebrow">Kiến trúc module</p>
        <h2>Các khối chức năng được tách rõ để chia việc</h2>
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
