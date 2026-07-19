import React from 'react';
import { BarChart2, TrendingUp, DollarSign, Activity } from 'lucide-react';

// Funcion auxiliar para asignar iconos a cada métrica según su nombre
const getIconForMetric = (metricName) => {
  switch (metricName) {
    case 'Company Revenue':
      return <DollarSign size={16} />;
    case 'Customer Satisfaction':
      return <Activity size={16} />;
    case 'Customer Retention Rate':
      return <TrendingUp size={16} />;
    default:
      return <BarChart2 size={16} />;
  }
};

function MetricCard({ metric }) {
    return (
    <div className="metric-row-container">
      
      {/* BLOQUE OSCURO IZQUIERDO: Valor destacado e icono */}
      <div className="metric-visual-block">
        <span className="visual-value">{metric.valor_metrica}</span>
        <div className="visual-icon">
          {getIconForMetric(metric.titulo_reporte)}
        </div>
      </div>
      
      {/* BLOQUE DERECHO: Texto e indicadores */}
      <div className="metric-text-block">
        <div className="metric-row-title">{metric.titulo_reporte}</div>
        <div className="metric-row-description">{metric.descripcion}</div>
        
        {/* Los pequeños cuadros verdes que simulan el wireframe */}
        <div className="metric-badges">
          <span className="badge-dot"></span>
          <span className="badge-dot"></span>
        </div>
      </div>

    </div>
    );
}

export default MetricCard;