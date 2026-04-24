import { useState } from 'react'
import ScrollReveal from '../components/ScrollReveal'
import resume from '../data/resume.json'

const TABS = ['Experience', 'Skills', 'Education', 'Achievements']

export default function Work() {
  const [activeTab, setActiveTab] = useState('Experience')

  return (
    <section style={{ minHeight: '100vh', padding: '7rem 2.5rem 4rem' }}>
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <ScrollReveal>
          <div className="section-tag">02 · Work</div>
          <h2
            className="font-display leading-none mb-10"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', letterSpacing: '0.03em', color: 'var(--text)' }}
          >
            EXPERIENCE &<br />EXPERTISE
          </h2>
        </ScrollReveal>

        {/* Contact strip */}
        <ScrollReveal delay={100}>
          <div
            className="flex flex-wrap items-center justify-between gap-4 rounded-xl mb-10 p-5"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
          >
            <div className="flex flex-wrap gap-6">
              {[
                { label: resume.email },
                { label: resume.phone },
                { label: resume.location },
              ].map(({ label }) => (
                <div key={label} className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-muted)' }}>
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--red)', flexShrink: 0 }} />
                  {label}
                </div>
              ))}
            </div>
            <span className="font-mono text-xs" style={{ color: 'var(--text-dim)' }}>Open to opportunities</span>
          </div>
        </ScrollReveal>

        {/* Grid */}
        <div className="grid gap-12" style={{ gridTemplateColumns: '200px 1fr' }}>

          {/* Nav */}
          <ScrollReveal delay={150}>
            <div className="sticky top-20 flex flex-col gap-1">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="text-left text-sm py-3 px-4 transition-all duration-200"
                  style={{
                    borderLeft: `2px solid ${activeTab === tab ? 'var(--red)' : 'var(--border)'}`,
                    color: activeTab === tab ? 'var(--text)' : 'var(--text-muted)',
                    background: 'none',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Panels */}
          <ScrollReveal delay={200}>
            {activeTab === 'Experience' && <ExperiencePanel />}
            {activeTab === 'Skills' && <SkillsPanel />}
            {activeTab === 'Education' && <EducationPanel />}
            {activeTab === 'Achievements' && <AchievementsPanel />}
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

function ExperiencePanel() {
  return (
    <div className="flex flex-col gap-4">
      {resume.experience.map((exp) => (
        <div
          key={exp.role + exp.period}
          className="rounded-lg p-6 transition-all duration-200"
          style={{ border: '1px solid var(--border)', background: 'transparent' }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--border-light)')}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
        >
          <div className="flex justify-between items-start flex-wrap gap-2 mb-3">
            <div>
              <div className="font-semibold" style={{ color: 'var(--text)' }}>{exp.role}</div>
              <div className="text-sm font-medium mt-0.5" style={{ color: 'var(--red)' }}>
                {exp.company} — {exp.companyDesc}
              </div>
            </div>
            <div className="font-mono text-xs whitespace-nowrap" style={{ color: 'var(--text-dim)' }}>
              {exp.period}
            </div>
          </div>
          <ul className="mt-3 space-y-1.5">
            {exp.bullets.map((b, i) => (
              <li
                key={i}
                className="text-sm leading-relaxed pl-4 relative"
                style={{ color: 'var(--text-muted)' }}
              >
                <span
                  className="absolute left-0 text-xs"
                  style={{ color: 'var(--red)', top: '2px' }}
                >
                  →
                </span>
                {b}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

function SkillsPanel() {
  return (
    <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
      {resume.skills.map((cat) => (
        <div
          key={cat.category}
          className="rounded-lg p-4"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
        >
          <div className="text-xs uppercase tracking-wider font-mono mb-3" style={{ color: 'var(--yellow)' }}>
            {cat.category}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {cat.items.map((item) => (
              <span key={item} className="skill-tag">{item}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function EducationPanel() {
  return (
    <div className="flex flex-col gap-4">
      {resume.education.map((edu) => (
        <div
          key={edu.school}
          className="rounded-r-lg p-5"
          style={{ borderLeft: '2px solid var(--yellow)', background: 'var(--surface)' }}
        >
          <div className="font-semibold mb-1" style={{ color: 'var(--text)' }}>{edu.school}</div>
          <div className="text-sm mb-2" style={{ color: 'var(--text-muted)' }}>{edu.degree}</div>
          <div className="font-mono text-xs mb-2" style={{ color: 'var(--yellow)' }}>
            {edu.grade}{edu.year ? ` · ${edu.year}` : ''}
          </div>
          {edu.notes && (
            <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              {edu.notes}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

function AchievementsPanel() {
  return (
    <div className="flex flex-col">
      {resume.achievements.map((ach) => (
        <div
          key={ach.title}
          className="flex gap-4 items-start py-4"
          style={{ borderBottom: '1px solid var(--border)' }}
        >
          <div
            className="flex-shrink-0 flex items-center justify-center text-xs font-mono rounded"
            style={{
              width: 36,
              height: 36,
              background: 'var(--red-dim)',
              color: 'var(--red)',
            }}
          >
            {ach.code}
          </div>
          <div>
            <div className="font-medium text-sm mb-0.5" style={{ color: 'var(--text)' }}>{ach.title}</div>
            <div className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{ach.desc}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
