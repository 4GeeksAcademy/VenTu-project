import React, { useState, useContext } from 'react';
import { Context } from '../store/appContext';
import '../../styles/tourPlanForm.css';

export const CrearTourPlan = () => {
    const { actions } = useContext(Context);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        available_spots: '',
        start_date: '',
        end_date: '',
        image_url: ''
    });

    const [imageFile, setImageFile] = useState(null);
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
    };

    // Subir la imagen y obtener la URL
    const handleSubmit = async (e) => {
        e.preventDefault();
        let imageUrl = formData.image_url;
        console.log(imageFile);
        if (imageFile) {
            const imageUploadUrl = await actions.uploadImage(imageFile);
            console.log(imageUploadUrl);
            if (imageUploadUrl) {
                imageUrl = imageUploadUrl;
                console.log("Imagen subida correctamente: ", imageUrl);
            } else {
                alert('Error al subir la imagen.');
                return;
            }
        }

        const data = new FormData();
        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('price', formData.price);
        data.append('available_spots', formData.available_spots);
        data.append('start_date', formData.start_date);
        data.append('end_date', formData.end_date);
        data.append('image_url', imageUrl);

        const created = await actions.createTourPlan(data);
        if (created) {
            alert('Tour plan creado con éxito');
        } else {
            alert('Error al crear el Tour Plan');
        }
    };
    console.log(FormData);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <div className="container mt-5 mb-5">
            <div className="card shadow-lg p-4 mb-5 bg-white rounded" style={{ border: '2px solid #00B4E7' }}>
                <h1 className="text-center mb-4" style={{ color: '#00B4E7' }}>Crear Tour Plan</h1>
                <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                    {/* Inputs controlados */}
                    <div className="form-group mb-3">
                        <label htmlFor="title" className="form-label">Nombre del Tour</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            required
                        />
                        <div className="invalid-feedback">Por favor ingresa el nombre del tour.</div>
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="description" className="form-label">Descripción del Tour</label>
                        <textarea
                            className="form-control"
                            id="description"
                            name="description"
                            rows="3"
                            value={formData.description}
                            onChange={handleInputChange}
                            required
                        ></textarea>
                        <div className="invalid-feedback">Por favor describe el tour.</div>
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="price" className="form-label">Precio</label>
                        <input
                            type="number"
                            className="form-control"
                            id="price"
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                            required
                        />
                        <div className="invalid-feedback">Por favor ingresa el precio del tour.</div>
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="available_spots" className="form-label">Cupos Disponibles</label>
                        <input
                            type="number"
                            className="form-control"
                            id="available_spots"
                            name="available_spots"
                            value={formData.available_spots}
                            onChange={handleInputChange}
                            required
                        />
                        <div className="invalid-feedback">Por favor ingresa el número de cupos disponibles.</div>
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="start_date" className="form-label">Fecha de Inicio</label>
                        <input
                            type="date"
                            className="form-control"
                            id="start_date"
                            name="start_date"
                            value={formData.start_date}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="end_date" className="form-label">Fecha de Finalización</label>
                        <input
                            type="date"
                            className="form-control"
                            id="end_date"
                            name="end_date"
                            value={formData.end_date}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    {/* Subida de imagen */}
                    <div className="form-group mb-4">
                        <label htmlFor="image" className="form-label">Imagen del Tour</label>
                        <input
                            type="file"
                            className="form-control"
                            id="image"
                            name="image"
                            accept="image/*"
                            onChange={handleFileChange}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary btn-block" style={{ backgroundColor: '#00B4E7', borderColor: '#00B4E7' }}>
                        Crear Tour Plan
                    </button>
                </form>
            </div>
        </div>
    );
};
