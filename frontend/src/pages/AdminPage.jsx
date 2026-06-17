import { useEffect, useState } from "react";
import { fetchAdminOverview, runManualSync } from "../services/adminService";

const adminTabs = ["Tổng quan", "Người dùng", "Nguồn dữ liệu", "Lịch đồng bộ"];

export function AdminPage() {
  const [activeTab, setActiveTab] = useState("Tổng quan");
  const [overview, setOverview] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    async function loadOverview() {
      setIsLoading(true);
      setError("");

      try {
        const result = await fetchAdminOverview();
        setOverview(result);
      } catch (loadError) {
        setError(loadError.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadOverview();
  }, []);

  async function handleRunSync() {
    setIsSyncing(true);
    setFeedback("");
    setError("");

    try {
      const result = await runManualSync();
      setFeedback(result.message ?? "Đã gửi yêu cầu đồng bộ.");
    } catch (syncError) {
      setError(syncError.message);
    } finally {
      setIsSyncing(false);
    }
  }

  if (isLoading) {
    return (
      <section className="mock-screen admin-screen">
        <div className="state-box">Đang tải không gian quản trị...</div>
      </section>
    );
  }

  if (error && !overview) {
    return (
      <section className="mock-screen admin-screen">
        <div className="state-box error-box">{error}</div>
      </section>
    );
  }

  if (!overview) {
    return null;
  }

  return (
    <section className="mock-screen admin-screen">
      <div className="admin-sidebar">
        <h3>Quản trị hệ thống</h3>
        <div className="admin-nav">
          {adminTabs.map((tab) => (
            <button
              key={tab}
              type="button"
              className={activeTab === tab ? "admin-link active" : "admin-link"}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="admin-main">
        <div className="admin-banner">
          <div>
            <p className="eyebrow">System Administrator</p>
            <h2>Kiểm soát hệ thống, nguồn dữ liệu và tiến trình đồng bộ</h2>
          </div>
          <div className="banner-actions">
            <span className={overview.sourceMode === "demo" ? "mode-badge demo" : "mode-badge"}>
              {overview.sourceMode === "demo" ? "Đang dùng dữ liệu demo" : "Đang dùng dữ liệu backend"}
            </span>
            <button type="button" className="primary-cta compact" onClick={handleRunSync} disabled={isSyncing}>
              {isSyncing ? "Đang gửi..." : "Chạy đồng bộ"}
            </button>
          </div>
        </div>

        {feedback ? <div className="state-box inline-state">{feedback}</div> : null}
        {error ? <div className="state-box error-box">{error}</div> : null}

        <div className="stats-grid admin-stats-grid">
          {overview.metrics.map((metric) => (
            <div className="hero-stat" key={metric.label}>
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
              <small>{metric.note}</small>
            </div>
          ))}
        </div>

        <div className="admin-grid">
          <div className="side-card">
            <h3>Nguồn dữ liệu</h3>
            {overview.sourceRows.map((item) => (
              <div className="source-row" key={item.name}>
                <div>
                  <strong>{item.name}</strong>
                  <p>{item.schedule}</p>
                </div>
                <span className="status-pill">{item.status}</span>
              </div>
            ))}
          </div>

          <div className="side-card">
            <h3>Tài khoản gần đây</h3>
            {overview.recentUsers.map((item) => (
              <div className="source-row" key={item.username}>
                <div>
                  <strong>{item.username}</strong>
                  <p>{item.role}</p>
                </div>
                <span className="status-pill alt">{item.status}</span>
              </div>
            ))}
          </div>

          <div className="side-card wide">
            <div className="card-head">
              <h3>Hàng đợi xử lý</h3>
              <span>{activeTab}</span>
            </div>
            <ul className="simple-list">
              {overview.syncQueue.map((item) => (
                <li key={`${item.time}-${item.job}`}>
                  {item.time} - {item.job} - {item.status}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
