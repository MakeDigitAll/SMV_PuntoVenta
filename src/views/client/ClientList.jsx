import React from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, getKeyValue} from "@nextui-org/react";
import { MdDelete, MdEdit, MdRemoveRedEye, MdSuperscript } from "react-icons/md";

import ItemsHeader from "../../components/header/ItemsHeader/ItemsHeader";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Breadcrumbs from "@mui/material/Breadcrumbs"; 
import Link from "@mui/material/Link";
import { RiDashboard2Fill, RiUser2Fill } from "react-icons/ri";
import Typography from "@mui/material/Typography";
  


const ClientList = () => {
    const navigate = useNavigate();

    
      const columns = [
        {name: "ID", uid: "id"},
        {name: "# Cliente", uid: "numeroCliente"},
        {name: "Nombre Comercial", uid: "nombreComercial"},
        {name: "Razón Social", uid: "razonSocial"},
        {name: "Contacto", uid: "contacto"},
        {name: "RFC", uid: "rfc"},
        {name: "Teléfono", uid: "telefono"},
        {name: "eMail", uid: "email"},
        {name: "Vendedor", uid: "vendedor"},
        {name: "Giro", uid: "giro"},
        {name: "Activo", uid: "activo"},
        {name: "Registro", uid: "registro"},
        {name: "Actualizado", uid: "actualizacion"},
        {name: "ACTIONS", uid: "actions"},
      ];
      
      const users = [
        {
          id: 1,
          numeroCliente: "10",
          nombreComercial: "David",
          razonSocial: "Prueba 1",
          contacto: "Alex",
          rfc: "DAV49840",
          telefono: "111-111-0000",
          email: "david@gmail.com",
          vendedor: "dani",
          giro: "123",
          activo: "0",
          registro: "14-05-2023",
          actualizacion: "15-05-2023"
        },
        {
          id: 2,
          numeroCliente: "10",
          nombreComercial: "Chris",
          razonSocial: "Prueba 2",
          contacto: "Zule",
          rfc: "CHWWE587",
          telefono: "222-222-0000",
          email: "chris@gmail.com",
          vendedor: "dani",
          giro: "456",
          activo: "0",
          registro: "14-05-2023",
          actualizacion: "15-05-2023"
        },
    ];


    const renderCell = React.useCallback((user, columnKey) => {
        const cellValue = user[columnKey];
    
        switch (columnKey) {
          case "name":
            return (
              <User
                avatarProps={{radius: "lg", src: user.avatar}}
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
                <p className="text-bold text-sm capitalize text-default-400">{user.team}</p>
              </div>
            );
          case "status":
            return (
              <Chip className="capitalize" color={statusColorMap[user.status]} size="sm" variant="flat">
                {cellValue}
              </Chip>
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
              <RiUser2Fill sx={{ mr: 0.5 }} fontSize="inherit" />
              Listado de Clientes
            </Typography>
          </Breadcrumbs>
        </div>
        <div>
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
    </div>
          </>        
    )
};


export default ClientList;
