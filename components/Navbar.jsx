import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const tabs = [
    { label: 'Home', to: '/' },
    { label: 'Work', to: '/work' },
    { label: 'Blogs', to: '/blogs' },
  ]

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        padding: scrolled ? '0.85rem 2.5rem' : '1.5rem 2.5rem',
        background: scrolled ? 'var(--bg)' : 'transparent',
        borderBottom: scrolled ? '1px solid var(--border)' : 'none',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
      }}
    >
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        <Link
          to="/"
          className="font-semibold tracking-tight transition-all duration-300"
          style={{
            fontSize: scrolled ? '1rem' : '1.3rem',
            color: 'var(--text)',
          }}
        >
          Chandan Satapathy
        </Link>

        <div className="flex items-center gap-6">
          {tabs.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              className="text-xs font-medium uppercase tracking-widest transition-colors duration-200"
              style={{
                color: location.pathname === to ? 'var(--red)' : 'var(--text-muted)',
              }}
            >
              {label}
            </Link>
          ))}

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            title="Toggle theme"
            className="relative rounded-full cursor-pointer transition-all"
            style={{
              width: 34,
              height: 20,
              background: 'var(--surface2)',
              border: '1px solid var(--border-light)',
              flexShrink: 0,
            }}
          >
            <span
              className="absolute top-0.5 rounded-full transition-all duration-300"
              style={{
                width: 12,
                height: 12,
                left: theme === 'dark' ? 3 : 17,
                background: theme === 'dark' ? 'var(--yellow)' : 'var(--red)',
                top: 3,
              }}
            />
          </button>
        </div>
      </div>
    </nav>
  )
}
