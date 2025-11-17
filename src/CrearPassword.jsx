import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Logo from "./assets/RawEdge.png";
import "./auth.css";

function CrearPassword() {
  const { userId } = useParams(); // <-- Aquí tomas el userId desde la URL
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirm) {
      return setMsg("Las contraseñas no coinciden");
    }

    try {
      const res = await fetch(`http://localhost:5000/api/usuarios/create-password/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nuevaContraseña: password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setMsg("Contraseña creada correctamente");
      setTimeout(() => navigate("/login"), 2000);

    } catch (error) {
      setMsg(error.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <img src={Logo} alt="Logo" className="auth-logo" />
        <h2>Crear contraseña</h2>
        <p>Establece una contraseña para tu cuenta</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="password"
            placeholder="Nueva contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="auth-input"
          />
          <input
            type="password"
            placeholder="Confirmar contraseña"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
            className="auth-input"
          />
          <button type="submit" className="auth-button">Guardar contraseña</button>
        </form>

        {msg && <p className="auth-msg">{msg}</p>}
      </div>
    </div>
  );
}

export default CrearPassword;
