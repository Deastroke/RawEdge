import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import "../pago.css";

function CheckoutForm({ total, productosSeleccionados }) {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    if (!productosSeleccionados || productosSeleccionados.length === 0) {
      alert("No hay productos seleccionados para pagar");
      return;
    }

    const totalCalculado = productosSeleccionados.reduce(
      (sum, p) => sum + Number(p.producto.precio) * Number(p.cantidad || 1),
      0
    );

    const datosEnvio = JSON.parse(localStorage.getItem("datosEnvio")) || {};
    const usuario = JSON.parse(localStorage.getItem("usuario")) || {};
    const correoCliente = datosEnvio.correo || usuario.correo || null;

    if (!correoCliente) {
      alert("Por favor ingresa un correo de contacto antes de continuar.");
      return;
    }

    setLoading(true);
    try {
      // 1️⃣ Crear el pago en Render
      const res = await axios.post("https://rawedge-backend.onrender.com/api/pago", {
        total: totalCalculado,
        correo: correoCliente,
        productos: productosSeleccionados.map((p) => ({
          _id: p.producto._id,
          nombre: p.producto.nombre,
          cantidad: p.cantidad,
        })),
      });

      const { clientSecret } = res.data;

      // 2️⃣ Confirmar pago con Stripe
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      // 3️⃣ Si el pago fue exitoso
      if (result.paymentIntent?.status === "succeeded") {
        setMessage("✅ Pago realizado con éxito");

        // 4️⃣ Enviar correo desde Render
        await axios.post("https://rawedge-backend.onrender.com/correo/enviar", {
          datosEnvio,
          productos: productosSeleccionados,
          usuarioId: usuario._id || null,
        });

        // 5️⃣ Descontar inventario en Render
        await axios.post("https://rawedge-backend.onrender.com/inventario/descontar", {
          productos: productosSeleccionados.map((p) => ({
            _id: p.producto._id,
            cantidad: p.cantidad,
          })),
        });

        // 6️⃣ Limpiar localStorage
        localStorage.removeItem("carrito");
        localStorage.removeItem("datosEnvio");
        localStorage.removeItem("productosSeleccionados");

        alert("✅ Pago completado. Se envió confirmación a tu correo.");
      } else if (result.error) {
        setMessage(result.error.message);
      }
    } catch (err) {
      console.error("❌ Error al procesar el pago:", err);
      setMessage("❌ Error al procesar el pago");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="pago-form">
      <label>Datos de tu tarjeta</label>
      <CardElement className="card-element" />

      <button type="submit" disabled={!stripe || loading}>
        {loading ? "Procesando..." : `Pagar $${total?.toFixed(2) || 0}`}
      </button>

      {message && <p className="mensaje-pago">{message}</p>}
    </form>
  );
}

export default CheckoutForm;
