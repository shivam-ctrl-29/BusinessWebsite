import { useReveal } from '../hooks/useReveal'
import { IconMapPin, IconShield, IconZap, IconCpu } from './Icons'

const METRICS = [
  { val: '15+', unit: 'Years', label: 'In Business Since 2009' },
  { val: '28',  unit: 'States', label: 'Pan India Coverage' },
  { val: '99.2%', unit: '', label: 'On-Time Delivery Rate' },
  { val: '24/7', unit: '', label: 'Operations & Support' },
]

const FEATURES = [
  {
    Icon: IconMapPin,
    title: 'Real-Time GPS Tracking',
    desc: 'Track your shipment live on the map. Get instant updates at every milestone from pickup to delivery.',
    tag: 'Live',
  },
  {
    Icon: IconShield,
    title: 'Insured Cargo Protection',
    desc: 'All shipments are fully insured. Your goods are protected against loss, damage, or theft throughout transit.',
    tag: 'ISO 9001:2015',
  },
  {
    Icon: IconZap,
    title: 'Express & On-Time Guarantee',
    desc: '99.2% on-time delivery rate backed by dedicated operations teams monitoring every shipment 24/7.',
    tag: '99.2% Rate',
  },
  {
    Icon: IconCpu,
    title: 'AI-Powered Route Optimization',
    desc: 'Smart algorithms find the fastest, most fuel-efficient routes saving time and reducing delivery costs.',
    tag: 'Smart Tech',
  },
]

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)

const AwardIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>
  </svg>
)

export default function WhyUs() {
  const ref = useReveal()
  return (
    <section className="why-section" id="about">

      {/* ── Header ── */}
      <div className="why-header">
        <div className="section-tag">Why Shivam Logistics</div>
        <h2 className="section-title">Built on <em>Trust</em>,<br />Powered by Technology</h2>
        <p className="section-sub">15+ years of moving India's goods — reliably, safely, and on time. Here's why 200+ businesses trust us.</p>
      </div>

      {/* ── Metrics strip ── */}
      <div className="why-metrics reveal" ref={useReveal()}>
        {METRICS.map(({ val, unit, label }) => (
          <div className="why-metric" key={label}>
            <div className="why-metric-num">
              {val}<span className="why-metric-unit">{unit}</span>
            </div>
            <div className="why-metric-label">{label}</div>
          </div>
        ))}
      </div>

      {/* ── Main grid ── */}
      <div className="why-grid reveal" ref={ref}>

        {/* LEFT — credential card */}
        <div className="why-cred-card">
          <div className="why-cred-grid" />
          <div className="why-cred-glow" />

          {/* Brand */}
          <div className="why-cred-brand">
            <img src="/assets/logo.jpg" alt="Shivam Logistics" className="why-cred-logo" />
            <div>
              <div className="why-cred-name">Shivam Logistics</div>
              <div className="why-cred-since">Est. 2009 · Indore, MP</div>
            </div>
          </div>

          {/* Divider */}
          <div className="why-cred-divider" />

          {/* Trust signals */}
          <div className="why-trust-list">
            {[
              'ISO 9001:2015 Certified',
              'Pan India GPS Fleet — 500+ Vehicles',
              '50,000+ Successful Deliveries',
              'Insured Cargo on Every Shipment',
              '24 / 7 Dedicated Operations Desk',
            ].map(t => (
              <div className="why-trust-item" key={t}>
                <div className="why-trust-check"><CheckIcon /></div>
                <span>{t}</span>
              </div>
            ))}
          </div>

          {/* Rating */}
          <div className="why-cred-rating">
            <div className="why-rating-stars">★★★★★</div>
            <div className="why-rating-text">
              <strong>4.9 / 5</strong>
              <span>340+ Google Reviews</span>
            </div>
            <div className="why-award-icon"><AwardIcon /></div>
          </div>
        </div>

        {/* RIGHT — feature cards */}
        <div className="why-features-new">
          {FEATURES.map(({ Icon, title, desc, tag }) => (
            <div className="why-fc" key={title}>
              <div className="why-fc-icon-wrap">
                <Icon size={22} />
              </div>
              <div className="why-fc-body">
                <div className="why-fc-top">
                  <h4 className="why-fc-title">{title}</h4>
                  <span className="why-fc-tag">{tag}</span>
                </div>
                <p className="why-fc-desc">{desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
