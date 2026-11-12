import { useNavigate } from 'react-router-dom';
import { Mail } from 'lucide-react';

export default function CheckEmail() {
  const navigate = useNavigate();

  return (
    <div className="auth-wrap">
      <div className="auth-box" style={{ textAlign: 'center', padding: '40px 20px' }}>
        
        <Mail size={64} style={{ color: '#3b82f6', margin: '0 auto 20px' }} />
        
        <h2 style={{ marginBottom: '15px' }}>¡Revisa tu bandeja de entrada!</h2>
        
        <p style={{ marginBottom: '15px', color: 'var(--text-color)', lineHeight: '1.5' }}>
          Hemos enviado un enlace de verificación a tu correo electrónico.
        </p>
        
        <p style={{ marginBottom: '30px', color: 'var(--muted)', fontSize: '0.9em' }}>
          Por favor, haz clic en el enlace para activar tu cuenta de Embajador. 
          <br/><br/>
          <em>Nota: Si no lo ves en unos minutos, no olvides revisar tu carpeta de Spam o Correo no deseado.</em>
        </p>
        
        <button className="btn btn-outline" onClick={() => navigate('/login')} style={{ width: '100%' }}>
          Volver a Iniciar Sesión
        </button>

      </div>
    </div>
  );
}