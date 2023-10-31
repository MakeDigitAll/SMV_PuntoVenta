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
  Select,
} from "@nextui-org/react";
import { TbDotsVertical, TbPlus } from "react-icons/tb";
import { MdArrowDropDown, MdSearch, MdShoppingCart } from "react-icons/md";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { RiDashboard2Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import ItemsHeader from "../../components/header/itemsHeader/ItemsHeader";
import AddExcelQuotes from "../Excel/addExcel/addExcelQuotes";
import moment from "moment";
const statusOptions = [
  { name: "Active", uid: "active" },
  { name: "Paused", uid: "paused" },
  { name: "Vacation", uid: "vacation" },
];
const columns = [
  { name: "Folio", uid: "folio", sortable: true },
  { name: "Fecha", uid: "fecha", sortable: true },
  { name: "Pedido", uid: "pedido", sortable: true },
  { name: "Cliente", uid: "cliente", sortable: true },
  { name: "Vendedor", uid: "vendedor", sortable: true },
  { name: "Recurrencia", uid: "recurrencia", sortable: true },
  { name: "Total", uid: "total", sortable: true },
  { name: "Estatus", uid: "status", sortable: true },
  { name: "Acciones", uid: "Actions" },
];
const INITIAL_VISIBLE_COLUMNS = [
  "folio",
  "fecha",
  "pedido",
  "cliente",
  "vendedor",
  "recurrencia",
  "total",
  "status",
  "Actions",
];
const Quotes = () => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const marcaOptions = [];
  function contarmarca() {
    for (let i = 0; i < data.length; i++) {
      marcaOptions.push({ name: data[i].folio, uid: data[i].id });
    }
  }

  const [data, setData] = useState([]);
  async function loadTask() {
    try {
      const response = await fetch("https://localhost:4000/Cotizaciones");
      const data = await response.json();
      if (response.ok) {
        console.log(data);
        setData(data);
        contarmarca();
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

  //const clientesOptions = data.map((item) => item.idCliente.toLowerCase());
  //const vendedoresOptions = data.map((item) => item.idVendedor.toLowerCase());
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

  const [selectedCliente, setSelectedCliente] = useState("");
  const [selectedVendedor, setSelectedVendedor] = useState("");
  const [selectedOrigen, setSelectedOrigen] = useState("");
  const [modalidad, setModalidad] = useState("");
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [disableCounter, setDisableCounter] = useState(0);

  const handleClienteChange = (event) => {
    setSelectedCliente(event.target.value);
  };
  const handleVendedorChange = (event) => {
    setSelectedVendedor(event.target.value);
  };
  const handleOrigenChange = (event) => {
    setSelectedOrigen(event.target.value);
  };
  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...data];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((data) =>
        data.folio.toString().includes(filterValue.toString())
      );
    }

    // Filtra por cliente seleccionado
    if (selectedCliente) {
      const selectedClienteLower = selectedCliente.toLowerCase();
      filteredUsers = filteredUsers.filter(
        (data) => data.idCliente.toLowerCase() === selectedClienteLower
      );
    }
    // Filtra por vendedor seleccionado
    if (selectedVendedor) {
      const selectedVendedorLower = selectedVendedor.toLowerCase();
      filteredUsers = filteredUsers.filter(
        (data) => data.idVendedor.toLowerCase() === selectedVendedorLower
      );
    }

    if (modalidad) {
      filteredUsers = filteredUsers.filter((data) =>
        data.fecha.toLowerCase().includes(modalidad.toLowerCase())
      );
    }

    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredUsers = filteredUsers.filter((data) =>
        Array.from(statusFilter).includes(data.folio)
      );
    }

    return filteredUsers;
  }, [
    data,
    hasSearchFilter,
    statusFilter,
    filterValue,
    selectedCliente,
    selectedVendedor,
    selectedOrigen,
    modalidad,
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

  const renderCell = React.useCallback((data, columnKey) => {
    const cellValue = data[columnKey];
    const statusColorMap = {
      Nueva: "primary",
      Ganada: "success",
      Perdida: "warning",
      Cancelada: "danger",
      Vencida: "danger",
    };

    const handleDisable = async (id) => {
      const datoDisable = {
        id: id,
      };
      try {
        const res = await fetch(
          `https://localhost:4000:4000/CotizacionesDisable/${id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(datoDisable),
          }
        );

        if (res.ok) {
          toast.warning("Deshabilitando Cotización ", {
            position: "bottom-right",
            theme: "colored",
          });
          setDisableCounter((prevCounter) => prevCounter + 1);
        } else {
          toast.error("Error al deshabilitar Cotización", {
            position: "bottom-right",
            theme: "colored",
          });
        }
      } catch (error) {
        toast.error("Error al deshabilitar Cotización", {
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

    switch (columnKey) {
      case "id":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{data.id}</p>
          </div>
        );
      case "folio":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{data.folio}</p>
          </div>
        );
      case "fecha":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">
              {moment(data.fecha).format("DD/MM/YYYY")}
            </p>
          </div>
        );
      case "pedido":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{data.pedido}</p>
          </div>
        );
      case "cliente":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">
              {data.nombreComercial}
            </p>
          </div>
        );
      case "vendedor":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{data.nombre}</p>
          </div>
        );
      case "origen":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{data.origen}</p>
          </div>
        );
      case "Monto":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">$ {data.monto}</p>
          </div>
        );
      case "recurrencia":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">
              {data.recurrencia == 1 ? "Sí" : "No"}
            </p>
          </div>
        );
      case "status":
        if (data.status === 0) {
          return (
            <Chip
              variant="flat"
              className="capitalize"
              color={statusColorMap["Nueva"]}
              size="sm"
            >
              <span>Nueva</span>
            </Chip>
          );
        } else if (data.status === 1) {
          return (
            <Chip
              className="capitalize"
              color={statusColorMap["Ganada"]}
              size="sm"
            >
              <span>Ganada</span>
            </Chip>
          );
        } else if (data.status === 2) {
          return (
            <Chip
              className="capitalize"
              color={statusColorMap["Perdida"]}
              size="sm"
            >
              <span>Perdida</span>
            </Chip>
          );
        } else if (data.status === 3) {
          return (
            <Chip
              className="capitalize"
              color={statusColorMap["Cancelada"]}
              size="sm"
            >
              <span>Cancelada</span>
            </Chip>
          );
        } else if (data.status === 4) {
          return (
            <Chip
              className="capitalize"
              color={statusColorMap["Vencida"]}
              size="sm"
            >
              <span>Vencida</span>
            </Chip>
          );
        } else {
          return <span>{user.estado}</span>;
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
                <DropdownItem
                  onPress={() =>
                    navigate(`/Sales/Quotes/${data.folio}/ViewQuote`)
                  }
                >
                  Ver Cotización
                </DropdownItem>
                <DropdownItem
                  onPress={() =>
                    navigate(`/Sales/Quotes/${data.folio}/EditQuote`)
                  }
                >
                  Editar Ccotización
                </DropdownItem>
                <DropdownItem
                  color="danger"
                  className="text-danger"
                  onPress={() => handleDisable(data.folio)}
                >
                  Deshabilitar Cotización
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

  const onSearchChange2 = React.useCallback((value) => {
    if (value) {
      setModalidad(value);
      setPage(1);
    } else {
      setModalidad("");
    }
  }, []);

  const onClear2 = useCallback(() => {
    setModalidad("");
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
              <MdShoppingCart sx={{ mr: 0.5 }} fontSize="inherit" />
              Cotizaciones
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
              value={modalidad}
              onClear={() => onClear2()}
              onValueChange={onSearchChange2}
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
            <div className="w-[300px] sm:max-w-[44%]">
              <Select
                labelPlacement={"outside"}
                label=""
                placeholder="Clientes"
                size="sm"
                onChange={handleClienteChange}
              ></Select>
            </div>
            <div className="w-[300px] sm:max-w-[44%]">
              <Select
                labelPlacement={"outside"}
                label=""
                placeholder="Vendedor"
                size="sm"
                value={selectedVendedor}
                onChange={handleVendedorChange}
              ></Select>
            </div>
            <div className="w-[300px] sm:max-w-[44%]">
              {/* <Select
                  labelPlacement={"outside"}
                  label=""
                  placeholder="Origen"
                  size="sm"
                  value={selectedOrigen}
                  onChange={handleOrigenChange}
                >
                  {origenOptions.map((origenOption) => (
                    <SelectItem key={origenOption} value={origenOption}>
                      {origenOption}
                    </SelectItem>
                  ))}
                </Select> */}
            </div>
          </div>

          <div className="flex flex-wrap place-content-end space-x-2">
            <div>
              <AddExcelQuotes />
            </div>
            <Button
              size="sm"
              color="primary"
              endContent={<TbPlus />}
              onClick={() => navigate(`/Sales/Quotes/NewQuote`)}
            >
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
                  //console.log(column),
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
            Cotizaciones por página:
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
    modalidad,
    onSearchChange2,
    filterValue,
    onSearchChange,
    selectedVendedor,
    visibleColumns,
    onRowsPerPageChange,
    navigate,
    onClear2,
    onClear,
  ]);
  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          <span style={{ marginRight: "30px" }}>
            {data.length} Cotizaciones en total
          </span>          
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
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
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
              align={column.uid === "Actions" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={"No se encuentran cotizaciones"}
          items={sortedItems}
        >
          {(item) => (
            <TableRow key={item.folio}>
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

export default Quotes;
