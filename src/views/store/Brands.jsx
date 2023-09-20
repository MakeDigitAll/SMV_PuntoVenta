import React, { useCallback, useEffect, useState, useRef } from "react";
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
import AddExcelBrands from "../Excel/addExcel/addExcelBrands";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { display } from "@mui/system";
const columns = [
  { name: "ID", uid: "ID", sortable: true },
  { name: "Imagen", uid: "Imagen", sortable: true },
  { name: "Marca", uid: "Marca", sortable: true },
  { name: "Catálogo", uid: "Catalogo", sortable: true },
  { name: "Productos", uid: "Productos", sortable: true },
  { name: "Acciones", uid: "Actions" },
];

const INITIAL_VISIBLE_COLUMNS = [
  "ID",
  "Imagen",
  "Marca",
  "Catalogo",
  "Productos",
  "Actions",
];

const Brands = () => {

  const [data, setData] = useState([]);
  async function loadTask() {
    try {
      const response = await fetch("http://localhost:4000/MarcasProducto");
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
        data.marca.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredUsers = filteredUsers.filter((data) =>
        Array.from(statusFilter).includes(data.marca)
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

  //Modal
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [size, setSize] = React.useState("2xl");
  const sizes = ["md", "lg", "xl", "2xl", "3xl"];
  const [modalMode, setModalMode] = useState("create"); 
  const [datosCrear, setDatosCrear] = useState({
    marca: "",
    catalogo: "",
    productos: "",
  });
  const [datosEditar, setDatosEditar] = useState({
    marca: "",
    catalogo: "",
    productos: "",
  });
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);
  const inputImagenRef = useRef(null);
  const [selectedData, setSelectedData] = useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatosCrear((prevDatosCrear) => ({
      ...prevDatosCrear,
      [name]: value,
    }));
  };
  const handleImagenSeleccionada = (event) => {
    const archivo = event.target.files[0];
    if (archivo) {
      // Puedes realizar validaciones adicionales aquí si es necesario
      setImagenSeleccionada(archivo);
    }
  };
  const handleCreateClick = () => {
    setModalMode("create");
    onOpen();
    setDatosCrear({
      marca: "",
      catalogo: "",
      productos: "",
    });
  };
  const handleVer = (item) => {
    setModalMode("view");
    const selectedItem = data.find((entry) => entry.id === item);
    setSelectedData(selectedItem);
    onOpen(); // Abrir el modal
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!datosCrear.marca || !datosCrear.catalogo || !datosCrear.productos || !imagenSeleccionada) {
      // Muestra un mensaje de error o realiza alguna acción para indicar que faltan campos
      toast.warning("Por favor, completa todos los campos y selecciona una imagen.", {theme:"colored"});
      return; // No continúes con la solicitud POST si faltan campos
    }
    const updatedData = {
      //Crear
      imagen: imagenSeleccionada,
      marca: datosCrear.marca,
      catalogo: datosCrear.catalogo,
      productos: datosCrear.productos,
    };

    try {
      if (modalMode === "create") {
        // Crear nuevo elemento
        const response = await fetch("http://localhost:4000/MarcasProducto", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        });

        if (response.ok) {
          // La solicitud fue exitosa, puedes mostrar un mensaje o realizar otras acciones
          toast.success("Elemento creado exitosamente", {theme:"colored"});
          onClose(true);
          loadTask();
        } else {
          // Si la solicitud no es exitosa, maneja el error
          console.error("Error al crear el elemento", response.statusText);
          // Puedes mostrar un mensaje de error al usuario si es necesario
        }
      }
    } catch (error) {
      toast.error("Error al Guardar", {theme:"colored"});
      // Manejar el error, mostrar un mensaje al usuario, etc.
    }
  };

  const renderCell = React.useCallback((data, columnKey) => {
    const cellValue = data[columnKey];

    switch (columnKey) {
      case "ID":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{data.id}</p>
          </div>
        );
      case "Imagen":
        return (
            <User avatarProps={{ radius: "lg", src: data.imagen }} />
        );
      case "Marca":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">
              {data.marca}
            </p>
          </div>
        );
      case "Catalogo":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">
              {data.catalogo}
            </p>
          </div>
        );
      case "Productos":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{data.productos}</p>
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
                <DropdownItem onPress={()=>handleVer(data.id)}>Ver</DropdownItem>
                <DropdownItem>Editar</DropdownItem>
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
              <MdShoppingCart sx={{ mr: 0.5 }} fontSize="inherit" />
              Marcas
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
              placeholder="Marca"
              startContent={<MdSearch />}
              value={filterValue}
              onClear={() => onClear()}
              onValueChange={onSearchChange}
            />
          </div>
          <div className="flex flex-wrap place-content-end space-x-2">
            <div><AddExcelBrands/></div>
          
            <Button size="sm" color="warning" endContent={<TbReload />}>
              Actualizar marca
            </Button>
            <Button size="sm" color="primary" endContent={<TbPlus />}
            onClick={handleCreateClick}>
              Nueva Marca
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
          
          </div>
          <label className="flex items-center text-default-400 text-small">
            Marcas por página:
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
            {data.length} marcas en total
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
        <TableBody emptyContent={"No se encuentran marcas"} items={sortedItems}>
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
                {modalMode === "create" && "Nueva Marca"}
                {modalMode === "edit" && "Editar Marca"}
                {modalMode === "view" && "Marca"}
              </ModalHeader>
              <ModalBody>
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-12 space-x-4 space-y-4">
                  <div className="md:col-span-12"></div>
                  <div className="md:col-span-6">
                    <Input
                      id="marca"
                      value={modalMode === "create" ? datosCrear.marca
                      :modalMode === "view" ? selectedData?.marca : ""}
                      onChange={handleChange}
                      size={"sm"}
                      type="text"
                      label="Marca*"
                      name="marca"
                      labelPlacement="outside"
                      placeholder=" "
                      variant="faded"
                      readOnly={modalMode === "view"}
                    />
                  </div>
                  <div className="md:col-span-6">
                    <Input
                      size={"sm"}
                      type="text"
                      label="Catálogo*"
                      id="catalogo"
                      name="catalogo"
                      value={modalMode === "create" ? datosCrear.catalogo 
                      :modalMode === "view" ? selectedData?.catalogo : ""}
                      onChange={handleChange}
                      labelPlacement="outside"
                      placeholder=" "
                      variant="faded"
                      readOnly={modalMode === "view"}
                    />
                  </div>
                  <div className="md:col-span-6">
                    <Input
                      size={"sm"}
                      type="number"
                      label="Número Productos*"
                      id="productos"
                      name="productos"
                      value={modalMode === "create" ? datosCrear.productos
                      :modalMode === "view" ? selectedData?.productos : ""}
                      onChange={handleChange}
                      labelPlacement="outside"
                      placeholder=" "
                      variant="faded"
                      readOnly={modalMode === "view"}
                    />
                  </div>
                  <div className="md:col-span-6">
                    <input
                      id="imagen"
                      type="file"
                      accept="image/*"
                      onChange={handleImagenSeleccionada}
                      // style={{display:'none'}}
                      ref={inputImagenRef}
                      value={modalMode === "view" ? selectedData?.imagen : ""}
                    />
                    
                    {imagenSeleccionada && (
                      <div>
                        <img
                          src={URL.createObjectURL(imagenSeleccionada)}
                          alt="Imagen seleccionada"
                          width={200}
                        />
                        
                      </div>
                    )}
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                {
                  <Button color="primary" onClick={handleSubmit}>
                    {modalMode === "create" ? "Crear" : "Guardar Cambios"}
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
  );
};

export default Brands;