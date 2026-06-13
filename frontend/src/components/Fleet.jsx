import { useReveal } from '../hooks/useReveal'

const FLEET = [
  { icon: '🚛', name: '32-Ft Container Truck', specs: ['Capacity: 15 MT', 'Volume: 1400 CFT', 'GPS Enabled'] },
  { icon: '🚚', name: '20-Ft Container',        specs: ['Capacity: 10 MT', 'Volume: 900 CFT',  'GPS Enabled'] },
  { icon: '🚐', name: 'Tata Ace / Mini Truck',  specs: ['Capacity: 1 MT',  'Last Mile',         'City Ready'] },
  { icon: '🚜', name: 'Flatbed Trailer',         specs: ['Capacity: 25 MT', 'ODC Ready',         'Heavy Haul'] },
  { icon: '❄️', name: 'Reefer / Cold Chain',    specs: ['Temp: -20°C to 20°C', 'Pharma Grade', 'IoT Monitored'] },
  { icon: '🏗️', name: 'Tanker / Bulk Carrier', specs: ['Capacity: 20 KL', 'Chemical Grade',    'SS Lined'] },
]

export default function Fleet() {
  const ref = useReveal()
  return (
    <section className="fleet-section" id="fleet">
      <div className="section-tag">Our Fleet</div>
      <h2 className="section-title">Modern Fleet, <em>Maximum</em> Reliability</h2>
      <p className="section-sub">500+ GPS-tracked vehicles maintained to the highest safety standards, ready for every cargo type.</p>
      <div className="fleet-grid reveal" ref={ref}>
        {FLEET.map(f => (
          <div className="fleet-card" key={f.name}>
            <div className="fleet-img">{f.icon}</div>
            <div className="fleet-info">
              <h3>{f.name}</h3>
              <div className="fleet-spec">
                {f.specs.map(s => <div className="fleet-spec-item" key={s}>{s}</div>)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
