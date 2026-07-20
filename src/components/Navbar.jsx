import React from 'react';
import './Navbar.css';

const Navbar = ({ onLoginClick, onRegisterClick }) => {
  return (
    <header className="navbar">
      <div className="navbar-container">
        
        {/* Lado Izquierdo: Logo + Nombre */}
        <div className="navbar-brand">
          <div className="logo-icon"></div>
          <span className="brand-name">Metrics <span>UI</span></span>
        </div>

        {/* Lado Derecho: Pastillas de Auth + Menú Nav */}
        <div className="navbar-right-group">
          
          {/* Nivel Superior: Pastillas Cyan (Las 2 rayitas superiores del wireframe) */}
          <div className="navbar-auth-pills">
            <button className="auth-pill-btn" onClick={onRegisterClick} title="Regístrate">
              Regístrate
            </button>
            <button className="auth-pill-btn" onClick={onLoginClick} title="Iniciar Sesión">
              Iniciar Sesión
            </button>
          </div>

          {/* Nivel Inferior: Menú de navegación principal */}
          <nav className="navbar-nav">
            <a href="#home" className="nav-link active">Home</a>
            <a href="#features" className="nav-link">Features</a>
            <a href="#pricing" className="nav-link">Pricing</a>
            <a href="#about" className="nav-link">About</a>
          </nav>

        </div>

      </div>
    </header>
  );
};

export default Navbar;