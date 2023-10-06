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
  Select,
  SelectItem,
} from "@nextui-org/react";
import { TbDotsVertical, TbPlus, TbReload } from "react-icons/tb";
import {
  MdArrowDropDown,
  MdSearch,
  MdStore,
  MdWarehouse,
} from "react-icons/md";

import ItemsHeader from "../../components/header/ItemsHeader/ItemsHeader";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { RiDashboard2Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import NewEntry from "./NewEntry";

const columns = [
  { name: "Folio", uid: "Folio", sortable: true },
  { name: "Fecha", uid: "Fecha", sortable: true },
  { name: "CodEmp.", uid: "CodEmp", sortable: true },
  { name: "Producto", uid: "Producto", sortable: true },
  { name: "Cantidad", uid: "Cantidad", sortable: true },
  { name: "Sucursal/Almacén", uid: "SucursalAlmacen", sortable: true },
  { name: "Tipo", uid: "Tipo", sortable: true },
  { name: "Motivo", uid: "Motivo", sortable: true },
  { name: "Acciones", uid: "Actions" },
];

const INITIAL_VISIBLE_COLUMNS = [
  "Folio",
  "Fecha",
  "CodEmp",
  "Producto",
  "Cantidad",
  "SucursalAlmacen",
  "Tipo",
  "Motivo",
  "Actions",
];

const WarehouseEntries = () => {
  const marcaOptions = [];
  function contarmarca() {
    for (let i = 0; i < data.length; i++) {
      marcaOptions.push({ name: data[i].sucursalAlmacen, uid: data[i].id });
    }
  }
  const [data, setData] = useState([]);
  async function loadTask() {
    try {
      const response = await fetch("http://localhost:4000/ListadoEntradas");
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
  function handleClickBreadCrumbs(event) {
    event.preventDefault();
  }
  const navigate = useNavigate();
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "age",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const tipoOptions = data.map((item) => item.tipo.toLowerCase());
  const [selectedTipo, setSelectedTipos] = useState("");

  const handleTipoChange = (event) => {
    setSelectedTipos(event.target.value);
  };
  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...data];

    if (selectedTipo) {
      const selectedTipoLower = selectedTipo.toLowerCase();
      filteredUsers = filteredUsers.filter(
        (data) => data.tipo.toLowerCase() === selectedTipoLower
      );
    }

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((data) =>
        data.producto.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredUsers = filteredUsers.filter((data) =>
        Array.from(statusFilter).includes(data.producto)
      );
    }

    return filteredUsers;
  }, [data, hasSearchFilter, statusFilter, filterValue,selectedTipo]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

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
  ///Modal Constantes y Funciones
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [size, setSize] = React.useState("lg");
  const sizes = ["md", "lg", "xl", "2xl", "3xl"];
  const [modalMode, setModalMode] = useState("create"); //
  const handleOpen = (size) => {
    setSize(size);
    onOpen();
  };
  const [datosEdit, setDatosEdit] = useState({
    folio: "",
    fecha: "",
    codigoEmpresa: "",
    producto: "",
    cantidad: "",
    sucursalAlmacen: "",
    tipo: "",
    motivo: "",
  });
  const handleCreateClick = () => {
    setModalMode("create");
    onOpen();
    setDatosEdit({
      folio: "",
      fecha: "",
      codigoEmpresa: "",
      producto: "",
      cantidad: "",
      sucursalAlmacen: "",
      tipo: "",
      motivo: "",
    });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatosEdit((prevDatosEdit) => ({
      ...prevDatosEdit,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = {
      //Crear
      folio: datosEdit.folio,
      fecha: datosEdit.fecha,
      codigoEmpresa: datosEdit.codigoEmpresa,
      producto: datosEdit.producto,
      cantidad: datosEdit.cantidad,
      sucursalAlmacen: datosEdit.sucursalAlmacen,
      tipo: datosEdit.tipo,
      motivo: datosEdit.motivo,
    };

    try {
      if (modalMode === "create") {
        // Crear nuevo elemento
        const response = await fetch("http://localhost:4000/ListadoEntradas", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        });

        if (response.ok) {
          // La solicitud fue exitosa, puedes mostrar un mensaje o realizar otras acciones
          console.log("Elemento creado exitosamente");
          onClose(true);
          window.location.reload();
        } else {
          // Si la solicitud no es exitosa, maneja el error
          console.error("Error al crear el elemento:", response.statusText);
          // Puedes mostrar un mensaje de error al usuario si es necesario
        }
      }
    } catch (error) {
      console.error("Error en la solicitud POST:", error);
      // Manejar el error, mostrar un mensaje al usuario, etc.
    }
  };


  const renderCell = React.useCallback((data, columnKey) => {
    const cellValue = data[columnKey];

    switch (columnKey) {
      case "Folio":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{data.folio}</p>
          </div>
        );
      case "Fecha":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{data.fecha}</p>
          </div>
        );
      case "CodEmp":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">
              {data.codigoEmpresa}
            </p>
          </div>
        );

      case "Producto":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{data.producto}</p>
          </div>
        );
      case "Cantidad":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{data.cantidad}</p>
          </div>
        );
      case "SucursalAlmacen":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">
              {data.sucursalAlmacen}
            </p>
          </div>
        );
      case "Tipo":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{data.tipo}</p>
          </div>
        );
      case "Motivo":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{data.motivo}</p>
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
                <DropdownItem onClick={()=>navigate('/Store/WarehouseOutputs/NewEntry')}>View</DropdownItem>
                <DropdownItem >Edit</DropdownItem>
                <DropdownItem>Delete</DropdownItem>
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
              <MdWarehouse sx={{ mr: 0.5 }} fontSize="inherit" />
              Entradas de Almacén
            </Typography>
          </Breadcrumbs>
        </div>
        <div
          className="flex flex-col gap-4"
          style={{ marginLeft: "10px", marginRight: "10px" }}
        >
          <div className="flex flex-wrap place-content-start space-x-6 space-y-1 ">
            <Input
              isClearable
              size="sm"
              className="w-[450px] sm:max-w-[44%]"
              placeholder="Producto"
              startContent={<MdSearch />}
              value={filterValue}
              onClear={() => onClear()}
              onValueChange={onSearchChange}
            />
            <div className="w-[300px] sm:max-w-[44%]">
                <Select
                  labelPlacement={"outside"}
                  label=""
                  placeholder="Tipo"
                  size="sm"
                  value={selectedTipo}
                  onChange={handleTipoChange}
                >
                  {tipoOptions.map((tipoOption) => (
                    <SelectItem key={tipoOption} value={tipoOption}>
                      {tipoOption}
                    </SelectItem>
                  ))}
                </Select>
              </div>
          </div>
          <div className="flex flex-wrap place-content-end space-x-2">
            <Button
              size="sm"
              color="warning"
              endContent={<TbReload />}
              onClick={() =>
                navigate("/Store/WarehouseEntries/CatalogueofMotifs")
              }
            >
              Catálogo de Motivos
            </Button>
            <Button
              size="sm"
              color="primary"
              endContent={<TbPlus />}
              onClick={handleCreateClick}
            >
              Nueva Entrada Manual
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
          <label className="flex items-center text-default-400 text-small">
            Entradas Almacén por página:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
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
    statusFilter,
    visibleColumns,
    onRowsPerPageChange,
    navigate,
    onClear,
  ]);
  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          <span style={{ marginRight: "30px" }}>
            {data.length} Entradas de Almacén en total
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
        selectedKeys={selectedKeys}
        selectionMode="multiple"
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
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={"No se encuentran Entradas de Almacén"}
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
      <Modal size={size} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {modalMode === "create" && "Nuevo Motivo"}
              </ModalHeader>
              <ModalBody>
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-12 space-x-4 space-y-4">
                  <div className="md:col-span-12"></div>
                  <div className="md:col-span-6">
                    <Input
                      id="folio"
                      value={modalMode === "create" ? datosEdit.folio : ""}
                      onChange={handleChange}
                      size={"sm"}
                      type="number"
                      label="Folio*"
                      name="folio"
                      labelPlacement="outside"
                      placeholder=" "
                      variant="faded"
                    />
                  </div>
                  <div className="md:col-span-6">
                    <Input
                      size={"sm"}
                      type="date"
                      label="Fecha*"
                      id="fecha"
                      name="fecha"
                      value={modalMode === "create" ? datosEdit.fecha : ""}
                      onChange={handleChange}
                      labelPlacement="outside"
                      placeholder=" "
                      variant="faded"
                    />
                  </div>
                  <div className="md:col-span-6">
                    <Input
                      size={"sm"}
                      type="number"
                      label="Código Empresa*"
                      id="codigoEmpresa"
                      name="codigoEmpresa"
                      value={
                        modalMode === "create" ? datosEdit.codigoEmpresa : ""
                      }
                      onChange={handleChange}
                      labelPlacement="outside"
                      placeholder=" "
                      variant="faded"
                    />
                  </div>
                  <div className="md:col-span-6">
                    <Input
                      size={"sm"}
                      type="text"
                      label="Producto*"
                      id="producto"
                      name="producto"
                      value={modalMode === "create" ? datosEdit.producto : ""}
                      onChange={handleChange}
                      labelPlacement="outside"
                      placeholder=" "
                      variant="faded"
                    />
                  </div>
                  <div className="md:col-span-6">
                    <Input
                      size={"sm"}
                      type="number"
                      label="Cantidad*"
                      id="cantidad"
                      name="cantidad"
                      value={modalMode === "create" ? datosEdit.cantidad : ""}
                      onChange={handleChange}
                      labelPlacement="outside"
                      placeholder=" "
                      variant="faded"
                    />
                  </div>
                  <div className="md:col-span-6">
                    <Input
                      size={"sm"}
                      type="text"
                      label="Sucursal/Almacén*"
                      id="sucursalAlmacen"
                      name="sucursalAlmacen"
                      value={
                        modalMode === "create" ? datosEdit.sucursalAlmacen : ""
                      }
                      onChange={handleChange}
                      labelPlacement="outside"
                      placeholder=" "
                      variant="faded"
                    />
                  </div>
                  <div className="md:col-span-6">
                    <Input
                      size={"sm"}
                      type="text"
                      label="Tipo*"
                      id="tipo"
                      name="tipo"
                      value={modalMode === "create" ? datosEdit.tipo : ""}
                      onChange={handleChange}
                      labelPlacement="outside"
                      placeholder=" "
                      variant="faded"
                    />
                  </div>
                  <div className="md:col-span-6">
                    <Input
                      size={"sm"}
                      type="text"
                      label="Motivo*"
                      id="motivo"
                      name="motivo"
                      value={modalMode === "create" ? datosEdit.motivo : ""}
                      onChange={handleChange}
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
                    {modalMode === "create" ? "Crear" : "Guardar Cambios"}
                  </Button>
                }
                <Button color="danger" variant="light" onPress={onClose}>
                  Cerrar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default WarehouseEntries;
