import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./auth.css";
import Logo from "./assets/RawEdge.png"; // <-- Importa la imagen

function ForgotPassword() {
  const [correo, setCorreo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       const res = await fetch("https://rawedge-backend.onrender.com/api/usuarios/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        <img src={Logo} alt="Logo" className="auth-logo" />
      </div>

      <div className="auth-right">
        <h2>Recuperar contraseña</h2>
        <p>Ingresa tu correo y te enviaremos un enlace para restablecerla.</p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
          <button type="submit">Enviar enlace</button>
        </form>

        <ToastContainer position="bottom-center" autoClose={3000} />
      </div>
    </div>
  );
}

export default ForgotPassword;
