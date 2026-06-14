const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

const COMING_SOON_STYLE = {
  opacity: 0.35,
  cursor: 'not-allowed',
  fontSize: '.875rem',
  color: 'rgba(255,255,255,0.55)',
  display: 'flex',
  alignItems: 'center',
  gap: 6,
}

function ComingSoon({ label }) {
  return (
    <span style={COMING_SOON_STYLE} title="Coming soon">
      {label}
      <span style={{ fontSize: '.65rem', background: 'rgba(255,107,0,0.25)', color: 'var(--orange)', padding: '2px 6px', borderRadius: 4, fontWeight: 700, letterSpacing: '.3px' }}>SOON</span>
    </span>
  )
}

export default function Footer() {
  return (
    <footer>
      <div className="footer-grid">

        {/* Brand */}
        <div className="footer-brand">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <img src="/assets/logo.jpg" alt="Logo" style={{ height: 48, width: 48, borderRadius: '50%', objectFit: 'contain', background: '#fff', padding: 3 }} />
            <h3 style={{ margin: 0 }}>Shivam Logistics</h3>
          </div>
          <p>India's smart logistics partner delivering trust and reliability across every mile. Pan-India coverage with cutting-edge technology.</p>
          <p style={{ fontSize: '.82rem', color: 'rgba(255,255,255,0.35)', marginTop: 16, display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ color: 'var(--orange)' }}>📲</span> Social media coming soon
          </p>
        </div>

        {/* Services */}
        <div className="footer-col">
          <h4>Services</h4>
          <ul className="footer-links">
            {[
              ['Full Truck Load',  'services'],
              ['Part Truck Load',  'services'],
              ['Express Cargo',    'services'],
              ['Cold Chain',       'services'],
              ['Last Mile',        'services'],
            ].map(([label, id]) => (
              <li key={label}>
                <a href={`#${id}`} onClick={(e) => { e.preventDefault(); scrollTo(id) }}>{label}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div className="footer-col">
          <h4>Company</h4>
          <ul className="footer-links">
            <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollTo('about') }}>About Us</a></li>
            <li><a href="#branches" onClick={(e) => { e.preventDefault(); scrollTo('branches') }}>Branch Network</a></li>
            <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo('contact') }}>Contact Us</a></li>
            <li style={{ listStyle: 'none' }}><ComingSoon label="Careers" /></li>
          </ul>
        </div>

        {/* Quick Links */}
        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li><a href="#quote" onClick={(e) => { e.preventDefault(); scrollTo('quote') }}>Get Quote</a></li>
            <li style={{ listStyle: 'none' }}><ComingSoon label="Privacy Policy" /></li>
            <li style={{ listStyle: 'none' }}><ComingSoon label="Terms of Service" /></li>
          </ul>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Shivam Logistics. All rights reserved. ISO 9001:2015 Certified.</p>
        <div className="footer-bottom-links">
          <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: '.85rem', cursor: 'not-allowed' }}>Privacy</span>
          <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: '.85rem', cursor: 'not-allowed' }}>Terms</span>
        </div>
      </div>
    </footer>
  )
}
