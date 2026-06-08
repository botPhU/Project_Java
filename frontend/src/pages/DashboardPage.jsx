const trendCards = [
  { label: "Tổng số paper đã lưu", value: "24,812" },
  { label: "Paper mới 12 tháng qua", value: "1,286" },
  { label: "Topic nổi bật", value: "42" },
  { label: "Tỉ lệ metadata hoàn chỉnh", value: "89%" }
];

const topKeywords = [
  ["machine learning", "1,204"],
  ["deep learning", "984"],
  ["computer vision", "760"],
  ["large language model", "655"]
];

const monitoredTopics = [
  { name: "AI in Education", growth: "+18%", note: "Tăng mạnh ở nhóm IEEE Access" },
  { name: "LLM Evaluation", growth: "+24%", note: "Xuất hiện dày hơn trong 6 tháng gần đây" },
  { name: "Computer Vision", growth: "+11%", note: "Ổn định và có lượng trích dẫn cao" }
];

export function DashboardPage() {
  return (
    <section className="mock-screen dashboard-screen">
      <div className="dashboard-head">
        <div>
          <h2>Tổng quan xu hướng công bố theo keyword và journal</h2>
        </div>
        <div className="inline-row">
          <span className="status-pill alt">Cập nhật: hôm nay</span>
        </div>
      </div>
      <div className="stats-grid">
        {trendCards.map((card) => (
          <div className="hero-stat" key={card.label}>
            <strong>{card.value}</strong>
            <span>{card.label}</span>
          </div>
        ))}
      </div>
      <div className="chart-grid">
        <div className="chart-card">
          <div className="card-head">
            <h3>Công bố theo năm</h3>
            <span>2019 - 2025</span>
          </div>
          <div className="bar-chart">
            {[34, 48, 56, 72, 86, 94, 120].map((value) => (
              <div className="bar-col" key={value}>
                <span style={{ height: `${value}%` }} />
              </div>
            ))}
          </div>
        </div>
        <div className="chart-card">
          <div className="card-head">
            <h3>Top keyword</h3>
            <span>Tháng này</span>
          </div>
          <div className="leader-list">
            {topKeywords.map(([name, count]) => (
              <div className="leader-row" key={name}>
                <span>{name}</span>
                <strong>{count}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="dashboard-lower-grid">
        <div className="chart-card">
          <div className="card-head">
            <h3>Topic đang theo dõi</h3>
            <span>Ưu tiên trong kỳ này</span>
          </div>
          <div className="topic-list">
            {monitoredTopics.map((topic) => (
              <div className="topic-row" key={topic.name}>
                <div>
                  <strong>{topic.name}</strong>
                  <p>{topic.note}</p>
                </div>
                <span className="growth-pill">{topic.growth}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="chart-card">
          <div className="card-head">
            <h3>Gợi ý hành động</h3>
            <span>Cho nhóm nghiên cứu</span>
          </div>
          <ul className="simple-list">
            <li>Tăng tần suất đồng bộ OpenAlex vào đầu tuần để nắm paper mới.</li>
            <li>Tạo bộ theo dõi riêng cho keyword “LLM evaluation”.</li>
            <li>Ưu tiên xuất báo cáo topic Computer Vision trong tháng này.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
