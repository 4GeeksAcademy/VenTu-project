import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => (
    <footer className="footer mt-auto py-3 text-center" style={{ backgroundColor: '#00B4E7', color: '#FFF' }}>
        <div className="container">
            <span>© 2024 Ventu. Todos los derechos reservados.</span>
        </div>

        <br />
        
            <Link to="/b2b" style={{ color: '#FFF', textDecoration: 'none' }}>
                Ir a la sección B2B
            </Link>
    </footer>
);
