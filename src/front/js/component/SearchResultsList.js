import React from "react";
import PackageCard from "./PackageCard";

export const SearchResultsList = ({ results }) => { 
    return (
        <div className="results-list"> 
         {
            results.map((result, id) => {
                return (
                    <div key= {id}> 
                        {result.title}
                    </div> 

                    // <PackageCard 
                    //         key={id} 
                    //         actividades={[result]}
                    //     />
                );
            })
         }
        </div>
    );
};