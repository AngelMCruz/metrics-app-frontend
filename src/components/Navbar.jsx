import React, { useState, useEffect } from 'react';
import '../styles/Navbar.css';

const Navbar = ({ onLoginClick, onRegisterClick }) => {
  // 1. Estado inicial en minúsculas consistente
  const [activeSection, setActiveSection] = useState('inicio');

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    setActiveSection(sectionId);

    const section = document.getElementById(sectionId);
    if (section) {
      const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 70;
      const elementPosition = section.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navbarHeight - 15;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    // 2. Normalización estricta de los IDs en minúsculas
    const sections = ['inicio', 'reporte', 'niveles'];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150; // Offset para cambiar de pestaña con anticipación

      // Si está arriba de todo la pantalla, activar 'inicio' directamente
      if (window.scrollY < 100) {
        setActiveSection('inicio');
        return;
      }

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const elementTop = element.offsetTop;
          const elementHeight = element.offsetHeight;

          if (scrollPosition >= elementTop && scrollPosition < elementTop + elementHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className="navbar">
      <div className="navbar-container">
        
        {/* Lado Izquierdo: Logo + Nombre */}
        <div className="navbar-brand" onClick={(e) => scrollToSection(e, 'inicio')}>
          <div className="logo-icon"></div>
          <span className="brand-name">Metrics <span>UI</span></span>
        </div>

        {/* Lado Derecho: Pastillas de Auth + Menú Nav */}
        <div className="navbar-right-group">
          
          {/* Nivel Superior: Pastillas Cyan */}
          <div className="navbar-auth-pills">
            <button className="auth-pill-btn" onClick={onRegisterClick} title="Regístrate">
              Regístrate
            </button>
            <button className="auth-pill-btn" onClick={onLoginClick} title="Iniciar Sesión">
              Iniciar Sesión
            </button>
          </div>

          {/* Nivel Inferior: Menú de navegación */}
          <nav className="navbar-nav">
            <a 
              href="#inicio" 
              className={`nav-link ${activeSection === 'inicio' ? 'active' : ''}`}
              onClick={(e) => scrollToSection(e, 'inicio')}
            >
              Inicio
            </a>
            <a 
              href="#reporte" 
              className={`nav-link ${activeSection === 'reporte' ? 'active' : ''}`}
              onClick={(e) => scrollToSection(e, 'reporte')}
            >
              Reporte
            </a>
            <a 
              href="#niveles" 
              className={`nav-link ${activeSection === 'niveles' ? 'active' : ''}`}
              onClick={(e) => scrollToSection(e, 'niveles')}
            >
              Niveles
            </a>
          </nav>

        </div>

      </div>
    </header>
  );
};

export default Navbar;