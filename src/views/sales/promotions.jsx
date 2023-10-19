//Promotions
import React, { useCallback, useEffect, useState, useMemo } from "react";
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
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Select
} from "@nextui-org/react";
import { TbDotsVertical, TbReload } from "react-icons/tb"
import { AiOutlinePlus } from "react-icons/ai"
import { MdArrowDropDown, MdBookmarkAdded, MdSearch } from "react-icons/md";

import ItemsHeader from "../../components/header/itemsHeader/ItemsHeader";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { RiDashboard2Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
//Columnas de la tabla
const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "Imagen", uid: "imagen", sortable: true },
  { name: "Codigo Empresa", uid: "codigoEmpresa", sortable: true },
  { name: "Nombre", uid: "nombre", sortable: true },
  { name: "Desde", uid: "desde", sortable: true },
  { name: "Hasta", uid: "hasta", sortable: true },
  { name: "Precio base", uid: "precioBase", sortable: true },
  { name: "Descuento", uid: "descuento", sortable: true },
  { name: "Precio", uid: "precio", sortable: true },
  { name: "Activo", uid: "activo", sortable: true },
  { name: "Acciones", uid: "Actions" },
];
const columnsProductos = [
  { name: "Código", uid: "codigo", sortable: false },
  { name: "Nombre", uid: "nombre", sortable: false },
  { name: "Marca", uid: "marca", sortable: false },
  { name: "Inv.", uid: "inv", sortable: false },
  { name: "Total", uid: "total", sortable: false },
  { name: "Precio Uni.", uid: "precioUnitario", sortable: false },
  { name: "Fecha desde", uid: "fechaDesde", sortable: false },
  { name: "Fecha hasta", uid: "fechaHasta", sortable: false },
  { name: "Descuento", uid: "descuento", sortable: false },
  { name: "Agregar", uid: "agregar", sortable: false },
];


const INITIAL_VISIBLE_COLUMNS = [
  "id",
  "imagen",
  "codigoEmpresa",
  "nombre",
  "desde",
  "hasta",
  "precioBase",
  "descuento",
  "precio",
  "activo",
  "Actions",
];


//Obtener el listado de productos con descuentos de la base de datos
const Promotions = () => {
  const marcaOptions = [];
  function contarmarca() {
    for (let i = 0; i < data.length; i++) {
      marcaOptions.push({ name: data[i].marca, uid: data[i].id });
    }
  }
  const [data, setData] = useState([]);
  async function loadTask() {
    try {
      const response = await fetch("https://localhost:4000/ListadoProductosDescuento");
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
        data.cliente.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredUsers = filteredUsers.filter((data) =>
        Array.from(statusFilter).includes(data.cliente)
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

  //renderizar los datos de las columnas
  const renderCell = useCallback((data, columnKey) => {
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
            <Images idImage={data.imagen} designType="tabla" ruta={"https://localhost:4000/ListadoProductosDescuento"} />
          </div>
        );
      case "codigoEmpresa":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{data.codigoEmpresa}</p>
          </div>
        );
      case "nombre":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{data.nombre}</p>
          </div>
        );
      case "desde":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">
              {data.desde}
            </p>
          </div>
        );
      case "hasta":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{data.hasta}</p>
          </div>
        );
      case "precioBase":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{data.precioBase}</p>
          </div>
        );
      case "descuento":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{data.descuento}</p>
          </div>
        );
      case "precio":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{data.precio}</p>
          </div>
        );
      case "activo":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{data.activo}</p>
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

  const renderCellProducto = useCallback((data, columnKey) => {
    switch (columnKey) {
      case "codigo":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{data.idproducto}</p>
          </div>
        );
      case "nombre":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{data.nombre}</p>
          </div>
        );
      case "marca":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{data.marca}</p>
          </div>
        );
      case "inv":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{data.existencia}</p>
          </div>
        );
      case "precioUnitario":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{data.precio}</p>
          </div>
        );
      case "descuento":
        return (
          <Input
            size="sm"
            type="number"
            className="w-[80px]"
            //value={cantidadProducto[index] || ""}
            onChange={(e) =>
              handleCantidadChange(e, index)
            }
            placeholder=""
          />
        );

      case "fechaDesde":
        return (
          <Input
            size="sm"
            type="date"
            className="w-[120px]"
            //value={cantidadProducto[index] || ""}
            onChange={(e) =>
              handleCantidadChange(e, index)
            }
            placeholder=""
          />
        );

      case "fechaHasta":
        return (
          <Input
            size="sm"
            type="date"
            className="w-[120px]"
            //value={cantidadProducto[index] || ""}
            onChange={(e) =>
              handleCantidadChange(e, index)
            }
            placeholder=""
          />
        );

      case "total":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{data.total}</p>
          </div>
        );

      case "agregar":
        return (
          <div className="relative flex justify-center items-center gap-2">
            <Button
              size="sm"
              onClick={() => agregarFila(data, index)}
            >
              +
            </Button>
          </div>
        );
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

  //para el modal de productos
  const [marca, setmarca] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [cantidadProducto, setcantidadProducto] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();


  //--------------------------------------SSSSSSS--------------------------------------------
  //obtener todos los productos de la base de datos
  const [productos, setProductos] = useState([]);
  const [productosSearched, setProductosSearched] = useState([]);
  const [nameProducto, setNameProducto] = useState("");

  const getProductos = () => {
    async function loadProducts() {
      try {
        const response = await fetch(`https://localhost:4000/Productos`);
        const data = await response.json();
        if (response.ok) {
          setProductos(data);
        }
      } catch (err) {
        toast.error("Error al cargar los datos", {
          position: "bottom-right",
          theme: "colored",
        });
      }
    }
    loadProducts();
  };


  const handleSearchProducto = (e) => {
    const value = e.target.value.toLowerCase();
    setNameProducto(value);
    const result = [];
    result.push(...productos.filter((producto) => producto.nombre.toLowerCase().includes(value))); // Usar spread (...) para agregar elementos al array

    if (value === "") {
      setProductosSearched(productos);
    } else {
      setProductosSearched(result);
    }
  };


  //paginacion del modal
  const [pageProductos, setPageProductos] = useState(1);
  const rowsPerPageProductos = 8;

  const pagesProductos = Math.ceil(productosSearched.length / rowsPerPageProductos);

  //paginacion de la tabla de usuarios ordenados
  const itemsProductos = useMemo(() => {
    const start = (pageProductos - 1) * rowsPerPageProductos;
    const end = start + rowsPerPageProductos;
    if (productosSearched.length === 0 && !nameProducto) {
      setProductosSearched(productos);
      return productos.slice(start, end);
    }
    return productosSearched.slice(start, end);
  }, [pagesProductos, rowsPerPageProductos, productos, pageProductos, productosSearched]);

  //Ejecutar useEffect

  useEffect(() => {
    getProductos();
  }, []);

  //-------------------------------------------------------------SSSS---------------------------------------------------------------------------------

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
              <MdBookmarkAdded sx={{ mr: 0.5 }} fontSize="inherit" />
              Promotions
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
              placeholder="Cliente"
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


            <Dropdown>
              <DropdownTrigger className="w-[300px] sm:max-w-[44%]">
                <Button
                  size="sm"
                  endContent={<MdArrowDropDown className="text-small" />}
                  variant="flat"
                >
                  Modalidad
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {marcaOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {status.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>

          </div>
          <div className="flex flex-wrap place-content-end space-x-2">
            <Button onPress={onOpen} size="sm" color="success" endContent={<AiOutlinePlus />}>
              Agregar Promocion a Producto
            </Button>
            <Button size="sm" color="warning" endContent={<TbReload />}>
              Actualizar Promociones
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
            Pedidos por Surtir por página:
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
            {data.length} Pedidos por surtir en total
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
          emptyContent={"No se encuentran Pedidos por surtir"}
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
        backdrop="blur"
        isOpen={isOpen}
        onClose={onClose}
        size="5xl"
        isDismissable={false}
      >
        <ModalContent>
          {(onClose) => (

            <>
              <ModalHeader className="flex flex-col gap-1">
                Agregar producto a la cotización
              </ModalHeader>
              <ModalBody>
                <div className="grid gap-4 gap-y-2 text-xs grid-cols-1 lg:grid-cols-3">
                  <div className="lg:col-span-4">
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-12 space-x-4 space-y-4 content-end">
                      <div className="md:col-span-12">
                        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-12 space-x-4 space-y-4 content-end">
                          <div className="md:col-span-12"></div>
                          <div className="md:col-span-6">
                            <Input
                              id="nombre"
                              size="sm"
                              type="text"
                              label="Nombre del producto"
                              name="nombre"
                              autoComplete="off"
                              labelPlacement="outside"
                              placeholder=" "
                              endContent={
                                <MdSearch className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
                              }
                              onChange={(e) => {
                                handleSearchProducto(e);
                              }}
                            />
                          </div>
                          {/* <div className="md:col-span-3">
                            <Select
                              labelPlacement={"outside"}
                              label="Marca"
                              placeholder="Seleccione"
                              size="sm"
                            >
                              {marca.map((marca) => (
                                <SelectItem key={marca.id} value={marca.id}>
                                  {marca.marca}
                                </SelectItem>
                              ))}
                            </Select>
                          </div>
                          <div className="md:col-span-3">
                            <Select
                              labelPlacement={"outside"}
                              label="Categoría"
                              placeholder="Seleccione"
                              size="sm"
                            >
                              {categorias.map((categoria) => (
                                <SelectItem
                                  key={categoria.id}
                                  value={categoria.id}
                                >
                                  {categoria.nombre}
                                </SelectItem>
                              ))}
                            </Select>
                          </div> */}
                          <div className="md:col-span-12">
                            <Table
                              id="tablaEnModal"
                              removeWrapper
                              aria-label="Example static collection table"
                              bottomContent={
                                pagesProductos > 0 ? (
                                  <div className="flex w-full justify-center">
                                    <Pagination
                                      isCompact
                                      showControls
                                      showShadow
                                      color="primary"
                                      page={pageProductos}
                                      total={pagesProductos}
                                      onChange={(pageProductos) => setPageProductos(pageProductos)}
                                    />
                                  </div>
                                ) : null
                              }
                            >
                              <TableHeader columns={columnsProductos}>
                                {(column) => (
                                  <TableColumn
                                    key={column.uid}
                                    align={column.uid === "actions" ? "center" : "start"}
                                    allowsSorting={false}
                                  >
                                    {column.name}
                                  </TableColumn>
                                )}

                              </TableHeader>
                              <TableBody
                                items={itemsProductos}
                              >
                                {(item) => (
                                  <TableRow key={item.idproducto}>
                                    {(columnKey) => (
                                      <TableCell>{renderCellProducto(item, columnKey)}</TableCell>
                                    )}
                                  </TableRow>
                                )}
                              </TableBody>
                            </Table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" onPress={onClose}>
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

export default Promotions;
