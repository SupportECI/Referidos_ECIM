import { Check } from 'lucide-react';

export default function Toast({ show, message }) {
  return (
    <div className={`toast ${show ? 'show' : ''}`} id="toast">
      <span className="tick" style={{ display: 'inline-flex', alignItems: 'center' }}>
        <Check size={16} />
      </span>
      <span id="toast-text">{message || 'Listo'}</span>
    </div>
  );
}
