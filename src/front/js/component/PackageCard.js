import React from 'react';

const PackageCard = ({  }) => { 
    return (

        // Tarjeta de paquete
        <div className="card" style={{ width: '24rem', backgroundColor: '#F2F4FF', borderColor: '#F2F4FF' }}>
           
            {/* Imagen de la tarjeta */}
            <img 
                src="https://media.istockphoto.com/id/1457972072/photo/scenic-view-of-worlds-highest-waterfall-angel-fall-in-venezuela.jpg?s=612x612&w=0&k=20&c=PJsr6zejx-jztAqlXvQ5T_SlgTuvd2tUn7JU7WEIZvk=" 
                className="card-img-top" 
                alt="..." 
                style={{ width: '100%', height: '180px', objectFit: 'cover' }}
            />

            
            <div className="card-body">

                {/* Título del paquete */}
                <div className="row"> 
                    <h5 className="card-title"> Paseo por el Salto Angel </h5>
                    <p className="card-title"> 1 dia </p>
                </div>
                

                {/* Precio del paquete*/}
                <h6 className="card-text"> Desde $600 </h6>


                {/* Botones de Reserva y Favoritos */}
                <div className="row d-flex justify-content-center"> 
                    <a href="#" className="btn btn-primary rounded-pill" 
                    style={{ width: '18rem', backgroundColor: '#35DBD9', borderColor: '#35DBD9'}}> 
                        Reserva Ya! 
                    </a>

                    <a href="#" className="btn btn-primary ms-2 rounded-pill" 
                    style={{ width: '3rem',  backgroundColor: '#35DBD9', borderColor: '#35DBD9' }}> 
                    <i class="fa-solid fa-heart"></i>
                    </a>
                </div>
                
            </div>
        </div>
    );
};

export default PackageCard;