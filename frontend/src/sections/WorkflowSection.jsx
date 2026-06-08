const workflow = [
  "Frontend gửi request tìm kiếm hoặc xem dashboard.",
  "Backend xử lý nghiệp vụ và truy vấn cơ sở dữ liệu.",
  "Job đồng bộ định kỳ nạp metadata từ OpenAlex, Crossref, Semantic Scholar.",
  "Bảng trend tổng hợp được cập nhật để phục vụ biểu đồ nhanh hơn.",
  "Frontend hiển thị kết quả cho người dùng dưới dạng danh sách, chart và thông báo."
];

export function WorkflowSection() {
  return (
    <section className="section" id="quy-trinh">
      <div className="section-heading">
        <p className="eyebrow">Quy trình xử lý</p>
        <h2>Luồng nghiệp vụ tổng quát của hệ thống</h2>
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
