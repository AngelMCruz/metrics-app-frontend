import React from 'react';
import '../styles/MetricCard.css';
import { BarChart2, TrendingUp, DollarSign, Activity, Percent, Clock } from 'lucide-react';

const getIconForMetric = (concepto) => {
  switch (concepto) {
    case 'revenue_impact':
      return <DollarSign size={16} />;
    case 'efficiency_rate':
      return <Percent size={16} />;
    case 'velocity_score':
      return <Clock size={16} />;
    default:
      return <BarChart2 size={16} />;
  }
};

function MetricCard({ metric }) {
  const { nombre_visual, valor_numerico, unidad, concepto } = metric;

  const formatearValor = () => {
    if (unidad === '$') return `$${Number(valor_numerico).toLocaleString()}`;
    if (unidad === 'M') return `$${valor_numerico}M`;
    return `${valor_numerico}${unidad === '%' || unidad === '/sem' ? unidad : ' ' + unidad}`;
  };

  return (
    <div className="metric-row-container">
      
      <div className="metric-visual-block">
        <span className="visual-value">{formatearValor()}</span>
        <div className="visual-icon">
          {getIconForMetric(concepto)}
        </div>
      </div>
      
      <div className="metric-text-block">
        <div className="metric-row-title">{nombre_visual}</div>
        <div className="metric-row-description">
          Indicador estratégico de rendimiento operativo para el concepto de {concepto.replace('_', ' ')}.
        </div>
        
        <div className="metric-badges">
          <span className="badge-dot"></span>
          <span className="badge-dot"></span>
        </div>
      </div>

    </div>
  );
}

export default MetricCard;