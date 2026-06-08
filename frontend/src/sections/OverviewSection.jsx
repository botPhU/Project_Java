const overviewCards = [
  {
    title: "Tìm kiếm bài báo",
    description: "Tra cứu theo keyword, tác giả, journal và xem chi tiết metadata."
  },
  {
    title: "Phân tích xu hướng",
    description: "Thống kê theo năm, top keyword, top journal và topic đang tăng trưởng."
  },
  {
    title: "Theo dõi lâu dài",
    description: "Bookmark bài báo, follow topic, follow journal và nhận notification."
  }
];

export function OverviewSection() {
  return (
    <section className="section" id="tong-quan">
      <div className="section-heading">
        <p className="eyebrow">Tổng quan hệ thống</p>
        <h2>Các giá trị cốt lõi của đề tài</h2>
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
