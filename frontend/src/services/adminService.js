import { demoRecentUsers, demoSourceStatus, demoSyncQueue } from "../data/demoData";
import { apiGet, apiPost, shouldUseDemoFallback } from "./apiClient";

function buildDemoAdminData() {
  return {
    metrics: [
      { label: "Người dùng hoạt động", value: "128", note: "7 ngày gần nhất" },
      { label: "Lượt đồng bộ thành công", value: "14/15", note: "Chu kỳ tuần này" },
      { label: "Bản ghi metadata mới", value: "3.804", note: "Sau lần sync gần nhất" }
    ],
    sourceRows: demoSourceStatus,
    recentUsers: demoRecentUsers,
    syncQueue: demoSyncQueue,
    sourceMode: "demo"
  };
}

export async function fetchAdminOverview() {
  try {
    const [papersPayload, notificationsPayload] = await Promise.all([
      apiGet("/api/v1/papers"),
      apiGet("/api/v1/notifications")
    ]);

    const papers = papersPayload.data ?? [];
    const notifications = notificationsPayload.data ?? [];
    const sources = [...new Set(papers.map((item) => item.sourceName).filter(Boolean))];

    return {
      metrics: [
        { label: "Tổng số bài báo", value: String(papers.length), note: "Từ PostgreSQL backend" },
        { label: "Nguồn dữ liệu đang có", value: String(sources.length), note: sources.join(", ") || "Chưa có nguồn" },
        { label: "Thông báo hiện có", value: String(notifications.length), note: "Từ bảng notifications" }
      ],
      sourceRows: sources.map((name) => ({
        name,
        schedule: "Manual / seeded",
        status: "ACTIVE"
      })),
      recentUsers: [
        { username: "admin", role: "ADMIN", status: "Active" },
        { username: "student01", role: "LECTURER_STUDENT", status: "Seeded" },
        { username: "researcher01", role: "RESEARCHER", status: "Seeded" }
      ],
      syncQueue: [
        { time: "Now", job: "Manual sync available", status: "Ready" },
        { time: "Cron", job: "Scheduled sync", status: "Configured" }
      ],
      sourceMode: "backend"
    };
  } catch (error) {
    if (!shouldUseDemoFallback(error)) {
      throw error;
    }

    return buildDemoAdminData();
  }
}

export async function runManualSync() {
  const payload = await apiPost("/api/v1/admin/sync/run", null, {
    headers: {},
    defaultErrorMessage: "Không thể gửi yêu cầu chạy đồng bộ."
  });
  return payload.data ?? payload;
}
