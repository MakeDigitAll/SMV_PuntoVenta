import React, { useState, useEffect } from "react";
import { Modal, Button, Input, Spacer, Table } from "@nextui-org/react";
import { RiDeleteBin5Line } from "react-icons/ri"; // Icono de bote de basura

const AccesPointProductosView = () => {
  const [showModal, setShowModal] = useState(false);
  const [idproducto, setidproducto] = useState("");
  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [precio, setPrecio] = useState(""); // Cambio de precioUnitario a precio
  const [descuento, setDescuento] = useState("");
  const [productos, setProductos] = useState([]);
  const [productosDB, setProductosDB] = useState([]); // Almacena la lista de productos desde la DB
  const [searchTerm, setSearchTerm] = useState("");
  const [productosEnOrden, setProductosEnOrden] = useState([]); // Almacena los productos en la orden
  const [totalProductosEnOrden, setTotalProductosEnOrden] = useState(0); // Estado para el total de productos en la orden
  const [cantidadProductosAgregados, setCantidadProductosAgregados] = useState({});
  const [cantidadTotalEnOrden, setCantidadTotalEnOrden] = useState(0);
  const [precioTotalEnOrden, setPrecioTotalEnOrden] = useState(0);
  const [currentPage, setCurrentPage] = useState(1); // Página actual de la tabla 1
  const productsPerPage = 3; // Cantidad de productos por página

  async function loadProductosFromDB() {
    try {
      const response = await fetch("https://localhost:4000/Productos");
      const data = await response.json();
      if (response.ok) {
        setProductos(data);
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
    actualizarTotalProductosEnOrden();
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

  const handleAgregarProducto = () => {
    const nuevoProducto = {
      idproducto,
      nombre,
      cantidad: parseInt(cantidad),
      precio: parseFloat(precio),
      descuento: parseFloat(descuento),
      total: parseFloat(precio) * parseInt(cantidad) * (1 - parseFloat(descuento) / 100),
    };
    setProductos([...productos, nuevoProducto]);
    setShowModal(false);
  };

  const handleEliminarProducto = (index) => {
    const nuevosProductos = [...productos];
    nuevosProductos.splice(index, 1);
    setProductos(nuevosProductos);
  };

  const handleProductSelect = (selectedProduct) => {
    setidproducto(selectedProduct.idproducto);
    setNombre(selectedProduct.nombre);
    setShowModal(true);
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
        `}
      </style>
      <div>
        <div className="flex justify-between">
          <Input
            type="text"
            placeholder="Buscar por idproducto o nombre"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

       

        <Spacer y={2} />

        <h2 style={{ textAlign: 'left' }}>Productos</h2>
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
            {currentProducts.map((producto, index) => (
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

        <div>
          <ul className="pagination">
            {Array.from({ length: Math.ceil(productosOrdenados.length / productsPerPage) }).map((_, index) => (
              <li key={index} className="page-item">
                <button className="page-link" onClick={() => paginate(index + 1)}>
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
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
        <h2>Cantidad Disponible</h2>

        <div className="flex justify-end">
          <Button variant="success">Cobrar</Button>
        </div>
      </div>
    </div>
  );
};

export default AccesPointProductosView;
