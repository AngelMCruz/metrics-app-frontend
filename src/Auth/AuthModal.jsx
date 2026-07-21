import React, { useState, useEffect } from 'react';
import '../styles/AuthModal.css';

// URL base de la API estandarizada (Apunta a la raíz /api)
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

/**
 * Componente de modal para la autenticación y registro de usuarios.
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - Estado que controla la visibilidad del modal.
 * @param {Function} props.onClose - Función callback para cerrar el modal.
 * @param {'login'|'register'} [props.activeTab='login'] - Pestaña inicial que se mostrará activa.
 * @param {Function} props.onAuthSuccess - Callback ejecutado tras completar con éxito la autenticación.
 * @returns {JSX.Element|null} Elemento JSX del modal o null si isOpen es false.
 */
const AuthModal = ({ isOpen, onClose, activeTab: initialTab = 'login', onAuthSuccess }) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nombre: '',
    role: 'user'
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab, isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setMessage({ type: '', text: '' });
      setFormData({
        email: '',
        password: '',
        nombre: '',
        role: 'user'
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  /**
   * Maneja los cambios en los campos del formulario.
   *
   * @param {React.ChangeEvent<HTMLInputElement|HTMLSelectElement>} e - Evento de cambio de input.
   */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  /**
   * Actualiza la pestaña activa y reinicia los mensajes de estado.
   *
   * @param {'login'|'register'} tab - Nombre de la pestaña seleccionada.
   */
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setMessage({ type: '', text: '' });
  };

  /**
   * Envía las credenciales del formulario al backend según la pestaña activa.
   *
   * @param {React.FormEvent<HTMLFormElement>} e - Evento de envío del formulario.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });
    setLoading(true);

    // Normaliza la URL base para asegurar que termine en /api sin duplicar barras
    const cleanBaseUrl = API_BASE.replace(/\/+$/, '');
    
    // Construcción explícita de las rutas de autenticación
    const endpoint = activeTab === 'register' 
      ? `${cleanBaseUrl}/auth/register` 
      : `${cleanBaseUrl}/auth/login`;

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Ocurrió un error al procesar la solicitud');
      }

      if (activeTab === 'register') {
        setMessage({
          type: 'success',
          text: `¡Usuario (${formData.role.toUpperCase()}) registrado con éxito!`
        });
      } else {
        setMessage({
          type: 'success',
          text: `¡Bienvenido de nuevo, ${data.session?.user?.nombre || data.session?.user?.email}!`
        });
      }

      setTimeout(() => {
        if (onAuthSuccess) {
          onAuthSuccess(activeTab === 'register' ? data.user : data.session.user);
        }
        onClose();
      }, 1200);

    } catch (err) {
      setMessage({
        type: 'error',
        text: err.message || 'Error de conexión con el servidor'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal-card" onClick={(e) => e.stopPropagation()}>
        
        <button className="modal-close-btn" onClick={onClose}>&times;</button>

        <div className="auth-tabs">
          <button 
            type="button"
            className={`auth-tab ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => handleTabChange('login')}
          >
            Iniciar Sesión
          </button>
          <button 
            type="button"
            className={`auth-tab ${activeTab === 'register' ? 'active' : ''}`}
            onClick={() => handleTabChange('register')}
          >
            Regístrate
          </button>
        </div>

        {message.text && (
          <div className={`auth-alert ${message.type}`}>
            {message.text}
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          {activeTab === 'register' && (
            <>
              <div className="form-group">
                <label>Nombre Completo</label>
                <input 
                  type="text" 
                  name="nombre" 
                  placeholder="Ej. Ángel Molina" 
                  value={formData.nombre} 
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Rol de Usuario <br />
                  <span>Este apartado es unicamente demostrativo</span>
                </label>
                <select 
                  name="role" 
                  value={formData.role} 
                  onChange={handleChange}
                  className="role-select"
                >
                  <option value="user">Usuario Estándar (Lectura)</option>
                  <option value="admin">Administrador (Control)</option>
                </select>
              </div>
            </>
          )}

          <div className="form-group">
            <label>Correo Electrónico</label>
            <input 
              type="email" 
              name="email" 
              placeholder="usuario@empresa.com" 
              value={formData.email} 
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Contraseña</label>
            <input 
              type="password" 
              name="password" 
              placeholder="••••••••" 
              value={formData.password} 
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="auth-submit-btn" disabled={loading}>
            {loading ? 'Procesando...' : (activeTab === 'login' ? 'Acceder' : 'Registrar Cuenta')}
          </button>
        </form>

      </div>
    </div>
  );
};

export default AuthModal;