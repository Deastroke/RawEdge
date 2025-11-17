import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import logo from "./assets/RawEdge.png";
import instagram from "./assets/instagram.png";
import whatsapp from "./assets/whatsapp.png";
import facebooke from "./assets/facebooke.png";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  

  
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch("http://localhost:5000/api/usuarios/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correo: email, contraseña: password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Error al iniciar sesión");
    }

    // ✅ Guarda toda la info del usuario
    localStorage.setItem("usuario", JSON.stringify(data.usuario));

    // ✅ También guarda el ID del usuario por separado (para el carrito)
    localStorage.setItem("usuarioId", data.usuario._id);

    alert(`Bienvenido ${data.usuario.nombre}`);
    navigate("/principal"); // Redirige al home
  } catch (error) {
    alert(error.message);
    console.error(error);
  }
};


  return (
    <div className="login-container">
      <div className="login-left">
        <img src={logo} alt="RawEdge" className="login-logo" />
      </div>

      <div className="login-right">
        <h2>Bienvenido</h2>
        <p>Inicia sesión para acceder a tu cuenta y descubrir nuestras últimas colecciones.</p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Iniciar sesión</button>
        </form>

        <p className="login-register-text">
          ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
        </p>
        <p className="login-register-text">
  <Link to="/forgot">¿Olvidaste tu contraseña?</Link>
</p>

        <div className="login-socials">
          <img src={instagram} alt="Instagram" />
          <img src={whatsapp} alt="WhatsApp" />
          <img src={facebooke} alt="Facebook" />
        </div>
      </div>
    </div>
  );
}

export default Login;
