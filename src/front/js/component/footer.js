import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../static/images/ventu-logo.png';

export const Footer = () => (
    <footer className="footer mt-auto py-3 text-center" style={{ backgroundColor: '#00B4E7', color: '#FFF' }}>
        <div className="container">
            <div className="row">
                
                {/* Columna izquierda */}
                <div className="col-12 col-md-6 text-start">
                    {/* Logo */}
                    <img src={logo} alt="Ventu Logo" style={{ width: '150px', height: 'auto' }} />
                    
                    {/* CTA */}
                    <h4 className="mt-3">¿Eres organizador de planes turísticos?</h4>
                    <p>Si deseas mostrar tus planes turísticos aquí, regístrate en el siguiente enlace:</p>
                    <Link to="/b2b" className="btn btn-light" style={{ backgroundColor: '#FFF', color: '#00B4E7' }}>
                        Regístrate como organizador
                    </Link>
                </div>

                {/* Columna derecha */}
                <div className="col-12 col-md-6 text-center mt-4 mt-md-0">
                    {/* Título del menú */}
                    <h4 className="mb-3">Menú</h4>

                    {/* Menú */}
                    <nav className="d-flex flex-column">
                        <Link to="/" className="btn btn-link text-white">Inicio</Link>
                        <Link to="/paquetes" className="btn btn-link text-white">Planes Turísticos</Link>
                        <Link to="/about" className="btn btn-link text-white">Sobre Nosotros</Link>
                        <Link to="/creartourplan" className="btn btn-link text-white">Crear Plan Turístico</Link>
                    </nav>
                </div>
            </div>
            
            {/* Derechos reservados */}
            <div className="row mt-4">
                <div className="col-12 text-center">
                    <span>© 2024 Ventu. Todos los derechos reservados.</span>
                </div>
            </div>
        </div>
    </footer>
);
