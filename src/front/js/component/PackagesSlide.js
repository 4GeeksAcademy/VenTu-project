import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const PackagesSlide = () => {
    const [tourplans, setTourplans] = useState([]);

    useEffect(() => {
        const fetchTourplans = async () => {
            try {
                const response = await fetch(`${process.env.BACKEND_URL}/api/tourplans`);
                const data = await response.json();
                setTourplans(data);
            } catch (error) {
                console.error('Error fetching tourplans:', error);
            }
        };

        fetchTourplans();
    }, []);

    return (
        <div style={{ width: '100%', backgroundColor: '#f8f9fa', padding: '10px 0' }}>
            {tourplans.length > 0 ? (
                <Carousel
                    id="carouselExampleCaptions"
                    style={{
                        width: '100%',
                        maxWidth: '1200px',
                        height: '70vh',
                        margin: '0 auto',
                        overflow: 'hidden',
                        position: 'relative',
                    }}
                >
                    {tourplans.map((tourplan, index) => (
                        <Carousel.Item key={index} style={{ height: '70vh' }}>
                            <Link to={`/tourplans/${tourplan.id}`}>
                                <img
                                    src={tourplan.image_url || '/default-image.png'}
                                    className="d-block w-100"
                                    alt={tourplan.title || 'Tour Plan'}
                                    style={{ objectFit: 'cover', height: '70vh' }}
                                />
                                <Carousel.Caption className="overlay">
                                    <h5>{tourplan.title || 'Sin título'}</h5>
                                    <p>{tourplan.price ? `Precio: ${tourplan.price} USD` : 'Precio no disponible'}</p>
                                </Carousel.Caption>
                            </Link>
                        </Carousel.Item>
                    ))}
                </Carousel>
            ) : (
                <div style={{ textAlign: 'center', padding: '20px' }}>
                    <p>No hay actividades para mostrar en este momento.</p>
                </div>
            )}
            
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
