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
import { useNavigate, useParams } from "react-router-dom";
import ItemsHeader from "../../components/header/ItemsHeader/ItemsHeader.jsx";

import { MdSave } from "react-icons/md";
import http from "../../components/axios/Axios";
const Quote = () => {
  const [selectedImage, setSelectedImage] = useState("");
  const params = useParams();
  
  const [validationErrors, setValidationErrors] = useState({
    pedido: "",
    cliente: "",
    vendedor: "",
    recurrenciaa: "",
    origen: "",
    monto: "",
    nombre: "",
    apellido: "",
    email: "",
    emailConfirm: "",
    password: "",
    confirmPassword: "",
    direccion: "",
    colonia: "",
    ciudad: "",
    estado: "",
    codigoPostal: "",
    telefonoContacto: "",
    telefonoCelular: "",
    perfilSeguridad: "",
    // vendedor: "",
  });


  const [dataQuote, setDataQuote] = useState({
    idCliente: "",
    idVendedor: "",
    fecha: format(new Date(), "yyyy-MM-dd"),
    recurrencia: "",
    envio: "",
    comentarios: "",
    neto: "",
    descuento: "",
    subtotal: "",
    impuestos: "",
    total: "",
  });

  const datosCliente = () => {
    async function loadDatosCliente() {
      try {
        const response = await fetch(`http://localhost:4000/Clientes`);
        const data = await response.json();
        if (response.ok) {
          setProductos(data)

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
    setUser({ ...user, [name]: value });
    setValidationErrors({ ...validationErrors, [name]: "" });
  };
  

  const [isChecked, setIsChecked] = useState(false);
  function handleCheckboxChange() {
    setIsChecked(!isChecked); // Cambiar el estado al hacer clic del checkbox
    console.log(isChecked);
  }



  async function handleSubmit(e) {
    e.preventDefault();
    
    if (
      !dataQuote.idCliente ||
      !dataQuote.idVendedor ||
      !dataQuote.recurrencia ||
      !dataQuote.envio ||
      !dataQuote.comentarios ||
      emailConfirmValidationState !== "valid"
    ) {
      toast.error("Llena todos los campos correctamente", {
        theme: "colored",
      });
    }

    const errors = {};
    !dataQuote.idCliente ? (errors.idCliente = "Llena este campo") : "";
    !dataQuote.idVendedor ? (errors.idVendedor = "Llena este campo") : "";
    !dataQuote.recurrencia ? (errors.recurrencia = "Llena este campo") : "";
    !dataQuote.recurrenciaa ? (errors.recurrenciaa = "Llena este campo") : "";
    !dataQuote.envio ? (errors.envio = "Llena este campo") : "";
    !dataQuote.comentarios ? (errors.comentarios = "Llena este campo") : "";
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    setValidationErrors({});

    const formData = new FormData();
    const document = JSON.stringify({
      idCliente: dataQuote.idCliente,
      idVendedor: dataQuote.idVendedor,
      fecha: dataQuote.fecha,
      recurrencia: isChecked ? 1 : 0,
      envio: dataQuote.envio,
      comentarios: dataQuote.comentarios,
      neto: dataQuote.neto,
      descuento: dataQuote.descuento,
      subtotal: dataQuote.subtotal,
      impuestos: dataQuote.impuestos,
      total: dataQuote.total,
    });
    console.log(document.recurrenciaa);

    formData.append("document", document);
    formData.append("image", selectedImage);
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
      };
      navigate("/Sales/Quotes");
    } catch (error) {
      toast.error("Error al guardar Cotización", {
        position: "bottom-right",
        theme: "colored",
      });
    }
  }

  
  

   
  const navigate = useNavigate();
  const [selected, setSelected] = useState("photos");
  const envios = ["No Aplica", "Recoger en Oficina", "Envío a domicilio"];

  

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenDiscount,
    onOpen: onOpenDiscount,
    onClose: onCloseDiscount,
  } = useDisclosure();


  const [productos, setProductos] = useState([]);

  const handleOpenAddProduct = () => {
    onOpen();
    async function loadProducts() {
      try {
        const response = await fetch(`http://localhost:4000/Productos`);
        const data = await response.json();
        if (response.ok) {
          setProductos(data)

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
  const loadTask = async (folio) => {
    console.log(folio);
    try {
      const response = await fetch(`http://localhost:4000/Cotizaciones/${folio}`);
      const data = await response.json();
      setDataQuote({
        folio: data.folio,
      });
      console.log(data.folio);
    } catch {
      toast.error("Error al cargar los datos", {
        position: "bottom-right",
        theme: "colored",
      });
    }
  }
  useEffect(() => {
    if (params.folio){
      loadTask(params.folio)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.folio]);

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
  }
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

    // Verifica si la cantidad es un número válido
    if (!isNaN(cantidad)) {
      const datosAdaptados = adaptarDatos(data, cantidad);

      // Agrega la fila adaptada a la lista de filas agregadas en el estado
      setFilasAgregadas([...filasAgregadas, datosAdaptados]);
    } else {
      toast.warning('Por favor, ingrese una cantidad válida.');
    }
  };

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
      const impuestos = subtotal * 0.10; // Cambia el valor del impuesto según tu necesidad

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
    const tablaResumen = document.getElementById('tablaCalculos');
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
  }, [filasAgregadas]);

  const handleCantidadChange = (event, index) => {
    const nuevasCantidades = [...cantidadesUsuario];
    nuevasCantidades[index] = event.target.value;
    setCantidadesUsuario(nuevasCantidades);
  };

  const [filtro, setFiltro] = useState(''); // Estado para almacenar el valor del filtro

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
                                value={dataQuote.cliente}
                                onValueChange={handleChange}
                                onChange={handleFiltroChange}
                                size="sm"
                                isRequired
                                label="Nombre del Cliente"
                                name="cliente"
                                labelPlacement="outside"
                                placeholder=" "
                                variant="faded"
                                error={validationErrors.cliente !== ""}
                                errorMessage={validationErrors.cliente}
                                endContent={
                                  <MdSearch className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
                                }
                              />
                            </div>
                            <div className="md:col-span-8">
                              <Input
                                size={"sm"}
                                type="text"
                                label="vendedor"
                                id="apellido"
                                isRequired
                                isDisabled
                                name="vendedor"
                                value={dataQuote.vendedor}
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
                                value={dataQuote.fecha}
                                onChange={handleChange}
                                size={"sm"}
                                isDisabled
                                type="date"
                                label="Fecha de la Cotización"
                                name="fecha"
                                labelPlacement="outside"
                                placeholder=" "
                                variant="faded"
                              />
                            </div>
                            <div className="md:col-span-6">
                              <Checkbox
                                isRequired
                                isChecked={isChecked}
                                onChange={handleCheckboxChange}
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
                            <Spacer y={2} />
                            <div className="md:col-span-6"></div>
                            <div className="md:col-span-12">
                              <Select
                                isRequired
                                labelPlacement={"outside"}
                                label="Información del Cliente"
                                placeholder="Seleccione"
                                size="sm"
                              >
                                {/* {animals.map((animal) => (
                                  <SelectItem
                                    key={animal.value}
                                    value={animal.value}
                                  >
                                    {animal.label}
                                  </SelectItem>
                                ))} */}
                              </Select>
                            </div>
                            <div className="md:col-span-12">
                              <Textarea
                                isDisabled
                                label=" "
                                labelPlacement="inside"
                                placeholder=" "
                                defaultValue=" "
                              />
                            </div>
                            <div className="md:col-span-6">
                              <Select
                                labelPlacement={"outside"}
                                label="Envío"
                                placeholder="Seleccione"
                                size="sm"
                                isRequired
                                value={dataQuote.origen}
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
                                      <TableColumn >Total</TableColumn>
                                    </TableHeader>
                                    <TableBody>
                                      {filasAgregadas.map((fila, index) => (
                                        <TableRow key={index}>
                                          <TableCell>{fila.codigo}</TableCell>
                                          <TableCell>{fila.nombre}</TableCell>
                                          <TableCell>{fila.marca}</TableCell>
                                          <TableCell>{fila.cantidad}</TableCell>
                                          <TableCell>
                                            {fila.inventario}
                                          </TableCell>
                                          <TableCell>
                                            {fila.precioUnitario}
                                          </TableCell>
                                          <TableCell>
                                            {fila.descuento}
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
                                      <TableCell id="netoTotal">$0.00</TableCell>
                                    </TableRow>
                                    <TableRow key="2">
                                      <TableCell>Descuento</TableCell>
                                      <TableCell id="descuentoTotal">$0.00</TableCell>
                                    </TableRow>
                                    <TableRow key="3">
                                      <TableCell>Sub Total</TableCell>
                                      <TableCell id="subtotalTotal">$0.00</TableCell>
                                    </TableRow>
                                    <TableRow key="4">
                                      <TableCell>Impuestos</TableCell>
                                      <TableCell id="impuestosTotal">$0.00</TableCell>
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
                              placeholder="00.00"
                              color="success"
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
