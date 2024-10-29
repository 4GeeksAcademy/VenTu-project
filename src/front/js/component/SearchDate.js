import React, { useState } from "react";

const DateSearch = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleSearch =  async () => { 
        if (!startDate) {
            alert("Please select a start date");
            return;
        }

        const response = await fetch(`${`${process.env.BACKEND_URL}/api/tourplans`}?start=${startDate}&end=${endDate}`);
        const data = await response.json();
        console.log(data);

    };

    return (
        <div> 
            
            <h2> Search by Date </h2>
            <input 
            type="date" 
            value={startDate} 
            onChange={(e) => setStartDate(e.target.value)} />
            <button onClick={handleSearch}> Search </button>

        </div>
    )

}

export default DateSearch;