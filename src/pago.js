import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./components/CheckoutForm";
import "./pago.css";

// Imágenes
import logo from "./assets/RawEdge.png";
import tarjetaIcono from "./assets/card.png";

// Clave pública de Stripe
const stripePromise = loadStripe(
  "pk_test_51SJLz78DTkFk9yEcDIUbah1A53WI5VoVRmZnJ5F6J7y3uhM4suqtPD7TgHHWi22VwGV3Ly9USFw5JyE0zcsffP2w00Ou70zvVW"
);

function Pago() {
  const [seleccionadosDetalles, setSeleccionadosDetalles] = useState([]);

  // Leer productos seleccionados desde localStorage
  useEffect(() => {
    const items =
      JSON.parse(localStorage.getItem("productosSeleccionados")) || [];
    setSeleccionadosDetalles(items);
  }, []);

  // Calcular subtotal
  const subtotal = seleccionadosDetalles.reduce(
    (sum, p) => sum + Number(p.producto.precio) * Number(p.cantidad || 1),
    0
  );

  // Envío nacional dentro de México
  const envio = subtotal > 1500 ? 0 : 100;

  // Total final a pagar
  const totalFinal = Number(subtotal + envio);

  return (
    <div className="page-wrapper">
      {/* Navbar */}
      <nav className="navbar-pago">
        <div className="navbar-logo-pago">
          <Link to="/principal">
            <img src={logo} alt="RawEdge Logo" />
          </Link>
        </div>
      </nav>

      {/* Contenedor de pago */}
      <div className="pago-container">
        <h3 className="titulo-pago">
          <img src={tarjetaIcono} alt="Tarjeta" className="icono-tarjeta" />
          Pago con tarjeta
        </h3>

        {/* Resumen de productos */}
        {seleccionadosDetalles.length > 0 ? (
          <div className="resumen-carrito">
            {seleccionadosDetalles.map((p, i) => (
              <div key={i} className="item-resumen">
                <span>
                  {p.producto.nombre} ({p.color}/{p.talla}) x {p.cantidad}
                </span>
                <span>
                  ${Number(p.producto.precio * p.cantidad).toFixed(2)} MXN
                </span>
              </div>
            ))}

            <hr />

            <p>
              Subtotal: <strong>${subtotal.toFixed(2)} MXN</strong>
            </p>

            <p>
              Envío:{" "}
              <strong>
                {envio === 0 ? "Gratis" : `$${envio} MXN`}
              </strong>
            </p>

            <p>
              <strong>Total a pagar: ${totalFinal.toFixed(2)} MXN</strong>
            </p>
          </div>
        ) : (
          <p>No hay productos seleccionados</p>
        )}

        {/* Stripe Elements */}
        <Elements stripe={stripePromise}>
          <CheckoutForm
            total={totalFinal}  // 👈 Ahora Stripe cobra el total con envío incluido
            productosSeleccionados={seleccionadosDetalles}
          />
        </Elements>
      </div>
    </div>
  );
}

export default Pago;
