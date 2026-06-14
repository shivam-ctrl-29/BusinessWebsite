import { useReveal } from '../hooks/useReveal'

const REVIEWS = [
  { stars: '★★★★★', text: '"Hamari company Mumbai se Pune aur Nagpur tak monthly 40+ consignments bhejti hai. Shivam Logistics ne kabhi ek bhi delivery miss nahi ki. Driver bhi bahut professional hain, saman ka poora dhyan rakhte hain. Rate bhi market se competitive hai."', meta: 'Verified Client · Mumbai → Pune route · 3 years', name: 'Santosh Khedkar', company: 'Partner, Khedkar Agro Traders, Nashik', initials: 'SK', avatarBg: 'linear-gradient(135deg,#FF6B00,#ff8c40)' },
  { stars: '★★★★★', text: '"We ship auto spare parts from Indore to dealerships across MP and CG every week. Before Shivam Logistics we faced many damages and delays. Since we switched, not a single complaint from our dealers. Their packaging and handling is top class."', meta: 'Verified Client · Indore · 2 years', name: 'Dinesh Patidar', company: 'MD, Patidar Auto Parts Pvt. Ltd., Indore', initials: 'DP', avatarBg: 'linear-gradient(135deg,#0B1F3A,#1a4a8a)' },
  { stars: '★★★★★', text: '"Cold chain logistics ke liye bahut mushkil se acha transporter milta tha. Shivam Logistics ki reefer van ne Ahmedabad se Delhi tak -18°C maintain ki poori journey mein. Pharma business ke liye yeh bahut zaroori hai. Highly recommend karta hoon."', meta: 'Verified Client · Pharma Cold Chain · 18 months', name: 'Naitik Joshi', company: 'Logistics Manager, Joshi Pharma Distributors, Ahmedabad', initials: 'NJ', avatarBg: 'linear-gradient(135deg,#00BFFF,#0077aa)' },
  { stars: '★★★★★', text: '"During festive season our order volume triples overnight. Called Shivam Logistics at 10 PM and they arranged 3 trucks by 6 AM next morning. That kind of reliability is rare. Our Diwali season was saved because of their quick response."', meta: 'Verified Client · Seasonal FTL · Surat', name: 'Rachna Maniyar', company: 'Owner, Maniyar Textile House, Surat', initials: 'RM', avatarBg: 'linear-gradient(135deg,#FF6B00,#cc4400)' },
  { stars: '★★★★☆', text: '"PTL service is excellent value for money. Hum chhote exporters ke liye full truck afford karna mushkil tha. Ab share load se cost 40% kam ho gayi aur delivery time bhi same hai. Ek baar minor delay hua tha lekin unhone khud call karke inform kiya – that\'s professional behaviour."', meta: 'Verified Client · PTL Service · Ludhiana', name: 'Gurpreet Singh Bhatia', company: 'Export Manager, Bhatia Hosiery Works, Ludhiana', initials: 'GS', avatarBg: 'linear-gradient(135deg,#22C55E,#16a34a)' },
  { stars: '★★★★★', text: '"Heavy machinery transport from our Pune factory to a site in Rajasthan — 4 ODC trucks, police escort, permit handling — everything done by Shivam Logistics team without us worrying about a single paper. Delivered on time, zero damage. Will use again for our next project."', meta: 'Verified Client · ODC / Heavy Haul · Pune', name: 'Vikas Deshpande', company: 'Project Head, Deshpande Infrastructure Ltd., Pune', initials: 'VD', avatarBg: 'linear-gradient(135deg,#0B1F3A,#0d3060)' },
]

export default function Testimonials() {
  const ref = useReveal()
  return (
    <section className="testimonials-section" id="reviews">
      <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 0' }}>
        <div className="section-tag" style={{ justifyContent: 'center' }}>Client Reviews</div>
        <h2 className="section-title" style={{ textAlign: 'center' }}>What Our <em>Clients</em> Say</h2>
        <p className="section-sub" style={{ textAlign: 'center', margin: '0 auto 48px' }}>Real feedback from businesses across India who trust us with their supply chain.</p>
      </div>

      <div className="rating-summary reveal" ref={useReveal()}>
        <div>
          <div className="rating-big">4.9<span>/5</span></div>
          <div className="rating-stars-big">★★★★★</div>
          <div className="rating-count">Based on 340+ verified reviews</div>
        </div>
        <div className="rating-bars">
          {[['5★','88%'],['4★','9%'],['3★','2%'],['2★','1%']].map(([star, pct]) => (
            <div className="rating-bar-row" key={star}>
              <span>{star}</span>
              <div className="rating-bar-track"><div className="rating-bar-fill" style={{ width: pct }} /></div>
              <span>{pct}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="testimonials-grid reveal" ref={ref}>
        {REVIEWS.map(r => (
          <div className="testimonial-card" key={r.name}>
            <div className="review-header">
              <div className="stars">{r.stars}</div>
              <div className="review-platform">Google Review</div>
            </div>
            <p className="testimonial-text">{r.text}</p>
            <div className="review-meta">{r.meta}</div>
            <div className="testimonial-author">
              <div className="author-avatar" style={{ background: r.avatarBg }}>{r.initials}</div>
              <div>
                <div className="author-name">{r.name}</div>
                <div className="author-company">{r.company}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
