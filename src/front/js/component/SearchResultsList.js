import React from "react";
import PackageCard from "./PackageCard";

export const SearchResultsList = ({ results }) => { 
    return (
        <div className="container mt-3"> 
            <div className="row"> 
            {results.map((result, id) => {
                    return (
                        <div key={id} className="col-md-4 mb-4"> 
                            <PackageCard 
                                    claasName="card gap-3"
                                    key={id} 
                                    actividades={[result]}
                                />
                        </div>
                    );
                })
            }
            </div>
        </div>
    );
};