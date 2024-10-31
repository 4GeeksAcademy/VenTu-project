import React, { useState, useEffect } from 'react';
import '../../styles/featuredActivities.css';
import { Context } from '../store/appContext';

const FeaturedActivities = () => {
    const { store, actions } = React.useContext(Context);
    const [actividades, setActividades] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.BACKEND_URL}/api/tourplans`);
                const data = await response.json();
                setActividades(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
    const isFavorite = (actividadId) => {

        return store.favorites && store.favorites.some(favorite => favorite.id === actividadId);
    };

    return (
        <section className="actividades-destacadas py-3" style={{ backgroundColor: '#FFF' }}>
            <div className="container text-center ">
                <h2 className= "mb-4">Actividades destacadas en Venezuela</h2>
                <div className="row">
                    {actividades.map((actividad, index) => (
                        <div className="col-12 col-md-4" key={index}>
                            <div className="card-tour shadow" style={{ transition: 'transform 0.2s' }}>
                                <img
                                    src={actividad.image_url || '/default-image.png'}
                                    className="card-img-top"
                                    alt={actividad.title}
                                    style={{ height: '200px', objectFit: 'cover' }}
                                />
                                <div className="card-body d-flex flex-column justify-content-between" style={{ textAlign: 'left' }}>
                                    <h5 className="card-title">{actividad.title}</h5>
                                    <p className="card-text">
                                        {actividad.description ? actividad.description.substring(0, 100) + '...' : 'Sin descripción disponible'}
                                    </p>

                                    <div className="info-extra">
                                        <p><strong>Precio:</strong> {actividad.price} US$</p>
                                        <p><strong>Disponibles:</strong> {actividad.available_spots} asientos</p>
                                        <p><strong>Fechas:</strong> {new Date(actividad.start_date).toLocaleDateString()} - {new Date(actividad.end_date).toLocaleDateString()}</p>
                                    </div>

                                    <div className="d-flex justify-content-between align-items-center">
                                        <button className="btn btn-primary" style={{ backgroundColor: '#00B4E7' }}>
                                            Reserva Ya!
                                        </button>
                                        <button className="btn btn-light"
                                            onClick={() => {
                                                if (isFavorite(actividad.id)) {
                                                    actions.removeFavorite(actividad.id);
                                                } else {
                                                    actions.addFavorite(actividad.id);

                                                }
                                            }}
                                        >
                                            <i className={`fas fa-heart ${isFavorite(actividad.id) ? 'text-danger' : 'text-black'}`}></i>

                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedActivities;
