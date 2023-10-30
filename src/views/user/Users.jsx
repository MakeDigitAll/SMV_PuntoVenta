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
  Spinner,
} from "@nextui-org/react";
import { TbDotsVertical, TbPlus, TbReload } from "react-icons/tb";
import { MdArrowDropDown, MdSearch } from "react-icons/md";
import ItemsHeader from "../../components/header/itemsHeader/ItemsHeader";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { RiDashboard2Fill, RiUser2Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import UserImage from "./UserImage";
import Images from "../../components/images/Images";
const columns = [
  { name: "Imagen", uid: "Imagen" },
  { name: "Nombre(s)", uid: "Nombre", sortable: true },
  { name: "Correo electronico", uid: "Email", sortable: true },
  { name: "Grupo", uid: "Grupo", sortable: true },
  { name: "Sucursales", uid: "Sucursales", sortable: true },
  { name: "Vendedor", uid: "vendedor", sortable: true },
  { name: "Perfil de seguridad", uid: "perfilSeguridad", sortable: true },
  { name: "Acciones", uid: "Actions", sortable: true },
];

const INITIAL_VISIBLE_COLUMNS = [
  "Imagen",
  "ID",
  "Nombre",
  "Email",
  "Actions",
  "Sucursales",
  "Grupo",
  "vendedor",
  "perfilSeguridad",
];

const Users = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  async function loadTask() {
    try {
      const response = await fetch("https://localhost:4000/api/allusers");
      const data = await response.json();
      if (response.ok) {
        setData(data);
        setIsLoading(false);
      }
    } catch {
      toast.error("Error al cargar los datos", {
        position: "bottom-right",
        theme: "colored",
      });
      setIsLoading(false);
    }
  }
  useEffect(() => {
    loadTask();
  }, []);

  const [nombre, setNombre] = useState(""); // Estado para almacenar el valor del filtro
  const [correo,setCorreo]= useState("");
  // Función para filtrar los datos en función del valor del filtro
  const filtrarDatos = data.filter((dato) =>
      dato.nombre.toLowerCase().includes(nombre.toLowerCase()) &&
      dato.email.toLowerCase().includes(correo.toLowerCase())
  );

  // Manejar el cambio en el campo de filtro
  const handleChangeNombre = (event) => {
    setNombre(event.target.value);
  };
  const handelChangeCorreo = (event) =>{
    setCorreo(event.target.value);
  }

  function handleClickBreadCrumbs(event) {
    event.preventDefault();
  }
  const navigate = useNavigate();
  const [filterValue, setFilterValue] = React.useState("");
  const [filterValueName, setFilterValueName] = React.useState("");
  const [filterValueEmail, setFilterValueEmail] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "Email",
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
          user.nombre.toLowerCase().includes(filterValue.toLowerCase()) +
          user.apellido
            .toLowerCase()
            .includes(filterValue.toLocaleLowerCase()) +
          user.email.toLowerCase().includes(filterValue.toLocaleLowerCase())
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
      case "Imagen":
        return <UserImage idUsuario={data.id} designType="avatar" />;
      case "ID":
        return (
          <div className="flex flex-col">            
            <p className="text-bold text-small capitalize">{data.id}</p>
            
          </div>
        );
      case "Nombre":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">
              {data.nombre} {data.apellido}
            </p>
          </div>
        );
      case "Email":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{data.email}</p>
          </div>
        );
      case "Vendedor":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{data.vendedor}</p>
          </div>
        );
      case "Perfil de seguridad":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">
              {data.perfilSeguridad}
            </p>
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
                <DropdownItem
                  onClick={() => navigate(`/Settings/User/${user.id}/SeeUser`)}
                >
                  View User
                </DropdownItem>
                <DropdownItem
                  onClick={() => navigate(`/Settings/User/${user.id}/EditUser`)}
                >
                  Edit User
                </DropdownItem>
                <DropdownItem>Delete User</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  }, [navigate]);

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

  const onSearchChange = React.useCallback((field, value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
    if (value) {
      if (field === "name") {
        setFilterValueName(value);
      } else if (field === "email") {
        setFilterValueEmail(value);
      }
      setPage(1);
    } else {
      if (field === "name") {
        setFilterValueName("");
      } else if (field === "email") {
        setFilterValueEmail("");
      }
    }
  }, []);

  const onClear = useCallback((field) => {
    setFilterValue("");
    setPage(1);
    if (field === "name") {
      setFilterValueName("");
    } else if (field === "email") {
      setFilterValueEmail("");
    }
    setPage(1);
  }, []);

  const onClear2 = useCallback((field) => {
    setNombre("");
    setCorreo("")
    setPage(1);
    if (field === "nombre") {
      setNombre("");
    } else if (field === "email") {
      setCorreo("");
    }
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
              <RiUser2Fill sx={{ mr: 0.5 }} fontSize="inherit" />
              Usuarios
            </Typography>
          </Breadcrumbs>
        </div>
        <div
          className="flex flex-col gap-4"
          style={{ marginLeft: "10px", marginRight: "10px" }}
        >
          <Spacer y={8} />
          <div className="flex flex-wrap space space-x-4 ">
            <Input
              isClearable
              type="text"
              size="md"
              className="w-[450px] sm:max-w-[44%]"
              placeholder="Nombre/ Apellido"
              startContent={<MdSearch />}
              onChange={handleChangeNombre}
              // value={nombre}
            />
            <Input
              isClearable
              type="text"
              size="md"
              className="w-[450px] sm:max-w-[44%]"
              placeholder="Correo electronico"
              startContent={<MdSearch />}
              onChange={handelChangeCorreo}
              // value={correo}
            />
          </div>
          <div className="flex flex-wrap place-content-end space-x-2">            
            <Button
              onPress={() => navigate(`/Settings/User`)}
              size="sm"
              color="primary"
              endContent={<TbPlus />}
            >
              Nuevo usuario
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
            {/* <Dropdown>
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
            </Dropdown> */}
          </div>
          <label className="flex items-center text-small">
            Usuarios por página:
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
            {data.length} usuarios en total
          </span>
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${data.length} selected`}
        </span>
        <Pagination
          isCompact
          showControls
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
          emptyContent={
            sortedItems.length === 0 && isLoading === false ? (
              "No users found"
            ) : isLoading === true ? (
              <Spinner label="Cargando" />
            ) : (
              "No users found"
            )
          }
          items={sortedItems}
        >
          {filtrarDatos.map((item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Users;
