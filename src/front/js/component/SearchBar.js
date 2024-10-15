import React, { useState,useEffect } from "react";

export const SearchBar = ({ setResults }) => { 
    const [input, setInput] = useState('');
    const [finded, setFinded] = useState([]);


    // const fetchData = () => {
    //     fetch(`${process.env.BACKEND_URL}/api/tourplans`)
    //     .then((response) => response.json())
    //     .then((json) => {
    //     //    const results = json.filter((plan) => { 
    //     //     return value && plan && plan.title && plan.title.toLowerCase().includes(value)
    //     //     }); 
    //     //     setResults(results)
    //     console.log(json);
    //     });
    // }

    const handleChange = (value) => {
        setInput(value);
        // fetchData(value);
    }
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`${process.env.BACKEND_URL}/api/tourplans`);
            const data = await response.json();
            setFinded(data);
        }
        fetchData();
    }, []);

    useEffect(() => {
        const search = finded.filter((plan) => { 
            return input && plan && plan.title && plan.title.toLowerCase().includes(input)
            }); 
            setResults(search)
    }, [input]);

   return (

    <div className="col-3 rounded-pill"> 
        <div className="input-wrapper "> 
                <input placeholder="Search..." 
                value= {input} 
                onChange={ (e) => handleChange(e.target.value)} />
        </div> 
    </div>

   )
    
}