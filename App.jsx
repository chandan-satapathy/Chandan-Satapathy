import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Work from './pages/Work'
import Blogs from './pages/Blogs'
import Admin from './pages/Admin'

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark')


  
  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light')
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  return (
    <BrowserRouter>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:slug" element={<Blogs />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>

      <footer
        className="flex flex-wrap justify-between items-center gap-4"
        style={{
          borderTop: '1px solid var(--border)',
          padding: '1.5rem 2.5rem',
        }}
      >
        <span className="text-sm" style={{ color: 'var(--text-dim)' }}>
          © {new Date().getFullYear()} Chandan Satapathy
        </span>
        <div className="flex gap-5">
          {[
            { label: 'Email', href: 'mailto:satapathy.chandan1008@gmail.com' },
            { label: 'GitHub', href: 'https://github.com/chandan-satapathy' },
            { label: 'LinkedIn', href: 'https://linkedin.com/in/chandan-satapathy' },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="text-sm transition-colors duration-200"
              style={{ color: 'var(--text-dim)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--red)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-dim)')}
            >
              {label}
            </a>
          ))}
        </div>
      </footer>
    </BrowserRouter>
  )
}
