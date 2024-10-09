import React, { useState } from "react";
import PackageCard from "../component/PackageCard";
import Filters from "../component/PackagesFilters";
import { PackagesSlide } from "../component/PackagesSlide";
import SearchForm from "../component/SearchFormPackage";


export const PackagesList = () => {
    const [packages, setPackages] = useState([]);
    const [filters, setFilters] = useState({
        destination: "",
        minPrice: "",
        maxPrice: ""
    });

    const filterPackages = () => {
        return packages.filter((pkg) =>
          pkg.destination.includes(filters.destination) &&
          pkg.price >= filters.minPrice &&
          pkg.price <= filters.maxPrice
        );
      };

    return (
        <div> 
            <div> 
                
            </div>

            <div>

                <div className="p-5"> 
                    <SearchForm/>
                </div> 

                 {/* <PackagesSlide />  */}
                
                <div className="gap-5 d-flex justify-content-center"> 
                    <PackageCard />
                    <PackageCard />
                    <PackageCard />
                </div>

                {/* <Filters filters={filters} setFilters={setFilters} /> */}
                
            </div>
        </div>
    );
};

