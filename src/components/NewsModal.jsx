import { useEffect } from 'react'

export default function NewsModal({ news, onClose }) {
  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  if (!news) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="닫기">×</button>

        <div className="modal-badges">
          {news.isImportant && <span className="badge-important">중요</span>}
          {news.stocks.map((s) => (
            <span key={s} className="badge-stock">{s}</span>
          ))}
        </div>

        <h2 className="modal-title">{news.title}</h2>

        <div className="modal-meta">
          <span className="card-source">{news.source}</span>
          <span>·</span>
          <span>{new Date(news.publishedAt).toLocaleString('ko-KR', { month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
        </div>

        <p className="modal-summary">{news.summary}</p>

        <div className="modal-tags">
          {news.tags.map((tag) => (
            <span key={tag} className="tag-pill">#{tag}</span>
          ))}
        </div>

        <a
          className="btn-link"
          href={news.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          원문 보기 →
        </a>
      </div>
    </div>
  )
}
