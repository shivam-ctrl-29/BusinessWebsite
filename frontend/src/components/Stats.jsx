import { useEffect, useRef } from 'react'

const STATS = [
  { value: '50,000+', label: 'Successful Deliveries' },
  { value: '500+',    label: 'Vehicles in Fleet' },
  { value: '28',      label: 'States Covered' },
  { value: '99.2%',   label: 'On-Time Delivery' },
]

export default function Stats() {
  const ref = useRef(null)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) ref.current?.classList.add('visible') }, { threshold: 0.08 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section className="stats-section">
      <div className="stats-grid reveal" ref={ref}>
        {STATS.map(s => (
          <div className="stat-card" key={s.label}>
            <div className="stat-number"><span>{s.value}</span></div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
