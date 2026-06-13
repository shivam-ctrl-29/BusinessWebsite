import { useReveal } from '../hooks/useReveal'

export default function Branches() {
  const ref = useReveal()
  return (
    <section className="branches-section" id="branches">
      <div className="section-tag">Pan India Presence</div>
      <h2 className="section-title">Our <em>Branch</em> Network</h2>
      <p className="section-sub">Strategically located branches across India ensuring faster local support and pickup.</p>
      <div className="branches-grid reveal" ref={ref}>

        <div className="branch-card">
          <div className="branch-city">📍 Jamshedpur, Jharkhand</div>
          <div className="branch-detail"><span className="branch-icon">🏠</span>Flat No. 5, Sai Niwas, Parmanu Nagar,<br />Tisko Housing Society, Jharkhand – 832109</div>
        </div>

        <div className="branch-card">
          <div className="branch-city">📍 Indore, Madhya Pradesh</div>
          <div className="branch-sub-label">Head Office</div>
          <div className="branch-detail"><span className="branch-icon">🏠</span>85, Avantika Nagar, Indore – 452006</div>
          <div className="branch-sub-label" style={{ marginTop: 12 }}>Branch Office</div>
          <div className="branch-detail"><span className="branch-icon">🏠</span>Super Corridor, Near Metro Station,<br />Indore – 453112</div>
        </div>

      </div>
    </section>
  )
}
