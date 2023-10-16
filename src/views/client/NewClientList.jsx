import {
  Button,
  Image,
  Input,
  Link,
  Spacer,
  Tab,
  Tabs,
  Select,
  MenuItem,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  Textarea,
  TableCell,
} from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { TbDotsVertical } from "react-icons/tb";
import { useEffect, useMemo, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Breadcrumbs, Typography } from "@mui/material";
import {
  RiArrowLeftLine,
  RiArrowRightLine,
  RiDashboard2Fill,
} from "react-icons/ri";
import {
  MdAddHomeWork,
  MdCamera,
  MdLocationCity,
  MdNumbers,
  MdOutlineLocationCity,
  MdOutlineNumbers,
  MdPeople,
  MdPeopleAlt,
  MdPerson,
  MdPostAdd,
  MdStreetview,
  MdPhone,
  MdWhatsapp,
  MdEmail,
} from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import ItemsHeader from "../../components/header/itemsHeader/ItemsHeader.jsx";
import { MdSave } from "react-icons/md";
import http from "../../components/axios/Axios";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import Facturation from "./Facturation";
import { TbPlus } from "react-icons/tb";
const NewClient = () => {
  const [status, useStatus] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const imageDefault = selectedImage === "";
  const params = useParams();
  const [idVendedor, setIdVendedor] = useState("");
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const [user, setUser] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    imagen: "",
    emailConfirm: "",
    passwordConfirm: "",
  });
  const [validationErrors, setValidationErrors] = useState({
    imagen: "",
    nombre: "",
    nombreComercial: "",
    razonSocial: "",
    contacto: "",
    rfc: "",
    numerodecliente: "",
    telefono: "",
    giro: "",
    vendedor: "",
    email: "",
    emailConfirm: "",
    direccion: "",
    formaPago: "",
    metodoPago: "",
    cfdi: "",
    condicionesPago: "",
    diasCredito: "",
    limiteCredito: "",
    saldoPendiente: "",
    creditoDisponible: "",
    nombreContacto: "",
    apellidoContacto: "",
    emailContacto: "",
    emailContactoConfirm: "",
    contacto2: "",
    comentario: "",
    direccionContacto: "",
    colonia: "",
    ciudad: "",
    estado: "",
    codigoPostal: "",
    password: "",
    passwordValidation: "",
    status: "",
    validacion: "",
    fecha: "",
    tipo: "",
    detalle: "",
    cargo: "",
    abono: "",
    tc: "",
    saldo: "",
  });

  const [clientData, setClientData] = useState({
    imagen: "",
    nombreComercial: "",
    giro: "",
    telefono: "",
    whatsApp: "",
    correo: "",
    contactoPrincipal: "",
    condicionesPago: "",
    cuenta: "",
    vendedorAsignado: "",
    listaPrecios: "",
    diasCredito: "",
    limiteCredito: "",
    saldoPendiente: "",
    creditoDisponible: "",
  });

  async function loadTask(id) {
    try {
      const response = await fetch(
        `https://localhost:443/ListadoClientes/${id}`
      );
      const data = await response.json();
      setClientData({
        id: data.id,
        nombreComercial: data.nombreComercial,
        giro: data.giro,
        telefono: data.telefono,
        whatsApp: data.whatsApp,
        correo: data.email,
        contactoPrincipal: data.contacto,
        condicionesPago: data.condicionesPago,
        cuenta: data.cuenta,
        vendedorAsignado: data.vendedor,
        listaPrecios: data.listaPrecios,
        diasCredito: data.diasCredito,
        limiteCredito: data.limiteCredito,
        saldoPendiente: data.saldoPentiente,
        creditoDisponible: data.creditoDisponible,
      });
      setIdVendedor(id);
      const url = window.location.pathname;
      let arr = url.split("/");

      if (arr[3] === "ViewClient") {
        setIsInputDisabled(false);
      }
      if (arr[3] === "ViewClient") {
        setIsInputDisabled(true);
        document.getElementById('btnGuardar').style.display = 'none';
        document.getElementById("BTN3").style.display = "none";
        document.getElementById("ButtonImage").style.display = "none";
      }
    } catch {
      toast.error("Error al cargar los datos", {
        position: "bottom-right",
        theme: "colored",
      });
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClientData({ ...clientData, [name]: value });
    setValidationErrors({ ...validationErrors, [name]: "" });
  };
  const fileInputRef = useRef(null);
  const handleFileButtonClick = () => {
    fileInputRef.current.click();
  };
  async function handleSubmit(e) {
    e.preventDefault();
    setValidationErrors({});

    const formData = new FormData();
    const document = JSON.stringify({
      nombreComercial: clientData.nombreComercial,
      giro: clientData.giro,
      telefono: clientData.telefono,
      whatsApp: clientData.whatsApp,
      correo: clientData.correo,
      contactoPrincipal: clientData.contactoPrincipal,
      condicionesPago: clientData.condicionesPago,
      cuenta: clientData.cuenta,
      vendedorAsignado: clientData.vendedorAsignado,
      listaPrecios: clientData.listaPrecios,
      diasCredito: clientData.diasCredito,
      limiteCredito: clientData.limiteCredito,
      saldoPendiente: clientData.saldoPendiente,
      creditoDisponible: clientData.creditoDisponible,
    });

    formData.append("document", document);
    formData.append("image", selectedImage);
    try {
      const result = await http.post(
        `https://localhost:443/ListadoClientes`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (result.status == 200) {
        toast.success("Cliente creado correctamente", { theme: "colored" });
      };
      navigate("/Customers");

    } catch (error) {
      toast.error("Error al guardar Cliente", {
        position: "bottom-right",
        theme: "colored",
      });
    }
  }

  async function handleEditing(e) {
    e.preventDefault();

    const formData = new FormData();
    const document = JSON.stringify({
      nombreComercial: clientData.nombreComercial,
      giro: clientData.giro,
      telefono: clientData.telefono,
      whatsApp: clientData.whatsApp,
      correo: clientData.correo,
      contactoPrincipal: clientData.contactoPrincipal,
      condicionesPago: clientData.condicionesPago,
      cuenta: clientData.cuenta,
      vendedorAsignado: clientData.vendedorAsignado,
      listaPrecios: clientData.listaPrecios,
      diasCredito: clientData.diasCredito,
      limiteCredito: clientData.limiteCredito,
      saldoPendiente: clientData.saldoPendiente,
      creditoDisponible: clientData.creditoDisponible,
    });

    formData.append("document", document);
    formData.append("image", selectedImage);
    try {
      const result = await http.put(
        `http://localhost:4000/ListadoClientesEditing/${params.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (result.status == 200) {
        toast.success("Cliente Editado Correctamente", { theme: "colored" });
      };
      navigate("/Customers");

    } catch (error) {
      toast.error("Error al Editar Cliente", {
        position: "bottom-right",
        theme: "colored",
      });
      console.log(error);
    }
  }

  async function handleFormSubmit(e){
    e.preventDefault();

    if(params.id){
      console.log(params.id);
      console.log("quiero Editar");
      await handleEditing(e);
    } else {
      console.log("quiero crear uno nuevo");
      await handleSubmit(e);
    }
  }


  const navigate = useNavigate();
  const [selected, setSelected] = useState("photos");
  const estadosDeMexico = [
    "Aguascalientes",
    "Baja California",
    "Baja California Sur",
    "Campeche",
    "Chiapas",
    "Chihuahua",
    "Coahuila",
    "Colima",
    "Ciudad de México",
    "Durango",
    "Guanajuato",
    "Guerrero",
    "Hidalgo",
    "Jalisco",
    "México",
    "Michoacán",
    "Morelos",
    "Nayarit",
    "Nuevo León",
    "Oaxaca",
    "Puebla",
    "Querétaro",
    "Quintana Roo",
    "San Luis Potosí",
    "Sinaloa",
    "Sonora",
    "Tabasco",
    "Tamaulipas",
    "Tlaxcala",
    "Veracruz",
    "Yucatán",
    "Zacatecas",
  ];

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [modalMode, setModalMode] = useState("create");
  const handleCreateClick = (nuevosDatos) => {
    setModalMode("create");
    onOpen();
    setDatosE([...datosE, nuevosDatos]);
  };
  const handleCreateContact = (nuevosDatosContact) => {
    setModalMode("create");
    onOpen();
    setDatosC([...datosC, nuevosDatosContact]);
  };
  const [idCliente, setIdCliente] = useState("");
  const [task2, setTask2] = useState({
    nombre: "",
    direccion: "",
    colonia: "",
    ciudad: "",
    estado: "",
    apellido: "",
    codigoPostal: "",
  });
  const [datosE, setDatosE] = useState([]);
  const [datosC, setDatosC] = useState([]);
  const [task3, setTask3] = useState({
    nombreContacto: "",
    telefonoContacto: "",
    celularContacto: "",
    whatsAppContacto: "",
    emailContacto: "",
    puestoContacto: "",
    ubicacionContacto: "",
    comentariosContacto: "",
  });

  async function loadDireccionesE(id) {
    try {
      const response = await fetch(
        `https://localhost:443/ClientesDireccionEnvio/${id}`
      );
      const data = await response.json();
      setTask2({
        nombre: data.nombre,
        direccion: data.direccion,
        colonia: data.colonia,
        ciudad: data.ciudad,
        estado: data.estado,
        apellido: data.apellido,
        codigoPostal: data.codigoPostal,
      });
      setIdCliente(id);
      const url = window.location.pathname;
      let arr = url.split("/");

      if (arr[3] === "edit") {
        setIsInputDisabled(false);
      }
      if (arr[3] === "view") {
        setIsInputDisabled(true);
        document.getElementById("BTN2guardar").style.display = "none";
      }
    } catch {
      toast.error("Error al cargar los datos", {
        position: "bottom-right",
        theme: "colored",
      });
    }
  }

  useEffect(() => {
    if (params.id) {
      loadDireccionesE(params.id);
    }
  }, [params.id]);

  const handleChange2 = (e) =>
    setTask2({ ...task2, [e.target.name]: e.target.value });
    const handleChange3 = (e) =>
    setTask3({ ...task3, [e.target.name]: e.target.value });
  async function handleSubmitModal(e) {
    e.preventDefault();
    // if (!task2.nombre || !task2.direccion || !task2.colonia || !task2.ciudad || !task2.estado
    //     || !task2.apellido || !task2.codigoPostal) {
    //     // Puedes mostrar un mensaje de error o tomar otra acción apropiada aquí
    //     toast.warning('Por favor, complete todos los campos requeridos.', { theme: "colored" });
    //     return; // Detiene la ejecución de la función si hay campos vacíos
    //   }
    const formData = new FormData();
    const document = JSON.stringify({
      nombre: task2.nombre,
      direccion: task2.direccion,
      colonia: task2.colonia,
      ciudad: task2.ciudad,
      estado: task2.estado,
      apellido: task2.apellido,
      codigoPostal: task2.codigoPostal,
    });
    formData.append("document", document);
    try {
      const result = await http.post(
        `https://localhost:443/ClientesDireccionEnvio`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status == 200 ? true : false) {
        toast.success("Dirección de envío creado correctamente", {
          theme: "colored",
        });
        onClose(true);
        setDatosE([...datosE, result]);
        loadDireccionesE();
      }
    } catch (error) {
      null;
    }
  }

  const passwordValidationState = useMemo(() => {
    if (user.password === "") return undefined;
    return user.password.length >= 8 ? "valid" : "invalid";
  }, [user.password]);
  const confirmPasswordValidationState = useMemo(() => {
    if (user.confirmPassword === "") return undefined;
    if (user.confirmPassword != undefined)
      return user.password === user.confirmPassword ? "valid" : "invalid";
  }, [user.confirmPassword, user.password]);
  const emailConfirmValidationState = useMemo(() => {
    if (user.emailConfirm === "") return undefined;
    return user.emailConfirm === user.email ? "valid" : "invalid";
  }, [user.emailConfirm, user.email]);
  useEffect(() => {
    if (params.id) {
      loadTask(params.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);
  const handleTime = (moment) => {
    // Actualiza el valor de la fecha en tu estado o donde lo estés almacenando
    setUser({ ...user, fecha: moment });
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
                    onClick={() => navigate(`/Customers`)}
                  >
                    <MdPeopleAlt sx={{ mr: 0.5 }} fontSize="inherit" />
                    Clientes
                  </Link>
                  <Typography
                    sx={{ display: "flex", alignItems: "center" }}
                    className="text-foreground"
                  >
                    <MdPerson sx={{ mr: 0.5 }} fontSize="inherit" />
                    Nuevo Cliente
                  </Typography>
                </Breadcrumbs>
              </div>
              <form onChange={handleChange} onSubmit={handleFormSubmit}>
                <Spacer y={6} />
                {/* <div className="bg-white rounded shadow-2xl px-4 md:p-8 mb-6"></div> */}
                <div className="bg-card rounded shadow-2xl px-4 md:p-8 mb-6">
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                    <div>
                      <div className="text-gray-600 place-items-center grid lg:grid-cols-1">
                        <h2 className="font-large text-lg text-foreground">
                          Imagen del cliente
                        </h2>
                        {imageDefault ? (
                          <Image
                            src="../../../public/Blank-Avatar.png"
                            alt=""
                            width={300}
                            height={300}
                          />
                        ) : (
                          <Image
                            src={URL.createObjectURL(
                              new Blob([selectedImage], { type: "image" })
                            )}
                            alt=""
                            width={300}
                            height={300}
                          />
                        )}
                        <Spacer y={6} />
                        <input
                          size={"sm"}
                          type="file"
                          id="imagen"
                          ref={fileInputRef}
                          style={{
                            display: "none",
                            borderColor: selectedImage ? "" : "red",
                          }}
                          value={clientData.imagen}
                          onChange={(event) => {
                            setSelectedImage(event.target.files[0]);
                          }}
                          name="imagen"
                        />
                        <Button
                          id="ButtonImage"
                          autoFocus
                          size="auto"
                          color="success"
                          endContent={<MdCamera />}
                          onClick={handleFileButtonClick}
                        >
                          Agregar foto de perfil
                        </Button>
                      </div>
                      <div>
                        <div>
                          <Spacer y={5} />
                          <div className="md:col-span-5 text-center">
                            <div style={{ paddingLeft: "90px" }}>
                              <Input
                                id="numerodecliente"
                                value={clientData.id}
                                onChange={handleChange}
                                disabled={true}
                                size={"sm"}
                                label="Numero de cliente"
                                name="numerodecliente"
                                labelPlacement="outside"
                                placeholder=" "
                                variant="faded"
                              />
                            </div>
                            <div style={{ paddingInline: "140px" }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="lg:col-span-2">
                      <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-12 space-x-4 space-y-4 content-end">
                        <div className="md:col-span-12">
                          <Tabs
                            key="underlined"
                            variant="underlined"
                            aria-label="Tabs variants"
                            selectedKey={selected}
                            onSelectionChange={setSelected}
                          >
                            <Tab key="photos" title="Generales">
                              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-12 space-x-4 space-y-4 content-end">
                                <Spacer y={6} />
                                <div className="md:col-span-6"></div>
                                <div className="md:col-span-9">
                                  <Input
                                    id="nombreComercial"
                                    disabled={isInputDisabled}
                                    onValueChange={handleChange}
                                    value={clientData.nombreComercial}
                                    size={"sm"}
                                    label="Nombre Comercial"
                                    name="nombreComercial"
                                    labelPlacement="outside"
                                    placeholder=" "
                                    variant="faded"
                                  />
                                </div>
                                <div className="md:col-span-3">
                                  <Input
                                    size={"sm"}
                                    disabled={isInputDisabled}
                                    onChange={handleChange}
                                    value={clientData.giro}
                                    label="Giro"
                                    id="giro"
                                    name="giro"
                                    labelPlacement="outside"
                                    placeholder=" "
                                    variant="faded"
                                  />
                                </div>

                                <div className="md:col-span-4">
                                  <Input
                                    id="telefono"
                                    disabled={isInputDisabled}
                                    onChange={handleChange}
                                    value={clientData.telefono}
                                    size={"sm"}
                                    label="Telefono"
                                    name="telefono"
                                    labelPlacement="outside"
                                    placeholder=" "
                                    variant="faded"
                                  />
                                </div>
                                <div className="md:col-span-4">
                                  <Input
                                    id="whatsApp"
                                    disabled={isInputDisabled}
                                    onChange={handleChange}
                                    value={clientData.whatsApp}
                                    size={"sm"}
                                    label="WhatsApp"
                                    name="whatsApp"
                                    labelPlacement="outside"
                                    placeholder=" "
                                    variant="faded"
                                  />
                                </div>
                                <div className="md:col-span-4">
                                  <Input
                                    id="correo"
                                    disabled={isInputDisabled}
                                    onChange={handleChange}
                                    value={clientData.correo}
                                    size={"sm"}
                                    label="Correo Electronico"
                                    name="correo"
                                    labelPlacement="outside"
                                    placeholder=" "
                                    variant="faded"
                                  />
                                </div>
                                <div className="md:col-span-4">
                                  <Input
                                    id="contactoPrincipal"
                                    disabled={isInputDisabled}
                                    onChange={handleChange}
                                    value={clientData.contactoPrincipal}
                                    size={"sm"}
                                    label="Contacto Principal"
                                    name="contactoPrincipal"
                                    labelPlacement="outside"
                                    placeholder=" "
                                    variant="faded"
                                  />
                                </div>
                                <div className="md:col-span-4">
                                  <Input
                                    id="condicionesPago"
                                    disabled={isInputDisabled}
                                    onChange={handleChange}
                                    value={clientData.condicionesPago}
                                    size={"sm"}
                                    label="Condiciones de Pago"
                                    name="condicionesPago"
                                    labelPlacement="outside"
                                    placeholder=" "
                                    variant="faded"
                                  ></Input>
                                </div>
                                <div className="md:col-span-4">
                                  <Input
                                    id="cuenta"
                                    disabled={isInputDisabled}
                                    value={clientData.cuenta}
                                    onChange={handleChange}
                                    size={"sm"}
                                    label="Cuenta"
                                    name="cuenta"
                                    labelPlacement="outside"
                                    placeholder=" "
                                    variant="faded"
                                  />
                                </div>
                                <div className="md:col-span-6">
                                  <Input
                                    id="vendedorAsignado"
                                    disabled={isInputDisabled}
                                    onChange={handleChange}
                                    value={clientData.vendedorAsignado}
                                    size={"sm"}
                                    label="Vendedor Asignado"
                                    name="vendedorAsignado"
                                    labelPlacement="outside"
                                    placeholder=" "
                                    variant="faded"
                                  />
                                </div>
                                <div className="md:col-span-6">
                                  <Input
                                    id="listaPrecios"
                                    disabled={isInputDisabled}
                                    value={clientData.listaPrecios}
                                    onChange={handleChange}
                                    size={"sm"}
                                    label="Lista de Precios"
                                    name="listaPrecios"
                                    labelPlacement="outside"
                                    placeholder=" "
                                    variant="faded"
                                  />
                                </div>
                                <div className="md:col-span-6">
                                  <Input
                                    id="diasCredito"
                                    disabled={isInputDisabled}
                                    value={clientData.diasCredito}
                                    onChange={handleChange}
                                    size={"sm"}
                                    label="Días de Crédito"
                                    name="diasCredito"
                                    labelPlacement="outside"
                                    placeholder=" "
                                    variant="faded"
                                  />
                                </div>
                                <div className="md:col-span-6">
                                  <Input
                                    id="limiteCredito"
                                    disabled={isInputDisabled}
                                    value={clientData.limiteCredito}
                                    onChange={handleChange}
                                    size={"sm"}
                                    label="Limite de Crédito M.N"
                                    name="limiteCredito"
                                    labelPlacement="outside"
                                    placeholder=" "
                                    variant="faded"
                                  />
                                </div>
                                <div className="md:col-span-6">
                                  <Input
                                    id="saldoPendiente"
                                    disabled={isInputDisabled}
                                    value={clientData.saldoPendiente}
                                    onChange={handleChange}
                                    size={"sm"}
                                    label="Saldo Pendiente M.N"
                                    name="saldoPendiente"
                                    labelPlacement="outside"
                                    placeholder=" "
                                    variant="faded"
                                  />
                                </div>
                                <div className="md:col-span-6">
                                  <Input
                                    id="creditoDisponible"
                                    disabled={isInputDisabled}
                                    value={clientData.creditoDisponible}
                                    onChange={handleChange}
                                    size={"sm"}
                                    label="Crédito Disponible M.N"
                                    name="creditoDisponible"
                                    labelPlacement="outside"
                                    placeholder=" "
                                    variant="faded"
                                  />
                                </div>
                              </div>
                            </Tab>
                            <Tab key="music" title="Facturacion">
                              <Facturation id={1} />
                            </Tab>
                            <Tab key="Contacts" title="Contactos">
                            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-12 space-x-4 space-y-4 content-end">
                                <Spacer y={6} />
                                <div className="md:col-span-6"></div>
                                <div
                                    className="md:col-span-12"
                                    style={{
                                      marginLeft: "590px",
                                      marginRight: "70px",
                                    }}
                                  >
                                    <Button
                                      id="BTN3"
                                      size="sm"
                                      color="primary"
                                      endContent={<TbPlus />}
                                      className="text-align: right justify-end"
                                      onClick={handleCreateContact}
                                    >
                                      Nuevo contacto
                                    </Button>
                                    </div>
                                <div className="md:col-span-12">
                                <Table
                                      removeWrapper
                                      aria-label="Example static collection table"
                                    >
                                      <TableHeader>
                                        <TableColumn>Nombre</TableColumn>
                                        <TableColumn>Contacto</TableColumn>
                                        <TableColumn>Correo electronico</TableColumn>
                                        <TableColumn>Comentarios</TableColumn>
                                        <TableColumn>Direccion/Ubicacion</TableColumn>
                                        <TableColumn>Acciones</TableColumn>
                                      </TableHeader>
                                      <TableBody>
                                        {datosC.map((data, index) => (
                                          <TableRow key={index}>
                                            <TableCell>{data.contacto}</TableCell>
                                            <TableCell>
                                              {data.id}
                                            </TableCell>
                                            <TableCell>
                                              {data.email}
                                            </TableCell>
                                            <TableCell>{data.comentarios}</TableCell>
                                            <TableCell>{data.ubicacion}</TableCell>
                                            <TableCell>
                                            <div className="relative flex justify-center items-center gap-2">
                                            <Dropdown>
                                              <DropdownTrigger>
                                                <Button
                                                  isIconOnly
                                                  size="sm"
                                                  variant="light"
                                                >
                                                  <TbDotsVertical className="text-default-300" />
                                                </Button>
                                              </DropdownTrigger>
                                              <DropdownMenu>
                                                <DropdownItem>View</DropdownItem>
                                                <DropdownItem>Edit</DropdownItem>
                                                <DropdownItem>Delete</DropdownItem>
                                              </DropdownMenu>
                                            </Dropdown>
                                          </div>
                                          </TableCell>
                                          </TableRow>
                                        ))}
                                      </TableBody>
                                    </Table>
                                    <Modal
                                      isOpen={isOpen}
                                      onOpenChange={onOpenChange}
                                      placement="center"
                                      size="5xl"
                                      scrollBehavior="inside"
                                    >
                                      <ModalContent>
                                        {(onClose) => (
                                          <>
                                            <ModalHeader>
                                              {modalMode === "create" &&
                                                "Crear Contacto"}
                                              {modalMode === "edit" &&
                                                "Editar Contacto"}
                                              {modalMode === "view" &&
                                                "Ver Contacto"}
                                            </ModalHeader>
                                            <ModalBody>
                                              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-1">
                                                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-12 space-x-4 space-y-4 content-end">
                                                  <div className="md:col-span-6"></div>
                                                  <div className="md:col-span-12">
                                                    <Input
                                                      endContent={
                                                        <MdPeopleAlt className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                                      }
                                                      label="Nombre"
                                                      isRequired
                                                      type="text"
                                                      name="nombreContacto"
                                                      value={task3.nombreContacto}
                                                      placeholder=" "
                                                      variant="bordered"
                                                      onChange={handleChange3}
                                                      disabled={
                                                        modalMode === "view"
                                                      }
                                                    />
                                                  </div>
                                                  <div className="md:col-span-6">
                                                    <Input
                                                      endContent={
                                                        <MdPhone className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                                      }
                                                      label="Telefono"
                                                      isRequired
                                                      type="text"
                                                      name="telefonoContacto"
                                                      value={task3.telefonoContacto}
                                                      placeholder=" "
                                                      variant="bordered"
                                                      onChange={handleChange3}
                                                      disabled={
                                                        modalMode === "view"
                                                      }
                                                    />
                                                  </div>
                                                  <div className="md:col-span-6">
                                                    <Input
                                                      endContent={
                                                        <MdPhone className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                                      }
                                                      label="Celular"
                                                      isRequired
                                                      type="text"
                                                      name="celularContacto"
                                                      value={task3.celularContacto}
                                                      placeholder=" "
                                                      variant="bordered"
                                                      onChange={handleChange3}
                                                      disabled={
                                                        modalMode === "view"
                                                      }
                                                    />
                                                  </div>
                                                  <div className="md:col-span-6">
                                                    <Input
                                                      endContent={
                                                        <MdWhatsapp className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                                      }
                                                      label="WhatsApp"
                                                      isRequired
                                                      type="text"
                                                      name="whatsAppContacto"
                                                      value={task3.whatsAppContacto}
                                                      placeholder=" "
                                                      variant="bordered"
                                                      onChange={handleChange3}
                                                      disabled={
                                                        modalMode === "view"
                                                      }
                                                    />
                                                  </div>
                                                  <div className="md:col-span-6">
                                                    <Input
                                                      endContent={
                                                        <MdEmail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                                      }
                                                      label="Correo electronico"
                                                      isRequired
                                                      type="text"
                                                      name="emailContacto"
                                                      value={task3.emailContacto}
                                                      placeholder=" "
                                                      variant="bordered"
                                                      onChange={handleChange3}
                                                      disabled={
                                                        modalMode === "view"
                                                      }
                                                    />
                                                  </div>
                                                  <div className="md:col-span-6">
                                                    <Input
                                                      endContent={
                                                        <MdStreetview className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                                      }
                                                      label="Puesto"
                                                      isRequired
                                                      type="text"
                                                      name="puestoContacto"
                                                      value={task3.puestoContacto}
                                                      placeholder=" "
                                                      variant="bordered"
                                                      onChange={handleChange3}
                                                      disabled={
                                                        modalMode === "view"
                                                      }
                                                    />
                                                  </div>
                                                  <div className="md:col-span-6">
                                                    <Input
                                                      endContent={
                                                        <MdLocationCity className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                                      }
                                                      label="Direccion/Ubicacion"
                                                      isRequired
                                                      type="text"
                                                      name="ubicacionContacto"
                                                      value={task3.ubicacionContacto}
                                                      placeholder=" "
                                                      variant="bordered"
                                                      onChange={handleChange3}
                                                      disabled={
                                                        modalMode === "view"
                                                      }
                                                    />
                                                  </div>
                                                  <div className="md:col-span-12">
                                                    <Input
                                                      endContent={
                                                        <MdPeople className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                                      }
                                                      label="Comentarios"
                                                      isRequired
                                                      type="text"
                                                      name="comentariosContacto"
                                                      value={task3.comentariosContacto}
                                                      placeholder=" "
                                                      variant="bordered"
                                                      onChange={handleChange3}
                                                      disabled={
                                                        modalMode === "view"
                                                      }
                                                    />
                                                  </div>
                                              
                                                  
                                                </div>
                                              </div>
                                            </ModalBody>
                                            <ModalFooter>
                                              <Button
                                                color="danger"
                                                variant="flat"
                                                onPress={onClose}
                                              >
                                                Cerrar
                                              </Button>
                                              <Button
                                                id="BTN2guardar"
                                                endContent={<MdSave />}
                                                color="primary"
                                                onClick={handleSubmitModal}
                                              >
                                                Guardar
                                              </Button>
                                            </ModalFooter>
                                          </>
                                        )}
                                      </ModalContent>
                                    </Modal>
                                    </div>
                                    </div>
                                    </Tab>
                            <Tab key="Addres" title="Direcciones de envio">
                              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-12 space-x-4 space-y-4 content-end">
                                <Spacer y={6} />
                                <div className="md:col-span-6"></div>
                                <div
                                  className="md:col-span-12"
                                  style={{
                                    marginLeft: "590px",
                                    marginRight: "70px",
                                  }}
                                >
                                  <Button
                                    id="BTN3"
                                    size="sm"
                                    color="primary"
                                    endContent={<TbPlus />}
                                    className="text-align: right justify-end"
                                    onClick={handleCreateClick}
                                  >
                                    Nueva Dirección de Envío
                                  </Button>
                                </div>
                                <div className="md:col-span-12">
                                  <Table
                                    removeWrapper
                                    aria-label="Example static collection table"
                                  >
                                    <TableHeader>
                                      <TableColumn>Nombre</TableColumn>
                                      <TableColumn>Dirección</TableColumn>
                                      <TableColumn>Colonia</TableColumn>
                                      <TableColumn>Ciudad</TableColumn>
                                      <TableColumn>Estado</TableColumn>
                                      <TableColumn>Acciones</TableColumn>
                                    </TableHeader>
                                    <TableBody>
                                      {datosE.map((data, index) => (
                                        <TableRow key={index}>
                                          <TableCell>{data.nombre}</TableCell>
                                          <TableCell>
                                            {data.direccion}
                                          </TableCell>
                                          <TableCell>{data.colonia}</TableCell>
                                          <TableCell>{data.ciudad}</TableCell>
                                          <TableCell>{data.estado}</TableCell>
                                          <TableCell>
                                            <div className="relative flex justify-center items-center gap-2">
                                              <Dropdown>
                                                <DropdownTrigger>
                                                  <Button
                                                    isIconOnly
                                                    size="sm"
                                                    variant="light"
                                                  >
                                                    <TbDotsVertical className="text-default-300" />
                                                  </Button>
                                                </DropdownTrigger>
                                                <DropdownMenu>
                                                  <DropdownItem>
                                                    View
                                                  </DropdownItem>
                                                  <DropdownItem>
                                                    Edit
                                                  </DropdownItem>
                                                  <DropdownItem>
                                                    Delete
                                                  </DropdownItem>
                                                </DropdownMenu>
                                              </Dropdown>
                                            </div>
                                          </TableCell>
                                        </TableRow>
                                      ))}
                                    </TableBody>
                                  </Table>
                                  <Modal
                                    isOpen={isOpen}
                                    onOpenChange={onOpenChange}
                                    placement="center"
                                    size="5xl"
                                    scrollBehavior="inside"
                                  >
                                    <ModalContent>
                                      {(onClose) => (
                                        <>
                                          <ModalHeader>
                                            {modalMode === "create" &&
                                              "Crear Direcciones de envío"}
                                            {modalMode === "edit" &&
                                              "Editar Direcciones de envío"}
                                            {modalMode === "view" &&
                                              "Ver Direcciones de envío"}
                                          </ModalHeader>
                                          <ModalBody>
                                            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-1">
                                              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-12 space-x-4 space-y-4 content-end">
                                                <div className="md:col-span-6"></div>
                                                <div className="md:col-span-12">
                                                  <Input
                                                    endContent={
                                                      <MdAddHomeWork className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                                    }
                                                    label="Nombre de la Dirección"
                                                    isRequired
                                                    type="text"
                                                    name="nombre"
                                                    value={task2.nombre}
                                                    placeholder=" "
                                                    variant="bordered"
                                                    onChange={handleChange2}
                                                    disabled={
                                                      modalMode === "view"
                                                    }
                                                  />
                                                </div>
                                                <div className="md:col-span-6">
                                                  <Input
                                                    endContent={
                                                      <MdStreetview className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                                    }
                                                    label="Calle"
                                                    isRequired
                                                    placeholder=" "
                                                    type="text"
                                                    name="direccion"
                                                    value={task2.direccion}
                                                    variant="bordered"
                                                  />
                                                </div>
                                                <div className="md:col-span-3">
                                                  <Input
                                                    endContent={
                                                      <MdNumbers className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                                    }
                                                    label="No. Int."
                                                    isRequired
                                                    placeholder=" "
                                                    type="text"
                                                    variant="bordered"
                                                  />
                                                </div>
                                                <div className="md:col-span-3">
                                                  <Input
                                                    endContent={
                                                      <MdOutlineNumbers className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                                    }
                                                    label="No. Ext."
                                                    isRequired
                                                    placeholder=" "
                                                    type="text"
                                                    variant="bordered"
                                                  // onChange={handleChange}
                                                  // disabled={
                                                  //   modalMode === "view"
                                                  // } // Deshabilitar input en modo "ver"
                                                  />
                                                </div>
                                                <div className="md:col-span-6">
                                                  <Input
                                                    endContent={
                                                      <MdStreetview className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                                    }
                                                    label="Colonia"
                                                    isRequired
                                                    placeholder=" "
                                                    type="text"
                                                    name="colonia"
                                                    value={task2.colonia}
                                                    variant="bordered"
                                                    onChange={handleChange2}
                                                    disabled={
                                                      modalMode === "view"
                                                    }
                                                  />
                                                </div>
                                                <div className="md:col-span-6">
                                                  <Input
                                                    endContent={
                                                      <MdStreetview className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                                    }
                                                    label="Entre Calles"
                                                    isRequired
                                                    placeholder=" "
                                                    type="text"
                                                    variant="bordered"
                                                  />
                                                </div>
                                                <div className="md:col-span-6">
                                                  <Input
                                                    endContent={
                                                      <MdLocationCity className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                                    }
                                                    label="Ciudad"
                                                    isRequired
                                                    placeholder=" "
                                                    type="text"
                                                    name="ciudad"
                                                    value={task2.ciudad}
                                                    variant="bordered"
                                                    onChange={handleChange2}
                                                    disabled={
                                                      modalMode === "view"
                                                    }
                                                  />
                                                </div>
                                                <div className="md:col-span-3">
                                                  <Select
                                                    endContent={
                                                      <MdOutlineLocationCity className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                                    }
                                                    label="Estado"
                                                    isRequired
                                                    placeholder=" "
                                                    type="text"
                                                    name="estado"
                                                    value={task2.estado}
                                                    variant="bordered"
                                                    onChange={handleChange2}
                                                    disabled={
                                                      modalMode === "view"
                                                    }
                                                  >
                                                    {estadosDeMexico.map(
                                                      (estado) => (
                                                        <MenuItem
                                                          key={estado}
                                                          value={estado}
                                                        >
                                                          {estado}
                                                        </MenuItem>
                                                      )
                                                    )}
                                                  </Select>
                                                </div>
                                                <div className="md:col-span-3">
                                                  <Input
                                                    endContent={
                                                      <MdPostAdd className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                                    }
                                                    label="C.P."
                                                    isRequired
                                                    placeholder=" "
                                                    type="text"
                                                    name="codigoPostal"
                                                    value={task2.codigoPostal}
                                                    variant="bordered"
                                                    onChange={handleChange2}
                                                    disabled={
                                                      modalMode === "view"
                                                    }
                                                  />
                                                </div>
                                                <div className="md:col-span-6">
                                                  <Input
                                                    endContent={
                                                      <MdPerson className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                                    }
                                                    label="Nombre(s) de quien Recibe"
                                                    isRequired
                                                    placeholder=" "
                                                    type="text"
                                                    variant="bordered"
                                                  />
                                                </div>
                                                <div className="md:col-span-6">
                                                  <Input
                                                    endContent={
                                                      <MdPeople className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                                    }
                                                    label="Apellido(s)"
                                                    isRequired
                                                    placeholder=" "
                                                    type="text"
                                                    name="apellido"
                                                    value={task2.apellido}
                                                    variant="bordered"
                                                    onChange={handleChange2}
                                                    disabled={
                                                      modalMode === "view"
                                                    }
                                                  />
                                                </div>
                                                <div className="md:col-span-12">
                                                  <Textarea
                                                    label="Referencias"
                                                    isRequired
                                                    variant="bordered"
                                                  />
                                                </div>
                                              </div>
                                            </div>
                                          </ModalBody>
                                          <ModalFooter>
                                            <Button
                                              color="danger"
                                              variant="flat"
                                              onPress={onClose}
                                            >
                                              Cerrar
                                            </Button>
                                            <Button
                                              id="BTN2guardar"
                                              endContent={<MdSave />}
                                              color="primary"
                                              onClick={handleSubmitModal}
                                            >
                                              Guardar
                                            </Button>
                                          </ModalFooter>
                                        </>
                                      )}
                                    </ModalContent>
                                  </Modal>
                                </div>
                              </div>
                            </Tab>
                            <Tab key="WEB" title="Acceso web">
                              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-12 space-x-4 space-y-4 content-end">
                                <Spacer y={6} />
                                <div className="md:col-span-6"></div>
                                <div className="md:col-span-6">
                                  <Input
                                    id="password"
                                    disabled={isInputDisabled}
                                    isDisabled={status ? true : false}
                                    value={clientData.password}
                                    onChange={handleChange}
                                    size={"sm"}
                                    type="password"
                                    label="Password"
                                    name="password"
                                    labelPlacement="outside"
                                    placeholder=" "
                                    variant="faded"
                                    color={
                                      passwordValidationState === "invalid"
                                        ? "danger"
                                        : "default"
                                    }
                                    errorMessage={
                                      passwordValidationState === "invalid" &&
                                      "La contraseña debe tener al menos 8 caracteres"
                                    }
                                    validationState={passwordValidationState}
                                  />
                                </div>

                                <div className="md:col-span-6">
                                  <Input
                                    id="confirmPassword"
                                    disabled={isInputDisabled}
                                    isDisabled={status ? true : false}
                                    value={clientData.passwordValidation}
                                    onChange={handleChange}
                                    size={"sm"}
                                    type="password"
                                    label="Confirmar Password"
                                    name="confirmPassword"
                                    labelPlacement="outside"
                                    placeholder=" "
                                    variant="faded"
                                    color={
                                      confirmPasswordValidationState ===
                                        "invalid"
                                        ? "danger"
                                        : "default"
                                    }
                                    errorMessage={
                                      confirmPasswordValidationState ===
                                      "invalid" &&
                                      "La contraseña de confirmación debe coincidir con la contraseña"
                                    }
                                    validationState={
                                      confirmPasswordValidationState
                                    }
                                  />
                                </div>
                                <div className="md:col-span-3">
                                  <label htmlFor="status">Status</label>
                                  <Select
                                    id="status"
                                    disabled={isInputDisabled}
                                    isDisabled={status ? true : false}
                                    value={clientData.status}
                                    onChange={handleChange}
                                    size="small"
                                    label=" "
                                    name="status"
                                    variant="outlined"
                                    fullWidth
                                    error={validationErrors.status !== ""}
                                    errorMessage={validationErrors.status}
                                  >
                                    <MenuItem value="activo">Activo</MenuItem>
                                    <MenuItem value="inactivo">
                                      Inactivo
                                    </MenuItem>
                                  </Select>
                                </div>
                                <div className="md:col-span-3">
                                  <label htmlFor="status">Validacion</label>
                                  <Select
                                    id="Validacion"
                                    disabled={isInputDisabled}
                                    isDisabled={status ? true : false}
                                    value={clientData.Validacion}
                                    onChange={handleChange}
                                    size="small"
                                    label=" "
                                    name="Validacion"
                                    variant="outlined"
                                    fullWidth
                                    error={validationErrors.Validacion !== ""}
                                    errorMessage={validationErrors.Validacion}
                                  >
                                    <MenuItem value="Validado">
                                      Validado
                                    </MenuItem>
                                    <MenuItem value="Invalidado">
                                      Invalidado
                                    </MenuItem>
                                  </Select>
                                </div>
                              </div>
                            </Tab>
                            <Tab key="Acount" title="Estados de cuenta">
                              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-12 space-x-4 space-y-4 content-end">
                                <Spacer y={6} />
                                <div className="md:col-span-6"></div>

                                <div className="md:col-span-3">
                                  <Input
                                    id="Fecha"
                                    disabled={isInputDisabled}
                                    value={clientData.fecha}
                                    onChange={handleTime}
                                    type="date"
                                  ></Input>
                                </div>

                                <div className="md:col-span-3">
                                  <Input
                                    id="Tipo"
                                    disabled={isInputDisabled}
                                    isDisabled={status ? true : false}
                                    value={clientData.tipo}
                                    onChange={handleChange}
                                    size={"sm"}
                                    type="Tipo"
                                    label="Tipo"
                                    name="Tipo"
                                    labelPlacement="outside"
                                    placeholder=" "
                                    variant="faded"
                                    error={validationErrors.tipo !== ""}
                                    errorMessage={validationErrors.tipo}
                                  />
                                </div>
                                <div className="md:col-span-3">
                                  <Input
                                    id="Detalle"
                                    disabled={isInputDisabled}
                                    isDisabled={status ? true : false}
                                    value={clientData.detalle}
                                    onChange={handleChange}
                                    size={"sm"}
                                    type="Detalle"
                                    label="Detalle"
                                    name="Detalle"
                                    labelPlacement="outside"
                                    placeholder=" "
                                    variant="faded"
                                    error={validationErrors.detalle !== ""}
                                    errorMessage={validationErrors.detalle}
                                  />
                                </div>
                                <div className="md:col-span-3">
                                  <Input
                                    id="Cargo"
                                    disabled={isInputDisabled}
                                    isDisabled={status ? true : false}
                                    value={clientData.cargo}
                                    onChange={handleChange}
                                    size={"sm"}
                                    type="Cargo"
                                    label="Cargo"
                                    name="Cargo"
                                    labelPlacement="outside"
                                    placeholder=" "
                                    variant="faded"
                                    error={validationErrors.cargo !== ""}
                                    errorMessage={validationErrors.cargo}
                                  />
                                </div>
                                <div className="md:col-span-6">
                                  <Input
                                    id="Abono"
                                    disabled={isInputDisabled}
                                    isDisabled={status ? true : false}
                                    value={clientData.abono}
                                    onChange={handleChange}
                                    size={"sm"}
                                    type="Abono"
                                    label="Abono"
                                    name="Abono"
                                    labelPlacement="Abono"
                                    placeholder=" "
                                    variant="faded"
                                    error={validationErrors.abono !== ""}
                                    errorMessage={validationErrors.abono}
                                  />
                                </div>
                                <div className="md:col-span-6">
                                  <Input
                                    id="Tc"
                                    disabled={isInputDisabled}
                                    isDisabled={status ? true : false}
                                    value={clientData.tc}
                                    onChange={handleChange}
                                    size={"sm"}
                                    type="Tc"
                                    label="Tc"
                                    name="Tc"
                                    labelPlacement="Tc"
                                    placeholder=" "
                                    variant="faded"
                                    error={validationErrors.tc !== ""}
                                    errorMessage={validationErrors.tc}
                                  />
                                </div>
                                <div className="md:col-span-6">
                                  <Input
                                    id="Saldo"
                                    disabled={isInputDisabled}
                                    isDisabled={status ? true : false}
                                    value={clientData.saldo}
                                    onChange={handleChange}
                                    size={"sm"}
                                    type="Saldo"
                                    label="Saldo"
                                    name="Saldo"
                                    labelPlacement="Saldo"
                                    placeholder=" "
                                    variant="faded"
                                    error={validationErrors.saldo !== ""}
                                    errorMessage={validationErrors.saldo}
                                  />
                                </div>
                              </div>
                            </Tab>
                          </Tabs>
                        </div>
                        <Spacer y={10} />
                      </div>
                    </div>
                    <div className="md:col-span-12 text-right content-end">
                      <div className="space-x-5 space-y-5">
                        {selected === "music" && (
                          <Button
                            className="min-w-[200px]"
                            color="primary"
                            type="submit"
                            startContent={<RiArrowLeftLine />}
                            onClick={() => setSelected("photos")}
                          >
                            Anterior
                          </Button>
                        )}
                        {selected === "Contacts" && (
                          <Button
                            className="min-w-[200px]"
                            color="primary"
                            type="submit"
                            startContent={<RiArrowLeftLine />}
                            onClick={() => setSelected("music")}
                          >
                            Anterior
                          </Button>
                        )}
                        {selected === "Addres" && (
                          <Button
                            className="min-w-[200px]"
                            color="primary"
                            type="submit"
                            startContent={<RiArrowLeftLine />}
                            onClick={() => setSelected("Contacts")}
                          >
                            Anterior
                          </Button>
                        )}
                        {selected === "WEB" && (
                          <Button
                            className="min-w-[200px]"
                            color="primary"
                            type="submit"
                            startContent={<RiArrowLeftLine />}
                            onClick={() => setSelected("Addres")}
                          >
                            Anterior
                          </Button>
                        )}
                        {selected === "Acount" && (
                          <Button
                            className="min-w-[200px]"
                            color="primary"
                            type="submit"
                            startContent={<RiArrowLeftLine />}
                            onClick={() => setSelected("WEB")}
                          >
                            Anterior
                          </Button>
                        )}
                        {selected === "photos" && (
                          <Button
                            className="min-w-[200px]"
                            color="primary"
                            type="button"
                            endContent={<RiArrowRightLine />}
                            onClick={() => setSelected("music")}
                          >
                            Siguiente
                          </Button>
                        )}
                        {selected === "music" && (
                          <Button
                            className="min-w-[200px]"
                            color="primary"
                            type="button"
                            endContent={<RiArrowRightLine />}
                            onClick={() => setSelected("Contacts")}
                          >
                            Siguiente
                          </Button>
                        )}
                        {selected === "Contacts" && (
                          <Button
                            className="min-w-[200px]"
                            color="primary"
                            type="button"
                            endContent={<RiArrowRightLine />}
                            onClick={() => setSelected("Addres")}
                          >
                            Siguiente
                          </Button>
                        )}
                        {selected === "Addres" && (
                          <Button
                            className="min-w-[200px]"
                            color="primary"
                            type="button"
                            endContent={<RiArrowRightLine />}
                            onClick={() => setSelected("WEB")}
                          >
                            Siguiente
                          </Button>
                        )}
                        {selected === "WEB" && (
                          <Button
                            className="min-w-[200px]"
                            color="primary"
                            type="button"
                            endContent={<RiArrowRightLine />}
                            onClick={() => setSelected("Acount")}
                          >
                            Siguiente
                          </Button>
                        )}{" "}
                        <Button
                          id="btnGuardar"
                          className="min-w-[200px]"
                          color="success"
                          type="submit"
                          endContent={<MdSave />}
                        >
                          Guardar
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
    </>
  );
};

export default NewClient;
