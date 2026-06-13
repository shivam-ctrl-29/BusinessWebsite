const aiResponses = {
  track:   "You can track your shipment by entering your tracking number (e.g. SL2024001234) in the tracking section at the top of this page.",
  quote:   "Use our Instant Quote form — scroll down to 'Get Instant Quote'. Fill in pickup/delivery locations, weight, and vehicle type for instant pricing.",
  ftl:     "Full Truck Load (FTL) is ideal for large shipments. You get an exclusive truck with direct delivery — no consolidation. Best for manufacturing, retail, and FMCG.",
  ptl:     "Part Truck Load (PTL) lets you pay only for the space you use. Great for smaller loads — we consolidate multiple shipments for cost efficiency.",
  cold:    "Our cold chain logistics maintain temperatures from -20°C to +20°C with IoT monitoring. We're GDP compliant and serve pharma, dairy, and food industries.",
  service: "We offer 8 core services: FTL, PTL, Express Cargo, Dedicated Fleet, Container Transport, Heavy Equipment, Temperature-Controlled Logistics, and Last Mile Delivery. Which interests you?",
  contact: "You can reach us at +91 85190 00113, email shivamlogistics28@gmail.com, or WhatsApp us directly. Our team is available 24/7!",
  price:   "Pricing depends on route, weight, and vehicle type. Use our Instant Quote calculator for an estimate, or contact our sales team for a custom rate card.",
  default: "Thank you for your query! I'm here to help with tracking, quotes, services, and more. Could you tell me more about what you need?",
};

function getAiResponse(msg) {
  const lm = msg.toLowerCase();
  if (lm.includes('track'))                              return aiResponses.track;
  if (lm.includes('quote') || lm.includes('price') || lm.includes('cost')) return aiResponses.price;
  if (lm.includes('ftl') || lm.includes('full truck'))  return aiResponses.ftl;
  if (lm.includes('ptl') || lm.includes('part truck'))  return aiResponses.ptl;
  if (lm.includes('cold') || lm.includes('refrig') || lm.includes('temp')) return aiResponses.cold;
  if (lm.includes('service'))                            return aiResponses.service;
  if (lm.includes('contact') || lm.includes('phone') || lm.includes('email')) return aiResponses.contact;
  return aiResponses.default;
}

function sendAiMsg() {
  const input = document.getElementById('aiInput');
  const msg = input.value.trim();
  if (!msg) return;

  const msgs = document.getElementById('aiMessages');
  msgs.innerHTML += `<div class="ai-msg user">${msg}</div>`;
  input.value = '';
  msgs.innerHTML += `<div class="ai-typing"><div class="ai-dot"></div><div class="ai-dot"></div><div class="ai-dot"></div></div>`;
  msgs.scrollTop = msgs.scrollHeight;

  setTimeout(() => {
    msgs.querySelector('.ai-typing').remove();
    msgs.innerHTML += `<div class="ai-msg bot">${getAiResponse(msg)}</div>`;
    msgs.scrollTop = msgs.scrollHeight;
  }, 1200);
}
window.sendAiMsg = sendAiMsg;

document.getElementById('aiChatBtn').addEventListener('click', () => {
  document.getElementById('aiChatBox').classList.toggle('open');
});
document.getElementById('aiClose').addEventListener('click', () => {
  document.getElementById('aiChatBox').classList.remove('open');
});
document.getElementById('aiSendBtn').addEventListener('click', sendAiMsg);
document.getElementById('aiInput').addEventListener('keydown', e => {
  if (e.key === 'Enter') sendAiMsg();
});
