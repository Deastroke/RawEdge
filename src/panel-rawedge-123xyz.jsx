import React, { useState, useEffect } from "react";
import axios from "axios";
import "./admin.css";
import logo from "./assets/RawEdge.png";
import { FaEdit, FaTrash } from "react-icons/fa"; // ícono de modificar y eliminar


function AdminPanel() {
  const [productos, setProductos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [tab, setTab] = useState("productos");
  const [productoEditar, setProductoEditar] = useState(null);

  const [busqueda, setBusqueda] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 10;

  const modificarProducto = (producto) => setProductoEditar(producto);

  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: "",
    precio: "",
    categoria: "",
    cantidad: "",
    color: "",
    descripcion: "",
    talla: "",
    imagen: "",
  });

  const [nuevoUsuario, setNuevoUsuario] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    contraseña: "",
    tipo: "usuario",
  });

  useEffect(() => {
    obtenerProductos();
    obtenerUsuarios();
  }, []);

 const obtenerProductos = async () => {
  const res = await axios.get("https://rawedge-backend.onrender.com/api/productos");
  setProductos(res.data);
};


  const obtenerUsuarios = async () => {
  const res = await axios.get("https://rawedge-backend.onrender.com/api/usuarios");
  setUsuarios(res.data);
};


 const agregarProducto = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("nombre", nuevoProducto.nombre);
  formData.append("precio", nuevoProducto.precio);
  formData.append("categoria", nuevoProducto.categoria);
  formData.append("cantidad", nuevoProducto.cantidad);
  formData.append("color", nuevoProducto.color);
  formData.append("descripcion", nuevoProducto.descripcion);
  formData.append("talla", nuevoProducto.talla);
  formData.append("imagen", nuevoProducto.imagen); // archivo

  await axios.post( "https://rawedge-backend.onrender.com/api/productos", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  // Limpiar formulario
  setNuevoProducto({
  nombre: "",
  precio: "",
  categoria: "",
  cantidad: "",
  color: "",
  descripcion: "",
  talla: "",
  imagen: null,
});


  obtenerProductos();
};


  const agregarUsuario = async (e) => {
    e.preventDefault();
    await axios.post("https://rawedge-backend.onrender.com/api/usuarios", nuevoUsuario);
    setNuevoUsuario({
      nombre: "",
      apellido: "",
      correo: "",
      contraseña: "",
      tipo: "usuario",
    });
    obtenerUsuarios();
  };

  const eliminarProducto = async (id) => {
    try {
      await axios.delete(`https://rawedge-backend.onrender.com/api/productos/${id}`);
      obtenerProductos();
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }
  };

  const eliminarUsuario = async (id) => {
    try {
      await axios.delete(`https://rawedge-backend.onrender.com/api/usuarios/${id}`);
      obtenerUsuarios();
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  };

  const actualizarProducto = async (producto) => {
    try {
      await axios.put(`https://rawedge-backend.onrender.com/api/productos/${producto._id}`,producto);
      setProductoEditar(null);
      obtenerProductos();
    } catch (error) {
      console.error("Error al actualizar producto:", error);
    }
  };

  // ==================== BÚSQUEDA + FILTROS ====================
  const productosFiltrados = productos.filter((p) => {
    const texto = busqueda.toLowerCase();
    return (
      (p.nombre?.toLowerCase().includes(texto) ||
        p.categoria?.toLowerCase().includes(texto) ||
        p.color?.toLowerCase().includes(texto)) &&
      (filtroCategoria ? p.categoria === filtroCategoria : true)
    );
  });

  // ==================== PAGINACIÓN ====================
  const indexInicio = (paginaActual - 1) * productosPorPagina;
  const indexFin = indexInicio + productosPorPagina;
  const productosPagina = productosFiltrados.slice(indexInicio, indexFin);
  const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);

  const cambiarPagina = (numero) => setPaginaActual(numero);

  return (
    <div className="admin-container">
      {/* Logo */}
      <div className="admin-logo">
        <img src={logo} alt="Logo" />
      </div>

      <h1>Panel de Administración</h1>

      {/* Botones para cambiar de pestaña */}
      <div className="admin-tabs">
        <button onClick={() => setTab("productos")} className={tab === "productos" ? "active" : ""}>
          Productos
        </button>
        <button onClick={() => setTab("usuarios")} className={tab === "usuarios" ? "active" : ""}>
          Usuarios
        </button>
      </div>



      {/* ==================== SECCIÓN PRODUCTOS ==================== */}
      {tab === "productos" && (
        <section className="admin-section">
          <h2>Agregar Producto</h2>
          <form className="admin-form" onSubmit={agregarProducto}>
            <input type="text" placeholder="Nombre" value={nuevoProducto.nombre} onChange={(e) => setNuevoProducto({ ...nuevoProducto, nombre: e.target.value })} required />
            <input type="number" placeholder="Precio" value={nuevoProducto.precio} onChange={(e) => setNuevoProducto({ ...nuevoProducto, precio: e.target.value })} required />
            <select value={nuevoProducto.categoria} onChange={(e) => setNuevoProducto({ ...nuevoProducto, categoria: e.target.value })} required>
              <option value="">Categoría</option>
              <option value="Hombre">Hombre</option>
              <option value="Mujer">Mujer</option>
              <option value="Accesorios">Accesorios</option>
              <option value="Ofertas">Ofertas</option>
              <option value="Nuevo">Nuevo</option>
            </select>
            <input type="number" placeholder="Cantidad" value={nuevoProducto.cantidad} onChange={(e) => setNuevoProducto({ ...nuevoProducto, cantidad: e.target.value })} required />
            <input type="text" placeholder="Color" value={nuevoProducto.color} onChange={(e) => setNuevoProducto({ ...nuevoProducto, color: e.target.value })} />
            <input type="text" placeholder="Descripción" value={nuevoProducto.descripcion} onChange={(e) => setNuevoProducto({ ...nuevoProducto, descripcion: e.target.value })} />
            <input type="text" placeholder="Talla" value={nuevoProducto.talla} onChange={(e) => setNuevoProducto({ ...nuevoProducto, talla: e.target.value })} />
             <input 
  type="file" 
  onChange={(e) => setNuevoProducto({ ...nuevoProducto, imagen: e.target.files[0] })} 
/>

            <button type="submit">Agregar Producto</button>
          </form>

          {/* Buscador y filtros */}
          <div className="filtros-container">
            <input
              type="text"
              placeholder="Buscar por nombre, color o categoría..."
              value={busqueda}
              onChange={(e) => {
                setBusqueda(e.target.value);
                setPaginaActual(1);
              }}
            />
            <select
              value={filtroCategoria}
              onChange={(e) => {
                setFiltroCategoria(e.target.value);
                setPaginaActual(1);
              }}
            >
              <option value="">Todas las categorías</option>
              <option value="Hombre">Hombre</option>
              <option value="Mujer">Mujer</option>
              <option value="Accesorios">Accesorios</option>
              <option value="Ofertas">Ofertas</option>
              <option value="Nuevo">Nuevo</option>
            </select>
          </div>

          {/* Modal para modificar */}
          {productoEditar && (
            <div className="modal">
              <h3>Modificar Producto</h3>
              <label>Nombre:</label>
              <input type="text" value={productoEditar.nombre} onChange={(e) => setProductoEditar({ ...productoEditar, nombre: e.target.value })} />
              <label>Precio:</label>
              <input type="number" value={productoEditar.precio} onChange={(e) => setProductoEditar({ ...productoEditar, precio: e.target.value })} />
              <label>Categoría:</label>
              <input type="text" value={productoEditar.categoria} onChange={(e) => setProductoEditar({ ...productoEditar, categoria: e.target.value })} />
              <label>Cantidad:</label>
              <input type="number" value={productoEditar.cantidad} onChange={(e) => setProductoEditar({ ...productoEditar, cantidad: e.target.value })} />
              <label>Color:</label>
              <input type="text" value={productoEditar.color} onChange={(e) => setProductoEditar({ ...productoEditar, color: e.target.value })} />
              <label>Descripción:</label>
              <textarea value={productoEditar.descripcion} onChange={(e) => setProductoEditar({ ...productoEditar, descripcion: e.target.value })} />
              <label>Talla:</label>
              <input type="text" value={productoEditar.talla} onChange={(e) => setProductoEditar({ ...productoEditar, talla: e.target.value })} />
              <label>Imagen (URL):</label>
              <input 
  type="file" 
  onChange={(e) => setNuevoProducto({ ...nuevoProducto, imagen: e.target.files[0] })} 
/>


              <div className="modal-buttons">
                <button onClick={() => actualizarProducto(productoEditar)}>Guardar</button>
                <button onClick={() => setProductoEditar(null)}>Cancelar</button>
              </div>
            </div>
          )}


<div className="table-container">
          {/* Tabla de productos */}
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Categoría</th>
                <th>Cantidad</th>
                <th>Color</th>
                <th>Descripción</th>
                <th>Talla</th>
                <th>Imagen</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productosPagina.map((p) => (
                <tr key={p._id}>
                  <td>{p.nombre}</td>
                  <td>${p.precio}</td>
                  <td>{p.categoria}</td>
                  <td>{p.cantidad}</td>
                  <td>{p.color}</td>
                  <td>{p.descripcion}</td>
                  <td>{p.talla}</td>
                  <td>
                    <img src={`http://localhost:5000/uploads/${p.imagen}`} alt={p.nombre} className="mini-img" />
                  </td>
                  <td>
                    <td className="acciones-td">
  <button className="btn-modificar" onClick={() => modificarProducto(p)}>
    <FaEdit size={18} />
  </button>
  <button className="btn-eliminar" onClick={() => eliminarProducto(p._id)}>
    <FaTrash size={18} />
  </button>
</td>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
</div>
          {/* Paginación */}
          <div className="paginacion">
            {Array.from({ length: totalPaginas }, (_, i) => (
              <button key={i + 1} onClick={() => cambiarPagina(i + 1)} className={paginaActual === i + 1 ? "pagina-activa" : ""}>
                {i + 1}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* ==================== SECCIÓN USUARIOS ==================== */}
      {tab === "usuarios" && (
        <section className="admin-section">
          <h2>Agregar Usuario</h2>
          <form className="admin-form" onSubmit={agregarUsuario}>
            <input type="text" placeholder="Nombre" value={nuevoUsuario.nombre} onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, nombre: e.target.value })} required />
            <input type="text" placeholder="Apellido" value={nuevoUsuario.apellido} onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, apellido: e.target.value })} required />
            <input type="email" placeholder="Correo" value={nuevoUsuario.correo} onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, correo: e.target.value })} required />
            <input type="password" placeholder="Contraseña" value={nuevoUsuario.contraseña} onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, contraseña: e.target.value })} required />
            <select value={nuevoUsuario.tipo} onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, tipo: e.target.value })}>
              <option value="usuario">Usuario normal</option>
              <option value="admin">Administrador</option>
            </select>
            <button type="submit">Agregar Usuario</button>
          </form>


<div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Correo</th>
                <th>Contraseña</th>
                <th>Tipo</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((u) => (
                <tr key={u._id}>
                  <td>{u.nombre}</td>
                  <td>{u.apellido}</td>
                  <td>{u.correo}</td>
                  <td>{u.contraseña}</td>
                  <td>{u.tipo}</td>
                  <td>
                    <button className="btn-icon" onClick={() => eliminarUsuario(u._id)}>
    <FaTrash />
  </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </section>
      
      )}
    </div>
    
  );
}

export default AdminPanel;
