import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Inbox, X } from 'lucide-react';
import Header from './Header';

export default function Admin({ referrals, onUpdateStatus }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReferralId, setSelectedReferralId] = useState(null);
  const navigate = useNavigate();

  const filteredReferrals = referrals.filter((ref) => {
    const q = searchQuery.toLowerCase();
    const fullName = ref.nombre ? ref.nombre.toLowerCase() : '';
    const wpp = ref.wpp ? ref.wpp.toLowerCase() : '';
    return fullName.includes(q) || wpp.includes(q);
  });

  const selectedReferral = referrals.find((ref) => ref.id === selectedReferralId);

  const relacionMap = {
    alumno: 'Alumno actual',
    exalumno: 'Ex-alumno',
    papa: 'Papá o mamá de alumno',
    publico: 'Público en general'
  };

  return (
    <section className="screen active" id="screen-admin">
      <Header showBackToHome={true} />

      <div className="dash-wrap">
        <p className="dash-greet">Panel de Control</p>
        <h2 className="dash-title">Administración de Referidos</h2>

        <div className="dash-actions">
          <button className="btn btn-outline" onClick={() => navigate('/')}>
            ← Volver al inicio
          </button>
        </div>

        <div className="hist-head">
          <h3>Todos los referidos registrados</h3>
          <div className="search-box">
            <Search size={18} style={{ color: 'var(--muted)', flexShrink: 0 }} />
            <input 
              type="text" 
              placeholder="Buscar por nombre o teléfono"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="table-wrap">
          <div className="table-scroll">
            <table style={{ cursor: 'pointer' }}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nombre del referido</th>
                  <th>WhatsApp</th>
                  <th>Estado</th>
                  <th>Modalidad</th>
                  <th>Idioma</th>
                  <th>Fecha de registro</th>
                  <th>Estatus (Clic para detalles)</th>
                </tr>
              </thead>
              <tbody>
                {filteredReferrals.map((ref, idx) => (
                  <tr key={ref.id || idx} onClick={() => setSelectedReferralId(ref.id)}>
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

          <div className={`empty-state ${referrals.length === 0 ? 'show' : ''}`}>
            <div className="glyph" style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
              <Inbox size={36} style={{ color: 'var(--muted)' }} />
            </div>
            <h4>No hay referidos registrados</h4>
            <p>Los referidos recomendados por los usuarios aparecerán aquí.</p>
          </div>
        </div>
      </div>

      {selectedReferral && (
        <div 
          className="modal-overlay show" 
          style={{ display: 'flex' }}
          onClick={() => setSelectedReferralId(null)}
        >
          <div 
            className="card" 
            style={{ maxWidth: '500px', width: '100%', position: 'relative', borderTop: '4px solid var(--navy-800)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="modal-close" 
              onClick={() => setSelectedReferralId(null)}
              style={{ color: 'var(--navy-800)', background: 'rgba(10,19,48,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <X size={18} />
            </button>
            <h3 style={{ fontSize: '20px', marginBottom: '16px' }}>Detalles de la Recomendación</h3>

            <div style={{ marginBottom: '18px', textAlign: 'left' }}>
              <h4 style={{ color: 'var(--gold-500)', fontSize: '15px', borderBottom: '1px solid var(--border)', paddingBottom: '4px', marginBottom: '8px' }}>
                Datos del Referido
              </h4>
              <p style={{ margin: '4px 0', fontSize: '14px' }}><strong>Nombre:</strong> {selectedReferral.nombre}</p>
              <p style={{ margin: '4px 0', fontSize: '14px' }}><strong>WhatsApp:</strong> {selectedReferral.wpp}</p>
              <p style={{ margin: '4px 0', fontSize: '14px' }}><strong>Correo:</strong> {selectedReferral.correo || 'No registrado'}</p>
              <p style={{ margin: '4px 0', fontSize: '14px' }}><strong>Estado:</strong> {selectedReferral.estado}</p>
              <p style={{ margin: '4px 0', fontSize: '14px' }}><strong>Modalidad:</strong> {selectedReferral.modalidad}</p>
              <p style={{ margin: '4px 0', fontSize: '14px' }}><strong>Idioma de interés:</strong> {selectedReferral.idioma}</p>
              <p style={{ margin: '4px 0', fontSize: '14px' }}><strong>Fecha de registro:</strong> {selectedReferral.fecha}</p>
            </div>

            <div style={{ marginBottom: '22px', textAlign: 'left' }}>
              <h4 style={{ color: 'var(--gold-500)', fontSize: '15px', borderBottom: '1px solid var(--border)', paddingBottom: '4px', marginBottom: '8px' }}>
                Datos del Recomendador (Referente)
              </h4>
              {selectedReferral.referrer ? (
                <>
                  <p style={{ margin: '4px 0', fontSize: '14px' }}>
                    <strong>Nombre:</strong> {selectedReferral.referrer.nombre} {selectedReferral.referrer.apellido || ''}
                  </p>
                  <p style={{ margin: '4px 0', fontSize: '14px' }}><strong>WhatsApp:</strong> {selectedReferral.referrer.wpp}</p>
                  <p style={{ margin: '4px 0', fontSize: '14px' }}><strong>Correo:</strong> {selectedReferral.referrer.correo}</p>
                  <p style={{ margin: '4px 0', fontSize: '14px' }}>
                    <strong>Relación:</strong> {relacionMap[selectedReferral.referrer.relacion] || selectedReferral.referrer.relacion}
                  </p>
                </>
              ) : (
                <p style={{ margin: '4px 0', fontSize: '14px', color: 'var(--muted)', fontStyle: 'italic' }}>
                  Sin detalles del recomendador (registro de prueba inicial).
                </p>
              )}
            </div>

            <div className="field" style={{ textAlign: 'left' }}>
              <label htmlFor="admin-change-status" style={{ fontWeight: '600', fontSize: '13px', color: 'var(--navy-800)' }}>
                Cambiar estatus de la recomendación:
              </label>
              <select
                id="admin-change-status"
                value={selectedReferral.estatus}
                onChange={(e) => onUpdateStatus(selectedReferral.id, e.target.value)}
                style={{ width: '100%', marginTop: '6px' }}
              >
                <option value="pendiente">Pendiente</option>
                <option value="contactado">Contactado</option>
                <option value="inscrito">Inscrito</option>
              </select>
            </div>

            <button 
              className="btn btn-navy btn-block" 
              style={{ marginTop: '20px' }}
              onClick={() => setSelectedReferralId(null)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
