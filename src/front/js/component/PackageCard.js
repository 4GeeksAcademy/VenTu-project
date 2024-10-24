import React from 'react';
import { useNavigate } from 'react-router-dom';

const PackageCard = ({ actividades= [] }) => { 
    
    const navigate = useNavigate();

    const handleReserveClick = (title) => {
        navigate(`/tourplans/${title}`);
    };

    return (
        // Tarjeta de paquete
        <div className="d-flex flex-wrap gap-4 justify-content-center">
        {actividades.map((actividad, index) => (  
        <div key={index} className="card" style={{ width: '24rem', backgroundColor: '#F2F4FF', borderColor: '#F2F4FF' }}>

            {/* Imagen de la tarjeta */}
            <img 
                src={actividad.img}
                className="card-img-top" 
                alt="..." 
                style={{ width: '100%', height: '180px', objectFit: 'cover' }}
            />

            <div className="card-body">

                {/* Título del paquete */}
                <div className="row"> 
                    <h5 className="card-title"> {actividad.title} </h5>
                </div>
                

                {/* Precio del paquete*/}
                <h6 className="card-text"> Desde {actividad.price} </h6>


                {/* Botones de Reserva y Favoritos */}
                <div className="row d-flex justify-content-center"> 
                    <a href="#" className="btn btn-primary rounded-pill" 
                    style={{ width: '18rem', backgroundColor: '#35DBD9', borderColor: '#35DBD9'}} 
                    onClick={() => handleReserveClick(actividad.title)}> 
                        Reserva Ya! 
                    </a>

                    <button href="#" className="btn btn-primary ms-2 rounded-pill" 
                    style={{ width: '3rem',  backgroundColor: '#35DBD9', borderColor: '#35DBD9' }}> 
                    <i class="fa-solid fa-heart"></i>
                    </button>
                </div>
                
            </div>
        </div>
        ))}
        </div>
    );
};

export default PackageCard;