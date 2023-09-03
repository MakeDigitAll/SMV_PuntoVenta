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
import { format } from 'timeago.js';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Checkbox } from "@nextui-org/react";
import { TbDotsVertical, TbPlus, TbReload } from "react-icons/tb";
import { MdAlignHorizontalCenter, MdArrowDropDown, MdCreditCard, MdImportContacts, MdPriceChange, MdPriceCheck, MdSearch } from "react-icons/md";
import ItemsHeader from "../../components/header/ItemsHeader/ItemsHeader";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { RiDashboard2Fill, RiSdCardFill, RiUser2Fill } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import DefaultLayout from "../../components/header/headerC/DefaultLayout";
const columns = [
  { name: "ID", uid: "id" },
  { name: "Fecha", uid: "fecha", sortable: true },
  { name: "Nombre", uid: "nombre", sortable: true },
  { name: "Variacion", uid: "variacion", sortable: true },
  { name: "Clientes", uid: "clientes", sortable: true },
  { name: "Acciones", uid: "Actions", sortable: true },
];

const INITIAL_VISIBLE_COLUMNS = [
  "id",
  "fecha",
  "nombre",
  "variacion",
  "clientes",
  "Actions",
];


const PriceList = () => {

  const [task, setTask] = useState({
    nombre: '',
    variacion: '',
    clientes: '',
  });

  const [editing, setEditing] = useState(false);
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const params = useParams();


  async function handleSubmit(e)  {
    e.preventDefault();

    const datosListado = {
      nombre: task.nombre,
      variacion: task.variacion,
      clientes: task.clientes,
    };

    console.log(datosListado);
      try {
        await fetch(`http://localhost:4000/ListadoPrecios`, {
          method: "POST",
          body: JSON.stringify(datosListado),
          headers: {
            "Content-Type": "application/json",
          },
        });
        
       
      } catch (error) {
        console.log("todo fallo")
        toast.warning(error.message);
      }
  }

  const handleChange = e => {
    setTask({ ...task, [e.target.name]: e.target.value })
  }

  const [data, setData] = useState([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  async function loadTask() {
    try {
      const response = await fetch(`http://localhost:4000/ListadoPrecios`);
      const data = await response.json();
      setTask({nombre: data.nombre, variacion: data.variacion, clientes: data.clientes})
      //setEditing(true);
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
    loadTask(params.id);
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
                <DropdownItem>Ver Listado</DropdownItem>
                <DropdownItem>Editar Listado</DropdownItem>
                <DropdownItem>Deshabilitar</DropdownItem>
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
        <DefaultLayout>
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
                <MdPriceCheck sx={{ mr: 0.5 }} fontSize="inherit" />
                Listado de Precios
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
                onPress={onOpen}
                size="sm"
                color="primary"
                endContent={<TbPlus />}
              >
                Nueva Lista de Precios
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
              Listas por página:
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
        </DefaultLayout>
      </>
    );
  }, [filterValue, onSearchChange, visibleColumns, onRowsPerPageChange, navigate, onClear]);
  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small">
          <span style={{ marginRight: "30px" }}>
            {data.length} Listas de Precios en total
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
        <TableBody emptyContent={"No price lists found"} items={sortedItems}>
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
        isDismissable={false}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <form onChange={handleChange} onSubmit={handleSubmit} >
                <ModalHeader className="flex flex-col gap-1">Nueva Lista de Precios</ModalHeader>
                <ModalBody>
                  <Input
                    id='nombre'
                    name='nombre'
                    value={task.nombre}
                    label='Nombre de Lista de precios'
                    placeholder="Nombre de lista"
                    variant="bordered"
                    onChange={handleChange}
                    
                  />
                  <Input
                    id='variacion'
                    name='variacion'
                    value={task.variacion}
                    label='Variacion Sobre el Precio Base'
                    placeholder="0.00%"
                    variant="bordered"
                    onChange={handleChange}
                    
                  />
                  <Input
                    id='clientes'
                    name="clientes"
                    value={task.clientes}
                    label='Numero de Clientes'
                    placeholder="0"
                    variant="bordered"
                    onChange={handleChange}
                    
                  />

                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Cerrar
                  </Button>
                  <Button color="primary" type="submit" onClick={handleSubmit}>
                    Guardar
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>



    </div>
  );
};


export default PriceList;