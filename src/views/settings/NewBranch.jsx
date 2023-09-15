import {
  Button,
  Input,
  Link,
  Spacer,
  Checkbox,
  Textarea,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
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
import { useRef, useState, useMemo } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//import ProfileImageUpload from "../user/ProfilesImagenUploads.tsx";
import { Breadcrumbs, Typography } from "@mui/material";
import { RiDashboard2Fill } from "react-icons/ri";
import { MdAddHome, MdAllInbox, MdSettings } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import ItemsHeader from "../../components/header/ItemsHeader/ItemsHeader.jsx";
import { MdSave } from "react-icons/md";
import http from "../../components/axios/Axios";
import React, { useCallback, useEffect } from "react";
import { TbPlus } from "react-icons/tb";

const columns = [
  { name: "Nombre", uid: "Nombre", sortable: true },
  { name: "Tipo", uid: "Tipo", sortable: true },
  { name: "Acciones", uid: "Actions" },
];

const INITIAL_VISIBLE_COLUMNS = ["Nombre", "Tipo", "Actions"];

const validationRules = {
  nombre: (value) => value.trim() !== "",
  ciudad: (value) => value.trim() !== "",
  estado: (value) => value.trim() !== "",
  telefono: (value) => value.match(/^\d{10}$/),
  gerente: (value) => value.trim() !== "",
  almacenes: (value) => value.match(/^\d{10}$/),
};

const NewBranch = () => {
  const [user, setUser] = useState({});

  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const fileInputRef = useRef(null);
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "age",
    direction: "ascending",
  });
  const handleFileButtonClick = () => {
    fileInputRef.current.click();
  };

  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  async function loadTask() {
    try {
      const response = await fetch("http://localhost:4000/Almacenes");
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
  }
  useEffect(() => {
    loadTask();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [page, setPage] = React.useState(1);
  const [filterValue, setFilterValue] = React.useState("");
  const hasSearchFilter = Boolean(filterValue);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...data];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((data) =>
        data.nombre.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredUsers = filteredUsers.filter((data) =>
        Array.from(statusFilter).includes(data.nombre)
      );
    }

    return filteredUsers;
  }, [data, hasSearchFilter, statusFilter, filterValue]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);
  //Formulario
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showFormulario, setShowFormulario] = useState(false);
  const [isAddingAlmacenes, setIsAddingAlmacenes] = useState(false);
  const [web, setWeb] = useState(false);
  const [botonGuardarHabilitado, setBotonGuardarHabilitado] =
    React.useState(true);

  const [formulario, setFormulario] = useState({
    nombre: "",
    ciudad: "",
    estado: "",
    telefono: "",
    gerente: "",
    almacenes: "",
    web: "",
  });

  const [sucursalDatos, setSucursalDatos] = useState({
    nombreCorto: "",
    direccion: "",
    colonia: "",
    codigoPostal: "",
    emailSucursal: "",
    rfc: "",
    geoUrlMaps: "",
    limiteCredito: "",
    encabezadoPos: "",
    notaEnviosPos: "",
    notaTicketPos: "",
  });

  const handleAddAlmacenes = () => {
    // Lógica para agregar almacenes
    // Cambiar a la vista de agregar almacenes
    setIsAddingAlmacenes(true);
    // Cerrar el modal de confirmación
    setShowConfirmationModal(false);
  };

  const handleReturnToMainPage = () => {
    // Manejar el caso en el que el usuario no quiera agregar almacenes
    // Cerrar el modal de confirmación
    setShowConfirmationModal(false);
    navigate("/Settings/BranchOffices");
  };

  const handleNameChange = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
    // Actualizar el estado de validación según si el campo está vacío o no
    if (!value) {
      switch (name) {
        case "nombre":
          setValidationNombre("invalid");
          break;
        case "ciudad":
          setValidationCiud("invalid");
          break;
        case "estado":
          setValidationEstado("invalid");
          break;
        case "telefono":
          setValidationTel("invalid");
          break;
        case "gerente":
          setValidationGeren("invalid");
          break;
        case "almacenes":
          setValidationAlma("invalid");
          break;
        default:
          break;
      }
    } else {
      switch (name) {
        case "nombre":
          setValidationNombre("valid");
          break;
        case "ciudad":
          setValidationCiud("valid");
          break;
        case "estado":
          setValidationEstado("valid");
          break;
        case "telefono":
          setValidationTel("valid");
          break;
        case "gerente":
          setValidationGeren("valid");
          break;
        case "almacenes":
          setValidationAlma("valid");
          break;
        default:
          break;
      }
    }
    setSucursalDatos((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const validation = (value) => value.trim() !== "";
  const validationStates = useMemo(() => {
    if (formulario.nombre === "") return undefined;

    return validation(formulario.nombre) ? "valid" : "invalid";
  }, [formulario.nombre]);

  const [nuevaSucursalId, setNuevaSucursalId] = useState(null);
  const [validationNombre, setValidationNombre] = React.useState("");
  const [validationCiud, setValidationCiud] = React.useState("");
  const [validationEstado, setValidationEstado] = React.useState("");
  const [validationTel, setValidationTel] = React.useState("");
  const [validationGeren, setValidationGeren] = React.useState("");
  const [validationAlma, setValidationAlma] = React.useState("");

  const handleGuardar = async (e) => {
    e.preventDefault();

    // Verificar si alguno de los campos está vacío
    if (
      !formulario.nombre ||!formulario.ciudad || !formulario.estado || !formulario.telefono ||
      !formulario.gerente || !formulario.almacenes ||!sucursalDatos.nombreCorto ||!sucursalDatos.direccion ||
      !sucursalDatos.colonia ||!sucursalDatos.codigoPostal ||!sucursalDatos.emailSucursal ||
      !sucursalDatos.rfc ||!sucursalDatos.geoUrlMaps ||!sucursalDatos.limiteCredito ||
      !sucursalDatos.encabezadoPos ||!sucursalDatos.notaEnviosPos ||!sucursalDatos.notaTicketPos
    ) {
      // Mostrar un mensaje de error o realizar alguna acción
      toast.warning("Por favor, complete todos los campos antes de guardar.",{theme: "colored"});
      return; // No continuar con la solicitud POST
    }

    const camposFaltantes = [];
    !formulario.nombre ? setValidationNombre("invalid") : setValidationNombre("valid");
    !formulario.ciudad ? setValidationCiud("invalid") : setValidationCiud("valid");
    !formulario.estado ? setValidationEstado("invalid") : setValidationEstado("valid");
    !formulario.telefono ? setValidationTel("invalid") : setValidationTel("valid");
    !formulario.gerente ? setValidationGeren("invalid") : setValidationGeren("valid");
    !formulario.almacenes ? setValidationAlma("invalid") : setValidationAlma("valid");
    
    
    const valorCheckbox = web ? 1 : 0;
    try {
      const response = await fetch("http://localhost:4000/SucursalesAlmacen", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: formulario.nombre,
          ciudad: formulario.ciudad,
          estado: formulario.estado,
          telefono: formulario.telefono,
          gerente: formulario.gerente,
          almacenes: formulario.almacenes,
          web: valorCheckbox, // Aquí guardamos el valor del checkbox
        }),
      });
      if (!response.ok) {
        toast.warning("Error al almacenar Sucursales", { theme: "colored" });
        return;
      }

      // Segunda solicitud POST a la segunda tabla
      const response2 = await fetch("http://localhost:4000/SucursalesDatos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombreCorto: sucursalDatos.nombreCorto,
          direccion: sucursalDatos.direccion,
          colonia: sucursalDatos.colonia,
          codigoPostal: sucursalDatos.codigoPostal,
          emailSucursal: sucursalDatos.emailSucursal,
          rfc: sucursalDatos.rfc,
          geoUrlMaps: sucursalDatos.geoUrlMaps,
          limiteCredito: sucursalDatos.limiteCredito,
          encabezadoPos: sucursalDatos.encabezadoPos,
          notaEnviosPos: sucursalDatos.notaEnviosPos,
          notaTicketPos: sucursalDatos.notaTicketPos,
        }),
      });
      // const nuevaSucursal = await response.json();
      // const nuevaSucursalId = nuevaSucursal.id; // Obtén el ID de la sucursal
      if (!response2.ok) {
        // console.log("Error al almacenar Sucursales Datos");
        return;
      }
      toast.success("Sucursal Guardada Correctamente", { theme: "colored" });
      // Almacena el ID de la sucursal en un estado o variable
      //  setNuevaSucursalId(nuevaSucursalId);
      //  console.log(nuevaSucursalId);
      setShowConfirmationModal(true);
      //  setShowFormulario(true);
      // Ambas solicitudes POST se completaron con éxito
    } catch (error) {
      toast.warning("Error al guardar sucursal");
      console.error("Error en la segunda solicitud POST:", error);
    }
  };

  //Modal
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [size, setSize] = React.useState("md");
  const sizes = ["md", "lg", "xl", "2xl", "3xl"];
  const [editingItem, setEditingItem] = useState({
    nombre: "",
    tipo: "",
  });
  const [modalMode, setModalMode] = useState("create");
  const [formData, setFormData] = useState({
    nombre: "",
    tipo: "",
  });

  const handleCreate = () => {
    setModalMode("create");
    onOpen();
    if (formData.nombre && formData.tipo) {
      // Verifica si el registro ya existe en la tabla
      const exists = data2.some(
        (registro) =>
          registro.nombre === formData.nombre && registro.tipo === formData.tipo
      );

      if (!exists) {
        const nuevoRegistro = {
          // sucursalId: nuevaSucursalId,
          nombre: formData.nombre,
          tipo: formData.tipo,
        };

        // Agrega el nuevo registro a data2
        setData2([...data2, nuevoRegistro]);

        setFormData({
          nombre: "",
          tipo: "",
        });
      } else {
        // Muestra un mensaje de error o realiza alguna acción para indicar que el registro ya existe
        // console.log("El registro ya existe en la tabla");
      }
    }
  };

  const handleEdit = (itemId) => {
    const selectedItem = data.find((item) => item.id === itemId);
    // console.log(selectedItem);
    if (selectedItem) {
      // Configura el estado del formulario modal con los datos del elemento seleccionado
      setFormData({
        id: selectedItem.id,
        nombre: selectedItem.nombre,
        tipo: selectedItem.tipo,
      });
      setEditingItem({
        ...selectedItem,
      });
      // Abre el modal
      setModalMode("edit");
      onOpen();
    } else {
      toast.warning("Elemento no encontrado", { theme: "colored" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if(!nuevaSucursalId){
    //   console.log(nuevaSucursalId);
    //   return;
    // }

    const updatedData2 = {
      nombre: formData.nombre,
      tipo: formData.tipo,
    };

    try {
      if (modalMode === "create") {
        const response = await fetch("http://localhost:4000/Almacenes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // sucursalId: nuevaSucursalId,
            nombre: formData.nombre,
            tipo: formData.tipo,
          }),
        });
        if (response.ok) {
          const result = await response.json();
          console.log(result);
          toast.success("Almacén Creado",{theme: "colored"});
          onClose(true);
          setData2([...data2, result]);
          console.log(data2);
          loadTask();
        } else {
          const json = await response.json();
          toast.error(json.body.error, { theme: "colored" });
        }
      } else if (modalMode === "edit") {
        // Editar elemento existente
        const res = await fetch(
          `http://localhost:4000/Almacenes/${editingItem.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedData2),
          }
        );

        if (res.ok) {
          const result = await res.json();
          // Actualizar el elemento existente en lugar de agregar uno nuevo
          const updatedData = data2.map((item) =>
            item.id === result.id ? result : item
          );
          setData2(updatedData);
          toast.success("Almacén Editado",{theme: "colored"});
          onClose(true);
          loadTask();
        } else {
          const json = await res.json();
          toast.warning(json.body.error, { theme: "colored" });
        }
      }
    } catch (error) {
      toast.error("Error al Guardar", { theme: "colored" });
    }
  };

  const handleDisableAlmacen = async (almacenId) => {
    try {
      // Hacer una solicitud a la API para deshabilitar el almacén
      const response = await fetch(
        `http://localhost:4000/AlmacenesDisable/${almacenId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        // Actualizar la tabla de almacenes después de deshabilitar
        const updatedData = data2.filter((almacen) => almacen.id !== almacenId);
        setData(updatedData);
        toast.success("Almacén deshabilitado", { theme: "colored" });
      } else {
        // Manejar errores si la respuesta no es exitosa
        toast.warning("Error al deshabilitar el almacén", { theme: "colored" });
      }
    } catch (error) {
      toast.error("Error al deshabilitar", { theme: "colored" });
      // Manejar el error
    }
  };

  const navigate = useNavigate();

  const renderCell = React.useCallback((data, columnKey) => {
    const cellValue = data[columnKey];

    switch (columnKey) {
      case "Nombre":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{data.nombre}</p>
          </div>
        );
      case "Tipo":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{data.tipo}</p>
          </div>
        );
      case "Actions":
        return (
          <div className="relative flex justify-center items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <TbDotsVertical className="text-default-300" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem onClick={() => handleEdit(data.id)}>
                  Editar Almacén
                </DropdownItem>
                <DropdownItem onClick={() => handleDisableAlmacen(data.id)}>
                  Deshabilitar Almacén
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

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
                    onClick={() => navigate(`/Settings`)}
                  >
                    <MdSettings sx={{ mr: 0.5 }} fontSize="inherit" />
                    Ajustes
                  </Link>
                  <Link
                    className="text-foreground"
                    underline="hover"
                    sx={{ display: "flex", alignItems: "center" }}
                    color="foreground"
                    href="#"
                    onClick={() => navigate(`/Settings/BranchOffices`)}
                  >
                    <MdAddHome sx={{ mr: 0.5 }} fontSize="inherit" />
                    Sucursales
                  </Link>
                  <Typography
                    sx={{ display: "flex", alignItems: "center" }}
                    className="text-foreground"
                  >
                    <MdAllInbox sx={{ mr: 0.5 }} fontSize="inherit" />
                    Sucursal
                  </Typography>
                </Breadcrumbs>
              </div>
              <form>
                <Spacer y={6} />
                <div className="bg-card rounded shadow-2xl px-4 md:p-8 mb-6">
                  <div className="col-span-1">
                    <div className="grid gap-5  md:grid-cols-5  justify-center">
                      <Spacer y={6} />
                      <div className="md:col-span-6"></div>
                      <div className="md:col-span-6">
                        <Input
                          size={"sm"}
                          type="text"
                          label="Nombre de la sucursal"
                          name="nombre"
                          labelPlacement="outside"
                          placeholder=" "
                          variant="faded"
                          onChange={handleNameChange}
                          value={formulario.nombre}
                          validationState={validationNombre}
                          required
                        />
                      </div>
                      <div className="md:col-span-3">
                        <Input
                          size={"sm"}
                          type="text"
                          label="Nombre Corto"
                          name="nombreCorto"
                          labelPlacement="outside"
                          placeholder=" "
                          variant="faded"
                          onChange={handleNameChange}
                          value={sucursalDatos.nombreCorto}
                        />
                      </div>
                      <div className="md:col-span-3">
                        <Input
                          size={"sm"}
                          type="text"
                          label="Gerente de la Sucursal"
                          name="gerente"
                          labelPlacement="outside"
                          placeholder=" "
                          variant="faded"
                          onChange={handleNameChange}
                          value={formulario.gerente}
                          validationState={validationGeren}
                          required
                        />
                      </div>
                      <div className="md:col-span-12">
                        <Input
                          size={"sm"}
                          type="text"
                          label="Dirección"
                          name="direccion"
                          labelPlacement="outside"
                          placeholder=" "
                          variant="faded"
                          onChange={handleNameChange}
                          value={sucursalDatos.direccion}
                        />
                      </div>
                      <div className="md:col-span-12">
                        <Input
                          size={"sm"}
                          type="text"
                          label="Colonia"
                          name="colonia"
                          labelPlacement="outside"
                          placeholder=" "
                          variant="faded"
                          onChange={handleNameChange}
                          value={sucursalDatos.colonia}
                        />
                      </div>
                      <div className="md:col-span-4">
                        <Input
                          size={"sm"}
                          type="text"
                          label="Ciudad"
                          name="ciudad"
                          labelPlacement="outside"
                          placeholder=" "
                          variant="faded"
                          onChange={handleNameChange}
                          value={formulario.ciudad}
                          validationState={validationCiud}
                          required
                        />
                      </div>
                      <div className="md:col-span-4">
                        <Input
                          size={"sm"}
                          type="text"
                          label="Estado"
                          name="estado"
                          labelPlacement="outside"
                          placeholder=" "
                          variant="faded"
                          onChange={handleNameChange}
                          value={formulario.estado}
                          validationState={validationEstado}
                          required
                        />
                      </div>
                      <div className="md:col-span-4">
                        <Input
                          size={"sm"}
                          type="number"
                          label="Código Postal"
                          name="codigoPostal"
                          labelPlacement="outside"
                          placeholder=" "
                          variant="faded"
                          onChange={handleNameChange}
                          value={sucursalDatos.codigoPostal}
                        />
                      </div>
                      <div className="md:col-span-3">
                        <Input
                          size={"sm"}
                          type="number"
                          label="Telefono"
                          name="telefono"
                          labelPlacement="outside"
                          placeholder=" "
                          variant="faded"
                          onChange={handleNameChange}
                          value={formulario.telefono}
                          validationState={validationTel}
                          required
                        />
                      </div>
                      <div className="md:col-span-3">
                        <Input
                          size={"sm"}
                          type="email"
                          label="Email Sucursal"
                          name="emailSucursal"
                          labelPlacement="outside"
                          placeholder=" "
                          variant="faded"
                          onChange={handleNameChange}
                          value={sucursalDatos.emailSucursal}
                        />
                      </div>
                      <div className="md:col-span-3">
                        <Input
                          size={"sm"}
                          type="number"
                          label="Almacenes"
                          name="almacenes"
                          labelPlacement="outside"
                          placeholder=" "
                          variant="faded"
                          onChange={handleNameChange}
                          value={formulario.almacenes}
                          validationState={validationAlma}
                          required
                        />
                      </div>
                      <div className="md:col-span-3">
                        <Input
                          size={"sm"}
                          type="text"
                          label="R.F.C."
                          name="rfc"
                          labelPlacement="outside"
                          placeholder=" "
                          variant="faded"
                          onChange={handleNameChange}
                          value={sucursalDatos.rfc}
                        />
                      </div>
                      <div className="md:col-span-12">
                        <Input
                          size={"sm"}
                          type="text"
                          label="Geo URL de Google Maps"
                          name="geoUrlMaps"
                          labelPlacement="outside"
                          placeholder=" "
                          variant="faded"
                          onChange={handleNameChange}
                          value={sucursalDatos.geoUrlMaps}
                        />
                        <label
                          htmlFor="url"
                          className="text-default-400 text-small"
                        >
                          Capturar en Formato iFrame:
                          https://www.google.com/maps/xxxxxxxxxx
                        </label>
                      </div>
                      <div className="md:col-span-12">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            defaultSelected
                            size="sm"
                            id="webPageCheckbox"
                            checked={web}
                            onChange={(e) => setWeb(e.target.checked)}
                          />
                          <label htmlFor="webPageCheckbox">
                            Mostrar en página web
                          </label>
                        </div>
                      </div>
                      <div className="md:col-span-4">
                        <Input
                          size={"sm"}
                          type="number"
                          label="Límite de Credito M.N"
                          name="limiteCredito"
                          labelPlacement="outside"
                          placeholder=" "
                          variant="faded"
                          onChange={handleNameChange}
                          value={sucursalDatos.limiteCredito}
                        />
                      </div>
                      <div className="md:col-span-12"></div>
                      <div className="md:col-span-12 flex space-x-5">
                        <Textarea
                          label="Encabezado ticket POS(HTML)"
                          labelPlacement="outside"
                          placeholder=""
                          className="max-w-xs"
                          value={sucursalDatos.encabezadoPos}
                          onChange={(e) =>
                            setSucursalDatos({
                              ...sucursalDatos,
                              encabezadoPos: e.target.value,
                            })
                          }
                        />
                        <Textarea
                          label="Nota para envíos ticket POS(HTML)"
                          labelPlacement="outside"
                          placeholder=""
                          className="max-w-xs"
                          value={sucursalDatos.notaEnviosPos}
                          onChange={(e) =>
                            setSucursalDatos({
                              ...sucursalDatos,
                              notaEnviosPos: e.target.value,
                            })
                          }
                        />
                        <Textarea
                          label="Nota ticket POS(HTML)"
                          labelPlacement="outside"
                          placeholder=""
                          className="max-w-xs"
                          value={sucursalDatos.notaTicketPos}
                          onChange={(e) =>
                            setSucursalDatos({
                              ...sucursalDatos,
                              notaTicketPos: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <Spacer y={10} />
                </div>
                <div className="md:col-span-12 flex justify-end">
                  <div className="flex justify-end space-x-5 mt-10">
                    <Button
                      className="min-w-[200px]"
                      color="success"
                      type="submit"
                      endContent={<MdSave />}
                      onClick={handleGuardar}
                      // disabled={showFormulario}
                    >
                      Guardar
                    </Button>
                    <Button
                      className="min-w-[200px]"
                      color="warning"
                      type="submit"
                      onClick={() => navigate("/Settings/BranchOffices")}
                    >
                      Regresar
                    </Button>
                  </div>
                  <Spacer y={3} />
                </div>
              </form>
              <Spacer y={25} />
              {showConfirmationModal && (
                <Modal
                  size={size}
                  isOpen={showConfirmationModal}
                  onClose={handleReturnToMainPage}
                >
                  <ModalContent>
                    {(onClose) => (
                      <>
                        <ModalHeader className="flex flex-col gap-1"></ModalHeader>
                        <ModalBody>
                          <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-12 space-x-4 space-y-4">
                            <div className="md:col-span-12"></div>
                            <div className="md:col-span-12">
                              <h2>¿Desea agregar Almacenes?</h2>
                            </div>
                          </div>
                        </ModalBody>
                        <ModalFooter>
                          <Button
                            color="primary"
                            onClick={() => {
                              setShowConfirmationModal(false);
                              setIsAddingAlmacenes(true);
                            }}
                          >
                            Si
                          </Button>
                          <Button color="danger" onClick={onClose}>
                            No
                          </Button>
                        </ModalFooter>
                      </>
                    )}
                  </ModalContent>
                </Modal>
              )}
              {isAddingAlmacenes && (
                <div style={{ marginLeft: "20px", marginRight: "20px" }}>
                  <div>
                    <div className="flex justify-end space-x-5 mt-10">
                      <Button
                        size="sm"
                        color="primary"
                        endContent={<TbPlus />}
                        onClick={handleCreate}
                      >
                        Crear Nuevo Almacén
                      </Button>
                    </div>
                  </div>
                  <Spacer y={3} />
                  <Table
                    aria-label="Example table with custom cells, pagination and sorting"
                    isHeaderSticky
                    bottomContentPlacement="outside"
                    selectedKeys={selectedKeys}
                    selectionMode="multiple"
                    sortDescriptor={sortDescriptor}
                    topContentPlacement="outside"
                    onSelectionChange={setSelectedKeys}
                    onSortChange={setSortDescriptor}
                  >
                    <TableHeader columns={headerColumns}>
                      {(column) => (
                        <TableColumn
                          key={column.uid}
                          align={column.uid === "actions" ? "center" : "start"}
                          allowsSorting={column.sortable}
                        >
                          {column.name}
                        </TableColumn>
                      )}
                    </TableHeader>
                    <TableBody
                      emptyContent={"No se encuentran Sucursales"}
                      items={sortedItems}
                    >
                      {data2.map((dato, index) => (
                        <TableRow key={dato.id}>
                          {(columnKey) => (
                            <TableCell>{renderCell(dato, columnKey)}</TableCell>
                          )}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <Modal size={size} isOpen={isOpen} onClose={onClose}>
                    <ModalContent>
                      {(onClose) => (
                        <>
                          <ModalHeader className="flex flex-col gap-1">
                            {modalMode === "create" && "Crear Nuevo Almacén"}
                            {modalMode === "edit" && "Editar Almacén"}
                          </ModalHeader>
                          <ModalBody>
                            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-12 space-x-4 space-y-4">
                              <div className="md:col-span-12"></div>
                              <div className="md:col-span-12">
                                <Input
                                  id="nombre"
                                  value={
                                    modalMode === "edit"
                                      ? formData.nombre
                                      : modalMode === "create"
                                      ? formData.nombre
                                      : ""
                                  }
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      nombre: e.target.value,
                                    })
                                  }
                                  size={"sm"}
                                  type="text"
                                  label="Nombre"
                                  name="nombre"
                                  labelPlacement="outside"
                                  placeholder=" "
                                  variant="faded"
                                />
                              </div>
                              <div className="md:col-span-12">
                                <Input
                                  id="tipo"
                                  value={
                                    modalMode === "edit"
                                      ? formData.tipo
                                      : modalMode === "create"
                                      ? formData.tipo
                                      : ""
                                  }
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      tipo: e.target.value,
                                    })
                                  }
                                  size={"sm"}
                                  type="text"
                                  label="Tipo"
                                  name="tipo"
                                  labelPlacement="outside"
                                  placeholder=" "
                                  variant="faded"
                                />
                              </div>
                            </div>
                          </ModalBody>
                          <ModalFooter>
                            {
                              <Button color="primary" onClick={handleSubmit}>
                                {modalMode === "edit"
                                  ? "Guardar Cambios"
                                  : "Crear"}
                              </Button>
                            }
                            <Button color="danger" onPress={onClose}>
                              Cerrar
                            </Button>
                          </ModalFooter>
                        </>
                      )}
                    </ModalContent>
                  </Modal>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
export default NewBranch;
