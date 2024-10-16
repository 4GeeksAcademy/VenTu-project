import React from "react";

export const SearchResultsList = ({ results }) => { 
    return (
        <div className="results-list"> 
         {
            results.map((result, id) => {
                return (
                    <div key={id} >
                        {result.title}
                    </div>
                );
            })
         }
        </div>
    );
};