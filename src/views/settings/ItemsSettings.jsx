import Header from "../../components/header/headerC/Header";
import ItemsHeader from "../../components/header/ItemsHeader/ItemsHeader";
import { Accordion, AccordionItem, Card, CardBody } from "@nextui-org/react";
import { BiArchiveOut, BiBarChartSquare, BiBookmarkPlus, BiCog, BiDollar, BiMoneyWithdraw, BiStoreAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs"; 
import Link from "@mui/material/Link";
import { RiDashboard2Fill } from "react-icons/ri";
import Typography from "@mui/material/Typography";
import { MdPeople, MdSecurity, MdSecurityUpdate } from "react-icons/md";


const itemsSettings = [
    {
        id: 1,
        name: "usuarios",
        icon: MdPeople,
        address: "Users",
    },
    {
        id: 2,
        name: "Perfiles de Seguridad",
        icon: MdSecurity,
        address: "PerfilesSeguridad",
        roleId: "0",
    },
    {
        id: 3,
        name: "Sucursales",
        icon: BiStoreAlt,
        address: "Sucursales",
        roleId: "0",
    },
    {
        id: 4,
        name: "Formas de Pago",
        icon: BiDollar,
        address: "FormasPagos",
        roleId: "0",
    },
];

const ItemsSettings = () => {
    
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
              <BiCog sx={{ mr: 0.5 }} fontSize="inherit" />
              Ajustes
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
                        {itemsSettings.map((item, index) => (
                            <Card
                            className="w-[115px] h-[65px] col-span-15 sm:col-span-7"
                            shadow="md"
                            key={index}
                            isPressable
                            onPress={() => navigate(`/Settings/${item.address}`)}
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

export default ItemsSettings;