import React from 'react';

const MainDestinations = ({ destinos }) => {
    return (
        <section className="destinos-principales py-5">
            <div className="container text-center">
                <h2>Principales destinos en Venezuela</h2>
                <div className="row">
                    {destinos.map((destino, index) => (
                        <div className="col-6 col-md-4" key={index}>
                            <img src={destino.img} alt={destino.nombre} className="img-fluid" />
                            <p>{destino.nombre}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MainDestinations;
