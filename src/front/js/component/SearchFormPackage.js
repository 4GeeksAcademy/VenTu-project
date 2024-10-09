import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Filters from "../component/PackagesFilters";

const SearchForm = ({ onSearch }) => {
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [people, setPeople] = useState(1);
  const handleSubmit = (e) => {
    e.preventDefault();


    const searchParams = {
      destination,
      startDate,
      endDate,
      people
    };

    onSearch(searchParams);
  };


  return (

    <div className="container col-6 p-3 rounded-3" style={{ backgroundColor: '#F2F4FF', borderColor: '#F2F4FF' }}>

      <Form onSubmit={handleSubmit} className="m-1">

        <div className="row m-1">

          <div className="col-5">
            <Form.Group controlId="formDestination">
              <Form.Label> ¿A donde vas? </Form.Label>
              <Form.Control
                className='rounded-pill'
                type="text"
                placeholder="Destino"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
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

          <Button className="btn-primary rounded-pill col-1 mt-4" style={{ height:"40px", backgroundColor: "#ffffff", borderColor: "#ffffff" }}>
            <i class="fa-solid fa-sliders" style={{ color: "#242B47" }}></i>
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
    </div>
  );
};
export default SearchForm;