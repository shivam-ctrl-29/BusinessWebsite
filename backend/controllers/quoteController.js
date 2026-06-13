const nodemailer = require('nodemailer');

async function calculateQuote(req, res) {
  const { name, contact, pickup, delivery, material, weight, vehicle, date, notes } = req.body;

  if (!name)     return res.status(400).json({ success: false, error: 'Name is required' });
  if (!contact)  return res.status(400).json({ success: false, error: 'Phone or email is required' });
  if (!pickup)   return res.status(400).json({ success: false, error: 'Pickup location is required' });
  if (!delivery) return res.status(400).json({ success: false, error: 'Delivery location is required' });

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,
      subject: `📦 New Quote Request from ${name} – Shivam Logistics`,
      html: `
        <div style="font-family:sans-serif;max-width:640px;margin:0 auto;background:#f4f6fa;padding:24px;border-radius:12px;">

          <!-- Header -->
          <div style="background:linear-gradient(135deg,#0B1F3A,#0d3060);border-radius:10px;padding:28px 32px;margin-bottom:24px;text-align:center;">
            <div style="font-size:2rem;margin-bottom:8px;">📦</div>
            <h2 style="color:#fff;font-size:1.4rem;margin:0;">New Quote Request</h2>
            <p style="color:rgba(255,255,255,0.6);margin:6px 0 0;font-size:.9rem;">Shivam Logistics Website</p>
          </div>

          <!-- Customer info -->
          <div style="background:#fff;border-radius:10px;padding:24px;margin-bottom:16px;border-left:4px solid #FF6B00;">
            <h3 style="color:#0B1F3A;font-size:1rem;margin:0 0 16px;text-transform:uppercase;letter-spacing:.5px;">Customer Details</h3>
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:7px 0;color:#8492A6;width:130px;font-size:.9rem;">Name</td><td style="padding:7px 0;font-weight:700;color:#0B1F3A;font-size:.9rem;">${name}</td></tr>
              <tr><td style="padding:7px 0;color:#8492A6;font-size:.9rem;">Contact</td><td style="padding:7px 0;font-weight:700;color:#FF6B00;font-size:.9rem;">${contact}</td></tr>
            </table>
          </div>

          <!-- Shipment details -->
          <div style="background:#fff;border-radius:10px;padding:24px;margin-bottom:16px;">
            <h3 style="color:#0B1F3A;font-size:1rem;margin:0 0 16px;text-transform:uppercase;letter-spacing:.5px;">Shipment Details</h3>
            <table style="width:100%;border-collapse:collapse;">
              <tr style="background:#f9f9f9;"><td style="padding:9px 12px;color:#8492A6;font-size:.88rem;border-radius:4px;">📍 Pickup</td><td style="padding:9px 12px;font-weight:600;color:#0B1F3A;font-size:.88rem;">${pickup}</td></tr>
              <tr><td style="padding:9px 12px;color:#8492A6;font-size:.88rem;">📍 Delivery</td><td style="padding:9px 12px;font-weight:600;color:#0B1F3A;font-size:.88rem;">${delivery}</td></tr>
              <tr style="background:#f9f9f9;"><td style="padding:9px 12px;color:#8492A6;font-size:.88rem;">📦 Material</td><td style="padding:9px 12px;font-weight:600;color:#0B1F3A;font-size:.88rem;">${material || 'Not specified'}</td></tr>
              <tr><td style="padding:9px 12px;color:#8492A6;font-size:.88rem;">⚖️ Weight</td><td style="padding:9px 12px;font-weight:600;color:#0B1F3A;font-size:.88rem;">${weight ? weight + ' MT' : 'Not specified'}</td></tr>
              <tr style="background:#f9f9f9;"><td style="padding:9px 12px;color:#8492A6;font-size:.88rem;">🚛 Vehicle</td><td style="padding:9px 12px;font-weight:600;color:#0B1F3A;font-size:.88rem;">${vehicle || 'Not specified'}</td></tr>
              <tr><td style="padding:9px 12px;color:#8492A6;font-size:.88rem;">📅 Required Date</td><td style="padding:9px 12px;font-weight:600;color:#0B1F3A;font-size:.88rem;">${date || 'Flexible'}</td></tr>
            </table>
          </div>

          ${notes ? `
          <!-- Notes -->
          <div style="background:#fff;border-radius:10px;padding:24px;margin-bottom:16px;">
            <h3 style="color:#0B1F3A;font-size:1rem;margin:0 0 10px;text-transform:uppercase;letter-spacing:.5px;">Additional Notes</h3>
            <p style="color:#4a5568;font-size:.9rem;line-height:1.7;margin:0;">${notes.replace(/\n/g, '<br>')}</p>
          </div>` : ''}

          <!-- Action reminder -->
          <div style="background:rgba(255,107,0,0.08);border:1px solid rgba(255,107,0,0.25);border-radius:10px;padding:20px;text-align:center;">
            <p style="margin:0;color:#0B1F3A;font-size:.95rem;">⏱️ Please reply to <strong style="color:#FF6B00;">${contact}</strong> within <strong>2 hours</strong> with a personalised quote.</p>
          </div>

          <p style="text-align:center;margin-top:20px;font-size:.75rem;color:#aaa;">Sent from Shivam Logistics website · shivamlogistics28@gmail.com</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: 'Quote request sent successfully!' });
  } catch (err) {
    console.error('Quote email error:', err.message);
    res.status(500).json({ success: false, error: 'Failed to send quote request. Please contact us directly.' });
  }
}

module.exports = { calculateQuote };
