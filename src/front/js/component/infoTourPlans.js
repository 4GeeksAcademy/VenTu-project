import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";
import { Modal, Carousel } from "react-bootstrap";
import "/workspaces/VenTu-project/src/front/styles/InfoTourPlans.css"

const InfoTourPlans = () => {
    const { id } = useParams()
    const { store } = useContext(Context);
    const [tourPlan, setTourPlan] = useState({});
    const [actividades, setActividades] = useState({});
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


    return (

        <div className="container mt-1 p-3 ">

            <div className="row ">

                <div className="col-12 d-flex align-items-center">
                    <div className="col-10 d-flex align-items-center">

                        <i className="fa-solid fa-suitcase me-2" style={{ fontSize: '2rem' }}></i>
                        <h2 className="text p-2 fw-bold"> Viaje a Canaima {tour.title}</h2>
                    </div>
                    {/* Botón de favorito */}
                    <div>
                        <button href="#" className="btn btn-primary ms-2 rounded-pill"
                            style={{ width: '3rem', backgroundColor: '#F2F4FF', borderColor: '#F2F4FF' }}>
                            <i className="text-black fa-solid fa-heart"></i>
                        </button>
                    </div>
                </div>

                {/* Galería de imágenes */}
                <div className="d-flex col-8 d-flex justify-content-center" >
                    <div className="col-8 m-1 ">
                        <img
                            src={actividades.image_url}
                            className="img-fluid rounded main-image "
                            alt={actividades.title}
                            onClick={() => handleShowModal(0)}
                            style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
                        />
                    </div>

                    {/* <div className="col-4 d-flex flex-column align-items-start gap-3 m-1">
                        {tourPlan?.gallery.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                className="img-fluid rounded litle-image"
                                alt={`Gallery ${index}`}
                                onClick={() => handleShowModal(index + 1)}
                                style={{ cursor: 'pointer' }}
                            />
                        ))}
                    </div> */}
                </div>


                {/* info del  TourPlan */}
                <div className="col-12 mt-4 d-flex">

                    <div className="col-4">


                        <h5 className="fw-bold">Descripción:</h5>
                        <p>{actividades.description}</p>


                        <div>
                            <p>Puestos Disponibles: </p>
                            <p>{actividades.available_spots}</p>
                        </div>

                        <div>
                            <h5 className="fw-bold">Provedor: </h5>
                            <p>info del provedor</p>
                        </div>

                        <div className="col-4 d-flex flex-column align-items-start gap-3 m-1"> 
                            {/* {actividad.gallery.map((image, index) => (
                                <img 
                                    key={index} 
                                    src={image} 
                                    className="img-fluid rounded litle-image" 
                                    alt={`Gallery ${index}`} 
                                    onClick={() => handleShowModal(index + 1)}
                                    style={{ cursor: 'pointer' }}
                                />
                            ))} */}
                        </div>
                    </div>


                    <div className="col-sm-3 mb-3 mb-sm-0">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="fw-bold">$100 {actividades.price} Por persona</h5>

                                <div className="d-flex justify-content-between">
                                    <p className="fw-bold " >Inicio</p>
                                    <p className=" text"> 10-10-2024{actividades.start_date} </p>
                                </div>

                                <div className="d-flex justify-content-between">
                                    <p className="fw-bold">Culminación</p>
                                    <p className=" text"> 10-10-2024{actividades.end_date} </p>
                                </div>

                                <div className="d-flex justify-content-between mb-2">
                                    <p className="fw-bold ">Puestos Disponibles</p>
                                    <p className=" text"> 10 {actividades.available_spots} </p>
                                </div>

                                {/* aqui agregar el link de whatsapp */}

                                <a href={`https://wa.me/+${tourPlan?.phone}`} className="btn btn-success col-12" target="_blank" rel="noopener noreferrer">
                                    <i className="fa-brands fa-whatsapp"></i>
                                    Reserva aquí! 
                                </a>

                            </div>
                        </div>
                        
                    </div>

                </div>
            

                {/* Modal de la galería de imágenes */}
                <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Galería</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                                <img
                                    className="d-block w-100"
                                    src={actividades.mainImage}
                                    alt="Main Image"
                                />
                    </Modal.Body>
                </Modal>
            </div>
        </div> 
    )
    
}

export default InfoTourPlans;