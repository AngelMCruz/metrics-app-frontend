# Metrics App - Frontend (Client)

Este repositorio contiene la interfaz de usuario (Frontend) para la aplicación **Metrics App**, desarrollada como parte del período de evaluación técnica. El sistema consiste en un Dashboard de Analítica Empresarial diseñado con un enfoque modular, alta fidelidad visual y consumo eficiente de servicios API REST distribuidos.

## Tecnologías Principales

* **React (v19+)**: Librería base para la construcción de interfaces mediante componentes declarativos y reutilizables.
* **Vite**: Herramienta de construcción y entorno de desarrollo de alto rendimiento dotada de Hot Module Replacement (HMR).
* **Axios**: Cliente HTTP para la gestión automatizada e interceptación de peticiones hacia el entorno del servidor.
* **Lucide React**: Biblioteca optimizada para la implementación de iconografía corporativa de alta definición vectorial.

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
