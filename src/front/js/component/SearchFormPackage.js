import React, { useState } from 'react';
import { Form, Button, Modal,  } from 'react-bootstrap';
import PackagesFilters from './PackagesFilters';

 const SearchBarPrueba = ({ destino, setDestino, startDate, setStartDate, setSearchResults, people, setPeople,}) => {
   const [showModal, setShowModal] = useState(false);

   const handleShow = () => setShowModal(true);
   const handleClose = () => setShowModal(false);

   const handleSearch = async (e) => {
     e.preventDefault();
     const query = destino;
     try {
       const response = await fetch("https://improved-telegram-5g4vrv46qp69h4p7p-3001.app.github.dev/api/tourplans");
       if (!response.ok) {
         throw new Error('Network response was not ok');
       }
       const data = await response.json();
       setSearchResults(data);
     } catch (error) {
       console.error('Error searching packages:', error);
     }
   };

   return (

     <div className="container col-6 p-3 rounded-3" style={{ backgroundColor: '#F2F4FF', borderColor: '#F2F4FF' }}>

       <Form onSubmit={handleSearch} className="m-1">

         <div className="row m-1">
           <div className="col-5">
            
             <Form.Group controlId="formDestination">
               <Form.Label> ¿A donde vas? </Form.Label>
               <Form.Control
                 className='rounded-pill'
                 
                 placeholder="Destino"
                 value={destino}
                 onChange={(e) => setDestino(e.target.value)}
                 required
               />
             </Form.Group>
           </div>

           <div className="col-3">
             <Form.Group controlId="formStartDate">
               <Form.Label> ¿Cuando vas? </Form.Label>
               <Form.Control
                 className='rounded-pill'
                 type="date"
                 value={startDate}
                 onChange={(e) => setStartDate(e.target.value)}
                 required
               />
             </Form.Group>
           </div>

           <div className="col-3">
             <Form.Group controlId="formPeople">
               <Form.Label> ¿Cuantos van? </Form.Label>
               <Form.Control
                 className='rounded-pill'
                 type="number"
                 min="1"
                 value={people}
                 onChange={(e) => setPeople(e.target.value)}
                 required
               />
             </Form.Group>
           </div>

           <Button 
             className="btn-primary rounded-pill col-1 mt-4" 
             style={{ height:"40px", backgroundColor: "#ffffff", borderColor: "#ffffff" }}
             onClick={handleShow}>
             <i className="fa-solid fa-sliders" style={{ color: "#242B47" }}></i>
           </Button>
         </div>

         <div className="row mt-3">

           <div className="row text-center d-flex justify-content-center">

             <Button type="submit" className="btn-primary rounded-pill col-6" style={{ backgroundColor: "#242B47", borderColor: "#242B47" }}>
               BUSCAR
             </Button>

           </div>
         </div>

       </Form>

       <Modal show={showModal} onHide={handleClose}>
         <Modal.Header closeButton>
           <Modal.Title>Filtros</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <PackagesFilters />
         </Modal.Body>
         <Modal.Footer>
         
         <Button variant="secondary" >
             Aplicar
           </Button>
           <Button variant="secondary" onClick={handleClose}>
             Cerrar
           </Button>
         </Modal.Footer>
       </Modal>

     </div>
   );
 };

export default SearchBarPrueba;