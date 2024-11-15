import React from 'react';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const PackagesSlide = ({ actividades }) => {
    console.log(actividades);
    
    return (
        <div style={{ width: '100%', backgroundColor: '#f8f9fa', padding: '10px 0' }}>
            <Carousel
                id="carouselExampleCaptions"
                style={{
                    width: '100%',
                    maxWidth: '1200px',
                    height: '70vh',
                    margin: '0 auto',
                    overflow: 'hidden',
                    position: 'relative'
                }}
            >
                {actividades && actividades.length > 0 && actividades.map((actividad, index) => (
                    <Carousel.Item key={index} style={{ height: '70vh' }}>
                        <Link to={`/tourplans/${actividad.id}`}>
                            <img
                                src={actividad.image_url}
                                className="d-block w-100"
                                alt={actividad.title}
                                style={{ objectFit: 'cover', height: '70vh' }}
                            />
                            <Carousel.Caption className="overlay">
                                <h5>{actividad.title}</h5>
                                <p>{`Price: ${actividad.price}`}</p>
                            </Carousel.Caption>
                        </Link>
                    </Carousel.Item>
                ))}
            </Carousel>

            <style>{`
                .overlay {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    background: rgba(0, 0, 0, 0.6);
                    color: #fff;
                    padding: 20px;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }
                .carousel-item:hover .overlay {
                    opacity: 1;
                }
                .carousel-control-prev-icon,
                .carousel-control-next-icon {
                    background-color: rgba(0, 0, 0, 0.5);
                    border-radius: 50%;
                    padding: 10px;
                    transition: background-color 0.3s ease;
                }
                .carousel-control-prev-icon:hover,
                .carousel-control-next-icon:hover {
                    background-color: rgba(0, 0, 0, 0.8);
                }
            `}</style>
        </div>
    );
};
