import { useState } from 'react'

export default function Tracking({ showToast }) {
  const [input, setInput] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const track = async () => {
    if (!input.trim()) { showToast('Please enter a tracking number'); return }
    setLoading(true)
    try {
      const res = await fetch(`/api/track/${encodeURIComponent(input.trim())}`)
      const json = await res.json()
      if (json.success) {
        setResult(json.data)
        showToast('Shipment found! ' + json.data.status)
      } else {
        showToast('⚠️ ' + json.error)
      }
    } catch {
      showToast('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div id="track-section" className="track-wrap">
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div className="section-tag" style={{ justifyContent: 'center' }}>Real-Time Tracking</div>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: '1.8rem', fontWeight: 800, color: 'var(--text)' }}>Track Your Shipment</h2>
        </div>
        <div style={{ display: 'flex', maxWidth: 600, margin: '0 auto 16px' }}>
          <input className="track-input" value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && track()}
            placeholder="Enter Tracking Number (e.g. SL2024001234)" />
          <button className="track-btn" onClick={track} disabled={loading}>
            {loading ? '⏳' : '🔍'} Track
          </button>
        </div>

        {result && (
          <div className="track-result">
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 24 }}>
              {[
                { label: 'Shipment ID', value: result.trackingId },
                { label: 'Status',      value: result.status, badge: true },
                { label: 'ETA',         value: result.eta },
                { label: 'Route',       value: result.route },
              ].map(({ label, value, badge }) => (
                <div key={label}>
                  <div style={{ fontSize: '.8rem', textTransform: 'uppercase', letterSpacing: '.5px', color: 'var(--text-light)', marginBottom: 4 }}>{label}</div>
                  {badge
                    ? <div style={{ display: 'inline-block', padding: '6px 16px', borderRadius: 100, background: 'rgba(255,107,0,0.12)', color: 'var(--orange)', fontWeight: 700, fontSize: '.9rem' }}>{value}</div>
                    : <div style={{ fontWeight: 700, color: 'var(--text)', fontSize: '.95rem' }}>{value}</div>
                  }
                </div>
              ))}
            </div>
            <div className="timeline">
              {result.steps.map((s, i) => (
                <div className="timeline-item" key={i}>
                  <div className={`timeline-dot${s.done ? ' done' : ''}${s.active ? ' active' : ''}`}>{s.done ? '✓' : '○'}</div>
                  <div className="timeline-text">
                    <h4 style={{ color: s.done ? 'var(--text)' : 'var(--text-light)' }}>{s.label}</h4>
                    <p>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
