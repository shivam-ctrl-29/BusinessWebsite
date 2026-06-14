import { useEffect, useState } from 'react'

const SECTIONS = [
  { id: 'home',       label: 'Home' },
  { id: 'services',   label: 'Services' },
  { id: 'about',      label: 'About Us' },
  { id: 'fleet',      label: 'Our Fleet' },
  { id: 'industries', label: 'Coverage' },
  { id: 'quote',      label: 'Get Quote' },
  { id: 'reviews',    label: 'Reviews' },
  { id: 'branches',   label: 'Branches' },
  { id: 'contact',    label: 'Contact' },
]

export default function SectionNav() {
  const [active, setActive] = useState('home')

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { threshold: 0.35 }
    )
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  const goTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const activeIndex = SECTIONS.findIndex(s => s.id === active)

  const prev = activeIndex > 0 ? SECTIONS[activeIndex - 1] : null
  const next = activeIndex < SECTIONS.length - 1 ? SECTIONS[activeIndex + 1] : null

  return (
    <>
      {/* Right dot nav */}
      <nav className="section-nav" aria-label="Page sections">
        {SECTIONS.map(({ id, label }) => (
          <button
            key={id}
            className={`section-nav-dot${active === id ? ' active' : ''}`}
            onClick={() => goTo(id)}
            title={label}
            aria-label={`Go to ${label}`}
          >
            <span className="section-nav-tooltip">{label}</span>
          </button>
        ))}
      </nav>

      {/* Bottom page indicator */}
      <div className="page-indicator">
        <button
          className="page-ind-btn"
          onClick={() => prev && goTo(prev.id)}
          disabled={!prev}
          aria-label="Previous section"
        >
          &#8592;
        </button>
        <div className="page-ind-label">
          <span className="page-ind-num">{activeIndex + 1} / {SECTIONS.length}</span>
          <span className="page-ind-name">{SECTIONS[activeIndex]?.label}</span>
        </div>
        <button
          className="page-ind-btn"
          onClick={() => next && goTo(next.id)}
          disabled={!next}
          aria-label="Next section"
        >
          &#8594;
        </button>
      </div>
    </>
  )
}
