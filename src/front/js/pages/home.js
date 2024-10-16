import React from 'react';
import styles from '../../styles/home.css';
import background from '../../static/images/bg-hero-4.webp';
import MainDestinations from '../component/MainDestinations';
import FeaturedActivities from '../component/FeaturedActivities';

export const Home = () => {
    return (
        <div style={{ backgroundColor: '#F2F4FF' }}>
            {/* Sección principal*/}
            <header className="hero" style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', height: '50vh', color: 'white', textAlign: 'center' }}>
                <div className="container d-flex flex-column justify-content-center align-items-center" style={{ height: '100%' }}>
                    <h1>Descubre los mejores destinos en Venezuela</h1>
                    <p>Explora lo mejor de nuestro país con tours y planes turisticos</p>
                    <form className="d-flex" style={{ maxWidth: '500px', width: '100%' }}>
                        <input type="text" className="form-control" placeholder="¿A dónde quieres viajar?" />
                        <button className="btn btn-primary" style={{ backgroundColor: '#00B4E7' }}>Buscar</button>
                    </form>
                </div>
            </header>

            {/* Destinos Principales */}
            <MainDestinations
                destinos={[
                    { nombre: 'Los Roques' },
                    { nombre: 'Canaima' },
                    { nombre: 'Mérida' },
                    { nombre: 'Isla de Margarita' },
                    { nombre: 'Mérida' },
                    { nombre: 'Isla de Margarita' },
                ]}
            />

            {/* Actividades Destacadas */}
            <FeaturedActivities
                actividades={[
                    { titulo: 'Excursión a Los Roques', precio: '250,00 US$' },
                    { titulo: 'Tour por Canaima y Salto Ángel', precio: '320,00 US$' },
                    { titulo: 'Excursión al Teleférico de Mérida', precio: '45,00 US$' },
                    { titulo: 'Tour por las playas de Margarita', precio: '150,00 US$' },
                ]}
            />
        </div>
    );
};
