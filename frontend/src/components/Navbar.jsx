import { useState, useEffect } from 'react'
import { IconSun, IconMoon } from './Icons'

export default function Navbar({ dark, setDark }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <div className="nav-logo">
          <img src="/assets/logo.jpg" alt="Shivam Logistics Logo" />
          <span className="nav-logo-text">Shivam <span>Logistics</span></span>
        </div>
        <ul className="nav-links">
          {['services','fleet','industries','about','branches','contact'].map(id => (
            <li key={id}><a href={`#${id}`} style={{ textTransform: 'capitalize' }}>{id === 'about' ? 'About' : id.charAt(0).toUpperCase() + id.slice(1)}</a></li>
          ))}
        </ul>
        <div className="nav-actions">
<button className="btn-quote" onClick={() => scrollTo('quote')}>Get Quote</button>
          <button className="theme-toggle" onClick={() => setDark(d => !d)} title={dark ? 'Switch to light mode' : 'Switch to dark mode'} aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}>
            {dark ? <IconSun size={18} /> : <IconMoon size={18} />}
          </button>
          <button className="hamburger" onClick={() => setMenuOpen(m => !m)} aria-label="Toggle menu">
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        {[['services','Services'],['fleet','Fleet'],['industries','Industries'],['about','About'],['branches','Network'],['contact','Contact']].map(([id, label]) => (
          <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>
        ))}
<a href="#quote" onClick={() => setMenuOpen(false)} style={{ color: 'var(--orange)' }}>Get Quote</a>
      </div>
    </>
  )
}
