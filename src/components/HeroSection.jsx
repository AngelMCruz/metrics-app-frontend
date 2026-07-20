import React from 'react';
import './HeroSection.css';

const HeroSection = () => {
  const scrollToDashboard = () => {
    const dashboardSection = document.querySelector('.content-wrapper');
    if (dashboardSection) {
      dashboardSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-section">
      <div className="hero-container">
        
        {/* Columna Izquierda: Mensaje principal */}
        <div className="hero-content">
          <span className="hero-badge">PLATAFORMA ANALÍTICA</span>
          <h1>Metrics Dashboard</h1>
          <p>
            Visualización estructurada de analítica y rendimiento organizacional bajo arquitectura desacoplada.
          </p>
          <button className="hero-btn" onClick={scrollToDashboard}>
            Explorar Dashboard ↓
          </button>
        </div>

        {/* Columna Derecha: Tarjetas/KPIs flotantes de muestra para llenar el espacio */}
        <div className="hero-preview">
          <div className="preview-card">
            <span className="preview-label">Disponibilidad API</span>
            <span className="preview-value">99.9%</span>
          </div>
          <div className="preview-card highlight">
            <span className="preview-label">Departamentos</span>
            <span className="preview-value">4 Activos</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;