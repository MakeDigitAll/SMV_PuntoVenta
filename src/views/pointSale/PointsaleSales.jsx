import { Breadcrumbs, Typography } from "@mui/material";
import {
  AccordionItem, Accordion, Card, CardBody, useDisclosure,
  Link, Spacer, Input, Dropdown, DropdownTrigger, Button, DropdownMenu, DropdownItem, Textarea, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter
} from "@nextui-org/react";
import { RiDashboard2Fill, RiMoneyCnyBoxLine } from "react-icons/ri";
import { MdDashboard, MdInbox, MdMonetizationOn, MdMoneyOff, MdNumbers, MdPriceCheck, MdSave, MdSearch} from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import Sidebar from "../../components/shared/Sidebar";
import SidebarMovil from "../../components/shared/SidebarMovill";
import { TbDotsVertical } from "react-icons/tb";
import PriceCheck from "./PricesCheck";
  
const PointsaleSales = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [modalMode, setModalMode] = useState("entry"); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleEntryClick = () => {
    setModalMode("entry");
    onOpen();
  };
  const handleOutClick = () => {
    setModalMode("out");
    onOpen();
  };
  const handlePriceCheck = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const itemsSales = [
    {
        id: 1,
        name: "Nueva Venta",
        icon: RiMoneyCnyBoxLine,
        roleId: "0",
    },
    {
        id: 2,
        name: "Entrada Efectivo",
        icon: MdMonetizationOn,
        roleId: "0",
    },
    {
      id: 3,
      name: "Salida Efectivo",
      icon: MdMoneyOff,
      roleId: "0",

  },
  {
    id: 4,
    name: "Checar Precios",
    icon: MdPriceCheck,
    roleId: "0",
  },
  ]
  const navigate = useNavigate();
  
  const [selectedKeys, setSelectedKeys] = useState(new Set(["1"]));
  const datos=[
        { id: 1, ticket: 'Ejemplo 1',fecha: 'Ejemplo 1',hora:"Pr1",cliente:"4502012", estatus: 'Descripción1@gmail.com',factura:"Zulema",monto:"1"},
        { id: 2, ticket: 'Ejemplo 2', fecha: 'Descripción 2',hora: 'Ejemplo 2',cliente:"Pr2",estatus:"4502012", factura: 'Descripción2@gmail.com',monto:"2"},
        { id: 3, ticket: 'Ejemplo 3', fecha: 'Descripción 3', hora: 'Ejemplo 3',cliente:"Pr3",estatus:"4502012", factura: 'Descripción3@gmail.com',monto:"3" },]
  return (
    <>
      <div className="bg-[#262837] w-full min-h-screen">
        <Sidebar />
        <SidebarMovil />
        <Spacer y={2} />
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
                  <Accordion
                    selectedKeys={selectedKeys}
                    onSelectionChange={setSelectedKeys}
                    variant="light"
                  >
                    <AccordionItem key="1" aria-label="Menu">
                      <div className="gap-2 sm:grid-cols-13 flex flex-wrap justify-center">
                        {itemsSales.map((item, index) => (
                          <Card
                            className="w-[115px] h-[65px] col-span-15 sm:col-span-7 hover:bg-red-400"
                            shadow="md"
                            key={index}
                            isPressable
                            onPress={() => {
                              if (item.name === "Nueva Venta") {
                                navigate(`/PointofSale/NewSale`);
                              } else if (item.name === "Entrada Efectivo") {
                                handleEntryClick();
                              } else if (item.name === "Salida Efectivo") {
                                handleOutClick();
                              }else if (item.name === "Checar Precios") {
                                handlePriceCheck();
                              }
                            }}
                            
                          >
                            <CardBody className="overflow-visible py-2">
                              <div className="flex justify-center items-center">
                                <item.icon className="h-5 w-5" />
                              </div>
                              <div
                                className="text-center"
                                style={{ marginTop: "3px" }}
                              >
                                <h6 style={{ fontSize: "11px" }}>
                                  {item.name}
                                </h6>
                              </div>
                            </CardBody>
                          </Card>
                        ))}
                      </div>
                    </AccordionItem>
                  </Accordion>
                  <Spacer y={5} />
                  <div className="flex flex-wrap space space-x-4">
                    <Input
                      isClearable
                      type="text"
                      size="md"
                      className="w-[450px] sm:max-w-[44%]"
                      placeholder="Buscar Ticket"
                      startContent={<MdSearch />}
                      // onChange={handleChangeNombre}
                      // // value={nombre}
                    />
                  </div>
                </div>
                <div class="shadow-md rounded my-6 overflow-x-auto">
                  <table className="bg-[#262837] min-w-600px w-full table-auto divide-gray-200">
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
                            <div className="relative flex justify-center items-center gap-2 ">
                              <Dropdown>
                                <DropdownTrigger>
                                  <Button isIconOnly size="sm" variant="light">
                                    <TbDotsVertical className="text-default-300" />
                                  </Button>
                                </DropdownTrigger>
                                <DropdownMenu>
                                  <DropdownItem>Ver Ticket</DropdownItem>
                                  <DropdownItem>Cancelar Ticket</DropdownItem>
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
                    <Modal
                      isOpen={isOpen}
                      onOpenChange={onOpenChange}
                      placement="top-center"
                      size="3xl"
                    >
                      <ModalContent>
                        {(onClose) => (
                          <>
                            <ModalHeader>
                              {modalMode === "entry" && "Entrada de Efectivo"}
                              {modalMode === "out" && "Salida de Efectivo"}
                            </ModalHeader>
                            <ModalBody>
                              <div className="rounded px-4 md:p-8 mb-6">
                                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-1">
                                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-12 space-x-4 space-y-4 content-end">
                                    <div className="md:col-span-6"></div>
                                    <div className="md:col-span-12">
                                      <Input
                                        autoFocus
                                        endContent={
                                          <MdNumbers className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                        }
                                        label="Cantidad"
                                        isRequired
                                        type="number"
                                        placeholder=" "
                                        variant="bordered"
                                        name="cantidad"
                                      />
                                    </div>
                                    <div className="md:col-span-12">
                                      <Textarea
                                        endContent={
                                          <MdNumbers className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                        }
                                        label="Comentario"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="lg:col-span-8">
                                <button className="bg-red-300 hover:bg-red-400 text-gray-700 font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-start">
                                  <span className="w-5 h-5 mr-2">
                                    <MdInbox />
                                  </span>
                                  {modalMode === "entry"
                                    ? "Ver Entradas Anteriores"
                                    : "Ver Salidas Anteriores"}
                                </button>
                              </div>
                              <div className="lg:col-span-8"></div>
                            </ModalBody>
                            <ModalFooter>
                              <button
                                onClick={onClose}
                                className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                              >
                                Cerrar
                              </button>

                              <button className="bg-red-400 hover:bg-red-300 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center">
                                <span className="w-5 h-5 mr-2">
                                  <MdSave />{" "}
                                  {/* Asegúrate de importar el ícono correctamente */}
                                </span>
                                Guardar
                              </button>
                            </ModalFooter>
                          </>
                        )}
                      </ModalContent>
                    </Modal>
                    <PriceCheck isOpen={isModalOpen} onClose={handleCloseModal}/>
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