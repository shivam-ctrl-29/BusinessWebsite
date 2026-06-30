import { useState, useRef, useEffect, useCallback } from 'react'
import { IconBot, IconX, IconSend } from './Icons'

// ── Security limits ──────────────────────────────────────────────
const MAX_INPUT_LEN = 300       // hard cap on a single message
const MAX_HISTORY = 60          // cap stored messages to bound memory growth
const FETCH_TIMEOUT_MS = 8000   // abort hung network calls
const TRACKING_ID_RE = /^[A-Za-z0-9-]{5,20}$/

// ── Knowledge base — scored multi-keyword intents ──────────────────
const INTENTS = [
  {
    id: 'greeting',
    keywords: ['hi', 'hello', 'hey', 'namaste', 'good morning', 'good afternoon', 'good evening'],
    response: "Hello! 👋 I'm Shivu, your logistics assistant. I can help with tracking, quotes, our fleet, branches, and more. What would you like to know?",
    quickReplies: ['Track my shipment', 'Get a quote', 'Our services'],
  },
  {
    id: 'thanks',
    keywords: ['thank', 'thanks', 'thx', 'appreciate'],
    response: "You're welcome! Is there anything else I can help you with?",
    quickReplies: ['Contact a human', 'Our fleet'],
  },
  {
    id: 'bye',
    keywords: ['bye', 'goodbye', 'see you', 'later'],
    response: 'Thanks for chatting! Reach out anytime — we\'re available 24/7 on WhatsApp or phone.',
  },
  {
    id: 'capabilities',
    keywords: ['what can you do', 'help me', 'who are you', 'what are you'],
    response: "I can help you with: live shipment tracking, getting a quote, info about our fleet & vehicles, our branch locations, pricing, our 3 services (FTL/PTL/Heavy Equipment Transport), and connecting you to our team. Just ask!",
    quickReplies: ['Track my shipment', 'Our fleet', 'Get a quote'],
  },
  {
    id: 'quote',
    keywords: ['quote', 'price', 'cost', 'rate', 'charge', 'estimate', 'how much'],
    response: "I'd be happy to help with pricing! Pricing depends on route, weight, and vehicle type. Use our 'Get Instant Quote' form below — our team replies within 2 hours with a custom price. Want me to scroll you there?",
    quickReplies: ['Take me to Get Quote'],
    action: 'scroll:quote',
  },
  {
    id: 'ftl',
    keywords: ['ftl', 'full truck', 'full load', 'exclusive truck'],
    response: 'Full Truck Load (FTL) gives you an exclusive truck with direct delivery — no consolidation with other shipments. Best for manufacturing, retail, and FMCG bulk loads.',
  },
  {
    id: 'ptl',
    keywords: ['ptl', 'part truck', 'part load', 'shared truck', 'small load'],
    response: 'Part Truck Load (PTL) lets you pay only for the space you use. We consolidate multiple shipments for cost efficiency — great for smaller loads.',
  },
  {
    id: 'heavy',
    keywords: ['heavy equipment', 'heavy machinery', 'oversized', 'odc', 'crane transport', 'machinery transport'],
    response: 'Heavy Equipment Transport handles oversized and heavy machinery, industrial equipment, and ODC (over-dimensional cargo) — using our Hydra Crane, JCB/Excavator, and specialized trailers, with permit handling and police escort where required.',
  },
  {
    id: 'fleet',
    keywords: ['fleet', 'vehicle', 'truck type', 'trailer', 'hydra', 'crane', 'jcb', 'excavator', 'eicher'],
    response: 'Our fleet includes: 32-Ft Open Trailer (9 MT), 40-Ft Open Trailer (15–18 MT), Hydra Crane (12 MT lift), JCB/Excavator, and Eicher Truck (7 MT) — all GPS-enabled. Check the Fleet section for full specs and photos.',
    quickReplies: ['Show me the Fleet section'],
    action: 'scroll:fleet',
  },
  {
    id: 'branches',
    keywords: ['branch', 'location', 'office', 'where are you', 'indore', 'jamshedpur', 'address'],
    response: 'We have offices in Indore (Head Office, Madhya Pradesh) and Jamshedpur (Jharkhand), with delivery coverage across 28+ states pan-India.',
    quickReplies: ['Show branch network'],
    action: 'scroll:branches',
  },
  {
    id: 'hours',
    keywords: ['hours', '24/7', 'open', 'available', 'timing', 'operating'],
    response: "We operate 24/7 — our operations desk and WhatsApp support are available round the clock, every day of the week.",
  },
  {
    id: 'insurance',
    keywords: ['insur', 'damage', 'safe', 'security', 'protect', 'lost'],
    response: 'All shipments are fully insured against loss, damage, or theft throughout transit. We are also ISO 9001:2015 certified for quality management.',
  },
  {
    id: 'experience',
    keywords: ['how long', 'years', 'experience', 'since when', 'established', 'founded'],
    response: "We've been in business since 2009 — that's 15+ years of logistics excellence, with 50,000+ successful deliveries and 200+ regular clients.",
  },
  {
    id: 'reviews',
    keywords: ['review', 'rating', 'feedback', 'testimonial'],
    response: 'We have a 4.9/5 rating from 340+ verified Google reviews. Check out the Client Reviews section to read real feedback from our customers.',
    quickReplies: ['Show reviews'],
    action: 'scroll:reviews',
  },
  {
    id: 'brochure',
    keywords: ['brochure', 'pdf', 'catalogue', 'catalog', 'company profile'],
    response: 'You can download our company brochure (PDF) right from the homepage — look for the "Download Company Brochure" link near the top, or check the footer.',
  },
  {
    id: 'services',
    keywords: ['service', 'what do you offer', 'offerings'],
    response: 'We offer 3 core services: Full Truck Load (FTL), Part Truck Load (PTL), and Heavy Equipment Transport. Which one would you like to know more about?',
    quickReplies: ['Show all services'],
    action: 'scroll:services',
  },
  {
    id: 'contact',
    keywords: ['contact', 'phone', 'email', 'call', 'whatsapp', 'number', 'reach you'],
    response: 'You can reach us at +91 85190 00113 / +91 94068 08500, email shivamlogistics28@gmail.com, or WhatsApp us directly — our team is available 24/7!',
    quickReplies: ['Open WhatsApp'],
    action: 'whatsapp',
  },
]

function escapeForDisplay(str) {
  // Strips control characters that could mess with rendering/copy-paste,
  // even though React already escapes HTML by default in text nodes.
  return Array.from(str).filter(ch => {
    const code = ch.codePointAt(0)
    return !(code <= 0x1F || code === 0x7F)
  }).join('')
}

function scoreIntent(msg) {
  const m = msg.toLowerCase()
  let best = null
  let bestScore = 0
  for (const intent of INTENTS) {
    let score = 0
    for (const kw of intent.keywords) {
      if (m.includes(kw)) score += kw.includes(' ') ? 2 : 1 // multi-word matches weigh more
    }
    if (score > bestScore) { bestScore = score; best = intent }
  }
  return bestScore > 0 ? best : null
}

function runAction(action) {
  if (action === 'whatsapp') {
    window.open('https://wa.me/918519000113', '_blank', 'noopener,noreferrer')
    return
  }
  if (action?.startsWith('scroll:')) {
    const id = action.split(':')[1]
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }
}

async function lookupTracking(id) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)
  try {
    const res = await fetch(`/api/track/${encodeURIComponent(id)}`, { signal: controller.signal })
    const json = await res.json()
    if (json.success) {
      const d = json.data
      return `📦 Shipment ${d.trackingId}: currently "${d.status}" on route ${d.route}. ETA: ${d.eta}.`
    }
    return `I couldn't find a shipment with that ID. Please double-check the tracking number and try again, or use the Track Shipment section above.`
  } catch {
    return "I'm having trouble reaching the tracking service right now. Please try the Track Shipment section above, or contact us directly."
  } finally {
    clearTimeout(timeout)
  }
}

function getResponse(rawMsg) {
  const msg = rawMsg.trim()
  if (TRACKING_ID_RE.test(msg) && /\d/.test(msg)) {
    return { type: 'tracking', id: msg }
  }
  const intent = scoreIntent(msg)
  if (intent) return { type: 'intent', intent }
  return {
    type: 'text',
    text: "Thanks for your message! I can help with tracking, quotes, our fleet, branches, services, and more. Try asking something like \"How do I get a quote?\" or paste your tracking number directly.",
    quickReplies: ['Track my shipment', 'Get a quote', 'Contact a human'],
  }
}

const QUICK_REPLY_INTENT = {
  'Track my shipment': 'track',
  'Get a quote': 'quote',
  'Our services': 'services',
  'Our fleet': 'fleet',
  'Contact a human': 'contact',
  'Take me to Get Quote': 'quote',
  'Show me the Fleet section': 'fleet',
  'Show branch network': 'branches',
  'Show reviews': 'reviews',
  'Show all services': 'services',
  'Open WhatsApp': 'contact',
}

export default function AiChat() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([{
    type: 'bot',
    text: "Hello! I'm Shivu, your logistics assistant. I can help with tracking, quotes, services, and more. What can I help you with today?",
    quickReplies: ['Track my shipment', 'Get a quote', 'Our services'],
  }])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [busy, setBusy] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages, typing])

  const pushMessage = useCallback((msg) => {
    setMessages(prev => {
      const next = [...prev, msg]
      // Cap history so a long session never grows memory unbounded
      return next.length > MAX_HISTORY ? next.slice(next.length - MAX_HISTORY) : next
    })
  }, [])

  const handleBotReply = useCallback(async (userText) => {
    const result = getResponse(userText)

    if (result.type === 'tracking') {
      const text = await lookupTracking(result.id)
      pushMessage({ type: 'bot', text })
      return
    }

    if (result.type === 'intent') {
      const { intent } = result
      pushMessage({ type: 'bot', text: intent.response, quickReplies: intent.quickReplies, action: intent.action })
      if (intent.action) runAction(intent.action)
      return
    }

    pushMessage({ type: 'bot', text: result.text, quickReplies: result.quickReplies })
  }, [pushMessage])

  const send = useCallback(async (overrideText) => {
    const raw = (overrideText ?? input)
    const trimmed = escapeForDisplay(raw).trim().slice(0, MAX_INPUT_LEN)
    if (!trimmed || busy) return

    setInput('')
    pushMessage({ type: 'user', text: trimmed })
    setTyping(true)
    setBusy(true)

    // Resolve quick-reply labels to their underlying intent for consistent answers
    const resolvedKeywordTarget = QUICK_REPLY_INTENT[trimmed]
    const queryForMatching = resolvedKeywordTarget
      ? INTENTS.find(i => i.id === resolvedKeywordTarget)?.keywords[0] || trimmed
      : trimmed

    const delay = 500 + Math.min(trimmed.length * 12, 900)
    setTimeout(async () => {
      await handleBotReply(queryForMatching)
      setTyping(false)
      setBusy(false)
    }, delay)
  }, [input, busy, pushMessage, handleBotReply])

  const onQuickReply = (label) => {
    send(label)
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
              <div key={i}>
                <div className={`ai-msg ${m.type}`}>{m.text}</div>
                {m.type === 'bot' && m.quickReplies && m.quickReplies.length > 0 && (
                  <div className="ai-quick-replies">
                    {m.quickReplies.map(qr => (
                      <button key={qr} className="ai-quick-reply" onClick={() => onQuickReply(qr)} disabled={busy}>
                        {qr}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {typing && (
              <div className="ai-typing">
                <div className="ai-dot" /><div className="ai-dot" /><div className="ai-dot" />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="ai-input-area">
            <input
              className="ai-input"
              value={input}
              maxLength={MAX_INPUT_LEN}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !busy && send()}
              placeholder="Ask me anything..."
              disabled={busy}
              aria-label="Chat message"
            />
            <button className="ai-send" onClick={() => send()} aria-label="Send message" disabled={busy || !input.trim()}>
              <IconSend size={15} />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
