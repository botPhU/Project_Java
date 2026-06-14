import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchPapers } from "../services/paperService";
import { getSavedPaperIds, isPaperSaved, toggleSavedPaper } from "../services/libraryService";

const quickKeywords = ["machine learning", "deep learning", "computer vision", "large language model"];
const availableSources = ["", "OpenAlex", "Crossref", "Semantic Scholar"];

const initialFilters = {
  keyword: "",
  author: "",
  journal: "",
  year: "",
  source: ""
};

export function PaperSearchPage() {
  const [filters, setFilters] = useState(initialFilters);
  const [papers, setPapers] = useState([]);
  const [savedPaperIds, setSavedPaperIds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [sourceMode, setSourceMode] = useState("backend");
  const [sourceCount, setSourceCount] = useState(0);

  useEffect(() => {
    setSavedPaperIds(getSavedPaperIds());
    loadPapers(initialFilters);
  }, []);

  async function loadPapers(nextFilters) {
    setIsLoading(true);
    setError("");

    try {
      const result = await fetchPapers(nextFilters);
      setPapers(result.items);
      setSourceMode(result.sourceMode);
      setSourceCount(result.sourceCount);
      setSavedPaperIds(result.items.filter((paper) => isPaperSaved(paper.id)).map((paper) => String(paper.id)));
    } catch (loadError) {
      setError(loadError.message);
    } finally {
      setIsLoading(false);
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFilters((currentFilters) => ({
      ...currentFilters,
      [name]: value
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    loadPapers(filters);
  }

  function handleReset() {
    setFilters(initialFilters);
    loadPapers(initialFilters);
  }

  function handleQuickKeyword(keyword) {
    const nextFilters = {
      ...filters,
      keyword
    };
    setFilters(nextFilters);
    loadPapers(nextFilters);
  }

  function handleToggleSave(paperId) {
    const isSaved = toggleSavedPaper(paperId);
    setSavedPaperIds((currentState) => {
      const normalizedId = String(paperId);
      if (isSaved) {
        return currentState.includes(normalizedId) ? currentState : [...currentState, normalizedId];
      }
      return currentState.filter((item) => item !== normalizedId);
    });
  }

  return (
    <section className="mock-screen search-screen">
      <div className="toolbar">
        <div>
          <p className="eyebrow">Tìm kiếm bài báo</p>
          <h2>Tra cứu bài báo theo keyword, tác giả và journal</h2>
        </div>
        <div className="toolbar-actions">
          <button type="button" className="ghost-cta compact-ghost" onClick={handleReset}>Xóa bộ lọc</button>
          <button type="submit" form="paper-filter-form" className="primary-cta compact">Lọc dữ liệu</button>
        </div>
      </div>

      <div className="insight-strip">
        <div className="mini-stat">
          <strong>{papers.length}</strong>
          <span>Kết quả hiện tại</span>
        </div>
        <div className="mini-stat">
          <strong>{String(sourceCount).padStart(2, "0")}</strong>
          <span>Nguồn học thuật</span>
        </div>
        <div className="mini-stat">
          <strong>{sourceMode === "demo" ? "Demo" : "Live"}</strong>
          <span>Chế độ dữ liệu</span>
        </div>
      </div>

      <div className="search-layout">
        <form id="paper-filter-form" className="filter-panel" onSubmit={handleSubmit}>
          <div className="panel-section-head">
            <div>
              <h3>Bộ lọc</h3>
              <p>Tối ưu cho việc demo nhanh và nối API thật sau này.</p>
            </div>
            <span className={sourceMode === "demo" ? "mode-badge demo" : "mode-badge"}>
              {sourceMode === "demo" ? "Dữ liệu demo" : "Dữ liệu backend"}
            </span>
          </div>

          <div className="filter-grid">
            <label className="field">
              <span>Keyword</span>
              <input name="keyword" value={filters.keyword} onChange={handleChange} placeholder="Ví dụ: machine learning" />
            </label>

            <label className="field">
              <span>Tác giả</span>
              <input name="author" value={filters.author} onChange={handleChange} placeholder="Ví dụ: Andrew Ng" />
            </label>

            <label className="field">
              <span>Journal</span>
              <input name="journal" value={filters.journal} onChange={handleChange} placeholder="Ví dụ: IEEE Access" />
            </label>

            <label className="field">
              <span>Năm công bố</span>
              <input name="year" value={filters.year} onChange={handleChange} placeholder="Ví dụ: 2025" />
            </label>

            <label className="field field-full">
              <span>Nguồn dữ liệu</span>
              <select name="source" value={filters.source} onChange={handleChange}>
                {availableSources.map((source) => (
                  <option key={source || "all"} value={source}>
                    {source || "Tất cả nguồn"}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="filter-helper">
            <span>Từ khóa gợi ý</span>
          </div>

          <div className="quick-chip-row">
            {quickKeywords.map((keyword) => (
              <button
                key={keyword}
                type="button"
                className={filters.keyword === keyword ? "filter-chip active" : "filter-chip"}
                onClick={() => handleQuickKeyword(keyword)}
              >
                {keyword}
              </button>
            ))}
          </div>

          <button type="submit" className="primary-cta">Áp dụng bộ lọc</button>
        </form>

        <div className="results-panel">
          <div className="results-head">
            <strong>{isLoading ? "Đang tải..." : `${papers.length} kết quả tìm thấy`}</strong>
            <span>{sourceMode === "demo" ? "Đang dùng dữ liệu demo" : "Dữ liệu thật từ backend"}</span>
          </div>

          {error ? <div className="state-box error-box">{error}</div> : null}
          {!error && isLoading ? <div className="state-box">Đang tải danh sách bài báo...</div> : null}
          {!error && !isLoading && papers.length === 0 ? (
            <div className="state-box">
              Không tìm thấy bài báo phù hợp. Hãy thử đổi keyword hoặc bỏ bớt điều kiện lọc.
            </div>
          ) : null}

          {!error && !isLoading && papers.length > 0 ? (
            <div className="paper-list">
              {papers.map((paper) => {
                const saved = savedPaperIds.includes(String(paper.id));
                return (
                  <article className="paper-card" key={paper.id}>
                    <div className="paper-meta">
                      <span className="paper-year">{paper.publicationYear}</span>
                      <span>{paper.journal}</span>
                    </div>

                    <h3>{paper.title}</h3>
                    <p>{paper.authors.join(", ")}</p>

                    <div className="tag-row">
                      {paper.keywords.map((tag) => (
                        <span className="tag-chip" key={tag}>{tag}</span>
                      ))}
                    </div>

                    <div className="paper-footnote">
                      <span>Nguồn: {paper.sourceName}</span>
                      <span>Trích dẫn: {paper.citationCount}</span>
                    </div>

                    <div className="paper-actions">
                      <Link to={`/papers/${paper.id}`} className="text-link">Xem chi tiết</Link>
                      <button type="button" className="card-action" onClick={() => handleToggleSave(paper.id)}>
                        {saved ? "Đã lưu" : "Lưu"}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
