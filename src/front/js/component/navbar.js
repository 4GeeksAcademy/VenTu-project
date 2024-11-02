import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from "../store/appContext";
import toast, { Toaster } from 'react-hot-toast';
import logo from '../../static/images/ventu-logo.png';
import ventu from '../../static/images/ventu.png';
import '../../styles/navbar.css'

export const Navbar = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const { store, actions } = useContext(Context);

    useEffect(() => {
        console.log("Token actualizado:", store.token);
    }, [store.token]);

    const handleLogout = () => {
        actions.logout();
        navigate("/");
        window.location.reload();
    };

    const handleLogin = async () => {
        try {
            await actions.login(user.email, user.password);
            if (store.token) {
                const modalElement = document.getElementById('exampleModal');
                const modalInstance = bootstrap.Modal.getInstance(modalElement);
                if (modalInstance) {
                    modalInstance.hide();
                }
                if (store.user.role === 'provider') {
                    navigate("/");
                    window.location.reload();
                } else {

                    navigate("/");
                    window.location.reload();

                }
            } else {

            }
        } catch (error) {
            toast.error("Error en la solicitud. Por favor, inténtalo de nuevo.");
        }
    };



    return (
        <nav className="navbar navbar-light p-2" style={{ backgroundColor: '#00B4E7' }}>
            <Toaster /> {/* Renderiza los mensajes toast */}

            <div className="container d-flex justify-content-between navBar">

                <div >

                    <Link to="/" className="navbar-brand ">
                        <img src={ventu} alt="Ventu Logo" style={{ width: '120px', height: 'auto' }} />
                    </Link>
                    <Link to="/" className="btn text-black fs-5 custom-link">Inicio</Link>
                    <Link to="/tourplans" className="btn text-black fs-5 custom-link">Planes turisticos</Link>
                    <Link to="/about" className="btn text-black fs-5 custom-link">Sobre Nosotros</Link>

                </div>

                <div className="dropdown ">
                    <button
                        className="btn dropdown-toggle text-black fs-5 custom-link"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        {store.user ? `${store.user.username}` : "Iniciar / Registrarse"}
                    </button>
                    {!store.token ? (
                        <ul className="dropdown-menu dropdown-menu-end">
                            <li>
                                <button
                                    className="dropdown-item"
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModal"

                                >
                                    Iniciar sesión
                                </button>
                            </li>
                            <li>
                                <Link to="/register" className="btn btn-outline-light dropdown-item">
                                    Registrarse
                                </Link>
                            </li>
                        </ul>
                    ) : (
                        <ul className="dropdown-menu">
                            <li>
                                <button
                                    className="dropdown-item"
                                    onClick={handleLogout}
                                >
                                    Cerrar sesión
                                </button>
                            </li>
                            {store.user && store.user.role === 'client' ? (
                                <li>
                                    <Link to="/favorites" className="btn btn-outline-light dropdown-item">
                                        <i className='fas fa-heart text-danger me-2'></i>
                                        Favoritos
                                    </Link>
                                </li>
                            ) : store.user && store.user.role === 'provider' ? (
                                <li>
                                    {/* <Link to="/tour-plans" className="btn btn-outline-light dropdown-item">
                                        Mis Tour Plans
                                    </Link> */}
                                </li>
                            ) : null}
                        </ul>
                    )}
                    {/* Modal para iniciar sesión */}
                    <div
                        className="modal fade"
                        id="exampleModal"
                        tabIndex="-1"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                    >
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Iniciar Sesión</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <div className='mx-auto my-auto'>
                                        <div className="mb-3">
                                            <label className="form-label">Email</label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                value={user.email}
                                                onChange={(event) => setUser({
                                                    ...user,
                                                    email: event.target.value
                                                })}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Contraseña</label>
                                            <div className='d-flex'>
                                                <input
                                                    type={showPassword ? "text" : "password"}
                                                    className="form-control"
                                                    value={user.password}
                                                    onChange={(event) => setUser({
                                                        ...user,
                                                        password: event.target.value
                                                    })}
                                                    required
                                                />
                                                <div
                                                    className='btn'
                                                    onClick={() => setShowPassword(!showPassword)}
                                                >
                                                    {showPassword ? (
                                                        <i className="fa-solid fa-lock"></i>
                                                    ) : (
                                                        <i className="fa-solid fa-eye"></i>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        {/* <div className='btn btn-link'>Olvidaste tu contraseña?</div> */}
                                    </div>
                                </div>
                                <div className="d-flex">
                                    <div className='d-flex flex-column w-100 mx-3 py-2'>
                                        <button onClick={handleLogin} className="btn btn-success mt-2"
                                            style={{ backgroundColor: '#00B4E7' }}>
                                            Iniciar Sesión
                                        </button>
                                        <button
                                            className="btn btn-primary text-center mt-2"
                                            data-bs-dismiss="modal"
                                            onClick={() => navigate("/register")}
                                        >
                                            Registrarse
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};
