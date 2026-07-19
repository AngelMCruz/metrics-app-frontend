import React, { useEffect, useState } from 'react';
import api from './services/api';
import MetricCard from './components/MetricCard';
import './App.css';

function App() {
  const [metricas, setMetricas] = useState([]);
  const [error, setError] = useState(null);
  // 1. Mantenemos "Todos" en coherencia con el arreglo de abajo
  const [departamentoActivo, setDepartamentoActivo] = useState('1');

  useEffect(() => {
    let ruta = '/metricas';

    if (departamentoActivo !== 'Todos') {
      ruta += `?departamento=${departamentoActivo}`;
    }

    api.get(ruta)
      .then(response => {
        setMetricas(response.data);
      })
      .catch(err => {
        console.error('Error al obtener las métricas:', err);
        setError('Error al obtener las métricas: ' + err.message);
      });
  }, [departamentoActivo]);

  return (
    <div className="app-container">
      
      {/* 1. NAVBAR SUPERIOR */}
      <header className="navbar">
        <div className="navbar-logo"></div>
        <div className="navbar-links">
          <div className="nav-dot active"></div>
          <div className="nav-dot"></div>
          <div className="nav-dot"></div>
          <div className="nav-dot"></div>
        </div>
      </header>

      {/* 2. HERO SECTION OSCURA */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Metrics Dashboard</h1>
          <p>Visualización estructurada de analítica y rendimiento organizacional bajo arquitectura desacoplada.</p>
          <button className="hero-btn">Explorar</button>
        </div>
      </section>

      {/* CONTENEDOR CENTRAL */}
      <div className="content-wrapper">
        
        {/* CORREGIDO: Usamos className en lugar de style mal estructurado */}
        {error && <p className="error-message">{error}</p>}

        {/* CORREGIDO: Agregada la 's' a filters-container para enlazar el CSS */}
        <div className="filters-container">
          {/* CORREGIDO: Cambiado 'Todas' por 'Todos' para coincidir con el estado inicial */}
          {[
            { id: '1', nombre: 'Sales' },
            { id: '2', nombre: 'Marketing' },
            { id: '3', nombre: 'Support' },
            { id: '4', nombre: 'Engineering' }
          ].map((dept) => (
            <button
              key={dept.id}
              className={`filter-tab ${departamentoActivo === dept.id ? 'active' : ''}`}
              onClick={() => setDepartamentoActivo(dept.id)}
            >
              {dept.nombre}
            </button>
          ))}
        </div>

        {/* 3. GRID DE DOS COLUMNAS */}
        <div className="main-grid">
          
          {/* Columna Izquierda: Bloques Grandes */}
          <div className="left-column">
            <div className="wireframe-block-large"></div>
            <div className="wireframe-block-large"></div>
            <div className="wireframe-block-large"></div>
          </div>

          {/* Columna Derecha: Tarjetas Pequeñas */}
          <div className="right-column">
            {metricas.map((metrica) => (
              <MetricCard key={metrica.id} metric={metrica} />
            ))}
          </div>
        </div>
      </div>

      {/* 4. FOOTER */}
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