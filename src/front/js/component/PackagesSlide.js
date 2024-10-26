import React from 'react';

export const PackagesSlide = ({ actividades = [] }) => {
    return (
        <div id="carouselExampleCaptions" className="carousel slide" style={{ height: "70%" , width: '50%', margin: '20px auto', borderRadius: '15px', overflow: 'hidden' }}>

            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>


            <div className="carousel-inner">
                {actividades.map((actividad, index) => (
                    <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                        <img src="https://www.hola.com/horizon/landscape/4430a9c300da-salto-del-angel-canaima-venezuela-t.jpg?im=Resize=(1200)" className="d-block w-100" alt="..." />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>{actividad.title}</h5>
                            <p>{actividad.price}</p>
                        </div>
                    </div>
                ))}
            </div>


            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>

            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>


        </div>
    );

}