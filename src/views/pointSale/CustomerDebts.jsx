import { Breadcrumbs, Typography } from "@mui/material";
import {
  Link, Spacer
} from "@nextui-org/react";
import { RiDashboard2Fill } from "react-icons/ri";
import { MdDashboard, MdEmojiPeople, MdPeople,MdSearch } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import Sidebar from "../../components/shared/Sidebar";
import SidebarMovil from "../../components/shared/SidebarMovill";

const CustomerDebts = () => {
  const navigate = useNavigate(); 
  const datos=[
        { id: 1, fechaCobro:'Hola1', fecha: 'Ejemplo 1',detalle: 'Ejemplo 1',importe:"Pr1",saldo:"4502012", metodoPago: 'Descripción1@gmail.com' },
        { id: 2, fechaCobro:'Hola1', fecha: 'Ejemplo 2', detalle: 'Ejemplo 2',importe:"Pr2",saldo:"4502012", metodoPago: 'Descripción2@gmail.com'},
        { id: 3, fechaCobro:'Hola1', fecha: 'Ejemplo 3', detalle: 'Ejemplo 3',importe:"Pr3",saldo:"4502012", metodoPago: 'Descripción3@gmail.com'},]
  return (
    <>
      <div className="bg-[#262837] w-full min-h-screen">
        <Sidebar />
        <SidebarMovil />
        <Spacer y={8} />
        <main className="lg:pl-28 lg:pr-90 pb-15">
          <div className="p-10" style={{ overflow: "auto" }}>
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
                    <Link
                      className="text-foreground"
                      underline="hover"
                      sx={{ display: "flex", alignItems: "center" }}
                      color="foreground"
                      href="#"
                      onClick={() => navigate(`/PointofSale`)}
                    >
                      <MdPeople sx={{ mr: 0.5 }} fontSize="inherit" />
                      Clientes
                    </Link>
                    <Typography
                      sx={{ display: "flex", alignItems: "center" }}
                      className="text-foreground"
                    >
                      <MdEmojiPeople sx={{ mr: 0.5 }} fontSize="inherit" />
                      Adeudo del Cliente
                    </Typography>
                  </Breadcrumbs>
                  <Spacer y={8} />
                  <div
                    className="flex flex-col gap-4"
                    style={{ marginLeft: "10px", marginRight: "10px" }}
                  > 
                    </div>
                  </div>
                </div>
                <div class="shadow-md rounded my-6 overflow-x-auto">
                  <table className="bg-[#262837] min-w-600px w-full table-auto divide-gray-200">
                    <thead>
                      <tr class="bg-red-400 text-black uppercase text-sm leading-normal">
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                          Fecha Cobro
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                          Fecha
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                          Detalle
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                          Importe
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                          Saldo
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                          Método de Pago
                        </th>
                      </tr>
                    </thead>
                    <tbody class="text-white text-sm font-light">
                      {datos.map((item) => (
                        <tr key={item.id} class="border-b border-gray-200">
                          <td className="px-6 py-4 whitespace-nowrap">
                            {item.fechaCobro}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {item.fecha}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {item.detalle}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {item.importe}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {item.saldo}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {item.metodoPago}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div class="px-5 py-5 bg-[#262837] border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
                    <span class="text-xs xs:text-sm text-gray-400">
                      Showing 1 to 4 of 50 Entries
                    </span>
                    <div class="inline-flex mt-2 xs:mt-0">
                      <button class="text-sm bg-red-400 hover:bg-red-200 text-gray-800 font-semibold py-2 px-4 rounded-l">
                        Prev
                      </button>
                      <button class="text-sm bg-red-300 hover:bg-red-200 text-gray-800 font-semibold py-2 px-4 rounded-r">
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </main>
      </div>
    </>
  );
};

export default CustomerDebts;