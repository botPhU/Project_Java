import { apiGet } from "./apiClient";

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
  return payload.data ?? [];
}

export async function fetchPaperDetail(paperId) {
  const payload = await apiGet(`/api/v1/papers/${paperId}`);
  return payload.data;
}
