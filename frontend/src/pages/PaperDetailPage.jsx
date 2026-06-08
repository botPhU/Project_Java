import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchPaperDetail, fetchPapers } from "../services/paperService";

export function PaperDetailPage() {
  const { paperId } = useParams();
  const [paper, setPaper] = useState(null);
  const [relatedPapers, setRelatedPapers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadPaperDetail() {
      setIsLoading(true);
      setError("");

      try {
        const [detail, list] = await Promise.all([
          fetchPaperDetail(paperId),
          fetchPapers()
        ]);

        setPaper(detail);
        setRelatedPapers(list.filter((item) => String(item.id) !== String(paperId)).slice(0, 3));
      } catch (loadError) {
        setError(loadError.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadPaperDetail();
  }, [paperId]);

  if (isLoading) {
    return <section className="mock-screen detail-screen"><div className="state-box">Đang tải chi tiết bài báo...</div></section>;
  }

  if (error) {
    return <section className="mock-screen detail-screen"><div className="state-box error-box">{error}</div></section>;
  }

  if (!paper) {
    return <section className="mock-screen detail-screen"><div className="state-box">Không có dữ liệu bài báo.</div></section>;
  }

  return (
    <section className="mock-screen detail-screen">
      <div className="detail-main">
        <Link to="/papers" className="back-link">← Quay lại danh sách bài báo</Link>
        <p className="eyebrow">Chi tiết bài báo</p>
        <h2>{paper.title}</h2>
        <div className="meta-line">
          <span>Paper ID: {paperId}</span>
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
          <h3>Abstract</h3>
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
            <h3>Trạng thái theo dõi</h3>
            <p>Chưa lưu vào thư viện cá nhân</p>
          </div>
        </div>
      </div>
      <aside className="detail-side">
        <div className="side-card">
          <h3>Thao tác nhanh</h3>
          <button type="button" className="primary-cta">Lưu bài báo</button>
          <button type="button" className="ghost-cta">Theo dõi keyword</button>
        </div>
        <div className="side-card">
          <h3>Tóm tắt dữ liệu</h3>
          <div className="leader-row"><span>Tác giả</span><strong>{paper.authors.length}</strong></div>
          <div className="leader-row"><span>Từ khóa</span><strong>{paper.keywords.length}</strong></div>
          <div className="leader-row"><span>Nguồn</span><strong>{paper.sourceName}</strong></div>
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
