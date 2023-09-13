
import ItemsHeader from "../../components/header/ItemsHeader/ItemsHeader";
import { Accordion, AccordionItem, Card, CardBody } from "@nextui-org/react";
import { BiAlarm, BiArchiveOut, BiBarChartAlt, BiBarChartSquare, BiBookOpen, BiBookmarkPlus, BiBox, BiBullseye, BiCalendarAlt, BiCheckShield, BiClipboard, BiCreditCardFront, BiDollar, BiKey, BiMoneyWithdraw, BiSolidBarChartSquare, BiStar, BiTransfer } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Breadcrumbs from "@mui/material/Breadcrumbs"; 
import Link from "@mui/material/Link";
import { RiDashboard2Fill } from "react-icons/ri";
import Typography from "@mui/material/Typography";




const ItemsAdministration = () => {
    
    const navigate = useNavigate();
    const [selectedKeys, setSelectedKeys] = useState(new Set(["1"]));


    const itemsAdimFinanciero = [
        {
            id: 1,
            name: "Cobranza del Día",
            icon: BiAlarm,
            address: () => navigate(`/${"Administration/CollectionDay"}`),
        },
        {
            id: 2,
            name: "Créditos",
            icon: BiCreditCardFront,
            address: () => navigate(`/${"Administration/CreditNotes"}`),
            roleId: "0",
        },
        {
            id: 3,
            name: "Estados de Cuenta",
            icon: BiBookOpen,
            address: () => navigate(`/${"Administration/AccountStates"}`),
            roleId: "0",
        },
    ];
    
    const itemsAdimOperaciones = [
        {
            id: 1,
            name: "Margen Ventas",
            icon: BiBarChartSquare,
            address: () => navigate(`/${"Administration/MarginSales"}`),
        },
        {
            id: 2,
            name: "Reporte Ventas",
            icon:  BiBarChartAlt,
            address: () => navigate(`/${"Administration/SalesReport"}`),
            roleId: "0",
        },
        {
            id: 3,
            name: "Listado de Precios",
            icon: BiDollar,
            address:  () => navigate(`/${"Administration/PriceList"}`),
            roleId: "0",
        },
        {
            id: 4,
            name: "Descuentos",
            icon: BiMoneyWithdraw,
            address: () => navigate(`/${"Administration/Discounts"}`),
            roleId: "0",
        },
        {
            id: 5,
            name: "Token de Descuentos",
            icon: BiKey,
            address: () => navigate(`/${"Administration/DiscountToken"}`),
            roleId: "0",
        },
        {
            id: 6,
            name: "Tipo de Cambio",
            icon: BiTransfer,
            address: () => navigate(`/${"Administration/ExchangeRate"}`),
            roleId: "0",
        },
    ];
    
    const itemsAdimVendedores = [
        {
            id: 1,
            name: "Comisiones",
            icon: BiBullseye,
            address: () => navigate(`/${"Administration/Commissions"}`),
        },
        {
            id: 2,
            name: "Rpt. Comisiones",
            icon: BiBox,
            address:  () => navigate(`/${"Administration/ReportCommissions"}`),
            roleId: "0",
        },
        {
            id: 3,
            name: "Comisiones Agrupado",
            icon: BiCalendarAlt,
            address: () => navigate(`/${"Administration/GroupedCommissions"}`),
            roleId: "0",
        },
    
    ];


    return(
        <div className="place-content-center">
            
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
                            className="w-[115px] h-[65px] col-span-15 sm:col-span-7"
                            shadow="md"
                            key={index}
                            isPressable
                            onPress={item.address}
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
                    <div style={{ display: 'inline-block', marginRight: '5px'}}> Operaciones
                    <div className="gap-2 sm:grid-cols flex flex-wrap justify-center" style={{width:'410px'}}>
                        {itemsAdimOperaciones.map((item, index) => (
                            <Card
                            className="w-[115px] h-[65px] col-span-15 sm:col-span-7"
                            shadow="md"
                            key={index}
                            isPressable
                            onPress={item.address}
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
                    <div style={{ display: 'inline-block'}}> Vendedores
                    <div className="gap-2 sm:grid-cols flex flex-wrap justify-center" style={{width:'410px' }}>
                        {itemsAdimVendedores.map((item, index) => (
                            <Card
                            className="w-[115px] h-[65px] col-span-15 sm:col-span-7"
                            shadow="md"
                            key={index}
                            isPressable
                            onPress={item.address}
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

export default ItemsAdministration;