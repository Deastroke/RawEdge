import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./perfil.css";
import perfilImg from "./assets/user.png";
import logo from "./assets/RawEdge.png";
import carrito from "./assets/cart.png";
import perfilIcon from "./assets/user.png";
import axios from "axios";

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
      {/* Navbar */}
      <nav className="navbar-principal">
        <div className="navbar-top">
          <div className="navbar-logo">
            <Link to="/principal">
              <img src={logo} alt="Logo RawEdge" />
            </Link>
          </div>
          <div className="navbar-icons" style={{ marginLeft: "auto" }}>
            <Link to="/carrito">
              <img src={carrito} alt="Carrito" className="icon" />
            </Link>
            <Link to="/perfil">
              <img src={perfilIcon} alt="Perfil" className="icon" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Contenido del perfil */}
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

      {/* Modal de edición */}
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
    </div>
  );
}

export default Perfil;
