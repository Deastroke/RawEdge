import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./productodetalle.css";

import instagram from "./assets/instagram.png";
import whatsapp from "./assets/whatsapp.png";
import Playstor from "./assets/playstore.png";
import Appstore from "./assets/appstore.png";
import faceboke from "./assets/facebooke.png";

function ProductoDetalle() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [productos, setProductos] = useState([]);
  const [color, setColor] = useState("");
  const [talla, setTalla] = useState("");
  const [cantidad, setCantidad] = useState(1);
  const [coloresDisponibles, setColoresDisponibles] = useState([]);
  const [tallasDisponibles, setTallasDisponibles] = useState([]);
  const [cantidadDisponible, setCantidadDisponible] = useState(0);

  const usuarioId = localStorage.getItem("usuarioId");

  // Cargar todos los productos
  useEffect(() => {
    axios.get("http://localhost:5000/api/productos")
      .then(res => {
        setProductos(res.data);
        const prod = res.data.find(p => p._id === id);
        setProducto(prod);

        if (prod) {
          const relacionados = res.data.filter(p => p.nombre === prod.nombre);
          const colores = [...new Set(relacionados.map(p => p.color))];
          const tallas = [...new Set(relacionados.map(p => p.talla))];
          setColoresDisponibles(colores);
          setTallasDisponibles(tallas);
          setCantidadDisponible(prod.cantidad);
        }
      })
      .catch(err => console.log("Error al cargar productos:", err));
  }, [id]);

  // Actualizar cantidad máxima según color y talla
  useEffect(() => {
    if (color && talla) {
      const prodSeleccionado = productos.find(p =>
        p.nombre === producto.nombre &&
        p.color === color &&
        p.talla === talla
      );

      if (prodSeleccionado) {
        setCantidadDisponible(prodSeleccionado.cantidad);
        if (cantidad > prodSeleccionado.cantidad) setCantidad(prodSeleccionado.cantidad);
      }
    }
  }, [color, talla, cantidad, producto, productos]);

  if (!producto) return <p>Cargando producto...</p>;


// ✅ Artículos similares (por categoría, no por nombre)
const similares = productos.filter(
  (p) => p._id !== producto._id && p.categoria === producto.categoria
);


  // Función para agregar al carrito vía backend
  const agregarAlCarrito = async () => {
  if (!color || !talla) {
    alert("Selecciona color y talla");
    return;
  }

  try {
    const res = await axios.post(`http://localhost:5000/carritos/${usuarioId}/agregar`, {
      productoId: producto._id,
      cantidad,
      color,
      talla
    });

    // Actualiza la lista del carrito en React
    setProductos(res.data.productos || []);

    alert(`Producto agregado al carrito: ${cantidad} x ${producto.nombre} = $${cantidad * producto.precio}`);
  } catch (err) {
    console.error(err.response?.data || err);
    alert("Error al agregar al carrito");
  }
};


  return (
    <div className="detalle-container">
      <div className="detalle-producto">
        <div className="detalle-imagen">
          <img 
  src={`http://localhost:5000/uploads/${producto.imagen}`}
  onError={(e) => e.target.src = "https://via.placeholder.com/300"}
  alt={producto.nombre}
/>




        </div>

        <div className="detalle-info">
          <h2>{producto.nombre}</h2>
          <p className="descripcion">{producto.descripcion}</p>

          <div className="opciones">
            {/* Color */}
            <div className="color">
              <label>Color:</label>
              <select value={color} onChange={e => setColor(e.target.value)}>
                <option value="">Selecciona un color</option>
                {coloresDisponibles.map((c, i) => (
                  <option key={i} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Talla */}
            <div className="talla">
              <label>Talla:</label>
              <select value={talla} onChange={e => { setTalla(e.target.value); setCantidad(1); }}>
                <option value="">Selecciona una talla</option>
                {tallasDisponibles.map((t, i) => (
                  <option key={i} value={t}>
                    {t} — ({productos.find(p => p.nombre === producto.nombre && p.color === color && p.talla === t)?.cantidad || 0} disponibles)
                  </option>
                ))}
              </select>
            </div>

            {/* Cantidad */}
            <div className="cantidad">
              <label>Cantidad:</label>
             <input
  type="number"
  min="1"
  max={cantidadDisponible}
  value={cantidad}
  onChange={e => {
    const val = Number(e.target.value);
    if (val <= cantidadDisponible) setCantidad(val);
  }}
/>

            </div>
          </div>
        </div>

        <div className="detalle-compra">
<p className="precio">
  ${producto.precio * cantidad} MXN
</p>

          <button className="btn-pagar" onClick={agregarAlCarrito}>
  Agregar al carrito
</button>

          <div className="envio">
            <p>🌎 Envío gratuito en compras mayores a $1,500 MXN.</p>
            <p>📦 Entrega estimada: 3-5 días hábiles</p>
          </div>
        </div>
      </div>

      {/* Artículos similares */}
     {similares.length > 0 && (
  <div className="similares-container">
    <h3>🧢 Artículos similares</h3>
    <div className="similares-grid">
      {similares.map(p => (
        <Link to={`/producto/${p._id}`} key={p._id} className="similares-item">
          <img
  src={`http://localhost:5000/uploads/${p.imagen}`}
  onError={(e) => e.target.src = "https://via.placeholder.com/150"}
  alt={p.nombre}
/>

          <h4>{p.nombre}</h4>
          <p>💲{p.precio} MXN</p>
        </Link>
      ))}
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
              <img src={Playstor} alt="Google Play" />
              <img src={Appstore} alt="App Store" />
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

export default ProductoDetalle;
