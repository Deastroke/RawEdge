import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiFillHome, AiOutlineAppstore, AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";

import "./perfil.css";
import perfilImg from "./assets/user.png";
import logo from "./assets/RawEdge.png";
import carrito from "./assets/cart.png";
import perfilIcon from "./assets/user.png";
import axios from "axios";
import instagram from "./assets/instagram.png";
import whatsapp from "./assets/whatsapp.png";
import playstor from "./assets/playstore.png";
import appstore from "./assets/appstore.png";
import faceboke from "./assets/facebooke.png";

function Perfil() {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState({
    _id: "",
    nombre: "",
    correo: "",
  });

  const [editar, setEditar] = useState(false);
  const [nuevoNombre, setNuevoNombre] = useState("");
  const [nuevoCorreo, setNuevoCorreo] = useState("");

  // Cargar usuario desde localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("usuario");
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setUsuario(user);
      setNuevoNombre(user.nombre);
      setNuevoCorreo(user.correo);
    }
  }, []);

  const handleCerrarSesion = () => {
    localStorage.removeItem("usuario");
    navigate("/");
  };

  const handleGuardar = async () => {
    try {
      // Actualizar en base de datos
      const res = await axios.put(`https://rawedge-backend.onrender.com/api/usuarios/${usuario._id}`, {
        nombre: nuevoNombre,
        correo: nuevoCorreo,
      });

      if (res.status === 200) {
        const updatedUser = res.data; // Usuario actualizado desde el backend
        setUsuario(updatedUser);
        localStorage.setItem("usuario", JSON.stringify(updatedUser));
        setEditar(false);
        alert("Perfil actualizado correctamente.");
      } else {
        alert("Error al actualizar el perfil");
      }
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      alert("No se pudo actualizar el perfil");
    }
  };

  return (
    <div className="perfil-page">

   {/* 🔷 NAVBAR SUPERIOR */}
<nav className="perfil-navbar">
  <div className="perfil-navbar-top">

    {/* LOGO */}
    <div className="perfil-navbar-logo">
      <Link to="/principal">
        <img src={logo} alt="Logo RawEdge" />
      </Link>
    </div>

    {/* ICONOS DERECHA */}
    <div className="perfil-navbar-icons" style={{ marginLeft: "auto" }}>
      <Link to="/carrito">
        <img src={carrito} alt="Carrito" className="icon" />
      </Link>
      <Link to="/perfil">
        <img src={perfilIcon} alt="Perfil" className="icon" />
      </Link>
    </div>

  </div>
</nav>


      {/* 🔷 NAVBAR INFERIOR SOLO CELULAR */}
      <div className="mobile-bottom-navbar">

        <button className="bottom-btn" onClick={() => navigate("/principal")}>
          <AiFillHome className="icon" />
          <span>Home</span>
        </button>

        <button
          className="bottom-btn"
          onClick={() => {
            navigate("/principal");
          }}
        >
          <AiOutlineAppstore className="icon" />
          <span>Categorías</span>
        </button>

        <button className="bottom-btn" onClick={() => navigate("/carrito")}>
          <AiOutlineShoppingCart className="icon" />
          <span>Carrito</span>
        </button>

        <button className="bottom-btn" onClick={() => navigate("/perfil")}>
          <AiOutlineUser className="icon" />
          <span>Perfil</span>
        </button>
      </div>

      {/* 🔷 CONTENIDO DEL PERFIL */}
      <div className="perfil-container">
        <div className="perfil-card">
          <img src={perfilImg} alt="Perfil" className="perfil-image" />
          <h2>{usuario.nombre || "Invitado"}</h2>
          <p>{usuario.correo || "Correo no disponible"}</p>

          <div className="perfil-buttons">
            <button className="btn-modificar" onClick={() => setEditar(true)}>
              Modificar información
            </button>
            <button className="btn-cerrar" onClick={handleCerrarSesion}>
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>

      {/* 🔷 MODAL EDITAR PERFIL */}
      {editar && (
        <div className="modal-perfil">
          <div className="modal-content">
            <h3>Editar Perfil</h3>

            <label>Nombre</label>
            <input
              type="text"
              value={nuevoNombre}
              onChange={(e) => setNuevoNombre(e.target.value)}
            />

            <label>Correo</label>
            <input
              type="email"
              value={nuevoCorreo}
              onChange={(e) => setNuevoCorreo(e.target.value)}
            />

            <div className="modal-buttons">
              <button onClick={handleGuardar}>Guardar</button>
              <button onClick={() => setEditar(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      
              {/* Footer */}
            <footer className="footer">
              <div className="footer-top">
                <div className="footer-column">
                  <h4>Información de la empresa</h4>
                  <ul>
                    <li>Acerca de RawEdge</li>
                    <li>RawEdge: Compra como un millonario</li>
                    <li>Programa de afiliados e influencers</li>
                    <li>Contáctanos</li>
                    <li>Carreras profesionales</li>
                    <li>Prensa</li>
                    <li>Programa de plantación de árboles RawEdge</li>
                  </ul>
                </div>
      
                <div className="footer-column">
                  <h4>Atención al cliente</h4>
                  <ul>
                    <li>Política de devolución y reembolso</li>
                    <li>Política de propiedad intelectual</li>
                    <li>Política de envíos</li>
                    <li>Reportar actividad sospechosa</li>
                    <li>Valor de pedido mínimo</li>
                    <li>Ayuda y preguntas frecuentes</li>
                    <li>Centro de seguridad</li>
                    <li>Protección de compras</li>
                  </ul>
                </div>
      
                <div className="footer-column">
                  <h4>Conéctate con RawEdge</h4>
                  <ul>
                    <li>Mapa del sitio</li>
                    <li>Asóciate a RawEdge</li>
                    <li>Descarga la App de RawEdge</li>
                    <li>Alertas de baja de precios</li>
                    <li>Rastrea pedidos en todo momento</li>
                    <li>Pago más rápido y seguro</li>
                    <li>Alertas de artículos con poco stock</li>
                    <li>Ofertas exclusivas</li>
                    <li>Alertas de cupones y ofertas</li>
                  </ul>
                </div>
      
                <div className="footer-column">
                  <h4>Descargar App</h4>
                  <div className="footer-socials">
                    <img src={playstor} alt="Google Play" />
                    <img src={appstore} alt="App Store" />
                  </div>
                  <h4>Redes sociales</h4>
                  <div className="footer-socials">
                    <img src={instagram} alt="Instagram" />
                    <img src={faceboke} alt="Facebook" />
                    <img src={whatsapp} alt="WhatsApp" />
                  </div>
                </div>
              </div>
      
              <div className="footer-bottom">
                <p>© 2025 RawEdge. Todos los derechos reservados | Pagos seguros: Tarjeta de crédito, débito y PayPal</p>
              </div>
            </footer>
    </div>
  );
}

export default Perfil;
