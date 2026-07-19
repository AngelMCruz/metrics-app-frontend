import React from 'react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip } from 'recharts';

const CustomRadarTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div style={{ 
                backgroundColor: 'rgba(10, 25, 47, 0.95)',
                border: '1px solid var(--accent-cyan)',
                padding: '10px',
                borderRadius: '6px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)'
            }}>
                <p style={{ color: 'var(--text-main)', margin: 0, fontSize: '0.9rem' }}>
                    <strong>{data.nombre_visual}</strong>
                </p>
                {/* Aquí se sigue mostrando el valor crudo original gracias a que no lo pisamos */}
                <p style={{ color: 'var(--text-light)', margin: 0, fontSize: '0.85rem' }}>
                    Valor: <span style={{ color: 'var(--accent-cyan)' }}>{data.valor_original}</span> {data.unidad}
                </p>
            </div>
        );
    }
    return null;
};

function RendimientoRadarChart({ data }) {
    if (!data || data.length === 0) return null;

    // Calculamos el máximo real del set de datos
    const maxValor = Math.max(...data.map(item => Number(item.valor_numerico) || 1));

    // Normalizamos sin romper el valor real para el tooltip
    const datosNormalizados = data.map(item => {
        const valor = Number(item.valor_numerico) || 0;
        const esPorcentaje = item.unidad === '%';
        const valorNormalizado = esPorcentaje ? valor : (valor / maxValor) * 100;
        
        return {
            ...item,
            valorNormalizado: valorNormalizado,
            valor_original: item.valor_numerico // Respaldamos el valor original para el tooltip
        };
    });

    return (
        <div style={{ 
            width: '100%', 
            height: '100%', 
            display: 'flex', 
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '12px'
        }}>
            <h3 style={{
                color: 'var(--text-main)',
                fontSize: '0.95rem',
                margin: '0 0 10px 0',
                fontWeight: '600',
                textAlign: 'left'
            }}>
                Balance de Rendimiento Actual
            </h3>

            <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center' }}>
                {/* 1. CORRECCIÓN: Pasamos 'datosNormalizados' en lugar de 'data' */}
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" radius="60%" data={datosNormalizados}>
                        <PolarGrid stroke="rgba(255, 255, 255, 0.15)" />
                        
                        <PolarAngleAxis 
                            dataKey="nombre_visual" 
                            tick={{ fill: '#e2e8f0', fontSize: 10, fontWeight: '500' }}
                        />
                        
                        {/* 2. CORRECCIÓN: Como escalamos todo a base 100, el dominio va fijo de 0 a 100 */}
                        <PolarRadiusAxis 
                            angle={90} 
                            domain={[0, 100]} 
                            tick={false}
                            axisLine={false}
                        />

                        <Tooltip content={<CustomRadarTooltip />} />

                        {/* 3. CORRECCIÓN: Vinculamos el Radar a la propiedad normalizada */}
                        <Radar 
                            name="Rendimiento" 
                            dataKey="valorNormalizado" 
                            stroke="var(--accent-cyan)" 
                            fill="var(--accent-cyan)" 
                            fillOpacity={0.4} 
                        />
                    </RadarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default RendimientoRadarChart;