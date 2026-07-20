import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

export default function Login({ onLogin }) {
  const [correo, setCorreo] = useState('');
  const [pass, setPass] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!e.currentTarget.checkValidity()) {
      e.currentTarget.reportValidity();
      return;
    }

    onLogin({ correo, pass });
  };

  return (
    <section className="screen active" id="screen-login">
      <Header showBackToHome={true} />

      <div className="page">
        <div className="page-head">
          <h2>Inicia sesión</h2>
          <p className="sub">Ingresa tus datos para acceder a tu historial de referidos y registrar nuevos.</p>
        </div>

        <form className="card" id="form-login" noValidate onSubmit={handleSubmit}>
          <h3>Ingresa tus credenciales</h3>

          <div className="field">
            <label htmlFor="login-correo">Correo electrónico*</label>
            <input 
              id="login-correo" 
              type="email" 
              placeholder="demo@correo.com" 
              required 
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="login-pass">Contraseña*</label>
            <input 
              id="login-pass" 
              type="password" 
              placeholder="••••••••" 
              required 
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-gold btn-block" style={{ marginTop: '10px' }}>
            Iniciar sesión
          </button>

          <div className="home-footer-link" style={{ paddingBottom: '0', marginTop: '20px' }}>
            ¿No tienes cuenta?{' '}
            <button 
              type="button" 
              onClick={() => navigate('/register')} 
              style={{ fontWeight: 600, color: 'var(--navy-800)', textDecoration: 'underline', background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
            >
              Regístrate aquí
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
