import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import ScrollReveal from '../components/ScrollReveal'
import blogs from '../data/blogs.json'

export default function Blogs() {
  const { slug } = useParams()

  if (slug) return <BlogDetail slug={slug} />
  return <BlogList />
}

function BlogList() {
  return (
    <section style={{ minHeight: '100vh', padding: '7rem 2.5rem 4rem' }}>
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="section-tag">03 · Blogs</div>
          <h2
            className="font-display leading-none mb-12"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', letterSpacing: '0.03em', color: 'var(--text)' }}
          >
            THOUGHTS &<br />WRITINGS
          </h2>
        </ScrollReveal>

        {blogs.length === 0 ? (
          <ScrollReveal delay={100}>
            <div
              className="text-center rounded-xl p-16 max-w-lg mx-auto"
              style={{ border: '1px dashed var(--border)' }}
            >
              <div className="text-5xl mb-4 opacity-30">✍</div>
              <div className="font-semibold text-lg mb-2" style={{ color: 'var(--text)' }}>
                No posts yet
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                This space is reserved for thoughts on distributed systems, engineering learnings,
                and the occasional detour into finance or mythology.
              </p>
              <div className="mt-6">
                <span className="btn-secondary text-sm" style={{ cursor: 'default' }}>
                  Coming Soon
                </span>
              </div>
            </div>
          </ScrollReveal>
        ) : (
          <div className="flex flex-col gap-4">
            {blogs.map((post, i) => (
              <ScrollReveal key={post.slug} delay={i * 80}>
                <Link
                  to={`/blogs/${post.slug}`}
                  className="block rounded-lg p-6 transition-all duration-200"
                  style={{ border: '1px solid var(--border)', background: 'var(--surface)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--red)')}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
                >
                  <div className="flex justify-between items-start flex-wrap gap-2">
                    <div>
                      <div className="font-semibold mb-1" style={{ color: 'var(--text)' }}>
                        {post.title}
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                        {post.preview}
                      </p>
                    </div>
                    <div className="font-mono text-xs" style={{ color: 'var(--text-dim)' }}>
                      {post.date}
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function BlogDetail({ slug }) {
  const post = blogs.find((b) => b.slug === slug)

  if (!post) {
    return (
      <section style={{ minHeight: '100vh', padding: '8rem 2.5rem 4rem' }}>
        <div className="max-w-3xl mx-auto text-center">
          <div className="font-display text-5xl mb-4" style={{ color: 'var(--red)' }}>404</div>
          <p className="mb-6" style={{ color: 'var(--text-muted)' }}>Post not found.</p>
          <Link to="/blogs" className="btn-secondary">← Back to Blogs</Link>
        </div>
      </section>
    )
  }

  return (
    <section style={{ minHeight: '100vh', padding: '8rem 2.5rem 4rem' }}>
      <div className="max-w-3xl mx-auto">
        <Link
          to="/blogs"
          className="inline-flex items-center gap-2 text-sm mb-8 transition-colors"
          style={{ color: 'var(--text-muted)' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--red)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
        >
          ← Back to Blogs
        </Link>

        <div className="font-mono text-xs mb-3" style={{ color: 'var(--text-dim)' }}>{post.date}</div>
        <h1 className="font-display mb-10" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', color: 'var(--text)' }}>
          {post.title.toUpperCase()}
        </h1>

        <div
          className="prose leading-relaxed"
          style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.8' }}
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
        </div>
      </div>
    </section>
  )
}
