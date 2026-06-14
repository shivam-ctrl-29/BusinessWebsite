import { useReveal } from '../hooks/useReveal'

const PinIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
)
const BuildingIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18M15 3v18M3 9h18M3 15h18"/>
  </svg>
)
const PhoneIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.78a16 16 0 0 0 6.29 6.29l1.62-1.62a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
)
const MapIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/>
    <line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/>
  </svg>
)

const BRANCHES = [
  {
    city: 'Indore',
    state: 'Madhya Pradesh',
    isHQ: true,
    offices: [
      { label: 'Head Office', address: '85, Avantika Nagar, Indore – 452006, MP' },
      { label: 'Branch Office', address: 'Super Corridor, Near Metro Station, Indore – 453112' },
    ],
    phone: '+91 85190 00113',
    tag: 'Headquarters',
  },
  {
    city: 'Jamshedpur',
    state: 'Jharkhand',
    isHQ: false,
    offices: [
      { label: 'Branch Office', address: 'Flat No. 5, Sai Niwas, Parmanu Nagar, Tisko Housing Society, Jharkhand – 832109' },
    ],
    phone: '+91 94068 08500',
    tag: 'Regional Branch',
  },
]

const REACH = [
  { num: '28+', label: 'States Covered' },
  { num: '500+', label: 'Cities Served' },
  { num: '2', label: 'Branch Offices' },
  { num: '24/7', label: 'Operations' },
]

export default function Branches() {
  const ref = useReveal()

  return (
    <section className="branches-section" id="branches">

      {/* Header */}
      <div className="br-header">
        <div className="section-tag">Pan India Presence</div>
        <h2 className="section-title">Our <em>Branch</em> Network</h2>
        <p className="section-sub">Strategically located offices across India — ensuring faster coordination, local support and timely pickups.</p>
      </div>

      {/* Reach strip */}
      <div className="br-reach-strip">
        {REACH.map(({ num, label }) => (
          <div className="br-reach-item" key={label}>
            <span className="br-reach-num">{num}</span>
            <span className="br-reach-label">{label}</span>
          </div>
        ))}
      </div>

      {/* Branch cards */}
      <div className="br-cards reveal" ref={ref}>
        {BRANCHES.map(({ city, state, isHQ, offices, phone, tag }) => (
          <div className={`br-card${isHQ ? ' br-card--hq' : ''}`} key={city}>

            {/* Card top */}
            <div className="br-card-top">
              <div className="br-pin-icon"><PinIcon /></div>
              <div>
                <div className="br-tag">{tag}</div>
                <h3 className="br-city">{city}</h3>
                <div className="br-state">{state}</div>
              </div>
            </div>

            {/* Divider */}
            <div className="br-divider" />

            {/* Offices */}
            <div className="br-offices">
              {offices.map(({ label, address }) => (
                <div className="br-office" key={label}>
                  <div className="br-office-label">
                    <BuildingIcon /> {label}
                  </div>
                  <div className="br-office-addr">
                    <MapIcon /> {address}
                  </div>
                </div>
              ))}
            </div>

            {/* Phone */}
            <a href={`tel:${phone.replace(/\s/g,'')}`} className="br-phone">
              <PhoneIcon /> {phone}
            </a>

            {/* Accent bar */}
            <div className="br-accent-bar" />
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="br-cta">
        <p className="br-cta-text">Need a pickup or local support in your city?</p>
        <a
          href="https://wa.me/918519000113?text=Hi!%20I%20need%20logistics%20support%20in%20my%20city."
          target="_blank"
          rel="noreferrer"
          className="br-cta-btn"
        >
          Contact Nearest Branch
        </a>
      </div>

    </section>
  )
}
