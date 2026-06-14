import { useState, useEffect } from 'react'
import { useReveal } from '../hooks/useReveal'
import { IconZap, IconShield, IconCheck, IconArrowRight, IconLoader } from './Icons'

const PROMISES = [
  { Icon: IconZap,    title: 'Reply in 2 Hours',       desc: 'Our team responds to every quote request within 2 business hours.' },
  { Icon: IconShield, title: 'No Hidden Charges',       desc: 'The price we quote is the price you pay. No surprises, ever.' },
  { Icon: IconCheck,  title: 'Best Rate Guaranteed',    desc: 'We match or beat any comparable quote from other logistics providers.' },
]

const MATERIALS = ['General Goods','Electronics','Pharmaceuticals','Automotive Parts','FMCG Products','Raw Materials','Perishables','Hazardous']
const VEHICLES  = ['Mini Truck (Tata Ace)','32-Ft Open Trailer','40-Ft Open Trailer','Hydra Crane','JCB / Excavator','Other']

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
    if (!form.name)     { showToast('Please enter your name'); return }
    if (!form.contact)  { showToast('Please enter your phone or email'); return }
    if (!form.pickup)   { showToast('Please enter pickup location'); return }
    if (!form.delivery) { showToast('Please enter delivery location'); return }
    setLoading(true)
    try {
      const res  = await fetch('/api/quote', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      const json = await res.json()
      if (json.success) setSuccess(true)
      else showToast(json.error || 'Something went wrong.')
    } catch { showToast('Network error. Please try WhatsApp or call us.') }
    finally { setLoading(false) }
  }

  const reset = () => {
    setForm({ name:'', contact:'', pickup:'', delivery:'', material:'', weight:'', vehicle:'', date:'', notes:'' })
    setSuccess(false)
  }

  if (success) {
    return (
      <section className="quote-section" id="quote">
        <div className="quote-success-wrap">
          <div className="qs-icon-ring">
            <IconCheck size={36} />
          </div>
          <h2 className="qs-title">Quote Request Sent!</h2>
          <p className="qs-sub">Our team has received your request and will send you a personalised quote within <strong style={{ color: 'var(--orange)' }}>2 hours</strong>.</p>
          <div className="qs-badges">
            {[['From', form.pickup], ['To', form.delivery], ['Material', form.material || 'General Goods'], ['Contact', form.contact]].filter(([, v]) => v).map(([label, value]) => (
              <div className="qs-badge" key={label}>
                <span className="qs-badge-label">{label}</span>
                <span className="qs-badge-value">{value}</span>
              </div>
            ))}
          </div>
          <div className="qs-actions">
            <button className="qs-btn-ghost" onClick={reset}>Submit Another Request</button>
            <a href="https://wa.me/918519000113?text=Hi!%20I%20just%20submitted%20a%20quote%20request%20on%20your%20website." target="_blank" rel="noreferrer" className="qs-btn-wa">
              <svg viewBox="0 0 32 32" width="18" height="18" fill="none"><path d="M16 3C8.82 3 3 8.82 3 16c0 2.3.6 4.47 1.64 6.36L3 29l6.82-1.6A12.93 12.93 0 0 0 16 29c7.18 0 13-5.82 13-13S23.18 3 16 3z" fill="#fff"/><path d="M16 5.2A10.8 10.8 0 0 1 26.8 16 10.8 10.8 0 0 1 16 26.8a10.75 10.75 0 0 1-5.5-1.5l-.4-.24-4.05.95.98-3.93-.26-.42A10.75 10.75 0 0 1 5.2 16 10.8 10.8 0 0 1 16 5.2zm-2.7 5.6c-.2-.44-.4-.46-.59-.47l-.5-.01c-.17 0-.45.06-.69.33-.24.27-.9.88-.9 2.13s.92 2.47 1.05 2.64c.13.17 1.78 2.84 4.4 3.86 2.18.86 2.62.69 3.09.64.47-.04 1.52-.62 1.73-1.22.21-.6.21-1.11.15-1.22-.06-.1-.24-.16-.5-.28-.26-.12-1.52-.75-1.76-.84-.24-.09-.41-.13-.58.13-.17.26-.65.84-.8 1.01-.15.17-.3.19-.55.06-.26-.13-1.08-.4-2.06-1.27-.76-.68-1.28-1.52-1.43-1.78-.15-.26-.02-.4.11-.53.12-.11.26-.3.39-.44.13-.15.17-.26.26-.43.09-.17.04-.32-.02-.44-.06-.12-.57-1.38-.8-1.88z" fill="#25D366"/></svg>
              Follow up on WhatsApp
            </a>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="quote-section" id="quote">
      <div className="quote-layout reveal" ref={ref}>

        {/* Left panel */}
        <div className="quote-left">
          <div className="section-tag" style={{ color: 'rgba(255,255,255,0.55)' }}>Free Quote</div>
          <h2 className="quote-left-title">Get a <em>Custom</em><br />Logistics Quote</h2>
          <p className="quote-left-sub">Tell us about your shipment. Our team will analyse your requirements and send a tailored price within 2 hours.</p>

          <div className="quote-promises">
            {PROMISES.map(({ Icon, title, desc }) => (
              <div className="quote-promise" key={title}>
                <div className="qp-icon"><Icon size={18} /></div>
                <div>
                  <div className="qp-title">{title}</div>
                  <div className="qp-desc">{desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="quote-contact-strip">
            <div className="qcs-label">Prefer to call?</div>
            <div className="qcs-phones">
              <a href="tel:+918519000113" className="qcs-phone">+91 85190 00113</a>
              <span className="qcs-divider">·</span>
              <a href="tel:+919406808500" className="qcs-phone">+91 94068 08500</a>
            </div>
            <div className="qcs-label" style={{ marginTop: 4 }}>Available 24 / 7</div>
          </div>
        </div>

        {/* Right form */}
        <div className="quote-right">
          <div className="qf-section-label">Your Details</div>
          <div className="qf-row">
            <div className="qf-group">
              <label className="qf-label">Full Name <span className="qf-req">*</span></label>
              <input className="qf-input" type="text" placeholder="e.g. Rajesh Kumar" value={form.name} onChange={set('name')} />
            </div>
            <div className="qf-group">
              <label className="qf-label">Phone / Email <span className="qf-req">*</span></label>
              <input className="qf-input" type="text" placeholder="Mobile or email address" value={form.contact} onChange={set('contact')} />
            </div>
          </div>

          <div className="qf-section-label" style={{ marginTop: 24 }}>Shipment Details</div>
          <div className="qf-row">
            <div className="qf-group">
              <label className="qf-label">Pickup Location <span className="qf-req">*</span></label>
              <input className="qf-input" type="text" placeholder="e.g. Mumbai, Maharashtra" value={form.pickup} onChange={set('pickup')} />
            </div>
            <div className="qf-group">
              <label className="qf-label">Delivery Location <span className="qf-req">*</span></label>
              <input className="qf-input" type="text" placeholder="e.g. Delhi, NCR" value={form.delivery} onChange={set('delivery')} />
            </div>
          </div>

          <div className="qf-row" style={{ marginTop: 16 }}>
            <div className="qf-group">
              <label className="qf-label">Material Type</label>
              <select className="qf-input" value={form.material} onChange={set('material')}>
                <option value="">Select material</option>
                {MATERIALS.map(m => <option key={m}>{m}</option>)}
              </select>
            </div>
            <div className="qf-group">
              <label className="qf-label">Vehicle Type</label>
              <select className="qf-input" value={form.vehicle} onChange={set('vehicle')}>
                <option value="">Select vehicle</option>
                {VEHICLES.map(v => <option key={v}>{v}</option>)}
              </select>
            </div>
          </div>

          <div className="qf-row" style={{ marginTop: 16 }}>
            <div className="qf-group">
              <label className="qf-label">Approx. Weight (MT)</label>
              <input className="qf-input" type="number" placeholder="e.g. 5" value={form.weight} onChange={set('weight')} min="0" />
            </div>
            <div className="qf-group">
              <label className="qf-label">Required Date</label>
              <input className="qf-input" type="date" value={form.date} onChange={set('date')} />
            </div>
          </div>

          <div className="qf-group" style={{ marginTop: 16 }}>
            <label className="qf-label">Additional Notes</label>
            <textarea className="qf-input qf-textarea" placeholder="Special requirements, fragile items, loading / unloading needs…" value={form.notes} onChange={set('notes')} />
          </div>

          <button className="qf-submit" onClick={submit} disabled={loading}>
            {loading
              ? <><IconLoader size={18} /> Sending…</>
              : <>Send Quote Request <IconArrowRight size={16} /></>
            }
          </button>
          <p className="qf-footnote">We'll reply to your phone / email with a detailed quote</p>
        </div>

      </div>
    </section>
  )
}
