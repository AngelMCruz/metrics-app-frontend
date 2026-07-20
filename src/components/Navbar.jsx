import React from 'react';

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="navbar-logo"></div>
      <div className="navbar-links">
        <div className="nav-dot active"></div>
        <div className="nav-dot"></div>
        <div className="nav-dot"></div>
        <div className="nav-dot"></div>
      </div>
    </header>
  );
};

export default Navbar;