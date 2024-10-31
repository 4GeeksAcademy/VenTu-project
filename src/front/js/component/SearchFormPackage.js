import React, { useState } from 'react';
import { Form, Button, Modal,  } from 'react-bootstrap';
import PackagesFilters from './PackagesFilters';

const SearchBarPrueba = ({ setResults }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [message, setMessage] = useState("");

  const handleSearch = async () => {
      try {
          const response = await fetch(`${process.env.BACKEND_URL}/api/tourplans`);
          const data = await response.json();
          const filteredResults = data.filter(plan => {
              const matchesSearchTerm = plan.title.toLowerCase().includes(searchTerm.toLowerCase());
              const matchesDateRange = (!startDate || plan.start_date === startDate);
              return matchesSearchTerm && matchesDateRange;
          });

          if (filteredResults.length === 0) {
            const similarResults = data.filter(plan => {
                const matchesSearchTerm = plan.title.toLowerCase().includes(searchTerm.toLowerCase());
                const matchesSimilarDate = (!startDate || plan.start_date >= startDate);
                return matchesSearchTerm && matchesSimilarDate;
            });
            setResults(similarResults);
            setMessage("Mostrando resutados similares.");
        } else {
            setResults(filteredResults);
            setMessage("");
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
  };

   return (
    <div className="container col-4 p-3 rounded-3" style={{ backgroundColor: '#F2F4FF', borderColor: '#F2F4FF' }}>
            
      <div className="row m-1">
        
        <div className="col-6">
          <Form.Group controlId="formDestination">
            <Form.Label> ¿A donde vas? </Form.Label>
              <Form.Control
              className='rounded-pill'
              placeholder="Destino"
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)}
              required
            />
          </Form.Group>
        </div>


        <div className="col-6">
          <Form.Group controlId="formStartDate">
            <Form.Label> ¿Cuando vas? </Form.Label>
            <Form.Control
        
              className='rounded-pill'
              type="date"
              value={startDate}
              placeholder="Start Date" 
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </Form.Group>
        </div>

        <div className="row mt-3">
          <div className="row text-center d-flex justify-content-center">

            <Button onClick={handleSearch} className="btn-primary rounded-pill col-6" style={{ backgroundColor: "#242B47", borderColor: "#242B47" }}>
              BUSCAR 
            </Button>

          </div>
        </div>

        {message && (
          <div className="row mt-3">
            <div className="col-12">
              <p className="text-center" style={{ color: '#242B47' }}>{message}</p>
            </div>
          </div>
        )}
 
      </div>
    </div>

   );
 };

export default SearchBarPrueba;