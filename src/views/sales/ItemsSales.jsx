import Header from "../../components/header/headerC/Header";
import ItemsHeader from "../../components/header/ItemsHeader/ItemsHeader";
import { Accordion, AccordionItem, Card, CardBody } from "@nextui-org/react";
import { TbRoad } from "react-icons/tb";
import { BiArchiveOut, BiBarChartSquare, BiBookmarkPlus, BiCheckShield, BiMoneyWithdraw, BiStar } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Breadcrumbs from "@mui/material/Breadcrumbs"; 
import Link from "@mui/material/Link";
import { RiCoinFill, RiDashboard2Fill } from "react-icons/ri";
import Typography from "@mui/material/Typography";

const itemsSales = [
    {
        id: 1,
        name: "Cotizaciones",
        icon: BiBarChartSquare,
        address: "Cotizaciones",
    },
    {
        id: 2,
        name: "Pedidos",
        icon: BiBookmarkPlus,
        address: "Pedidos",
        roleId: "0",
    },
    {
        id: 3,
        name: "Surtir Pedidos",
        icon: BiArchiveOut,
        address: "SurtirPedidos",
        roleId: "0",
    },
    {
        id: 4,
        name: "Pagos",
        icon: BiMoneyWithdraw,
        address: "Pagos",
        roleId: "0",
    },
    {
        id: 5,
        name: "Promociones",
        icon: BiStar,
        address: "Promociones",
        roleId: "0",
    },
    {
        id: 6,
        name: "Inventario",
        icon: BiCheckShield,
        address: "inventario",
        roleId: "0",
    },
    {
        id: 7,
        name: "Visitas",
        icon: TbRoad,
        address: "Visitas",
        roleId: "0",
    },
];

const ItemsSales = () => {
    
    const navigate = useNavigate();
    const [selectedKeys, setSelectedKeys] = useState(new Set(["1"]));

    return(
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
              <RiCoinFill sx={{ mr: 0.5 }} fontSize="inherit" />
              Ventas
            </Typography>
          </Breadcrumbs>
        </div>
            <Accordion
                selectedKeys={selectedKeys}
                onSelectionChange={setSelectedKeys}
                variant="light"
            >
                <AccordionItem key="1" aria-label="Menu">
                    <div className="gap-2 sm:grid-cols-13 flex flex-wrap justify-center">
                        {itemsSales.map((item, index) => (
                            <Card
                            className="w-[110px] h-[60px] col-span-15 sm:col-span-7"
                            shadow="md"
                            key={index}
                            isPressable
                            //onPress={() => navigate(`/${item.address}`)}
                            >
                                <CardBody className="overflow-visible py-2">
                                    <div className="flex justify-center items-center">
                                        <item.icon className="h-5 w-5"/>
                                    </div>
                                    <div className="text-center" style={{ marginTop: "3px" }}>
                                        <h6 style={{fontSize:'11px'}}>{item.name}</h6>
                                    </div>
                                </CardBody>
                            </Card>
                        ))}
                    </div>
                </AccordionItem>
            </Accordion>
        </div>
    );  
};

export default ItemsSales;