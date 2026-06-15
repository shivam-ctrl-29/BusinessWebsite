import { useState } from 'react'
import { useReveal } from '../hooks/useReveal'
import { IconArrowRight, IconLoader } from './Icons'

const PhoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.78a16 16 0 0 0 6.29 6.29l1.62-1.62a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
)
const MailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
  </svg>
)
const MapIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
)
const ClockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
)
const WAIcon = () => (
  <svg viewBox="0 0 32 32" width="20" height="20" fill="none">
    <path d="M16 3C8.82 3 3 8.82 3 16c0 2.3.6 4.47 1.64 6.36L3 29l6.82-1.6A12.93 12.93 0 0 0 16 29c7.18 0 13-5.82 13-13S23.18 3 16 3z" fill="#fff"/>
    <path d="M16 5.2A10.8 10.8 0 0 1 26.8 16 10.8 10.8 0 0 1 16 26.8a10.75 10.75 0 0 1-5.5-1.5l-.4-.24-4.05.95.98-3.93-.26-.42A10.75 10.75 0 0 1 5.2 16 10.8 10.8 0 0 1 16 5.2zm-2.7 5.6c-.2-.44-.4-.46-.59-.47l-.5-.01c-.17 0-.45.06-.69.33-.24.27-.9.88-.9 2.13s.92 2.47 1.05 2.64c.13.17 1.78 2.84 4.4 3.86 2.18.86 2.62.69 3.09.64.47-.04 1.52-.62 1.73-1.22.21-.6.21-1.11.15-1.22-.06-.1-.24-.16-.5-.28-.26-.12-1.52-.75-1.76-.84-.24-.09-.41-.13-.58.13-.17.26-.65.84-.8 1.01-.15.17-.3.19-.55.06-.26-.13-1.08-.4-2.06-1.27-.76-.68-1.28-1.52-1.43-1.78-.15-.26-.02-.4.11-.53.12-.11.26-.3.39-.44.13-.15.17-.26.26-.43.09-.17.04-.32-.02-.44-.06-.12-.57-1.38-.8-1.88z" fill="#25D366"/>
  </svg>
)

const INFO = [
  { Icon: PhoneIcon, label: 'Phone', value: (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <a href="tel:+918519000113" className="ct-link">+91 85190 00113</a>
      <a href="tel:+919406808500" className="ct-link">+91 94068 08500</a>
    </div>
  )},
  { Icon: MailIcon,  label: 'Email',       value: <a href="mailto:shivamlogistics28@gmail.com" className="ct-link">shivamlogistics28@gmail.com</a> },
  { Icon: MapIcon,   label: 'Head Office', value: '85, Avantika Nagar, Indore – 452006, Madhya Pradesh' },
  { Icon: ClockIcon, label: 'Hours',       value: '24 / 7 Operations · Mon – Sun' },
]

const SERVICES = ['Full Truck Load (FTL)', 'Part Truck Load (PTL)', 'Heavy Equipment Transport', 'Other']

export default function Contact({ showToast }) {
  const ref = useReveal()
  const [form, setForm] = useState({ name:'', company:'', email:'', phone:'', service:'', message:'' })
  const [loading, setLoading] = useState(false)
  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  const submit = async () => {
    if (!form.name)                 { showToast('Please enter your name'); return }
    if (!form.email && !form.phone) { showToast('Please enter email or phone'); return }
    if (!form.message)              { showToast('Please enter your message'); return }
    setLoading(true)
    try {
      const res  = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      const json = await res.json()
      if (json.success) {
        setForm({ name:'', company:'', email:'', phone:'', service:'', message:'' })
        showToast("Enquiry sent! We'll respond within 2 hours.")
      } else {
        showToast(json.error || 'Failed. Please try WhatsApp.')
      }
    } catch { showToast('Network error. Please try WhatsApp or call us.') }
    finally { setLoading(false) }
  }

  return (
    <section className="contact-section" id="contact">
      <div className="contact-layout reveal" ref={ref}>

        {/* Left dark panel */}
        <div className="ct-left">
          <div className="section-tag" style={{ color: 'rgba(255,255,255,0.5)' }}>Get In Touch</div>
          <h2 className="ct-title">Let's Move <em>Smarter</em><br />Together</h2>
          <p className="ct-sub">Have a shipment in mind? Reach out and our logistics experts will get back to you within 2 hours.</p>

          <div className="ct-info-list">
            {INFO.map(({ Icon, label, value }) => (
              <div className="ct-info-item" key={label}>
                <div className="ct-info-icon"><Icon /></div>
                <div>
                  <div className="ct-info-label">{label}</div>
                  <div className="ct-info-value">{value}</div>
                </div>
              </div>
            ))}
          </div>

          <a
            href="https://wa.me/918519000113?text=Hello%20Shivam%20Logistics!%20I%20have%20a%20logistics%20enquiry."
            className="ct-wa-btn"
            target="_blank"
            rel="noreferrer"
          >
            <WAIcon /> Chat on WhatsApp
          </a>
        </div>

        {/* Right form */}
        <div className="ct-right">
          <div className="ct-form-header">
            <h3 className="ct-form-title">Send us a message</h3>
            <p className="ct-form-sub">We respond to every enquiry within 2 business hours.</p>
          </div>

          <div className="ct-row">
            <div className="ct-group">
              <label className="ct-label" htmlFor="ct-name">Full Name <span className="ct-req">*</span></label>
              <input id="ct-name" className="ct-input" type="text" placeholder="e.g. Rajesh Kumar" value={form.name} onChange={set('name')} />
            </div>
            <div className="ct-group">
              <label className="ct-label" htmlFor="ct-company">Company Name</label>
              <input id="ct-company" className="ct-input" type="text" placeholder="Your company (optional)" value={form.company} onChange={set('company')} />
            </div>
          </div>

          <div className="ct-row" style={{ marginTop: 16 }}>
            <div className="ct-group">
              <label className="ct-label" htmlFor="ct-email">Email Address</label>
              <input id="ct-email" className="ct-input" type="email" placeholder="you@company.com" value={form.email} onChange={set('email')} />
            </div>
            <div className="ct-group">
              <label className="ct-label" htmlFor="ct-phone">Phone Number</label>
              <input id="ct-phone" className="ct-input" type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={set('phone')} />
            </div>
          </div>

          <div className="ct-group" style={{ marginTop: 16 }}>
            <label className="ct-label" htmlFor="ct-service">Service Required</label>
            <select id="ct-service" className="ct-input" value={form.service} onChange={set('service')}>
              <option value="">Select a service</option>
              {SERVICES.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>

          <div className="ct-group" style={{ marginTop: 16 }}>
            <label className="ct-label" htmlFor="ct-message">Your Message <span className="ct-req">*</span></label>
            <textarea id="ct-message" className="ct-input ct-textarea" placeholder="Tell us about your logistics requirements, route, cargo type, timeline…" value={form.message} onChange={set('message')} />
          </div>

          <button className="ct-submit" onClick={submit} disabled={loading}>
            {loading
              ? <><IconLoader size={18} /> Sending…</>
              : <>Send Message <IconArrowRight size={16} /></>
            }
          </button>
        </div>

      </div>
    </section>
  )
}
