import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Logo from "./assets/RawEdge.png";
import "./auth.css";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [msg, setMsg] = useState("");
  const [validToken, setValidToken] = useState(null);

  // URL de tu backend en Render
  const BACKEND_URL = "https://rawedge-backend.onrender.com/api/usuarios";

  useEffect(() => {
    const verificarToken = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/verify-token/${token}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        setValidToken(true);
      } catch (error) {
        setValidToken(false);
        setMsg("El enlace expiró o es inválido.");
      }
    };
    verificarToken();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      setMsg("Las contraseñas no coinciden");
      return;
    }

    try {
      const res = await fetch(`${BACKEND_URL}/reset-password/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nuevaContraseña: password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setMsg("Contraseña actualizada correctamente");

      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setMsg(error.message);
    }
  };

  if (validToken === null) return <p className="loading-msg">Cargando...</p>;

  if (!validToken)
    return (
      <div className="reset-container">
        <div className="reset-card">
          <h2>Enlace inválido</h2>
          <p>{msg}</p>
          <button onClick={() => navigate("/forgot-password")}>
            Solicitar nuevo enlace
          </button>
        </div>
      </div>
    );

  return (
    <div className="reset-container">
      <div className="reset-card">
        <img src={Logo} alt="Logo" className="reset-logo" />
        <h2>Restablecer contraseña</h2>

        <form onSubmit={handleSubmit} className="reset-form">
          <input
            type="password"
            placeholder="Nueva contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="reset-input"
          />
          <input
            type="password"
            placeholder="Confirmar contraseña"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
            className="reset-input"
          />
          <button type="submit" className="reset-button">
            Guardar contraseña
          </button>
        </form>

        {msg && <p className="reset-msg">{msg}</p>}
      </div>
    </div>
  );
}

export default ResetPassword;
