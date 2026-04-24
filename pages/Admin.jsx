import { useState, useEffect } from 'react'
import { authenticate, isAuthenticated, logout } from '../utils/auth'
import { saveResume, saveBlogPost, saveBlogsIndex } from '../utils/github'
import resume from '../data/resume.json'
import blogs from '../data/blogs.json'

export default function Admin() {
  const [authed, setAuthed] = useState(isAuthenticated())

  if (!authed) return <AuthGate onSuccess={() => setAuthed(true)} />
  return <AdminPanel onLogout={() => setAuthed(false)} />
}

/* ─── Auth Gate ─────────────────────────────────────────────────── */
function AuthGate({ onSuccess }) {
  const [token, setToken] = useState('')
  const [error, setError] = useState(false)

  const handleAuth = () => {
    if (authenticate(token)) {
      setError(false)
      onSuccess()
    } else {
      setError(true)
    }
  }

  return (
    <section style={{ minHeight: '100vh', padding: '8rem 2.5rem 4rem' }}>
      <div className="max-w-md mx-auto text-center">
        {/* Lock icon */}
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ border: '2px solid var(--red)' }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--red)" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>

        <div className="section-tag justify-center mb-2">04 · Admin</div>
        <h2
          className="font-display mb-4"
          style={{ fontSize: '3rem', letterSpacing: '0.03em', color: 'var(--text)' }}
        >
          RESTRICTED
        </h2>
        <p className="text-sm leading-relaxed mb-8" style={{ color: 'var(--text-muted)' }}>
          This panel is for site management only. Authenticate to edit content, publish blogs,
          and commit changes directly to GitHub.
        </p>

        <div className="text-left">
          <label className="block text-xs uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-muted)' }}>
            Access Token
          </label>
          <input
            type="password"
            className="form-input mb-3"
            placeholder="Enter admin token…"
            value={token}
            onChange={(e) => { setToken(e.target.value); setError(false) }}
            onKeyDown={(e) => e.key === 'Enter' && handleAuth()}
          />
          {error && (
            <p className="text-xs mb-3" style={{ color: 'var(--red)' }}>
              Invalid token. Please try again.
            </p>
          )}
          <button className="btn-primary w-full text-center" onClick={handleAuth}>
            Authenticate
          </button>
        </div>
      </div>
    </section>
  )
}

/* ─── Admin Panel ────────────────────────────────────────────────── */
function AdminPanel({ onLogout }) {
  const [resumeData, setResumeData] = useState(resume)
  const [blogsData, setBlogsData] = useState(blogs)
  const [newPost, setNewPost] = useState({ title: '', slug: '', content: '' })
  const [status, setStatus] = useState(null)  // null | 'saving' | 'saved' | 'error'

  const handleLogout = () => { logout(); onLogout() }

  const flash = (type) => {
    setStatus(type)
    setTimeout(() => setStatus(null), 4000)
  }

  const handleSaveResume = async () => {
    setStatus('saving')
    try {
      await saveResume(resumeData)
      flash('saved')
    } catch (e) {
      console.error(e)
      flash('error')
    }
  }

  const handlePublishPost = async () => {
    if (!newPost.title || !newPost.slug || !newPost.content) return
    setStatus('saving')
    try {
      const post = {
        ...newPost,
        date: new Date().toISOString().split('T')[0],
        preview: newPost.content.slice(0, 120).replace(/[#*]/g, '') + '…',
      }
      await saveBlogPost(post)
      const updated = [post, ...blogsData]
      await saveBlogsIndex(updated)
      setBlogsData(updated)
      setNewPost({ title: '', slug: '', content: '' })
      flash('saved')
    } catch (e) {
      console.error(e)
      flash('error')
    }
  }

  return (
    <section style={{ minHeight: '100vh', padding: '7rem 2.5rem 4rem' }}>
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <div className="section-tag mb-1">04 · Admin</div>
            <h2 className="font-display" style={{ fontSize: '3rem', color: 'var(--text)', letterSpacing: '0.03em' }}>
              CONTROL PANEL
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs" style={{ color: 'var(--yellow)' }}>● Authenticated</span>
            <button className="btn-secondary text-sm" onClick={handleLogout}>Sign Out</button>
          </div>
        </div>

        {/* Status bar */}
        {status === 'saving' && (
          <StatusBar color="var(--yellow)">Committing to GitHub…</StatusBar>
        )}
        {status === 'saved' && (
          <StatusBar color="var(--yellow)">
            ✓ Changes committed. GitHub Pages will redeploy in ~60s.
          </StatusBar>
        )}
        {status === 'error' && (
          <StatusBar color="var(--red)">
            ✗ Error committing. Check your VITE_GITHUB_TOKEN and VITE_GITHUB_REPO env vars.
          </StatusBar>
        )}

        {/* Resume editor */}
        <AdminSection title="Homepage Summary">
          <label className="block text-xs uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-muted)' }}>
            Summary Text
          </label>
          <textarea
            className="form-input mb-3 resize-y"
            rows={4}
            value={resumeData.summary}
            onChange={(e) => setResumeData({ ...resumeData, summary: e.target.value })}
          />
          <button className="btn-primary text-sm" onClick={handleSaveResume}>
            Save & Commit to GitHub
          </button>
        </AdminSection>

        {/* New blog post */}
        <AdminSection title="Publish New Blog Post">
          <div className="grid gap-3 mb-3" style={{ gridTemplateColumns: '1fr 1fr' }}>
            <div>
              <label className="block text-xs uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-muted)' }}>Title</label>
              <input
                type="text"
                className="form-input"
                placeholder="My First Post"
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-muted)' }}>Slug (URL)</label>
              <input
                type="text"
                className="form-input font-mono"
                placeholder="my-first-post"
                value={newPost.slug}
                onChange={(e) => setNewPost({ ...newPost, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
              />
            </div>
          </div>
          <label className="block text-xs uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-muted)' }}>Content (Markdown)</label>
          <textarea
            className="form-input mb-3 resize-y font-mono text-xs"
            rows={10}
            placeholder="## Introduction&#10;&#10;Write your post content here…"
            value={newPost.content}
            onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
          />
          <button
            className="btn-primary text-sm"
            onClick={handlePublishPost}
            disabled={!newPost.title || !newPost.slug || !newPost.content}
            style={{ opacity: (!newPost.title || !newPost.slug || !newPost.content) ? 0.5 : 1 }}
          >
            Publish & Deploy
          </button>
        </AdminSection>

        {/* Existing posts */}
        {blogsData.length > 0 && (
          <AdminSection title={`Published Posts (${blogsData.length})`}>
            {blogsData.map((post) => (
              <div
                key={post.slug}
                className="flex justify-between items-center py-2.5"
                style={{ borderBottom: '1px solid var(--border)' }}
              >
                <div>
                  <div className="text-sm font-medium" style={{ color: 'var(--text)' }}>{post.title}</div>
                  <div className="font-mono text-xs" style={{ color: 'var(--text-dim)' }}>/blogs/{post.slug}</div>
                </div>
                <span className="font-mono text-xs" style={{ color: 'var(--text-dim)' }}>{post.date}</span>
              </div>
            ))}
          </AdminSection>
        )}
      </div>
    </section>
  )
}

function AdminSection({ title, children }) {
  return (
    <div
      className="rounded-lg p-6 mb-4"
      style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
    >
      <div className="text-sm font-semibold mb-4" style={{ color: 'var(--yellow)' }}>{title}</div>
      {children}
    </div>
  )
}

function StatusBar({ color, children }) {
  return (
    <div
      className="rounded-lg px-4 py-3 mb-4 font-mono text-sm"
      style={{ border: `1px solid ${color}`, color, background: 'var(--surface)' }}
    >
      {children}
    </div>
  )
}
