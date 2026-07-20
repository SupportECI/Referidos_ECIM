import { useState } from 'react';
import Header from './Header';

const ESTADOS = [
  "Aguascalientes", "Baja California", "Baja California Sur", "Campeche", "Chiapas",
  "Chihuahua", "Ciudad de México", "Coahuila", "Colima", "Durango", "Estado de México", "Guanajuato",
  "Guerrero", "Hidalgo", "Jalisco", "Michoacán", "Morelos", "Nayarit", "Nuevo León", "Oaxaca", "Puebla",
  "Querétaro", "Quintana Roo", "San Luis Potosí", "Sinaloa", "Sonora", "Tabasco", "Tamaulipas",
  "Tlaxcala", "Veracruz", "Yucatán", "Zacatecas"
];

export default function Register({ onRegister }) {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [estado, setEstado] = useState('');
  const [correo, setCorreo] = useState('');
  const [wpp, setWpp] = useState('');
  const [wpp2, setWpp2] = useState('');
  const [relacion, setRelacion] = useState('');
  const [pass, setPass] = useState('');
  const [pass2, setPass2] = useState('');
  const [terms, setTerms] = useState(false);

  // Mismatch validation states
  const [wppMismatch, setWppMismatch] = useState(false);
  const [passMismatch, setPassMismatch] = useState(false);

  // Strength states
  const [strengthPct, setStrengthPct] = useState(0);
  const [strengthColor, setStrengthColor] = useState('#E4E0D2');
  const [strengthLabel, setStrengthLabel] = useState('—');

  const handlePassChange = (val) => {
    setPass(val);
    let score = 0;
    if (val.length >= 6) score++;
    if (val.length >= 10) score++;
    if (/[A-Z]/.test(val) && /[0-9]/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;

    const pct = [0, 25, 50, 75, 100][score];
    const colors = ['#E4E0D2', '#B23A3A', '#C9A227', '#DDBB4E', '#2E7D4F'];
    const labels = ['—', 'Baja', 'Media', 'Buena', 'Fuerte'];

    setStrengthPct(pct);
    setStrengthColor(colors[score]);
    setStrengthLabel(labels[score]);

    if (passMismatch && val === pass2) {
      setPassMismatch(false);
    }
  };

  const handlePass2Change = (val) => {
    setPass2(val);
    if (passMismatch && pass === val) {
      setPassMismatch(false);
    }
  };

  const handleWppChange = (val) => {
    setWpp(val);
    if (wppMismatch && val === wpp2) {
      setWppMismatch(false);
    }
  };

  const handleWpp2Change = (val) => {
    setWpp2(val);
    if (wppMismatch && wpp === val) {
      setWppMismatch(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const wppOk = wpp === wpp2;
    const passOk = pass === pass2;

    setWppMismatch(!wppOk);
    setPassMismatch(!passOk);

    if (!e.currentTarget.checkValidity() || !wppOk || !passOk) {
      if (!wppOk || !passOk) return;
      e.currentTarget.reportValidity();
      return;
    }

    onRegister({
      nombre,
      apellido,
      estado,
      correo,
      wpp,
      relacion,
    });
  };

  return (
    <section className="screen active" id="screen-register">
      <Header showBackToHome={true} />

      <div className="page">
        <div className="page-head">
          <h2>Crea tu cuenta de Embajador</h2>
          <p className="sub">Regístrate una vez y empieza a recomendar Eurocentro cuando quieras.</p>
        </div>

        <form className="card" id="form-register" noValidate onSubmit={handleSubmit}>
          <h3>Tus datos</h3>

          <div className="field-grid">
            <div className="field">
              <label htmlFor="reg-nombre">Nombre*</label>
              <input 
                id="reg-nombre" 
                type="text" 
                placeholder="Ej. Andrés" 
                required 
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="reg-apellido">Apellido*</label>
              <input 
                id="reg-apellido" 
                type="text" 
                placeholder="Ej. García" 
                required 
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
              />
            </div>
          </div>

          <div className="field-grid">
            <div className="field">
              <label htmlFor="reg-estado">Estado*</label>
              <select 
                id="reg-estado" 
                required 
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
              >
                <option value="" disabled>Selecciona tu estado</option>
                {ESTADOS.map((e) => (
                  <option key={e} value={e}>{e}</option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="reg-correo">Correo electrónico*</label>
              <input 
                id="reg-correo" 
                type="email" 
                placeholder="demo@correo.com" 
                required 
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
              />
            </div>
          </div>

          <div className="field-grid">
            <div className="field">
              <label htmlFor="reg-wpp">WhatsApp*</label>
              <input 
                id="reg-wpp" 
                type="tel" 
                placeholder="961 123 4567" 
                required 
                value={wpp}
                onChange={(e) => handleWppChange(e.target.value)}
              />
            </div>
            <div className={`field ${wppMismatch ? 'error' : ''}`} id="field-wpp-confirm">
              <label htmlFor="reg-wpp2">Confirmar WhatsApp*</label>
              <input 
                id="reg-wpp2" 
                type="tel" 
                placeholder="961 123 4567" 
                required 
                value={wpp2}
                onChange={(e) => handleWpp2Change(e.target.value)}
              />
              <span className="err">Los números de WhatsApp no coinciden.</span>
            </div>
          </div>

          <div className="field">
            <label htmlFor="reg-relacion">¿Cuál es tu relación con Eurocentro?*</label>
            <select 
              id="reg-relacion" 
              required 
              value={relacion}
              onChange={(e) => setRelacion(e.target.value)}
            >
              <option value="" disabled>Selecciona una opción</option>
              <option value="alumno">Alumno actual</option>
              <option value="exalumno">Ex-alumno</option>
              <option value="papa">Papá o mamá de alumno</option>
              <option value="publico">Público en general</option>
            </select>
          </div>
          
          <div className={`alumno-toggle-note ${relacion === 'alumno' ? 'show' : ''}`} id="alumno-note">
            Como alumno actual, puedes elegir que tu bono se aplique directo a tu colegiatura.
          </div>

          <div className="field-grid">
            <div className="field">
              <label htmlFor="reg-pass">Contraseña*</label>
              <input 
                id="reg-pass" 
                type="password" 
                placeholder="••••••••" 
                required 
                value={pass}
                onChange={(e) => handlePassChange(e.target.value)}
              />
            </div>
            <div className={`field ${passMismatch ? 'error' : ''}`} id="field-pass-confirm">
              <label htmlFor="reg-pass2">Confirmar contraseña*</label>
              <input 
                id="reg-pass2" 
                type="password" 
                placeholder="••••••••" 
                required 
                value={pass2}
                onChange={(e) => handlePass2Change(e.target.value)}
              />
              <span className="err">Las contraseñas no coinciden.</span>
            </div>
          </div>
          
          <div className="strength-row">
            <div className="strength-bar">
              <span id="strength-fill" style={{ width: `${strengthPct}%`, background: strengthColor }}></span>
            </div>
            <span className="strength-label" id="strength-label">{strengthLabel}</span>
          </div>

          <div className="checkbox-row">
            <input 
              type="checkbox" 
              id="reg-terms" 
              required 
              checked={terms}
              onChange={(e) => setTerms(e.target.checked)}
            />
            <label htmlFor="reg-terms">
              Al registrarme, acepto los <a href="#" onClick={(e) => e.preventDefault()}>Términos de servicio</a> y el{' '}
              <a href="#" onClick={(e) => e.preventDefault()}>Aviso de privacidad</a> de Eurocentro.
            </label>
          </div>

          <button type="submit" className="btn btn-gold btn-block">Crear cuenta</button>
        </form>
      </div>
    </section>
  );
}
