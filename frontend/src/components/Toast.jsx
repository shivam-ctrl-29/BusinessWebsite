export default function Toast({ show, msg }) {
  return (
    <div className={`toast${show ? ' show' : ''}`}>
      <span style={{ fontSize: '1.1rem' }}>✓</span>
      <span>{msg}</span>
    </div>
  )
}
