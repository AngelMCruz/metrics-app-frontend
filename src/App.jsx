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


      {/* 1. Hero Split (50/50) */}
      <section className="hero-split-section">
        <div className="hero-split-text">
          <h2>Análisis de Cobertura Global</h2>
          <p>Visualización centralizada de la salud operativa y rendimiento financiero de tus 4 departamentos clave.</p>
          <button className="hero-btn">Ver Reporte</button>
        </div>
        
        <div className="hero-split-visual">
          {/* Ilustración mediante tarjetas internas oscuras */}
          <div style={{
            backgroundColor: 'var(--bg-dark)',
            padding: '20px',
            borderRadius: '8px',
            width: '80%',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
            color: '#ffffff'
          }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', fontWeight: '600' }}>
              REPORTE EJECUTIVO
            </span>
            <h4 style={{ margin: '5px 0 10px 0', fontSize: '0.95rem' }}>Estatus del Sistema</h4>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '8px' }}>
              <span>Integración API:</span>
              <strong style={{ color: '#10b981' }}>100% Activa</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginTop: '6px' }}>
              <span>Métricas homogeinizadas:</span>
              <strong style={{ color: 'var(--accent-cyan)' }}>16 / 16</strong>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Tarjetas Triples de Características / Planes */}
      <section className="plans-section">
  
        {/* Tarjeta Izquierda - Básico */}
        <div className="plan-card">
          <div className="plan-header">Nivel Básico</div>
          <ul className="plan-list">
            <li><span className="check-icon">✓</span> Métricas por departamento</li>
            <li><span className="check-icon">✓</span> Visualización de tarjetas KPI</li>
            <li><span className="check-icon">✓</span> Filtro dinámico en tiempo real</li>
            <li><span className="check-icon">✓</span> Formateo visual de unidades</li>
            <li><span className="check-icon">✓</span> Acceso a datos del mes actual</li>
            <li><span className="check-icon">✓</span> Consumo de API REST base</li>
            <li><span className="check-icon">✓</span> Soporte estándar de red</li>
          </ul>
        </div>

        {/* Tarjeta Central Destacada - Pro */}
        <div className="plan-card featured">
          <div className="plan-header">Nivel Pro</div>
          <ul className="plan-list">
            <li><span className="check-icon">✓</span> Todo lo incluido en Básico</li>
            <li><span className="check-icon">✓</span> Gráfico histórico de área</li>
            <li><span className="check-icon">✓</span> Balance de rendimiento (Radar)</li>
            <li><span className="check-icon">✓</span> Normalización dinámica de datos</li>
            <li><span className="check-icon">✓</span> Tooltips e interacción avanzada</li>
            <li><span className="check-icon">✓</span> Desglose por 4 áreas clave</li>
            <li><span className="check-icon">✓</span> Rejilla de métricas homogéneas</li>
            <li><span className="check-icon">✓</span> Actualización en caliente</li>
          </ul>
        </div>

        {/* Tarjeta Derecha - Empresarial */}
        <div className="plan-card">
          <div className="plan-header">Empresarial</div>
          <ul className="plan-list">
            <li><span className="check-icon">✓</span> Todo lo incluido en Nivel Pro</li>
            <li><span className="check-icon">✓</span> Base de datos Supabase (3NF)</li>
            <li><span className="check-icon">✓</span> Arquitectura serverless en Vercel</li>
            <li><span className="check-icon">✓</span> Endpoints CRUD completos</li>
            <li><span className="check-icon">✓</span> Integración multi-departamento</li>
            <li><span className="check-icon">✓</span> Alta disponibilidad y SLA</li>
            <li><span className="check-icon">✓</span> Seguridad y variables seguras</li>
          </ul>
        </div>

      </section>


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