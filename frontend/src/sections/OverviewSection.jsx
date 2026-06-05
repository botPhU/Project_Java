const overviewCards = [
  {
    title: "Tim kiem bai bao",
    description: "Tra cuu theo keyword, tac gia, journal va xem chi tiet metadata."
  },
  {
    title: "Phan tich xu huong",
    description: "Thong ke theo nam, top keyword, top journal va topic dang tang truong."
  },
  {
    title: "Theo doi lau dai",
    description: "Bookmark bai bao, follow topic, follow journal va nhan notification."
  }
];

export function OverviewSection() {
  return (
    <section className="section" id="tong-quan">
      <div className="section-heading">
        <p className="eyebrow">Tong quan he thong</p>
        <h2>Cac gia tri cot loi cua de tai</h2>
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
