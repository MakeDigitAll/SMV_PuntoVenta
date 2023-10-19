import { Breadcrumbs, Typography } from "@mui/material";
import {
  Link, Spacer
} from "@nextui-org/react";
import { RiDashboard2Fill, RiMoneyCnyBoxLine, RiUser2Fill } from "react-icons/ri";
import { MdDashboard, MdMonetizationOn, MdPeople, MdReport } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import Sidebar from "../../components/shared/Sidebar";
import SidebarMovil from "../../components/shared/SidebarMovill";

const PointsaleSales = () => {
  const navigate = useNavigate(); 
  const datos=[
        { id: 1, ticket: 'Ejemplo 1',fecha: 'Ejemplo 1',hora:"Pr1",cliente:"4502012", estatus: 'Descripción1@gmail.com',factura:"Zulema",monto:"1"},
        { id: 2, ticket: 'Ejemplo 2', fecha: 'Descripción 2',hora: 'Ejemplo 2',cliente:"Pr2",estatus:"4502012", factura: 'Descripción2@gmail.com',monto:"2"},
        { id: 3, ticket: 'Ejemplo 3', fecha: 'Descripción 3', hora: 'Ejemplo 3',cliente:"Pr3",estatus:"4502012", factura: 'Descripción3@gmail.com',monto:"3" },]
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
                    <Typography
                      sx={{ display: "flex", alignItems: "center" }}
                      className="text-foreground"
                    >
                      <MdMonetizationOn sx={{ mr: 0.5 }} fontSize="inherit" />
                      Ventas
                    </Typography>
                  </Breadcrumbs>
                  <Spacer y={8} />
                  <div className="flex space-x-4">
                    <button className="flex items-center space-x-2 bg-[#262837] hover:bg-red-400 text-white font-semibold py-2 px-4 rounded-full focus:ring-2 focus:ring-red-300 focus:outline-none">
                      <span className="material-icons text-xl">
                        Nueva Venta
                      </span>
                      <RiUser2Fill className="text-2xl" />
                    </button>
                    <button className="flex items-center space-x-2 bg-[#262837] hover:bg-red-400 text-white font-semibold py-2 px-4 rounded-full focus:ring-2 focus:ring-red-300 focus:outline-none">
                      <span className="material-icons text-xl">
                        Entrada Efectivo
                      </span>
                      <RiMoneyCnyBoxLine className="text-2xl" />
                    </button>
                    <button className="flex items-center space-x-2 bg-[#262837] hover:bg-red-400 text-white font-semibold py-2 px-4 rounded-full focus:ring-2 focus:ring-red-300 focus:outline-none">
                      <span className="material-icons text-xl">
                        Salida Efectivo
                      </span>
                      <RiMoneyCnyBoxLine className="text-2xl" />
                    </button>
                    <button className="flex items-center space-x-2 bg-[#262837] hover:bg-red-400 text-white font-semibold py-2 px-4 rounded-full focus:ring-2 focus:ring-red-300 focus:outline-none">
                      <span className="material-icons text-xl">
                        Checar Precios
                      </span>
                      <RiMoneyCnyBoxLine className="text-2xl" />
                    </button>
                  </div>
                  <div class="my-6 flex sm:flex-row flex-col">
                    <div class="flex flex-row mb-1 sm:mb-0">
                      <div class="relative">
                        <select class="h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block appearance-none w-full bg-[#262837] border-gray-600 text-gray-500 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-red-400 focus:border-red-300">
                          <option>All</option>
                          <option>Nuevo</option>
                          <option>Activo</option>
                          <option>Inactivo</option>
                        </select>
                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                          <svg
                            class="fill-current h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div class="block relative">
                      <span class="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                        <svg
                          viewBox="0 0 24 24"
                          class="h-4 w-4 fill-current text-gray-500"
                        >
                          <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"></path>
                        </svg>
                      </span>
                      <input
                        placeholder="Search"
                        class="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-[#262837] text-sm placeholder-gray-400 text-gray-700 focus:bg-red-400 focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
                <div class="shadow-md rounded my-12 min-h-screen">
                  <table className="bg-[#262837] w-full table-auto divide-gray-200">
                    <thead>
                      <tr class="bg-red-400 text-black uppercase text-sm leading-normal">
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                          Ticket
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                          Fecha
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                          Hora
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                          Cliente
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                          Estatus
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                          Factura
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                          Monto
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-800 uppercase tracking-wider">
                          Acciones
                        </th>
                      </tr>
                    </thead>
                    <tbody class="text-white text-sm font-light">
                      {datos.map((item) => (
                        <tr key={item.id} class="border-b border-gray-200">
                          <td className="px-6 py-4 whitespace-nowrap">
                            {item.ticket}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {item.fecha}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {item.hora}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {item.cliente}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {item.estatus}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {item.factura}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {item.monto}
                          </td>
                          <td>
                            <button
                              class="focus:ring-2 rounded-md focus:outline-none"
                              onclick="dropdownFunction(this)"
                              role="button"
                              aria-label="option"
                            >
                              <svg
                                class="dropbtn"
                                onclick="dropdownFunction(this)"
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                              >
                                <path
                                  d="M4.16667 10.8332C4.62691 10.8332 5 10.4601 5 9.99984C5 9.5396 4.62691 9.1665 4.16667 9.1665C3.70643 9.1665 3.33334 9.5396 3.33334 9.99984C3.33334 10.4601 3.70643 10.8332 4.16667 10.8332Z"
                                  stroke="#9CA3AF"
                                  stroke-width="1.25"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                ></path>
                                <path
                                  d="M10 10.8332C10.4602 10.8332 10.8333 10.4601 10.8333 9.99984C10.8333 9.5396 10.4602 9.1665 10 9.1665C9.53976 9.1665 9.16666 9.5396 9.16666 9.99984C9.16666 10.4601 9.53976 10.8332 10 10.8332Z"
                                  stroke="#9CA3AF"
                                  stroke-width="1.25"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                ></path>
                                <path
                                  d="M15.8333 10.8332C16.2936 10.8332 16.6667 10.4601 16.6667 9.99984C16.6667 9.5396 16.2936 9.1665 15.8333 9.1665C15.3731 9.1665 15 9.5396 15 9.99984C15 10.4601 15.3731 10.8332 15.8333 10.8332Z"
                                  stroke="#9CA3AF"
                                  stroke-width="1.25"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                ></path>
                              </svg>
                            </button>
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
          </div>
        </main>
      </div>
    </>
  );
};

export default PointsaleSales;