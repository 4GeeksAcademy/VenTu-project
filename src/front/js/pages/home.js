import React from 'react';
import MainDestinations from '../component/MainDestinations';
import FeaturedActivities from '../component/FeaturedActivities';
import background from '../../static/images/bg-hero-4.webp';
import imagehome from '../../static/images/mujer-con-maleta.webp';
import viajero1 from '../../static/people/viajeros1.jpg';
import viajero2 from '../../static/people/viajeros2.jpg';
import viajero3 from '../../static/people/viajeros3.jpg';
import viajero4 from '../../static/people/viajeros4.webp';
import viajero5 from '../../static/people/viajeros5.webp';
import viajero6 from '../../static/people/viajeros7.jpeg';

import { FaCampground, FaUmbrellaBeach, FaMapMarkedAlt, FaMountain } from 'react-icons/fa';
import '../../styles/home.css';

export const Home = () => {
    return (
        <div style={{ backgroundColor: '#F2F4FF' }}>
            {/* Hero Section */}
            <header className="hero" style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', height: '50vh', color: 'white', textAlign: 'center' }}>
                <div className="container d-flex flex-column justify-content-center align-items-center" style={{ height: '100%' }}>
                    <h1>Descubre los mejores destinos en Venezuela</h1>
                    <p>Explora lo mejor de nuestro país con tours y planes turísticos</p>
                    <form className="d-flex" style={{ maxWidth: '500px', width: '100%' }}>
                        <input type="text" className="form-control" placeholder="¿A dónde quieres viajar?" />
                        <button className="btn" style={{ backgroundColor: '#ef377e', color: 'white' }}>Buscar</button>
                    </form>
                </div>
            </header>

            {/* Main destinations */}
            <MainDestinations />

            {/* About Section */}
            <section className="about-section d-flex flex-wrap align-items-center my-5 px-3">
                <div className="col-md-6"  style={{ display: 'flex', flexDirection: 'column', alignContent: 'center',  alignItems: 'center' }}>
                    <img src={imagehome} alt="Provider information" style={{ width: '300px', borderRadius: '15px' }} />
                </div>
                <div className="col-md-6 p-4">
                    <h2>Ventu tus planes turísticos en un solo lugar</h2>
                    <p>Ventú está diseñado para facilitar la conexión entre proveedores de paquetes turísticos, planes de vacaciones, experiencias inolvidables y viajeros. 
                    
                    Al reunir todos estos servicios en un solo sitio, Ventú hace que sea más fácil para los viajeros encontrar y reservar sus próximos destinos.</p>
                </div>
            </section>

            {/* Featured Activities Section */}
            <FeaturedActivities />

            {/* Insights Section */}
            <section className="insights-section text-center my-5">
                <div className="container">
                    <h2 className="mb-4">Ventajas de Nuestra Plataforma</h2>
                    <div className="row">
                        <div className="col-6 col-md-3 mb-3">
                            <FaMapMarkedAlt size={40} color="#ef377e" />
                            <p>Turismo</p>
                        </div>
                        <div className="col-6 col-md-3 mb-3">
                            <FaCampground size={40} color="#ef377e" />
                            <p>Camping</p>
                        </div>
                        <div className="col-6 col-md-3 mb-3">
                            <FaUmbrellaBeach size={40} color="#ef377e" />
                            <p>Playas</p>
                        </div>
                        <div className="col-6 col-md-3 mb-3">
                            <FaMountain size={40} color="#ef377e" />
                            <p>Experiencias</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Gallery Section */}
            <section className="gallery-section my-5">
                <div className="container">
                    <h2 className="text-center mb-4">Conoce nuestros viajeros</h2>
                    <div className="row g-3">
                        <div className="col-6 col-md-4">
                            <img src={viajero1} alt="Landscape 1" className="img-fluid rounded gallery-img" />
                        </div>
                        <div className="col-6 col-md-4">
                            <img src={viajero2} alt="Landscape 2" className="img-fluid rounded gallery-img" />
                        </div>
                        <div className="col-6 col-md-4">
                            <img src={viajero3} alt="Landscape 3" className="img-fluid rounded gallery-img" />
                        </div>
                        <div className="col-6 col-md-4">
                            <img src={viajero4} alt="Landscape 4" className="img-fluid rounded gallery-img" />
                        </div>
                        <div className="col-6 col-md-4">
                            <img src={viajero5} alt="Landscape 5" className="img-fluid rounded gallery-img" />
                        </div>
                        <div className="col-6 col-md-4">
                            <img src={viajero6} alt="Landscape 6" className="img-fluid rounded gallery-img" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
