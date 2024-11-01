import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

import logo from '../../static/images/plan-pais-turismo.jpg';

// Importar el componente PhoneInput
// import PhoneInput from 'react-phone-input-2'
// import 'react-phone-input-2/lib/style.css'


const Register = () => {
  const { actions } = useContext(Context);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [phone, setPhone] = useState("");
  const [role, setRole] = useState("client");


  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evitar el comportamiento por defecto del formulario

    const result = await actions.register(email, name, password, role);
    if (result) {
      setName("");
      setEmail("");
      setPassword("");
      // setPhone("");
      setRole("");
      navigate("/"); // Redirigir después del registro
    }

  };

  return (
    <div className="container">
      <div className="row">
        {/* Left Box */}
        <div className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box" >
          <h1 >Bienvenido a Ventu</h1>
          <p >Regístrate y encuentra los mejores planes turísticos en Venezuela</p>
          <div className="featured-image mb-3">
            <img src={logo} className="img-fluid" style={{ width: '100%', height: '450px'  }} alt="logo" />
          </div>
        </div>

        {/* Right Box */}
        <div className="col-md-6 d-flex justify-content-center align-items-center flex-column right-box ">




          <div className=" my-2 col-md-6 col-lg-10">
            <form onSubmit={handleSubmit}> {/* Agregar el evento onSubmit al formulario */}
              <div className="mb-3">
                <label htmlFor="formGroupExampleInput" className="form-label">Nombre completo</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre completo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="formGroupExampleInput" className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="formGroupExampleInput" className="form-label">Contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* <div className="mb-3">
              <label htmlFor="formGroupExampleInput" className="form-label">Phone</label>
              <PhoneInput
                country={'co'}
                value={phone}
                onChange={(phone) => setPhone(phone)}
              />
            </div> */}

              <div className="mb-3">

                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="form-select"
                  aria-label="Default select example"
                >
                  <option value="">Selecciona tipo de usuario</option>
                  <option value="client">Cliente</option>
                  <option value="provider">Proveedor</option>

                </select>
              </div>

              {/* Cambiar Link a un botón normal que llama a handleSubmit */}
              <button type="submit" className="btn btn-primary w-100 " >
                Registrate
              </button>
            </form>

            {/* Enlace para regresar a contactos */}

          </div>
          <p>¿Ya tienes una cuenta?
            <button
              className="btn btn-link p-0"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Inicia sesión
            </button>
          </p>

        </div>



      </div>
    </div>
  );
};

export default Register;