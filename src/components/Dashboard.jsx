import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Inbox } from 'lucide-react';
import Header from './Header';

export default function Dashboard({ user, referrals, onOpenModal }) {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const getFullName = () => {
    if (!user) return 'Andrés García';
    return `${user.nombre} ${user.apellido || ''}`.trim();
  };

  const filteredReferrals = referrals.filter((ref) => {
    const q = searchQuery.toLowerCase();
    const fullName = ref.nombre ? ref.nombre.toLowerCase() : '';
    const wpp = ref.wpp ? ref.wpp.toLowerCase() : '';
    return fullName.includes(q) || wpp.includes(q);
  });

  return (
    <section className="screen active" id="screen-dashboard">
      <Header 
        user={user} 
        showAddReferral={true} 
        showUserChip={true} 
      />

      <div className="dash-wrap">
        <p className="dash-greet">Hola de nuevo,</p>
        <h2 className="dash-title" id="dash-greet-name">{getFullName()}</h2>

        <div className="dash-actions">
          <button className="btn btn-gold" onClick={() => navigate('/referral')}>
            + Agregar Referido
          </button>
          <button className="btn btn-outline" id="btn-open-modal" onClick={onOpenModal}>
            Ver mi comisión $
          </button>
        </div>

        <div className="hist-head">
          <h3>Historial de referidos</h3>
          <div className="search-box">
            <Search size={18} style={{ color: 'var(--muted)', flexShrink: 0 }} />
            <input 
              type="text" 
              id="hist-search" 
              placeholder="Buscar por nombre o teléfono"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="table-wrap">
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nombre del referido</th>
                  <th>WhatsApp</th>
                  <th>Estado</th>
                  <th>Modalidad</th>
                  <th>Idioma</th>
                  <th>Fecha de registro</th>
                  <th>Estatus</th>
                </tr>
              </thead>
              <tbody id="hist-body">
                {filteredReferrals.map((ref, idx) => (
                  <tr key={ref.id || idx}>
                    <td>{filteredReferrals.length - idx}</td>
                    <td>{ref.nombre}</td>
                    <td>{ref.wpp}</td>
                    <td>{ref.estado}</td>
                    <td>{ref.modalidad}</td>
                    <td>{ref.idioma}</td>
                    <td>{ref.fecha}</td>
                    <td>
                      <span className={`status-badge ${ref.estatus.toLowerCase()}`}>
                        {ref.estatus.charAt(0).toUpperCase() + ref.estatus.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={`empty-state ${referrals.length === 0 ? 'show' : ''}`} id="empty-state">
            <div className="glyph" style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
              <Inbox size={36} style={{ color: 'var(--muted)' }} />
            </div>
            <h4>Aún no tienes referidos</h4>
            <p>Agrega tu primer referido y empieza a ganar.</p>
            <button className="btn btn-gold" onClick={() => navigate('/referral')}>
              Agregar Referido
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
