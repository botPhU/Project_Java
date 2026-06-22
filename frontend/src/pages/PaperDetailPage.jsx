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

  async function handleToggleSave() {
    try {
      const nextSavedState = await toggleSavedPaper(paperId, !isSaved);
      setIsSaved(nextSavedState);
      setFeedback(nextSavedState ? "Da luu bai bao vao thu vien ca nhan." : "Da bo bai bao khoi thu vien ca nhan.");
    } catch (toggleError) {
      setFeedback(toggleError.message);
    }
  }

  function handleFollowKeyword() {
    if (!paper?.keywords?.length) {
      return;
    }

    const followedKeywords = followKeyword(paper.keywords[0]);
    const followedKeyword = followedKeywords.at(-1) ?? paper.keywords[0];
    setFeedback(`Da theo doi keyword "${followedKeyword}".`);
  }

  if (isLoading) {
    return (
      <section className="mock-screen detail-screen">
        <div className="state-box">Dang tai chi tiet bai bao...</div>
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
        <div className="state-box">Khong co du lieu bai bao.</div>
      </section>
    );
  }

  return (
    <section className="mock-screen detail-screen">
      <div className="detail-main">
        <Link to="/papers" className="back-link">&larr; Quay lai danh sach bai bao</Link>
        <p className="eyebrow">Chi tiet bai bao</p>
        <h2>{paper.title}</h2>

        <div className="meta-line">
          <span>Paper ID: {paper.id}</span>
          <span>Nam: {paper.publicationYear}</span>
          <span>{paper.journal}</span>
          <span>{paper.sourceName}</span>
        </div>

        <div className="tag-row">
          {paper.keywords.map((keyword) => (
            <span className="tag-chip" key={keyword}>{keyword}</span>
          ))}
        </div>

        <div className="detail-block">
          <h3>Tom tat</h3>
          <p>{paper.abstractText}</p>
        </div>

        <div className="detail-grid">
          <div className="detail-block">
            <h3>Tac gia</h3>
            <p>{paper.authors.join(", ")}</p>
          </div>
          <div className="detail-block">
            <h3>Tu khoa</h3>
            <p>{paper.keywords.join(", ")}</p>
          </div>
          <div className="detail-block">
            <h3>Research topics</h3>
            <p>{paper.topics.length ? paper.topics.join(", ") : "Chua co topic"}</p>
          </div>
          <div className="detail-block">
            <h3>Thong tin nguon</h3>
            <p>{paper.sourceName} - {paper.sourcePaperId}</p>
          </div>
          <div className="detail-block">
            <h3>Chi so trich dan</h3>
            <p>{paper.citationCount} luot trich dan</p>
          </div>
          <div className="detail-block">
            <h3>DOI</h3>
            <p>{paper.doi}</p>
          </div>
          <div className="detail-block">
            <h3>Loai tai lieu</h3>
            <p>{paper.documentType}</p>
          </div>
          <div className="detail-block">
            <h3>Ngon ngu</h3>
            <p>{paper.language}</p>
          </div>
          <div className="detail-block">
            <h3>Lien ket ngoai</h3>
            <p>
              <a href={paper.url} className="inline-link" target="_blank" rel="noreferrer">
                Mo trang bai bao
              </a>
            </p>
          </div>
        </div>
      </div>

      <aside className="detail-side">
        <div className="side-card">
          <div className="card-head">
            <h3>Thao tac nhanh</h3>
            <span className={sourceMode === "demo" ? "mode-badge demo" : "mode-badge"}>
              {sourceMode === "demo" ? "Demo" : "Backend"}
            </span>
          </div>
          <button type="button" className="primary-cta" onClick={handleToggleSave}>
            {isSaved ? "Bo luu bai bao" : "Luu bai bao"}
          </button>
          <button type="button" className="ghost-cta" onClick={handleFollowKeyword}>
            Theo doi keyword
          </button>
          {feedback ? <div className="state-box inline-state">{feedback}</div> : null}
        </div>

        <div className="side-card">
          <h3>Tom tat du lieu</h3>
          <div className="leader-row"><span>Tac gia</span><strong>{paper.authors.length}</strong></div>
          <div className="leader-row"><span>Tu khoa</span><strong>{paper.keywords.length}</strong></div>
          <div className="leader-row"><span>Topics</span><strong>{paper.topics.length}</strong></div>
          <div className="leader-row"><span>Trich dan</span><strong>{paper.citationCount}</strong></div>
        </div>

        <div className="side-card">
          <h3>Bai bao lien quan</h3>
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
