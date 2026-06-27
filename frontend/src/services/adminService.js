import { apiGet, apiPost } from "./apiClient";

export async function fetchAdminOverview() {
  const [papersPayload, notificationsPayload] = await Promise.all([
    apiGet("/api/v1/papers"),
    apiGet("/api/v1/notifications")
  ]);

  const papers = papersPayload.data ?? [];
  const notifications = notificationsPayload.data ?? [];
  const sources = [...new Set(papers.map((item) => item.sourceName).filter(Boolean))];

  return {
    metrics: [
      { label: "Tổng số bài báo", value: String(papers.length), note: "Dữ liệu hiện có trong hệ thống" },
      { label: "Nguồn dữ liệu đang có", value: String(sources.length), note: sources.join(", ") || "Chưa có nguồn" },
      { label: "Thông báo hiện có", value: String(notifications.length), note: "Các cập nhật đã ghi nhận" }
    ],
    sourceRows: sources.map((name) => ({
      name,
      schedule: "Đang theo dõi",
      status: "ACTIVE"
    })),
    recentUsers: [
      { username: "admin", role: "ADMIN", status: "Active" },
      { username: "student01", role: "LECTURER_STUDENT", status: "Available" },
      { username: "researcher01", role: "RESEARCHER", status: "Available" }
    ],
    syncQueue: [
      { time: "Now", job: "Cập nhật thủ công", status: "Sẵn sàng" },
      { time: "Cron", job: "Lịch cập nhật định kỳ", status: "Đã cấu hình" }
    ]
  };
}

export async function runManualSync() {
  const payload = await apiPost("/api/v1/admin/sync/run", null, {
    headers: {},
    defaultErrorMessage: "Không thể gửi yêu cầu chạy đồng bộ."
  });
  return payload.data ?? payload;
}
