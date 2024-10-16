import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const Navbar = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    return (
        <nav className="navbar navbar-light" style={{ backgroundColor: '#00B4E7' }}>
            <div className="container">
                <Link to="/" className="navbar-brand text-white">
                    {/* <img src="/path/to/logo.png" alt="Brand Logo" width="30" height="30" /> */}
                    Mi Marca
                </Link>
                <div>
                    <Link to="/" className="btn btn-outline-light">Inicio</Link>
                    <Link to="/about" className="btn btn-outline-light">Sobre Nosotros</Link>

                </div>

                <div className="dropdown">
                    <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Iniciar / Registrarse
                    </button>
                    <ul className="dropdown-menu">
                        <li>
                            <button className="dropdown-item" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                Iniciar sesión
                            </button>
                        </li>
                        <li>
                            <Link to="/register" className="btn btn-outline-light dropdown-item">
                                Registre
                            </Link>
                        </li>
                        <li>
                            <Link to="/" className="btn btn-outline-light dropdown-item">Log in</Link>
                        </li>
                    </ul>

                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                            <input type="email" className="form-control" onChange={(event) => setUser({
                                                ...user,
                                                email: event.target.value
                                            })} />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Contraseña</label>

                                            <div className='d-flex'>
                                                <input type={showPassword ? "text" : "password"} className="form-control" onChange={(event) => setUser({
                                                    ...user,
                                                    password: event.target.value
                                                })} />

                                                <div className='btn'
                                                    onClick={() => setShowPassword(!showPassword)}
                                                >{showPassword ? <i className="fa-solid fa-lock"></i> : <i className="fa-solid fa-eye"></i>}</div>
                                            </div>
                                        </div>

                                        <div className='btn btn-link'>Olvidaste tu contraseña?</div>

                                    </div>
                                </div>
                                <div className="d-flex">
                                    <div className='d-flex flex-column w-100 mx-3 py-2'>

                                        <button onClick={() => console.log(user)
                                        }
                                            className="btn btn-success mt-2">Iniciar Sesión</button>
                                        <button className="btn btn-primary  text-center mt-2" data-bs-dismiss="modal" onClick={() => {
                                            navigate("/register")
                                        }}>
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
