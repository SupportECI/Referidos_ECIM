import { useNavigate } from 'react-router-dom';
import StarRing from './StarRing';

export default function Header({ user, showBackToHome, showAddReferral, showUserChip }) {
  const navigate = useNavigate();

  const getInitials = () => {
    if (!user) return 'AG';
    const n = user.nombre ? user.nombre.trim()[0] || '' : '';
    const a = user.apellido ? user.apellido.trim()[0] || '' : '';
    return (n + a).toUpperCase();
  };

  const getFullName = () => {
    if (!user) return 'Andrés García';
    return `${user.nombre} ${user.apellido || ''}`.trim();
  };

  return (
    <header className="site-header">
      <div className="brand" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
        <div className="brand-mark">
          <StarRing size={34} radius={15} color="#F5EACB" />
        </div>
        <div className="brand-text">
          <span className="euro">Embajadores Euro</span>
          <span className="sub">Eurocentro de Idiomas</span>
        </div>
      </div>
      
      {showBackToHome && (
        <button className="btn btn-ghost" onClick={() => navigate('/')} style={{ color: '#fff', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '999px', padding: '6px 14px' }}>
          ← Volver al inicio
        </button>
      )}

      {(showAddReferral || showUserChip) && (
        <div className="header-actions">
          {showAddReferral && (
            <button className="btn btn-gold" onClick={() => navigate('/referral')}>
              + Agregar Referido
            </button>
          )}
          {showUserChip && (
            <div className="user-chip">
              <div className="avatar">{getInitials()}</div>
              <span>{getFullName()}</span>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
