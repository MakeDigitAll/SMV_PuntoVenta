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
import { MdDashboard, MdReport } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const Reports = () => {
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
                  <MdReport sx={{ mr: 0.5 }} fontSize="inherit" />
                  Reportes
                </Typography>
              </Breadcrumbs>
            </div>
            <Spacer y={5} />
            <div className="md:col-span-12" style={{ marginLeft: "40px", marginRight: "40px" }}>
              <Table removeWrapper aria-label="Example static collection table">
                <TableHeader>
                  <TableColumn>Código</TableColumn>
                  <TableColumn>Nombre</TableColumn>
                  <TableColumn>Marca</TableColumn>
                  <TableColumn>Cantidad</TableColumn>
                  <TableColumn>Inv.</TableColumn>
                  <TableColumn>Precio Uni.</TableColumn>
                  <TableColumn>Descuento</TableColumn>
                  <TableColumn>Total</TableColumn>
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
            <div className="lg:col-span-2">
              <div className="grid gap-2 gap-y-2 text-sm grid-cols-1 md:grid-cols-12 space-x-4 space-y-4 content-end">
                <div className="md:col-span-12">
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-12 space-x-4 space-y-4 content-end">
                    <Spacer y={12} />
                    <div className="md:col-span-12"></div>
                    <div className="md:col-span-13"></div>
                    <div className="md:col-span-10">
                      <div style={{ marginLeft: "60px" }}>
                        <Table
                          selectionMode="single"
                          hideHeader
                          aria-label="Example static collection table"
                        >
                          <TableHeader>
                            <TableColumn>NAME</TableColumn>
                            <TableColumn>ROLE</TableColumn>
                          </TableHeader>
                          <TableBody>
                            <TableRow key="1">
                              <TableCell>Total de Ventas</TableCell>
                              <TableCell>$0.00</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Reports;