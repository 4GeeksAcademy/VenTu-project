import React from 'react';
import { Form, Button } from "react-bootstrap";

const PackagesFilters = ({ filters, setFilters}) => { 


    return (
        
        <div className="m2" tabindex="-1">
            
                            
            <div clasName= "row"> 
                <p> Elige tu rango de precios</p>
            <div>

                <input type="range" id="volume" name="volume" min="0" max="11" />
                <label for="volume">Minimo</label>
                </div>

                <div>
                <input type="range" id="cowbell" name="cowbell" min="0" max="100" value="90" step="10" />
                <label for="cowbell">Maximo </label>
                </div>
                            
            </div>
            
        </div>
            
        
    );
};


export default PackagesFilters;