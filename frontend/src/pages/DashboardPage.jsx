import { useEffect, useState } from "react";
import { fetchDashboardOverview } from "../services/dashboardService";

const periods = ["6 tháng", "12 tháng", "Toàn kỳ"];

export function DashboardPage() {
  const [period, setPeriod] = useState("12 tháng");
  const [overview, setOverview] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadOverview() {
      setIsLoading(true);
      setError("");

      try {
        const result = await fetchDashboardOverview(period);
        setOverview(result);
      } catch (loadError) {
        setError(loadError.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadOverview();
  }, [period]);

  if (isLoading) {
    return (
      <section className="mock-screen dashboard-screen">
        <div className="state-box">Đang tải dữ liệu tổng quan...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mock-screen dashboard-screen">
        <div className="state-box error-box">{error}</div>
      </section>
    );
  }

  if (!overview) {
    return null;
  }

  const maxCount = Math.max(...overview.yearlyTrend.map((item) => item.count), 1);

  return (
    <section className="mock-screen dashboard-screen">
      <div className="dashboard-head">
        <div>
          <p className="eyebrow">Tổng quan nghiên cứu</p>
          <h2>Tổng quan xu hướng công bố theo từ khóa và tạp chí</h2>
        </div>
        <div className="dashboard-controls">
          <div className="period-switch">
            {periods.map((item) => (
              <button
                key={item}
                type="button"
                className={period === item ? "period-button active" : "period-button"}
                onClick={() => setPeriod(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <span className="mode-badge">Dữ liệu hiện có</span>
        </div>
      </div>

      <div className="stats-grid">
        {overview.summary.map((card) => (
          <div className="hero-stat" key={card.label}>
            <strong>{card.value}</strong>
            <span>{card.label}</span>
            <small>{card.note}</small>
          </div>
        ))}
      </div>

      <div className="chart-grid">
        <div className="chart-card">
          <div className="card-head">
            <h3>Công bố theo năm</h3>
            <span>{period}</span>
          </div>
          <div className="bar-chart">
            {overview.yearlyTrend.map((item) => (
              <div className="bar-col" key={item.year}>
                <span style={{ height: `${Math.round((item.count / maxCount) * 100)}%` }} />
                <small>{item.year}</small>
              </div>
            ))}
          </div>
        </div>

        <div className="chart-card">
          <div className="card-head">
            <h3>Top từ khóa</h3>
            <span>Xếp hạng hiện tại</span>
          </div>
          <div className="leader-list">
            {overview.topKeywords.map((item) => (
              <div className="leader-row rich-row" key={item.name}>
                <div>
                  <strong>{item.name}</strong>
                  <p>{item.count} bài báo liên quan</p>
                </div>
                <span className="growth-pill">{item.delta}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="dashboard-lower-grid">
        <div className="chart-card">
          <div className="card-head">
            <h3>Chủ đề đang theo dõi</h3>
            <span>Những trọng tâm nổi bật hiện tại</span>
          </div>
          <div className="topic-list">
            {overview.monitoredTopics.map((topic) => (
              <div className="topic-row" key={`${topic.name}-${topic.note}`}>
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
            <span>Đề xuất để tiếp tục phân tích</span>
          </div>
          <ul className="simple-list">
            {overview.suggestions.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="dashboard-lower-grid">
        <div className="chart-card">
          <div className="card-head">
            <h3>Thông báo gần đây</h3>
            <span>Các cập nhật bạn nên lưu ý</span>
          </div>
          <div className="topic-list">
            {overview.notifications.map((item) => (
              <div className="topic-row" key={item.id}>
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.type}</p>
                </div>
                <span className="status-pill alt">{item.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="chart-card">
          <div className="card-head">
            <h3>Nguồn dữ liệu đang theo dõi</h3>
            <span>Phân bổ theo bài báo hiện có</span>
          </div>
          <div className="topic-list">
            {overview.sourceStatus.map((item) => (
              <div className="topic-row" key={item.name}>
                <div>
                  <strong>{item.name}</strong>
                  <p>{item.schedule} - {item.records}</p>
                </div>
                <span className="status-pill">{item.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
