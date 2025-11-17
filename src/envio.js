import React, { useState } from "react";
import "./envio.css";
import { useNavigate, Link } from "react-router-dom";
import logo from "./assets/RawEdge.png";
import instagram from "./assets/instagram.png";
import whatsapp from "./assets/whatsapp.png";
import playstor from "./assets/playstore.png";
import appstore from "./assets/appstore.png";
import faceboke from "./assets/facebooke.png";



const Envio = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    calle: "",
    numero: "",
    colonia: "",
    referencias: "",
    ciudad: "",
    estado: "",
    codigoPostal: "",
    pais: "México",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar campos obligatorios
    if (!form.nombre || !form.telefono || !form.calle || !form.colonia || !form.ciudad) {
      alert("Por favor completa todos los campos obligatorios.");
      return;
    }

    // Guardar datos de envío en localStorage
    localStorage.setItem("datosEnvio", JSON.stringify(form));

    // Redirigir a la página de pago
    navigate("/pago");
  };


  return (
    <>

      
      {/* Navbar blanco con logotipo centrado */}
<nav className="navbar-pago">
  <div className="navbar-logo-pago">
    <Link to="/principal">
      <img src={logo} alt="RawEdge Logo" />
    </Link>
  </div>
</nav>


      <div className="envio-container">
        <h2>Datos de Envío</h2>
        <form onSubmit={handleSubmit}>
          <label>Nombre completo *</label>
          <input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            required
          />

          <label>Teléfono *</label>
          <input
            type="tel"
            name="telefono"
            value={form.telefono}
            onChange={handleChange}
            required
            pattern="[0-9]{10}"
            placeholder="Ej. 3312345678"
          />

          <label>Correo electrónico</label>
          <input
            type="email"
            name="correo"
            value={form.correo}
            onChange={handleChange}
            placeholder="ejemplo@gmail.com"
          />

          <label>Calle *</label>
          <input
            type="text"
            name="calle"
            value={form.calle}
            onChange={handleChange}
            required
          />

          <div className="fila">
            <div>
              <label>Número *</label>
              <input
                type="text"
                name="numero"
                value={form.numero}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Código Postal *</label>
              <input
                type="text"
                name="codigoPostal"
                value={form.codigoPostal}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <label>Colonia *</label>
          <input
            type="text"
            name="colonia"
            value={form.colonia}
            onChange={handleChange}
            required
          />

          <label>Referencias (opcional)</label>
          <input
            type="text"
            name="referencias"
            value={form.referencias}
            onChange={handleChange}
            placeholder="Ej. Casa blanca con portón negro"
          />

          <div className="fila">
            <div>
              <label>Ciudad *</label>
              <input
                type="text"
                name="ciudad"
                value={form.ciudad}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Estado *</label>
              <input
                type="text"
                name="estado"
                value={form.estado}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <label>País</label>
          <input
            type="text"
            name="pais"
            value={form.pais}
            onChange={handleChange}
            readOnly
          />

          <button type="submit">Continuar con el pago</button>
        </form>
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
    </>
  );
};

export default Envio;
