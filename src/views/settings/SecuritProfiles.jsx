import React, { useCallback, useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Pagination,
  Spacer,
} from "@nextui-org/react";
import { format } from "timeago.js";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Checkbox,
} from "@nextui-org/react";
import { TbDotsVertical, TbPlus, TbReload } from "react-icons/tb";
import {
  MdAlignHorizontalCenter,
  MdArrowDropDown,
  MdCreditCard,
  MdFilterList,
  MdImportContacts,
  MdMonetizationOn,
  MdPriceChange,
  MdPriceCheck,
  MdSearch,
  MdSecurity,
} from "react-icons/md";
import ItemsHeader from "../../components/header/itemsHeader/ItemsHeader";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import {
  RiDashboard2Fill,
  RiListOrdered,
  RiSdCardFill,
  RiUser2Fill,
} from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import axios from "axios";
const columns = [
  { name: "ID", uid: "id" },
  { name: "Nombre del Perfil", uid: "nombrePerfil", sortable: true },
  { name: "Usuarios", uid: "usuarios", sortable: true },
  { name: "Acciones", uid: "Actions", sortable: true },
];

const INITIAL_VISIBLE_COLUMNS = ["id", "nombrePerfil", "usuarios", "Actions"];

const SecuritProfiles = () => {
  const [data, setData] = useState([]);
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [updatedData, setUpdatedData] = useState([]);

  function handleClickBreadCrumbs(event) {
    event.preventDefault();
  }
  const navigate = useNavigate();
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "age",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);

  const pages = Math.ceil(data.length / rowsPerPage);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...data];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter(
        (user) =>
          user.folio.toLowerCase().includes(filterValue.toLowerCase()) +
          user.fecha.toLowerCase().includes(filterValue.toLocaleLowerCase()) +
          user.clientes.toLowerCase().includes(filterValue.toLocaleLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== data.length
    ) {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(statusFilter).includes(user.email)
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

  const [task, setTask] = useState({
    id: "",
    nombrePerfil: "",
    usuarios: "",
  });

  const [errors, setErrors] = useState({
    nombrePerfil: "",
    usuarios: "",
  });

  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const [modeModal, setModeModal] = useState("create", "edit", "view");
  const [updateCounter, setUpdateCounter] = useState(0);
  const [editCounter, setEditCounter] = useState(0); // Paso 1
  const [disableCounter, setDisableCounter] = useState(0); // Paso 1

  async function loadTask() {
    try {
      const response = await fetch(`http://localhost:4000/PerfilesSeguridad`);
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
  }, [updateCounter, editCounter, disableCounter]);

  const [showButton, setShowButton] = useState(false);

  const handleCreate = () => {
    setModeModal("create");
    setShowButton(true);
    onOpen();
  };

  const handleView = (id) => {
    setModeModal("view");
    setIsInputDisabled(true);
    async function viewModal() {
      try {
        const response = await fetch(
          `http://localhost:4000/PerfilesSeguridad/${id}`
        );
        const data = await response.json();
        if (response.ok) {
          setTask({
            id: data.id,
            nombrePerfil: data.nombrePerfil,
            usuarios: data.usuarios,
          });
          setShowButton(false);
          onOpen();
        }
      } catch (err) {
        toast.error("Error al cargar los datos", {
          position: "bottom-right",
          theme: "colored",
        });
      }
    }
    viewModal();
  };

  const handleEdit = (id) => {
    setModeModal("edit");
    setIsInputDisabled(false);
    async function editModal() {
      try {
        const response = await fetch(
          `http://localhost:4000/PerfilesSeguridad/${id}`
        );
        const data = await response.json();
        if (response.ok) {
          setTask({
            id: data.id,
            nombrePerfil: data.nombrePerfil,
            usuarios: data.usuarios,
          });
          setShowButton(true);
          onOpen();
        }
      } catch (err) {
        toast.error("Error al cargar los datos", {
          position: "bottom-right",
          theme: "colored",
        });
      }
    }
    editModal();
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const newErrors = {};

    if (!task.nombrePerfil) {
      newErrors.nombrePerfil =
        "El Campo Nombre del Perfil de Seguridad es Obligatorio";
      toast.error("El Campo Nombre del Perfil de Seguridad es Obligatorio", {
        position: "bottom-right",
        theme: "colored",
      });
      return;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const datosListado = {
        nombre: task.nombrePerfil,
      };
      const res = await fetch(`http://localhost:4000/PerfilesSeguridad`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datosListado),
      });
      if (res.ok) {
        toast.success("Perfil de Seguridad guardado", {
          position: "bottom-right",
          theme: "colored",
        });
        onClose(true);
        setUpdateCounter((prevCounter) => prevCounter + 1);
      } else {
        console.error("Error al crear el elemento", res.statusText);
      }
    } catch (error) {
      toast.error("Error al guardar los datos", {
        position: "bottom-right",
        theme: "colored",
      });
    }
  }

  async function handleEditing(e) {
    e.preventDefault();

    const newErrors = {};

    if (!task.nombrePerfil) {
      newErrors.nombrePerfil =
        "El Campo Nombre del Perfil de Seguridad es Obligatorio";
      toast.error("El Campo Nombre del Perfil de Seguridad es Obligatorio", {
        position: "bottom-right",
        theme: "colored",
      });
      return;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const datosListado = {
      id: task.id,
      nombre: task.nombrePerfil,
    };
    async function edit() {
      try {
        const res = await fetch(
          `http://localhost:4000/PerfilesSeguridad/${datosListado.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(datosListado),
          }
        );
        if (res.ok) {
          toast.success("Perfil de Seguridad Editado Correctamente", {
            position: "bottom-right",
            theme: "colored",
          });
          onClose(true);
          setEditCounter((prevCounter) => prevCounter + 1);
        } else {
          toast.error("Error al actualizar el perfil de seguirdad", {
            position: "bottom-right",
            theme: "colored",
          });
        }
      } catch (err) {
        toast.error("Error al cargar los datos", {
          position: "bottom-right",
          theme: "colored",
        });
      }
    }
    edit();
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({
      ...task,
      [name]: value,
    });
    // Limpia el mensaje de error cuando el usuario comienza a escribir en el campo
    setErrors({
      ...errors,
      [name]: "", // Esto eliminará el mensaje de error correspondiente
    });
  };

  async function handleDisable(id) {
    try {
      const res = await fetch(`http://localhost:4000/PerfilesSeguridad/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(),
      });
      if (res.ok) {
        toast.warning("Deshabilitando Perfil de Seguirdad", {
          position: "bottom-right",
          theme: "colored",
        });
        setDisableCounter((prevCounter) => prevCounter + 1);
      }
    } catch (error) {
      toast.error("Error al deshabilitar el perfil de seguridad", {
        position: "bottom-right",
        theme: "colored",
      });
    }
  }

  const renderCell = React.useCallback((data, columnKey) => {
    const cellValue = data[columnKey];
    switch (columnKey) {
      case "id":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{data.id}</p>
          </div>
        );
      case "fecha":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">
              {format(data.fecha)}
            </p>
          </div>
        );
      case "folio":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{data.folio}</p>
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
                <DropdownItem onPress={() => handleView(data.id)}>
                  Ver Perfil de Seguridad
                </DropdownItem>
                <DropdownItem onPress={() => handleEdit(data.id)}>
                  Editar Perfil de Seguridad
                </DropdownItem>
                <DropdownItem
                  className="text-danger"
                  onPress={() => handleDisable(data.id)}
                >
                  Deshabilitar Perfil de Seguridad
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <>
        <ItemsHeader />
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
        <div
          role="presentation"
          onClick={handleClickBreadCrumbs}
          className="text-foreground"
        >
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
            <Typography
              sx={{ display: "flex", alignItems: "center" }}
              className="text-foreground"
            >
              <MdSecurity sx={{ mr: 0.5 }} fontSize="inherit" />
              Listado de Perfiles de Seguridad
            </Typography>
          </Breadcrumbs>
        </div>
        <div
          className="flex flex-col gap-4"
          style={{ marginLeft: "10px", marginRight: "10px" }}
        >
          <Spacer y={8} />
          <div className="flex flex-wrap place-content-end space-x-2">
            <Button
              size="sm"
              color="primary"
              onPress={() =>
                navigate("/Settings/SecuritProfiles/ConfigureAccess")
              }
            >
              Boton prueba
            </Button>
            <Button
              onPress={handleCreate}
              size="sm"
              color="primary"
              endContent={<TbPlus />}
            >
              Nuevo Perfil
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex flex-wrap text-small space-x-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  size="sm"
                  endContent={<MdArrowDropDown className="text-small" />}
                  variant="flat"
                >
                  Columnas
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {column.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<MdArrowDropDown className="text-small" />}
                  variant="flat"
                  size="sm"
                >
                  Acciones
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {column.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
          <label className="flex items-center text-small">
            Perfiles de seguridad página:
            <select
              className="bg-transparent outline-none text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </>
    );
  }, [
    filterValue,
    onSearchChange,
    visibleColumns,
    onRowsPerPageChange,
    navigate,
    onClear,
  ]);
  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small">
          <span style={{ marginRight: "30px" }}>
            {data.length} Perfiles en total
          </span>
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${data.length} selected`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          classNames={{
            cursor: "bg-foreground text-background",
          }}
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [data.length, selectedKeys, page, pages, onPreviousPage, onNextPage]);

  return (
    <div style={{ marginLeft: "40px", marginRight: "40px" }}>
      <Table
        aria-label="Example table with custom cells, pagination and sorting"
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "max-h-[382px]",
        }}
        selectedKeys={selectedKeys}
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={"center"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={"No Securit Profiles found"}
          items={sortedItems}
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <form
                onChange={handleChange}
                onSubmit={modeModal == "create" ? handleSubmit : handleEditing}
              >
                <ModalHeader className="flex flex-col gap-1">
                  {modeModal === "create" && "Nuevo Perfil de Seguridad"}
                  {modeModal === "edit" && "Editar Perfil de Seguridad"}
                  {modeModal === "view" && "Detalles del Perfil de Seguridad"}
                </ModalHeader>
                <ModalBody>
                  <Input
                    id="nombre"
                    name="nombreForma"
                    value={
                      modeModal !== "create" ? task.nombreForma : undefined
                    }
                    onChange={handleChange}
                    label="Nombre del Perfil de Seguridad"
                    placeholder="Ventas"
                    variant="bordered"
                    isDisabled={isInputDisabled}
                    required
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Cerrar
                  </Button>
                  {showButton && (
                    <Button id="BtnGuardar" color="primary">
                      Guardar
                    </Button>
                  )}
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default SecuritProfiles;
