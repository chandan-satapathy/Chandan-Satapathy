import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import resume from '../data/resume.json'

export default function Home() {
  const heroRef = useRef(null)

  useEffect(() => {
    const el = heroRef.current
    if (el) {
      requestAnimationFrame(() => {
        el.style.opacity = '1'
        el.style.transform = 'none'
      })
    }
  }, [])

  return (
    <section
      id="home"
      className="relative flex items-center min-h-screen"
      style={{ padding: '0 2.5rem' }}
    >
      <div className="max-w-6xl mx-auto w-full">
        <div
          ref={heroRef}
          className="reveal"
          style={{ transitionDuration: '0.8s' }}
        >
          {/* Tag */}
          <div className="section-tag mb-6">{resume.tagline}</div>

          {/* Name */}
          <h1
            className="font-display leading-none mb-4"
            style={{
              fontSize: 'clamp(4rem, 12vw, 10rem)',
              letterSpacing: '0.02em',
              color: 'var(--text)',
            }}
          >
            CHANDAN
            <br />
            <span style={{ color: 'var(--red)' }}>SATAPATHY</span>
          </h1>

          {/* Summary */}
          <p
            className="mb-10 leading-relaxed"
            style={{
              fontSize: '1.05rem',
              color: 'var(--text-muted)',
              maxWidth: 520,
            }}
          >
            {resume.summary}
          </p>

          {/* Metrics */}
          <div className="flex flex-wrap gap-8 mb-10">
            {resume.metrics.map((m) => (
              <div
                key={m.label}
                style={{ borderLeft: '2px solid var(--red)', paddingLeft: '1rem' }}
              >
                <div
                  className="font-display"
                  style={{ fontSize: '2rem', color: 'var(--yellow)', letterSpacing: '0.05em' }}
                >
                  {m.value}
                </div>
                <div
                  className="text-xs uppercase tracking-widest"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {m.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <a href={`mailto:${resume.email}`} className="btn-primary">
              Get In Touch
            </a>
            <Link to="/work" className="btn-secondary">
              View Work
            </Link>
            <a href={resume.github} target="_blank" rel="noreferrer" className="btn-secondary">
              GitHub
            </a>
            <a href={resume.linkedin} target="_blank" rel="noreferrer" className="btn-secondary">
              LinkedIn
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="scroll-indicator absolute bottom-8 left-1/2"
        style={{ transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}
      >
        <div
          style={{
            width: 1,
            height: '2rem',
            background: `linear-gradient(var(--red), transparent)`,
          }}
        />
        <span
          className="text-xs tracking-widest uppercase font-mono"
          style={{ color: 'var(--text-dim)' }}
        >
          Scroll
        </span>
      </div>
    </section>
  )
}
