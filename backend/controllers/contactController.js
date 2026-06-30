const nodemailer = require('nodemailer');
const validator = require('validator');
const { escapeHtml, sanitizeHeaderValue, truncate } = require('../utils/sanitize');

const MAX_LEN = { name: 100, company: 100, message: 2000, phone: 30 };

async function sendContactEmail(req, res) {
  let { name, company, email, phone, service, message } = req.body || {};

  // ── Validate ──────────────────────────────────────────────────
  if (typeof name !== 'string' || !name.trim()) {
    return res.status(400).json({ success: false, error: 'Name is required' });
  }
  if ((!email || !email.trim()) && (!phone || !phone.trim())) {
    return res.status(400).json({ success: false, error: 'Email or phone is required' });
  }
  if (typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({ success: false, error: 'Message is required' });
  }
  if (email && !validator.isEmail(email)) {
    return res.status(400).json({ success: false, error: 'Please enter a valid email address' });
  }
  if (phone && !validator.isMobilePhone(phone.replace(/[\s\-()]/g, ''), 'any')) {
    return res.status(400).json({ success: false, error: 'Please enter a valid phone number' });
  }

  // ── Sanitize / truncate before they ever touch the email ───────
  name = sanitizeHeaderValue(truncate(name, MAX_LEN.name));
  company = sanitizeHeaderValue(truncate(company, MAX_LEN.company));
  phone = sanitizeHeaderValue(truncate(phone, MAX_LEN.phone));
  message = truncate(message, MAX_LEN.message);

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const safeName = escapeHtml(name);
    const safeCompany = escapeHtml(company);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone);
    const safeService = escapeHtml(service);
    const safeMessage = escapeHtml(message).replace(/\n/g, '<br>');

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,
      subject: `New Enquiry from ${name} – Shivam Logistics Website`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
          <h2 style="color:#0B1F3A;border-bottom:3px solid #1A6FE8;padding-bottom:10px;">
            New Website Enquiry
          </h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px;color:#666;width:140px;">Name</td><td style="padding:8px;font-weight:600;">${safeName}</td></tr>
            <tr style="background:#f9f9f9;"><td style="padding:8px;color:#666;">Company</td><td style="padding:8px;">${safeCompany || 'N/A'}</td></tr>
            <tr><td style="padding:8px;color:#666;">Email</td><td style="padding:8px;">${safeEmail || 'N/A'}</td></tr>
            <tr style="background:#f9f9f9;"><td style="padding:8px;color:#666;">Phone</td><td style="padding:8px;">${safePhone || 'N/A'}</td></tr>
            <tr><td style="padding:8px;color:#666;">Service</td><td style="padding:8px;">${safeService || 'N/A'}</td></tr>
          </table>
          <div style="margin-top:16px;background:#f4f6fa;padding:16px;border-radius:8px;border-left:4px solid #1A6FE8;">
            <strong>Message:</strong><br/><br/>
            ${safeMessage}
          </div>
          <p style="margin-top:20px;font-size:12px;color:#aaa;">Sent from Shivam Logistics website</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "Enquiry sent! We'll respond within 2 hours." });
  } catch (err) {
    console.error('Email error:', err.message);
    res.status(500).json({ success: false, error: 'Failed to send email. Please try WhatsApp or call directly.' });
  }
}

module.exports = { sendContactEmail };
