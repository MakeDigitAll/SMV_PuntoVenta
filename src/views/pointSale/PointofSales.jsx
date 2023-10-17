import ItemsHeaderPointofSale from "../../components/header/headerC/HederPointofSale";
import React, { useEffect, useState } from "react";
import { RiBox1Fill, RiDashboard2Fill } from "react-icons/ri";
import { BiColumns, BiGroup } from "react-icons/bi";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";
import { Button, Spacer } from "@nextui-org/react";
import Sidebar from "../../components/shared/Sidebar";
import SidebarMovil from "../../components/shared/SidebarMovill";
import HeaderPointofSale from "../../components/header/headerC/HederPointofSale";

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
    <div className="place-content-center">
      <Sidebar />
      <SidebarMovil />
      <Spacer y={8} />
      <main className="lg:pl-28">
        <Breadcrumbs aria-label="breadcrumb" color="foreground">
          {/* ... (código anterior) ... */}
        </Breadcrumbs>
        <HeaderPointofSale />
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
