import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchPapers } from "../services/paperService";

const quickKeywords = ["machine learning", "deep learning", "computer vision", "trend analysis"];

export function PaperSearchPage() {
  const [filters, setFilters] = useState({
    keyword: "",
    author: "",
    journal: "",
    year: ""
  });
  const [papers, setPapers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadPapers(filters);
  }, []);

  async function loadPapers(nextFilters) {
    setIsLoading(true);
    setError("");

    try {
      const data = await fetchPapers(nextFilters);
      setPapers(data);
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
    const nextFilters = {
      keyword: "",
      author: "",
      journal: "",
      year: ""
    };
    setFilters(nextFilters);
    loadPapers(nextFilters);
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
          <strong>03</strong>
          <span>Nguồn học thuật</span>
        </div>
        <div className="mini-stat">
          <strong>12 tháng</strong>
          <span>Khoảng phân tích gần nhất</span>
        </div>
      </div>
      <div className="search-layout">
        <form id="paper-filter-form" className="filter-panel" onSubmit={handleSubmit}>
          <h3>Bộ lọc</h3>
          <label className="field">
            <span>Keyword</span>
            <input name="keyword" value={filters.keyword} onChange={handleChange} />
          </label>
          <label className="field">
            <span>Author</span>
            <input name="author" value={filters.author} onChange={handleChange} placeholder="Andrew Ng" />
          </label>
          <label className="field">
            <span>Journal</span>
            <input name="journal" value={filters.journal} onChange={handleChange} placeholder="IEEE Access" />
          </label>
          <label className="field">
            <span>Năm công bố</span>
            <input name="year" value={filters.year} onChange={handleChange} placeholder="2025" />
          </label>
          <div className="filter-helper">
            <span>Từ khóa gợi ý</span>
          </div>
          <div className="quick-chip-row">
            {quickKeywords.map((keyword) => (
              <button
                key={keyword}
                type="button"
                className={filters.keyword === keyword ? "filter-chip active" : "filter-chip"}
                onClick={() => {
                  const nextFilters = { ...filters, keyword };
                  setFilters(nextFilters);
                  loadPapers(nextFilters);
                }}
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
            <span>Dữ liệu thật từ backend</span>
          </div>
          {error ? <div className="state-box error-box">{error}</div> : null}
          {!error && isLoading ? <div className="state-box">Đang tải danh sách bài báo...</div> : null}
          {!error && !isLoading && papers.length === 0 ? <div className="state-box">Không tìm thấy bài báo phù hợp.</div> : null}
          {!error && !isLoading && papers.length > 0 ? (
            <div className="paper-list">
              {papers.map((paper) => (
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
                  <div className="paper-actions">
                    <Link to={`/papers/${paper.id}`} className="text-link">Xem chi tiết</Link>
                    <button type="button" className="card-action">Lưu</button>
                  </div>
                </article>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
