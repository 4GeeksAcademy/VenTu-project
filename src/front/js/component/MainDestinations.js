import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import '../../styles/MainDestinations.css';

const MainDestinations = () => {
    const [destinos, setDestinos] = useState([]);

    useEffect(() => {
        const fetchDestinos = async () => {
            try {
                const response = await fetch(`${process.env.BACKEND_URL}/api/tourplans`);
                const data = await response.json();
                setDestinos(data);
            } catch (error) {
                console.error('Error fetching destinations:', error);
            }
        };

        fetchDestinos();
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <section className="main-destinations pb-5 pt-3">
            <div className="container text-center">
                <h2 className="mb-4">Principales Destinos en Venezuela</h2>
                <Slider {...settings}>
                    {destinos.map((destino) => (
                        <div key={destino.id} className="destination-slide">
                            <Link to={`/tourplans/${destino.id}`}>
                                <img 
                                    src={destino.image_url || 'default-image.jpg'} 
                                    alt={destino.title} 
                                    className="img-fluid destination-image" 
                                />
                                <p className="destination-title">{destino.title}</p>
                            </Link>
                        </div>
                    ))}
                </Slider>
            </div>
        </section>
    );
};

export default MainDestinations;
