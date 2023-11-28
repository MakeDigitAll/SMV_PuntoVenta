import { Breadcrumbs, Typography } from "@mui/material";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Link, Spacer, useDisclosure,
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,
} from "@nextui-org/react";
import { RiDashboard2Fill } from "react-icons/ri";
import { MdConfirmationNumber, MdDashboard, MdPeople,MdSearch } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { useState ,useEffect} from "react";
import Sidebar from "../../components/shared/Sidebar";
import SidebarMovil from "../../components/shared/SidebarMovill";
import { TbDotsVertical } from "react-icons/tb";
import HeaderPointofSale from "../../components/header/headerC/HederPointofSale";
import { toast } from "react-toastify";

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

  const [isLoading, setIsLoading] = useState(false);
  const [modoVisualizacion, setModoVisualizacion] = useState(false);
  const [isEditMode,setEditMode]=useState(false);

  const handleLoadData = (customerId) => {
    setIsLoading(true);

    // Realiza una solicitud para obtener los datos del cliente (cambia la URL y el método según tu backend)
    fetch(`https://localhost:4000/ClientesPos/${customerId}`, {
      method: 'GET',
      headers: {
        // Agrega las cabeceras necesarias, si es necesario
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        // Redirige a la página de detalles del cliente con los datos
        navigate(`/PointofSale/Customers/Customer`, {
          state: { clienteData: data, modoVisualizacion: true }, // Establece modoVisualizacion en false
        }); 
      })
      .catch((error) => {
        console.error('Error al obtener los datos del cliente', error);
        setIsLoading(false);
      });
  };
  
  const handleEditar = (customerId) => {
    setIsLoading(true);
  
    // Realiza una solicitud para obtener los datos del cliente
    fetch(`https://localhost:4000/ClientesPos/${customerId}`, {
      method: 'GET',
      headers: {
        // Agrega las cabeceras necesarias, si es necesario
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        navigate(`/PointofSale/Customers/Customer`, {
          state: { clienteData: data, modoVisualizacion: false, isEditMode:true, customerId: customerId }, // Establece modoVisualizacion en true
      });
      })
      .catch((error) => {
        // console.error('Error al obtener los datos del cliente', error);
        setIsLoading(false);
      });
  };
  
 ///Deshabilitar Cliente
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [modalMode, setModalMode] = useState("delete"); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clienteid, setClienteId] = useState(null);
  const handleDes = (id) => {
    setClienteId(id);
    setModalMode("delete");
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setClienteId(null);
    setIsModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    if (clienteid) {
      const datoDisable = {
        id: clienteid,
      };
  
      try {
        const res = await fetch(`https://localhost:4000/ClientePosDisable/${clienteid}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(datoDisable),
        });
  
        if (res.ok) {
          toast.warning("Deshabilitando Cotización ", {
            position: "bottom-right",
            theme: "colored",
          });
        } else {
          toast.error("Error al deshabilitar Cotización", {
            position: "bottom-right",
            theme: "colored",
          });
        }
      } catch (error) {
        toast.error("Error al deshabilitar Cotización", {
          position: "bottom-right",
          theme: "colored",
        });
      } finally {
        setIsModalOpen(false);
        await loadTask();
      }
    }
  };

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
                  <Spacer y={8} />
                  <div
                    className="flex flex-col gap-4"
                    style={{ marginLeft: "10px", marginRight: "10px" }}
                  >
                    <div className="flex flex-col gap-4 p-4 md:flex-row md:justify-between md:items-center">
                      <div className="my-2 flex flex-row mb-0">
                        <div className="relative">
                          <select className="h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block appearance-none w-full bg-[#262837] border-gray-600 text-gray-500 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-red-400 focus:border-red-300">
                            <option>All</option>
                            <option>Active</option>
                            <option>Inactive</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg
                              className="fill-current h-4 w-4"
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
                          onClick={() =>
                            navigate("/PointofSale/Customers/Customer", {
                              state: { modoVisualizacion: false ,isEditMode:false}
                            })
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
                                  <DropdownItem onClick={()=>{handleLoadData(item.id)}}>
                                    Ver Cliente
                                  </DropdownItem>
                                  <DropdownItem onClick={()=>{handleEditar(item.id)}}>Editar Cliente</DropdownItem>
                                  <DropdownItem onClick={()=>navigate('/PointofSale/Customers/CustomerDebts')}>
                                    Adeudo del Cliente
                                  </DropdownItem>
                                  <DropdownItem onClick={()=>handleDes((item.id))}>Deshabilitar Cliente</DropdownItem>
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
                  <Modal
                      isOpen={isModalOpen} 
                      onOpenChange={onOpenChange}
                      placement="top-center"
                      size="md"
                    >
                     <ModalContent>
                        {(onClose) => (
                          <>
                            <ModalHeader>
                              {modalMode === "delete" && "¿Quieres Deshabilitar el Cliente?"}
                            </ModalHeader>
                            <ModalBody>
                              <div className="rounded px-4 md:p-8 mb-6">
                                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-1">
                                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-12 space-x-4 space-y-4 content-end">
                                    <div className="md:col-span-6"></div>
                                    
                                  </div>
                                </div>
                              </div>
                            </ModalBody>
                            <ModalFooter>
                              <button className="bg-red-400 hover:bg-red-300 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center"
                              onClick={() => handleConfirmDelete(clienteid)} >
                                <span className="w-5 h-5 mr-2">
                                  <MdConfirmationNumber />{" "}
                                </span>
                                Si
                              </button>
                              <button
                                onClick={handleCancel}
                                className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                              >
                                Cancelar
                              </button>
                            </ModalFooter>
                          </>
                        )}
                      </ModalContent>
                    </Modal>
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