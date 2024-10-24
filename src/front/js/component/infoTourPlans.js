import React, { useState, useEffect }  from "react";
import { useParams } from "react-router-dom";

const InfoTourPlans = () => { 
    const { title } = useParams()

    const [actividades, setActividades] = useState([]);

    useEffect (() => {
        fetch(`${process.env.BACKEND_URL}/api/tourplans/`+ title)
        .then((response) => response.json())
        .then(data => { 
            setActividades(data.result)
        })
        .catch(err => console.error(err))    
    }, [title])

    return (
        <div className="container col-10 mt-5 pt-5"> 
            <div> 
                <h1> 
                     {title}
                </h1>
                {/* Renderiza la información de las actividades */}
                {actividades.map((actividad, index) => (
                    <div key={index}>
                        <h2>{actividad.title}</h2>
                        <p>{actividad.descripcion}</p>
                        {/* Otros detalles de la actividad */}
                    </div>
                ))}
            </div>
        </div>







    // <div> 
    //     <div className="contenedor mt-5 pt-5 ">
    //     <div className=" ">
    //         <div className="card text-black mb-3 mx-3 mx-md-5">
    //             <div className=" g-0">
    //                 <div className="col-md-8">
    //                     <img src={"https://static.plusultra.com/media/1002/parque-nacional-canaima.jpg?cropmode=percentaje&width=480"} class="img-fluid rounded h-100" alt="Character" style={{ height: "100%" }} />
    //                 </div>

    //                 <div className="col-md-8">
    //                     <div className="card-body">
    //                     <h5 className="card-title fs-2 text-black m-3">Viaje a Canaima</h5>
    //                     <p className="card-text m-5 fw-bold"> Descripcion: </p>
    //                     <p className="card-text m-5 ">
    //                         Embárcate en una aventura inolvidable al Parque Nacional Canaima, uno de los destinos más impresionantes de Venezuela. 
    //                         Este viaje te llevará a través de paisajes espectaculares, donde podrás admirar la majestuosidad del Salto Ángel, la cascada más alta del mundo. 
    //                         Explora la selva tropical, navega por ríos cristalinos y descubre la rica biodiversidad de la región. 
    //                         Con guías expertos y alojamiento en campamentos ecológicos, este viaje a Canaima promete ser una experiencia única y enriquecedora.
    //                     </p> 


    //                     <div className="row mt-5 d-flex justify-content-between">
    //                         <div className="col-3 mb-3">
    //                         <div className="bg-gradient p-1 rounded h-100 text-center">
    //                             <h6 className="text-black">FECHA DE INICIO</h6>
    //                             <p className="mb-0">hola</p></div>
    //                         </div>
    //                         <div className="col-3 mb-3">
    //                         <div className="bg-gradient p-1 rounded h-100 text-center">
    //                             <h6 className="text-black">FECHA DE CULMINACIÓN </h6>
    //                             <p className="mb-0">lalala</p></div>
    //                         </div>
    //                         <div className="col-3 mb-3">
    //                         <div className="bg-gradient p-1 rounded h-100 text-center">
    //                             <h6 className="text-black">CUPOS DISPONIBLES</h6>
    //                             <p className="mb-0">opjo</p></div>
    //                         </div>
    //                         <div className="col-3 mb-3">
    //                         <div className="bg-gradient p-1 rounded h-100 text-center">
    //                             <h6 className="text-black">PROVEDOR</h6>
    //                             <p className="mb-0">CanaimaTours</p></div>
    //                         </div>

    //                     <div className="card-footer">
    //                         {/* <Link to="/"> */}
    //                         <button className="border border-0 btn btn-secondary bg-gradient col-6" type="button"> RESERVA AQUI! <i className="fas fa-chevron-right"></i></button>
    //                         {/* </Link> */}
    //                     </div>

    //                     </div>

    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    //   </div>

    
        // {/* {actividades.map((actividad, index) => (
        //     <div key={index}>
        //         <h2>{actividad.title}</h2>
        //         <p>{actividad.descripcion}</p>
        //         hola
        //     </div>
        // ))} */}
        
    // </div>
    
)}

export default InfoTourPlans;