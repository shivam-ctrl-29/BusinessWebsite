import { useState, useEffect } from 'react'
import { useReveal } from '../hooks/useReveal'

export default function Quote({ showToast }) {
  const ref = useReveal()
  const [form, setForm] = useState({ name:'', contact:'', pickup:'', delivery:'', material:'', weight:'', vehicle:'', date:'', notes:'' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (!success) ref.current?.classList.add('visible')
  }, [success])

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  const submit = async () => {
    if (!form.name)    { showToast('⚠️ Please enter your name'); return }
    if (!form.contact) { showToast('⚠️ Please enter your phone or email'); return }
    if (!form.pickup)  { showToast('⚠️ Please enter pickup location'); return }
    if (!form.delivery){ showToast('⚠️ Please enter delivery location'); return }
    setLoading(true)
    try {
      const res = await fetch('/api/quote', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      const json = await res.json()
      if (json.success) { setSuccess(true) }
      else showToast('⚠️ ' + (json.error || 'Something went wrong.'))
    } catch { showToast('Network error. Please try WhatsApp or call us.') }
    finally { setLoading(false) }
  }

  const reset = () => { setForm({ name:'',contact:'',pickup:'',delivery:'',material:'',weight:'',vehicle:'',date:'',notes:'' }); setSuccess(false) }

  const badges = [
    { label: 'From', value: form.pickup }, { label: 'To', value: form.delivery },
    { label: 'Material', value: form.material || 'General Goods' }, { label: 'Contact', value: form.contact },
  ]

  return (
    <section className="quote-section" id="quote">
      <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto' }}>
        <div className="section-tag" style={{ justifyContent: 'center', color: 'rgba(255,255,255,0.7)' }}>Free Quote</div>
        <h2 className="section-title" style={{ textAlign: 'center', color: '#fff' }}>Request a <em>Custom</em> Quote</h2>
        <p className="section-sub" style={{ textAlign: 'center', margin: '0 auto', color: 'rgba(255,255,255,0.6)' }}>
          Fill in your shipment details and our team will send you a personalised quote within <strong style={{ color: 'var(--orange)' }}>2 hours</strong>.
        </p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: 32, flexWrap: 'wrap', margin: '32px auto 0', maxWidth: 700 }}>
        {[['⚡','Reply within 2 hours'],['💰','Best price guaranteed'],['🔒','No hidden charges']].map(([icon, text]) => (
          <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.75)', fontSize: '.85rem' }}>
            <span style={{ color: 'var(--orange)', fontSize: '1.1rem' }}>{icon}</span>{text}
          </div>
        ))}
      </div>

      {!success ? (
        <div className="quote-form-card reveal" ref={ref}>
          <div className="form-grid">
            {[['name','Your Name *','text','e.g. Rajesh Kumar'],['contact','Phone / Email *','text','Mobile or email address'],['pickup','Pickup Location *','text','e.g. Mumbai, Maharashtra'],['delivery','Delivery Location *','text','e.g. Delhi, NCR'],['weight','Approx. Weight (MT)','number','e.g. 5']].map(([key, label, type, ph]) => (
              <div className="form-group" key={key}>
                <label>{label}</label>
                <input type={type} className="form-control" placeholder={ph} value={form[key]} onChange={set(key)} />
              </div>
            ))}
            <div className="form-group">
              <label>Required Date</label>
              <input type="date" className="form-control" value={form.date} onChange={set('date')} />
            </div>
            <div className="form-group">
              <label>Material Type</label>
              <select className="form-control" value={form.material} onChange={set('material')}>
                <option value="">Select Material</option>
                {['General Goods','Electronics','Pharmaceuticals','Automotive Parts','FMCG Products','Raw Materials','Perishables','Hazardous'].map(m => <option key={m}>{m}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Vehicle Type</label>
              <select className="form-control" value={form.vehicle} onChange={set('vehicle')}>
                <option value="">Select Vehicle</option>
                {['Mini Truck (Tata Ace)','20-Ft Container','32-Ft Container','Flatbed Trailer','Reefer / Cold Chain','Tanker'].map(v => <option key={v}>{v}</option>)}
              </select>
            </div>
          </div>
          <div className="form-group" style={{ marginTop: 20 }}>
            <label>Additional Notes</label>
            <textarea className="form-control" rows={3} placeholder="Any special requirements, fragile items, loading/unloading needs..." style={{ resize: 'vertical' }} value={form.notes} onChange={set('notes')} />
          </div>
          <div style={{ textAlign: 'center', marginTop: 28 }}>
            <button className="btn-primary" onClick={submit} disabled={loading} style={{ margin: '0 auto', padding: '16px 48px', fontSize: '1rem' }}>
              {loading ? '⏳ Sending...' : '📩 Request My Quote'}
            </button>
            <p style={{ marginTop: 14, fontSize: '.8rem', color: 'rgba(255,255,255,0.4)' }}>We'll reply to your phone/email with a detailed quote</p>
          </div>
        </div>
      ) : (
        <div className="quote-form-card" style={{ textAlign: 'center', marginTop: 48, maxWidth: 800, margin: '48px auto 0' }}>
          <div className="quote-success">
            <div className="quote-success-icon">✅</div>
            <h3>Quote Request Sent!</h3>
            <p>Our team has received your request and will send you a personalised quote within <strong>2 hours</strong>.</p>
            <div className="quote-success-details">
              {badges.filter(b => b.value).map(b => (
                <div className="quote-success-badge" key={b.label}><strong>{b.label}</strong>{b.value}</div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginTop: 28 }}>
              <button className="btn-primary" onClick={reset} style={{ background: 'rgba(255,255,255,0.15)', border: '1.5px solid rgba(255,255,255,0.3)', boxShadow: 'none' }}>
                Submit Another Request
              </button>
              <a href={`https://wa.me/918519000113?text=Hi!%20I%20just%20submitted%20a%20quote%20request%20on%20your%20website.`} target="_blank" rel="noreferrer" className="btn-primary" style={{ background: '#25D366', boxShadow: 'none' }}>
                💬 Follow up on WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
