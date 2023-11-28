import { useNavigate } from 'react-router-dom';
import { Spacer } from "@nextui-org/react";
import Sidebar from "../../components/shared/Sidebar";
import SidebarMovil from "../../components/shared/SidebarMovill";
import HeaderPointofSale from "../../components/header/headerC/HederPointofSale";
import Cards from "../../components/shared/Cards";
import Card from "../../components/shared/Card.jsx";
import React from "react";
import  { useEffect, useState } from "react";
import ProductsCards from '../../components/shared/CardsProducts';

const ProductsPOS = () => {
  const [data, setData] = useState([]);
  const [buscador, setBuscador] = useState("");
  
  const tableId = localStorage.getItem("tableId");
  const navigate = useNavigate();


  function handleLogout() {
    localStorage.removeItem("tableId");
    navigate(`/POS/Access`);
  }


  

  
  return (
    <div className="bg-[#262837] w-full min-h-screen">
      <Sidebar />
      <SidebarMovil />
      <Spacer y={8} />
      <main className="lg:pl-32 ">
       <div className="md:p-8 p-4">
        <HeaderPointofSale />
        <ProductsCards>
            a
        </ProductsCards>
        </div>
        
      </main>
    </div>
  );
};

export default ProductsPOS;
