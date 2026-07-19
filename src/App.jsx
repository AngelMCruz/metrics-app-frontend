import React, { useEffect, useState } from 'react';
import api from './services/api';
import './App.css';

function App() {
  const [metricas, setMetricas] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Petición al backend para obtener las métricas
    api.get('/metricas')
      .then(response => {
        setMetricas(response.data);
      })
      .catch(err => {
        console.error('Error al obtener las métricas:', err);
        setError('Error al obtener las métricas: ' + err.message);
      });
  }, []);

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
        
        {error && <p style={{ color: 'red' }}>{error}</p>}

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
            <div className="wireframe-card-small"></div>
            <div className="wireframe-card-small"></div>
            <div className="wireframe-card-small"></div>
            <div className="wireframe-card-small"></div>
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