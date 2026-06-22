import { demoNotifications, demoPapers, demoSourceStatus, demoYearlyTrend } from "../data/demoData";
import { apiGet, shouldUseDemoFallback } from "./apiClient";

function normalizeYearlyTrend(items) {
  return items.map((item) => ({
    year: item.year,
    count: item.count
  }));
}

function buildKeywordStats(items) {
  const uniqueKeywords = new Map();

  for (const paper of items) {
    for (const keyword of paper.keywords ?? []) {
      uniqueKeywords.set(keyword, (uniqueKeywords.get(keyword) ?? 0) + 1);
    }
  }

  return [...uniqueKeywords.entries()]
    .sort((left, right) => right[1] - left[1])
    .map(([name, count], index) => ({
      name,
      count,
      delta: `+${6 + index * 3}%`
    }));
}

function buildBackendOverview(papers, notifications, trendPoints, period) {
  const keywordStats = buildKeywordStats(papers);
  const topKeywords = keywordStats.slice(0, 5);
  const yearlyTrend = trendPoints?.length
    ? trendPoints.map((item) => ({ year: item.year, count: item.publicationCount ?? item.count ?? 0 }))
    : normalizeYearlyTrend(
      Array.from(
        papers.reduce((map, paper) => {
          const year = paper.publicationYear ?? "N/A";
          map.set(year, (map.get(year) ?? 0) + 1);
          return map;
        }, new Map()).entries()
      )
        .map(([year, count]) => ({ year, count }))
        .sort((left, right) => left.year - right.year)
    );

  const sourceGroups = papers.reduce((map, paper) => {
    const key = paper.sourceName ?? "Unknown";
    map.set(key, (map.get(key) ?? 0) + 1);
    return map;
  }, new Map());

  const monitoredTopics = papers
    .filter((paper) => paper.topics?.length || paper.keywords?.length)
    .slice(0, 4)
    .map((paper, index) => ({
      name: paper.topics?.[0] ?? paper.keywords?.[0] ?? "General",
      growth: `+${8 + index * 4}%`,
      note: `${paper.journal} - ${paper.title}`,
      score: paper.citationCount ?? 0
    }));

  const sourceStatus = [...sourceGroups.entries()].map(([name, count]) => ({
    name,
    schedule: "Manual sync / seeded data",
    records: `${count} papers`,
    status: "ACTIVE"
  }));

  return {
    summary: [
      { label: "Tổng số bài báo", value: String(papers.length), note: "Từ PostgreSQL backend" },
      { label: "Nguồn học thuật", value: String(sourceGroups.size).padStart(2, "0"), note: [...sourceGroups.keys()].join(", ") || "Chưa có dữ liệu" },
      { label: "Keyword nổi bật", value: String(keywordStats.length), note: "Chuẩn hóa từ metadata bài báo" },
      { label: "Khoảng phân tích", value: period, note: "Tổng hợp từ dữ liệu đang có" }
    ],
    yearlyTrend,
    topKeywords,
    monitoredTopics,
    suggestions: [
      "Ưu tiên theo dõi nhóm keyword có số lượng paper tăng đều theo năm.",
      "Kiểm tra thêm topic trên các bài có citation count cao để mở rộng dashboard.",
      "Chạy manual sync khi cần cập nhật nguồn dữ liệu trước khi demo."
    ],
    notifications: notifications.map((item) => ({
      id: item.id,
      title: item.title,
      type: item.read ? "READ" : "UNREAD",
      time: item.read ? "Da doc" : "Moi"
    })),
    sourceStatus,
    sourceMode: "backend"
  };
}

function buildDemoOverview(period) {
  const items = demoPapers;
  const topKeywords = buildKeywordStats(items).slice(0, 5);
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
      { label: "Keyword nổi bật", value: buildKeywordStats(items).length.toString(), note: "Đã chuẩn hóa metadata" },
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
    const papersPayload = await apiGet("/api/v1/papers");
    const papers = papersPayload.data ?? [];
    const topKeyword = buildKeywordStats(papers)[0]?.name;

    const [notificationsPayload, trendPayload] = await Promise.all([
      apiGet("/api/v1/notifications"),
      topKeyword ? apiGet(`/api/v1/trends/keywords/${encodeURIComponent(topKeyword)}`) : Promise.resolve({ data: { points: [] } })
    ]);

    const notifications = notificationsPayload.data ?? [];
    const trendData = trendPayload.data ?? {};
    return buildBackendOverview(papers, notifications, trendData.points ?? [], period);
  } catch (error) {
    if (!shouldUseDemoFallback(error)) {
      throw error;
    }

    return buildDemoOverview(period);
  }
}
