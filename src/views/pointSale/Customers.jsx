import ItemsHeaderPointofSale from "../../components/header/itemsHeader/ItemsHeaderPointofSale";
import { ToastContainer } from "react-toastify";
import { Breadcrumbs, Typography } from "@mui/material";
import {
  Link,
  Spacer,
  TableHeader,
  TableColumn,
  TableRow,
  TableBody,
  Table,
  TableCell,
} from "@nextui-org/react";
import { RiDashboard2Fill } from "react-icons/ri";
import { MdDashboard, MdPeople, MdReport } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const Customers = () => {
  const navigate = useNavigate(); 
  return (
    <>
      <ItemsHeaderPointofSale />
      <ToastContainer />
      <div className="p-12">
        {/* <div className="p-12 bg-gray-100"> */}
        <div className="">
          <div>
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
                <Link
                  className="text-foreground"
                  underline="hover"
                  sx={{ display: "flex", alignItems: "center" }}
                  color="foreground"
                  href="#"
                  onClick={() => navigate(`/PointofSale`)}
                >
                  <MdDashboard sx={{ mr: 0.5 }} fontSize="inherit" />
                  Dashboard
                </Link>
                <Typography
                  sx={{ display: "flex", alignItems: "center" }}
                  className="text-foreground"
                >
                  <MdPeople sx={{ mr: 0.5 }} fontSize="inherit" />
                  Clientes
                </Typography>
              </Breadcrumbs>
            </div>
            <Spacer y={5} />
            <div className="md:col-span-12" style={{ marginLeft: "40px", marginRight: "40px" }}>
              <Table removeWrapper aria-label="Example static collection table">
                <TableHeader>
                  <TableColumn>Imagen</TableColumn>
                  <TableColumn>Nombre Cliente</TableColumn>
                  <TableColumn>Nombre Comercial</TableColumn>
                  <TableColumn>Contacto Principal</TableColumn>
                  <TableColumn>Teléfono</TableColumn>
                  <TableColumn>Correo</TableColumn>
                  <TableColumn>Vendedor</TableColumn>
                  <TableColumn>Acciones</TableColumn>
                </TableHeader>
                <TableBody>
                  {/* {datos.map((data, index) => (
                    <TableRow key={data.id}>
                      <TableCell>{data.codigoEmpresa}</TableCell>
                      <TableCell>{data.nombre}</TableCell>
                      <TableCell>{data.marca}</TableCell>
                      <TableCell>{data.existencia}</TableCell>
                      <TableCell>{data.precio}</TableCell>
                      <TableCell>{data.descuento}</TableCell>
                      <TableCell>{data.total}</TableCell>
                    </TableRow>
                  ))} */}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Customers;