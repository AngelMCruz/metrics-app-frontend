import React, { useEffect, useState } from 'react';
import api from './services/api';

import AuthModal from './Auth/AuthModal';

import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import HeroSplit from './components/HeroSplit';
import PlansSection from './components/PlansSection';
import Footer from './components/Footer';
import DepartmentPagination from './components/DepartmentPagination';
import DepartmentBanner from './components/DepartmentBanner';

import MetricCard from './components/MetricCard';
import HistoricoChart from './components/HistoricoChart';
import RendimientoRadarChart from './components/RendimientoRadarChart';

import './App.css';

/**
 * Componente principal de la aplicación Dashboard de Métricas.
 *
 * @returns {JSX.Element} Estructura React completa de la aplicación.
 */
function App() {
  const [metricas, setMetricas] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [error, setError] = useState(null);
  const [departamentoActivo, setDepartamentoActivo] = useState('1');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authTab, setAuthTab] = useState('login'); 
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (err) {
        console.error('Error al parsear usuario de localStorage:', err);
        localStorage.removeItem('currentUser');
      }
    }
  }, []);

  /**
   * Abre el modal de autenticación fijando la pestaña seleccionada.
   *
   * @param {'login'|'register'} tab - Pestaña a mostrar inicialmente.
   */
  const handleOpenAuthModal = (tab) => {
    setAuthTab(tab);
    setIsAuthModalOpen(true);
  };

  /**
   * Cierra la sesión activa del usuario y remueve el registro en almacenamiento local.
   */
  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  useEffect(() => {
    api.get('/departamentos')
      .then(response => {
        setDepartamentos(response.data);
        if (response.data.length > 0) {
          setDepartamentoActivo(response.data[0].id.toString());
        }
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    if (!departamentoActivo) return;

    let ruta = '/metricas';
    if (departamentoActivo !== 'Todos') {
      ruta += `?departamento=${departamentoActivo}`;
    }

    api.get(ruta)
      .then(response => {
        setMetricas(response.data);
      })
      .catch(err => {
        console.error(err);
        setError('Error al obtener las métricas: ' + err.message);
      });
  }, [departamentoActivo]);

  const datosTarjetas = metricas.some(m => m.mes) 
    ? metricas.filter(m => m.mes === 'Actual') 
    : metricas;

  const datosHistorico = metricas.filter(m => m.mes && m.mes !== 'Actual');

  const departamentoNombreActual = departamentos.find(
    d => d.id.toString() === departamentoActivo
  )?.nombre || 'Sales';

  return (
    <div className="app-container">
      <Navbar 
        onLoginClick={() => handleOpenAuthModal('login')}
        onRegisterClick={() => handleOpenAuthModal('register')}
        currentUser={currentUser}
        onLogout={handleLogout}
      />
      
      <div id="inicio"><HeroSection /></div>

      <div className="content-wrapper">
        {error && <p className="error-message">{error}</p>}

        <div className="active-department-header">
          {departamentos.map((dept) => (
            <span
              key={dept.id}
              className={`dept-label ${departamentoActivo === dept.id.toString() ? 'active' : ''}`}
            >
              {dept.nombre}
            </span>
          ))}
        </div>

        <div className="main-grid">
          <div className="left-column">
            <div className="wireframe-block-large">
              {datosHistorico.length > 0 ? (
                <HistoricoChart data={datosHistorico} />
              ) : (
                <p className="fallback-text">Cargando gráfico histórico...</p>
              )}
            </div>

            <div className="wireframe-block-large">
              {datosTarjetas.length > 0 ? (
                <RendimientoRadarChart data={datosTarjetas} />
              ) : (
                <p className="fallback-text">Cargando matriz de rendimiento...</p>
              )}
            </div>

            <div className="wireframe-block-large">
              <DepartmentBanner departamentoNombre={departamentoNombreActual} />
            </div>

            <DepartmentPagination 
              departamentos={departamentos} 
              activo={departamentoActivo} 
              onSelect={setDepartamentoActivo} 
            />
          </div>

          <div className="right-column">
            {datosTarjetas.map((metrica) => (
              <MetricCard key={metrica.id} metric={metrica} />
            ))}
          </div>
        </div>

        
      </div>

      <div id="reporte"><HeroSplit /></div>
      <div id="niveles"><PlansSection /></div>
      <div id="contacto"><Footer /></div>
      
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        activeTab={authTab}
        onAuthSuccess={(user) => {
          setCurrentUser(user);
          localStorage.setItem('currentUser', JSON.stringify(user));
          setIsAuthModalOpen(false);
        }}
      />
    </div>
  );
}

export default App;