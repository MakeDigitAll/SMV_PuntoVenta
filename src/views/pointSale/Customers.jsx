import { Breadcrumbs, Typography } from "@mui/material";
import {
  Link, Spacer
} from "@nextui-org/react";
import { RiDashboard2Fill } from "react-icons/ri";
import { MdDashboard, MdPeople, MdReport } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import Sidebar from "../../components/shared/Sidebar";
import SidebarMovil from "../../components/shared/SidebarMovill";

const Customers = () => {
  const navigate = useNavigate(); 
  const datos=[
        { id: 1, imagen:'Hola1', nombre: 'Ejemplo 1',nombreComercial: 'Ejemplo 1',contactoPrincipal:"Pr1",telefono:"4502012", correo: 'Descripción1@gmail.com',vendedor:"Zulema",activo:"1",registro:"2023-02-14",actualizado:"2023-10-18" },
        { id: 2, imagen:'Hola1', nombre: 'Ejemplo 2', nombreComercial: 'Ejemplo 2',contactoPrincipal:"Pr2",telefono:"4502012", correo: 'Descripción2@gmail.com',vendedor:"Zulema",activo:"1",registro:"2023-02-14",actualizado:"2023-10-18"},
        { id: 3, imagen:'Hola1', nombre: 'Ejemplo 3', nombreComercial: 'Ejemplo 3',contactoPrincipal:"Pr3",telefono:"4502012", correo: 'Descripción3@gmail.com',vendedor:"Zulema",activo:"1",registro:"2023-02-14",actualizado:"2023-10-18" },]
  return (
    <>
      <div className="bg-[#262837] w-full min-h-screen">
        <Sidebar />
        <SidebarMovil />
        <Spacer y={8} />
        <main className="lg:pl-28 lg:pr-90 pb-15">
          <div className="p-10"  style={{ overflow: 'auto' }}>
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
                      <MdPeople sx={{ mr: 0.5 }} fontSize="inherit" />
                      Clientes
                    </Typography>
                  </Breadcrumbs>
                  <Spacer y={8} />
                  <div class="my-2 flex sm:flex-row flex-col">
                <div class="flex flex-row mb-1 sm:mb-0">
                    <div class="relative">
                        <select
                            class="appearance-none h-full rounded-l border block  w-full bg-[#262837] border-gray-600 text-gray-500 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-red-400 focus:border-red-300">
                            <option>5</option>
                            <option>10</option>
                            <option>20</option>
                        </select>
                        <div
                            class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                        </div>
                    </div>
                    <div class="relative">
                        <select
                            class="h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block appearance-none w-full bg-[#262837] border-gray-600 text-gray-500 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-red-400 focus:border-red-300">
                            <option>All</option>
                            <option>Active</option>
                            <option>Inactive</option>
                        </select>
                        <div
                            class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div class="block relative">
                    <span class="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                        <svg viewBox="0 0 24 24" class="h-4 w-4 fill-current text-gray-500">
                            <path
                                d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z">
                            </path>
                        </svg>
                    </span>
                    <input placeholder="Search"
                        class="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-[#262837] text-sm placeholder-gray-400 text-gray-700 focus:bg-red-400 focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none" />
                </div>
            </div>
                </div>
                <div class="shadow-md rounded my-6">
                  <table className="bg-[#262837] min-w-600px w-90% table-auto divide-gray-200">
                    <thead>
                      <tr class="bg-red-400 text-black uppercase text-sm leading-normal">
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                          ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                          Imagen
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                          Nombre
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                          Nombre Comercial
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                          Contacto
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                          Telefono
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                          Correo
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                          Vendedor
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                          Activo
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                          Registro
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                          Actualizado
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
                            {item.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {item.imagen}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {item.nombre}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {item.nombreComercial}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {item.contactoPrincipal}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {item.telefono}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {item.correo}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {item.vendedor}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {item.activo}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {item.registro}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {item.actualizado}
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
                  <div
                        class="px-5 py-5 bg-[#262837] border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
                        <span class="text-xs xs:text-sm text-gray-400">
                            Showing 1 to 4 of 50 Entries
                        </span>
                        <div class="inline-flex mt-2 xs:mt-0">
                            <button
                                class="text-sm bg-red-400 hover:bg-red-200 text-gray-800 font-semibold py-2 px-4 rounded-l">
                                Prev
                            </button>
                            <button
                                class="text-sm bg-red-300 hover:bg-red-200 text-gray-800 font-semibold py-2 px-4 rounded-r">
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

export default Customers;