import { useState } from 'react'
import { useReveal } from '../hooks/useReveal'

export default function Contact({ showToast }) {
  const ref = useReveal()
  const [form, setForm] = useState({ name:'', company:'', email:'', phone:'', service:'Select Service Required', message:'' })
  const [loading, setLoading] = useState(false)
  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  const submit = async () => {
    if (!form.name)                   { showToast('⚠️ Please enter your name'); return }
    if (!form.email && !form.phone)   { showToast('⚠️ Please enter email or phone'); return }
    if (!form.message)                { showToast('⚠️ Please enter your message'); return }
    setLoading(true)
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      const json = await res.json()
      if (json.success) {
        setForm({ name:'', company:'', email:'', phone:'', service:'Select Service Required', message:'' })
        showToast("✓ Enquiry sent! We'll respond within 2 hours.")
      } else {
        showToast('⚠️ ' + (json.error || 'Failed. Please try WhatsApp.'))
      }
    } catch { showToast('Network error. Please try WhatsApp or call us directly.') }
    finally { setLoading(false) }
  }

  return (
    <section className="contact-section" id="contact">
      <div className="section-tag">Get In Touch</div>
      <h2 className="section-title">Let's Move <em>Smarter</em><br />Together</h2>
      <div className="contact-grid reveal" ref={ref}>
        <div className="contact-info">
          {[
            { icon: '📞', label: 'Phone',       value: <a href="tel:+918519000113" style={{ color: 'inherit' }}>+91 85190 00113</a> },
            { icon: '✉️', label: 'Email',       value: <a href="mailto:shivamlogistics28@gmail.com" style={{ color: 'inherit' }}>shivamlogistics28@gmail.com</a> },
            { icon: '🏢', label: 'Head Office', value: '85, Avantika Nagar, Indore – 452006, Madhya Pradesh' },
            { icon: '⏰', label: 'Hours',       value: '24/7 Operations · Mon–Sun' },
          ].map(({ icon, label, value }) => (
            <div className="contact-item" key={label}>
              <div className="contact-icon">{icon}</div>
              <div>
                <div className="contact-label">{label}</div>
                <div className="contact-value">{value}</div>
              </div>
            </div>
          ))}
          <a href="https://wa.me/918519000113?text=Hello%20Shivam%20Logistics!%20I%20have%20a%20logistics%20enquiry." className="whatsapp-btn" target="_blank" rel="noreferrer">
            💬 Chat on WhatsApp
          </a>
        </div>

        <div className="contact-form-card">
          <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: '1.3rem', fontWeight: 800, marginBottom: 24, color: 'var(--text)' }}>Send us a message</h3>
          <div className="contact-form-grid">
            <input className="contact-input" placeholder="Your Name"     value={form.name}    onChange={set('name')} />
            <input className="contact-input" placeholder="Company Name"  value={form.company} onChange={set('company')} />
            <input className="contact-input" placeholder="Email Address" value={form.email}   onChange={set('email')} type="email" />
            <input className="contact-input" placeholder="Phone Number"  value={form.phone}   onChange={set('phone')} type="tel" />
          </div>
          <select className="contact-input" style={{ width: '100%', marginBottom: 16 }} value={form.service} onChange={set('service')}>
            <option>Select Service Required</option>
            {['Full Truck Load (FTL)','Part Truck Load (PTL)','Express Cargo','Cold Chain Logistics','Other'].map(s => <option key={s}>{s}</option>)}
          </select>
          <textarea className="contact-input" placeholder="Tell us about your logistics requirements..." value={form.message} onChange={set('message')} style={{ marginBottom: 20 }} />
          <button className="btn-primary" onClick={submit} disabled={loading} style={{ width: '100%', justifyContent: 'center' }}>
            {loading ? '⏳ Sending...' : 'Send Message →'}
          </button>
        </div>
      </div>
    </section>
  )
}
