import React from 'react';
import styles from '../../styles/home.css';
import background from '../../static/images/bg-hero-4.webp'

export const Home = () => {
    return (
        <div style={{ backgroundColor: '#F2F4FF' }}>
            <header className="hero" style={{backgroundImage: `url(${background})`, backgroundSize: 'cover' }}>
                <div className="container d-flex flex-column justify-content-center align-items-center" style={{ height: '100%' }}>
                    <h1>Visita destinos turisticos por toda venezuela</h1>
                    <p>Planes turisticos ideales para toda ocación</p>
                    <form className="d-flex" style={{ maxWidth: '500px', width: '100%' }}>
                        <input type="text" className="form-control" placeholder="¿A dónde quieres viajar?" />
                        <button className="btn btn-primary" style={{ backgroundColor: '#00B4E7' }}>Buscar</button>
                    </form>
                </div>
            </header>

            {/* Sección de destinos principales, convertirlo en componente para que reciba tourplans*/}
            <section className="destinos-principales py-5">
                <div className="container text-center">
                    <h2>Principales destinos</h2>
                    <div className="row">
                        <div className="col-6 col-md-4">
                            <img src="/path/to/rome.jpg" alt="Roma" className="img-fluid" />
                            <p>Roma</p>
                        </div>
                        <div className="col-6 col-md-4">
                            <img src="/path/to/paris.jpg" alt="París" className="img-fluid" />
                            <p>París</p>
                        </div>
                        {/* Añadir más destinos */}
                    </div>
                </div>
            </section>

            {/* Sección de actividades destacadas otro componente que a partir de algun diferenciador pueda hacer un sort*/}
            <section className="actividades-destacadas py-5" style={{ backgroundColor: '#FFF' }}>
                <div className="container text-center">
                    <h2>Actividades destacadas</h2>
                    <div className="row">
                        <div className="col-12 col-md-4">
                            <div className="card">
                                <img src="/path/to/activity1.jpg" className="card-img-top" alt="Actividad 1" />
                                <div className="card-body">
                                    <h5 className="card-title">Visita guiada por el Coliseo</h5>
                                    <p className="card-text">Desde 58,50 US$</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
