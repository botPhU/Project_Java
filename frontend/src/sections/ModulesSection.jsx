const modules = [
  "Đăng nhập và quản lý tài khoản",
  "Tra cứu bài báo",
  "Phân tích xu hướng theo từ khóa",
  "Tổng quan dữ liệu nghiên cứu",
  "Lưu bài báo quan tâm",
  "Theo dõi chủ đề nổi bật",
  "Thông báo cập nhật",
  "Quản lý nguồn dữ liệu",
  "Không gian quản trị"
];

export function ModulesSection() {
  return (
    <section className="section" id="module">
      <div className="section-heading">
        <p className="eyebrow">Các tính năng chính</p>
        <h2>Những khối chức năng giúp theo dõi nghiên cứu hiệu quả hơn</h2>
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
