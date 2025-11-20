import React, { useState, useEffect } from "react";
import axios from "axios";
import "./principal.css";
import logo from "./assets/RawEdge.png";
import carrito from "./assets/cart.png";
import perfil from "./assets/user.png";
import oferta from "./assets/ofertas.jpg";
import { Link } from "react-router-dom";

import hombreIcon from "./assets/hombre.png";
import mujerIcon from "./assets/mujer.png";
import accesoriosIcon from "./assets/accesorio.png";
import ofertasIcon from "./assets/oferta.png";
import instagram from "./assets/instagram.png";
import whatsapp from "./assets/whatsapp.png";
import playstor from "./assets/playstore.png";
import appstore from "./assets/appstore.png";
import faceboke from "./assets/facebooke.png";


import bannerHombre from "./assets/bannerhombre.jpg";
import bannerMujer from "./assets/bannermujer.jpg";
import bannerAccesorios from "./assets/banneraccesorios.jpg";
import bannerOfertas from "./assets/bannerofertas.jpg";
import bannerNuevo from "./assets/bannernuevo.jpg";


function Principal() {
  const [productos, setProductos] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todos");
  const [busqueda, setBusqueda] = useState(""); // 🔍 Estado para el buscador

  // Cargar productos desde el backend
  useEffect(() => {
    axios
      .get("https://rawedge-backend.onrender.com/api/productos")
      .then((res) => setProductos(res.data))
      .catch((err) => console.log("Error al obtener productos:", err));
  }, []);

  // Filtrado por categoría y búsqueda
  const productosFiltrados = productos
    .filter((p) =>
      categoriaSeleccionada === "Todos" ? true : p.categoria === categoriaSeleccionada
    )
    .filter((p) =>
      p.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );

  return (
    <div className="principal-container">
      {/* NAVBAR */}
      <nav className="navbar-principal">
        <div className="navbar-top">
          <div className="navbar-logo">
            <img src={logo} alt="Logo RawEdge" />
          </div>

          {/* 🔎 Buscador */}
          <div className="navbar-search">
            <input
              type="text"
              placeholder="Buscar productos..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
            <button onClick={() => setBusqueda("")}>Limpiar</button>
          </div>

          <div className="navbar-icons">
            <Link to="/carrito">
              <img src={carrito} alt="Carrito" className="icon" />
            </Link>
            <Link to="/perfil">
              <img src={perfil} alt="Perfil" className="icon" />
            </Link>
          </div>
        </div>

        {/* Categorías */}
        <div className="navbar-categories"> 
          <ul>
            <li onClick={() => setCategoriaSeleccionada("Todos")}>Todos</li>
            <li onClick={() => setCategoriaSeleccionada("Hombre")}>Hombre</li>
            <li onClick={() => setCategoriaSeleccionada("Mujer")}>Mujer</li>
            <li onClick={() => setCategoriaSeleccionada("Accesorios")}>Accesorios</li>
            <li onClick={() => setCategoriaSeleccionada("Ofertas")}>Ofertas</li>
            <li onClick={() => setCategoriaSeleccionada("Nuevo")}>Nuevo</li>
          </ul>
        </div>
      </nav>

      {/* BANNER */}
      <div className="principal-content">
        <img
          src={{
            Todos: oferta,
            Hombre: bannerHombre,
            Mujer: bannerMujer,
            Accesorios: bannerAccesorios,
            Ofertas: bannerOfertas,
            Nuevo: bannerNuevo,
          }[categoriaSeleccionada] || oferta}
          alt={`Banner ${categoriaSeleccionada}`}
          className="oferta-banner"
        />
      </div>

      {/* PRODUCTOS DESTACADOS */}
      <div className="productos">
        <h2>
          {categoriaSeleccionada === "Todos"
            ? "Productos destacados"
            : `Productos de ${categoriaSeleccionada}`}
        </h2>
        <div className="productos-grid">
          {productosFiltrados.length > 0 ? (
            productosFiltrados.slice(0, 15).map((p) => (
              <div className="producto-card" key={p._id}>
                <img
  src={
    p.imagen
      ? `https://rawedge-backend.onrender.com/uploads/${p.imagen}`
      : "https://via.placeholder.com/200"
  }
  alt={p.nombre}
/>

                <h3>{p.nombre}</h3>
                <p>${p.precio} MXN</p>
                <Link to={`/producto/${p._id}`}>
                  <button className="btn-detalle">Ver producto</button>
                </Link>
              </div>
            ))
          ) : (
            <p>No hay productos disponibles.</p>
          )}
        </div>
      </div>



      {/* CATEGORÍAS */}
      <section className="categorias-section">
        <h2 className="categorias-title">Categorías</h2>
        <div className="categorias-container">
          <div className="categoria-card" onClick={() => setCategoriaSeleccionada("Hombre")}>
            <img src={hombreIcon} alt="Hombre" className="categoria-icon" />
            <p>Hombre</p>
          </div>
          <div className="categoria-card" onClick={() => setCategoriaSeleccionada("Mujer")}>
            <img src={mujerIcon} alt="Mujer" className="categoria-icon" />
            <p>Mujer</p>
          </div>
          <div className="categoria-card" onClick={() => setCategoriaSeleccionada("Accesorios")}>
            <img src={accesoriosIcon} alt="Accesorios" className="categoria-icon" />
            <p>Accesorios</p>
          </div>
          <div className="categoria-card" onClick={() => setCategoriaSeleccionada("Ofertas")}>
            <img src={ofertasIcon} alt="Ofertas" className="categoria-icon" />
            <p>Ofertas</p>
          </div>
        </div>
      </section>

{/* PRODUCTOS RESTANTES */}
<div className="productos">
  <h2>Más productos</h2>
  <div className="productos-grid">
    {productosFiltrados.length > 0 ? (
      productosFiltrados
        .slice(15) // ignoramos los 15 de destacados
        .map((p) => (
          <div className="producto-card" key={p._id}>
            <img src={p.imagen || "https://via.placeholder.com/200"} alt={p.nombre} />
            <h3>{p.nombre}</h3>
            <p>${p.precio} MXN</p>
            <Link to={`/producto/${p._id}`}>
              <button className="btn-detalle">Ver producto</button>
            </Link>
          </div>
        ))
    ) : (
      <p>No hay más productos disponibles.</p>
    )}
  </div>
</div>


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

export default Principal;
