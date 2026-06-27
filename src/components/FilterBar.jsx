export default function FilterBar({ watchlist, activeFilter, onFilter }) {
  return (
    <div className="filter-bar">
      <button
        className={`filter-btn ${activeFilter === null ? 'active' : ''}`}
        onClick={() => onFilter(null)}
      >
        전체
      </button>
      <button
        className={`filter-btn ${activeFilter === '__important__' ? 'active' : ''}`}
        onClick={() => onFilter('__important__')}
      >
        🔔 중요
      </button>
      {watchlist.map((stock) => (
        <button
          key={stock}
          className={`filter-btn ${activeFilter === stock ? 'active' : ''}`}
          onClick={() => onFilter(stock)}
        >
          {stock}
        </button>
      ))}
    </div>
  )
}
