import React from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, getKeyValue} from "@nextui-org/react";
import { MdDelete, MdEdit, MdRemoveRedEye } from "react-icons/md";

import ItemsHeader from "../../components/header/ItemsHeader/ItemsHeader";
import { ToastContainer, toast } from "react-toastify";
import Breadcrumbs from "@mui/material/Breadcrumbs"; 
import Link from "@mui/material/Link";
import { RiDashboard2Fill, RiUser2Line, RiUser3Fill } from "react-icons/ri";
import Typography from "@mui/material/Typography";
import { BiIdCard, BiSolidBarChartSquare } from "react-icons/bi";
import { useNavigate } from "react-router-dom";


  
  


const SellersList = () => {
  const navigate = useNavigate();

    const statusColorMap = {
        active: "success",
        paused: "danger",
        vacation: "warning",
      };
    
      const columns = [
        {name: "ID", uid: "id"},
        {name: "Imagen", uid: "imagen"},
        {name: "Nombre", uid: "nombre"},
        {name: "Teléfono", uid: "telefono"},
        {name: "Sucursal", uid: "sucursal"},
        {name: "Fecha Alta", uid: "fechaAlta"},
        {name: "Ref. Web", uid: "referenciaWeb"},
        {name: "CLientes", uid: "clientes"},
        {name: "ACTIONS", uid: "actions"},
      ];
      
      const users = [
        {
          id: 1,
          imagen: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
          nombre: "dani",
          telefono: "222-222-000",
          sucursal: "75",
          fechaAlta: "14-08-2023",
          referenciaWeb: "dani.com",
          clientes: "50",
        },
        {
          id: 2,
          imagen: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
          nombre: "Zulema",
          telefono: "333-333-000",
          sucursal: "75",
          fechaAlta: "14-08-2023",
          referenciaWeb: "zule.com",
          clientes: "100",
        },
    ];


    const renderCell = React.useCallback((users, columnKey) => {
        const cellValue = users[columnKey];
    
        switch (columnKey) {
            case "id":
            return (
              <div className="flex flex-col">
                <p className="text-bold text-sm capitalize">{users.id}</p>
              </div>
            );
          case "imagen":
            return (
              <User
                avatarProps={{radius: "lg", src: users.imagen}}
              >
              </User>
            );
          case "nombre":
            return (
              <div className="flex flex-col">
                <p className="text-bold text-sm capitalize">{users.nombre}</p>
              </div>
            );
          case "telefono":
            return (
                <div className="flex flex-col">
                <p className="text-bold text-sm capitalize">{users.telefono}</p>
              </div>
            );
            case "sucursal":
                return (
                    <div className="flex flex-col">
                    <p className="text-bold text-sm capitalize">{users.sucursal}</p>
                  </div>
                );
            case "fechaAlta":
                return (
                    <div className="flex flex-col">
                    <p className="text-bold text-sm capitalize">{users.fechaAlta}</p>
                    </div>
                );
            case "referenciaWeb":
                return (
                    <div className="flex flex-col">
                    <p className="text-bold text-sm capitalize">{users.referenciaWeb}</p>
                    </div>
                );
          case "actions":
            return (
              <div className="relative flex items-center gap-2">
                <Tooltip content="Details">
                  <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                    <MdRemoveRedEye />
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
        
        <ItemsHeader />
        <div>
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
              <RiUser3Fill sx={{ mr: 0.5 }} fontSize="inherit" />
              Listado de Vendedores
            </Typography>
          </Breadcrumbs>
        </div>
        <Table aria-label="Example table with custom cells">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={users}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
          </>        
    )
};


export default SellersList;
