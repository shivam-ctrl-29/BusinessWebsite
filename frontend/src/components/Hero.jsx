import { IconArrowRight, IconMapPin, IconSearch, IconZap, IconShield } from './Icons'

const PILLS = [
  { Icon: IconMapPin, label: 'Pan India Delivery' },
  { Icon: IconSearch, label: 'GPS Tracking' },
  { Icon: IconZap,    label: 'Fast Transit' },
  { Icon: IconShield, label: 'Secure Transport' },
]

const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)

const TruckIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 5v4h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
  </svg>
)

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-bg-dots" />

      {/* LEFT — text content */}
      <div className="hero-content">
        <div className="hero-badge">
          <div className="hero-badge-dot" />
          <span>India's #1 Smart Logistics Partner</span>
        </div>

        <h1>
          Delivering <em>Trust</em><br />Across Every Mile
        </h1>

        <p className="hero-sub">
          India's Smart Logistics Partner for Fast, Reliable, and Technology-Driven Transportation Solutions. Pan India coverage with real-time GPS tracking.
        </p>

        <div className="hero-cta">
          <button className="btn-primary" onClick={() => document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth' })}>
            Get Instant Quote <IconArrowRight size={16} />
          </button>
          <button className="btn-outline" onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}>
            Our Services <IconArrowRight size={16} />
          </button>
        </div>

        <div className="feature-pills">
          {PILLS.map(({ Icon, label }) => (
            <div className="pill" key={label}>
              <Icon size={15} /> {label}
            </div>
          ))}
        </div>

        <div className="hero-stats">
          {[
            { display: '50,000+', label: 'Deliveries' },
            { display: '500+',    label: 'Vehicles' },
            { display: '200+',    label: 'Clients' },
            { display: '15+',     label: 'Years Exp.' },
          ].map(s => (
            <div className="hero-stat-item" key={s.label}>
              <div className="hero-stat-num">{s.display}</div>
              <div className="hero-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT — showcase card */}
      <div className="hero-right">
        <div className="hs">

          {/* Floating card — GPS */}
          <div className="hs-card hs-card-gps">
            <div className="hs-live-dot" />
            <div>
              <div className="hs-card-label">Live GPS Tracking</div>
              <div className="hs-card-value">Indore → Mumbai</div>
            </div>
          </div>

          {/* Floating card — On-Time */}
          <div className="hs-card hs-card-ontime">
            <CheckIcon />
            <div>
              <div className="hs-card-label">On-Time Delivery</div>
              <div className="hs-card-value hs-green">98.5%</div>
            </div>
          </div>

          {/* Dark showcase panel */}
          <div className="hs-panel">
            <div className="hs-grid" />
            <div className="hs-bottom-glow" />
            <div className="hs-road-lines" />
            <img
              src="/assets/trailer-32ft.png"
              alt="Shivam Logistics 32-Ft Trailer Truck"
              className="hs-truck"
              fetchpriority="high"
            />
          </div>

          {/* Bottom fleet badge */}
          <div className="hs-fleet-badge">
            <TruckIcon /> 500+ Active Fleet · Pan India
          </div>

        </div>
      </div>
    </section>
  )
}
