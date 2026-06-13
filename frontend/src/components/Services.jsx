import { useReveal } from '../hooks/useReveal'

const SERVICES = [
  { key: 'ftl',      icon: '🚛', title: 'Full Truck Load (FTL)',       desc: 'Dedicated truck for your entire cargo. Maximum security, faster delivery, and cost-effective for large shipments.', tag: 'Manufacturing · Retail' },
  { key: 'ptl',      icon: '📦', title: 'Part Truck Load (PTL)',       desc: 'Pay only for the space you use. Ideal for smaller consignments consolidated with other shipments.', tag: 'SME · E-Commerce' },
  { key: 'express',  icon: '⚡', title: 'Express Cargo',               desc: 'Time-critical deliveries with priority handling and express routing across major cities.', tag: 'Pharma · Electronics' },
  { key: 'fleet',    icon: '🚚', title: 'Dedicated Fleet',             desc: 'Assigned vehicles exclusively for your business needs with dedicated driver and route management.', tag: 'FMCG · Automotive' },
  { key: 'container',icon: '🏗️', title: 'Container Transport',        desc: 'ISO-certified containers for safe, secure, and weatherproof transportation of sensitive cargo.', tag: 'Exports · Imports' },
  { key: 'heavy',    icon: '⚙️', title: 'Heavy Equipment Transport',  desc: 'Specialized ODC cargo transportation with permits, escorts, and custom route planning.', tag: 'Construction · Mining' },
  { key: 'cold',     icon: '❄️', title: 'Temperature Controlled',     desc: 'Refrigerated vehicles maintaining precise temperatures for pharmaceuticals and perishables.', tag: 'Pharma · Food' },
  { key: 'lastmile', icon: '🏠', title: 'Last Mile Delivery',         desc: 'Efficient delivery to end customers with proof-of-delivery and real-time tracking.', tag: 'E-Commerce · Retail' },
]

export default function Services({ onCardClick }) {
  const ref = useReveal()
  return (
    <section className="services-section" id="services">
      <div className="section-tag">What We Offer</div>
      <h2 className="section-title">End-to-End <em>Logistics</em> Solutions</h2>
      <p className="section-sub">From heavy haul to last-mile delivery, we provide comprehensive transportation services across India.</p>
      <div className="services-grid reveal" ref={ref}>
        {SERVICES.map(s => (
          <div className="service-card" key={s.key} onClick={() => onCardClick(s.key)}>
            <div className="service-icon">{s.icon}</div>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
            <span className="service-tag">{s.tag}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
