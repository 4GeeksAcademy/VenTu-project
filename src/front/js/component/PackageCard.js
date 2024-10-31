import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from "../store/appContext";

const PackageCard = ({ actividades = [] }) => {
    const { store, actions } = React.useContext(Context);

    const navigate = useNavigate();

    const handleReserveClick = (title) => {
        navigate(`/tourplans/${title}`);
    };





    const isFavorite = (actividadId) => {

        return store.favorites && store.favorites.some(favorite => favorite.id === actividadId);
    };



    return (
        // Tarjeta de paquete
        <div className="d-flex flex-wrap gap-4 justify-content-center">
            {actividades.map((actividad, index) => (
                <div key={index} className="card-tour card shadow" style={{ width: '24rem', backgroundColor: '#F2F4FF', borderColor: '#F2F4FF', transition: 'transform 0.2s' }}>

            {/* Imagen de la tarjeta */}
             <img 
                src={actividad.image_url || '/default-image.png'} 
                className="card-img-top" 
                alt={actividad.title} 
                onClick={() => handleReserveClick(actividad.title)}
                style={{ height: '200px', objectFit: 'cover'   }}
            />
                    <div className="card-body">

                        {/* Título del paquete */}
                        <h5 className="card-title">{actividad.title}</h5>
                        <p className="card-text">{actividad.description || 'Sin descripción disponible'}</p>

                        <div className="info-extra mb-3">
                            <p><strong>Precio:</strong> {actividad.price} US$</p>
                            <p><strong>Disponibles:</strong> {actividad.available_spots} asientos</p>
                            <p><strong>Fechas:</strong> {new Date(actividad.start_date).toLocaleDateString()} - {new Date(actividad.end_date).toLocaleDateString()}</p>
                        </div>

                        {/* Botones de Reserva y Favoritos */}
                        <div className="row d-flex justify-content-center">
                            <a href="#" className="btn btn-primary rounded-pill"
                                style={{ width: '18rem', backgroundColor: '#35DBD9', borderColor: '#35DBD9' }}
                                onClick={() => handleReserveClick(actividad.title)}>
                                Reserva Ya!
                            </a>

                            <p className="btn btn-primary ms-2 rounded-pill"
                                style={{ width: '3rem', backgroundColor: '#35DBD9', borderColor: '#35DBD9' }}
                                onClick={() => {
                                    if (isFavorite(actividad.id)) {
                                        actions.removeFavorite(actividad.id);
                                    } else {
                                        actions.addFavorite(actividad.id);

                                    }
                                }}>
                                <i className={`fas fa-heart ${isFavorite(actividad.id) ? 'text-danger' : 'text-white'}`}></i>
                            </p>
                        </div>

                    </div>
                </div>
            ))}
        </div>
    );
};

export default PackageCard;