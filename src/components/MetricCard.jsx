import React from 'react';
import '../styles/MetricCard.css';
import { BarChart2, DollarSign, Percent, Clock } from 'lucide-react';

/**
 * Retorna el ícono de Lucide React asociado al concepto de la métrica.
 *
 * @param {string} concepto - Identificador del concepto clave de la métrica.
 * @returns {JSX.Element} Componente de ícono de Lucide.
 */
const getIconForMetric = (concepto) => {
  switch (concepto) {
    case 'revenue_impact':
      return <DollarSign size={18} />;
    case 'efficiency_rate':
      return <Percent size={18} />;
    case 'velocity_score':
      return <Clock size={18} />;
    default:
      return <BarChart2 size={18} />;
  }
};

/**
 * Componente que renderiza una tarjeta de métrica individual con indicador visual e información contextual.
 *
 * @param {Object} props
 * @param {Object} props.metric - Objeto con los datos de la métrica a desplegar.
 * @returns {JSX.Element} Elemento React de la tarjeta de métrica.
 */
function MetricCard({ metric }) {
  const { nombre_visual, valor_numerico, unidad, concepto } = metric;

  /**
   * Formatea el valor numérico según la unidad correspondiente.
   *
   * @returns {string} Valor numérico formateado.
   */
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
          Indicador estratégico de rendimiento operativo para el concepto de {concepto ? concepto.replace('_', ' ') : 'analítica'}.
        </div>
        
        <div className="metric-badges">
          <span className="badge-dot pulse"></span>
          <span className="badge-dot"></span>
        </div>
      </div>
    </div>
  );
}

export default MetricCard;