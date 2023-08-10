import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../../components/header/headerC/Header";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { RiSearch2Fill, RiFontFamily, RiEyeFill } from "react-icons/ri";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Link,
  Input,
  ButtonGroup,
  Button,
  Chip,
  Tooltip,
  User,
} from "@nextui-org/react";
import {
  MdHomeFilled,
  MdProductionQuantityLimits,
  MdNumbers,
  MdCategory,
  MdEdit,
  MdDelete,
} from "react-icons/md";
const columns = [
  { name: "Imagen", uid: "img" },
  { name: "ID", uid: "idproducto" },
  { name: "Código Fab.", uid: "codigoFabricante" },
  { name: "Código Emp.", uid: "codigoEmpresa" },
  { name: "Nombre/Descripcion", uid: "nombre" },
  { name: "Marca", uid: "marca" },
  { name: "Categoria", uid: "categoria" },
  { name: "Actualizado", uid: "actualizado" },
  { name: "Cantidad", uid: "cantidad" },
  { name: "Precio Total", uid: "precio" },
  { name: "Acciones", uid: "actions" },
];
const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};
const ProductList = () => {
  const [productofiltrado, setProductList] = useState("");
  const [marcafiltrado, setMarca] = useState("");
  const [categoriafiltrada, setCategoria] = useState("");
  const [fabricantefiltrado, setFab] = useState("");
  const [task, setTask] = useState([]);
  const SearchProd = (e) => {
    setProductList(e.target.value);
  };

  const SearchMarca = (e) => {
    setMarca(e.target.value);
  };

  const SearchCategoria = (e) => {
    setCategoria(e.target.value);
  };
  const SearchFabricante = (e) => {
    setFab(e.target.value);
  };
  const filteredListadoProd = task.filter((data) => {
    return (
      data.nombre.toLowerCase().includes(productofiltrado.toLowerCase()) &&
      data.marca.toLowerCase().includes(marcafiltrado.toLowerCase()) &&
      data.categoria.toLowerCase().includes(categoriafiltrada.toLowerCase()) &&
      data.codigoFabricante.toString().includes(fabricantefiltrado.toString())
    );
  });

  const navigate = useNavigate();
  const loadTask = async () => {
    try {
      const response = await fetch("http://localhost:4000/Productos");
      const data = await response.json();
      setTask(data);
    } catch {
      toast.error("Error al cargar los datos", {
        position: "bottom-right",
        theme: "colored",
      });
    }
  };
  useEffect(() => {
    loadTask();
  });

  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: user.avatar }}
            description={user.email}
            name={cellValue}
          >
            {user.email}
          </User>
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            <p className="text-bold text-sm capitalize text-default-400">
              {user.team}
            </p>
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[user.status]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <RiEyeFill />
              </span>
            </Tooltip>
            <Tooltip content="Edit user">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <MdEdit />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <MdDelete />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);
  return (
    <>
      <Header />
      <Breadcrumbs style={{ marginLeft: "60px" }}>
        <Link
          underline="hover"
          sx={{ display: "flex", alignItems: "center" }}
          color="inherit"
          onClick={() => navigate("/Home")}
        >
          <MdHomeFilled sx={{ mr: 0.5 }} fontSize="12px" />
          <span
            style={{ marginLeft: "5px", marginTop: "3px", fontSize: "12px" }}
          >
            {" "}
            Inicio
          </span>
        </Link>
        <Typography
          underline="hover"
          sx={{ display: "flex", alignItems: "center" }}
          color="inherit"
        >
          <MdProductionQuantityLimits sx={{ mr: 0.5 }} fontSize="12px" />
          <h5
            className="color-text:white"
            style={{
              marginLeft: "5px",
              marginTop: "13px",
              fontSize: "12px",
              color: "white",
            }}
          >
            {" "}
            Listado de Productos
          </h5>
        </Typography>
      </Breadcrumbs>
      <Input
        size="sm"
        clearable
        contentLeft={
          <RiSearch2Fill fill="var(--nextui-colors-accents6)" size={12} />
        }
        contentLeftStyling={false}
        onChange={SearchProd}
        Label="Producto"
      />
      <Input
        clearable
        size="sm"
        contentLeft={
          <RiFontFamily fill="var(--nextui-colors-accents6)" size={16} />
        }
        contentLeftStyling={false}
        css={{
          w: "100%",
          "@xsMax": {
            mw: "300px",
          },
          "& .nextui-input-content--left": {
            h: "100%",
            ml: "$4",
            dflex: "center",
          },
        }}
        onChange={SearchMarca}
        Label="Marca"
      />
      <Input
        clearable
        size="sm"
        contentLeft={
          <MdCategory fill="var(--nextui-colors-accents6)" size={16} />
        }
        contentLeftStyling={false}
        css={{
          w: "100%",
          "@xsMax": {
            mw: "300px",
          },
          "& .nextui-input-content--left": {
            h: "100%",
            ml: "$4",
            dflex: "center",
          },
        }}
        onChange={SearchCategoria}
        Label="Categoría"
      />
      <Input
        clearable
        size="sm"
        contentLeft={
          <MdNumbers fill="var(--nextui-colors-accents6)" size={16} />
        }
        contentLeftStyling={false}
        css={{
          w: "100%",
          "@xsMax": {
            mw: "300px",
          },
          "& .nextui-input-content--left": {
            h: "100%",
            ml: "$4",
            dflex: "center",
          },
        }}
        onChange={SearchFabricante}
        Label="Código Fabricante"
      />
      <ButtonGroup color="default" flat size="xs">
        <Button color={"default"}>Actualizar costos</Button>
        <Button color={"secondary"}>Actualizar precios</Button>
        <Button
          color={"success"}
          onClick={() => navigate("/Productos/NuevoProducto")}
        >
          Nuevo producto
        </Button>

        {/* <ExcelListadoProductos listadoProducto={"listadoProducto"} /> */}
      </ButtonGroup>
      <Table aria-label="Example table with custom cells">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={task}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default ProductList;
