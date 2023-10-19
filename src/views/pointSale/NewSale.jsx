import { useNavigate } from 'react-router-dom';
import { Spacer } from "@nextui-org/react";
import Sidebar from "../../components/shared/Sidebar";
import SidebarMovil from "../../components/shared/SidebarMovill";
import Car from "../../components/shared/Car";
import React from "react";
import { useState } from "react";
import { Breadcrumbs, Typography } from "@mui/material";
import {
  Link
} from "@nextui-org/react";
import { RiDashboard2Fill } from "react-icons/ri";
import { MdDashboard, MdMoney } from "react-icons/md";

const NewSale = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showOrder, setShowOrder] = useState(false);
  const toggleMenu = () => {
    setShowMenu(!showMenu);
    setShowOrder(false);
  };

  const toggleOrders = () => {
    setShowOrder(!showOrder);
    setShowMenu(false);
  };
  return (
    <>
      <div className="bg-[#262837] w-full min-h-screen">
        <Sidebar showMenu={showMenu}/>
        <SidebarMovil 
        onClick={toggleOrders} className="p-2"
        />
        <Car showOrder={showOrder} setShowOrder={setShowOrder} />
        <Spacer y={8} />
        <main className="lg:pl-32 lg:pr-96 pb-20">
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
                  <MdMoney sx={{ mr: 0.5 }} fontSize="inherit" />
                  Nueva Venta
                </Typography>
              </Breadcrumbs>
            </div>
          </div>
        </div>
      </div>
        </main>
      </div>
    </>
  );
};

export default NewSale;