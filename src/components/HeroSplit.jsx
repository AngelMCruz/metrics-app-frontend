import React from 'react';
import '../styles/HeroSplit.css';

const HeroSplit = () => {
  return (
    <section className="hero-split-section">
      <div className="hero-split-text">
        <h2>Análisis de Cobertura Global</h2>
        <p>Visualización centralizada de la salud operativa y rendimiento financiero de tus 4 departamentos clave.</p>
        <button className="hero-btn">Ver Reporte</button>
      </div>
      
      <div className="hero-split-visual">
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
  );
};

export default HeroSplit;