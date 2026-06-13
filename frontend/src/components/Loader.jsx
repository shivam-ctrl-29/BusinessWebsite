export default function Loader({ hidden }) {
  return (
    <div className={`page-loader${hidden ? ' hidden' : ''}`}>
      <div style={{ textAlign: 'center' }}>
        <img src="/assets/logo.jpg" alt="Shivam Logistics" style={{ height: 64, width: 64, borderRadius: '50%', objectFit: 'contain', background: '#fff', padding: 4 }} />
        <div className="loader-logo">Shivam <span>Logistics</span></div>
        <div className="loader-bar"><div className="loader-bar-fill" /></div>
      </div>
    </div>
  )
}
