const overviewCards = [
  {
    title: "Tra cứu bài báo",
    description: "Tìm kiếm theo từ khóa, tác giả, tạp chí và xem đầy đủ thông tin bài báo."
  },
  {
    title: "Phân tích xu hướng",
    description: "Theo dõi biến động công bố theo năm, từ khóa nổi bật và chủ đề tăng trưởng."
  },
  {
    title: "Theo dõi cá nhân",
    description: "Lưu bài báo, quản lý mối quan tâm nghiên cứu và nhận cập nhật quan trọng."
  }
];

export function OverviewSection() {
  return (
    <section className="section" id="tong-quan">
      <div className="section-heading">
        <p className="eyebrow">Tổng quan hệ thống</p>
        <h2>Các giá trị cốt lõi dành cho người dùng nghiên cứu</h2>
      </div>
      <div className="grid grid-three">
        {overviewCards.map((card) => (
          <article className="info-card" key={card.title}>
            <h3>{card.title}</h3>
            <p>{card.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
