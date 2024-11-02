import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";
import { Modal, Carousel } from "react-bootstrap";
import "/workspaces/VenTu-project/src/front/styles/InfoTourPlans.css"

import PackageCard from "../component/PackageCard";


const InfoTourPlans = () => {
    const { id } = useParams()
    const { store, actions } = useContext(Context);
    const [tourPlan, setTourPlan] = useState({});
    const [actividades, setActividades] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    // const selectedTourPlan = store.tourPlans.find((item) => item.id === id);

    useEffect(() => {
        const getTourplan = async () => {
            try {
                const response = await fetch(`${process.env.BACKEND_URL}/api/tourplan/${id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setTourPlan(data);
                setActividades(data.actividades || []);
            } catch (error) {
                console.error('There has been a problem with your fetch operation:', error);
            }
        };
        getTourplan();
    }, [id]);

    const handleShowModal = (index) => {
        setActiveIndex(index);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const isFavorite = (actividadId) => {

        return store.favorites && store.favorites.some(favorite => favorite.id === actividadId);
    };


    return (
        <div className="container mt-1 p-3">
            <div className="row">
                <div className="col-12 d-flex align-items-center">
                    <h2 className="text p-2 fw-bold">{tourPlan.title || 'Detalle del Tour'}</h2>
                </div>

                {/* Galería de imágenes */}
                <div className="col-8 d-flex justify-content-center">
                    <div className="col-8 m-1">
                        <img
                            src={tourPlan.image_url || "default-image.jpg"}
                            className="img-fluid rounded main-image"
                            alt={tourPlan.title}
                            onClick={handleShowModal}
                            style={{ cursor: 'pointer' }}
                        />
                    </div>
                </div>

                {/* Información del TourPlan */}
                <div className="col-12 mt-4 d-flex">
                    <div className="col-8">
                        <h5 className="fw-bold">Descripción:</h5>
                        <p>{tourPlan.description || 'Descripción no disponible.'}</p>

                        <div>
                            <p>Puestos Disponibles: {tourPlan.available_spots || 'N/A'}</p>
                        </div>
                        <div>
                            <h5 className="fw-bold">Proveedor: </h5>
                            <p>{tourPlan.provider ? tourPlan.provider.name : 'Información del proveedor no disponible.'}</p>
                        </div>
                    </div>

                    <div className="col-sm-4 mb-3">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="fw-bold">${tourPlan.price} por persona</h5>

                                <div className="d-flex justify-content-between">
                                    <p className="fw-bold">Inicio</p>
                                    <p>{tourPlan.start_date || 'No disponible'}</p>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <p className="fw-bold">Culminación</p>
                                    <p>{tourPlan.end_date || 'No disponible'}</p>
                                </div>

                                <a
                                    href={`https://wa.me/${tourPlan.provider?.phone}`}
                                    className="btn btn-success col-12"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <i className="fa-brands fa-whatsapp"></i>
                                    Reserva aquí!
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modal de la imagen principal */}
                <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Galería</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <img
                            className="d-block w-100"
                            src={tourPlan.image_url || "default-image.jpg"}
                            alt="Main Image"
                        />
                    </Modal.Body>
                </Modal>
            </div>
        </div>
    );
};

export default InfoTourPlans;
