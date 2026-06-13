import { useReveal } from '../hooks/useReveal'

const INDUSTRIES = [
  { icon: '🏭', name: 'Manufacturing' }, { icon: '🛍️', name: 'Retail' },
  { icon: '🥤', name: 'FMCG' },         { icon: '💊', name: 'Pharmaceuticals' },
  { icon: '📱', name: 'Electronics' },  { icon: '🚗', name: 'Automotive' },
  { icon: '📦', name: 'E-Commerce' },   { icon: '🏗️', name: 'Construction' },
  { icon: '🌾', name: 'Agriculture' },  { icon: '⚗️', name: 'Chemicals' },
]

export default function Industries() {
  const ref = useReveal()
  return (
    <section className="industries-section" id="industries">
      <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto' }}>
        <div className="section-tag" style={{ justifyContent: 'center' }}>Industries We Serve</div>
        <h2 className="section-title" style={{ textAlign: 'center' }}>Logistics Solutions for <em>Every</em> Industry</h2>
        <p className="section-sub" style={{ textAlign: 'center', margin: '0 auto' }}>Deep domain expertise across India's key economic sectors.</p>
      </div>
      <div className="industries-grid reveal" ref={ref}>
        {INDUSTRIES.map(ind => (
          <div className="industry-card" key={ind.name}>
            <div className="industry-icon">{ind.icon}</div>
            <div className="industry-name">{ind.name}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
