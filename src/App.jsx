import React, { useEffect, useState } from 'react';
import api from './services/api';

// Login
import AuthModal from './Auth/AuthModal';

// Layout & UI Components
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import HeroSplit from './components/HeroSplit';
import PlansSection from './components/PlansSection';
import Footer from './components/Footer';
import DepartmentPagination from './components/DepartmentPagination';

// Chart & Metric Components
import MetricCard from './components/MetricCard';
import HistoricoChart from './components/HistoricoChart';
import RendimientoRadarChart from './components/RendimientoRadarChart';

import './App.css';

function App() {
  const [metricas, setMetricas] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [error, setError] = useState(null);
  const [departamentoActivo, setDepartamentoActivo] = useState('1');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authTab, setAuthTab] = useState('login'); 
  
  // 🎯 1. Usamos solo una variable de estado única para el usuario
  const [currentUser, setCurrentUser] = useState(null);

  // 🎯 2. Cargar usuario guardado en localStorage al iniciar la app
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

  const handleOpenAuthModal = (tab) => {
    setAuthTab(tab);
    setIsAuthModalOpen(true);
  };

  // 🎯 3. Función para Cerrar Sesión
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

  return (
    <div className="app-container">
      {/* 🎯 4. Pasamos currentUser y la función onLogout al Navbar */}
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

        {/* Rejilla Principal de Gráficos y Tarjetas */}
        <div className="main-grid">
          <div className="left-column">
            {/* Bloque 1: Gráfico Histórico */}
            <div className="wireframe-block-large">
              {datosHistorico.length > 0 ? (
                <HistoricoChart data={datosHistorico} />
              ) : (
                <p className="fallback-text">Cargando gráfico histórico...</p>
              )}
            </div>

            {/* Bloque 2: Gráfico de Radar */}
            <div className="wireframe-block-large">
              {datosTarjetas.length > 0 ? (
                <RendimientoRadarChart data={datosTarjetas} />
              ) : (
                <p className="fallback-text">Cargando matriz de rendimiento...</p>
              )}
            </div>

            {/* Bloque 3: Espacio disponible */}
            <div className="wireframe-block-large"></div>
          </div>

          <div className="right-column">
            {datosTarjetas.map((metrica) => (
              <MetricCard key={metrica.id} metric={metrica} />
            ))}
          </div>
        </div>

        {/* Paginador / Carrusel Inferior */}
        <DepartmentPagination 
          departamentos={departamentos} 
          activo={departamentoActivo} 
          onSelect={setDepartamentoActivo} 
        />
      </div>

      <div id="reporte"><HeroSplit /></div>
      <div id="niveles"><PlansSection /></div>
      <div id="contacto"><Footer /></div>
      
      {/* Modal de Autenticación */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        activeTab={authTab}
        onAuthSuccess={(user) => {
          // 🎯 5. Guardamos en el estado Y en localStorage
          setCurrentUser(user);
          localStorage.setItem('currentUser', JSON.stringify(user));
          setIsAuthModalOpen(false);
        }}
      />
    </div>
  );
}

export default App;