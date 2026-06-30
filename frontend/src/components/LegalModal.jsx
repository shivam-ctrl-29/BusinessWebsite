const COMPANY = 'Shivam Logistics'
const YEAR = new Date().getFullYear()

const DOCS = {
  privacy: {
    title: 'Privacy Policy',
    body: (
      <>
        <p><strong>Last updated:</strong> {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

        <h4>1. Information We Collect</h4>
        <p>When you use this website — including the Get Quote form, Contact form, and AI chat assistant — we may collect: your name, phone number, email address, company name, pickup/delivery locations, cargo details, and any message you choose to send us. We do not collect payment card information through this website.</p>

        <h4>2. How We Use Your Information</h4>
        <p>We use the information you submit solely to respond to your enquiry, prepare a logistics quote, arrange a shipment, or contact you about your request. We do not sell, rent, or trade your personal information to third parties.</p>

        <h4>3. Data Storage & Security</h4>
        <p>Form submissions are transmitted securely to our business email for processing. We apply reasonable technical safeguards (encrypted transport, rate-limiting, and input validation) to protect data submitted through this site against unauthorized access.</p>

        <h4>4. Cookies & Tracking</h4>
        <p>This website does not use third-party advertising cookies or trackers. Basic browser storage may be used only to remember interface preferences (such as dark/light mode) on your own device.</p>

        <h4>5. Third-Party Services</h4>
        <p>We may use third-party services (such as email delivery and WhatsApp Business) strictly to communicate with you after you contact us. These providers have their own privacy practices governing data they process on our behalf.</p>

        <h4>6. Your Rights</h4>
        <p>You may request access to, correction of, or deletion of personal information you have submitted to us by contacting us at <a href="mailto:shivamlogistics28@gmail.com">shivamlogistics28@gmail.com</a>.</p>

        <h4>7. Children's Privacy</h4>
        <p>This website is intended for business use and is not directed at children under 18. We do not knowingly collect personal information from children.</p>

        <h4>8. Changes to This Policy</h4>
        <p>We may update this Privacy Policy from time to time. Continued use of this website after changes constitutes acceptance of the revised policy.</p>

        <h4>9. Governing Law</h4>
        <p>This Privacy Policy is governed by the laws of India, including the Information Technology Act, 2000 and the Digital Personal Data Protection Act, 2023, and is subject to the jurisdiction of the courts at Indore, Madhya Pradesh.</p>

        <h4>10. Contact Us</h4>
        <p>For any privacy-related questions, contact {COMPANY} at <a href="mailto:shivamlogistics28@gmail.com">shivamlogistics28@gmail.com</a> or +91 85190 00113.</p>
      </>
    ),
  },
  terms: {
    title: 'Terms of Service & Copyright Notice',
    body: (
      <>
        <p><strong>Last updated:</strong> {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

        <h4>1. Acceptance of Terms</h4>
        <p>By accessing or using this website, you agree to be bound by these Terms of Service. If you do not agree, please discontinue use of this website.</p>

        <h4>2. Copyright & Intellectual Property</h4>
        <p>© {YEAR} {COMPANY}. All rights reserved. This website and all of its original content — including but not limited to text, graphics, logos, icons, images, fleet photographs, brand name, layout, design, source code, and the company brochure — is the exclusive property of {COMPANY} and is protected under the Copyright Act, 1957 (India), the Trade Marks Act, 1999 (India), and applicable international copyright and intellectual property laws and treaties.</p>
        <p>No part of this website may be reproduced, copied, distributed, republished, downloaded for commercial use, displayed, posted, or transmitted in any form or by any means without the prior written permission of {COMPANY}, except for personal, non-commercial use such as requesting a quote or viewing our services.</p>
        <p>The "Shivam Logistics" name and logo are trademarks of {COMPANY}. Unauthorized use of our name, logo, or brand identity in any business communication, marketing material, or domain name is strictly prohibited.</p>

        <h4>3. Use of This Website</h4>
        <p>You agree to use this website only for lawful purposes. You must not: attempt to gain unauthorized access to any part of this website or its underlying systems; submit false, misleading, or fraudulent information through our forms; use automated tools (bots/scrapers) to extract content; or attempt to disrupt, overload, or interfere with the website's normal operation.</p>

        <h4>4. Quotes, Pricing & Services</h4>
        <p>Any pricing, quote estimate, or service information presented on this website is indicative and subject to confirmation by {COMPANY} based on actual shipment details. Final pricing and terms of carriage will be confirmed directly with you before any shipment is booked.</p>

        <h4>5. Third-Party Links</h4>
        <p>This website may link to third-party services (e.g., WhatsApp, Google Maps, Google Reviews). {COMPANY} is not responsible for the content, accuracy, or privacy practices of any third-party site.</p>

        <h4>6. Limitation of Liability</h4>
        <p>This website and its content are provided "as is" without warranties of any kind, express or implied. {COMPANY} shall not be liable for any direct, indirect, incidental, or consequential damages arising from the use of, or inability to use, this website, to the fullest extent permitted by applicable law.</p>

        <h4>7. Indemnity</h4>
        <p>You agree to indemnify and hold harmless {COMPANY}, its officers, employees, and affiliates from any claim or demand arising out of your misuse of this website or violation of these Terms.</p>

        <h4>8. Governing Law & Jurisdiction</h4>
        <p>These Terms are governed by and construed in accordance with the laws of India. Any dispute arising out of or relating to this website or these Terms shall be subject to the exclusive jurisdiction of the courts at Indore, Madhya Pradesh, India.</p>

        <h4>9. Changes to These Terms</h4>
        <p>{COMPANY} reserves the right to modify these Terms at any time without prior notice. Continued use of the website after changes constitutes acceptance of the revised Terms.</p>

        <h4>10. Contact Us</h4>
        <p>For permissions, licensing, or any questions regarding these Terms, contact {COMPANY} at <a href="mailto:shivamlogistics28@gmail.com">shivamlogistics28@gmail.com</a> or +91 85190 00113.</p>
      </>
    ),
  },
}

export default function LegalModal({ doc, onClose }) {
  const d = DOCS[doc]
  const show = !!d

  return (
    <div className={`modal-overlay${show ? ' show' : ''}`} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal modal-legal">
        {d && <>
          <div className="modal-header">
            <div className="modal-title">{d.title}</div>
            <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
          </div>
          <div className="legal-body">{d.body}</div>
        </>}
      </div>
    </div>
  )
}
