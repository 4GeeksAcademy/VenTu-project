import React from 'react';

const FeaturedActivities = ({ actividades }) => {
    return (
        <section className="actividades-destacadas py-5" style={{ backgroundColor: '#FFF' }}>
            <div className="container text-center">
                <h2>Actividades destacadas en Venezuela</h2>
                <div className="row">
                    {actividades.map((actividad, index) => (
                        <div className="col-12 col-md-4" key={index}>
                            <div className="card">
                                <img src={actividad.img} className="card-img-top" alt={actividad.titulo} />
                                <div className="card-body">
                                    <h5 className="card-title">{actividad.titulo}</h5>
                                    <p className="card-text">Desde {actividad.precio}</p>
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
