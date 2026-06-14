import { demoRecentUsers, demoSourceStatus, demoSyncQueue } from "../data/demoData";
import { apiGet, shouldUseDemoFallback } from "./apiClient";

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
    const payload = await apiGet("/api/v1/admin/overview");
    return {
      ...(payload.data ?? payload),
      sourceMode: "backend"
    };
  } catch (error) {
    if (!shouldUseDemoFallback(error)) {
      throw error;
    }

    return buildDemoAdminData();
  }
}
