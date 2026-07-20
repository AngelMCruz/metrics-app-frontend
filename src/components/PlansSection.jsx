import React from 'react';
import '../styles/PlansSection.css';

const PlansSection = () => {
  return (
    <section className="plans-section">
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
  );
};

export default PlansSection;