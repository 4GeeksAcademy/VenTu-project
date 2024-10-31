import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

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

    const result = await actions.register(email, name, password, role );
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
        <div className="col-m-12 ">
          <h1 className="text-center">Bienvenido!</h1>
          <h3 className="text-center">Inicia sesión o regístrate</h3>
        </div>
        <div className="col-m-12">
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
              <label htmlFor="formGroupExampleInput" className="form-label">Password</label>
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
              <select defaultValue={"client"} onChange={(e) => setRole(e.target.value)} className="form-select" aria-label="Default select example">
                <option value="client">Client</option>
                <option value="provider">Provider</option>
              </select>
            </div>

            {/* Cambiar Link a un botón normal que llama a handleSubmit */}
            <button type="submit" className="btn btn-primary w-100" >
              Register
            </button>
          </form>

          {/* Enlace para regresar a contactos */}
          <Link to="/" className="text-decoration-underline" onClick={() => navigate("/")}>
            Or get back to contacts
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;