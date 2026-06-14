import { useReveal } from '../hooks/useReveal'

const FLEET = [
  {
    name: '32-Ft Open Trailer',
    capacity: '9 MT',
    specs: ['Length: 32 Feet', 'Open Body', 'GPS Enabled', 'Heavy Haul Ready'],
    use: 'Ideal for steel, pipes, machinery & construction material',
    accent: '#FF6B00',
    svg: (
      <svg viewBox="0 0 80 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="72" height="44">
        <rect x="2" y="20" width="52" height="18" rx="3" fill="#1a3a5c" stroke="#FF6B00" strokeWidth="1.5"/>
        <rect x="54" y="26" width="22" height="12" rx="2" fill="#0d2b52" stroke="#FF6B00" strokeWidth="1.5"/>
        <path d="M54 26 L60 18 L76 18 L76 26Z" fill="#1a3a5c" stroke="#FF6B00" strokeWidth="1"/>
        <rect x="63" y="20" width="10" height="6" rx="1" fill="#00BFFF" opacity="0.6"/>
        <circle cx="16" cy="40" r="6" fill="#0d2b52" stroke="#FF6B00" strokeWidth="1.5"/>
        <circle cx="16" cy="40" r="3" fill="#FF6B00"/>
        <circle cx="62" cy="40" r="6" fill="#0d2b52" stroke="#FF6B00" strokeWidth="1.5"/>
        <circle cx="62" cy="40" r="3" fill="#FF6B00"/>
        <rect x="2" y="24" width="52" height="2" rx="1" fill="#FF6B00" opacity="0.3"/>
      </svg>
    ),
  },
  {
    name: '40-Ft Open Trailer',
    capacity: '15–18 MT',
    specs: ['Length: 40 Feet', 'Open Body', 'GPS Enabled', 'ODC Capable'],
    use: 'Best for large industrial equipment, beams & over-sized cargo',
    accent: '#00BFFF',
    svg: (
      <svg viewBox="0 0 88 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="80" height="44">
        <rect x="2" y="20" width="62" height="18" rx="3" fill="#1a3a5c" stroke="#00BFFF" strokeWidth="1.5"/>
        <rect x="64" y="26" width="20" height="12" rx="2" fill="#0d2b52" stroke="#00BFFF" strokeWidth="1.5"/>
        <path d="M64 26 L70 18 L84 18 L84 26Z" fill="#1a3a5c" stroke="#00BFFF" strokeWidth="1"/>
        <rect x="71" y="20" width="9" height="6" rx="1" fill="#00BFFF" opacity="0.6"/>
        <circle cx="18" cy="40" r="6" fill="#0d2b52" stroke="#00BFFF" strokeWidth="1.5"/>
        <circle cx="18" cy="40" r="3" fill="#00BFFF"/>
        <circle cx="70" cy="40" r="6" fill="#0d2b52" stroke="#00BFFF" strokeWidth="1.5"/>
        <circle cx="70" cy="40" r="3" fill="#00BFFF"/>
        <rect x="2" y="24" width="62" height="2" rx="1" fill="#00BFFF" opacity="0.3"/>
      </svg>
    ),
  },
  {
    name: 'Hydra Crane',
    capacity: '12 MT Lift',
    specs: ['Hydraulic Crane', '12T Lifting Cap.', 'Telescopic Boom', 'Rotating 360°'],
    use: 'Loading & unloading heavy machinery, steel structures & equipment',
    accent: '#FF6B00',
    svg: (
      <svg viewBox="0 0 72 56" fill="none" xmlns="http://www.w3.org/2000/svg" width="68" height="52">
        <rect x="8" y="32" width="36" height="16" rx="3" fill="#1a3a5c" stroke="#FF6B00" strokeWidth="1.5"/>
        <rect x="44" y="36" width="20" height="12" rx="2" fill="#0d2b52" stroke="#FF6B00" strokeWidth="1.5"/>
        <line x1="20" y1="32" x2="8" y2="8" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round"/>
        <line x1="8" y1="8" x2="36" y2="8" stroke="#FF6B00" strokeWidth="1.5" strokeDasharray="3,2"/>
        <line x1="36" y1="8" x2="36" y2="32" stroke="#FF6B00" strokeWidth="1" strokeDasharray="2,2" opacity="0.5"/>
        <circle cx="8" cy="8" r="3" fill="#FF6B00"/>
        <circle cx="20" cy="50" r="6" fill="#0d2b52" stroke="#FF6B00" strokeWidth="1.5"/>
        <circle cx="20" cy="50" r="3" fill="#FF6B00"/>
        <circle cx="56" cy="50" r="6" fill="#0d2b52" stroke="#FF6B00" strokeWidth="1.5"/>
        <circle cx="56" cy="50" r="3" fill="#FF6B00"/>
      </svg>
    ),
  },
  {
    name: 'JCB / Excavator',
    capacity: '0.2–1 m³ Bucket',
    specs: ['Earth Moving', 'Site Loading', 'Telescopic Arm', 'Multi-Terrain'],
    use: 'Excavation, loading, site preparation & heavy earthwork',
    accent: '#00BFFF',
    svg: (
      <svg viewBox="0 0 72 56" fill="none" xmlns="http://www.w3.org/2000/svg" width="68" height="52">
        <rect x="4" y="36" width="40" height="14" rx="3" fill="#1a3a5c" stroke="#00BFFF" strokeWidth="1.5"/>
        <rect x="16" y="28" width="22" height="10" rx="2" fill="#0d2b52" stroke="#00BFFF" strokeWidth="1"/>
        <rect x="22" y="22" width="12" height="8" rx="1" fill="#1a3a5c" stroke="#00BFFF" strokeWidth="1"/>
        <line x1="44" y1="32" x2="58" y2="20" stroke="#00BFFF" strokeWidth="2" strokeLinecap="round"/>
        <line x1="58" y1="20" x2="64" y2="36" stroke="#00BFFF" strokeWidth="2" strokeLinecap="round"/>
        <path d="M64 36 L68 42 L60 42 Z" fill="#00BFFF" opacity="0.8"/>
        <rect x="4" y="48" width="40" height="6" rx="2" fill="#FF6B00" opacity="0.4"/>
        <circle cx="10" cy="50" r="3" fill="#0d2b52" stroke="#00BFFF" strokeWidth="1"/>
        <circle cx="38" cy="50" r="3" fill="#0d2b52" stroke="#00BFFF" strokeWidth="1"/>
      </svg>
    ),
  },
  {
    name: 'Tata Ace / Mini Truck',
    capacity: '0.75–1 MT',
    specs: ['City Delivery', 'Last Mile', 'GPS Enabled', 'Door-to-Door'],
    use: 'Urban last-mile delivery, retail distribution & small consignments',
    accent: '#FF6B00',
    svg: (
      <svg viewBox="0 0 64 44" fill="none" xmlns="http://www.w3.org/2000/svg" width="60" height="40">
        <rect x="2" y="18" width="34" height="18" rx="3" fill="#1a3a5c" stroke="#FF6B00" strokeWidth="1.5"/>
        <rect x="36" y="24" width="24" height="12" rx="2" fill="#0d2b52" stroke="#FF6B00" strokeWidth="1.5"/>
        <path d="M36 24 L42 14 L60 14 L60 24Z" fill="#1a3a5c" stroke="#FF6B00" strokeWidth="1"/>
        <rect x="44" y="16" width="12" height="7" rx="1" fill="#00BFFF" opacity="0.7"/>
        <circle cx="14" cy="38" r="5" fill="#0d2b52" stroke="#FF6B00" strokeWidth="1.5"/>
        <circle cx="14" cy="38" r="2.5" fill="#FF6B00"/>
        <circle cx="50" cy="38" r="5" fill="#0d2b52" stroke="#FF6B00" strokeWidth="1.5"/>
        <circle cx="50" cy="38" r="2.5" fill="#FF6B00"/>
      </svg>
    ),
  },
]

export default function Fleet() {
  const ref = useReveal()
  return (
    <section className="fleet-section" id="fleet">
      <div className="section-tag">Our Fleet</div>
      <h2 className="section-title">Modern Fleet, <em>Maximum</em> Reliability</h2>
      <p className="section-sub">GPS-tracked, well-maintained vehicles for every cargo type — from last-mile city runs to heavy industrial hauls.</p>

      <div className="fleet-grid-5 reveal" ref={ref}>
        {FLEET.map(({ name, capacity, specs, use, accent, svg }) => (
          <div className="fleet-card-5" key={name}>
            <div className="fc5-top" style={{ borderBottom: `2px solid ${accent}22` }}>
              <div className="fc5-svg">{svg}</div>
              <div className="fc5-cap" style={{ color: accent }}>{capacity}</div>
            </div>
            <div className="fc5-body">
              <h3 className="fc5-name">{name}</h3>
              <p className="fc5-use">{use}</p>
              <div className="fc5-specs">
                {specs.map(s => (
                  <span key={s} className="fc5-spec-pill" style={{ borderColor: `${accent}40`, color: accent }}>{s}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
