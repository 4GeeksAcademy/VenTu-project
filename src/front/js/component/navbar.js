import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
    return (
        <nav className="navbar navbar-light" style={{ backgroundColor: '#00B4E7' }}>
            <div className="container">
                <Link to="/" className="navbar-brand text-white">
                    <img src="/path/to/logo.png" alt="Brand Logo" width="30" height="30" />
                    Mi Marca
                </Link>
                <div>
                    <Link to="/" className="btn btn-outline-light">Inicio</Link>
                    <Link to="/about" className="btn btn-outline-light">Sobre Nosotros</Link>
                    <Link to="/register" className="btn btn-outline-light">Registre</Link>
                </div>
            </div>
        </nav>
    );
};
