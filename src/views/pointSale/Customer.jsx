import { Breadcrumbs, Typography } from "@mui/material";
import {
    Button,
  Checkbox,
  Image,
  Input,
  Link, Spacer, Tab, Tabs
} from "@nextui-org/react";
import { RiDashboard2Fill } from "react-icons/ri";
import { MdCamera, MdDashboard,MdPeopleAlt,MdSave } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import Sidebar from "../../components/shared/Sidebar";
import SidebarMovil from "../../components/shared/SidebarMovill";
import HeaderPointofSale from "../../components/header/headerC/HederPointofSale";

const Customer = () => {
    const navigate = useNavigate(); 
    return (
      <>
        <div className="bg-[#262837] w-full min-h-screen">
          <Sidebar />
          <SidebarMovil />
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
                        onClick={() => navigate(`/PointofSale/Customers`)}
                      >
                        <MdDashboard sx={{ mr: 0.5 }} fontSize="inherit" />
                        Clientes
                      </Link>
                      <Typography
                        sx={{ display: "flex", alignItems: "center" }}
                        className="text-foreground"
                      >
                        <MdPeopleAlt sx={{ mr: 0.5 }} fontSize="inherit" />
                        Cliente
                      </Typography>
                    </Breadcrumbs>
                  </div>
                </div>
              </div>
            </div>
            <form>
              {/* <div className="bg-white rounded shadow-2xl px-4 md:p-8 mb-6"></div> */}
              <div className="bg-card-[#262837] rounded shadow-2xl px-4 md:p-8 mb-6">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                  <div>
                    <div className="text-gray-600 place-items-center grid lg:grid-cols-1">
                      <h2 className="font-large text-lg text-foreground">
                        Imagen <del></del> Cliente
                      </h2>
                      <Image
                        src="/Blank-Avatar.png"
                        alt=""
                        width={300}
                        height={300}
                      />
                      <Spacer y={6} />
                      {/* <input
                          size={"sm"}
                          type="file"
                          id="imagen"
                          name="imagen"
                          accept="image/*"
                          required
                        /> */}
                      <button className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 flex items-center">
                        <MdCamera className="w-5 h-5 mr-2" />
                        Agregar Foto
                      </button>
                    </div>
                  </div>
                  <div className="lg:col-span-2">
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-12 space-x-4 space-y-4 content-end">
                      <div className="md:col-span-12">
                        <Tabs
                          key="underlined"
                          variant="underlined"
                          aria-label="Tabs variants"
                        >
                          <Tab key="photos" title="Información Cliente">
                            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-12 space-x-4 space-y-4 content-end">
                              <Spacer y={6} />
                              <div className="md:col-span-6"></div>
                              <div className="md:col-span-6">
                                <Input
                                  id="nombre"
                                  size={"sm"}
                                  type="text"
                                  label="Nombre"
                                  name="nombre"
                                  labelPlacement="outside"
                                  placeholder=" "
                                  variant="faded"
                                  required
                                />
                              </div>
                              <div className="md:col-span-6">
                                <Input
                                  size={"sm"}
                                  type="text"
                                  label="Razón Social"
                                  id="razonSocial"
                                  name="razonSocial"
                                  labelPlacement="outside"
                                  placeholder=" "
                                  variant="faded"
                                  required
                                />
                              </div>

                              <div className="md:col-span-6">
                                <Input
                                  size={"sm"}
                                  type="text"
                                  label="RFC"
                                  id="rfc"
                                  name="rfc"
                                  labelPlacement="outside"
                                  placeholder=" "
                                  variant="faded"
                                  required
                                />
                              </div>
                              <div className="md:col-span-6">
                                <Input
                                  size={"sm"}
                                  type="number"
                                  label="Telefono"
                                  id="telefono"
                                  name="telefono"
                                  labelPlacement="outside"
                                  placeholder=" "
                                  variant="faded"
                                  required
                                />
                              </div>
                              <div className="md:col-span-6">
                                <Input
                                  size={"sm"}
                                  type="text"
                                  label="Correo"
                                  id="correo"
                                  name="correo"
                                  labelPlacement="outside"
                                  placeholder=" "
                                  variant="faded"
                                  required
                                />
                              </div>
                            </div>
                          </Tab>
                        </Tabs>
                      </div>
                    </div>
                  </div>
                  <div className="md:col-span-12 text-right content-end">
                    <div className="space-x-5 space-y-5 flex justify-end">
                      <button className="bg-red-500 hover:bg-red-400 text-white font-bold py-4 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 flex items-center text-md">
                        <MdSave className="w-6 h-6 mr-2" />
                        Guardar
                      </button>
                    </div>
                    <Spacer y={6} />
                  </div>
                </div>
              </div>
            </form>
          </main>
        </div>
      </>
    );
}

export default Customer;