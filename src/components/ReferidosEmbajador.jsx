import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Inbox, ArrowLeft, ChevronDown } from 'lucide-react';
import Header from './Header';

export default function ReferidosEmbajador({ user }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [referrals, setReferrals] = useState([]);
  const [loading, setLoading] = useState(true);

  const embajador = location.state?.embajador;
  const nombreEmbajador = embajador
    ? `${embajador.nombre} ${embajador.apaterno || embajador.apellidos || ''}`.trim()
    : `Embajador #${id}`;

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetch(`http://localhost:8080/api/referidos/embajador/${id}`)
        .then((res) => {
          if (!res.ok) return [];
          return res.json();
        })
        .then((data) => {
          setReferrals(Array.isArray(data) ? data : []);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error al obtener referidos del embajador:', error);
          setLoading(false);
        });
    }
  }, [id]);

  const handleEstatusChange = (referidoId, nuevoEstatus) => {
    fetch(`http://localhost:8080/api/referidos/${referidoId}/estatus`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ estatus: nuevoEstatus }),
    })
      .then((res) => {
        if (res.ok) {
          setReferrals((prev) =>
            prev.map((ref) =>
              ref.id === referidoId ? { ...ref, estatus: nuevoEstatus } : ref
            )
          );
        } else {
          alert('No se pudo actualizar el estatus en el servidor.');
        }
      })
      .catch((error) => {
        console.error('Error al actualizar estatus:', error);
      });
  };

  return (
    <section className="screen active" id="screen-referidos-embajador">
      <Header
        user={user}
        showBackToHome={false}
        showUserChip={true}
      />

      <div className="dash-wrap">
        <div className="back-row" style={{ marginBottom: '15px' }}>
          <button className="btn btn-ghost" onClick={() => navigate('/admin')}>
            <ArrowLeft size={18} style={{ marginRight: '6px' }} />
            Volver a Embajadores
          </button>
        </div>

        <p className="dash-greet">Detalle de cuenta</p>
        <h2 className="dash-title">Referidos de {nombreEmbajador}</h2>

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
                  <th>Estatus</th>
                </tr>
              </thead>
              <tbody id="hist-body">
                {referrals.map((ref, idx) => {
                  const nombreCompleto = ref.nombre
                    ? `${ref.nombre} ${ref.apaterno || ''} ${ref.amaterno || ''}`.trim()
                    : 'Sin nombre';

                  const idiomaFormateado =
                    ref.idioma === 'INGLES' ? 'Inglés' :
                    ref.idioma === 'FRANCES' ? 'Francés' :
                    ref.idioma === 'ITALIANO' ? 'Italiano' : ref.idioma;

                  const estatusActual = ref.estatus || 'PENDIENTE';

                  return (
                    <tr key={ref.id || idx}>
                      <td>{referrals.length - idx}</td>
                      <td><strong>{nombreCompleto}</strong></td>
                      <td>{ref.celular || ref.wpp || '-'}</td>
                      <td>{ref.correo || '-'}</td>
                      <td>{ref.estado || '-'}</td>
                      <td>{ref.modalidad || '-'}</td>
                      <td>{idiomaFormateado || '-'}</td>
                      <td>
                        <div className="status-select-wrap">
                          <select
                            value={estatusActual}
                            onChange={(e) => handleEstatusChange(ref.id, e.target.value)}
                            className={`status-select ${estatusActual.toLowerCase().replace('_', '-')}`}
                          >
                            <option value="PENDIENTE">Pendiente</option>
                            <option value="CONTACTADO">Contactado</option>
                            <option value="INSCRITO">Inscrito</option>
                            <option value="NO_INSCRITO">No inscrito</option>
                          </select>
                          <ChevronDown size={14} className="status-select-icon" />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {!loading && referrals.length === 0 && (
            <div className="empty-state show" id="empty-state">
              <div className="glyph" style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                <Inbox size={36} style={{ color: 'var(--muted)' }} />
              </div>
              <h4>Este embajador aún no tiene referidos</h4>
              <p>Los registros que realice el embajador aparecerán listados aquí.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}