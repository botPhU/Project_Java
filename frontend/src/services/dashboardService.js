import { demoNotifications, demoPapers, demoSourceStatus, demoYearlyTrend } from "../data/demoData";
import { apiGet, shouldUseDemoFallback } from "./apiClient";

function normalizeYearlyTrend(items) {
  return items.map((item) => ({
    year: item.year,
    count: item.count
  }));
}

function buildDemoOverview(period) {
  const items = demoPapers;
  const uniqueKeywords = new Map();

  for (const paper of items) {
    for (const keyword of paper.keywords) {
      uniqueKeywords.set(keyword, (uniqueKeywords.get(keyword) ?? 0) + 1);
    }
  }

  const topKeywords = [...uniqueKeywords.entries()]
    .sort((left, right) => right[1] - left[1])
    .slice(0, 5)
    .map(([name, count], index) => ({
      name,
      count,
      delta: `+${6 + index * 3}%`
    }));

  const monitoredTopics = items
    .slice()
    .sort((left, right) => right.trendScore - left.trendScore)
    .slice(0, 4)
    .map((paper) => ({
      name: paper.keywords[0],
      growth: paper.monthlyGrowth,
      note: `${paper.journal} - ${paper.title}`,
      score: paper.trendScore
    }));

  return {
    summary: [
      { label: "Tổng số bài báo", value: items.length.toString(), note: "Từ dữ liệu đang truy cập" },
      { label: "Nguồn học thuật", value: new Set(items.map((paper) => paper.sourceName)).size.toString().padStart(2, "0"), note: "OpenAlex, Crossref, Semantic Scholar" },
      { label: "Keyword nổi bật", value: uniqueKeywords.size.toString(), note: "Đã chuẩn hóa metadata" },
      { label: "Khoảng phân tích", value: period, note: "Tùy chọn trên dashboard" }
    ],
    yearlyTrend: normalizeYearlyTrend(demoYearlyTrend),
    topKeywords,
    monitoredTopics,
    suggestions: [
      "Ưu tiên theo dõi nhóm keyword về large language model trong tháng này.",
      "Tăng tần suất đồng bộ OpenAlex vào đầu tuần để lấy bài báo mới sớm hơn.",
      "Tạo báo cáo riêng cho AI in Education vì đang tăng đều theo tháng."
    ],
    notifications: demoNotifications,
    sourceStatus: demoSourceStatus,
    sourceMode: "demo"
  };
}

export async function fetchDashboardOverview(period = "12 tháng") {
  try {
    const payload = await apiGet(`/api/v1/dashboard/overview?period=${encodeURIComponent(period)}`);
    return {
      ...(payload.data ?? payload),
      sourceMode: "backend"
    };
  } catch (error) {
    if (!shouldUseDemoFallback(error)) {
      throw error;
    }

    return buildDemoOverview(period);
  }
}
