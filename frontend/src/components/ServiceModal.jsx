const SERVICE_DATA = {
  ftl:      { title: 'Full Truck Load (FTL) 🚛', desc: 'Dedicated truck for your entire cargo consignment. Ideal for large shipments requiring maximum security, faster transit times, and cost efficiency.', benefits: ['Faster transit times','Direct point-to-point delivery','Reduced handling & damage risk','Full vehicle monitoring via GPS','Cost-effective for large volumes'], industries: 'Manufacturing, Retail, FMCG, E-Commerce' },
  ptl:      { title: 'Part Truck Load (PTL) 📦', desc: 'Pay only for the space your cargo occupies. Your shipment is consolidated with other compatible cargo for efficient transportation.', benefits: ['Cost-effective for smaller loads','Pan India hub network','Regular scheduled departures','Real-time tracking','Door-to-door service'], industries: 'SME, E-Commerce, Retail, FMCG' },
  express:  { title: 'Express Cargo ⚡', desc: 'Time-critical shipments handled with priority. Our express network ensures fastest possible delivery with dedicated handling and expedited routing.', benefits: ['24-48 hour metro delivery','Priority handling','Dedicated express routes','Real-time SMS updates','SLA-backed delivery guarantee'], industries: 'Pharmaceuticals, Electronics, Banking, Fashion' },
  fleet:    { title: 'Dedicated Fleet 🚚', desc: 'Exclusive fleet assignment for your business operations. Vehicles, drivers, and routes managed entirely as per your business requirements.', benefits: ['Exclusive vehicle use','Customized schedule & routes','Dedicated driver assignment','White-labeling available','Monthly SLA reporting'], industries: 'FMCG, Automotive, Manufacturing' },
  container:{ title: 'Container Transport 🏗️', desc: 'ISO-certified container transportation for domestic cargo requiring weatherproof, tamper-evident, and secure movement across India.', benefits: ['ISO certified containers','Weatherproof cargo protection','Tamper-evident sealing','Port-to-warehouse connectivity','Import/export support'], industries: 'Exports, Chemicals, Electronics, Industrial' },
  heavy:    { title: 'Heavy Equipment Transport ⚙️', desc: 'Specialized ODC transportation with necessary permits, police escorts, route surveys, and custom engineered trailers.', benefits: ['All India ODC permits','Route survey & planning','Police escort arrangement','Hydraulic multi-axle trailers','Project logistics expertise'], industries: 'Construction, Mining, Power, Infrastructure' },
  cold:     { title: 'Temperature Controlled ❄️', desc: 'Refrigerated and cold-chain logistics maintaining precise temperature ranges from -20°C to +20°C with IoT-based continuous monitoring.', benefits: ['Real-time temp monitoring','-20°C to +20°C range','FSSAI & GDP compliant','Alert system for deviations','End-to-end cold chain'], industries: 'Pharmaceuticals, Food & Beverage, Dairy, Horticulture' },
  lastmile: { title: 'Last Mile Delivery 🏠', desc: 'Efficient, technology-driven delivery to end customers. Complete with electronic proof of delivery, customer notifications, and return management.', benefits: ['GPS-tracked delivery agents','ePOD (Electronic POD)','Customer delivery SMS alerts','Failed delivery re-attempt','Returns & RTO management'], industries: 'E-Commerce, Retail, D2C Brands, Quick Commerce' },
}

export default function ServiceModal({ serviceKey, onClose }) {
  const s = SERVICE_DATA[serviceKey]
  const show = !!s

  return (
    <div className={`modal-overlay${show ? ' show' : ''}`} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        {s && <>
          <div className="modal-header">
            <div className="modal-title">{s.title}</div>
            <button className="modal-close" onClick={onClose}>✕</button>
          </div>
          <p style={{ color: 'var(--text-light)', fontSize: '.95rem', lineHeight: 1.7, marginBottom: 20 }}>{s.desc}</p>
          <h4 style={{ fontWeight: 700, marginBottom: 12, color: 'var(--text)', fontSize: '.95rem' }}>Key Benefits</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
            {s.benefits.map(b => (
              <li key={b} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: '.875rem', color: 'var(--text-light)' }}>
                <span style={{ color: 'var(--orange)', marginTop: 1 }}>✓</span>{b}
              </li>
            ))}
          </ul>
          <div style={{ background: 'var(--light-gray)', borderRadius: 10, padding: '14px 16px', marginBottom: 24 }}>
            <span style={{ fontSize: '.8rem', fontWeight: 600, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '.5px' }}>Industries: </span>
            <span style={{ fontSize: '.875rem', color: 'var(--text)', fontWeight: 500 }}>{s.industries}</span>
          </div>
          <button className="btn-primary" onClick={() => { onClose(); document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth' }) }} style={{ width: '100%', justifyContent: 'center' }}>
            Get Quote for This Service →
          </button>
        </>}
      </div>
    </div>
  )
}
