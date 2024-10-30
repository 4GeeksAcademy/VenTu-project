import React, { useContext } from "react";
import { Context } from "../store/appContext";
import PackageCard from "../component/PackageCard";

export const Favorite = () => {
    const { store } = useContext(Context);

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <h1 className="text-center mt-5">Tus Favoritos</h1>
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
                            <h2 className="text-center mt-5">No tienes favoritos aún</h2>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
