import { useState } from 'react'
import { supabase } from '../supabaseClient'

export default function AuthForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setMessage('로그인 실패: ' + error.message)
    } else {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) setMessage('회원가입 실패: ' + error.message)
      else setMessage('회원가입 완료! 로그인해주세요.')
    }

    setLoading(false)
  }

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: 'rgba(0,0,0,0.7)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: '#1e1e1e', padding: '2rem', borderRadius: '12px',
        width: '100%', maxWidth: '380px', color: '#fff'
      }}>
        <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
          {isLogin ? '로그인' : '회원가입'}
        </h2>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #444', background: '#2a2a2a', color: '#fff', fontSize: '1rem' }}
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #444', background: '#2a2a2a', color: '#fff', fontSize: '1rem' }}
          />

          {message && (
            <p style={{ color: message.includes('실패') ? '#ff6b6b' : '#69db7c', fontSize: '0.9rem', textAlign: 'center' }}>
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{ padding: '0.75rem', borderRadius: '8px', border: 'none', background: '#3b82f6', color: '#fff', fontSize: '1rem', cursor: 'pointer' }}
          >
            {loading ? '처리 중...' : isLogin ? '로그인' : '회원가입'}
          </button>
        </form>

        <p style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.9rem', color: '#aaa' }}>
          {isLogin ? '계정이 없으신가요?' : '이미 계정이 있으신가요?'}{' '}
          <span
            onClick={() => { setIsLogin(!isLogin); setMessage('') }}
            style={{ color: '#3b82f6', cursor: 'pointer', textDecoration: 'underline' }}
          >
            {isLogin ? '회원가입' : '로그인'}
          </span>
        </p>
      </div>
    </div>
  )
}
