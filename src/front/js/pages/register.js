import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaUserTag } from "react-icons/fa";

const Register = () => {
  const { actions } = useContext(Context);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("client");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await actions.register(email, name, password, role);
    if (result) {
      setName("");
      setEmail("");
      setPassword("");
      setRole("client");
      navigate("/");
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h1 className="register-title">¡Únete a Ventu!</h1>
        <p className="register-description">
          Explora increíbles experiencias turísticas o ofrece las tuyas. Completa el formulario para registrarte en Ventu, y selecciona si eres un cliente o un proveedor.
        </p>
        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label className="form-label">
              <FaUser className="input-icon" /> Nombre completo
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Ejemplo: Juan Pérez"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              <FaEnvelope className="input-icon" /> Correo electrónico
            </label>
            <input
              type="email"
              className="form-control"
              placeholder="tucorreo@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              <FaLock className="input-icon" /> Contraseña
            </label>
            <input
              type="password"
              className="form-control"
              placeholder="Escribe una contraseña segura"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              <FaUserTag className="input-icon" /> Tipo de usuario
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="form-select"
            >
              <option value="">Selecciona tu rol</option>
              <option value="client">Cliente</option>
              <option value="provider">Proveedor</option>
            </select>
          </div>

          <button type="submit" className="btn-submit">
            ¡Regístrate!
          </button>
        </form>
      </div>

      <style>{`
        .register-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: #f0f2f5;
          padding: 20px;
        }

        .register-card {
          max-width: 500px;
          width: 100%;
          background: white;
          padding: 30px;
          border-radius: 15px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          text-align: center;
        }

        .register-title {
          font-size: 2rem;
          color: #007bff;
          margin-bottom: 10px;
        }

        .register-description {
          font-size: 1rem;
          color: #666;
          margin-bottom: 30px;
        }

        .register-form .form-group {
          margin-bottom: 20px;
          text-align: left;
        }

        .form-label {
          display: block;
          font-size: 0.9rem;
          color: #333;
          font-weight: 600;
          margin-bottom: 5px;
          position: relative;
        }

        .input-icon {
          margin-right: 5px;
          color: #007bff;
        }

        .form-control {
          width: 100%;
          padding: 10px;
          font-size: 1rem;
          border: 1px solid #ccc;
          border-radius: 8px;
          outline: none;
          transition: border-color 0.2s;
        }

        .form-control:focus {
          border-color: #007bff;
        }

        .form-select {
          width: 100%;
          padding: 10px;
          font-size: 1rem;
          border: 1px solid #ccc;
          border-radius: 8px;
          outline: none;
          transition: border-color 0.2s;
        }

        .form-select:focus {
          border-color: #007bff;
        }

        .btn-submit {
          width: 100%;
          padding: 12px;
          background-color: #007bff;
          color: white;
          font-size: 1.1rem;
          font-weight: bold;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.3s;
          margin-top: 20px;
        }

        .btn-submit:hover {
          background-color: #0056b3;
        }
      `}</style>
    </div>
  );
};

export default Register;
