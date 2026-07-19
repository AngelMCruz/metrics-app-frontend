import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

function HistoricoChart({ data }) {
  
  if (!data || data.length === 0) {
    return <p style={{ color: 'var(--text-light)', padding: '20px' }}>Cargando datos históricos...</p>;
  }

  // Obtenemos el nombre visual y la unidad del primer elemento para los textos del gráfico
  const nombreMetrica = data[0].nombre_visual;
  const unidad = data[0].unidad;

  return (
    <div style={{ width: '100%', height: '100%', minHeight: '220px', padding: '10px' }}>
      <h3 style={{ 
        color: 'var(--text-main)', 
        fontSize: '0.95rem', 
        marginBottom: '15px',
        fontWeight: '600'
      }}>
        Histórico Mensual: {nombreMetrica}
      </h3>
      
      <ResponsiveContainer width="100%" height={180}>
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            {/* Gradiente cian brillante para el fondo del gráfico */}
            <linearGradient id="colorCian" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--accent-cyan)" stopOpacity={0.2}/>
              <stop offset="95%" stopColor="var(--accent-cyan)" stopOpacity={0}/>
            </linearGradient>
          </defs>
          
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" />
          
          <XAxis 
            dataKey="mes" 
            stroke="var(--text-light)" 
            fontSize={11}
            tickLine={false} 
          />
          
          <YAxis 
            stroke="var(--text-light)" 
            fontSize={11}
            tickLine={false}
            axisLine={false}
          />
          
          {/* Tooltip personalizado con la estética oscura del dashboard */}
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#0d1b2a', 
              borderColor: 'var(--accent-cyan)',
              borderRadius: '6px',
              color: 'var(--text-main)',
              fontSize: '0.85rem'
            }} 
            formatter={(value) => [`${unidad === '$' ? '$' : ''}${value}${unidad !== '$' ? ' ' + unidad : ''}`, nombreMetrica]}
          />
          
          {/* Línea principal con efecto de área rellena */}
          <Area 
            type="monotone" 
            dataKey="valor_numerico" 
            stroke="var(--accent-cyan)" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorCian)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default HistoricoChart;