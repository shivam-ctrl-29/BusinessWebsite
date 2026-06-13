const API_BASE_CONTACT = window.location.origin;

async function submitContact() {
  const name    = document.getElementById('c-name').value.trim();
  const company = document.getElementById('c-company').value.trim();
  const email   = document.getElementById('c-email').value.trim();
  const phone   = document.getElementById('c-phone').value.trim();
  const service = document.getElementById('c-service').value;
  const message = document.getElementById('c-message').value.trim();

  if (!name)            { showToast('⚠️ Please enter your name'); return; }
  if (!email && !phone) { showToast('⚠️ Please enter email or phone'); return; }
  if (!message)         { showToast('⚠️ Please enter your message'); return; }

  const btn = document.getElementById('submitContactBtn');
  btn.textContent = '⏳ Sending...';
  btn.disabled = true;

  try {
    const res = await fetch(`${API_BASE_CONTACT}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, company, email, phone, service, message }),
    });
    const json = await res.json();

    if (json.success) {
      // Clear form
      ['c-name','c-company','c-email','c-phone','c-message'].forEach(id => {
        document.getElementById(id).value = '';
      });
      document.getElementById('c-service').selectedIndex = 0;
      showToast("✓ Enquiry sent! We'll respond within 2 hours.");
    } else {
      // Fallback: open email/WhatsApp chooser if server email fails
      showSendModal(name, company, email, phone, service, message);
    }
  } catch (err) {
    // Offline fallback
    showSendModal(name, company, email, phone, service, message);
  } finally {
    btn.textContent = 'Send Message →';
    btn.disabled = false;
  }
}
window.submitContact = submitContact;

document.getElementById('submitContactBtn').addEventListener('click', submitContact);

function showSendModal(name, company, email, phone, service, message) {
  const subject  = encodeURIComponent(`New Enquiry from ${name} – Shivam Logistics Website`);
  const body     = encodeURIComponent(`Name: ${name}\nCompany: ${company||'N/A'}\nEmail: ${email||'N/A'}\nPhone: ${phone||'N/A'}\nService: ${service||'N/A'}\n\nMessage:\n${message}`);
  const waText   = encodeURIComponent(`📋 *New Website Enquiry*\n\n👤 Name: ${name}\n🏢 Company: ${company||'N/A'}\n📧 Email: ${email||'N/A'}\n📞 Phone: ${phone||'N/A'}\n🚚 Service: ${service||'N/A'}\n\n💬 Message:\n${message}`);
  const mailLink = `mailto:shivamlogistics28@gmail.com?subject=${subject}&body=${body}`;
  const waLink   = `https://wa.me/918519000113?text=${waText}`;

  const overlay = document.createElement('div');
  overlay.id = 'sendModal';
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.72);z-index:3000;display:flex;align-items:center;justify-content:center;padding:20px;backdrop-filter:blur(6px);';
  overlay.innerHTML = `
    <div style="background:var(--card-bg);border-radius:22px;padding:38px 32px;max-width:420px;width:100%;box-shadow:var(--shadow-lg);">
      <div style="text-align:center;margin-bottom:6px;font-size:2.8rem;">✅</div>
      <h3 style="font-family:'Syne',sans-serif;font-size:1.3rem;font-weight:800;text-align:center;color:var(--text);margin-bottom:8px;">Send Your Enquiry</h3>
      <p style="text-align:center;color:var(--text-light);font-size:.9rem;margin-bottom:26px;">Choose how to reach Shivam Logistics:</p>
      <div style="display:flex;flex-direction:column;gap:12px;">
        <a href="${mailLink}" target="_blank" onclick="closeSendModal()" style="display:flex;align-items:center;gap:14px;background:var(--navy);color:#fff;padding:14px 20px;border-radius:12px;text-decoration:none;">
          <span style="font-size:1.5rem;">📧</span>
          <div><div style="font-weight:700;font-size:.95rem;">Send via Email</div><div style="font-size:.78rem;opacity:.65;margin-top:2px;">Opens Gmail / email app pre-filled</div></div>
        </a>
        <a href="${waLink}" target="_blank" onclick="closeSendModal()" style="display:flex;align-items:center;gap:14px;background:#25D366;color:#fff;padding:14px 20px;border-radius:12px;text-decoration:none;">
          <span style="font-size:1.5rem;">💬</span>
          <div><div style="font-weight:700;font-size:.95rem;">Send via WhatsApp</div><div style="font-size:.78rem;opacity:.8;margin-top:2px;">Opens WhatsApp with your message</div></div>
        </a>
        <button onclick="closeSendModal()" style="padding:12px;border-radius:10px;background:var(--light-gray);color:var(--text-light);font-family:'DM Sans',sans-serif;font-size:.9rem;border:none;cursor:pointer;">Cancel</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
}

function closeSendModal() {
  const m = document.getElementById('sendModal');
  if (m) { m.remove(); showToast("Enquiry sent! We'll respond within 2 hours. ✓"); }
}
window.closeSendModal = closeSendModal;
