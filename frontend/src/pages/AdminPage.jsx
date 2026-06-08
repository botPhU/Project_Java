const sourceRows = [
  ["OpenAlex", "Hoạt động", "02:00 mỗi ngày"],
  ["Crossref", "Hoạt động", "02:10 mỗi ngày"],
  ["Semantic Scholar", "Cần xác thực", "Tạm dừng"]
];

const recentUsers = [
  ["admin", "System Administrator", "Đã xác minh"],
  ["student01", "Lecturer / Student", "Hoạt động"],
  ["researcher01", "Researcher", "Hoạt động"]
];

export function AdminPage() {
  return (
    <section className="mock-screen admin-screen">
      <div className="admin-sidebar">
        <h3>System Administrator</h3>
        <div className="admin-nav">
          <span className="admin-link active">Tổng quan</span>
          <span className="admin-link">Người dùng</span>
          <span className="admin-link">Nguồn dữ liệu</span>
          <span className="admin-link">Lịch đồng bộ</span>
          <span className="admin-link">Nhật ký lỗi</span>
        </div>
      </div>
      <div className="admin-main">
        <div className="admin-banner">
          <div>
            <h2>Kiểm soát hệ thống, nguồn dữ liệu và tiến trình đồng bộ</h2>
          </div>
          <button type="button" className="primary-cta compact">Chạy đồng bộ</button>
        </div>
        <div className="admin-grid">
          <div className="side-card">
            <h3>Nguồn dữ liệu</h3>
            {sourceRows.map(([name, status, schedule]) => (
              <div className="source-row" key={name}>
                <div>
                  <strong>{name}</strong>
                  <p>{schedule}</p>
                </div>
                <span className="status-pill">{status}</span>
              </div>
            ))}
          </div>
          <div className="side-card">
            <h3>Thống kê hệ thống</h3>
            <div className="leader-row"><span>User đang hoạt động</span><strong>128</strong></div>
            <div className="leader-row"><span>Job thành công 7 ngày</span><strong>14/15</strong></div>
            <div className="leader-row"><span>Metadata mới</span><strong>3,804</strong></div>
          </div>
          <div className="side-card">
            <h3>Tài khoản gần đây</h3>
            {recentUsers.map(([username, role, status]) => (
              <div className="source-row" key={username}>
                <div>
                  <strong>{username}</strong>
                  <p>{role}</p>
                </div>
                <span className="status-pill alt">{status}</span>
              </div>
            ))}
          </div>
          <div className="side-card wide">
            <h3>Hàng đợi xử lý</h3>
            <ul className="simple-list">
              <li>02:00 - Daily metadata sync - Đang lên lịch</li>
              <li>02:20 - Trend aggregate rebuild - Đang lên lịch</li>
              <li>08:00 - Notification digest - Đang lên lịch</li>
              <li>Manual sync - Sẵn sàng cho admin kích hoạt</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
