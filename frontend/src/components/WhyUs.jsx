import { useReveal } from '../hooks/useReveal'

const FEATURES = [
  { icon: '📍', title: 'Real-Time GPS Tracking',        desc: 'Track your shipment live on the map. Get instant updates at every milestone from pickup to delivery.' },
  { icon: '🔒', title: 'Insured Cargo Protection',      desc: 'All shipments are fully insured. Your goods are protected against loss, damage, or theft throughout transit.' },
  { icon: '⚡', title: 'Express & On-Time Guarantee',   desc: '99.2% on-time delivery rate backed by dedicated operations teams monitoring every shipment 24/7.' },
  { icon: '🤖', title: 'AI-Powered Route Optimization', desc: 'Smart algorithms find the fastest, most fuel-efficient routes saving time and reducing delivery costs.' },
]

export default function WhyUs() {
  const ref = useReveal()
  return (
    <section className="why-section" id="about">
      <div className="section-tag">Why Shivam Logistics</div>
      <h2 className="section-title">Built on <em>Trust</em>,<br />Powered by Technology</h2>
      <div className="why-grid reveal" ref={ref}>
        <div style={{ borderRadius: 'var(--radius)', background: 'linear-gradient(135deg,var(--navy),#0d3060)', padding: 48, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 360 }}>
          <img src="/assets/logo.jpg" alt="Shivam Logistics" style={{ height: 100, width: 100, borderRadius: '50%', objectFit: 'contain', background: '#fff', padding: 8, marginBottom: 24 }} />
          <div style={{ fontFamily: "'Syne',sans-serif", fontSize: '1.5rem', fontWeight: 800, color: '#fff', textAlign: 'center' }}>15+ Years of<br />Logistics Excellence</div>
          <p style={{ color: 'rgba(255,255,255,0.6)', textAlign: 'center', marginTop: 12, fontSize: '.9rem' }}>Serving India's leading industries since 2009</p>
          <div style={{ display: 'flex', gap: 20, marginTop: 28, flexWrap: 'wrap', justifyContent: 'center' }}>
            {[['ISO','9001:2015','var(--orange)'],['28','States','var(--sky)'],['24/7','Support','#fff']].map(([val, sub, color]) => (
              <div key={val} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: '1.8rem', fontWeight: 800, color }}>{val}</div>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '.75rem' }}>{sub}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="why-features">
          {FEATURES.map(f => (
            <div className="why-feature" key={f.title}>
              <div className="why-feature-icon">{f.icon}</div>
              <div className="why-feature-content">
                <h4>{f.title}</h4>
                <p>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
