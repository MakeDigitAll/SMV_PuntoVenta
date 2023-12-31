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
} from "@nextui-org/react";
import { TbDotsVertical, TbPlus } from "react-icons/tb";
import { MdArrowDropDown, MdInbox, MdSearch } from "react-icons/md";

import ItemsHeader from "../../components/header/itemsHeader/ItemsHeader";
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

const columns = [
  { name: "Id", uid: "Id", sortable: true },
  { name: "Motivo", uid: "Motivo", sortable: true },
  { name: "Clase", uid: "Clase", sortable: true },
  { name: "Acciones", uid: "Actions" },
];

const INITIAL_VISIBLE_COLUMNS = ["Id", "Motivo", "Clase", "Actions"];

const CatalogueofMotifs = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [size, setSize] = React.useState("md");
  const sizes = ["md", "lg", "xl", "2xl", "3xl"];
  const [selectedMotivo, setSelectedMotivo] = useState(null);
  const handleOpen = (size) => {
    setSize(size);
    onOpen();
  };
  const [modalMode, setModalMode] = useState("create"); //

  const marcaOptions = [];
  function contarmarca() {
    for (let i = 0; i < data.length; i++) {
      marcaOptions.push({ name: data[i].motivo, uid: data[i].id });
    }
  }
  const [data, setData] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const response = await fetch("https://localhost:4000/MotivosEntrada");
      const fetchedData = await response.json();
      setData(fetchedData);
    } catch (error) {
      console.error("Error al cargar los datos:", error);
    }
  };

  async function loadTask() {
    try {
      const response = await fetch("https://localhost:4000/MotivosEntrada");
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

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...data];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((data) =>
        data.motivo.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredUsers = filteredUsers.filter((data) =>
        Array.from(statusFilter).includes(data.motivo)
      );
    }

    return filteredUsers;
  }, [data, hasSearchFilter, statusFilter, filterValue]);

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

  //  Modal Funciones
  const [selectedData, setSelectedData] = useState(null);
  const [datosEdit, setDatosEdit] = useState({
    id: "",
    motivo: "",
    clase: "",
  });
  const handleCreateClick = () => {
    setModalMode("create");
    onOpen();
    setDatosEdit({
      motivo: "",
      clase: "",
    });
  };
  const [formData, setFormData] = useState({
    motivo: "",
    clase: "",
    DateModification:new Date(),
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    const currentDate=new Date();
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
      DateModification:currentDate,
    }));
    setDatosEdit((prevDatosEdit) => ({
      ...prevDatosEdit,
      [name]: value,
    }));
  };

  const [editingItem, setEditingItem] = useState(null);

  const handleView = (item) => {
    setModalMode("view"); 
    const selectedItem = data.find((entry) => entry.id === item);
    setSelectedData(selectedItem);
    onOpen(); // Abrir el modal
  };

  const handleEdit = (item) => {
    onOpen();
     
    
     setModalMode("edit"); // Establecer el modo en "edit"
     const selectedItem = data.find((entry) => entry.id === item);
    
     
     
    if (selectedItem !=null) {
      setEditingItem(selectedItem);
      setFormData({
        motivo: selectedItem.motivo,
        clase: selectedItem.clase,
      });
      onOpen(); // Abrir el modal
    } else {
      console.error("Elemento no encontrado");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentDate=new Date();
    const isoDateString=currentDate.toISOString();
    const updatedData = {
      //Crear
      motivo: datosEdit.motivo,
      clase: datosEdit.clase,
    };
    const updatedData2 = {
      //Editar
      motivo: formData.motivo,
      clase: formData.clase,
      DateModification: isoDateString,
    };
    
    try {
      if (modalMode === "create") {
        // Crear nuevo elemento
        const response = await fetch("https://localhost:4000/MotivosEntrada", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        });
      } else if (modalMode === "edit") {
        // Editar elemento existente
        const response = await fetch(
          `https://localhost:4000/MotivosEntrada/${editingItem.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedData2),
          }
        );
      }

      onClose(true);
      window.location.reload();
    } catch (error) {
      console.error(error);
      // Manejar el error
    }
  };

  const renderCell = React.useCallback((data, columnKey) => {
    const cellValue = data[columnKey];

    switch (columnKey) {
      case "Id":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{data.id}</p>
          </div>
        );
      case "Motivo":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{data.motivo}</p>
          </div>
        );
      case "Clase":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{data.clase}</p>
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
                  View
                </DropdownItem>
                <DropdownItem onPress={() => handleEdit(data.id)}>
                  Edit
                </DropdownItem>
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
              <MdInbox sx={{ mr: 0.5 }} fontSize="inherit" />
              Motivos Entrada
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
              placeholder="Buscar Motivo"
              startContent={<MdSearch />}
              value={filterValue}
              onClear={() => onClear()}
              onValueChange={onSearchChange}
            />
          </div>
          <div className="flex flex-wrap place-content-end space-x-2">
            <Button
              size="sm"
              color="primary"
              endContent={<TbPlus />}
              key={size}
              onClick={handleCreateClick}
            >
              Nuevo Motivo
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
            Motivos por página:
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
            {data.length} Motivos en total
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
          emptyContent={"No se encuentran Motivos de Entrada"}
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
                {modalMode === "edit" && "Editar Motivo"}
                {modalMode === "view" && "Detalles del Motivo"}
              </ModalHeader>
              <ModalBody>
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-12 space-x-4 space-y-4">
                <div className="md:col-span-12"></div>
                  <div className="md:col-span-12">
                    <Input
                      id="motivo"
                      value={
                        modalMode === "view"
                          ? selectedData?.motivo
                          : modalMode === "edit"
                          ? formData.motivo
                          : modalMode === "create"
                          ? datosEdit.motivo
                          : ""
                      }
                      onChange={handleChange}
                      size={"sm"}
                      type="text"
                      label="Nombre del Motivo*"
                      name="motivo"
                      labelPlacement="outside"
                      placeholder=" "
                      variant="faded"
                      readOnly={modalMode === "view"}
                    />
                  </div>
                  <div className="md:col-span-12">
                    <Input
                      size={"sm"}
                      type="number"
                      label="Clase"
                      id="clase"
                      name="clase"
                      value={
                        modalMode === "view"
                          ? selectedData?.clase
                          : modalMode === "edit"
                          ? formData.clase
                          : modalMode === "create"
                          ? datosEdit.clase
                          : ""
                      }
                      onChange={handleChange}
                      labelPlacement="outside"
                      placeholder=" "
                      variant="faded"
                      readOnly={modalMode === "view"}
                    />
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cerrar
                </Button>
                {modalMode !== "view" && (
                  <Button color="primary" onClick={handleSubmit}>
                    {modalMode === "edit" ? "Guardar Cambios" : "Crear"}
                  </Button>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CatalogueofMotifs;
