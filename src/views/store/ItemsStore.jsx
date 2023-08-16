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
import { RiDashboard2Fill, RiListCheck, RiStockFill, RiUser2Line, RiUser3Fill } from "react-icons/ri";
import Typography from "@mui/material/Typography";


const itemsStoreAlmacen = [
    {
        id: 1,
        name: "Surtir Pedidos",
        icon: BiBarChartSquare,
        address: "Cotizaciones",
    },
    {
        id: 2,
        name: "Logistica",
        icon: BiBookmarkPlus,
        address: "Pedidos",
        roleId: "0",
    },
    {
        id: 3,
        name: "Entradas de Almacén",
        icon: BiArchiveOut,
        address: "SurtirPedidos",
        roleId: "0",
    },
    {
        id: 4,
        name: "Salidas de Almacén",
        icon: BiArchiveOut,
        address: "SurtirPedidos",
        roleId: "0",
    },
    {
        id: 5,
        name: "Inventario",
        icon: BiArchiveOut,
        address: "SurtirPedidos",
        roleId: "0",
    },
    {
        id: 6,
        name: "Inv. X Almacén",
        icon: BiArchiveOut,
        address: "SurtirPedidos",
        roleId: "0",
    },
    {
        id: 7,
        name: "Transferencias",
        icon: BiArchiveOut,
        address: "SurtirPedidos",
        roleId: "0",
    },
    {
        id: 8,
        name: "Transferencias Masivas",
        icon: BiArchiveOut,
        address: "SurtirPedidos",
        roleId: "0",
    },
];

const itemsStoreCompras = [
    {
        id: 1,
        name: "Ordenes de Compra",
        icon: BiBarChartSquare,
        address: "Cotizaciones",
    },
    {
        id: 2,
        name: "Proveedores",
        icon: BiBookmarkPlus,
        address: "Pedidos",
        roleId: "0",
    },
    
];

const itemsStorecaptura = [
    {
        id: 1,
        name: "Marcas",
        icon: BiBarChartSquare,
        address: "Cotizaciones",
    },
    {
        id: 2,
        name: "Categorías",
        icon: BiBookmarkPlus,
        address: "Pedidos",
        roleId: "0",
    },
    {
        id: 3,
        name: "Importar Datos",
        icon: BiArchiveOut,
        address: "SurtirPedidos",
        roleId: "0",
    },

];

const ItemsStore = () => {
    
    const navigate = useNavigate();
    const [selectedKeys, setSelectedKeys] = useState(new Set(["1"]));
    

    return(
        <div className="place-content-center">
            <Header />
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
              <RiListCheck sx={{ mr: 0.5 }} fontSize="inherit" />
              Almacén
            </Typography>
          </Breadcrumbs>
        </div>
            <Accordion
                selectedKeys={selectedKeys}
                onSelectionChange={setSelectedKeys}
                variant="light"
            >
                <AccordionItem key="1" aria-label="Menu">
                    <div style={{ display: 'inline-block', marginRight: '10px'}} >Almacén
                    <div className="gap-2 sm:grid-cols flex flex-wrap justify-center" style={{width:'550px', }}>
                        {itemsStoreAlmacen.map((item, index) => (
                            <Card
                            className="w-[115px] h-[65px] col-span-15 sm:col-span-7"
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
                    </div>
                    <div style={{ display: 'inline-block', marginRight: '10px'}}> Compras
                    <div className="gap-2 sm:grid-cols flex flex-wrap justify-center" style={{width:'270px',}}>
                        {itemsStoreCompras.map((item, index) => (
                            <Card
                            className="w-[115px] h-[65px] col-span-15 sm:col-span-7"
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
                    </div>
                    <div style={{ display: 'inline-block'}}> Captura
                    <div className="gap-2 sm:grid-cols flex flex-wrap justify-center" style={{width:'410px', }}>
                        {itemsStorecaptura.map((item, index) => (
                            <Card
                            className="w-[115px] h-[65px] col-span-15 sm:col-span-7"
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
                    </div>
                </AccordionItem>
            </Accordion>
        </div>
    );  
};

export default ItemsStore;