import { useReveal } from '../hooks/useReveal'
import { IconTruck, IconBox, IconSettings, IconArrowRight } from './Icons'

const SERVICES = [
  {
    key: 'ftl',
    Icon: IconTruck,
    title: 'Full Truck Load',
    short: 'FTL',
    desc: 'Dedicated truck exclusively for your cargo — no sharing, no delays. Direct point-to-point delivery with full GPS monitoring and maximum security for large consignments.',
    tag: 'Manufacturing · Retail · FMCG',
    benefits: ['Exclusive vehicle use', 'Faster point-to-point delivery', 'Full GPS monitoring', 'Reduced cargo handling'],
    color: '#FF6B00',
  },
  {
    key: 'ptl',
    Icon: IconBox,
    title: 'Part Truck Load',
    short: 'PTL',
    desc: 'Pay only for the space your cargo occupies. We consolidate compatible shipments for cost-efficient, reliable delivery across our pan-India hub network.',
    tag: 'SME · E-Commerce · Retail',
    benefits: ['Cost-effective for smaller loads', 'Pan India hub network', 'Regular scheduled departures', 'Door-to-door service'],
    color: '#00BFFF',
  },
  {
    key: 'heavy',
    Icon: IconSettings,
    title: 'Heavy Equipment Transport',
    short: 'ODC',
    desc: 'Specialized Over-Dimensional Cargo transportation with route surveys, all-India permits, police escorts, and hydraulic multi-axle trailers for your most critical hauls.',
    tag: 'Construction · Mining · Infrastructure',
    benefits: ['All India ODC permits', 'Route survey & planning', 'Police escort arrangement', 'Hydraulic multi-axle trailers'],
    color: '#FF6B00',
  },
]

export default function Services({ onCardClick }) {
  const ref = useReveal()
  return (
    <section className="services-section" id="services">
      <div className="section-tag">What We Offer</div>
      <h2 className="section-title">Our Core <em>Services</em></h2>
      <p className="section-sub">Three specialised logistics solutions, each built for a different cargo challenge — all backed by our 15+ years of pan-India experience.</p>

      <div className="services-grid-3 reveal" ref={ref}>
        {SERVICES.map(({ key, Icon, title, short, desc, tag, benefits, color }) => (
          <div className="service-card-3" key={key} onClick={() => onCardClick(key)}>
            <div className="sc3-header">
              <div className="sc3-icon" style={{ background: `${color}18`, color }}>
                <Icon size={30} />
              </div>
              <span className="sc3-badge" style={{ background: `${color}18`, color }}>{short}</span>
            </div>
            <h3 className="sc3-title">{title}</h3>
            <p className="sc3-desc">{desc}</p>
            <ul className="sc3-benefits">
              {benefits.map(b => (
                <li key={b}>
                  <span className="sc3-dot" style={{ background: color }} />
                  {b}
                </li>
              ))}
            </ul>
            <div className="sc3-footer">
              <span className="service-tag">{tag}</span>
              <button className="sc3-cta" style={{ color }} aria-label={`Learn more about ${title}`}>
                Learn more <IconArrowRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
