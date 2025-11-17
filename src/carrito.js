import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./principal.css";
import logo from "./assets/RawEdge.png";
import perfil from "./assets/user.png";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Asegúrate de importarlo
import instagram from "./assets/instagram.png";
import whatsapp from "./assets/whatsapp.png";
import playstor from "./assets/playstore.png";
import appstore from "./assets/appstore.png";
import faceboke from "./assets/facebooke.png";
import iconEliminar from "./assets/bin.png"; // ajusta la ruta según tu proyecto


function Carrito() {
  const usuarioId = JSON.parse(localStorage.getItem("usuario"))?._id;

  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [seleccionados, setSeleccionados] = useState([]);
  const navigate = useNavigate();
  

  // =============================
  // Cargar carrito
  // =============================
  useEffect(() => {
    if (!usuarioId) return;

    const fetchCarrito = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/carritos/${usuarioId}`);
        setProductos(res.data.productos || []);
      } catch (err) {
        console.error(err.response?.data || err);
      }
    };

    fetchCarrito();
  }, [usuarioId]);

  // =============================
  // Eliminar del carrito
  // =============================
  const eliminarDelCarrito = async (p) => {
    if (!p.producto) return;

    try {
      const res = await axios.delete(
        `http://localhost:5000/carritos/${usuarioId}/eliminar/${p.producto._id}`,
        { data: { color: p.color, talla: p.talla } }
      );

      setProductos(res.data.productos || []);
      setSeleccionados(prev =>
        prev.filter(id => id !== `${p.producto._id}-${p.color}-${p.talla}`)
      );
    } catch (err) {
      console.error(err.response?.data || err);
    }
  };

  // =============================
  // Modificar cantidad
  // =============================
  const modificarCantidad = async (p, nuevaCantidad) => {
    if (!p.producto) return;

    const stockDisponible = p.producto?.cantidad || 1;

    if (nuevaCantidad < 1) return;

    if (nuevaCantidad > stockDisponible) {
      alert(`⚠️ Solo hay ${stockDisponible} unidades disponibles`);
      nuevaCantidad = stockDisponible;
    }

    try {
      const res = await axios.put(
        `http://localhost:5000/carritos/${usuarioId}/modificar/${p.producto._id}`,
        {
          cantidad: nuevaCantidad,
          color: p.color,
          talla: p.talla,
        }
      );

      setProductos(res.data.productos || []);
    } catch (err) {
      console.error(err.response?.data || err);
    }
  };

  // =============================
  // Selección checkbox
  // =============================
  const toggleSeleccion = (p) => {
    if (!p.producto) return;

    const idUnico = `${p.producto._id}-${p.color}-${p.talla}`;

    setSeleccionados(prev =>
      prev.includes(idUnico)
        ? prev.filter(id => id !== idUnico)
        : [...prev, idUnico]
    );
  };

  // =============================
  // Filtrar por búsqueda
  // =============================
  const productosFiltrados = productos.filter((p) => {
    if (!p.producto) return false;

    return (
      p.producto?.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.color?.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.talla?.toLowerCase().includes(busqueda.toLowerCase())
    );
  });

  // =============================
  // Seleccionados seguros
  // =============================
  const seleccionadosDetalles = productos.filter((p) => {
    if (!p.producto) return false;

    const idUnico = `${p.producto._id}-${p.color}-${p.talla}`;
    return seleccionados.includes(idUnico);
  });

  // =============================
  // Subtotal
  // =============================
  const subtotal = seleccionadosDetalles.reduce((acc, p) => {
    const precio = parseFloat(p.producto?.precio) || 0;
    const cantidad = parseInt(p.cantidad) || 0;
    return acc + precio * cantidad;
  }, 0);

  const envio = seleccionadosDetalles.length ? 50 : 0;
  const total = Number((subtotal + envio).toFixed(2));

  // =============================
  // Guardar en localStorage
  // =============================
  useEffect(() => {
    localStorage.setItem(
      "productosSeleccionados",
      JSON.stringify(seleccionadosDetalles)
    );
    localStorage.setItem("totalSeleccionado", total);
  }, [seleccionadosDetalles, total]);

  return (
    <div className="principal-container">

      {/* NAVBAR */}
      <nav className="navbar-principal">
        <div className="navbar-top">
          <div className="navbar-logo">
            <Link to="/principal">
              <img src={logo} alt="Logo RawEdge" />
            </Link>
          </div>

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
            <Link to="/perfil">
              <img src={perfil} alt="Perfil" className="icon" />
            </Link>
          </div>
        </div>
      </nav>

      {/* =============================
          CONTENIDO PRINCIPAL
      ============================= */}
      <div className="carrito-container">
        
        {/* IZQUIERDA */}
        <div className="carrito-left">
          <h2>🛒 Mi Carrito</h2>

          {productosFiltrados.length === 0 && (
            <p>❌ No se encontraron productos en el carrito.</p>
          )}

          {productosFiltrados.map((prod, index) => {

            // Evitar error si producto es null
            if (!prod.producto) {
              console.warn("⚠️ Producto inválido en carrito:", prod);
              return null;
            }

            const idUnico = `${prod.producto._id}-${prod.color}-${prod.talla}`;
            const seleccionado = seleccionados.includes(idUnico);

            return (
              <div key={index} className="carrito-producto">

                {/* Checkbox */}
                <input
                  type="checkbox"
                  checked={seleccionado}
                  onChange={() => toggleSeleccion(prod)}
                  style={{ marginRight: "10px", transform: "scale(1.3)" }}
                />

                {/* Imagen */}
                <img
  src={
    prod.producto?.imagen
      ? `http://localhost:5000/uploads/${prod.producto.imagen}`
      : "https://via.placeholder.com/80"
  }
  alt={prod.producto?.nombre || "Producto"}
  style={{ width: "80px", borderRadius: "8px" }}
/>


                <div className="carrito-info">
                  <p><strong>{prod.producto?.nombre}</strong></p>
                  <p>Precio: ${prod.producto?.precio || 0} MXN</p>

                  <div className="producto-cantidad">
                    <span>Cantidad:</span>

                    <button
                      className="btn-cantidad restar"
                      onClick={() =>
                        modificarCantidad(prod, Math.max(1, prod.cantidad - 1))
                      }
                    >
                      -
                    </button>

                    <input
                      type="number"
                      min="1"
                      max={prod.producto?.cantidad || 1}
                      value={prod.cantidad}
                      onChange={(e) =>
                        modificarCantidad(prod, Number(e.target.value))
                      }
                    />

                    <button
                      className="btn-cantidad sumar"
                      onClick={() =>
                        modificarCantidad(
                          prod,
                          Math.min(prod.producto?.cantidad || 1, prod.cantidad + 1)
                        )
                      }
                    >
                      +
                    </button>
                  </div>

                  <p>Color: {prod.color}</p>
                  <p>Talla: {prod.talla}</p>
                  <p>Total: ${prod.cantidad * (prod.producto?.precio || 0)} MXN</p>
                </div>

                {/* Eliminar */}
                <div className="producto-buttons">
                  <button
                    className="btn-eliminar-carrito"
                    onClick={() => eliminarDelCarrito(prod)}
                  >
                    <img src={iconEliminar} alt="Eliminar" className="icono-eliminar" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

<div className="carrito-right">
  <h2> Resumen de tu compra</h2>

  {/* Envío nacional fijo */}
  <p> Subtotal: <strong>${subtotal} MXN</strong></p>
  <p> Envío: 
    <strong>
      {subtotal > 1500 ? "Gratis" : "$100 MXN"}
    </strong>
  </p>

  <hr />

  <p>
    <strong>
      Total a pagar: $
      {subtotal > 1500 ? subtotal : subtotal + 100} MXN
    </strong>
  </p>

  <div className="info-envio">
    <p>🚚 Envío seguro: trabajamos con proveedores confiables para que tu pedido llegue protegido y sin problemas.</p>
    <p>🔒 Pago seguro protegido con Stripe.</p>
  </div>

  <div className="btn-pagar">
    <button
      onClick={() => {
        if (seleccionadosDetalles.length === 0) {
          alert("Selecciona al menos un producto para pagar.");
          return;
        }
        localStorage.setItem("carrito", JSON.stringify(seleccionadosDetalles));
        localStorage.setItem("totalSeleccionado", subtotal > 1500 ? subtotal : subtotal + 100);
        localStorage.setItem("envioCosto", subtotal > 1500 ? 0 : 100);
        navigate("/envio");
      }}
    >
      Continuar con el envío
    </button>
  </div>
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


export default Carrito;
