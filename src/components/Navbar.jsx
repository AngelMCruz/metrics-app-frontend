import React, { useState, useEffect } from 'react';
import '../styles/Navbar.css';

const Navbar = ({ currentUser, onLoginClick, onRegisterClick, onLogout }) => {
  const [activeSection, setActiveSection] = useState('inicio');

  // Función para obtener el nombre visual o correo
  const getUserDisplayName = () => {
    if (!currentUser) return '';
    if (currentUser.nombre) return currentUser.nombre;
    if (currentUser.email) return currentUser.email.split('@')[0];
    return 'Usuario';
  };

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
    const sections = ['inicio', 'reporte', 'niveles'];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;

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

        {/* Lado Derecho: Controles de Sesión + Menú Nav */}
        <div className="navbar-right-group">
          
          {/* Renderizado Condicional: Si hay usuario activo vs Si es visitante */}
          {currentUser ? (
            <div className="user-session-pills">
              <span className="user-greeting">
                Hola, <strong>{getUserDisplayName()}</strong>
                {currentUser.role && (
                  <span className={`role-badge ${currentUser.role}`}>
                    {currentUser.role === 'admin' ? 'ADMIN' : 'USER'}
                  </span>
                )}
              </span>
              <button className="auth-pill-btn logout-btn" onClick={onLogout} title="Cerrar Sesión">
                Salir
              </button>
            </div>
          ) : (
            <div className="navbar-auth-pills">
              <button className="auth-pill-btn" onClick={onRegisterClick} title="Regístrate">
                Regístrate
              </button>
              <button className="auth-pill-btn" onClick={onLoginClick} title="Iniciar Sesión">
                Iniciar Sesión
              </button>
            </div>
          )}

          {/* Menú de navegación */}
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