import { useReveal } from '../hooks/useReveal'

const FLEET = [
  {
    name: '32-Ft Open Trailer',
    capacity: '9 MT',
    specs: ['Length: 32 Feet', 'Open Body', 'GPS Enabled', 'Heavy Haul Ready'],
    use: 'Ideal for steel, pipes, machinery & construction material',
    accent: '#FF6B00',
    photo: '/assets/trailer-32ft.png',
  },
  {
    name: '40-Ft Open Trailer',
    capacity: '15–18 MT',
    specs: ['Length: 40 Feet', 'Open Body', 'GPS Enabled', 'ODC Capable'],
    use: 'Best for large industrial equipment, beams & over-sized cargo',
    accent: '#00BFFF',
    photo: '/assets/trailer-40ft.png',
  },
  {
    name: 'Hydra Crane',
    capacity: '12 MT Lift',
    specs: ['Hydraulic Crane', '12T Lifting Cap.', 'Telescopic Boom', 'Rotating 360°'],
    use: 'Loading & unloading heavy machinery, steel structures & equipment',
    accent: '#FF6B00',
    photo: '/assets/hydra-crane.jpg',
  },
  {
    name: 'JCB / Excavator',
    capacity: '0.2–1 m³ Bucket',
    specs: ['Earth Moving', 'Site Loading', 'Telescopic Arm', 'Multi-Terrain'],
    use: 'Excavation, loading, site preparation & heavy earthwork',
    accent: '#00BFFF',
    photo: '/assets/jcb.jpg',
  },
  {
    name: 'Eicher Truck',
    capacity: '5 MT',
    specs: ['City & Highway', 'GPS Enabled', 'Door-to-Door', 'Medium Haul'],
    use: 'Mid-range deliveries, retail distribution & inter-city consignments',
    accent: '#FF6B00',
    photo: '/assets/eicher-truck.jpg',
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
        {FLEET.map(({ name, capacity, specs, use, accent, photo, svg }) => (
          <div className="fleet-card-5" key={name}>
            <div className="fc5-top" style={{ borderBottom: `2px solid ${accent}22`, padding: photo ? 0 : undefined }}>
              {photo ? (
                <div className="fc5-photo-wrap">
                  <img src={photo} alt={name} className="fc5-photo" />
                  <div className="fc5-cap-overlay" style={{ color: accent }}>{capacity}</div>
                </div>
              ) : (
                <>
                  <div className="fc5-svg">{svg}</div>
                  <div className="fc5-cap" style={{ color: accent }}>{capacity}</div>
                </>
              )}
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
