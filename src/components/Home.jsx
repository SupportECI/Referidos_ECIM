import { useNavigate } from 'react-router-dom';
import StarRing from './StarRing';

export default function Home() {
  const navigate = useNavigate();

  return (
    <section className="screen active" id="screen-home">
      <div className="home-header">
        <div className="brand" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <div className="brand-mark">
            <StarRing size={34} radius={15} color="#F5EACB" />
          </div>
          <div className="brand-text">
            <span className="euro">Embajadores Euro</span>
            <span className="sub">Eurocentro de Idiomas</span>
          </div>
        </div>
        <button 
          className="btn btn-outline" 
          style={{ borderColor: 'rgba(255,255,255,.5)', color: '#fff' }} 
          onClick={() => navigate('/login')}
        >
          Ya tengo cuenta
        </button>
      </div>

      <div className="hero">
        <div className="star-ring watermark spin" style={{ top: '-60px', right: '-60px', position: 'absolute' }}>
          <StarRing size={260} radius={80} color="#F5EACB" />
        </div>
        <div className="hero-inner">
          <span className="eyebrow">Programa de referidos</span>
          <h1>Embajadores Euro</h1>
          <p className="hook">Recomienda y Gana $1,000</p>
          <p className="desc">
            ¿Conoces a alguien que quiere aprender un nuevo idioma? Recomiéndalo con Eurocentro de Idiomas y gana $1,000 por cada persona que se inscriba.
          </p>
          <div className="lang-pills">
            <span className="lang-pill">Inglés</span>
            <span className="lang-pill">Francés</span>
            <span className="lang-pill">Italiano</span>
          </div>
          <div className="cta">
            <button className="btn btn-gold" onClick={() => navigate('/register')}>
              Quiero ser Embajador
            </button>
          </div>
        </div>
      </div>

      <div className="alumno-note">
        <span className="dot"></span>
        <p><strong>¿Eres alumno actual de Eurocentro?</strong> Puedes elegir que tu bono se aplique directo a tu colegiatura.</p>
      </div>

      <div className="home-footer-link">
        ¿Ya tienes cuenta de Embajador? <button onClick={() => navigate('/login')}>Inicia sesión</button>
      </div>
    </section>
  );
}
