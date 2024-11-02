import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";
import { Modal } from "react-bootstrap";
import "/workspaces/VenTu-project/src/front/styles/InfoTourPlans.css";

const InfoTourPlans = () => {
    const { id } = useParams();
    const { store } = useContext(Context);
    const [tourPlan, setTourPlan] = useState({});
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const getTourplan = async () => {
            try {
                const response = await fetch(`${process.env.BACKEND_URL}/api/tourplan/${id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setTourPlan(data); // Guardamos los datos completos en tourPlan
            } catch (error) {
                console.error('Error fetching tour plan data:', error);
            }
        };
        getTourplan();
    }, [id]);

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className="container mt-4 p-3">
            <div className="row">
                <div className="col-12 d-flex align-items-center">
                    <h2 className="fw-bold">{tourPlan.title || 'Detalle del Tour'}</h2>
                </div>

                {/* Galería de imágenes */}
                <div className="col-8 d-flex justify-content-center mb-4">
                    <img
                        src={tourPlan.image_url || "https://res.cloudinary.com/desmcxb1y/image/upload/v1730486962/bizledoxipc6nqdi83np.jpg"}
                        className="img-fluid rounded main-image"
                        alt={tourPlan.title}
                        onClick={handleShowModal}
                        style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
                    />
                </div>

                {/* Información del TourPlan */}
                <div className="col-12 mt-4 d-flex">
                    <div className="col-md-8">
                        <h5 className="fw-bold">Descripción:</h5>
                        <p>{tourPlan.description || 'Descripción no disponible.'}</p>
                        <p><strong>Puestos Disponibles:</strong> {tourPlan.available_spots}</p>
                    </div>

                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="fw-bold">${tourPlan.price} por persona</h5>
                                <div className="d-flex justify-content-between">
                                    <p className="fw-bold mb-0">Inicio</p>
                                    <p>{tourPlan.start_date ? new Date(tourPlan.start_date).toLocaleDateString() : 'No disponible'}</p>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <p className="fw-bold mb-0">Culminación</p>
                                    <p>{tourPlan.end_date ? new Date(tourPlan.end_date).toLocaleDateString() : 'No disponible'}</p>
                                </div>
                                <a
                                    href={`https://wa.me/${tourPlan.provider?.phone}`}
                                    className="btn btn-success col-12 mt-3"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <i className="fa-brands fa-whatsapp"></i> Reserva aquí!
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modal de la imagen principal */}
                <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Imagen del Tour</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <img
                            className="d-block w-100"
                            src={tourPlan.image_url || "https://res.cloudinary.com/desmcxb1y/image/upload/v1730486962/bizledoxipc6nqdi83np.jpg"}
                            alt="Main Image"
                        />
                    </Modal.Body>
                </Modal>
            </div>
        </div>
    );
};

export default InfoTourPlans;
