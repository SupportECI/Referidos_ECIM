import { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Referral from './components/Referral';
import Admin from './components/Admin';
import Modal from './components/Modal';
import WhatsAppFloat from './components/WhatsAppFloat';
import Toast from './components/Toast';

export default function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Initial referrals based on the original HTML mock rows
  const [referrals, setReferrals] = useState([
    {
      id: 3,
      nombre: 'Ana Torres',
      wpp: '993 456 7890',
      estado: 'Tabasco',
      modalidad: 'Online',
      idioma: 'Italiano',
      fecha: '12/07/2026',
      estatus: 'pendiente',
      referrer: {
        nombre: 'Andrés',
        apellido: 'García',
        correo: 'andres@correo.com',
        wpp: '961 123 4567',
        relacion: 'papa'
      }
    },
    {
      id: 2,
      nombre: 'Carlos Ramírez',
      wpp: '55 9876 5432',
      estado: 'Ciudad de México',
      modalidad: 'Online',
      idioma: 'Francés',
      fecha: '08/07/2026',
      estatus: 'contactado',
      referrer: {
        nombre: 'Andrés',
        apellido: 'García',
        correo: 'andres@correo.com',
        wpp: '961 123 4567',
        relacion: 'papa'
      }
    },
    {
      id: 1,
      nombre: 'María López',
      wpp: '961 123 4567',
      estado: 'Chiapas',
      modalidad: 'Presencial',
      idioma: 'Inglés',
      fecha: '02/07/2026',
      estatus: 'inscrito',
      referrer: {
        nombre: 'Andrés',
        apellido: 'García',
        correo: 'andres@correo.com',
        wpp: '961 123 4567',
        relacion: 'papa'
      }
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '' });

  const triggerToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => {
      setToast({ show: false, message: '' });
    }, 2600);
  };

  const handleLogin = (credentials) => {
    setUser({
      nombre: 'Andrés',
      apellido: 'García',
      correo: credentials.correo,
      wpp: '961 123 4567',
      relacion: 'papa'
    });
    navigate('/dashboard');
    triggerToast('¡Bienvenido de nuevo, Embajador!');
  };

  const handleRegister = (userData) => {
    setUser(userData);
    navigate('/dashboard');
    triggerToast('Cuenta creada. ¡Bienvenido, Embajador!');
  };

  const handleAddReferral = (newRef) => {
    setReferrals([newRef, ...referrals]);
    navigate('/dashboard');
    triggerToast('Referido registrado. Le daremos seguimiento.');
  };

  const handleUpdateReferralStatus = (id, newStatus) => {
    setReferrals((prev) => 
      prev.map((ref) => (ref.id === id ? { ...ref, estatus: newStatus } : ref))
    );
    triggerToast('Estatus actualizado correctamente.');
  };

  return (
    <div className="app-shell">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register onRegister={handleRegister} />} />
        
        {/* Protected Dashboard Route */}
        <Route 
          path="/dashboard" 
          element={
            user ? (
              <Dashboard 
                user={user} 
                referrals={referrals} 
                onOpenModal={() => setIsModalOpen(true)}
              />
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />
        
        {/* Protected Referral Route */}
        <Route 
          path="/referral" 
          element={
            user ? (
              <Referral 
                user={user} 
                onAddReferral={handleAddReferral} 
              />
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />

        {/* Admin Panel Route */}
        <Route 
          path="/admin" 
          element={
            <Admin 
              referrals={referrals} 
              onUpdateStatus={handleUpdateReferralStatus} 
            />
          } 
        />

        {/* Fallback route redirecting to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Shared/Persistent Widgets */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <WhatsAppFloat />
      <Toast show={toast.show} message={toast.message} />
    </div>
  );
}
