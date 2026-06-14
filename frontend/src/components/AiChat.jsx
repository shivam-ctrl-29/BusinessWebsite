import { useState, useRef, useEffect } from 'react'
import { IconBot, IconX, IconSend } from './Icons'

const RESPONSES = {
  track:   "You can track your shipment by entering your tracking number (e.g. SL2024001234) in the tracking section at the top of this page.",
  quote:   "Use our Request a Quote form — scroll down to 'Get Instant Quote'. Fill in your details for a personalised quote within 2 hours.",
  ftl:     "Full Truck Load (FTL) is ideal for large shipments. You get an exclusive truck with direct delivery — no consolidation. Best for manufacturing, retail, and FMCG.",
  ptl:     "Part Truck Load (PTL) lets you pay only for the space you use. Great for smaller loads — we consolidate multiple shipments for cost efficiency.",
  cold:    "Our cold chain logistics maintain temperatures from -20°C to +20°C with IoT monitoring. We're GDP compliant and serve pharma, dairy, and food industries.",
  service: "We offer 8 core services: FTL, PTL, Express Cargo, Dedicated Fleet, Container Transport, Heavy Equipment, Temperature-Controlled Logistics, and Last Mile Delivery. Which interests you?",
  contact: "You can reach us at +91 85190 00113, email shivamlogistics28@gmail.com, or WhatsApp us directly. Our team is available 24/7!",
  price:   "Pricing depends on route, weight, and vehicle type. Use our Request a Quote form for a custom price, or contact our sales team directly.",
  default: "Thank you for your query! I'm here to help with tracking, quotes, services, and more. What can I help you with?",
}

function getResponse(msg) {
  const m = msg.toLowerCase()
  if (m.includes('track'))                                              return RESPONSES.track
  if (m.includes('quote') || m.includes('price') || m.includes('cost')) return RESPONSES.price
  if (m.includes('ftl') || m.includes('full truck'))                    return RESPONSES.ftl
  if (m.includes('ptl') || m.includes('part truck'))                    return RESPONSES.ptl
  if (m.includes('cold') || m.includes('refrig') || m.includes('temp')) return RESPONSES.cold
  if (m.includes('service'))                                            return RESPONSES.service
  if (m.includes('contact') || m.includes('phone') || m.includes('email')) return RESPONSES.contact
  return RESPONSES.default
}

export default function AiChat() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([{ type: 'bot', text: "Hello! I'm Shivu, your logistics assistant. I can help with tracking, quotes, services, and more. What can I help you with today?" }])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages, typing])

  const send = () => {
    if (!input.trim()) return
    const userMsg = input.trim()
    setMessages(m => [...m, { type: 'user', text: userMsg }])
    setInput('')
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      setMessages(m => [...m, { type: 'bot', text: getResponse(userMsg) }])
    }, 1200)
  }

  return (
    <>
      <button className="ai-chat-btn" onClick={() => setOpen(o => !o)} title="AI Assistant" aria-label="Open AI Assistant">
        <IconBot size={26} />
      </button>
      {open && (
        <div className="ai-chat-box">
          <div className="ai-chat-header">
            <div className="ai-chat-header-left">
              <div className="ai-bot-icon"><IconBot size={20} /></div>
              <div>
                <div className="ai-bot-name">Shivu AI</div>
                <div className="ai-bot-status">● Online · Logistics Assistant</div>
              </div>
            </div>
            <button className="ai-close-btn" onClick={() => setOpen(false)} aria-label="Close chat">
              <IconX size={16} />
            </button>
          </div>
          <div className="ai-messages">
            {messages.map((m, i) => (
              <div key={i} className={`ai-msg ${m.type}`}>{m.text}</div>
            ))}
            {typing && (
              <div className="ai-typing">
                <div className="ai-dot" /><div className="ai-dot" /><div className="ai-dot" />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="ai-input-area">
            <input className="ai-input" value={input} onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()} placeholder="Ask me anything..." />
            <button className="ai-send" onClick={send} aria-label="Send message">
              <IconSend size={15} />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
