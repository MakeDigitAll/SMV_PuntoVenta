import { Breadcrumbs, Typography } from "@mui/material";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Link, Spacer
} from "@nextui-org/react";
import { RiDashboard2Fill } from "react-icons/ri";
import { MdDashboard, MdPeople,MdSearch } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { useState ,useEffect} from "react";
import Sidebar from "../../components/shared/Sidebar";
import SidebarMovil from "../../components/shared/SidebarMovill";
import { TbDotsVertical, TbPlus } from "react-icons/tb";
import HeaderPointofSale from "../../components/header/headerC/HederPointofSale";

const Customers = () => {
  const navigate = useNavigate(); 
  const [data1, setData] = useState([]);
  async function loadTask() {
    try {
      const response = await fetch("https://localhost:4000/ClientesPos");
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

  const [searchCliente, setSearchCliente] = useState('');
  const handleSearchCliente = (e) => {
    setSearchCliente(e.target.value);
  };

    const filteredItems = data1.filter((item) =>
    item.nombreCliente.toLowerCase().includes(searchCliente.toLowerCase())
  );
  
  return (
    <>
      <div className="bg-[#262837] w-full min-h-screen">
        <Sidebar />
        <SidebarMovil />
        <Spacer y={8} />
        <main className="lg:pl-28 lg:pr-90 pb-15">
          <div className="p-10" style={{ overflow: "auto" }}>
          <HeaderPointofSale/>
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
                  <div
                    className="flex flex-col gap-4"
                    style={{ marginLeft: "10px", marginRight: "10px" }}
                  >
                    <div class="flex flex-col gap-4 p-4 md:flex-row md:justify-between md:items-center">
                      <div className="my-2 flex flex-row mb-0">
                        <div class="relative">
                          <select class="h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block appearance-none w-full bg-[#262837] border-gray-600 text-gray-500 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-red-400 focus:border-red-300">
                            <option>All</option>
                            <option>Active</option>
                            <option>Inactive</option>
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
                      <div className="flex flex-wrap space space-x-4">
                        <Input
                          isClearable
                          type="text"
                          size="md"
                          className="w-[450px] sm:max-w-[44%]"
                          placeholder="Nombre"
                          startContent={<MdSearch />}
                          onChange={handleSearchCliente}
                        />
                      </div>
                      <div className="flex flex-wrap place-content-end space-x-2 ml-auto">
                        <button
                          className="bg-red-400 hover:bg-red-300 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                          endContent={<TbPlus />}
                          onClick={() =>
                            navigate("/PointofSale/Customers/Customer")
                          }
                        >
                          Nuevo Cliente
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="shadow-md rounded my-6 overflow-x-auto">
                  <table className="bg-[#262837] min-w-600px w-full table-auto divide-gray-200">
                    <thead>
                      <tr class="bg-red-400 text-black uppercase text-sm leading-normal">
                        {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                          Imagen
                        </th> */}
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                          Nombre
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                          Razón Social
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                          RFC
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                          Telefono
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                          Correo
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-800 uppercase tracking-wider">
                          Acciones
                        </th>
                      </tr>
                    </thead>
                    <tbody class="text-white text-sm font-light">
                      {filteredItems.map((item) => (
                        <tr key={item.id} class="border-b border-gray-200">
                          {/* <td className="px-6 py-4 whitespace-nowrap">
                            {item.imagen}
                          </td> */}
                          <td className="px-6 py-4 whitespace-nowrap">
                            {item.nombreCliente}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {item.razonSocial}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {item.rfc}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {item.telefono}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {item.email}
                          </td>
                          <td>
                            <div className="relative flex justify-center items-center gap-2 ">
                              <Dropdown>
                                <DropdownTrigger>
                                  <Button isIconOnly size="sm" variant="light">
                                    <TbDotsVertical className="text-default-300" />
                                  </Button>
                                </DropdownTrigger>
                                <DropdownMenu>
                                  <DropdownItem>
                                    Ver Cliente
                                  </DropdownItem>
                                  <DropdownItem onClick={()=>navigate('/PointofSale/Customers/CustomerDebts')}>
                                    Adeudo del Cliente
                                  </DropdownItem>
                                  <DropdownItem>Deshabilitar Cliente</DropdownItem>
                                </DropdownMenu>
                              </Dropdown>
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
          </div>
        </main>
      </div>
    </>
  );
};

export default Customers;