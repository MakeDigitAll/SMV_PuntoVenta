import { useNavigate } from 'react-router-dom';
import { Spacer } from "@nextui-org/react";
import Sidebar from "../../components/shared/Sidebar";
import SidebarMovil from "../../components/shared/SidebarMovill";
import HeaderPointofSale from "../../components/header/headerC/HederPointofSale";
import Cards from "../../components/shared/Cards";
import Card from "../../components/shared/Card";
import Car from "../../components/shared/Car";
import React from "react";
import  { useEffect, useState } from "react";

const PointofSale = () => {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const tableId = localStorage.getItem("tableId");
  const navigate = useNavigate();
  const [selectedAlmacen, setSelectedAlmacen] = useState(null);

  function handleLogout() {
    localStorage.removeItem("tableId");
    navigate(`/PointOfSale/Acces`);
  }

  async function loadTask() {
    try {
      const response = await fetch("https://localhost:4000/Almacenes");
      const data = await response.json();
      if (response.ok) {
        setData(data);
      }
    } catch (error) {
      console.error("Error al cargar los datos:", error);
    }
  }

  useEffect(() => {
    loadTask();
  }, []);
  async function loadTask2() {
    try {
      const response = await fetch("https://localhost:4000/AlmacenesPointSale");
      const data2 = await response.json();
      if (response.ok) {
        setData(data2);
      }
    } catch (error) {
      console.error("Error al cargar los datos:", error);
    }
  }

  useEffect(() => {
    loadTask2();
  }, []);

  const filteredData = data.filter((almacen) => almacen.id == tableId);
  
  console.log(data);
  console.log(tableId);
  return (
    <div className="bg-[#262837] w-full min-h-screen">
      <Sidebar />
      <SidebarMovil />
      <Car/>
      <Spacer y={8} />
      <main className="lg:pl-32 lg:pr-96 pb-20">
       <div className="md:p-8 p-4">
        <HeaderPointofSale />
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-16">
          <Card 
          sales="Ventas en el Turno"
          price="12,356" />
          <Card 
          sales="Operaciones en el Turno" 
          price="123" />
        </div>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Tipo</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((almacen) => (
              <tr key={almacen.id}>
                <td>{almacen.id}</td>
                <td>{almacen.nombre}</td>
                <td>{almacen.tipo}</td>
              </tr>
            ))}
            <td>
            </td>
          </tbody>
          <tbody>
            {filteredData.map((data2) => (
              <tr key={data2.id}>
                <td>{data2.nombre}</td>
                <td>{data2.maximo}</td>
                <td>{data2.minimo}</td>
              </tr>
            ))}
            <td>
            </td>
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default PointofSale;
