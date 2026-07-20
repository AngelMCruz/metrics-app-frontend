import React, { useEffect, useState } from 'react';
import api from './services/api';

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

  // Obtener el nombre del departamento seleccionado actualmente
  const departamentoNombreActual = departamentos.find(
    d => d.id.toString() === departamentoActivo
  )?.nombre || 'General';

  return (
    <div className="app-container">
      <Navbar />
      <HeroSection />

      <div className="content-wrapper">
        {error && <p className="error-message">{error}</p>}

        {/* Encabezado dinámico con las pestañas de selección */}
        <div className="filters-container">
          {departamentos.map((dept) => (
            <button
              key={dept.id}
              className={`filter-tab ${departamentoActivo === dept.id.toString() ? 'active' : ''}`}
              onClick={() => setDepartamentoActivo(dept.id.toString())}
            >
              {dept.nombre}
            </button>
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

            {/* Bloque 3: Espacio disponible / Tercer gráfico */}
            <div className="wireframe-block-large"></div>
          </div>

          <div className="right-column">
            {datosTarjetas.map((metrica) => (
              <MetricCard key={metrica.id} metric={metrica} />
            ))}
          </div>
        </div>

        {/* Paginador / Carrusel Inferior sincronizado */}
        <DepartmentPagination 
          departamentos={departamentos} 
          activo={departamentoActivo} 
          onSelect={setDepartamentoActivo} 
        />
      </div>

      <HeroSplit />
      <PlansSection />
      <Footer />
    </div>
  );
}

export default App;