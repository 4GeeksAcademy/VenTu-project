import React from 'react';
import { Form, Button } from "react-bootstrap";

const Filters = ({ filters, setFilters}) => { 

    const handleInputChange = (e) => { 
        const { name, value } = e.target;
        setFilters({ 
            ...filters, 
            [name]: value 
        });
    };

    return (
        <Form className="mb-4">
            <div clasName= "row"> 

                {/* Filtro por destino */}
                <div className= "col-4">
                    <Form.Group className="mb-3">
                        <Form.Label> Destino </Form.Label>
                        <Form.Control 
                            type="text"
                            name="destination"
                            value={filters.destination}
                            onChange={handleInputChange}
                            placeholder="Enter destination"
                        />
                    </Form.Group>
                </div>

                {/* Filtro por precio minimo */}
                <div className= "col-3">
                    <Form.Group className="mb-3">
                        <Form.Label> Precio minimo </Form.Label>
                        <Form.Control 
                            type="number"
                            name="minPrice"
                            value={filters.minPrice}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                </div>

                {/* Filtro por precio maximo */}
                <div className= "col-3">
                    <Form.Group className="mb-3">
                        <Form.Label> Precio maximo </Form.Label>
                        <Form.Control 
                            type="number"
                            name="maxPrice"
                            value={filters.maxPrice}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                </div>

                {/* Boton para aplicar filtros */}
                <div> 
                    <Button className= "btn-primary w-100" >
                        Aplicar Filtros
                    </Button>
                </div>

            </div>
        </Form>
    );
};

export default Filters;
