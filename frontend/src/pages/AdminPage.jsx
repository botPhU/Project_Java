import { useEffect, useState } from "react";
import { fetchAdminOverview, runManualSync } from "../services/adminService";

const adminTabs = ["Tong quan", "Nguoi dung", "Nguon du lieu", "Lich dong bo"];

export function AdminPage() {
  const [activeTab, setActiveTab] = useState("Tong quan");
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
      setFeedback(result.message ?? "Da gui yeu cau dong bo.");
    } catch (syncError) {
      setError(syncError.message);
    } finally {
      setIsSyncing(false);
    }
  }

  if (isLoading) {
    return (
      <section className="mock-screen admin-screen">
        <div className="state-box">Dang tai khong gian quan tri...</div>
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
        <h3>Quan tri he thong</h3>
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
            <h2>Kiem soat he thong, nguon du lieu va tien trinh dong bo</h2>
          </div>
          <div className="banner-actions">
            <span className={overview.sourceMode === "demo" ? "mode-badge demo" : "mode-badge"}>
              {overview.sourceMode === "demo" ? "Dang dung du lieu demo" : "Dang dung du lieu backend"}
            </span>
            <button type="button" className="primary-cta compact" onClick={handleRunSync} disabled={isSyncing}>
              {isSyncing ? "Dang gui..." : "Chay dong bo"}
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
            <h3>Nguon du lieu</h3>
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
            <h3>Tai khoan gan day</h3>
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
              <h3>Hang doi xu ly</h3>
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
