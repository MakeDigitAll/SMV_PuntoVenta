import Header from "../../components/header/headerC/Header";
import ItemsHeader from "../../components/header/ItemsHeader/ItemsHeader";
import { Card, CardBody, Spacer } from "@nextui-org/react";
import {
  BiAlignJustify,
  BiAlignMiddle,
  BiAlignRight,
  BiClipboard,
  BiQr,
} from "react-icons/bi";
import { ToastContainer } from "react-toastify";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { RiDashboard2Fill } from "react-icons/ri";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

const itemsBilling = [
  {
    id: 1,
    name: "Rpt. Facturas",
    icon: BiQr,
    address: "RptFacturas",
  },
  {
    id: 2,
    name: "Fact. Global",
    icon: BiAlignJustify,
    address: "FactGlobal",
    roleId: "0",
  },
  {
    id: 3,
    name: "Notas de Credito",
    icon: BiAlignMiddle,
    address: "NotasCredito",
    roleId: "0",
  },
  {
    id: 4,
    name: "Complementos de Pago",
    icon: BiAlignRight,
    address: "ComplementoPago",
    roleId: "0",
  },
];

const ItemsBilling = () => {
  const navigate = useNavigate();
  return (
    <div className="place-content-center">
      <Header />
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
      <div style={{marginTop: "30px", marginLeft:'30px'}}>
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
            <BiClipboard sx={{ mr: 0.5 }} fontSize="inherit" />
            Facturación
          </Typography>
        </Breadcrumbs>
      </div>
      <Spacer y={6} />
      <div className="gap-2 sm:grid-cols-13 flex flex-wrap justify-center">
        {itemsBilling.map((item, index) => (
          <Card
            className="w-[115px] h-[65px] col-span-15 sm:col-span-7"
            shadow="md"
            key={index}
            isPressable
            //onPress={() => navigate(`/${item.address}`)}
          >
            <CardBody className="overflow-visible py-2">
              <div className="flex justify-center items-center">
                <item.icon className="h-5 w-5" />
              </div>
              <div className="text-center" style={{ marginTop: "3px" }}>
                <h6 style={{ fontSize: "11px" }}>{item.name}</h6>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ItemsBilling;
