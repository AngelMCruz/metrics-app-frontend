import React from 'react';
import '../styles/DepartmentBanner.css';

import activeSupportImg from '../assets/active-support_drwa.svg';
import analyticsImg from '../assets/analytics_draw.svg';
import businessImg from '../assets/business_draw.svg';
import customerImg from '../assets/customer_draw.svg';
import engineeringTeamImg from '../assets/engineering-team_draw.svg';
import questionsImg from '../assets/questions_draw.svg';
import reviewingImg from '../assets/reviewing_draw.svg';
import techImg from '../assets/tech_draw.svg';

/**
 * Mapa conceptual de recursos visuales y descriptivos por departamento.
 */
const DEPARTMENT_RESOURCE_MAP = {
  Sales: {
    image: businessImg,
    title: 'Optimización de Ventas',
    description: 'Monitoreo en tiempo real del ciclo de conversión y pipeline comercial.'
  },
  Marketing: {
    image: analyticsImg,
    title: 'Estrategia y Métricas',
    description: 'Análisis del alcance de campañas, conversión y métricas de adquisición.'
  },
  Support: {
    image: activeSupportImg,
    title: 'Soporte y Atención',
    description: 'Métricas de tiempo de respuesta, resolución y satisfacción del cliente.'
  },
  Engineering: {
    image: engineeringTeamImg,
    title: 'Infraestructura y Código',
    description: 'Rendimiento del sistema, despliegues y salud general de los servicios API.'
  }
};

/**
 * Componente que despliega un banner informativo con ilustración SVG asociada al departamento seleccionado.
 *
 * @param {Object} props
 * @param {string} props.departamentoNombre - Nombre del departamento activo en el dashboard.
 * @returns {JSX.Element} Elemento React con el banner e ilustración adaptados.
 */
const DepartmentBanner = ({ departamentoNombre }) => {
  const resource = DEPARTMENT_RESOURCE_MAP[departamentoNombre] || {
    image: techImg,
    title: 'Panel Operativo Global',
    description: 'Métricas consolidadas de rendimiento corporativo para la toma de decisiones.'
  };

  return (
    <div className="department-banner-card">
      <div className="banner-content">
        <span className="banner-tag">Área Funcional</span>
        <h3 className="banner-title">{resource.title}</h3>
        <p className="banner-description">{resource.description}</p>
      </div>
      <div className="banner-illustration-wrapper">
        <img 
          src={resource.image} 
          alt={`Ilustración de ${departamentoNombre}`} 
          className="banner-illustration"
        />
      </div>
    </div>
  );
};

export default DepartmentBanner;