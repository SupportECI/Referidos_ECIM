import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Users, X } from 'lucide-react';
import Header from './Header';

export default function Admin({ user, onEliminarEmbajador }) {
  const [embajadores, setEmbajadores] = useState([])
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8080/api/usuarios/obtener')
      .then(res => res.json())
      .then(data => {
        setEmbajadores(data);
      })
      .catch(error => console.error('Error al obtener embajadores:', error));
  }, []);

  const filteredEmbajadores = embajadores.filter((emb) => {
    const q = searchQuery.toLowerCase();
    const fullName = `${emb.nombre} ${emb.apellidos}`.toLowerCase();
    const email = emb.correo ? emb.correo.toLowerCase() : '';
    const celular = emb.celular ? emb.celular.toLowerCase() : '';
    const relacion = emb.relacionEmpresa ? emb.relacionEmpresa.toLowerCase() : '';
    const estado = emb.estado ? emb.estado.toLowerCase() : '';

    return fullName.includes(q) || email.includes(q) || celular.includes(q) || relacion.includes(q) || estado.includes(q);
  });

  const relacionMap = {
    alumno: 'Alumno actual',
    exalumno: 'Ex-alumno',
    papa: 'Papá o mamá de alumno',
    publico_general: 'Público en general'
  };

  return (
    <section className="screen active" id="screen-admin">
      <Header showBackToHome={true} />

      <div className="dash-wrap">
        <p className="dash-greet">Panel de Control: {user.rol}</p>
        <h2 className="dash-title">Gestión de Embajadores</h2>

        <div className="dash-actions">
          <button className="btn btn-outline" onClick={() => navigate('/')}>
            ← Salir
          </button>
        </div>

        <div className="hist-head">
          <h3>Embajadores Activos</h3>
          <div className="search-box">
            <Search size={18} style={{ color: 'var(--muted)', flexShrink: 0 }} />
            <input
              type="text"
              placeholder="Buscar por nombre o correo..."
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
                  <th>Nombre Completo</th>
                  <th>Correo</th>
                  <th>WhatsApp</th>
                  <th>Relación</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody id="hist-body">
                {filteredEmbajadores.map((emb, idx) => (
                  <tr key={emb.id || idx}>
                    <td>{filteredEmbajadores.length - idx}</td>
                    <td>{emb.nombre} {emb.apellidos}</td>
                    <td>{emb.correo}</td>
                    <td>{emb.celular}</td>
                    <td>{relacionMap[emb.relacionEmpresa] || emb.relacionEmpresa}</td>
                    <td>{emb.estado}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          className="btn btn-navy"
                          style={{ padding: '4px 10px', fontSize: '12px' }}
                          onClick={() => navigate(`/admin/referidos/${emb.id}`, { state: { embajador: emb } })}
                        >
                          Ver Referidos
                        </button>

                        {/* Este botón solo lo ve el ADMIN */}
                        {user.rol === 'ADMIN' && (
                          <button
                            className="btn"
                            style={{ padding: '4px 10px', fontSize: '12px', backgroundColor: '#dc3545', color: 'white', border: 'none' }}
                            onClick={() => {
                              if (window.confirm('¿Seguro que deseas dar de baja a este embajador?')) {
                                onEliminarEmbajador(emb.id);
                              }
                            }}
                          >
                            Dar de baja
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={`empty-state ${embajadores.length === 0 ? 'show' : ''}`}>
            <div className="glyph" style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
              <Users size={36} style={{ color: 'var(--muted)' }} />
            </div>
            <h4>No hay embajadores registrados</h4>
            <p>Los usuarios que se registren en la plataforma aparecerán aquí.</p>
          </div>
        </div>
      </div>
    </section>
  );
}