import { Breadcrumbs, Typography } from "@mui/material";
import {
  Input,
  Link, Spacer
} from "@nextui-org/react";
import { RiDashboard2Fill } from "react-icons/ri";
import { MdDashboard, MdMoneyOff, MdReport, MdSearch } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import Sidebar from "../../components/shared/Sidebar";
import SidebarMovil from "../../components/shared/SidebarMovill";

const ListCashCuts = () => {
  const navigate = useNavigate(); 
  const [data1, setData] = useState([]);
  async function loadTask() {
    try {
      const response = await fetch("https://localhost:4000/CortesdeCaja");
      const data = await response.json();
      if (response.ok) {
        setData(data);
        
      }
    } catch {
      toast.error("Error al cargar los datos", {
        position: "bottom-right",
        theme: "colored",
      });
    }
  }

  useEffect(() => {
    loadTask();
  }, []);

  const [searchusuario, setSearchUsuario] = useState('');
  const handleSearchUsuario = (e) => {
    setSearchUsuario(e.target.value);
  };

    const filteredItems = data1.filter((item) =>
    item.usuario.toLowerCase().includes(searchusuario.toLowerCase())
  );
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
                      onClick={() => navigate(`/PointofSale/Reports`)}
                    >
                      <MdReport sx={{ mr: 0.5 }} fontSize="inherit" />
                      Reportes
                    </Link>
                    <Typography
                      sx={{ display: "flex", alignItems: "center" }}
                      className="text-foreground"
                    >
                      <MdMoneyOff sx={{ mr: 0.5 }} fontSize="inherit" />
                      Listado de Cortes de Caja
                    </Typography>
                  </Breadcrumbs>
                  <Spacer y={8} />
                  <div
                    className="flex flex-col gap-4"
                    style={{ marginLeft: "10px", marginRight: "10px" }}
                  >
                    <div className="flex flex-wrap space space-x-4">
                      <Input
                        isClearable
                        type="text"
                        size="md"
                        className="w-[450px] sm:max-w-[44%]"
                        placeholder="Usuario del Sistema"
                        startContent={<MdSearch />}
                        onChange={handleSearchUsuario}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="shadow-md rounded my-6 overflow-x-auto">
                <table className="bg-[#262837] min-w-600px w-full table-auto divide-gray-200">
                  <thead>
                    <tr class="bg-red-400 text-black uppercase text-sm leading-normal">
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                        Desde
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                        Hasta
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                        Usuario
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                        Estatus
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody class="text-white text-sm font-light">
                    {filteredItems.map((item) => (
                      <tr key={item.id} class="border-b border-gray-200">
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item.desde}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item.hasta}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item.usuario}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item.estatus}
                        </td>
                        <td>
                          <div className="relative flex justify-center items-center gap-2 ">
                            <button className="bg-red-400 hover:bg-red-300 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500">
                              Imprimir
                            </button>
                          </div>
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

export default ListCashCuts;