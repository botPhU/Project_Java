const workflow = [
  "Người dùng tìm kiếm bài báo hoặc mở trang tổng quan xu hướng.",
  "Hệ thống truy xuất dữ liệu liên quan theo từ khóa, tác giả và nguồn học thuật.",
  "Dữ liệu được tổng hợp để tạo biểu đồ, danh sách từ khóa và chủ đề nổi bật.",
  "Các bài báo quan trọng có thể được lưu lại để theo dõi lâu dài.",
  "Thông tin cập nhật tiếp tục được phản ánh vào bảng điều khiển và khu vực quản trị."
];

export function WorkflowSection() {
  return (
    <section className="section" id="quy-trinh">
      <div className="section-heading">
        <p className="eyebrow">Cách hệ thống vận hành</p>
        <h2>Luồng sử dụng tổng quát cho việc theo dõi công bố khoa học</h2>
      </div>
      <div className="workflow">
        {workflow.map((step, index) => (
          <div className="workflow-item" key={step}>
            <span className="workflow-number">{index + 1}</span>
            <p>{step}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
