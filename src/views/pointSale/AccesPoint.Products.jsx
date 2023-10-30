import React, { useState, useEffect } from "react";
import {  Button, Input, Modal, Spacer, Table } from "@nextui-org/react";
import { RiDeleteBin5Line } from "react-icons/ri"; 
import { MdSearch } from "react-icons/md";
import ModalCatalogue from "./Catalogue";
import AddExcelOrders from "../Excel/addExcel/addExcelOrders";

import Catalogue from "./Catalogue";
Modal.setAppElement('#root');
const AccesPointProductosView = () => {
  const [productos, setProductos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [productosEnOrden, setProductosEnOrden] = useState([]);
  const [totalProductosEnOrden, setTotalProductosEnOrden] = useState(0);
  const [cantidadProductosAgregados, setCantidadProductosAgregados] = useState({});
  const [cantidadTotalEnOrden, setCantidadTotalEnOrden] = useState(0);
  const [precioTotalEnOrden, setPrecioTotalEnOrden] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [buscador, setBuscador] = useState("");
  const [originalProductos, setOriginalProductos] = useState([]);
  const [idProductoBuscado, setIdProductoBuscado] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [descuento, setDescuento] = useState(0);

  const productsPerPage = 3;

  async function loadProductosFromDB() {
    try {
      const response = await fetch("https://localhost:4000/Productos");
      const data = await response.json();
      if (response.ok) {
        setProductos(data);
        setOriginalProductos(data); // Guardar una copia de los productos originales
      }
    } catch (error) {
      console.error("Error al cargar los datos:", error);
    }
  }
  useEffect(() => {
    loadProductosFromDB();
  }, []);

  const calcularTotal = (productos) => {
    return productos.reduce((total, producto) => {
      const subtotal = producto.precio * producto.cantidad * (1 - producto.descuento / 100); // Cambio de precioUnitario a precio
      return total + subtotal;
    }, 0);
  };
 
  
  
  
  const actualizarTotalProductosEnOrden = () => {
    const total = calcularTotal(productosEnOrden);
    setTotalProductosEnOrden(total);
  };

  useEffect(() => {
    const totalOrden = calcularTotal(productosEnOrden);
    setTotalProductosEnOrden(totalOrden);
  }, [productosEnOrden]);

  // Ordenar los productos por nombre
  const productosOrdenados = productos.slice().sort((a, b) => a.nombre.localeCompare(b.nombre));

  // Calcular el índice de inicio y final para la paginación
  const indexOfLastProduct = currentPage * productsPerPage;
const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
const currentProducts = productosOrdenados.slice(indexOfFirstProduct, indexOfLastProduct);

// Cambiar la página
const paginate = (pageNumber) => {
  setCurrentPage(pageNumber);
};

 
 const handleApplyDiscount = () => {
    // Aplicar el descuento al total
    const totalConDescuento = totalProductosEnOrden - descuento;
    setTotalProductosEnOrden(totalConDescuento);

    // Cerrar el modal
    handleCloseModal();
  };
  

const handleAgregarProductoAOrden = (selectedProduct) => {
  const cantidadDisponible = selectedProduct.cantidad;

  if (cantidadDisponible > 0) {
    // Restar 1 a la cantidad disponible
    selectedProduct.cantidad = cantidadDisponible - 1;

    // Buscar si el producto ya está en la orden
    const productInOrder = productosEnOrden.find((item) => item.idproducto === selectedProduct.idproducto);

    if (productInOrder) {
      // Si el producto ya está en la orden, solo incrementa la cantidad
      productInOrder.cantidad += 1;
      productInOrder.total = productInOrder.cantidad * productInOrder.precio * (1 - productInOrder.descuento / 100);

      // Actualizar el estado de cantidadTotalEnOrden y precioTotalEnOrden
      const updatedCantidadTotalEnOrden = { ...cantidadTotalEnOrden };
      updatedCantidadTotalEnOrden[selectedProduct.idproducto] = (updatedCantidadTotalEnOrden[selectedProduct.idproducto] || 0) + 1;
      setCantidadTotalEnOrden(updatedCantidadTotalEnOrden);

      const updatedPrecioTotalEnOrden = { ...precioTotalEnOrden };
      updatedPrecioTotalEnOrden[selectedProduct.idproducto] = (updatedPrecioTotalEnOrden[selectedProduct.idproducto] || 0) + selectedProduct.precio * (1 - selectedProduct.descuento / 100);
      setPrecioTotalEnOrden(updatedPrecioTotalEnOrden);

    } else {
      // Si el producto no está en la orden, agrégalo
      setProductosEnOrden([...productosEnOrden, {
        ...selectedProduct,
        cantidad: 1,
        total: selectedProduct.precio * (1 - selectedProduct.descuento / 100),
      }]);

      // Actualizar el estado de cantidadTotalEnOrden y precioTotalEnOrden
      const updatedCantidadTotalEnOrden = { ...cantidadTotalEnOrden };
      updatedCantidadTotalEnOrden[selectedProduct.idproducto] = 1;
      setCantidadTotalEnOrden(updatedCantidadTotalEnOrden);

      const updatedPrecioTotalEnOrden = { ...precioTotalEnOrden };
      updatedPrecioTotalEnOrden[selectedProduct.idproducto] = selectedProduct.precio * (1 - selectedProduct.descuento / 100);
      setPrecioTotalEnOrden(updatedPrecioTotalEnOrden);
    }

    // Actualiza el total de la orden
    const totalOrden = calcularTotal(productosEnOrden);
    setTotalProductosEnOrden(totalOrden);
  }
};
  const handleEliminarProductoEnOrden = (index) => {
    const productoRemovido = productosEnOrden[index];

    // Encuentra el producto correspondiente en la tabla 1 y actualiza su cantidad
    const productoEnTabla1 = productos.find((producto) => producto.idproducto === productoRemovido.idproducto);
    if (productoEnTabla1) {
      productoEnTabla1.cantidad += 1;
    }

    // Actualiza el estado de cantidadProductosAgregados y precioTotalEnOrden
    const updatedCantidadProductosAgregados = { ...cantidadProductosAgregados };
    updatedCantidadProductosAgregados[productoRemovido.idproducto] = (updatedCantidadProductosAgregados[productoRemovido.idproducto] || 0) - 1;
    setCantidadProductosAgregados(updatedCantidadProductosAgregados);

    const updatedPrecioTotalEnOrden = { ...precioTotalEnOrden };
    updatedPrecioTotalEnOrden[productoRemovido.idproducto] = (updatedPrecioTotalEnOrden[productoRemovido.idproducto] || 0) - productoRemovido.precio * (1 - productoRemovido.descuento / 100);
    setPrecioTotalEnOrden(updatedPrecioTotalEnOrden);

    // Si la cantidad es 1 o menor en la tabla 2, elimina el producto de la orden
    const nuevosProductosEnOrden = [...productosEnOrden];
    if (productoRemovido.cantidad > 1) {
      // Si la cantidad es mayor que 1, simplemente resta 1 a la cantidad en la tabla 2
      productoRemovido.cantidad -= 1;
      productoRemovido.total = productoRemovido.cantidad * productoRemovido.precio * (1 - productoRemovido.descuento / 100);
    } else {
      // Si la cantidad es 1 o menor en la tabla 2, elimina el producto de la orden
      nuevosProductosEnOrden.splice(index, 1);
    }
    setProductosEnOrden(nuevosProductosEnOrden);
  };

  const handleDelete = (index) => {
    const productoRemovido = productosEnOrden[index];

    // Encuentra el producto correspondiente en la tabla 1 y actualiza su cantidad
    const productoEnTabla1 = productos.find((producto) => producto.idproducto === productoRemovido.idproducto);
    if (productoEnTabla1) {
      productoEnTabla1.cantidad += productoRemovido.cantidad;
    }

    // Elimina el producto de la tabla 2
    const nuevosProductosEnOrden = [...productosEnOrden];
    nuevosProductosEnOrden.splice(index, 1);
    setProductosEnOrden(nuevosProductosEnOrden);
  };

  const productosTotal = calcularTotal(productos);
 const productosEnOrdenTotal = calcularTotal(productosEnOrden);
 const filtrarProductosPorNombre = (productos, nombreABuscar) => {
  return productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(nombreABuscar.toLowerCase())
  );
};
const filtrarProductosPorIdProducto = (productos, idProductoABuscar) => {
  return productos.filter((producto) =>
    producto.idproducto.toLowerCase().includes(idProductoABuscar.toLowerCase())
  );
};
  
  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    setBuscador(searchTerm);
    if (searchTerm.trim() === "") {
      // Restablecer la lista original cuando el término de búsqueda está vacío
      setProductos(originalProductos);
    } else {
      // Filtrar productos por nombre
      const productosFiltrados = filtrarProductosPorNombre(originalProductos, searchTerm);
      setProductos(productosFiltrados);
    }
  };
  const handleSearchIdProducto = (event) => {
    const searchTerm = event.target.value;
    setIdProductoBuscado(searchTerm);

    if (searchTerm.trim() === "") {
      // Restablecer la lista original cuando el término de búsqueda está vacío
      setProductos(originalProductos);
    } else {
      const productosFiltrados = filtrarProductosPorIdProducto(originalProductos, searchTerm);
      setProductos(productosFiltrados);
    }
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleShowModal = () => {
    console.log("Opening modal"); // Add this line for debugging
    setShowModal(true);
  };
  return (
    <div style={{ textAlign: "center" }}>
      <style>
        {`
          .table {
            border-spacing: 0 10px;
          }

          i {
            font-size: 1rem !important;
          }

          .table tr {
            border-radius: 20px;
          }

          tr td:nth-child(n+8),
          tr th:nth-child(n+8) {
            border-radius: 0 .625rem .625rem 0;
          }

          tr td:nth-child(1),
          tr th:nth-child(1) {
            border-radius: .625rem 0 0 .625rem;
          }
          .custom-button {
            background-color: #ec7c6a;
           font-size: 14px;
            color: white;
          }
        `}
      </style>
      <div>
      <div className="flex flex-wrap gap-2">
  <div className="flex flex-col w-[450px] sm:max-w-[44%]">
    <Input
      type="text"
      size="sm"
      placeholder="Buscar por nombre"
      startContent={<MdSearch />}
      value={buscador}
      onChange={handleSearch}
    />
  </div>
  <div className="flex flex-col w-[450px] sm:max-w-[44%]">
    <Input
      type="text"
      size="sm"
      placeholder="SKU"
      startContent={<MdSearch />}
      value={idProductoBuscado}
      onChange={handleSearchIdProducto}
    />
  </div>
  <Catalogue/>
</div>
        <Spacer y={2} />
        <h2 style={{ textAlign: 'left' }}>Productos</h2>
        <table
          className="table text-black-400 border-separate space-y-6 text-sm"
          style={{ fontFamily: "Gotham, sans-serif" }}
        >
          <thead className="bg-gray-800 text-black-500">
            <tr>
              <th className="p-3">Código</th> 
              <th className="p-3">Nombre</th>
              <th className="p-3">Marca</th>
              <th className="p-3">Categoria</th>
              <th className="p-3">Cantidad</th>
              <th className="p-3">Precio Unitario</th>
              <th className="p-3">Descuento</th>
              <th className="p-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((producto, index) => (
              <tr key={index} className="bg-gray-800">
                <td className="p-3">{producto.idproducto}</td> {/* Cambiar a idproducto */}
                <td className="p-3">{producto.nombre}</td>
                <td className="p-3">{producto.marca}</td>
                <td className="p-3">{producto.categoria}</td>
                <td className="p-3">{producto.cantidad}</td>
                <td className="p-3">{producto.precio.toFixed(2)}</td>
                <td className="p-3">{producto.descuento}%</td>
                <td className="p-3">
                  <Button
                    variant="primary"
                    onClick={() => handleAgregarProductoAOrden(producto)}
                  >
                    +
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

       <div className="pagination" style={{ textAlign: 'left' }}>
  <button
    className="page-link"
    onClick={() => {
      if (currentPage > 1) {
        paginate(currentPage - 1);
      }
    }}
  >
    &lt;
  </button>
  {Array.from({ length: Math.ceil(productosOrdenados.length / productsPerPage) }).map((_, index) => (
    <button
      key={index}
      className={`page-link ${currentPage === index + 1 ? "active" : ""}`}
      onClick={() => paginate(index + 1)}
      style={{
        margin: '0.2rem',
        border: '1px solid #ccc',
        padding: '0.3rem 0.5rem',
        borderRadius: '4px',
        background: currentPage === index + 1 ? '#007bff' : 'transparent',
        color: '#fff', // Hace que el color del texto sea blanco
      }}
    >
      {index + 1}
    </button>
  ))}
  <button
    className="page-link"
    onClick={() => {
      if (currentPage < Math.ceil(productosOrdenados.length / productsPerPage)) {
        paginate(currentPage + 1);
      }
    }}
  >
    &gt;
  </button>
</div>

        <h2 style={{ textAlign: 'left' }}>Productos en la orden</h2>
        <table
          className="table text-black-400 border-separate space-y-6 text-sm"
          style={{ fontFamily: "Gotham, sans-serif" }}
        >
          <thead className="bg-gray-800 text-black-500">
            <tr>
              <th className="p-3">No. Producto</th>
              <th className="p-3">Código</th> {/* Cambiar a idproducto */}
              <th className="p-3">Nombre</th>
              <th className="p-3">Cantidad</th>
              <th className="p-3">Precio Unitario</th>
              <th className="p-3">Descuento</th>
              <th className="p-3">Total</th>
              <th className="p-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productosEnOrden.map((producto, index) => (
              <tr key={index} className="bg-gray-800">
                <td className="p-3">{index + 1}</td>
                <td className="p-3">{producto.idproducto}</td> {/* Cambiar a idproducto */}
                <td className="p-3">{producto.nombre}</td>
                <td className="p-3">{producto.cantidad}</td>
                <td className="p-3">{producto.precio.toFixed(2)}</td>
                <td className="p-3">{producto.descuento}%</td>
                <td className="p-3">{producto.total.toFixed(2)}</td>

                <td className="p-3">
                  <Button
                    variant="danger"
                    onClick={() => handleEliminarProductoEnOrden(index)}
                  >
                    -
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(index)}
                  >
                    <RiDeleteBin5Line />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>Total en la orden: {totalProductosEnOrden.toFixed(2)}</p>
        <div className="flex justify-end">
        <Button variant="danger" className="custom-button">
  Cobrar
</Button>
</div>
      </div>
      <div className="flex justify-end">
        <Button variant="danger" className="custom-button" onClick={handleShowModal}>
          Aplicar Descuento
        </Button>
      </div>
      <Modal open={showModal} onClose={handleCloseModal}>
        <Modal.Header>Aplicar Descuento</Modal.Header>
        <Modal.Content>
          <Input
            type="number"
            size="sm"
            placeholder="Ingrese el descuento"
            value={descuento}
            onChange={(e) => setDescuento(parseFloat(e.target.value))}
          />
        </Modal.Content>
        <Modal.Footer>
          <Button variant="primary" onClick={handleApplyDiscount}>
            Aplicar Descuento
          </Button>
          <Button variant="default" onClick={handleCloseModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    
    
            
  );
};

export default AccesPointProductosView;
