import { useEffect, useState, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle } from 'lucide-react';

export default function VerificarCuenta() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [estado, setEstado] = useState('cargando');
  const [mensaje, setMensaje] = useState('Verificando tu cuenta...');
  
  const peticionEnviada = useRef(false);

  useEffect(() => {
    if (peticionEnviada.current) return;

    const token = searchParams.get('token');

    if (!token) {
      setEstado('error');
      setMensaje('Enlace de verificación inválido o incompleto.');
      return;
    }

    peticionEnviada.current = true;

    fetch(`http://localhost:8080/api/usuarios/verificar?token=${token}`, {
      method: 'GET'
    })
      .then(async (res) => {
        const text = await res.text();
        if (res.ok) {
          setEstado('exito');
          setMensaje(text);
        } else {
          setEstado('error');
          setMensaje(text);
        }
      })
      .catch((error) => {
        console.error('Error al verificar:', error);
        setEstado('error');
        setMensaje('Error de conexión con el servidor. Intenta de nuevo más tarde.');
      });
  }, [searchParams]);

  return (
    <div className="auth-wrap">
      <div className="auth-box" style={{ textAlign: 'center', padding: '40px 20px' }}>
        
        {estado === 'cargando' && (
          <div>
            <div className="spinner" style={{ margin: '0 auto 20px' }}></div>
            <h2>Validando...</h2>
            <p>{mensaje}</p>
          </div>
        )}

        {estado === 'exito' && (
          <div>
            <CheckCircle size={64} style={{ color: '#10b981', margin: '0 auto 20px' }} />
            <h2>¡Cuenta Verificada!</h2>
            <p style={{ marginBottom: '25px', color: 'var(--muted)' }}>{mensaje}</p>
            <button className="btn btn-gold" onClick={() => navigate('/login')} style={{ width: '100%' }}>
              Ir a Iniciar Sesión
            </button>
          </div>
        )}

        {estado === 'error' && (
          <div>
            <XCircle size={64} style={{ color: '#ef4444', margin: '0 auto 20px' }} />
            <h2>Verificación fallida</h2>
            <p style={{ marginBottom: '25px', color: 'var(--muted)' }}>{mensaje}</p>
            <button className="btn btn-outline" onClick={() => navigate('/login')} style={{ width: '100%' }}>
              Volver al Inicio
            </button>
          </div>
        )}

      </div>
    </div>
  );
}