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
import NewSaleProductos from './NewSaleProducts';
import { useLocation } from 'react-router-dom';
import HeaderPointofSale from '../../components/header/headerC/HederPointofSale';

const NewSale = () => {
  const [showOrder, setShowOrder] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showCar, setShowCar] = useState(false);
  const location = useLocation();
  const toggleCar = () => {
    setShowCar((prevShowCar) => !prevShowCar); // Cambiar entre verdadero y falso
  };
  return (
    <>
     
      <div className="bg-[#262837] w-full min-h-screen">
        <Sidebar showMenu={showMenu}/>
        <SidebarMovil showCar={showCar} // Pasa el estado de showCar como una prop
        setShowCar={toggleCar} // Pasa la función de toggleCar
        currentPage={location.pathname} />
        
        <Spacer y={8} />
        <main className="lg:pl-32 lg:pr-96 pb-20">
          <div className="p-12">
          <HeaderPointofSale/>
    
        <div className="">
          <div>
            <div>
            <NewSaleProductos showOrder={showOrder} setShowOrder={setShowOrder}/>
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