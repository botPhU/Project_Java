import { apiGet } from "./apiClient";

function normalizePaper(paper) {
  return {
    id: paper.id,
    title: paper.title,
    authors: paper.authors ?? [],
    journal: paper.journal ?? "Chưa rõ journal",
    publicationYear: paper.publicationYear ?? "N/A",
    keywords: paper.keywords ?? [],
    topics: paper.topics ?? [],
    sourceName: paper.sourceName ?? "Nội bộ",
    sourcePaperId: paper.sourcePaperId ?? "N/A",
    abstractText: paper.abstractText ?? "Chưa có tóm tắt.",
    citationCount: paper.citationCount ?? 0,
    doi: paper.doi ?? "Chưa có DOI",
    url: paper.url ?? "#",
    documentType: paper.documentType ?? "N/A",
    language: paper.language ?? "N/A",
    trendScore: paper.trendScore ?? 0,
    monthlyGrowth: paper.monthlyGrowth ?? "+0%"
  };
}

function buildSearchQuery(filters) {
  const params = new URLSearchParams();

  if (filters.keyword?.trim()) {
    params.set("keyword", filters.keyword.trim());
  }
  if (filters.author?.trim()) {
    params.set("author", filters.author.trim());
  }
  if (filters.journal?.trim()) {
    params.set("journal", filters.journal.trim());
  }
  if (filters.year?.trim()) {
    params.set("year", filters.year.trim());
  }

  const queryString = params.toString();
  return queryString ? `?${queryString}` : "";
}

export async function fetchPapers(filters = {}) {
  const payload = await apiGet(`/api/v1/papers${buildSearchQuery(filters)}`);
  const backendItems = (payload.data ?? []).map(normalizePaper);
  const filteredItems = filters.source?.trim()
    ? backendItems.filter((item) => item.sourceName.toLowerCase().includes(filters.source.trim().toLowerCase()))
    : backendItems;

  return {
    items: filteredItems,
    total: filteredItems.length,
    sourceCount: new Set(filteredItems.map((paper) => paper.sourceName)).size
  };
}

export async function fetchPaperDetail(paperId) {
  const payload = await apiGet(`/api/v1/papers/${paperId}`);
  return normalizePaper(payload.data ?? payload);
}

export async function getRelatedPapers(paperId, limit = 3) {
  const payload = await apiGet("/api/v1/papers");
  return (payload.data ?? [])
    .map(normalizePaper)
    .filter((paper) => String(paper.id) !== String(paperId))
    .slice(0, limit);
}
