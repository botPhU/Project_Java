import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchPaperDetail, getRelatedPapers } from "../services/paperService";
import { followKeyword, isPaperSaved, toggleSavedPaper } from "../services/libraryService";

export function PaperDetailPage() {
  const { paperId } = useParams();
  const [paper, setPaper] = useState(null);
  const [relatedPapers, setRelatedPapers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [sourceMode, setSourceMode] = useState("backend");
  const [isSaved, setIsSaved] = useState(false);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    async function loadPaperDetail() {
      setIsLoading(true);
      setError("");
      setFeedback("");

      try {
        const result = await fetchPaperDetail(paperId);
        setPaper(result.paper);
        setSourceMode(result.sourceMode);
        setRelatedPapers(getRelatedPapers(paperId, 3));
        setIsSaved(isPaperSaved(paperId));
      } catch (loadError) {
        setError(loadError.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadPaperDetail();
  }, [paperId]);

  function handleToggleSave() {
    const nextSavedState = toggleSavedPaper(paperId);
    setIsSaved(nextSavedState);
    setFeedback(nextSavedState ? "Đã lưu bài báo vào thư viện cá nhân." : "Đã bỏ bài báo khỏi thư viện cá nhân.");
  }

  function handleFollowKeyword() {
    if (!paper?.keywords?.length) {
      return;
    }

    const followedKeywords = followKeyword(paper.keywords[0]);
    const followedKeyword = followedKeywords.at(-1) ?? paper.keywords[0];
    setFeedback(`Đã theo dõi keyword "${followedKeyword}".`);
  }

  if (isLoading) {
    return (
      <section className="mock-screen detail-screen">
        <div className="state-box">Đang tải chi tiết bài báo...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mock-screen detail-screen">
        <div className="state-box error-box">{error}</div>
      </section>
    );
  }

  if (!paper) {
    return (
      <section className="mock-screen detail-screen">
        <div className="state-box">Không có dữ liệu bài báo.</div>
      </section>
    );
  }

  return (
    <section className="mock-screen detail-screen">
      <div className="detail-main">
        <Link to="/papers" className="back-link">← Quay lại danh sách bài báo</Link>
        <p className="eyebrow">Chi tiết bài báo</p>
        <h2>{paper.title}</h2>

        <div className="meta-line">
          <span>Paper ID: {paper.id}</span>
          <span>Năm: {paper.publicationYear}</span>
          <span>{paper.journal}</span>
          <span>{paper.sourceName}</span>
        </div>

        <div className="tag-row">
          {paper.keywords.map((keyword) => (
            <span className="tag-chip" key={keyword}>{keyword}</span>
          ))}
        </div>

        <div className="detail-block">
          <h3>Tóm tắt</h3>
          <p>{paper.abstractText}</p>
        </div>

        <div className="detail-grid">
          <div className="detail-block">
            <h3>Tác giả</h3>
            <p>{paper.authors.join(", ")}</p>
          </div>
          <div className="detail-block">
            <h3>Từ khóa</h3>
            <p>{paper.keywords.join(", ")}</p>
          </div>
          <div className="detail-block">
            <h3>Thông tin nguồn</h3>
            <p>{paper.sourceName} - {paper.sourcePaperId}</p>
          </div>
          <div className="detail-block">
            <h3>Chỉ số trích dẫn</h3>
            <p>{paper.citationCount} lượt trích dẫn</p>
          </div>
          <div className="detail-block">
            <h3>DOI</h3>
            <p>{paper.doi}</p>
          </div>
          <div className="detail-block">
            <h3>Liên kết ngoài</h3>
            <p>
              <a href={paper.url} className="inline-link" target="_blank" rel="noreferrer">
                Mở trang bài báo
              </a>
            </p>
          </div>
        </div>
      </div>

      <aside className="detail-side">
        <div className="side-card">
          <div className="card-head">
            <h3>Thao tác nhanh</h3>
            <span className={sourceMode === "demo" ? "mode-badge demo" : "mode-badge"}>
              {sourceMode === "demo" ? "Demo" : "Backend"}
            </span>
          </div>
          <button type="button" className="primary-cta" onClick={handleToggleSave}>
            {isSaved ? "Bỏ lưu bài báo" : "Lưu bài báo"}
          </button>
          <button type="button" className="ghost-cta" onClick={handleFollowKeyword}>
            Theo dõi keyword
          </button>
          {feedback ? <div className="state-box inline-state">{feedback}</div> : null}
        </div>

        <div className="side-card">
          <h3>Tóm tắt dữ liệu</h3>
          <div className="leader-row"><span>Tác giả</span><strong>{paper.authors.length}</strong></div>
          <div className="leader-row"><span>Từ khóa</span><strong>{paper.keywords.length}</strong></div>
          <div className="leader-row"><span>Xu hướng</span><strong>{paper.monthlyGrowth}</strong></div>
          <div className="leader-row"><span>Điểm trend</span><strong>{paper.trendScore}</strong></div>
        </div>

        <div className="side-card">
          <h3>Bài báo liên quan</h3>
          <ul className="simple-list">
            {relatedPapers.map((relatedPaper) => (
              <li key={relatedPaper.id}>
                <Link to={`/papers/${relatedPaper.id}`} className="inline-link">{relatedPaper.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </section>
  );
}
