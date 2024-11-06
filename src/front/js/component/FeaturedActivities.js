import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/featuredActivities.css';
import { Context } from '../store/appContext';

const FeaturedActivities = () => {
    const { store, actions } = useContext(Context);
    const [actividades, setActividades] = useState([]);
    const [visibleTours, setVisibleTours] = useState(6); // Número inicial de tours visibles
    const navigate = useNavigate();

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

    const handleShowMore = () => {
        setVisibleTours(prevVisibleTours => prevVisibleTours + 6); // Mostrar 6 tours adicionales
    };

    return (
        <section className="actividades-destacadas py-5" style={{ backgroundColor: '#FFF', margin: '50px 10px' }}>
            <div className="container text-center">
                <h2 className="mb-4">Actividades destacadas</h2>
                <div className="row">
                    {actividades.slice(0, visibleTours).map((actividad, index) => (
                        <div className="col-12 col-md-6 col-lg-4 mb-4 row-gap-3" key={index}>
                            <div 
                                className="card-tour shadow" 
                                style={{ transition: 'transform 0.2s', cursor: 'pointer' }} 
                                onClick={() => navigate(`/tourplans/${actividad.id}`)}
                            >
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

                                    <div className="d-flex justify-content-between align-items-center mt-3">
                                        <button 
                                            className="btn btn-primary" 
                                            style={{ backgroundColor: '#ef377e' }}
                                            onClick={(e) => {
                                                e.stopPropagation(); // Prevenir que el clic en el botón afecte el onClick del contenedor
                                                navigate(`/tourplans/${actividad.id}`);
                                            }}
                                        >
                                            Reserva Ya!
                                        </button>
                                        <button className="btn btn-light"
                                            onClick={(e) => {
                                                e.stopPropagation(); // Prevenir que el clic en el botón afecte el onClick del contenedor
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
                {visibleTours < actividades.length && (
                    <button className="btn btn-secondary mt-4" onClick={handleShowMore} style={{ backgroundColor: '#ef377e', color: '#fff' }}>
                        Mostrar más
                    </button>
                )}
            </div>
        </section>
    );
};

export default FeaturedActivities;
