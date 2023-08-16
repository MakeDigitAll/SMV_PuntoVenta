import Header from "../../components/header/headerC/Header";
import ItemsHeader from "../../components/header/ItemsHeader/ItemsHeader";
import { Accordion, AccordionItem, Card, CardBody } from "@nextui-org/react";
import { BiAlarm, BiArchiveOut, BiBarChartSquare, BiBookOpen, BiBookmarkPlus, BiCheckShield, BiClipboard, BiCreditCardFront, BiMoneyWithdraw, BiSolidBarChartSquare, BiStar } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Breadcrumbs from "@mui/material/Breadcrumbs"; 
import Link from "@mui/material/Link";
import { RiDashboard2Fill } from "react-icons/ri";
import Typography from "@mui/material/Typography";

const itemsAdimFinanciero = [
    {
        id: 1,
        name: "Cobranza del Día",
        icon: BiAlarm,
        address: "Cobranza",
    },
    {
        id: 2,
        name: "Créditos",
        icon: BiCreditCardFront,
        address: "creditos",
        roleId: "0",
    },
    {
        id: 3,
        name: "Estados de Cuenta",
        icon: BiBookOpen,
        address: "estasdosCuenta",
        roleId: "0",
    },
];

const itemsAdimOperaciones = [
    {
        id: 1,
        name: "Margen Ventas",
        icon: BiBarChartSquare,
        address: "MargenVentas",
    },
    {
        id: 2,
        name: "Reporte Ventas",
        icon: BiBookmarkPlus,
        address: "Pedidos",
        roleId: "0",
    },
    {
        id: 3,
        name: "Listado de Precios",
        icon: BiArchiveOut,
        address: "ListadoPrecios",
        roleId: "0",
    },
    {
        id: 4,
        name: "Descuentos",
        icon: BiArchiveOut,
        address: "Descuentos",
        roleId: "0",
    },
    {
        id: 5,
        name: "Token de Descuentos",
        icon: BiArchiveOut,
        address: "TokenDescuentos",
        roleId: "0",
    },
    {
        id: 6,
        name: "Tipo de Cambio",
        icon: BiArchiveOut,
        address: "TipoCambio",
        roleId: "0",
    },
];

const itemsAdimVendedores = [
    {
        id: 1,
        name: "Comisiones",
        icon: BiBarChartSquare,
        address: "Comisiones",
    },
    {
        id: 2,
        name: "Rpt. Comisiones",
        icon: BiBookmarkPlus,
        address: "RepComisiones",
        roleId: "0",
    },
    {
        id: 3,
        name: "Rpt. Comisiones Agrupado",
        icon: BiArchiveOut,
        address: "RepComisionesAgrup",
        roleId: "0",
    },

];

const ItemsAdministration = () => {
    
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
              <BiSolidBarChartSquare sx={{ mr: 0.5 }} fontSize="inherit" />
              Administración
            </Typography>
          </Breadcrumbs>
        </div>
            <Accordion
                selectedKeys={selectedKeys}
                onSelectionChange={setSelectedKeys}
                variant="light"
            >
                <AccordionItem key="1" aria-label="Menu">
                    <div style={{ display: 'inline-block', marginRight: '5px'}} >Financiero
                    <div className="gap-2 sm:grid-cols flex flex-wrap justify-center" style={{width:'410px'}}>
                        {itemsAdimFinanciero.map((item, index) => (
                            <Card
                            className="w-[130px] h-[70px] col-span-15 sm:col-span-7"
                            shadow="md"
                            key={index}
                            isPressable
                            //onPress={() => navigate(`/${item.address}`)}
                            >
                                <CardBody className="overflow-visible py-2">
                                    <div className="flex justify-center items-center">
                                        <item.icon className="h-7 w-7"/>
                                    </div>
                                    <div className="text-center" style={{ marginTop: "3px" }}>
                                        <h6 style={{fontSize:'11px'}}>{item.name}</h6>
                                    </div>
                                </CardBody>
                            </Card>
                        ))}
                    </div>
                    </div>
                    <div style={{ display: 'inline-block', marginRight: '5px'}}> Operaciones
                    <div className="gap-2 sm:grid-cols flex flex-wrap justify-center" style={{width:'410px'}}>
                        {itemsAdimOperaciones.map((item, index) => (
                            <Card
                            className="w-[130px] h-[70px] col-span-15 sm:col-span-7"
                            shadow="md"
                            key={index}
                            isPressable
                            //onPress={() => navigate(`/${item.address}`)}
                            >
                                <CardBody className="overflow-visible py-2">
                                    <div className="flex justify-center items-center">
                                        <item.icon className="h-7 w-7"/>
                                    </div>
                                    <div className="text-center" style={{ marginTop: "3px" }}>
                                        <h6 style={{fontSize:'11px'}}>{item.name}</h6>
                                    </div>
                                </CardBody>
                            </Card>
                        ))}
                    </div>
                    </div>
                    <div style={{ display: 'inline-block'}}> Vendedores
                    <div className="gap-2 sm:grid-cols flex flex-wrap justify-center" style={{width:'410px' }}>
                        {itemsAdimVendedores.map((item, index) => (
                            <Card
                            className="w-[130px] h-[70px] col-span-15 sm:col-span-7"
                            shadow="md"
                            key={index}
                            isPressable
                            //onPress={() => navigate(`/${item.address}`)}
                            >
                                <CardBody className="overflow-visible py-2">
                                    <div className="flex justify-center items-center">
                                        <item.icon className="h-7 w-7"/>
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

export default ItemsAdministration;