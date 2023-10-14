import ItemsHeaderPointofSale from "../../components/header/headerC/HederPointofSale";
import React from "react";
import { RiBox1Fill, RiDashboard2Fill } from "react-icons/ri";
import { BiColumns, BiGroup } from "react-icons/bi";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardBody, Spacer,Tab,Tabs, } from "@nextui-org/react";
import { MdClose } from "react-icons/md";
import Sidebar from "../../components/shared/Sidebar";
import SidebarMovil from "../../components/shared/SidebarMovill";
import HeaderPointofSale from "../../components/header/headerC/HederPointofSale";
import Cards from "../../components/shared/Cards";

const PointofSale = () => {
 const navigate = useNavigate(); 
  return (
    <div className="place-content-center">
    <Sidebar/>
    <SidebarMovil/>
    <Spacer y={8}/>
      <main className="lg:pl-28">
        <Breadcrumbs aria-label="breadcrumb" color="foreground">
          <Link
            className="text-foreground"
            underline="hover"
            sx={{ display: "flex", alignItems: "center" }}
            color="foreground"
            href="#"
            onClick={() => navigate(`/${"/PointofSale"}`)}
          >
            <RiDashboard2Fill sx={{ mr: 0.5 }} fontSize="inherit" />
            Inicio
          </Link>
          <Link
            className="text-foreground"
            underline="hover"
            sx={{ display: "flex", alignItems: "center" }}
            color="foreground"
            onClick={() => navigate(`/${"PointOfSale/Acces"}`)}

          >
            
            <RiBox1Fill sx={{ mr: 0.5 }} fontSize="inherit" />
            Almacén
          </Link>
          <Typography
            sx={{ display: "flex", alignItems: "center" }}
            className="text-foreground"
          >
            <BiColumns sx={{ mr: 0.5 }} fontSize="inherit" />
            Punto de venta
          </Typography>
        </Breadcrumbs>
        <HeaderPointofSale/>
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
            {/* Card */}
            <Cards
              img="comida.png"
              description="Speacy seasoned seafood nodles"
              price="2.29"
              inventory="20"
            />
        </div>
      </main>
    </div>
          
  );
};

export default PointofSale;
