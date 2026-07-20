# Metrics App - Frontend (Client)

Este repositorio contiene la interfaz de usuario (Frontend) para la aplicación **Metrics App**, desarrollada como parte del período de evaluación técnica. El sistema consiste en un Dashboard de Analítica Empresarial diseñado con un enfoque modular, alta fidelidad visual y consumo eficiente de servicios API REST distribuidos.

## Tecnologías Principales

* **React (v19+)**: Librería base para la construcción de interfaces mediante componentes declarativos y reutilizables.
* **Vite**: Herramienta de construcción y entorno de desarrollo de alto rendimiento dotada de Hot Module Replacement (HMR).
* **Axios**: Cliente HTTP para la gestión automatizada e interceptación de peticiones hacia el entorno del servidor.
* **Lucide React**: Biblioteca optimizada para la implementación de iconografía corporativa de alta definición vectorial.

---

## Módulos y Funcionalidades Destacadas

### 1. Visualización Avanzada de Datos (Charts)
* **Histórico Mensual (`HistoricoChart.jsx`):** Mapea la evolución cronológica de métricas mediante un `AreaChart`. Incluye un algoritmo de reducción de escala numérica (`$1M`, `$700K`) para evitar el desborde visual en los ejes, rejillas sutiles y tooltips reactivos customizados.
* **Balance de Rendimiento (`RendimientoRadarChart.jsx`):** Evalúa el rendimiento del mes en curso en un `RadarChart` poligonal. Incorpora una capa de **normalización de datos en tiempo real** que escala métricas heterogéneas (porcentajes vs. volúmenes crudos de miles de unidades) a una base homogénea sin distorsionar la lectura en el Tooltip.

### 2. Experiencia de Usuario Adaptativa y Dinámica
* **Banner Ilustrado por Departamento (`DepartmentBanner.jsx`):** Renderiza recursos gráficos en SVG estilo *flat/tech* y resúmenes operativos que mutan de manera reactiva cada vez que el usuario navega entre áreas (*Sales*, *Marketing*, *Support*, *Engineering*).
* **Paginador / Navegador de Departamentos (`DepartmentPagination.jsx`):** Módulo de selección simplificado que controla la consulta de métricas por categoría en tiempo real hacia la API REST.

### 3. Autenticación y Control de Sesión (`AuthModal.jsx`)
* **Modal Reactivo:** Permite el flujo continuo de inicio de sesión y registro de cuentas de usuario diferenciadas por roles (`admin` y `user`)[cite: 1].
* **Persistencia Local:** Sincronización automática de estado mediante `localStorage` para conservar la sesión del usuario al recargar la página.

---

---

## Arquitectura de Directorios

El código fuente se encuentra estructurado bajo buenas prácticas organizacionales dentro de la carpeta `/src`, garantizando la separación de responsabilidades:

```text
```text
src/
├── assets/            # Ilustraciones SVG corporativas y recursos estáticos
├── Auth/              # Modal y lógica de Autenticación (AuthModal.jsx)
├── components/        # Componentes UI (Navbar, Hero, MetricCards, Charts, Banner, Footer)
├── services/          # Cliente Axios y configuración de llamadas API (api.js)
├── styles/            # Hojas de estilo CSS modularizadas por componente
├── App.jsx            # Orquestador principal del estado y flujo de la aplicación
└── main.jsx           # Punto de entrada y renderizado en el DOM de React
```

## Instrucciones de Instalación y Ejecución Local
1. Clona este repositorio y navega a la carpeta del proyecto.
```bash
git clone <URL_DEL_REPOSOTORIO>
cd metrics-app-frontend
```

2. Instala las dependencias necesarias:
```bash
npm install
```

3. Variables de Entorno
```js
URL base de la API REST Backend
VITE_API_URL=http://localhost:3000/api
```

4. Ejecuta el servidor en modo desarrollo/producción:
```bash
npm run dev
```

### Despliegue en Producción
El proyecto se encuentra optimizado para desplegarse como una Single Page Application (SPA) en Vercel, conectándose mediante variables de entorno de producción hacia la API backend desplegada.