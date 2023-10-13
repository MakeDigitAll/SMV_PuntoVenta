import {
  Button,
  Input,
  Link,
  Spacer,
  Tab,
  Tabs,
  Checkbox,
  Select,
  Textarea,
  TableHeader,
  TableColumn,
  TableRow,
  TableBody,
  Table,
  TableCell,
  ModalContent,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  SelectItem,
  Card,
  CardBody,
} from "@nextui-org/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { format } from "date-fns";

//import ProfileImageUpload from "../user/ProfilesImagenUploads.tsx";
import { Breadcrumbs, Typography } from "@mui/material";
import { RiDashboard2Fill } from "react-icons/ri";
import {
  MdDiscount,
  MdPeopleAlt,
  MdPercent,
  MdPerson,
  MdSearch,
  MdSettings,
  MdUpload,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import ItemsHeader from "../../components/header/itemsHeader/ItemsHeader.jsx";

import { MdSave } from "react-icons/md";
import http from "../../components/axios/Axios";
import { use } from "i18next";
const Quote = () => {
  const [user, setUser] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    imagen: "",
    emailConfirm: "",
    passwordConfirm: "",
    dateQuote: format(new Date(), "yyyy-MM-dd"),
  });
  const [validationErrors, setValidationErrors] = useState({
    pedido: "",
    cliente: "",
    recurrenciaa: "",
    origen: "",
    monto: "",
  });

  // const [dataQuote, setDataQuote] = useState({
  //   pedido: "",
  //   cliente: "",
  //   comentarios: "",
  //   descuento: "",
  //   vendedor: "",
  //   recurrenciaa: "",
  //   origen: "",
  //   monto: "",
  //   fecha: format(new Date(), "yyyy-MM-dd"),
  // });

  const datosCliente = () => {
    async function loadDatosCliente() {
      try {
        const response = await fetch(`http://localhost:4000/Clientes`);
        const data = await response.json();
        if (response.ok) {
          setProductos(data);
        }
      } catch (err) {
        toast.error("Error al cargar los datos", {
          position: "bottom-right",
          theme: "colored",
        });
      }
    }
    loadDatosCliente();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "descuento":
        var valor = parseFloat(value);
        if (valor > 0 && valor <= 100) {
          setDataQuote((prevState) => ({
            ...Number(prevState),
            [name]: value,
          }));
        } else {
          toast.error("El descuento debe ser mayor a 0 y menor a 100", {
            theme: "colored",
          });
        }
        break;
      default:
        break;
    }

    setDataQuote((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const fileInputRef = useRef(null);
  const handleFileButtonClick = () => {
    fileInputRef.current.click();
  };
  const [isChecked, setIsChecked] = useState(false);
  function handleCheckboxChange() {
    setIsChecked(!isChecked); // Cambiar el estado al hacer clic del checkbox
    console.log(isChecked);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (
      !dataQuote.pedido ||
      !dataQuote.cliente ||
      !dataQuote.vendedor ||
      !dataQuote.recurrenciaa ||
      !dataQuote.origen ||
      !dataQuote.monto ||
      passwordValidationState !== "valid" ||
      confirmPasswordValidationState !== "valid" ||
      emailConfirmValidationState !== "valid"
    ) {
      toast.error("Llena todos los campos correctamente", {
        theme: "colored",
      });
    }

    const errors = {};
    !dataQuote.pedido ? (errors.pedido = "Llena este campo") : "";
    !dataQuote.cliente ? (errors.cliente = "Llena este campo") : "";
    !dataQuote.vendedor ? (errors.vendedor = "Llena este campo") : "";
    !dataQuote.recurrenciaa ? (errors.recurrenciaa = "Llena este campo") : "";
    !dataQuote.origen ? (errors.origen = "Llena este campo") : "";
    !dataQuote.monto ? (errors.monto = "Llena este campo") : "";
    !dataQuote.imagen ? (errors.imagen = "Llena este campo") : "";
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    setValidationErrors({});

    const formData = new FormData();
    const document = JSON.stringify({
      pedido: dataQuote.pedido,
      cliente: dataQuote.cliente,
      vendedor: dataQuote.vendedor,
      recurrenciaa: isChecked,
      origen: dataQuote.origen,
      monto: dataQuote.monto,
    });
    console.log(document.recurrenciaa);
    try {
      const result = await http.post(
        `http://localhost:4000/Cotizaciones`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status == 200) {
        toast.success("Cotización Creada Correctamente", { theme: "colored" });
      }
      navigate("/Sales/Quotes");
    } catch (error) {
      toast.error("Error al guardar Cotización", {
        position: "bottom-right",
        theme: "colored",
      });
    }
  }

  const validateEmail = (value) =>
    value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
  const validationState = useMemo(() => {
    if (user.email === "") return undefined;

    return validateEmail(user.email) ? "valid" : "invalid";
  }, [user.email]);
  const navigate = useNavigate();
  const envios = ["No Aplica", "Recoger en Oficina", "Envío a domicilio"];

  // -- Estados de los modales
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenDiscount,
    onOpen: onOpenDiscount,
    onClose: onCloseDiscount,
  } = useDisclosure();

  const handleOpenAddDiscount = () => {
    onOpenDiscount();
  };
  const [categorias, setCategorias] = useState([]);
  const [marca, setmarca] = useState([]);
  const loadCategorias = async () => {
    try {
      const response = await fetch("http://localhost:4000/Categoria");
      if (response.ok) {
        const categoriasData = await response.json();
        setCategorias(categoriasData);
      }
    } catch (error) {
      console.error("Error al obtener las categorías:", error);
    }
  };
  useEffect(() => {
    loadCategorias();
  }, []);
  const loadCMarcas = async () => {
    try {
      const response = await fetch("http://localhost:4000/MarcasProducto");
      if (response.ok) {
        const marcaData = await response.json();
        setmarca(marcaData);
      }
    } catch (error) {
      console.error("Error al obtener las categorías:", error);
    }
  };
  useEffect(() => {
    loadCMarcas();
  }, []);

  const [datos, setData] = useState([]);
  const loadTask = async () => {
    try {
      const response = await fetch("http://localhost:4000/Productos");
      const data = await response.json();
      if (response.ok) {
        setData(data);
      }
    } catch {
      toast.error("Error al cargar los datos", {
        position: "bottom-right",
        theme: "colored",
      });
    }
  };
  useEffect(() => {
    loadTask();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [datos2, setData2] = useState([]);
  const loadTask2 = async () => {
    try {
      const response = await fetch("http://localhost:4000/ProductosCotizados");
      const data = await response.json();
      if (response.ok) {
        setData2(data);
      }
    } catch {
      toast.error("Error al cargar los datos", {
        position: "bottom-right",
        theme: "colored",
      });
    }
  };
  useEffect(() => {
    loadTask2();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [filasAgregadas, setFilasAgregadas] = useState([]);
  const [cantidadesUsuario, setCantidadesUsuario] = useState([]);
  function adaptarDatos(data, cantidad) {
    return {
      codigo: data.codigoEmpresa,
      nombre: data.nombre,
      marca: data.marca,
      cantidad: cantidad,
      inventario: data.existencia,
      precioUnitario: data.precio,
      descuento: data.descuento,
      total: data.total,
    };
  }
  const agregarFila = (data, index) => {
    const cantidad = parseFloat(cantidadesUsuario[index]);

    const nuevoProducto = filasAgregadas.find(
      (fila) => fila.codigo === data.codigoEmpresa
    );

    if (nuevoProducto) {
      toast.warning("El producto ya ha sido agregado a la cotización.");
      return;
    }
    // Verifica si la cantidad es un número válido
    if (!isNaN(cantidad) || cantidad > 0) {
      const datosAdaptados = adaptarDatos(data, cantidad);
      setFilasAgregadas([...filasAgregadas, datosAdaptados]);
    } else {
      toast.warning("Por favor, ingrese una cantidad válida.");
    }
  };

  // ------------------------------------------------------------------------------------------------------------//
  //                                      Código para calcular totales                                           //
  //------------------------------------------------------------------------------------------------------------//

  function calcularTotalesTablaResumen(filas) {
    let netoTotal = 0;
    let descuentoTotal = 0;
    let subtotalTotal = 0;
    let impuestosTotal = 0;
    let total = 0;

    for (const fila of filas) {
      const neto = fila.cantidad * fila.precioUnitario;
      const descuentoValor = (neto * fila.descuento) / 100; 
      const subtotal = neto - descuentoValor;
      const impuestos = subtotal * 0.16; // Cambia el valor del impuesto según tu necesidad

      netoTotal += neto;
      descuentoTotal += descuentoValor;
      subtotalTotal += subtotal;
      impuestosTotal += impuestos;
    }

    total = subtotalTotal + impuestosTotal;

    return {
      netoTotal,
      descuentoTotal,
      subtotalTotal,
      impuestosTotal,
      total,
    };
  }

  const calcularTotales = () => {
    const tablaResumen = document.getElementById("tablaCalculos");
    const totalesNuevaTabla = calcularTotalesTablaResumen(filasAgregadas);
    // Actualiza los valores en la tabla de resumen
    tablaResumen.querySelector(
      "#netoTotal"
    ).textContent = `$${totalesNuevaTabla.netoTotal.toFixed(2)}`;
    tablaResumen.querySelector(
      "#descuentoTotal"
    ).textContent = `$${totalesNuevaTabla.descuentoTotal.toFixed(2)}`;
    tablaResumen.querySelector(
      "#subtotalTotal"
    ).textContent = `$${totalesNuevaTabla.subtotalTotal.toFixed(2)}`;
    tablaResumen.querySelector(
      "#impuestosTotal"
    ).textContent = `$${totalesNuevaTabla.impuestosTotal.toFixed(2)}`;
    tablaResumen.querySelector(
      "#total"
    ).textContent = `$${totalesNuevaTabla.total.toFixed(2)}`;
  };
  useEffect(() => {
    // Esta función se ejecutará cuando el componente esté montado
    calcularTotales();
  }, [filasAgregadas /*, dataQuote.descuento*/]);

  const handleCantidadChange = (event, index) => {
    const nuevasCantidades = [...cantidadesUsuario];
    nuevasCantidades[index] = event.target.value;
    setCantidadesUsuario(nuevasCantidades);
  };

  const handleProductosCotizados = (event, index) => {
    const { name, value } = event.target;

    if (value <= Number(filasAgregadas[index].inventario)) {
  
    const nuevasFilas = [...filasAgregadas];

    nuevasFilas[index] = {
      ...nuevasFilas[index],
      [name]: Number(value),
      ["total"]: Number(value) * Number(nuevasFilas[index].precioUnitario) - (Number(value) * Number(nuevasFilas[index].precioUnitario) * Number(nuevasFilas[index].descuento) / 100),
    };

    setFilasAgregadas(nuevasFilas);

    } else {
      toast.error("La cantidad debe ser mayor a cero y menor al inventario", {
        theme: "colored",
      });
    }
  };

  const [filtro, setFiltro] = useState(""); // Estado para almacenar el valor del filtro

  // Función para filtrar los datos en función del valor del filtro
  const filtrarDatos = () => {
    return datos.filter((dato) =>
      dato.nombre.toLowerCase().includes(filtro.toLowerCase())
    );
  };

  // Manejar el cambio en el campo de filtro
  const handleFiltroChange = (event) => {
    setFiltro(event.target.value);
  };

  //------------------------------------------------------------------------------------------------------------//
  //                                      Código para agregar productos a la cotización                         //
  //------------------------------------------------------------------------------------------------------------//

  const [dataQuote, setDataQuote] = useState({
    pedido: "",
    cliente: "",
    comentarios: "",
    vendedor: "",
    productosCotización: [],
    recurrenciaa: "",
    origen: "",
    monto: "",
    fecha: format(new Date(), "yyyy-MM-dd"),
  });

  // -- Codigo para cargar productos
  const [productos, setProductos] = useState([]);

  const handleOpenAddProduct = () => {
    onOpen();
    async function loadProducts() {
      try {
        const response = await fetch(`http://localhost:4000/Productos`);
        const data = await response.json();
        if (response.ok) {
          setProductos(data);
        }
      } catch (err) {
        toast.error("Error al cargar los datos", {
          position: "bottom-right",
          theme: "colored",
        });
      }
    }
    loadProducts();
  };

  //--Codigo Para Buscar Cliente
  const [clientes, setClientes] = useState([]); // Estado para almacenar los datos de los clientes de la base de datos
  const [idCliente, setIdCliente] = useState();

  //almacena todos los clientes de la base de datos
  //para buscar vendedor por nombre
  const [searchNombreCliente, setSearchNombreCliente] = useState("");
  const [nombreSelectedCliente, setNombreSelectedCliente] = useState("");

  //para mostrar los resultados de la busqueda
  const [isResultSearchCliente, setIsResultSearchCliente] = useState(false);
  //para almacenar los resultados de la busqueda
  const [filterCliente, setFilterCliente] = useState([]);
  //para almacenar los resultados de la busqueda
  const [idVendedor, setIdVendedor] = useState("");

  //fechaCotizacion
  const [fechaCotizacion, setFechaCotizacion] = useState();

  //Es recurrente
  const [isRecurrente, setIsRecurrente] = useState(false);

  //para almacenar los datos del cliente seleccionado
  const [clienteInfoGeneral, setClienteInfoGeneral] = useState([]);
  const [clienteInfoDireccion, setClienteInfoDireccion] = useState([]);
  const [clienteInfoFacturacion, setClienteInfoFacturacion] = useState([]);

  //para el envio
  const [envio, setEnvio] = useState("");

  //true o false para saber que informacion se muestra
  const [showInfoGeneral, setShowInfoGeneral] = useState(false);
  const [showInfoDireccion, setShowInfoDireccion] = useState(false);
  const [showInfoFacturacion, setShowInfoFacturacion] = useState(false);

  // Query para traer todos los Vendedores
  const getClientes = () => {
    async function getClientes() {
      try {
        const response = await fetch(`http://localhost:4000/ListadoClientes`);
        const data = await response.json();
        if (response.ok) {
          setClientes(data);
        }
      } catch (err) {
        toast.error("Error al cargar los datos", {
          position: "bottom-right",
          theme: "colored",
        });
      }
    }
    getClientes();
  };

  //

  const [direccionesCliente, setDireccionesCliente] = useState([]);

  const getDireccionCliente = () => {
    async function getDireccionCliente() {
      try {
        const response = await fetch(
          `http://localhost:4000/ClientesDireccionEnvio/${idCliente}`
        );
        const data = await response.json();
        if (response.ok) {
          console.log(data);
          setDireccionesCliente(data);
        }
      } catch (err) {
        toast.error("Error al cargar los datos", {
          position: "bottom-right",
          theme: "colored",
        });
      }
    }
    getDireccionCliente();
  };

  useEffect(() => {
    getClientes();
  }, []);

  //cuando halla un idCliente buscar sus direcciones
  useEffect(() => {
    if (idCliente) {
      getDireccionCliente();
    }
  }, [idCliente]);

  //buscar vendedor
  const buscarCliente = () => {
    let usuariosSearch = clientes.filter((cliente) =>
      cliente.nombreComercial.toLowerCase().includes(searchNombreCliente)
    );

    if (
      usuariosSearch.length > 0 &&
      usuariosSearch.length !== clientes.length
    ) {
      setIsResultSearchCliente(true);
      setFilterCliente(usuariosSearch);
    } else {
      setIsResultSearchCliente(false);
    }
  };

  useEffect(() => {
    buscarCliente();

    if (searchNombreCliente === nombreSelectedCliente) {
      setIsResultSearchCliente(false);
    }
  }, [searchNombreCliente]);

  const handleClienteClick = (cliente) => {
    setIdCliente(cliente.id);
    setNombreSelectedCliente(cliente.nombreComercial);
    setSearchNombreCliente(cliente.nombreComercial);
    setIdVendedor(cliente.vendedor);
    setIsResultSearchCliente(false);
    setFechaCotizacion(format(new Date(), "yyyy-MM-dd"));
    setShowInfoGeneral(true);
    setClienteDataGeneral(cliente);
  };

  const setClienteDataGeneral = (cliente) => {
    let clienteDataGeneral = {
      nombreComercial: cliente.nombreComercial,
      DateCreation: cliente.DateCreation,
      DateModification: cliente.DateModification,
      activo: cliente.activo,
      actualizacion: cliente.actualizacion,
      condicionesPago: cliente.condicionesPago,
      contacto: cliente.contacto,
      creditoDisponible: cliente.creditoDisponible,
      cuenta: cliente.cuenta,
      diasCredito: cliente.diasCredito,
      direccion: cliente.direccion,
      email: cliente.email,
      giro: cliente.giro,
      id: cliente.id,
      isDeleted: cliente.isDeleted,
      isUpdated: cliente.isUpdated,
      limiteCredito: cliente.limiteCredito,
      listaPrecios: cliente.listaPrecios,
      registro: cliente.registro,
      saldoPentiente: cliente.saldoPentiente,
      telefono: cliente.telefono,
      vendedor: cliente.vendedor,
      whatsApp: cliente.whatsApp,
    };
    setClienteInfoGeneral(clienteDataGeneral);
  };

  const handleClickDireccion = (direccion) => {
    setClienteDireccion(direccion);
  };

  const setClienteDireccion = (direccion) => {
    let clienteInfoDireccion = {
      nombreDireccion: direccion.nombreDireccion,
      calle: direccion.calle,
      colonia: direccion.colonia,
      ciudad: direccion.ciudad,
      estado: direccion.estado,
      codigoPostal: direccion.codigoPostal,
      entreCalles: direccion.entreCalles[0] + " y " + direccion.entreCalles[1],
      numeroInterior: direccion.numeroInterior,
      numeroExterior: direccion.numeroExterior,
      referencias: direccion.referencias,
      apellidoRecibe: direccion.apellidoRecibe,
    };
    setClienteInfoDireccion(clienteInfoDireccion);
  };

  const handleClickFacturacion = (facturacion) => {
    console.log("Facturacion");
    console.log(facturacion);
  };

  return (
    <>
      <ItemsHeader />
      <ToastContainer />
      <main>
        <div className="p-12">
          {/* <div className="p-12 bg-gray-100"> */}
          <div className="">
            <div>
              <div>
                <Breadcrumbs aria-label="breadcrumb" color="foreground">
                  <Link
                    className="text-foreground"
                    underline="hover"
                    sx={{ display: "flex", alignItems: "center" }}
                    color="foreground"
                    href="#"
                    onClick={() => navigate(`/Home`)}
                  >
                    <RiDashboard2Fill sx={{ mr: 0.5 }} fontSize="inherit" />
                    Inicio
                  </Link>
                  <Link
                    className="text-foreground"
                    underline="hover"
                    sx={{ display: "flex", alignItems: "center" }}
                    color="foreground"
                    href="#"
                    onClick={() => navigate(`/Home`)}
                  >
                    <MdSettings sx={{ mr: 0.5 }} fontSize="inherit" />
                    Ventas
                  </Link>
                  <Link
                    className="text-foreground"
                    underline="hover"
                    sx={{ display: "flex", alignItems: "center" }}
                    color="foreground"
                    href="#"
                    onClick={() => navigate(`/Sales/Quotes`)}
                  >
                    <MdPeopleAlt sx={{ mr: 0.5 }} fontSize="inherit" />
                    Cotizaciones
                  </Link>
                  <Typography
                    sx={{ display: "flex", alignItems: "center" }}
                    className="text-foreground"
                  >
                    <MdPerson sx={{ mr: 0.5 }} fontSize="inherit" />
                    Nueva cotización
                  </Typography>
                </Breadcrumbs>
              </div>
              <form onChange={handleChange} onSubmit={handleSubmit}>
                <Spacer y={6} />
                <div className="bg-card rounded shadow-2xl px-4 md:p-8 mb-6">
                  <div className="grid gap-4 gap-y-2 text-xs grid-cols-1 lg:grid-cols-4">
                    <div className="lg:col-span-2">
                      <div className="grid gap-2 gap-y-2 text-sm grid-cols-1 md:grid-cols-12 space-x-4 space-y-4 content-end">
                        <div className="md:col-span-12">
                          <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-12 space-x-4 space-y-4 content-end">
                            <Spacer y={6} />
                            <div className="md:col-span-6"></div>
                            <div className="md:col-span-12">
                              <Input
                                id="cliente"
                                value={searchNombreCliente}
                                onValueChange={setSearchNombreCliente}
                                size="sm"
                                isRequired
                                type="text"
                                label="Nombre del Cliente"
                                name="cliente"
                                labelPlacement="outside"
                                placeholder=" "
                                autoComplete="off"
                                variant="faded"
                                error={validationErrors.cliente !== ""}
                                errorMessage={validationErrors.cliente}
                                endContent={
                                  <MdSearch className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
                                }
                              />
                              <div
                                style={{
                                  position: "absolute",
                                  zIndex: "100",
                                }}
                              >
                                {isResultSearchCliente ? (
                                  <div>
                                    {filterCliente
                                      .slice(0, 5)
                                      .map((vendedor, index) => (
                                        <Card isHoverable={true}>
                                          <CardBody
                                            key={vendedor.id}
                                            onClick={() =>
                                              handleClienteClick(vendedor)
                                            }
                                            className="grid grid-cols-2 mt-1"
                                          >
                                            <p>{vendedor.nombreComercial}</p>
                                          </CardBody>
                                        </Card>
                                      ))}
                                  </div>
                                ) : (
                                  <p></p>
                                )}
                              </div>
                            </div>
                            <div className="md:col-span-8">
                              <Input
                                size={"sm"}
                                type="text"
                                label="ID Vendedor"
                                isRequired
                                isDisabled
                                name="vendedor"
                                value={idVendedor}
                                onChange={handleChange}
                                labelPlacement="outside"
                                placeholder=" "
                                variant="faded"
                                error={validationErrors.vendedor !== ""}
                                errorMessage={validationErrors.vendedor}
                                endContent={<MdPerson />}
                              />
                            </div>

                            <div className="md:col-span-4">
                              <Input
                                id="fecha"
                                isRequired
                                value={fechaCotizacion}
                                size={"sm"}
                                isDisabled
                                type="date"
                                label="Fecha de la Cotización"
                                name="fecha"
                                labelPlacement="outside"
                                placeholder=" "
                                variant="faded"
                                color={
                                  validationState === "invalid"
                                    ? "danger"
                                    : "default"
                                }
                                errorMessage={
                                  validationState === "invalid" &&
                                  "Ingresa un correo valido"
                                }
                                validationState={validationState}
                              />
                            </div>
                            <div className="md:col-span-6">
                              <Checkbox
                                isRequired
                                isChecked={isRecurrente}
                                onChange={setIsRecurrente}
                              >
                                Es recurrente
                              </Checkbox>
                            </div>
                          </div>
                        </div>
                        <Spacer y={10} />
                      </div>
                    </div>
                    <div className="lg:col-span-2">
                      <div className="grid gap-2 gap-y-2 text-sm grid-cols-1 md:grid-cols-12 space-x-4 space-y-4 content-end">
                        <div className="md:col-span-12">
                          <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-12 space-x-4 space-y-4 content-end">
                            <Spacer y={6} />
                            <div className="md:col-span-12">
                              <Select
                                isRequired
                                labelPlacement={"outside"}
                                label="Información del Cliente"
                                placeholder="General"
                                size="sm"
                              >
                                {direccionesCliente.map((direcciones) => (
                                  <SelectItem
                                    key={direcciones.id}
                                    value={direcciones.nombreDireccion}
                                    onClick={() => {
                                      direcciones.nombreDireccion
                                        ? (setShowInfoGeneral(false),
                                          setShowInfoDireccion(true),
                                          setShowInfoFacturacion(false),
                                          handleClickDireccion(direcciones))
                                        : direcciones.facturacion
                                        ? (setShowInfoGeneral(false),
                                          setShowInfoDireccion(false),
                                          setShowInfoFacturacion(true),
                                          handleClickFacturacion(direcciones))
                                        : (setShowInfoGeneral(true),
                                          setShowInfoDireccion(false),
                                          setShowInfoFacturacion(false),
                                          setClienteInfoGeneral(
                                            clienteInfoGeneral
                                          ));
                                    }}
                                  >
                                    {direcciones.nombreDireccion}
                                  </SelectItem>
                                ))}
                              </Select>
                              {showInfoGeneral ? (
                                <div>
                                  <Card>
                                    <CardBody>
                                      <div
                                        style={{
                                          display: "flex",
                                        }}
                                      >
                                        <p className="text-small text-default-500">
                                          Nombre Comercial: &nbsp;
                                        </p>
                                        <p>
                                          {clienteInfoGeneral.nombreComercial}
                                        </p>
                                      </div>

                                      <div
                                        style={{
                                          display: "flex",
                                        }}
                                      >
                                        <p className="text-small text-default-500">
                                          Condiciones de Pago: &nbsp;
                                        </p>
                                        <p>
                                          {clienteInfoGeneral.condicionesPago}
                                        </p>
                                      </div>

                                      <div
                                        style={{
                                          display: "flex",
                                        }}
                                      >
                                        <p className="text-small text-default-500">
                                          Contacto: &nbsp;
                                        </p>
                                        <p>{clienteInfoGeneral.contacto}</p>
                                      </div>

                                      <div
                                        style={{
                                          display: "flex",
                                        }}
                                      >
                                        <p className="text-small text-default-500">
                                          Credito Disponible: &nbsp;
                                        </p>
                                        <p>
                                          {clienteInfoGeneral.creditoDisponible}
                                        </p>
                                      </div>

                                      <div
                                        style={{
                                          display: "flex",
                                        }}
                                      >
                                        <p className="text-small text-default-500">
                                          Cuenta: &nbsp;
                                        </p>
                                        <p>{clienteInfoGeneral.cuenta}</p>
                                      </div>

                                      <div
                                        style={{
                                          display: "flex",
                                        }}
                                      >
                                        <p className="text-small text-default-500">
                                          Dias Credito: &nbsp;
                                        </p>
                                        <p>{clienteInfoGeneral.diasCredito}</p>
                                      </div>

                                      <div
                                        style={{
                                          display: "flex",
                                        }}
                                      >
                                        <p className="text-small text-default-500">
                                          Direccion: &nbsp;
                                        </p>
                                        <p>{clienteInfoGeneral.direccion}</p>
                                      </div>

                                      <div
                                        style={{
                                          display: "flex",
                                        }}
                                      >
                                        <p className="text-small text-default-500">
                                          Correo Electronico: &nbsp;
                                        </p>
                                        <p>{clienteInfoGeneral.email}</p>
                                      </div>

                                      <div
                                        style={{
                                          display: "flex",
                                        }}
                                      >
                                        <p className="text-small text-default-500">
                                          Giro: &nbsp;
                                        </p>
                                        <p>{clienteInfoGeneral.giro}</p>
                                      </div>

                                      <div
                                        style={{
                                          display: "flex",
                                        }}
                                      >
                                        <p className="text-small text-default-500">
                                          Limite Credito: &nbsp;
                                        </p>
                                        <p>
                                          {clienteInfoGeneral.limiteCredito}
                                        </p>
                                      </div>

                                      <div
                                        style={{
                                          display: "flex",
                                        }}
                                      >
                                        <p className="text-small text-default-500">
                                          Lista Precios: &nbsp;
                                        </p>
                                        <p>{clienteInfoGeneral.listaPrecios}</p>
                                      </div>

                                      <div
                                        style={{
                                          display: "flex",
                                        }}
                                      >
                                        <p className="text-small text-default-500">
                                          Saldo Pentiente: &nbsp;
                                        </p>
                                        <p>
                                          {clienteInfoGeneral.saldoPentiente}
                                        </p>
                                      </div>

                                      <div
                                        style={{
                                          display: "flex",
                                        }}
                                      >
                                        <p className="text-small text-default-500">
                                          Telefono: &nbsp;
                                        </p>
                                        <p>{clienteInfoGeneral.telefono}</p>
                                      </div>

                                      <div
                                        style={{
                                          display: "flex",
                                        }}
                                      >
                                        <p className="text-small text-default-500">
                                          WhatsApp: &nbsp;
                                        </p>
                                        <p>{clienteInfoGeneral.whatsApp}</p>
                                      </div>
                                    </CardBody>
                                  </Card>
                                </div>
                              ) : showInfoDireccion ? (
                                <div>
                                  <Card>
                                    <CardBody>
                                      <div
                                        style={{
                                          display: "flex",
                                        }}
                                      >
                                        <p className="text-small text-default-500">
                                          Nombre de la Direccion: &nbsp;
                                        </p>
                                        <p>
                                          {clienteInfoDireccion.nombreDireccion}
                                        </p>
                                      </div>

                                      <div
                                        style={{
                                          display: "flex",
                                        }}
                                      >
                                        <p className="text-small text-default-500">
                                          Calle: &nbsp;
                                        </p>
                                        <p>{clienteInfoDireccion.calle}</p>
                                      </div>

                                      <div
                                        style={{
                                          display: "flex",
                                        }}
                                      >
                                        <p className="text-small text-default-500">
                                          Colonia: &nbsp;
                                        </p>
                                        <p>{clienteInfoDireccion.colonia}</p>
                                      </div>

                                      <div
                                        style={{
                                          display: "flex",
                                        }}
                                      >
                                        <p className="text-small text-default-500">
                                          Ciudad: &nbsp;
                                        </p>
                                        <p>{clienteInfoDireccion.ciudad}</p>
                                      </div>

                                      <div
                                        style={{
                                          display: "flex",
                                        }}
                                      >
                                        <p className="text-small text-default-500">
                                          Estado: &nbsp;
                                        </p>
                                        <p>{clienteInfoDireccion.estado}</p>
                                      </div>

                                      <div
                                        style={{
                                          display: "flex",
                                        }}
                                      >
                                        <p className="text-small text-default-500">
                                          Codigo Postal: &nbsp;
                                        </p>
                                        <p>
                                          {clienteInfoDireccion.codigoPostal}
                                        </p>
                                      </div>

                                      <div
                                        style={{
                                          display: "flex",
                                        }}
                                      >
                                        <p className="text-small text-default-500">
                                          Entre Calles: &nbsp;
                                        </p>
                                        <p>
                                          {clienteInfoDireccion.entreCalles}
                                        </p>
                                      </div>

                                      <div
                                        style={{
                                          display: "flex",
                                        }}
                                      >
                                        <p className="text-small text-default-500">
                                          Numero Interior: &nbsp;
                                        </p>
                                        <p>
                                          {clienteInfoDireccion.numeroInterior}
                                        </p>
                                      </div>

                                      <div
                                        style={{
                                          display: "flex",
                                        }}
                                      >
                                        <p className="text-small text-default-500">
                                          Numero Exterior: &nbsp;
                                        </p>
                                        <p>
                                          {clienteInfoDireccion.numeroExterior}
                                        </p>
                                      </div>

                                      <div
                                        style={{
                                          display: "flex",
                                        }}
                                      >
                                        <p className="text-small text-default-500">
                                          Referencias: &nbsp;
                                        </p>
                                        <p>
                                          {clienteInfoDireccion.referencias}
                                        </p>
                                      </div>

                                      <div
                                        style={{
                                          display: "flex",
                                        }}
                                      >
                                        <p className="text-small text-default-500">
                                          Referencias: &nbsp;
                                        </p>
                                        <p>
                                          {clienteInfoDireccion.apellidoRecibe}
                                        </p>
                                      </div>
                                    </CardBody>
                                  </Card>
                                </div>
                              ) : showInfoFacturacion ? (
                                <></>
                              ) : (
                                <></>
                              )}
                            </div>
                            <div className="md:col-span-6">
                              <Select
                                labelPlacement={"outside"}
                                label="Envío"
                                placeholder="Seleccione"
                                size="sm"
                                isRequired
                                value={dataQuote.origen}
                                onChange={(e) => setEnvio(e.target.value)}
                              >
                                {envios.map((envios) => (
                                  <SelectItem key={envios} value={envios}>
                                    {envios}
                                  </SelectItem>
                                ))}
                              </Select>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="lg:col-span-2">
                      <div className="grid gap-2 gap-y-2 text-sm grid-cols-1 md:grid-cols-12 space-x-4 space-y-4 content-end">
                        <div className="md:col-span-12">
                          <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-12 space-x-4 space-y-4 content-end">
                            <Spacer y={2} />
                            <div className="md:col-span-6"></div>
                            <div className="md:col-span-12">
                              <Tabs
                                key={"key"}
                                variant="underlined"
                                aria-label="Tabs variants"
                              >
                                <Tab key="photos" title="Productos Cotizados">
                                  <Table
                                    id="tablaEnPaginaPrincipal"
                                    removeWrapper
                                    aria-label="Example static collection table"
                                  >
                                    <TableHeader>
                                      <TableColumn>Código</TableColumn>
                                      <TableColumn>Nombre</TableColumn>
                                      <TableColumn>Marca</TableColumn>
                                      <TableColumn>Cantidad</TableColumn>
                                      <TableColumn>Inv.</TableColumn>
                                      <TableColumn>Precio Uni.</TableColumn>
                                      <TableColumn>Descuento</TableColumn>
                                      <TableColumn>Total</TableColumn>
                                    </TableHeader>
                                    <TableBody>
                                      {filasAgregadas.map((fila, index) => (
                                        <TableRow key={index}>
                                          <TableCell>{fila.codigo}</TableCell>
                                          <TableCell>{fila.nombre}</TableCell>
                                          <TableCell>{fila.marca}</TableCell>
                                          <TableCell>
                                            <Input
                                              size={"sm"}
                                              className="w-20"
                                              type="number"
                                              name="cantidad"
                                              placeholder=""
                                              variant="faded"
                                              error={
                                                validationErrors.cantidad !== ""
                                              }
                                              errorMessage={
                                                validationErrors.cantidad
                                              }
                                              value={fila.cantidad}
                                              onChange={(event) =>
                                                handleProductosCotizados(
                                                  event,
                                                  index
                                                )
                                              }
                                            />
                                          </TableCell>
                                          <TableCell>
                                            {fila.inventario}
                                          </TableCell>
                                          <TableCell>
                                            ${fila.precioUnitario}
                                          </TableCell>
                                          <TableCell>
                                            {fila.descuento}%
                                          </TableCell>
                                          <TableCell>{fila.total}</TableCell>
                                        </TableRow>
                                      ))}
                                    </TableBody>
                                  </Table>
                                </Tab>
                              </Tabs>
                            </div>
                            <div className="md:col-span-12 space-x-4">
                              <Button
                                startContent={<MdUpload />}
                                variant="flat"
                                color="primary"
                                onPress={() => handleOpenAddProduct()}
                                className="capitalize"
                              >
                                Agregar productos
                              </Button>
                              <Button
                                variant="flat"
                                color="success"
                                onPress={() => handleOpenAddDiscount()}
                                className="capitalize"
                                startContent={<MdDiscount />}
                              >
                                Aplicar descuento
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid gap-4 gap-y-2 text-xs grid-cols-1 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                      <div className="grid gap-2 gap-y-2 text-sm grid-cols-1 md:grid-cols-12 space-x-4 space-y-4 content-end">
                        <div className="md:col-span-12">
                          <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-12 space-x-4 space-y-4 content-end">
                            <Spacer y={6} />
                            <div className="md:col-span-6"></div>
                            <div className="md:col-span-12">
                              <Textarea
                                minRows={8}
                                label="Comentarios de la Cotización"
                                labelPlacement="outside"
                                value={dataQuote.comentarios}
                                onChange={(e) =>
                                  setDataQuote({
                                    ...dataQuote,
                                    comentarios: e.target.value,
                                  })
                                }
                                placeholder=" "
                                defaultValue=" "
                              />
                            </div>
                          </div>
                        </div>
                        <Spacer y={10} />
                      </div>
                    </div>
                    <div className="lg:col-span-2">
                      <div className="grid gap-2 gap-y-2 text-sm grid-cols-1 md:grid-cols-12 space-x-4 space-y-4 content-end">
                        <div className="md:col-span-12">
                          <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-12 space-x-4 space-y-4 content-end">
                            <Spacer y={2} />
                            <div className="md:col-span-6"></div>
                            <div className="md:col-span-12">
                              <div style={{ marginLeft: "30px" }}>
                                <Table
                                  id="tablaCalculos"
                                  selectionMode="single"
                                  hideHeader
                                  aria-label="Example static collection table"
                                >
                                  <TableHeader>
                                    <TableColumn>NAME</TableColumn>
                                    <TableColumn>ROLE</TableColumn>
                                  </TableHeader>
                                  <TableBody>
                                    <TableRow key="1">
                                      <TableCell>Neto</TableCell>
                                      <TableCell id="netoTotal">
                                        $0.00
                                      </TableCell>
                                    </TableRow>
                                    <TableRow key="2">
                                      <TableCell>Descuento</TableCell>
                                      <TableCell id="descuentoTotal">
                                        $0.00
                                      </TableCell>
                                    </TableRow>
                                    <TableRow key="3">
                                      <TableCell>Sub Total</TableCell>
                                      <TableCell id="subtotalTotal">
                                        $0.00
                                      </TableCell>
                                    </TableRow>
                                    <TableRow key="4">
                                      <TableCell>Impuestos</TableCell>
                                      <TableCell id="impuestosTotal">
                                        $0.00
                                      </TableCell>
                                    </TableRow>
                                    <TableRow key="5">
                                      <TableCell>Total</TableCell>
                                      <TableCell id="total">$0.00</TableCell>
                                    </TableRow>
                                  </TableBody>
                                </Table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="md:col-span-12 text-right">
                      <div className="space-x-5 space-y-5">
                        <Button
                          className="min-w-[200px]"
                          color="primary"
                          type="submit"
                          endContent={<MdSave />}
                        >
                          Guardar cotización
                        </Button>
                      </div>
                      <Spacer y={3} />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Modal
        backdrop="blur"
        isOpen={isOpen}
        onClose={onClose}
        size="5xl"
        isDismissable={false}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Agregar producto a la cotización
              </ModalHeader>
              <ModalBody>
                <div className="grid gap-4 gap-y-2 text-xs grid-cols-1 lg:grid-cols-3">
                  <div className="lg:col-span-4">
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-12 space-x-4 space-y-4 content-end">
                      <div className="md:col-span-12">
                        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-12 space-x-4 space-y-4 content-end">
                          <div className="md:col-span-12"></div>
                          <div className="md:col-span-6">
                            <Input
                              id="nombre"
                              value={user.nombre}
                              onValueChange={handleChange}
                              size="sm"
                              type="text"
                              label="Cliente"
                              name="nombre"
                              labelPlacement="outside"
                              placeholder=" "
                              variant="faded"
                              error={validationErrors.nombre !== ""}
                              errorMessage={validationErrors.nombre}
                              endContent={
                                <MdSearch className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
                              }
                            />
                          </div>
                          <div className="md:col-span-3">
                            <Select
                              labelPlacement={"outside"}
                              label="Marca"
                              placeholder="Seleccione"
                              size="sm"
                            >
                              {marca.map((marca) => (
                                <SelectItem key={marca.id} value={marca.id}>
                                  {marca.marca}
                                </SelectItem>
                              ))}
                            </Select>
                          </div>
                          <div className="md:col-span-3">
                            <Select
                              labelPlacement={"outside"}
                              label="Categoría"
                              placeholder="Seleccione"
                              size="sm"
                            >
                              {categorias.map((categoria) => (
                                <SelectItem
                                  key={categoria.id}
                                  value={categoria.id}
                                >
                                  {categoria.nombre}
                                </SelectItem>
                              ))}
                            </Select>
                          </div>
                          <div className="md:col-span-12">
                            <Table
                              id="tablaEnModal"
                              removeWrapper
                              aria-label="Example static collection table"
                            >
                              <TableHeader>
                                <TableColumn>Código</TableColumn>
                                <TableColumn>Nombre</TableColumn>
                                <TableColumn>Marca</TableColumn>
                                <TableColumn>Cantidad</TableColumn>
                                <TableColumn>Inv.</TableColumn>
                                <TableColumn>Precio Uni.</TableColumn>
                                <TableColumn>Descuento</TableColumn>
                                <TableColumn>Total</TableColumn>
                                <TableColumn>Acciones</TableColumn>
                              </TableHeader>
                              <TableBody>
                                {datos.map((data, index) => (
                                  <TableRow key={data.id}>
                                    <TableCell>{data.codigoEmpresa}</TableCell>
                                    <TableCell>{data.nombre}</TableCell>
                                    <TableCell>{data.marca}</TableCell>
                                    <TableCell>
                                      <Input
                                        size="sm"
                                        type="number"
                                        value={cantidadesUsuario[index] || ""} // Usar la cantidad del estado correspondiente
                                        onChange={(e) =>
                                          handleCantidadChange(e, index)
                                        }
                                        placeholder=""
                                      />
                                    </TableCell>
                                    <TableCell>{data.existencia}</TableCell>
                                    <TableCell>{data.precio}</TableCell>
                                    <TableCell>{data.descuento}</TableCell>
                                    <TableCell>{data.total}</TableCell>
                                    <TableCell>
                                      <Button
                                        size="sm"
                                        onClick={() => agregarFila(data, index)}
                                      >
                                        +
                                      </Button>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" onPress={onClose}>
                  Cerrar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal
        backdrop="blur"
        isOpen={isOpenDiscount}
        onClose={onCloseDiscount}
        isDismissable={false}
      >
        <ModalContent>
          {(onCloseDiscount) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Aplicar descuento
              </ModalHeader>
              <ModalBody>
                <div className="grid gap-4 gap-y-2 text-xs grid-cols-1 lg:grid-cols-3">
                  <div className="lg:col-span-4">
                    <div className="grid gap-2 gap-y-2 text-sm grid-cols-1 md:grid-cols-12 space-x-4 space-y-4 content-center">
                      <div className="md:col-span-12">
                        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-12 space-x-4 space-y-4 content-center">
                          <div className="md:col-span-6"></div>
                          <div className="md:col-span-12">
                            <h2>Descuento expresado en porcentaje</h2>
                          </div>
                          <div className="md:col-span-12">
                            <Input
                              type="number"
                              name="descuento"
                              placeholder="00.00"
                              color="success"
                              value={dataQuote.descuento}
                              onChange={handleChange}
                              endContent={<MdPercent />}
                              label="Porcentaje"
                            />
                          </div>
                        </div>
                      </div>
                      <Spacer y={10} />
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" onPress={onCloseDiscount}>
                  Cerrar
                </Button>
                <Button color="success" onPress={onCloseDiscount}>
                  Aplicar descuento
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default Quote;
