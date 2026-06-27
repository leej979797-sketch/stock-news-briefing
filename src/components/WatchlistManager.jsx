import { useState } from 'react'

export default function WatchlistManager({ watchlist, onAdd, onRemove }) {
  const [input, setInput] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    const trimmed = input.trim()
    if (!trimmed) return
    onAdd(trimmed)
    setInput('')
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleSubmit(e)
  }

  return (
    <div className="watchlist-manager">
      <div className="watchlist-header">
        <h2 className="watchlist-title">관심 종목</h2>
        <span className="watchlist-hint">종목을 추가하면 해당 뉴스만 필터링할 수 있어요</span>
      </div>

      <form className="watchlist-form" onSubmit={handleSubmit}>
        <input
          className="watchlist-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="종목명 입력 (예: 삼성전자)"
          aria-label="관심 종목 추가"
        />
        <button className="btn-add" type="submit">
          + 추가
        </button>
      </form>

      {watchlist.length > 0 ? (
        <div className="watchlist-tags">
          {watchlist.map((stock) => (
            <span key={stock} className="tag">
              {stock}
              <button
                className="tag-remove"
                onClick={() => onRemove(stock)}
                aria-label={`${stock} 삭제`}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      ) : (
        <p className="watchlist-empty">아직 관심 종목이 없습니다. 위에서 종목을 추가해보세요.</p>
      )}
    </div>
  )
}
