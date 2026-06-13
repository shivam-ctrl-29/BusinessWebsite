function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 32 32" width="26" height="26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 3C8.82 3 3 8.82 3 16c0 2.3.6 4.47 1.64 6.36L3 29l6.82-1.6A12.93 12.93 0 0 0 16 29c7.18 0 13-5.82 13-13S23.18 3 16 3z" fill="#fff"/>
      <path d="M16 5.2A10.8 10.8 0 0 1 26.8 16 10.8 10.8 0 0 1 16 26.8a10.75 10.75 0 0 1-5.5-1.5l-.4-.24-4.05.95.98-3.93-.26-.42A10.75 10.75 0 0 1 5.2 16 10.8 10.8 0 0 1 16 5.2zm-2.7 5.6c-.2-.44-.4-.46-.59-.47l-.5-.01c-.17 0-.45.06-.69.33-.24.27-.9.88-.9 2.13s.92 2.47 1.05 2.64c.13.17 1.78 2.84 4.4 3.86 2.18.86 2.62.69 3.09.64.47-.04 1.52-.62 1.73-1.22.21-.6.21-1.11.15-1.22-.06-.1-.24-.16-.5-.28-.26-.12-1.52-.75-1.76-.84-.24-.09-.41-.13-.58.13-.17.26-.65.84-.8 1.01-.15.17-.3.19-.55.06-.26-.13-1.08-.4-2.06-1.27-.76-.68-1.28-1.52-1.43-1.78-.15-.26-.02-.4.11-.53.12-.11.26-.3.39-.44.13-.15.17-.26.26-.43.09-.17.04-.32-.02-.44-.06-.12-.57-1.38-.8-1.88z" fill="#25D366"/>
    </svg>
  )
}

export default function FloatingButtons() {
  return (
    <div className="floating-btns">
      <button className="fab fab-whatsapp" title="WhatsApp"
        onClick={() => window.open('https://wa.me/918519000113?text=Hello%20Shivam%20Logistics!%20I%20have%20a%20logistics%20enquiry.', '_blank')}>
        <WhatsAppIcon />
      </button>
      <button className="fab fab-top" title="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        ↑
      </button>
    </div>
  )
}
