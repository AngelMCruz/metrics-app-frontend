# Metrics App - Frontend (Client)

Este repositorio contiene la interfaz de usuario (Frontend) para la aplicación **Metrics App**, desarrollada como parte del período de evaluación técnica. El sistema consiste en un Dashboard de Analítica Empresarial diseñado con un enfoque modular, alta fidelidad visual y consumo eficiente de servicios API REST distribuidos.

## Tecnologías Principales

* **React (v19+)**: Librería base para la construcción de interfaces mediante componentes declarativos y reutilizables.
* **Vite**: Herramienta de construcción y entorno de desarrollo de alto rendimiento dotada de Hot Module Replacement (HMR).
* **Axios**: Cliente HTTP para la gestión automatizada e interceptación de peticiones hacia el entorno del servidor.
* **Lucide React**: Biblioteca optimizada para la implementación de iconografía corporativa de alta definición vectorial.

---

## Componentes de Visualización (Charts)

La aplicación integra dos módulos críticos de inteligencia de negocio desarrollados sobre **Recharts**:

### 1. Histórico Mensual (`HistoricoChart.jsx`)
* **Componente base:** `AreaChart` (`ResponsiveContainer`, `Area`, `XAxis`, `YAxis`, `CartesianGrid`, `Tooltip`).
* **Propósito:** Mapea el comportamiento cronológico de los ingresos o KPI del departamento a lo largo del tiempo.
* **Características:** Incluye un algoritmo de reducción de escala numérica (`$1M`, `$700K`) para prevenir el desborde en el eje Y, rejillas horizontales sutiles y tooltips reactivos customizados de alto contraste.

### 2. Balance de Rendimiento Actual (`RendimientoRadarChart.jsx`)
* **Componente base:** `RadarChart` (`PolarGrid`, `PolarAngleAxis`, `PolarRadiusAxis`, `Radar`, `Tooltip`).
* **Propósito:** Mapea de manera poligonal las métricas del mes en curso para evaluar el balance operativo en 4 dimensiones simétricas.
* **Características:** Incorpora una capa matemática de **normalización de datos**. Transforma dinámicamente métricas heterogéneas (escalas dispares como variables de 0 a 100% frente a volúmenes crudos de hasta +4500 unidades) a una base común 100, garantizando la simetría del polígono sin alterar los valores reales expuestos al usuario en el Tooltip.

---

## Arquitectura de Directorios

El código fuente se encuentra estructurado bajo buenas prácticas organizacionales dentro de la carpeta `/src`, garantizando la separación de responsabilidades:

```text
src/
├── components/   # Elementos visuales reutilizables (Cards, Dashboards, Navbar)
├── services/     # Lógica corporativa externa y canal de comunicación HTTP (api.js)
├── App.jsx       # Punto de entrada principal y orquestador del estado de la UI
└── main.jsx      # Inicializador del DOM de React y configuraciones globales
```

