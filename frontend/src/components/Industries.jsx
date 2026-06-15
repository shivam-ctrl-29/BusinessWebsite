import { useReveal } from '../hooks/useReveal'

const STATS = [
  { value: '28+', label: 'States Covered' },
  { value: '500+', label: 'GPS Vehicles' },
  { value: '50K+', label: 'Deliveries Done' },
  { value: '15+', label: 'Years Experience' },
]

const CITIES = [
  'Mumbai', 'Delhi', 'Bengaluru', 'Hyderabad', 'Chennai', 'Kolkata',
  'Pune', 'Ahmedabad', 'Indore', 'Jaipur', 'Surat', 'Lucknow',
  'Jamshedpur', 'Nagpur', 'Bhopal', 'Vadodara', 'Coimbatore', 'Kochi',
  'Chandigarh', 'Ludhiana', 'Patna', 'Ranchi', 'Raipur', 'Nashik',
  'Visakhapatnam', 'Guwahati', 'Bhubaneswar', 'Amritsar',
]

export default function Industries() {
  const ref = useReveal()
  return (
    <section className="coverage-section" id="industries">
      <div className="coverage-inner reveal" ref={ref}>

        {/* Header */}
        <div className="coverage-header">
          <div className="section-tag" style={{ justifyContent: 'center' }}>Pan India Network</div>
          <h2 className="section-title" style={{ textAlign: 'center' }}>
            We Deliver <em>Everywhere</em><br />India Does Business
          </h2>
          <p className="section-sub" style={{ textAlign: 'center', margin: '0 auto', maxWidth: 520 }}>
            From metro hubs to Tier-2 towns — our network spans 28 states with real-time GPS coverage on every route.
          </p>
        </div>

        {/* Stats row */}
        <div className="coverage-stats">
          {STATS.map(({ value, label }) => (
            <div className="cov-stat" key={label}>
              <div className="cov-stat-val">{value}</div>
              <div className="cov-stat-label">{label}</div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="cov-divider">
          <span>Major cities & hubs we serve</span>
        </div>

        {/* City pills */}
        <div className="cov-cities">
          {CITIES.map(city => (
            <span className="cov-city" key={city}>{city}</span>
          ))}
          <span className="cov-city cov-city-more">+ many more</span>
        </div>

        {/* Bottom CTA strip */}
        <div className="cov-cta-strip">
          <p>Need delivery to a location not listed? <strong style={{ color: 'var(--blue)' }}>We probably cover it.</strong></p>
          <button className="btn-primary" style={{ flexShrink: 0 }}
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
            Check Your Route →
          </button>
        </div>

      </div>
    </section>
  )
}
