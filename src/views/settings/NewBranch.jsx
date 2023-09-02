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
  import { useRef, useState } from "react";
  import { ToastContainer, toast } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";
  import Header from "../../components/header/headerC/Header.jsx";
  //import ProfileImageUpload from "../user/ProfilesImagenUploads.tsx";
  import { Breadcrumbs, Typography } from "@mui/material";
  import { RiDashboard2Fill} from "react-icons/ri";
  import { MdAddHome, MdAllInbox,MdSettings} from "react-icons/md";
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
  
  const INITIAL_VISIBLE_COLUMNS = [
    "Nombre",
    "Tipo",
    "Actions",
  ];

  const NewBranch = () => {
    const [user, setUser] = useState({
      
    });

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
    
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [size, setSize] = React.useState("md");
  const sizes = ["md", "lg", "xl", "2xl", "3xl"];
  const [editingItem, setEditingItem] = useState({ id: "", nombre: "", tipo: "" });
  const [modalMode, setModalMode] = useState("create");
  const [formData, setFormData] = useState({
    nombre: "",
    tipo: "",
  });

  const handleCreate = () => {
    setModalMode("create");
    onOpen();
    const newData = {
        nombre: formData.nombre,
        tipo: formData.tipo,
      };
    setData([...data, newData]);
    setFormData({
      nombre: "",
      tipo: "",
    });
    
}
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleEdit = (itemId) => {
    const selectedItem = data.find((item) => item.id === itemId);
    console.log(selectedItem);
  if (selectedItem) {
    // Configura el estado del formulario modal con los datos del elemento seleccionado
    setFormData({
      nombre: selectedItem.nombre,
      tipo: selectedItem.tipo,
    });

    // Abre el modal
    setModalMode("edit");
    onOpen();
  } else {
    console.error("Elemento no encontrado");
  }
};
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData2 = {
      //Editar y crear
      nombre: formData.nombre,
      tipo: formData.tipo,
    };
    console.log(updatedData2);
    try {
      if (modalMode === "create") {
        // Crear nuevo elemento
        const response = await fetch("http://localhost:4000/Almacenes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData2),
        });
      } else if (modalMode === "edit") {
        // Editar elemento existente
        const response = await fetch(
          `http://localhost:4000/Almacenes/${editingItem.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedData2),
          }
        );
      }
      if (response.ok) {
        // Si la operación de creación o edición fue exitosa, actualiza la tabla
        await loadTask();
        setFormData({
          nombre: "",
          tipo: "",
        });
        onClose(true); // Cierra el modal
      } else {
        console.error("Error en la solicitud HTTP.");
      }
    } catch (error) {
      console.error("Error al realizar la operación:", error);
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
                    <DropdownItem onClick={()=>handleEdit(data.id)}>Editar Almacén</DropdownItem>
                    <DropdownItem>Deshabilitar Almacén</DropdownItem>
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
        <Header />
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
                          />
                        </div>
                        <div className="md:col-span-3">
                          <Input
                            size={"sm"}
                            type="text"
                            label="Gerente de la Sucursal"
                            name="gerenteSucursal"
                            labelPlacement="outside"
                            placeholder=" "
                            variant="faded"
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
                          />
                        </div>
                        <div className="md:col-span-4">
                          <Input
                            size={"sm"}
                            type="number"
                            label="Telefono"
                            name="telefono"
                            labelPlacement="outside"
                            placeholder=" "
                            variant="faded"
                          />
                        </div>
                        <div className="md:col-span-4">
                          <Input
                            size={"sm"}
                            type="email"
                            label="Email Sucursal"
                            name="emailSucursal"
                            labelPlacement="outside"
                            placeholder=" "
                            variant="faded"
                          />
                        </div>
                        <div className="md:col-span-4">
                          <Input
                            size={"sm"}
                            type="text"
                            label="R.F.C."
                            name="rfc"
                            labelPlacement="outside"
                            placeholder=" "
                            variant="faded"
                          />
                        </div>
                        <div className="md:col-span-12">
                          <Input
                            size={"sm"}
                            type="text"
                            label="Geo URL de Google Maps"
                            name="url"
                            labelPlacement="outside"
                            placeholder=" "
                            variant="faded"
                          />
                          <label
                            htmlFor="url"
                            className="text-default-400 text-small"
                          >
                            Capturar en Formato iFrame:
                            https://www.google.com/maps/embed?xxxxxxxxxx
                          </label>
                        </div>
                        <div className="md:col-span-12">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              defaultSelected
                              size="sm"
                              id="webPageCheckbox"
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
                            name="limiteCreditoM.N"
                            labelPlacement="outside"
                            placeholder=" "
                            variant="faded"
                          />
                        </div>
                        <div className="md:col-span-12"></div>
                        <div className="md:col-span-12 flex space-x-5">
                          <Textarea
                            label="Encabezado ticket POS(HTML)"
                            labelPlacement="outside"
                            placeholder=""
                            className="max-w-xs"
                          />
                          <Textarea
                            label="Nota para envíos ticket POS(HTML)"
                            labelPlacement="outside"
                            placeholder=""
                            className="max-w-xs"
                          />
                          <Textarea
                            label="Nota ticket POS(HTML)"
                            labelPlacement="outside"
                            placeholder=""
                            className="max-w-xs"
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
                      >
                        Guardar
                      </Button>
                      <Button
                        className="min-w-[200px]"
                        color="danger"
                        type="submit"
                      >
                        Cancelar
                      </Button>
                    </div>
                    <Spacer y={3} />
                  </div>
                </form>
                <Spacer y={25} />
                <div>
                  <div className="flex justify-end space-x-5 mt-10">
                    <Button size="sm" color="primary" endContent={<TbPlus />}
                     onClick={handleCreate}>
                      Crear Nuevo Almacén
                    </Button>
                  </div>
                </div>
                <Spacer y={3} />
                <div style={{ marginLeft: "20px", marginRight: "20px" }}>
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
                      {data.map((dato,index) => (
                        <TableRow key={index.id}>
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
                                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
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
                                  onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
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
                            { (
                              <Button color="primary" onClick={handleSubmit}>
                                {modalMode === "edit"
                                  ? "Guardar Cambios"
                                  : "Crear"}
                              </Button>
                            )}
                            <Button
                              color="danger"
                              onPress={onClose}
                            >
                              Cerrar
                            </Button>
                          </ModalFooter>
                        </>
                      )}
                    </ModalContent>
                  </Modal>
                </div>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  };
  export default NewBranch;
  