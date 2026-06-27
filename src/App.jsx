import { useState, useEffect } from 'react'
import { mockNews } from './data/mockNews'
import WatchlistManager from './components/WatchlistManager'
import FilterBar from './components/FilterBar'
import NewsCard from './components/NewsCard'
import NewsModal from './components/NewsModal'
import AuthForm from './components/AuthForm'
import { supabase } from './supabaseClient'

const STORAGE_KEY = 'stock-news-watchlist'

function loadWatchlist() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export default function App() {
  const [watchlist, setWatchlist] = useState(loadWatchlist)
  const [activeFilter, setActiveFilter] = useState(null)
  const [selectedNews, setSelectedNews] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(watchlist))
  }, [watchlist])

  function addStock(stock) {
    if (!watchlist.includes(stock)) {
      setWatchlist((prev) => [...prev, stock])
    }
  }

  function removeStock(stock) {
    setWatchlist((prev) => prev.filter((s) => s !== stock))
    if (activeFilter === stock) setActiveFilter(null)
  }

  const today = new Date().toLocaleDateString('ko-KR', {
    year: 'numeric', month: 'long', day: 'numeric', weekday: 'long',
  })

  const filteredNews = mockNews.filter((n) => {
    if (activeFilter === '__important__') return n.isImportant
    if (activeFilter) return n.stocks.includes(activeFilter)
    return true
  })

  const importantCount = mockNews.filter((n) => n.isImportant).length

  if (!user) return <AuthForm />

  return (
    <div className="app">
      {/* Header */}
      <header className="site-header">
        <div className="header-inner">
          <div className="header-logo">
            <span className="logo-icon">📈</span>
            <span className="logo-text">오늘의 주식 뉴스</span>
          </div>
          <div className="header-meta">
            <span className="header-date">{today}</span>
            {importantCount > 0 && (
              <span className="header-badge">중요 {importantCount}건</span>
            )}
            <button
              onClick={() => supabase.auth.signOut()}
              style={{ marginLeft: '1rem', padding: '0.3rem 0.8rem', borderRadius: '6px', border: '1px solid #555', background: 'transparent', color: '#aaa', cursor: 'pointer', fontSize: '0.85rem' }}
            >
              로그아웃
            </button>
          </div>
        </div>
      </header>

      <main className="main-content">
        {/* Watchlist */}
        <section className="section-watchlist">
          <div className="container">
            <WatchlistManager
              watchlist={watchlist}
              onAdd={addStock}
              onRemove={removeStock}
            />
          </div>
        </section>

        {/* Filter + News */}
        <section className="section-news">
          <div className="container">
            <div className="news-header">
              <h2 className="section-title">오늘의 뉴스</h2>
              <span className="news-count">{filteredNews.length}건</span>
            </div>

            <FilterBar
              watchlist={watchlist}
              activeFilter={activeFilter}
              onFilter={setActiveFilter}
            />

            {filteredNews.length > 0 ? (
              <div className="news-grid">
                {filteredNews.map((news) => (
                  <NewsCard key={news.id} news={news} onClick={setSelectedNews} />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p className="empty-icon">🔍</p>
                <p className="empty-text">
                  {activeFilter
                    ? `"${activeFilter === '__important__' ? '중요' : activeFilter}" 관련 뉴스가 없습니다.`
                    : '오늘의 뉴스가 없습니다.'}
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <p>mock 데이터 기반 · 실제 뉴스 API 미연동 · 개인 학습용 도구</p>
        </div>
      </footer>

      {selectedNews && (
        <NewsModal news={selectedNews} onClose={() => setSelectedNews(null)} />
      )}
    </div>
  )
}
