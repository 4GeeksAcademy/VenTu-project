import React, { useState, useEffect } from "react";
import PackageCard from "../component/PackageCard";
import { PackagesSlide } from "../component/PackagesSlide";
import { SearchBar } from "../component/SearchBar";
import { SearchResultsList } from "../component/SearchResultsList";
import SearchBarPrueba from "../component/SearchFormPackage";
import DateSearch from "../component/SearchDate";


export const PackagesList = () => {
    const [actividades, setActividades] = useState([]);
    const [results, setResults] = useState([]);
    const [people, setPeople] = useState('');

        useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/tourplans`);
                    const data = await response.json();
                    setActividades(data);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };

            fetchData();
        }, []);

    return (
        <div> 

            <div className="p-5"> 
                <SearchBarPrueba setResults={setResults}/>
            </div>  

            <div>   
                <SearchResultsList results={results} />
            </div> 

            <div className= "mb-4 mt-4"> 
                <PackagesSlide actividades={actividades}/>
            </div>
            
            <div> 
                <h5 className= "mb-4 mt-4 ms-5 ps-5"> Chequea Todos Nuestros Tours! </h5> 
                <PackageCard actividades={actividades} />
            </div>
                
        </div>
    );
};