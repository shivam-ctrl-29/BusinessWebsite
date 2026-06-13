const nodemailer = require('nodemailer');

async function sendContactEmail(req, res) {
  const { name, company, email, phone, service, message } = req.body;

  if (!name) return res.status(400).json({ success: false, error: 'Name is required' });
  if (!email && !phone) return res.status(400).json({ success: false, error: 'Email or phone is required' });
  if (!message) return res.status(400).json({ success: false, error: 'Message is required' });

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
      subject: `New Enquiry from ${name} – Shivam Logistics Website`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
          <h2 style="color:#0B1F3A;border-bottom:3px solid #FF6B00;padding-bottom:10px;">
            New Website Enquiry
          </h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px;color:#666;width:140px;">Name</td><td style="padding:8px;font-weight:600;">${name}</td></tr>
            <tr style="background:#f9f9f9;"><td style="padding:8px;color:#666;">Company</td><td style="padding:8px;">${company || 'N/A'}</td></tr>
            <tr><td style="padding:8px;color:#666;">Email</td><td style="padding:8px;">${email || 'N/A'}</td></tr>
            <tr style="background:#f9f9f9;"><td style="padding:8px;color:#666;">Phone</td><td style="padding:8px;">${phone || 'N/A'}</td></tr>
            <tr><td style="padding:8px;color:#666;">Service</td><td style="padding:8px;">${service || 'N/A'}</td></tr>
          </table>
          <div style="margin-top:16px;background:#f4f6fa;padding:16px;border-radius:8px;border-left:4px solid #FF6B00;">
            <strong>Message:</strong><br/><br/>
            ${message.replace(/\n/g, '<br>')}
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
