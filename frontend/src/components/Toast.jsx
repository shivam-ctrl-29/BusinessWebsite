import { IconCheck } from './Icons'

export default function Toast({ show, msg }) {
  return (
    <div className={`toast${show ? ' show' : ''}`}>
      <IconCheck size={16} />
      <span>{msg}</span>
    </div>
  )
}
