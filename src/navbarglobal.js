// src/NavbarGlobal.js
import React from "react";
import { Link } from "react-router-dom";
import logo from "./assets/RawEdge.png";
import carrito from "./assets/cart.png";
import perfil from "./assets/user.png";
import "./navbarglobal.css";

function NavbarGlobal() {
  return (
    <nav className="navbar-principal">
      <div className="navbar-top">
        <div className="navbar-logo">
          <Link to="/principal"><img src={logo} alt="Logo RawEdge" /></Link>
        </div>

        <div className="navbar-search">
         
        </div>

        <div className="navbar-icons">
          <Link to="/carrito"><img src={carrito} alt="Carrito" className="icon" /></Link>
          <Link to="/perfil"><img src={perfil} alt="Perfil" className="icon" /></Link>
        </div>
      </div>



    </nav>
  );
}

export default NavbarGlobal;
