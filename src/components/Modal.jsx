import { X } from 'lucide-react';

export default function Modal({ isOpen, onClose }) {
  const handleOverlayClick = (e) => {
    if (e.target.id === 'modal-comision') {
      onClose();
    }
  };

  return (
    <div 
      className={`modal-overlay ${isOpen ? 'show' : ''}`} 
      id="modal-comision"
      onClick={handleOverlayClick}
    >
      <div className="modal-box">
        <button 
          className="modal-close" 
          id="modal-close" 
          onClick={onClose}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <X size={16} />
        </button>
        <span className="modal-eyebrow">Así ganas</span>
        <div className="modal-amount">$1,000 <span>MXN</span></div>
        <p className="modal-sub">Por cada persona que refieras y se inscriba en Eurocentro de Idiomas.</p>
        <div className="modal-legend">
          Válido para Inglés, Francés e Italiano, en cualquier modalidad. El bono se abona al confirmarse la inscripción.
        </div>
      </div>
    </div>
  );
}
