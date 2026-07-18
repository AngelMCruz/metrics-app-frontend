import React, { useEffect, useState } from 'react';
import api from './services/api';

function App() {
  const [metricas, setMetricas] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Petición al backend para obtener las métricas
    api.get('/metricas')
      .then(response => {
        setMetricas(response.data);
      })
      .catch(err => {
        console.error('Error al obtener las métricas:', err);
        setError('Error al obtener las métricas: ' + err.message);
      });
  }, []);
  
  if (error) {
    return (
      <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>
        <h1>metrics-app-frontend</h1>
        <p style={{ color: 'red' }}>{error}</p>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '30px', color: '#002E4F' }}>
      <h1>metrics-app-frontend</h1>
      <h2>Prueba de Conectividad Base</h2>
      <hr />

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <h3>Métricas obtenidas desde la API:</h3>
      {metricas.length === 0 && !error ? (
        <p>Cargando datos...</p>
      ) : (
        <ul>
          {metricas.map((metrica) => (
            <li key={metrica.id} style={{ margin: '10px 0', fontSize: '1.1rem' }}>
              <strong>{metrica.titulo_reporte}</strong> - {metrica.valor_metrica}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;