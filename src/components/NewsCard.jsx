function timeAgo(isoString) {
  const now = new Date()
  const then = new Date(isoString)
  const diffMs = now - then
  const diffMin = Math.floor(diffMs / 60000)
  if (diffMin < 60) return `${diffMin}분 전`
  const diffHour = Math.floor(diffMin / 60)
  if (diffHour < 24) return `${diffHour}시간 전`
  const diffDay = Math.floor(diffHour / 24)
  return `${diffDay}일 전`
}

export default function NewsCard({ news, onClick }) {
  return (
    <article className={`news-card ${news.isImportant ? 'important' : ''}`} onClick={() => onClick(news)}>
      <div className="card-top">
        <div className="card-badges">
          {news.isImportant && <span className="badge-important">중요</span>}
          {news.stocks.map((s) => (
            <span key={s} className="badge-stock">{s}</span>
          ))}
        </div>
        <span className="card-time">{timeAgo(news.publishedAt)}</span>
      </div>

      <h3 className="card-title">{news.title}</h3>
      <p className="card-summary">{news.summary}</p>

      <div className="card-footer">
        <span className="card-source">{news.source}</span>
        <div className="card-tags">
          {news.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="tag-pill">#{tag}</span>
          ))}
        </div>
      </div>
    </article>
  )
}
