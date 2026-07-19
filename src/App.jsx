import React, { useEffect, useState } from 'react';
import api from './services/api';
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

  return (
    <div className="app-container">
      
      <header className="navbar">
        <div className="navbar-logo"></div>
        <div className="navbar-links">
          <div className="nav-dot active"></div>
          <div className="nav-dot"></div>
          <div className="nav-dot"></div>
          <div className="nav-dot"></div>
        </div>
      </header>

      <section className="hero-section">
        <div className="hero-content">
          <h1>Metrics Dashboard</h1>
          <p>Visualización estructurada de analítica y rendimiento organizacional bajo arquitectura desacoplada.</p>
          <button className="hero-btn">Explorar</button>
        </div>
      </section>

      <div className="content-wrapper">
        
        {error && <p className="error-message">{error}</p>}

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

        <div className="main-grid">
          
          <div className="left-column">
            {/* Bloque 1: Gráfico Histórico */}
            <div className="wireframe-block-large">
              {datosHistorico.length > 0 ? (
                <HistoricoChart data={datosHistorico} />
              ) : (
                <p className="fallback-text">
                  Ajusta tu Backend a la tabla 'metricas_homogeneas' para activar el gráfico histórico.
                </p>
              )}
            </div>

            {/* Bloque 2: Gráfico de Radar */}
            <div className="wireframe-block-large">
              {datosTarjetas.length > 0 ? (
                <RendimientoRadarChart data={datosTarjetas} />
              ) : (
                <p className="fallback-text">
                  Cargando matriz de rendimiento...
                </p>
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
      </div>

      <footer className="footer">
        <div className="footer-dots">
          <div className="footer-dot"></div>
          <div className="footer-dot"></div>
          <div className="footer-dot"></div>
        </div>
      </footer>

    </div>
  );
}

export default App;