import { demoPapers } from "../data/demoData";
import { apiGet, shouldUseDemoFallback } from "./apiClient";

function normalizePaper(paper) {
  return {
    id: paper.id,
    title: paper.title,
    authors: paper.authors ?? [],
    journal: paper.journal ?? "Chưa rõ journal",
    publicationYear: paper.publicationYear ?? "N/A",
    keywords: paper.keywords ?? [],
    sourceName: paper.sourceName ?? "Nội bộ",
    sourcePaperId: paper.sourcePaperId ?? "N/A",
    abstractText: paper.abstractText ?? "Chưa có tóm tắt.",
    citationCount: paper.citationCount ?? 0,
    doi: paper.doi ?? "Chưa có DOI",
    url: paper.url ?? "#",
    trendScore: paper.trendScore ?? 0,
    monthlyGrowth: paper.monthlyGrowth ?? "+0%"
  };
}

function filterPapers(items, filters = {}) {
  return items.filter((paper) => {
    const keyword = filters.keyword?.trim().toLowerCase() ?? "";
    const author = filters.author?.trim().toLowerCase() ?? "";
    const journal = filters.journal?.trim().toLowerCase() ?? "";
    const year = filters.year?.trim() ?? "";
    const source = filters.source?.trim().toLowerCase() ?? "";

    const inKeyword = !keyword || paper.title.toLowerCase().includes(keyword) || paper.keywords.some((item) => item.toLowerCase().includes(keyword));
    const inAuthor = !author || paper.authors.some((item) => item.toLowerCase().includes(author));
    const inJournal = !journal || paper.journal.toLowerCase().includes(journal);
    const inYear = !year || String(paper.publicationYear) === year;
    const inSource = !source || paper.sourceName.toLowerCase().includes(source);

    return inKeyword && inAuthor && inJournal && inYear && inSource;
  });
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
  if (filters.source?.trim()) {
    params.set("source", filters.source.trim());
  }

  const queryString = params.toString();
  return queryString ? `?${queryString}` : "";
}

function toSearchResult(items, mode) {
  return {
    items,
    total: items.length,
    sourceMode: mode,
    sourceCount: new Set(items.map((paper) => paper.sourceName)).size
  };
}

export async function fetchPapers(filters = {}) {
  try {
    const payload = await apiGet(`/api/v1/papers${buildSearchQuery(filters)}`);
    const backendItems = (payload.data ?? []).map(normalizePaper);
    return toSearchResult(backendItems, "backend");
  } catch (error) {
    if (!shouldUseDemoFallback(error)) {
      throw error;
    }

    const demoItems = filterPapers(demoPapers.map(normalizePaper), filters);
    return toSearchResult(demoItems, "demo");
  }
}

export async function fetchPaperDetail(paperId) {
  try {
    const payload = await apiGet(`/api/v1/papers/${paperId}`);
    return {
      paper: normalizePaper(payload.data ?? payload),
      sourceMode: "backend"
    };
  } catch (error) {
    if (!shouldUseDemoFallback(error)) {
      throw error;
    }

    const matchedPaper = demoPapers.find((paper) => String(paper.id) === String(paperId));
    if (!matchedPaper) {
      return {
        paper: null,
        sourceMode: "demo"
      };
    }

    return {
      paper: normalizePaper(matchedPaper),
      sourceMode: "demo"
    };
  }
}

export function getRelatedPapers(paperId, limit = 3) {
  return demoPapers
    .filter((paper) => String(paper.id) !== String(paperId))
    .slice(0, limit)
    .map(normalizePaper);
}
