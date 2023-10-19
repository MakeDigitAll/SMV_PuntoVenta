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
  User,
  Checkbox,
} from "@nextui-org/react";
import { TbDotsVertical, TbPlus, TbReload } from "react-icons/tb";
import {
  MdArrowDropDown,
  MdBook,
  MdBookmarkAdded,
  MdCategory,
  MdList,
  MdMoneyOffCsred,
  MdSave,
  MdSearch,
  MdShoppingCart,
  MdStore,
  MdTag,
  MdWarehouse,
} from "react-icons/md";

import ItemsHeader from "../../components/header/itemsHeader/ItemsHeader";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { RiDashboard2Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import AddExcelCategories from "../Excel/addExcel/addExcelCategories";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "Nombre", uid: "nombre", sortable: true },
  { name: "Sku", uid: "sku", sortable: true },
  { name: "Acciones", uid: "Actions" },
];

const INITIAL_VISIBLE_COLUMNS = ["id", "nombre", "sku", "Actions"];

const Categories = () => {
  const marcaOptions = [];
  function contarmarca() {
    for (let i = 0; i < data.length; i++) {
      marcaOptions.push({ name: data[i].nombre, uid: data[i].id });
    }
  }
  const [data, setData] = useState([]);
  async function loadTask() {
    try {
      const response = await fetch(
        "https://localhost:4000/Categoria"
      );
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
  const [filterValue2, setFilterValue2] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [statusFilter2, setStatusFilter2] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "age",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);
  const hasSearchFilter2 = Boolean(filterValue2);

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
    if (hasSearchFilter2) {
      filteredUsers = filteredUsers.filter((data) =>
        data.sku.toString().includes(filterValue2.toString())
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
    if (
      statusFilter2 !== "all" &&
      Array.from(statusFilter2).length !== statusOptions.length
    ) {
      filteredUsers = filteredUsers.filter((data) =>
        Array.from(statusFilter2).includes(data.sku)
      );
    }

    return filteredUsers;
  }, [
    data,
    hasSearchFilter,
    hasSearchFilter2,
    statusFilter,
    statusFilter2,
    filterValue,
    filterValue2,
  ]);

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

  //Modal
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [modalMode, setModalMode] = useState("create");
  const [setSelectedData] = useState(null);
  const [datosCrear, setDatosCrear] = useState({
    nombre: "",
    sku: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatosCrear({ ...datosCrear, [name]: value });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleCreateClick = () => {
    setModalMode("create");
    onOpen();
    setDatosCrear({
      nombre: "",
      sku: "",
    });
  };

  const handleVer = (item) => {
    setModalMode("view");
    const selectedItem = data.find((entry) => entry.id === item);
    setSelectedData(selectedItem);
    onOpen(); // Abrir el modal
  };

  const handleEditar = () => {
    setModalMode("edit");
    onOpen(); // Abrir el modal
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(datosCrear);
    if (!datosCrear.nombre || isNaN(datosCrear.sku)) {
      toast.warning("El campo SKU debe ser un número válido", {
        theme: "colored",
      });
      return;
    }

    const updatedData = {
      //Crear
      nombre: datosCrear.nombre,
      sku: parseFloat(datosCrear.sku),
    };
    try {
      if (modalMode === "create") {
        // Crear nuevo elemento
        const response = await fetch(
          "https://localhost:4000/Categoria",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedData),
          }
        );

        if (response.ok) {
          // La solicitud fue exitosa, puedes mostrar un mensaje o realizar otras acciones
          toast.success("Elemento creado exitosamente", { theme: "colored" });
          loadTask();
        } else {
          // Si la solicitud no es exitosa, maneja el error
          console.error("Error al crear el elemento", response.statusText);
          // Puedes mostrar un mensaje de error al usuario si es necesario
        }
      }
    } catch (error) {
      toast.error("Error al Guardar", { theme: "colored" });
      // Manejar el error, mostrar un mensaje al usuario, etc.
    }
  };

  const renderCell = React.useCallback((data, columnKey) => {
    const cellValue = data[columnKey];

    switch (columnKey) {
      case "Nombre":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{data.nombre}</p>
          </div>
        );
      case "Sku":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{data.sku}</p>
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
                <DropdownItem onPress={() => handleVer(data.id)}>
                  View
                </DropdownItem>
                <DropdownItem onPress={handleEditar}>Edit</DropdownItem>
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

  const onSearchChange2 = React.useCallback((value2) => {
    if (value2) {
      setFilterValue2(value2);
      setPage(1);
    } else {
      setFilterValue2("");
    }
  }, []);

  const onClear2 = useCallback(() => {
    setFilterValue2("");
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
              <MdCategory sx={{ mr: 0.5 }} fontSize="inherit" />
              Categorías
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
              placeholder="Nombre"
              startContent={<MdSearch />}
              value={filterValue}
              onClear={() => onClear()}
              onValueChange={onSearchChange}
            />
          </div>
          <Input
            isClearable
            size="sm"
            className="w-[450px] sm:max-w-[44%]"
            placeholder="SKU"
            startContent={<MdSearch />}
            value={filterValue2}
            onClear={() => onClear2()}
            onValueChange={(newValue) => onSearchChange2(newValue)}
          />
          <div className="flex flex-wrap place-content-end space-x-2">
            <AddExcelCategories />
            <Button size="sm" color="warning" endContent={<TbReload />}>
              Actualizar Categorías
            </Button>
            <Button
              size="sm"
              color="primary"
              endContent={<TbPlus />}
              onClick={handleCreateClick}
            >
              Nueva Categoría
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
            Categorías por página:
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
    filterValue2,
    handleCreateClick,
    visibleColumns,
    onRowsPerPageChange,
    navigate,
    onClear,
    onClear2,
    onSearchChange2,
  ]);
  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          <span style={{ marginRight: "30px" }}>
            {data.length} Categorías en total
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
          emptyContent={"No se encuentran Categorías"}
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
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        size="3xl"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                {modalMode === "create" && "Crear Categoría"}
                {modalMode === "edit" && "Editar Categoría"}
                {modalMode === "view" && "Ver Categoría"}
              </ModalHeader>
              <ModalBody>
                <div className="rounded px-4 md:p-8 mb-6">
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-1">
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-12 space-x-4 space-y-4 content-end">
                      <div className="md:col-span-6"></div>
                      <div className="md:col-span-12">
                        <Input
                          autoFocus
                          endContent={
                            <MdCategory className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                          }
                          label="Nombre de Categoría"
                          isRequired
                          type="text"
                          placeholder=" "
                          variant="bordered"
                          name="nombre"
                          onChange={handleChange}
                          disabled={modalMode === "view"} // Deshabilitar input en modo "ver"
                        />
                      </div>
                      <div className="md:col-span-12">
                        <Input
                          endContent={
                            <MdBook className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                          }
                          label="Sku"
                          isRequired
                          placeholder=" "
                          type="number"
                          variant="bordered"
                          name="sku"
                          onChange={handleChange}
                          disabled={modalMode === "view"} // Deshabilitar input en modo "ver"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-2"></div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cerrar
                </Button>
                <Button
                  endContent={<MdSave />}
                  color="primary"
                  onClick={handleSubmit}
                >
                  Guardar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Categories;
