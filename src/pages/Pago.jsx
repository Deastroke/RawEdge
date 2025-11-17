import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../components/CheckoutForm";

const stripePromise = loadStripe("pk_test_51SJLz78DTkFk9yEcDIUbah1A53WI5VoVRmZnJ5F6J7y3uhM4suqtPD7TgHHWi22VwGV3Ly9USFw5JyE0zcsffP2w00Ou70zvVW");

function Pago() {
  // ✅ Leer productos seleccionados y total desde localStorage
  const seleccionadosDetalles = JSON.parse(localStorage.getItem("productosSeleccionados")) || [];
  const total = Number(localStorage.getItem("totalSeleccionado")) || 0;

  return (
    <div className="pago-container">
      <h2>💳 Realizar pago</h2>

      {/* Mostrar lista de productos seleccionados */}
      {seleccionadosDetalles.length > 0 ? (
        <ul>
          {seleccionadosDetalles.map((p, index) => (
            <li key={index}>
              {p.producto.nombre} - {p.color} - {p.talla} x {p.cantidad} → ${p.producto.precio * p.cantidad}
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay productos seleccionados</p>
      )}

      {/* Stripe Elements */}
      <Elements stripe={stripePromise}>
        <CheckoutForm total={total} productosSeleccionados={seleccionadosDetalles} />
      </Elements>
    </div>
  );
}

export default Pago;
