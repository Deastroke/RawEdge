import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes,  Route, Link, useLocation } from "react-router-dom";
import "./App.css";
import { GoogleOAuthProvider } from '@react-oauth/google';

// Imágenes y videos
import logo from "./assets/RawEdge.png";
import ropa from "./assets/ropa.jpg";
import ropamoda from "./assets/ropademoda.png";
import accesorios from "./assets/accesorios.jpg";
import promociones from "./assets/promociones.jpg";
import paqueteria from "./assets/paqueteria.jpg";
import pagoTarjeta from "./assets/pagotarjeta.jpg";
import carrito from "./assets/carrito.jpg";
import playstore from "./assets/playstore.jpg";
import whatsapp from "./assets/whatsapp.png";
import facebook from "./assets/facebook.png";
import instagram from "./assets/instagram.png";
import playstor from "./assets/playstore.png";
import appstore from "./assets/appstore.png";
import faceboke from "./assets/facebooke.png";
import video from "./assets/moda.mp4";



// Componentes 
import Pago from "./pages/Pago.jsx";
import ForgotPassword from "./ForgotPassword.jsx";
import ResetPassword from "./ResetPassword.jsx";
import Register from "./registro.js";
import CrearPassword from "./CrearPassword.jsx";
import Login from "./login.js";
import Principal from "./principal.js"; 
import Perfil from "./perfil.js";
import Carrito from "./carrito.js";
import ProductoDetalle from "./productodetalle.js";
import NavbarGlobal from "./navbarglobal.js";
import PagoTarjeta from "./pago.js";
import FormularioEnvio from "./envio.js";
import PanelRawEdge123xyz from "./panel-rawedge-123xyz.jsx";

<script src="https://accounts.google.com/gsi/client" async defer></script>



// src/index.js
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/serviceworker.js")
      .then(() => console.log("✅ Service Worker registrado"))
      .catch((err) => console.log("❌ Error registrando SW:", err));
  });
}



function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="Logo" />
      </div>

   <ul className="navbar-links">
  <li><a href="#inicio">Inicio</a></li>
  <li><a href="#servicios">Servicios</a></li>
  <li><a href="#nosotros">Nosotros</a></li>
  <li><a href="#contacto">Contacto</a></li>
</ul>


      <div className="auth-links">
        <Link to="/register">Registro</Link>
        <span className="divider">/</span>
        <Link to="/login">Iniciar sesión</Link>
      </div>
    </nav>
  );
}

function Home() {
  useEffect(() => {
    let deferredPrompt;

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault(); // evita que el prompt se muestre automáticamente
      deferredPrompt = e;

      const installBtn = document.getElementById("installBtn");
      if (installBtn) {
        installBtn.style.display = "block";

        const onClick = async () => {
          deferredPrompt.prompt();
          const { outcome } = await deferredPrompt.userChoice;
          console.log("User response:", outcome);
          deferredPrompt = null;
          installBtn.style.display = "none"; // ocultar el botón después de instalar
          installBtn.removeEventListener("click", onClick); // remover listener para evitar duplicados
        };

        installBtn.addEventListener("click", onClick);
      }
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  return (
    <>
      {/* Botón de instalación */}
      <button id="installBtn" style={{ display: "none" }}>
        Instalar RawEdge
      </button>

      {/* Navbar */}
      <Navbar />

      {/* HERO */}
      <div id="inicio" className="hero" style={{ backgroundImage: `url(${ropa})` }}>
        <div className="hero-content">
          <h2>Bienvenido a RawEdge</h2>
          <p>Ropa urbana y moderna para todos los estilos</p>
        </div>
      </div>


      {/* Sección Servicios */}
      <section id="servicios" className="services-section">
        <h2>Nuestros Servicios</h2>
        <div className="services-cards">
          <div className="service-card">
            <h3>Ropa de Moda</h3>
            <img src={ropamoda} alt="Ropa de Moda" className="service-img" />
            <p>
              Encuentra las últimas tendencias en ropa urbana y moderna. Desde camisetas y sudaderas hasta pantalones y chamarras, pensadas para que siempre luzcas con estilo.
            </p>
            <button className="service-btn">Ver más</button>
          </div>

          <div className="service-card">
            <h3>Accesorios</h3>
            <img src={accesorios} alt="Accesorios" className="service-img" />
            <p>
              Gorras, mochilas, cadenas y más detalles que completan tu outfit. Porque la diferencia está en los accesorios.
            </p>
            <button className="service-btn">Ver más</button>
          </div>

          <div className="service-card">
            <h3>Promociones</h3>
            <img src={promociones} alt="Promociones" className="service-img" />
            <p>
              Ofertas exclusivas y descuentos en nuestras prendas más populares. Vestirse bien nunca fue tan accesible.
            </p>
            <button className="service-btn">Ver más</button>
          </div>

          <div className="service-card">
            <h3>Paquetería</h3>
            <img src={paqueteria} alt="Paquetería" className="service-img" />
            <p>
              Recibe tus pedidos en la comodidad de tu hogar. Contamos con envíos rápidos y seguros a todo el país, con rastreo en tiempo real.
            </p>
            <button className="service-btn">Ver más</button>
          </div>

          <div className="service-card">
            <h3>Pago con Tarjeta</h3>
            <img src={pagoTarjeta} alt="Pago con Tarjeta" className="service-img" />
            <p>
              Compra en línea de manera fácil y segura. Aceptamos tarjetas de débito y crédito para que elijas la opción de pago que prefieras.
            </p>
            <button className="service-btn">Ver más</button>
          </div>

          <div className="service-card">
            <h3>Carrito de Compras</h3>
            <img src={carrito} alt="Carrito de Compras" className="service-img" />
            <p>
              Guarda tus prendas favoritas mientras sigues explorando. Finaliza tu compra cuando quieras, sin perder lo que ya seleccionaste.
            </p>
            <button className="service-btn">Ver más</button>
          </div>
        </div>
      </section>

      {/* Sección Nosotros */}
      <section id="nosotros" className="about-section">
        <h2>Sobre Nosotros</h2>
        <p>
          En <strong>RawEdge</strong> somos más que una tienda de ropa: somos una marca que refleja la esencia de la moda urbana y moderna. Nuestro objetivo es ofrecer prendas únicas que combinan estilo, comodidad y autenticidad, pensadas para quienes buscan marcar la diferencia.
        </p>
      </section>

      {/* Video */}
      <section className="video-section">
  <video 
    src={video} 
    controls 
    autoPlay 
    loop 
    muted 
    className="video-player" 
  />
</section>

<section id="nosotros" className="about-section">
  <div className="about-card">
    <h3>Misión</h3>
    <p>
      Ofrecer ropa urbana y moderna que refleje la personalidad de nuestros clientes, 
      brindando calidad, estilo y comodidad en cada prenda.
    </p>
  </div>

  <div className="about-card">
    <h3>Visión</h3>
    <p>
      Ser reconocidos como la tienda de moda líder en tendencias urbanas, 
      expandiendo nuestra presencia online y física, y conectando con jóvenes de todo el país.
    </p>
  </div>
</section>

<div className="about-coming-soon">
  
  <p className="coming-soon-subtitle">
    Descarga nuestra app y accede a las últimas colecciones de RawEdge directamente desde tu celular.
  </p>
  <div className="coming-soon-icons">
    <img src={playstore} alt="Disponible en Google Play" />
  </div>
  <div className="diagonal-line"></div>
</div>


      {/* Contacto */}
      <section id="contacto" className="contact-section">
        <h2>Contacto</h2>
        <p>
  Mantente conectado con <strong>RawEdge</strong> siguiéndonos en nuestras redes sociales. 
  Descubre las últimas colecciones, ofertas exclusivas y novedades de nuestra tienda 
  directamente desde tus plataformas favoritas. También puedes contactarnos de manera directa 
  para resolver cualquier duda, hacer pedidos especiales o recibir asesoría personalizada. 
  ¡Queremos que tu experiencia con RawEdge sea completa y satisfactoria!
</p>


        <div className="contact-icons">
          <a href="https://www.instagram.com/tuusuario" target="_blank" rel="noopener noreferrer">
            <img src={instagram} alt="Instagram" />
          </a>
          <a href="https://wa.me/tuNumero" target="_blank" rel="noopener noreferrer">
            <img src={whatsapp} alt="WhatsApp" />
          </a>
          <a href="https://www.facebook.com/tuusuario" target="_blank" rel="noopener noreferrer">
            <img src={facebook} alt="Facebook" />
          </a>
        </div>
      </section>

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
}

function AppWrapper() {
  const location = useLocation();

  return (
      <>
        {/* Mostrar navbar solo en la página de detalle del producto */}
        {location.pathname.startsWith("/producto/") && <NavbarGlobal />}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/producto/:id" element={<ProductoDetalle />} />  
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/crear-password/:userId" element={<CrearPassword />} />
          <Route path="/principal" element={<Principal />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/envio" element={<FormularioEnvio />} />
          <Route path="/pago" element={<PagoTarjeta />} />
          <Route path="/pago" element={<Pago />} />
          <Route path="/forgot" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/panel-rawedge-123xyz" element={<PanelRawEdge123xyz />} />
        </Routes>
      </>
  
  );
}




function App() {
  return (
   <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
  <Router>
    <AppWrapper />
  </Router>
</GoogleOAuthProvider>

  );
}


export default App;
