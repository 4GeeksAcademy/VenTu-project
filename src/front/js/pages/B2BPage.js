import React, { useState, useContext } from 'react';
import { Context } from '../store/appContext';

export const B2BPage = () => {
    const { store, actions } = useContext(Context);
    const [formData, setFormData] = useState();

    // const handleInputChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormData({
    //         ...formData,
    //         [name]: value,
    //     });
    // };

    const handleFileChange = (e) => {
        setFormData(
            e.target.files[0]
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // const formDataToSend = new FormData();
        // formDataToSend.append('companyName', formData.companyName);
        // formDataToSend.append('email', formData.email);
        // formDataToSend.append('planDescription', formData.planDescription);
        // formDataToSend.append('packageImage', formData.packageImage);

        // console.log([...formDataToSend]);
        const imageUpload = await actions.uploadImage(formData);

        if (imageUpload) {
            console.log('Imagen subida:', imageUpload);
        }
        alert('Formulario enviado');
    };

    return (
        <div className="container mt-5 mb-5">
            <div className="card shadow-lg p-4 mb-5 bg-white rounded" style={{ border: '2px solid #00B4E7' }}>
                <h1 className="text-center mb-4" style={{ color: '#00B4E7' }}>Registro para Empresas (B2B)</h1>

                {/* Sección de Información para Empresas */}
                <section className="mb-4">
                    <h2 style={{ color: '#00B4E7' }}>Información para Empresas</h2>
                    <p className="text-muted">
                        En nuestra plataforma, las empresas pueden registrarse y comenzar a ofrecer sus planes turísticos de manera sencilla. Crea una cuenta, completa tu perfil, y sube tus productos para ofrecerlos a miles de usuarios.
                    </p>
                </section>

                {/* Sección de Proceso de Registro */}
                <section className="mb-4">
                    <h2 style={{ color: '#00B4E7' }}>Proceso de Registro</h2>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">1. Crea una cuenta de empresa con la información básica.</li>
                        <li className="list-group-item">2. Verifica tu correo electrónico.</li>
                        <li className="list-group-item">3. Completa los detalles de tu empresa.</li>
                        <li className="list-group-item">4. Sube los productos o planes turísticos que deseas ofrecer.</li>
                        <li className="list-group-item">5. Comienza a gestionar tus planes en nuestra plataforma.</li>
                    </ul>
                    <p className="mt-2 text-muted">Nota: Las empresas pueden estar sujetas a tarifas de comisión dependiendo del tipo de plan registrado.</p>
                </section>

                {/* Formulario de Registro */}
                <section>
                    <h2 style={{ color: '#00B4E7' }} className="mb-3">Formulario de Registro</h2>
                    <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                        <div className="form-group mb-3">
                            <label htmlFor="companyName" className="form-label">Nombre de la Empresa</label>
                            <input
                                type="text"
                                className="form-control"
                                id="companyName"
                                name="companyName"
                                // value={formData.companyName}
                                // onChange={handleInputChange}
                                required
                            />
                            <div className="invalid-feedback">Por favor ingresa el nombre de tu empresa.</div>
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="email" className="form-label">Correo Electrónico</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                // value={formData.email}
                                // onChange={handleInputChange}
                                required
                            />
                            <div className="invalid-feedback">Por favor ingresa un correo válido.</div>
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="planDescription" className="form-label">Descripción del Plan Turístico</label>
                            <textarea
                                className="form-control"
                                id="planDescription"
                                name="planDescription"
                                rows="3"
                                // value={formData.planDescription}
                                // onChange={handleInputChange}
                                required
                            ></textarea>
                            <div className="invalid-feedback">Por favor describe el plan turístico.</div>
                        </div>

                        {/* Campo para subir imagen */}
                        <div className="form-group mb-4">
                            <label htmlFor="packageImage" className="form-label">Imagen del Paquete Turístico</label>
                            <input
                                type="file"
                                className="form-control"
                                id="packageImage"
                                name="packageImage"
                                accept="image/*"
                                onChange={handleFileChange}
                                required
                            />
                            <div className="invalid-feedback">Por favor sube una imagen del paquete turístico.</div>
                        </div>

                        <button type="submit" className="btn btn-primary btn-block" style={{ backgroundColor: '#00B4E7', borderColor: '#00B4E7' }}>
                            Registrar Empresa
                        </button>
                    </form>
                </section>
            </div>
        </div>
    );
};
