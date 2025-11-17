import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";

import logo from "./assets/RawEdge.png";
import googleIcon from "./assets/google.png";
import fondo from "./assets/fond.jpg";
import instagram from "./assets/instagram.png";
import whatsapp from "./assets/whatsapp.png";
import facebooke from "./assets/facebooke.png";

function Register() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const navigate = useNavigate();

  // ======================================
  // 🔥 GOOGLE LOGIN HANDLER
  // ======================================
  const handleCredentialResponse = async (response) => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: response.credential }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Error con Google Login");
        return;
      }

      // Si el backend indica que NO tiene contraseña
      if (data.necesitaPassword) {
        alert("Completa tu registro creando una contraseña.");
        navigate(`/crear-password/${data.userId}`);
        return;
      }

      alert(`Bienvenido ${data.usuario.nombre}`);
      navigate("/principal");

    } catch (error) {
      console.error(error);
      alert("Error procesando Google Login");
    }
  };

  // ======================================
  // 🔥 RENDERIZAR BOTÓN DE GOOGLE
  // ======================================
  useEffect(() => {
    const interval = setInterval(() => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
          callback: handleCredentialResponse,
          auto_select: false,
        });

        window.google.accounts.id.renderButton(
          document.getElementById("googleSignInDiv"),
          { theme: "outline", size: "large" }
        );

        clearInterval(interval);
      }
    }, 100);
  }, []);

  // ======================================
  // 🔥 REGISTRO NORMAL
  // ======================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, apellido, correo, contraseña }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Error al registrar usuario");

      alert(`Usuario ${data.nombre} registrado correctamente`);

      setNombre("");
      setApellido("");
      setCorreo("");
      setContraseña("");

      navigate("/login");

    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  // ======================================
  // 🔥 RETURN JSX
  // ======================================
  return (
    <div className="register-container">
      <div className="register-left">
        <img src={logo} alt="RawEdge Logo" className="register-logo" />

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Apellido"
            value={apellido}
            onChange={e => setApellido(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Correo"
            value={correo}
            onChange={e => setCorreo(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={contraseña}
            onChange={e => setContraseña(e.target.value)}
            required
          />

          <button type="submit">Registrarse</button>
        </form>

        <div className="divider"><span>o</span></div>

        <div className="google-login-wrapper">
          <div id="googleSignInDiv" className="google-login-btn">
            <img src={googleIcon} alt="Google Icon" className="google-icon" />
          </div>
        </div>
      </div>

      <div
        className="register-right"
        style={{
          backgroundImage: `url(${fondo})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="register-right-overlay">
          <h2>Bienvenido a RawEdge</h2>
          <p>
            Únete a nuestra comunidad y accede a las últimas colecciones de ropa urbana y moderna.
            Síguenos en nuestras redes sociales y mantente al día con ofertas y novedades.
          </p>

          <div className="social-icons">
            <img src={instagram} alt="Instagram" />
            <img src={whatsapp} alt="WhatsApp" />
            <img src={facebooke} alt="Facebook" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
