import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

const Register = () => {
  const { store, actions } = useContext(Context);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { contact_id } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evitar el comportamiento por defecto del formulario

    const contact = {
      username: name,
      email: email,
      password_hash: password,
    };

    // Cambia esto para usar la acción de registro
    if (contact_id !== undefined) {
      // Si estás editando un contacto existente
      actions.updateContact(contact, contact_id);
    } else {
      // Aquí llamamos a la acción de registro
      await actions.register(contact.email, contact.username, contact.password_hash);
    }

    setName("");
    setEmail("");
    setPassword("");
    navigate("/"); // Redirigir después del registro
  };

  useEffect(() => {
    if (Array.isArray(store.user)) {
      const contacts = [...store.user];
      if (contact_id !== undefined) {
        const contact = contacts.find((item) => item.id === parseInt(contact_id));
        setName(contact?.username);
        setEmail(contact?.email);
        setPassword(contact?.password);
      }
    }
  }, [store.user, contact_id]);

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

            {/* Cambiar Link a un botón normal que llama a handleSubmit */}
            <button type="submit" className="btn btn-primary w-100">
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