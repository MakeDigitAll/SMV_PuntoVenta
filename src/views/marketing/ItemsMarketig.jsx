
import ItemsHeader from "../../components/header/ItemsHeader/ItemsHeader";
import { Accordion, AccordionItem, Card, CardBody } from "@nextui-org/react";
import { TbMailDollar, TbMoodDollar, TbRoad } from "react-icons/tb";
import { BiArchiveOut, BiBarChartSquare, BiBookmarkPlus, BiCheckShield, BiMoneyWithdraw, BiStar, BiColumns, BiSolidChevronUp, BiArchive, BiDollar } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Breadcrumbs from "@mui/material/Breadcrumbs"; 
import Link from "@mui/material/Link";
import { RiDashboard2Fill, RiFileUserFill, RiRecordCircleFill, RiRecordCircleLine, RiUser2Line, RiUser3Fill } from "react-icons/ri";
import Typography from "@mui/material/Typography";
import { BiIdCard, BiSolidBarChartSquare } from "react-icons/bi";
import { MdFastForward, MdFastRewind, MdMicExternalOn, MdMoney, MdMoneyOff, MdPadding, MdPeople, MdProductionQuantityLimits, MdRecordVoiceOver, MdStackedBarChart } from "react-icons/md";


const itemsMarketing = [
    {
        id: 1,
        name: "Rpt. Clientes",
        icon: RiFileUserFill,
        address: "ClientReport",
    },
    {
        id: 2,
        name: "Rpt. Clientes por Fecha",
        icon: MdPeople,
        address: "RptClientesFecha",
        roleId: "0",
    },
    {
        id: 3,
        name: "Cat. Giros",
        icon: BiArchive,
        address: "CatGiros",
        roleId: "0",
    },
    {
        id: 4,
        name: "Ventas por Cliente",
        icon: BiMoneyWithdraw,
        address: "SalesCustomer",
        roleId: "0",
    },
    {
        id: 5,
        name: "Margen Productos",
        icon: MdProductionQuantityLimits,
        address: "MargenProductos",
        roleId: "0",
    },
    {
        id: 6,
        name: "Costo Productos",
        icon: MdStackedBarChart,
        address: "CostoProductos",
        roleId: "0",
    },
    {
        id: 7,
        name: "Record Productos",
        icon: RiRecordCircleLine,
        address: "RecordProductos",
        roleId: "0",
    },
    {
        id: 8,
        name: "Record Compras",
        icon: BiDollar,
        address: "RercorCompras",
        roleId: "0",
    },
];

const ItemsSMarketing = () => {
    
    const navigate = useNavigate();
    const [selectedKeys, setSelectedKeys] = useState(new Set(["1"]));

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
              <BiColumns sx={{ mr: 0.5 }} fontSize="inherit" />
              Mercadotecnia
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
                        {itemsMarketing.map((item, index) => (
                            <Card
                            className="w-[115px] h-[65px] col-span-15 sm:col-span-7"
                            shadow="md"
                            key={index}
                            isPressable
                            onPress={() => navigate(`/Marketing/${item.address}`)}
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

export default ItemsSMarketing;