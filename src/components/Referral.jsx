import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

const ESTADOS = [
  "Aguascalientes", "Baja California", "Baja California Sur", "Campeche", "Chiapas",
  "Chihuahua", "Ciudad de México", "Coahuila", "Colima", "Durango", "Estado de México", "Guanajuato",
  "Guerrero", "Hidalgo", "Jalisco", "Michoacán", "Morelos", "Nayarit", "Nuevo León", "Oaxaca", "Puebla",
  "Querétaro", "Quintana Roo", "San Luis Potosí", "Sinaloa", "Sonora", "Tabasco", "Tamaulipas",
  "Tlaxcala", "Veracruz", "Yucatán", "Zacatecas"
];

export default function Referral({ user, onAddReferral }) {
  const [nombre, setNombre] = useState('');
  const [apellidoP, setApellidoP] = useState('');
  const [apellidoM, setApellidoM] = useState('');
  const [wpp, setWpp] = useState('');
  const [correo, setCorreo] = useState('');
  const [estado, setEstado] = useState('');
  const [modalidad, setModalidad] = useState('');
  const [idioma, setIdioma] = useState('');

  const navigate = useNavigate();

  const handleEstadoChange = (val) => {
    setEstado(val);
    if (val === 'Chiapas') {
      setModalidad('');
    } else if (val) {
      setModalidad('Online');
    } else {
      setModalidad('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!e.currentTarget.checkValidity()) {
      e.currentTarget.reportValidity();
      return;
    }

    const today = new Date();
    const fecha = String(today.getDate()).padStart(2, '0') + '/' + 
                  String(today.getMonth() + 1).padStart(2, '0') + '/' + 
                  today.getFullYear();

    const idiomaText = {
      ingles: 'Inglés',
      frances: 'Francés',
      italiano: 'Italiano'
    }[idioma] || idioma;

    const newRef = {
      id: Date.now(),
      nombre: `${nombre} ${apellidoP} ${apellidoM}`.trim(),
      wpp: wpp.trim(),
      correo: correo.trim(),
      estado,
      modalidad,
      idioma: idiomaText,
      fecha,
      estatus: 'pendiente',
      referrer: user ? {
        nombre: user.nombre,
        apellido: user.apellido,
        correo: user.correo,
        wpp: user.wpp,
        relacion: user.relacion
      } : null
    };

    onAddReferral(newRef);
  };

  const modalidadDisabled = !estado;
  const modalidadHelperText = estado === 'Chiapas' ? 'Disponible en Presencial y Online.' : '';

  return (
    <section className="screen active" id="screen-referral">
      <Header 
        user={user} 
        showUserChip={true} 
      />

      <div className="page">
        <div className="back-row">
          <button className="btn btn-ghost" onClick={() => navigate('/dashboard')}>
            ← Regresar
          </button>
        </div>

        <div className="page-head">
          <h2>Recomienda y gana en cuanto se inscriba</h2>
          <p className="sub">Gana $1,000 por cada persona que recomiendes y se inscriba en Eurocentro de Idiomas.</p>
        </div>

        <form className="card" id="form-referral" noValidate onSubmit={handleSubmit}>
          <h3>Datos del referido</h3>

          <div className="field-grid three">
            <div className="field">
              <label htmlFor="ref-nombre">Nombre*</label>
              <input 
                id="ref-nombre" 
                type="text" 
                required 
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="ref-apellido-p">Apellido paterno*</label>
              <input 
                id="ref-apellido-p" 
                type="text" 
                required 
                value={apellidoP}
                onChange={(e) => setApellidoP(e.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="ref-apellido-m">Apellido materno*</label>
              <input 
                id="ref-apellido-m" 
                type="text" 
                required 
                value={apellidoM}
                onChange={(e) => setApellidoM(e.target.value)}
              />
            </div>
          </div>

          <div className="field-grid">
            <div className="field">
              <label htmlFor="ref-wpp">Número de WhatsApp*</label>
              <input 
                id="ref-wpp" 
                type="tel" 
                placeholder="961 123 4567" 
                required 
                value={wpp}
                onChange={(e) => setWpp(e.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="ref-correo">Correo electrónico*</label>
              <input 
                id="ref-correo" 
                type="email" 
                required 
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
              />
            </div>
          </div>

          <div className="field-grid">
            <div className="field">
              <label htmlFor="ref-estado">Estado*</label>
              <select 
                id="ref-estado" 
                required
                value={estado}
                onChange={(e) => handleEstadoChange(e.target.value)}
              >
                <option value="" disabled>Selecciona un estado</option>
                {ESTADOS.map((e) => (
                  <option key={e} value={e}>{e}</option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="ref-modalidad">Modalidad*</label>
              <select 
                id="ref-modalidad" 
                disabled={modalidadDisabled} 
                required
                value={modalidad}
                onChange={(e) => setModalidad(e.target.value)}
              >
                {estado === '' ? (
                  <option value="">Selecciona un estado primero</option>
                ) : estado === 'Chiapas' ? (
                  <>
                    <option value="" disabled>Selecciona una opción</option>
                    <option value="Presencial">Presencial</option>
                    <option value="Online">Online</option>
                  </>
                ) : (
                  <option value="Online">Online</option>
                )}
              </select>
              <span className="helper" id="ref-modalidad-helper">{modalidadHelperText}</span>
            </div>
          </div>

          <div className="field">
            <label htmlFor="ref-idioma">Idioma de interés*</label>
            <select 
              id="ref-idioma" 
              required
              value={idioma}
              onChange={(e) => setIdioma(e.target.value)}
            >
              <option value="" disabled>Selecciona una opción</option>
              <option value="ingles">Inglés</option>
              <option value="frances">Francés</option>
              <option value="italiano">Italiano</option>
            </select>
          </div>

          <button type="submit" className="btn btn-gold btn-block">Registrar Referido</button>
        </form>
      </div>
    </section>
  );
}
