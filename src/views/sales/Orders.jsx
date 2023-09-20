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
  Chip,
} from "@nextui-org/react";

import { TbDotsVertical, TbPlus, TbReload } from "react-icons/tb";
import { MdArrowDropDown, MdSearch, MdShoppingCart } from "react-icons/md";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { RiDashboard2Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import ItemsHeader from "../../components/header/ItemsHeader/ItemsHeader";
import AddExcelOrders from "../Excel/addExcel/addExcelOrders";
const statusOptions = [
  { name: "Active", uid: "active" },
  { name: "Paused", uid: "paused" },
  { name: "Vacation", uid: "vacation" },
];
const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "Folio", uid: "folio", sortable: true },
  { name: "Fecha", uid: "fecha", sortable: true },
  { name: "Cotizacion", uid: "cotizacion", sortable: true },
  { name: "Numero de cliente", uid: "numeroCliente", sortable: true },
  { name: "Cliente", uid: "cliente", sortable: true },
  { name: "Razon social", uid: "razonSocial", sortable: true },
  { name: "RFC", uid: "rfc", sortable: true },
  { name: "Monto", uid: "monto", sortable: true },
  { name: "Saldo", uid: "saldo", sortable: true },
  { name: "Facturacion", uid: "facturacion", sortable: true },
  { name: "Surtido", uid: "surtido", sortable: true },
  { name: "Status", uid: "status", sortable: true },
  { name: "Acciones", uid: "Actions" },
];
const INITIAL_VISIBLE_COLUMNS = [
  "iD",
  "folio",
  "fecha",
  "cotizaciones",
  "numeroCliente",
  "cliente",
  "razonSocial",
  "rfc",
  "monto",
  "saldo",
  "facturacion",
  "surtido",
  "status",
  "Actions",
];
const Orders = () => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const marcaOptions = [];
  function contarmarca() {
    for (let i = 0; i < data.length; i++) {
      marcaOptions.push({ name: data[i].folio, uid: data[i].id });
    }
  }
  const SearchFolio = (e) => {
    setFolio(e.target.value);
  }
  
  const [pedidosData, setPedidosData] = useState([]);
  const [cotizacionesData, setCotizacionesData] = useState([]);
  const [cotizacionesFolioFiltrado, setCotizacionesFolioFiltrado] = useState(" ");
  const [AlmacenFolioFiltrado, setAlmacenFolioFiltrado] = useState(" ");
  const [foliofiltrado, setFolio] = useState(" ");
  const [AlmacenData, setAlmacenData] = useState([]);
  const loadCotizaciones = async () => {
    const response = await fetch('http://localhost:4000/Cotizaciones');
    const data = await response.json();
    const cotizacionesConStatus1 = data.filter(cotizacion => cotizacion.status === 1);
    setCotizacionesData(cotizacionesConStatus1);
    setCotizacionesFolioFiltrado(" ");
    loadAlmacen();
  }
  const loadAlmacen = async () => {
    const response = await fetch('http://localhost:4000/OrdenCompra/ListadoEntradas');
    const data = await response.json();
    const AlmacenStatus1 = data.filter(Almacen => Almacen.status === 3 || Almacen.status === 4);
    setAlmacenData(AlmacenStatus1);
    setAlmacenFolioFiltrado(" ");
    AlmacenStatus1.forEach(async (ordenCompra) => {
      const pedidoRelacionado = pedidosData.find(pedido => pedido.folio === ordenCompra.folio);
    
      if (pedidoRelacionado) {
        const response = await fetch(`http://localhost:4000/PedidosPendientes/${pedidoRelacionado.id}`, {
          method: 'POST',
        });
        const result = await response.json();
      }
    });
  }

  const [data, setData] = useState([]);

  async function loadTask() {
    try {
      const response = await fetch("http://localhost:4000/Pedidos");
      const data = await response.json();
      if (response.ok) {
        console.log(data);
        setPedidosData(data);
      }
    } catch {
      toast.error("Error al cargar los datos", {
        position: "bottom-right",
        theme: "colored",
      });
    }
  }
  useEffect(() => {
    loadCotizaciones();
    loadTask();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const filteredListadoProd = pedidosData.filter((pedido) => {
    const cotizacionRelacionada = cotizacionesData.find(cotizacion => cotizacion.folio === pedido.folio);
    
    if (cotizacionRelacionada && cotizacionRelacionada.status === 1) {
      const folio = pedido.folio && typeof pedido.folio === 'string' ? pedido.folio : " ";

      return folio.toLowerCase().includes(foliofiltrado.toLowerCase());
    } else {
      return false;
    }
  });
 console.log(pedidosData);

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

  const renderCell = React.useCallback((data, columnKey) => {
    const cellValue = data[columnKey];

    const statusColorMap = {
      //  Status
      Nuevo: "primary",
      Procesado: "success",
      Facturado: "success",
      surtido: "neutral",
      Cancelada: "error",
      Devuelto: "warning",
      Cerrado: "neutral",
      //Entrega
      Pendiente: "warning",
      Entregado: "success",
      Despachado: "success",
      Regresado: "error",
    };


    switch (columnKey) {
      case "ID":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{data.id}</p>
          </div>
        );
      case "Folio":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">
              {data.folio}
            </p>
          </div>
        );
      case "Fecha":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">
              {data.fecha}
            </p>
          </div>
        );
      case "Cotizacion":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{data.cotizacion}</p>
          </div>
        );
      case "Numero de cliente":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{data.numeroCliente}</p>
          </div>
        );
      case "Cliente":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{data.cliente}</p>
          </div>
        );
      case "Razon social":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{data.razonSocial}</p>
          </div>
        );
      case "Monto":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">$ {data.monto}</p>
          </div>
        );
      case "Saldo":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">$ {data.saldo}</p>
          </div>
        );
      case "Facturacion":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">$ {data.facturacion}</p>
          </div>
        );
      case "Surtido":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">$ {data.surtido}</p>
          </div>
        );
      case "status":
        if (data.status === 0) {
          return (

            <Chip className="capitalize" color={statusColorMap["Nuevo"]} size="sm">
              <span>Nuevo</span>
            </Chip>

          );
        } else if (data.status === 1) {
          return (

            <Chip className="capitalize" color={statusColorMap["Procesado"]} size="sm">
              <span>Procesado</span>
            </Chip>

          );
        } else if (data.status === 2) {
          return (

            <Chip className="capitalize" color={statusColorMap["Facturado"]} size="sm" >
              <span >Facturado</span>
            </Chip>

          );
        } else if (data.status === 3) {
          return (

            <Chip className="capitalize" color={statusColorMap["Surtido"]} size="sm" >
              <span >surtido</span>
            </Chip>

          );
        } else if (data.status === 4) {
          return (

            <Chip className="capitalize" color={statusColorMap["Cancelada"]} size="sm" >
              <span>Cancelado</span>
            </Chip>

          );
        } else if (data.status === 5) {
          return (

            <Chip className="capitalize" color={statusColorMap["Devuelto"]} size="sm" >
              <span>Devuelto</span>
            </Chip>

          );
        } else if (data.status === 6) {
          return (

            <Chip className="capitalize" color={statusColorMap["Cerrado"]} size="sm" >
              <span>Cerrado</span>
            </Chip>

          );
        } else if (data.status === 7) {
          return (

            <Chip className="capitalize" color={statusColorMap["Pendiente"]} size="sm" >
              <span>Pendiente</span>
            </Chip>

          );
        } else if (data.status === 8) {
          return (

            <Chip className="capitalize" color={statusColorMap["Entregado"]} size="sm" >
              <span>Entregado</span>
            </Chip>

          );
        } else if (data.status === 9) {
          return (

            <Chip className="capitalize" color={statusColorMap["Despachado"]} size="sm" >
              <span>Despachado</span>
            </Chip>

          );
        } else if (data.status === 10) {
          return (

            <Chip className="capitalize" color={statusColorMap["Regresado"]} size="sm" >
              <span>Devuelto</span>
            </Chip>

          );
        } else {
          return (
            <span>{data.status}</span>
          );
        }
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
                <DropdownItem>View</DropdownItem>
                <DropdownItem>Edit</DropdownItem>
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
                Home
              </Link>
              <Typography
                sx={{ display: "flex", alignItems: "center" }}
                className="text-foreground"
              >
                <MdShoppingCart sx={{ mr: 0.5 }} fontSize="inherit" />
                Orders
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
                placeholder="Modalidad"
                startContent={<MdSearch />}
                value={filterValue}
                onClear={() => onClear()}
                onValueChange={onSearchChange}
              />
              <Input
                isClearable
                size="sm"
                className="w-[450px] sm:max-w-[44%]"
                placeholder="Folio"
                startContent={<MdSearch />}
                value={filterValue}
                onClear={() => onClear()}
                onValueChange={onSearchChange}
              />
              
            </div>
            <div className="flex flex-wrap place-content-end space-x-2">
            <AddExcelOrders/>
              <Button size="sm" color="warning" endContent={<TbReload />}>
                Actualizar Cotizaciones
              </Button>

              <Button size="sm" color="primary" endContent={<TbPlus />}>
                Nueva cotizacion
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
              Productos por página:
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
    marcaOptions,
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
            {data.length} Cotizaciones en total
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
              align={column.uid === "Actions" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={"No se encuentran productos"}
          items={filteredListadoProd}
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

export default Orders;
