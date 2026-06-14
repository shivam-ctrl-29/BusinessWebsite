import { IconWhatsApp, IconChevronUp } from './Icons'

export default function FloatingButtons() {
  return (
    <div className="floating-btns">
      <button className="fab fab-whatsapp" title="Chat on WhatsApp" aria-label="Chat on WhatsApp"
        onClick={() => window.open('https://wa.me/918519000113?text=Hello%20Shivam%20Logistics!%20I%20have%20a%20logistics%20enquiry.', '_blank')}>
        <IconWhatsApp />
      </button>
      <button className="fab fab-top" title="Back to top" aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <IconChevronUp size={20} />
      </button>
    </div>
  )
}
