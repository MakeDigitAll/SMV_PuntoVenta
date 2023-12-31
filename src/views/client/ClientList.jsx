import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Input,
  Button,
  Dropdown,
  DropdownItem,
  DropdownTrigger,
  DropdownMenu,
  Pagination,
} from "@nextui-org/react";
import {
  MdArrowDropDown,
  MdCategory,
  MdDelete,
  MdEdit,
  MdRemoveRedEye,
  MdSearch,
} from "react-icons/md";
import ItemsHeader from "../../components/header/itemsHeader/ItemsHeader";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { RiDashboard2Fill } from "react-icons/ri";
import Typography from "@mui/material/Typography";
import { TbPlus } from "react-icons/tb";
import React, { useState, useEffect, useCallback } from "react";
import AddExcelClients from "../Excel/addExcel/addExcelClients";
import Images from "../../components/images/Images";
import moment from "moment";
const columns = [
  { name: "Imagen", uid: "imagen", sortable: true },
  { name: "Nombre del cliente", uid: "nombreCliente", sortable: true },
  { name: "# Cliente", uid: "numeroCliente", sortable: true },
  { name: "# Comercial", uid: "numeroCliente", sortable: true },
  { name: "Nombre Comercial", uid: "nombreComercial", sortable: true },
  { name: "Contacto Principal", uid: "contacto", sortable: true },
  { name: "Telefono", uid: "telefono", sortable: true },
  { name: "Correo", uid: "email", sortable: true },
  { name: "Vendedor", uid: "vendedor", sortable: true },
  { name: "Activo", uid: "activo", sortable: true },
  { name: "Registro", uid: "registro", sortable: true },
  { name: "Actualizado", uid: "Actualizado", sortable: true },
  { name: "Actions", uid: "Actions", sortable: true },
];
const INITIAL_VISIBLE_COLUMNS = [
  "id",
  "imagen",
  "nombreComercial",
  "contacto",
  "telefono",
  "email",
  "vendedor",
  "activo",
  "registro",
  "Actualizado",
  "Actions",
];
const ClientList = () => {
  const [data, setData] = useState([]);
  async function loadTask() {
    try {
      const response = await fetch("https://localhost:4000/ListadoClientes");
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
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [disableCounter, setDisableCounter] = useState(0);
  const params = useParams();
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

  const handleDisable = async (id) => {
    const datoDisable = {
      id: id,
    };
    console.log(datoDisable);
    try {
      const res = await fetch(
        `https://localhost:4000:4000/ListadoClientesDisabled/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(datoDisable),
        }
      );

      if (res.ok) {
        toast.warning("Deshabilitando Cliente", {
          position: "bottom-right",
          theme: "colored",
        });
        setDisableCounter((prevCounter) => prevCounter + 1);
      } else {
        toast.error("Error al deshabilitar Cliente", {
          position: "bottom-right",
          theme: "colored",
        });
      }
    } catch (error) {
      toast.error("Error al deshabilitar Cliente", {
        position: "bottom-right",
        theme: "colored",
      });
    } finally {
      // Después de deshabilitar, vuelva a cargar los datos para reflejar los cambios
      setIsDataLoading(true);
      await loadTask();
      setIsDataLoading(false);
    }
  };

  const renderCell = React.useCallback((data, columnKey) => {
    const cellValue = data[columnKey];
    switch (columnKey) {
      case "id":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{data.id}</p>
          </div>
        );
      case "imagen":
        return (
          <div className="flex flex-col">
            <Images
              idImage={data.id}
              designType="tabla"
              ruta={"/api/images/clientImage/"}
            />
          </div>
        );
      case "nombreCliente":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">
              {data.nombreCliente}
            </p>
          </div>
        );
      case "numeroCliente":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">
              {data.numeroCliente}
            </p>
          </div>
        );
      case "numeroComercial":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">
              {data.numeroComercial}
            </p>
          </div>
        );
      case "razonSocial":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">
              {data.razonSocial}
            </p>
          </div>
        );
      case "contacto":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{data.contacto}</p>
          </div>
        );
      case "rfc":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{data.rfc}</p>
          </div>
        );
      case "telefono":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{data.telefono}</p>
          </div>
        );
      case "email":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{data.email}</p>
          </div>
        );
      case "vendedor":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{data.vendedor}</p>
          </div>
        );
      case "giro":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{data.giro}</p>
          </div>
        );
      case "activo":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{data.activo}</p>
          </div>
        );
      case "registro":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{moment(data.registro).format("DD/MM/YYYY")}</p>
          </div>
        );
      case "Actualizado":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{moment(data.actualizado).format("DD/MM/YYYY")}</p>
          </div>
        );
      case "Actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Ver Cliente">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <MdRemoveRedEye
                  onClick={() => navigate(`/Customers/${data.id}/ViewClient`)}
                />
              </span>
            </Tooltip>
            <Tooltip content="Editar Cliente">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <MdEdit
                  onClick={() => navigate(`/Customers/${data.id}/EditClient`)}
                />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Deshabilitar Cliente">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <MdDelete onClick={() => handleDisable(data.id)} />
              </span>
            </Tooltip>
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
              <MdCategory sx={{ mr: 0.5 }} fontSize="inherit" />
              Clientes
            </Typography>
          </Breadcrumbs>
        </div>
        <div
          className="flex flex-col gap-4"
          style={{ marginLeft: "10px", marginRight: "10px" }}
        >
          <div className="flex flex-wrap gap-2">
            <div className="flex flex-col w-[450px] sm:max-w-[44%]">
              <Input
                isClearable
                size="sm"
                placeholder="Numero del cliente"
                startContent={<MdSearch />}
                value={filterValue}
                onClear={() => onClear()}
                onValueChange={onSearchChange}
              />
            </div>
            <div className="flex flex-col w-[450px] sm:max-w-[44%]">
              <Input
                isClearable
                size="sm"
                placeholder="Numero comercial"
                startContent={<MdSearch />}
                value={filterValue}
                onClear={() => onClear()}
                onValueChange={onSearchChange}
              />
            </div>
          </div>
          <div className="flex flex-wrap place-content-end space-x-2">
            <AddExcelClients />
            <Button
              onPress={() => navigate(`/Customers/NewClient`)}
              size="sm"
              color="primary"
              endContent={<TbPlus />}
            >
              Nuevo cliente
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
            Clientes por página:
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
            {data.length} clientes en total
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
          emptyContent={"No se encuentran clientes"}
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
    </div>
  );
};
export default ClientList;
