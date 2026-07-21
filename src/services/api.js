import axios from 'axios';

const api = axios.create({
  // Si existe una variable de entorno de producción la usa; si no, recurre al localhost
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
});

export default api;