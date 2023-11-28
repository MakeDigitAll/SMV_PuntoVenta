import React, { useState, useEffect } from "react";
import { Button, Input, Spacer, Modal, ModalHeader, ModalContent, useDisclosure } from "@nextui-org/react";
import { RiCloseLine, RiDeleteBin5Line } from "react-icons/ri";
import { MdSearch } from "react-icons/md";
import Catalogue from "./Catalogue";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
const NewSaleProductos = (props) => {
  const { showOrder, setShowOrder } = props;
  const [productos, setProductos] = useState([]);
  const [productosEnOrden, setProductosEnOrden] = useState([]);
  const [totalProductosEnOrden, setTotalProductosEnOrden] = useState(0);
  const [cantidadProductosAgregados, setCantidadProductosAgregados] = useState({});
  const [cantidadTotalEnOrden, setCantidadTotalEnOrden] = useState(0);
  const [precioTotalEnOrden, setPrecioTotalEnOrden] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [buscador, setBuscador] = useState("");
  const [originalProductos, setOriginalProductos] = useState([]);
  const [idBuscado, setidBuscado] = useState("");
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [descuento, setDescuento] = useState(0);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { isOpen: isOpenC, onOpen: onOpenC, onClose: onCloseC } = useDisclosure();
  const [descuentoAplicado, setDescuentoAplicado] = useState(0);
  const handleCancelar = () => {
    navigate("/PointofSale/Sales");
  };
  const handleShowModal = () => {
    onOpen();
  };
  const handleCloseModal = () => {
    onClose();
  };
  const handleShowModalCancelar = () => {
    onOpenC(true);
  };
  const handleCloseModalCobrar = () => {
    onCloseC();
  };

  const productsPerPage = 3;
  async function loadProductosFromDB() {
    try {
      const response = await fetch("https://localhost:4000/Productos");
      const data = await response.json();
      if (response.ok) {
        setProductos(data);
        setOriginalProductos(data);
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
      const subtotal = producto.precio * producto.cantidad * (1 - producto.descuento / 100);
      return total + subtotal;
    }, 0);
  };




  const actualizarTotalProductosEnOrden = () => {
    const total = calcularTotal(productosEnOrden);
    setTotalProductosEnOrden(total);
  };

  useEffect(() => {
  }, [productosEnOrden]);

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


  const puedeGenerarTicket = () => {

    return productosEnOrden.length > 0 && totalProductosEnOrden == 0;
  };

  const handleApplyDiscount = () => {
    const hayProductosEnOrden = productosEnOrden.length > 0;
  
    if (!hayProductosEnOrden) {
      setDescuento(0);
      toast.error("No hay productos en la lista", {
        position: "bottom-right",
        theme: "colored",
      });
      return;
    }
  
   
    if (descuento > 100 || descuento < 0) {
      toast.error("Tu descuento debe ser entre 1 y 100", {
        position: "bottom-right",
        theme: "colored",
      });
    } else {

      const descuentoAplicado = (descuento / 100) * totalProductosEnOrden;
      const totalConDescuento = totalProductosEnOrden - descuentoAplicado;
      setTotalProductosEnOrden(totalConDescuento);
      setDescuentoAplicado(descuentoAplicado);
      onClose();
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleApplyDiscount();
    }
  };

  const handleAgregarProductoAOrden = (selectedProduct) => {
    const cantidadDisponible = selectedProduct.cantidad;

    if (cantidadDisponible > 0) {
      // Restar 1 a la cantidad disponible
      selectedProduct.cantidad = cantidadDisponible - 1;

      // Buscar si el producto ya está en la orden
      const productInOrder = productosEnOrden.find((item) => item.id === selectedProduct.id);

      if (productInOrder) {
        // Si el producto ya está en la orden, solo incrementa la cantidad
        productInOrder.cantidad += 1;
        productInOrder.total = productInOrder.cantidad * productInOrder.precio * (1 - productInOrder.descuento / 100);

        // Actualizar el estado de cantidadTotalEnOrden y precioTotalEnOrden
        const updatedCantidadTotalEnOrden = { ...cantidadTotalEnOrden };
        updatedCantidadTotalEnOrden[selectedProduct.id] = (updatedCantidadTotalEnOrden[selectedProduct.id] || 0) + 1;
        setCantidadTotalEnOrden(updatedCantidadTotalEnOrden);

        const updatedPrecioTotalEnOrden = { ...precioTotalEnOrden };
        updatedPrecioTotalEnOrden[selectedProduct.id] = (updatedPrecioTotalEnOrden[selectedProduct.id] || 0) + selectedProduct.precio * (1 - selectedProduct.descuento / 100);
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
        updatedCantidadTotalEnOrden[selectedProduct.id] = 1;
        setCantidadTotalEnOrden(updatedCantidadTotalEnOrden);

        const updatedPrecioTotalEnOrden = { ...precioTotalEnOrden };
        updatedPrecioTotalEnOrden[selectedProduct.id] = selectedProduct.precio * (1 - selectedProduct.descuento / 100);
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
    const productoEnTabla1 = productos.find((producto) => producto.id === productoRemovido.id);
    if (productoEnTabla1) {
      productoEnTabla1.cantidad += 1;
    }

    // Actualiza el estado de cantidadProductosAgregados y precioTotalEnOrden
    const updatedCantidadProductosAgregados = { ...cantidadProductosAgregados };
    updatedCantidadProductosAgregados[productoRemovido.id] = (updatedCantidadProductosAgregados[productoRemovido.id] || 0) - 1;
    setCantidadProductosAgregados(updatedCantidadProductosAgregados);

    const updatedPrecioTotalEnOrden = { ...precioTotalEnOrden };
    updatedPrecioTotalEnOrden[productoRemovido.id] = (updatedPrecioTotalEnOrden[productoRemovido.id] || 0) - productoRemovido.precio * (1 - productoRemovido.descuento / 100);
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
    const productoEnTabla1 = productos.find((producto) => producto.id === productoRemovido.id);
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
  const filtrarProductosPorid = (productos, idABuscar) => {
    return productos.filter((producto) =>
      producto.id.toLowerCase().includes(idABuscar.toLowerCase())
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
  const handleSearchid = (event) => {
    const searchTerm = event.target.value;
    setidBuscado(searchTerm);

    if (searchTerm.trim() === "") {
      // Restablecer la lista original cuando el término de búsqueda está vacío
      setProductos(originalProductos);
    } else {
      const productosFiltrados = filtrarProductosPorid(originalProductos, searchTerm);
      setProductos(productosFiltrados);
    }
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

        <div
          className={`lg:col-span-2 fixed top-0 bg-[#1F1D2B] w-full lg:w-96 lg:right-0 h-screen transition-all z-40 ${showOrder ? "right-0" : "-right-full"}`
          }
        >
          {/* Orders */}
          <div className="relative pt-16 lg:pt-8 text-gray-300 p-8 h-full flex flex-col justify-between">
            <RiCloseLine
              onClick={() => setShowOrder(false)}
              className="lg:hidden absolute left-4 top-4 p-3 box-content text-gray-300 bg-[#262837] rounded-full text-xl"
            />
            <div className="bg-[#262837] p-4 rounded-xl mb-4">
              <div className="grid grid-cols-4 mb-2">
                {/* Product description */}
                <div className="col-span-2 flex items-center gap-2">
                  <div>
                    <h1 className="text-md">Vendedor</h1>
                    <p className="text-xs text-gray-400">Vendedor:Sitio Web</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[#262837] p-2 rounded-xl mb-2">
              <div className="grid grid-cols-4 mb-0">
                <div className="col-span-4 flex flex-col items-center justify-center gap-3">
                  <div className="text-center">
                    <h1 className="text-md">Imagen Producto</h1>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <img
                      src="https://somosmamas.com.ar/wp-content/uploads/2020/06/00-1320x743.jpg"
                      className="w-26 h-24 object-cover rounded-full"
                      alt="Imagen del producto"
                    />
                  </div>
                </div>
              </div>
            </div>
           
           

            <div className="bg-[#262837] w-full bottom-0 left-0 p-2" style={{ minHeight: '250px' }}>
            <div className="text-center">
                  <h1 className="text-md">Total de Venta</h1>
                </div>
                <div className="flex items-center justify-between mb-3">
                <span className="text-gray-400">Neto</span>
                <span>$0.0</span>
              </div>
              <div className="flex items-center justify-between mb-3">
              <span className="text-gray-400">Descuento</span>
                    <span className="text-right">${descuentoAplicado.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-400">Subtotal</span>
                <span>$0.0</span>
              </div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-400">Impuestos</span>
                <span>$0.0</span>
              </div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-400 text-medium">Total</span>
                <span>${totalProductosEnOrden.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-400">Pagado</span>
                <span>$0.0</span>
              </div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-400">Falta</span>
                <span>$0.0</span>
              </div>
              <div className="flex flex-col space-y-4">
  <div className="flex justify-between space-x-1">
    <Button
      variant="danger"
      onClick={handleShowModal}
      style={{ flex: 1, backgroundColor: '#AC3DB9',fontWeight: 'bold' }}
    >
      Descuento(%)
    </Button>
    <Button
      onClick={handleShowModalCancelar}
      style={{ flex: 1, backgroundColor: '#AB2409',fontWeight: 'bold' }}
    >
      Cancelar pedido
    </Button>
  </div>
  <div className="flex justify-between space-x-1">
  <Button
  isDisabled={!puedeGenerarTicket()}
  style={{ flex: 1, backgroundColor: '#D69926', fontWeight: 'bold' }}
>
  Imp. Ticket
</Button>
    <Button
      style={{ flex: 1, backgroundColor: '#54CD71',fontWeight: 'bold' }}
    >
      Pagar
    </Button>
  </div>
</div>
<Spacer></Spacer>
            </div>
          </div>
        </div>

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
              value={idBuscado}
              onChange={handleSearchid}
            />
          </div>
          <Catalogue />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />

        </div>
        <Spacer y={2} />
        <div>
  <h2 style={{ textAlign: 'left' }}>Productos</h2>
  <div className="product-list" style={{  overflowY: 'auto' }}>
    <table
      className="table text-black-400 border-separate space-y-6 text-sm"
      style={{ fontFamily: "Gotham, sans-serif", width: '100%' }}
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
          <th className="p-3">Añadir</th>
        </tr>
      </thead>
    </table>
  </div>

  <div className="product-list" style={{ maxHeight: '200px', overflowY: 'auto' }}>
    <table
      className="table text-black-400 border-separate space-y-6 text-sm"
      style={{ fontFamily: "Gotham, sans-serif", width: '100%' }}
    >
      <tbody>
        {productosOrdenados.map((producto, index) => (
          <tr key={index} className="bg-gray-800">
            <td className="p-3">{producto.id}</td>
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
  </div>
</div>



        <h2 style={{ textAlign: 'left' }}>Productos en la orden</h2>
        <table
          className="table text-black-400 border-separate space-y-6 text-sm"
          style={{ fontFamily: "Gotham, sans-serif" }}
        >
          <thead className="bg-gray-800 text-black-500">
            <tr>
              <th className="p-3">No. Producto</th>
              <th className="p-3">Código</th> {/* Cambiar a id */}
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
                <td className="p-3">{producto.id}</td>
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
      </div>
      <div className="flex flex-wrap place-content-end space-x-2">
<Button color="success">
  Guardar
</Button>
</div>
      <Modal
        isOpen={isOpen}
        onOpenChange={onClose}
        size="2xl"
        disableBackdropClick
        backdrop="opaque"
        style={{


          margin: '10px',
          padding: '10px',
        }}
      >
        <ModalHeader>Aplicar Descuento</ModalHeader>
        <ModalContent>
          <Input
            type="number"
            size="sm"
            placeholder="Ingrese el descuento(%)"
            value={descuento}
            onChange={(e) => setDescuento(parseFloat(e.target.value))}
            onKeyDown={handleKeyDown}
          />
          <Spacer></Spacer>
          <div className="flex justify-end">
            <Button variant="danger"
              className="custom-button" onClick={handleApplyDiscount}>
              Aplicar Descuento
            </Button>

            <Button variant="danger" style={{ backgroundColor: '#AC3DB9', marginLeft: '8px' }} onClick={onClose}>
              Cerrar
            </Button>
          </div>
        </ModalContent>
      </Modal>

      <Modal
        isOpen={isOpenC}
        onOpenChange={(newIsOpen) => onCloseC(newIsOpen)}
        size="xs"
        disableBackdropClick
        backdrop="transparent"
      >
        <ModalHeader>Cancelar</ModalHeader>
        <ModalContent style={{ padding: '20px' }}>
          <p>¿Deseas cancelar la compra?</p>
          <div style={{ display: 'flex', marginTop: '20px' }}>
            <Button className="custom-button" style={{ marginRight: '10px' }} onClick={handleCancelar}>
              Sí
            </Button>
            <Button style={{ backgroundColor: '#AC3DB9' }} onClick={() => onCloseC(false)}>
              No
            </Button>
          </div>
        </ModalContent>
      </Modal>
    </div>


  );
};

export default NewSaleProductos;
