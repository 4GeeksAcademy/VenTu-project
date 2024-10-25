import React from 'react';
import MainDestinations from '../component/MainDestinations';
import FeaturedActivities from '../component/FeaturedActivities';
import background from '../../static/images/bg-hero-4.webp';
import '../../styles/home.css'

export const Home = () => {
    return (
        <div style={{ backgroundColor: '#F2F4FF' }}>
            {/* Main section */}
            <header className="hero" style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', height: '50vh', color: 'white', textAlign: 'center' }}>
                <div className="container d-flex flex-column justify-content-center align-items-center" style={{ height: '100%' }}>
                    <h1>Descubre los mejores destinos en Venezuela</h1>
                    <p>Explora lo mejor de nuestro país con tours y planes turísticos</p>
                    <form className="d-flex" style={{ maxWidth: '500px', width: '100%' }}>
                        <input type="text" className="form-control" placeholder="¿A dónde quieres viajar?" />
                        <button className="btn btn-primary" style={{ backgroundColor: '#00B4E7' }}>Buscar</button>
                    </form>
                </div>
            </header>

            {/* Main destinations */}
            <MainDestinations
                destinos={[
                    { nombre: 'Los Roques', img: 'https://images.unsplash.com/photo-1637407414190-dfc2d02b2435?q=80&w=1771&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
                    { nombre: 'Canaima', img: 'https://images.unsplash.com/photo-1697551574084-6854f3c0ca9c?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
                    { nombre: 'Mérida', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/El_cruce_de_las_bandas._Merida..jpg/330px-El_cruce_de_las_bandas._Merida..jpg' },
                    { nombre: 'Isla de Margarita', img: 'https://images.unsplash.com/photo-1637407414190-dfc2d02b2435?q=80&w=1771&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
                    { nombre: 'Los Roques', img: 'https://images.unsplash.com/photo-1721846527498-8b6d5e6e573f?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
                    { nombre: 'Canaima', img: 'https://images.unsplash.com/photo-1576419343255-956024f1ad8f?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
                ]}
            />

            {/* Featured Activities */}
            <FeaturedActivities/>
        </div>
    );
};

export default Home;