import React, { useContext } from "react";
import { Context } from "../store/appContext";
import PackageCard from "../component/PackageCard";
import backgroundImage from '../../static/images/corazones.png';

export const Favorite = () => {
    const { store } = useContext(Context);

    return (
        <div className="container" style={{minHeight: '100vh'}} >

            <div className="row">
                <div className="col">
                    <h3 className="text-start mt-5">Tus Favoritos</h3>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <div className="d-flex flex-wrap gap-2 justify-content-center">
                        {store.favorites && store.favorites.length > 0 ? (
                            store.favorites.map((favorite, index) => (
                                <PackageCard key={index} actividades={[favorite]} />
                            ))
                        ) : (
                            <h3 className="text-center text-danger mt-5"> <i className="fa-solid fa-circle-exclamation"></i> No tienes favoritos aún </h3>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
