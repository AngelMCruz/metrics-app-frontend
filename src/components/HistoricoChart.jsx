import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

function HistoricoChart({ data }) {
  const formatearMonedaCorta = (valor) => {
    if (valor >= 1000000) return `$${(valor / 1000000).toFixed(1)}M`;
    if (valor >= 1000) return `$${(valor / 1000).toFixed(0)}K`;
    return `$${valor}`;
  };

  const FormatearValor = (valor, unidad) => {
    return unidad === '$' ? `$${valor}` : `${valor} ${unidad}`;
  };

  if (!data || data.length === 0) return null; 
  // Obtenemos el nombre visual y la unidad del primer elemento para los textos del gráfico
  const nombreMetrica = data[0]?.nombre_visual || 'Métrica';
  const unidad = data[0]?.unidad || '';

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
      
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
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
            axisLine={false}
          />
          
          <YAxis 
            stroke="var(--text-light)" 
            fontSize={11}
            tickLine={false}
            axisLine={false}
            dy={10}
            tickFormatter={unidad === '$' ? formatearMonedaCorta : undefined}
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