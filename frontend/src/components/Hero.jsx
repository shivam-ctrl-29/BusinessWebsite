import { useEffect, useRef } from 'react'

export default function Hero() {
  const statsRef = useRef([])

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const el = e.target
          const target = parseInt(el.dataset.target)
          let start = 0
          const step = target / 60
          const timer = setInterval(() => {
            start += step
            if (start >= target) { start = target; clearInterval(timer) }
            el.querySelector('span').textContent = Math.floor(start).toLocaleString('en-IN')
          }, 25)
          obs.unobserve(el)
        }
      })
    }, { threshold: 0.5 })
    statsRef.current.forEach(el => el && obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section className="hero" id="home">
      <div className="hero-bg-shapes">
        <div className="hero-circle hero-circle-1" />
        <div className="hero-circle hero-circle-2" />
        <div className="hero-grid" />
        <div className="hero-line hero-line-1" />
        <div className="hero-line hero-line-2" />
      </div>

      <div className="hero-content">
        <div className="hero-badge">
          <div className="hero-badge-dot" />
          <span>India's #1 Smart Logistics Partner</span>
        </div>
        <h1>Delivering <em>Trust</em><br />Across Every Mile</h1>
        <p className="hero-sub">India's Smart Logistics Partner for Fast, Reliable, and Technology-Driven Transportation Solutions. Pan India coverage with real-time GPS tracking.</p>
        <div className="hero-cta">
          <button className="btn-primary" onClick={() => document.getElementById('track-section')?.scrollIntoView({ behavior: 'smooth' })}>
            📦 Track Shipment
          </button>
          <button className="btn-secondary" onClick={() => document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth' })}>
            💰 Get Instant Quote
          </button>
        </div>
        <div className="feature-pills">
          {[['🗺️','Pan India Delivery'],['📍','GPS Tracking'],['⚡','Fast Transit'],['🔒','Secure Transport']].map(([icon, label]) => (
            <div className="pill" key={label}><span>{icon}</span>{label}</div>
          ))}
        </div>
        <div className="hero-stats">
          {[{target:50000,label:'Deliveries'},{target:500,label:'Vehicles'},{target:200,label:'Clients'},{target:15,label:'Years Exp.'}].map((s, i) => (
            <div className="hero-stat-item" key={s.label}>
              <div className="hero-stat-num" data-target={s.target} ref={el => statsRef.current[i] = el}>
                <span>0</span>+
              </div>
              <div className="hero-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="hero-right">
        <svg className="truck-anim" viewBox="0 0 520 280" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.4))' }}>
          <rect x="20" y="100" width="340" height="130" rx="12" fill="#0d2b52"/>
          <rect x="24" y="104" width="332" height="122" rx="10" fill="#112d54"/>
          <rect x="360" y="130" width="130" height="100" rx="10" fill="#0B1F3A"/>
          <path d="M360 130 L400 70 L490 70 L490 130Z" fill="#0d2b52"/>
          <rect x="404" y="78" width="78" height="44" rx="6" fill="#00BFFF" opacity="0.7"/>
          <rect x="30" y="114" width="120" height="90" rx="6" fill="#FF6B00" opacity="0.15"/>
          <circle cx="100" cy="245" r="28" fill="#1a1a2e"/><circle cx="100" cy="245" r="18" fill="#2d2d44"/><circle cx="100" cy="245" r="8" fill="#FF6B00"/>
          <circle cx="400" cy="245" r="28" fill="#1a1a2e"/><circle cx="400" cy="245" r="18" fill="#2d2d44"/><circle cx="400" cy="245" r="8" fill="#FF6B00"/>
          <rect x="0" y="226" width="520" height="8" rx="4" fill="rgba(255,255,255,0.1)"/>
          <text x="60" y="170" fontFamily="Syne,sans-serif" fontSize="22" fontWeight="800" fill="white" opacity="0.9">SL</text>
          <rect x="480" y="190" width="20" height="10" rx="2" fill="#FFD700" opacity="0.8"/>
        </svg>
      </div>
    </section>
  )
}
