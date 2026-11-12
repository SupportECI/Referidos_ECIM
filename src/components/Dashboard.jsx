import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Inbox } from 'lucide-react';
import Header from './Header';

export default function Dashboard({ user, onOpenModal }) {
  const [referrals, setReferrals] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.id) {
      fetch(`http://localhost:8080/api/referidos/embajador/${user.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => {
          if (!res.ok) {
            return [];
          }
          return res.json();
        })
        .then(data => {
          setReferrals(data);
        })
        .catch(error => console.error('Error al obtener referidos:', error));
    }
  }, [user]);

  const filteredReferrals = referrals.filter((ref) => {
    const q = searchQuery.toLowerCase();
    const fullName = ref.nombre ? ref.nombre.toLowerCase() : '';
    const celular = ref.celular ? ref.celular.toLowerCase() : '';
    const correo = ref.correo ? ref.correo.toLowerCase() : '';
    const estado = ref.estado ? ref.estado.toLowerCase() : '';
    const modalidad = ref.modalidad ? ref.modalidad.toLowerCase() : '';
    const idioma = ref.idioma ? ref.idioma.toLowerCase() : '';
    const fechaRegistro = ref.fechaRegistro ? ref.fechaRegistro.toLowerCase() : '';

    return fullName.includes(q) || celular.includes(q) || correo.includes(q) || estado.includes(q) || modalidad.includes(q) || idioma.includes(q) || fechaRegistro.includes(q);
  });

  // Mapeador de etiquetas legibles
  const estatusTextoMap = {
    PENDIENTE: 'Pendiente',
    CONTACTADO: 'Contactado',
    INSCRITO: 'Inscrito',
    NO_INSCRITO: 'No inscrito'
  };

  return (
    <section className="screen active" id="screen-dashboard">
      <Header
        user={user}
        showAddReferral={true}
        showUserChip={true}
      />

      <div className="dash-wrap">
        <p className="dash-greet">Hola de nuevo,</p>
        <h2 className="dash-title" id="dash-greet-name">Hola, {user.nombre || 'Embajador'}</h2>

        <div className="dash-actions">
          <button className="btn btn-outline-2" onClick={() => navigate('/referral')}>
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
                  <th>Correo</th>
                  <th>Estado</th>
                  <th>Modalidad</th>
                  <th>Idioma</th>
                  <th>Fecha de registro</th>
                  <th>Estatus</th>
                </tr>
              </thead>
              <tbody id="hist-body">
                {filteredReferrals.map((ref, idx) => {
                  const estatusClase = ref.estatus ? ref.estatus.toLowerCase().replace('_', '-') : 'Pendiente';
                  const estatusTexto = estatusTextoMap[ref.estatus] || ref.estatus || 'Pendiente';

                  return (
                    <tr key={ref.id || idx}>
                      <td>{filteredReferrals.length - idx}</td>
                      <td>{ref.nombre}</td>
                      <td>{ref.celular}</td>
                      <td>{ref.correo}</td>
                      <td>{ref.estado}</td>
                      <td>{ref.modalidad}</td>
                      <td>
                        {
                          ref.idioma === 'INGLES' ? 'Inglés' :
                            ref.idioma === 'FRANCES' ? 'Francés' :
                              ref.idioma === 'ITALIANO' ? 'Italiano' : ref.idioma
                        }
                      </td>
                      <td>{ref.fechaRegistro || '-'}</td>
                      <td>
                        <span className={`status-badge ${estatusClase}`}>
                          {estatusTexto}
                        </span>
                      </td>
                    </tr>
                  );
                })}
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
              + Agregar Referido
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}