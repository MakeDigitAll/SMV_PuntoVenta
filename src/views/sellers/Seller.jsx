import {
    Button,
    CheckboxGroup,
    Image,
    Input,
    Link,
    Spacer,
    Tab,
    Tabs,
    Checkbox,
    Select,
    MenuItem,
  } from "@nextui-org/react";
  import { useMemo, useRef, useState } from "react";
  import { ToastContainer, toast } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";
  
  //import ProfileImageUpload from "../user/ProfilesImagenUploads.tsx";
  import { Breadcrumbs, Typography } from "@mui/material";
  import {
    RiArrowLeftLine,
    RiArrowRightLine,
    RiDashboard2Fill,
  } from "react-icons/ri";
  import { MdCamera, MdPeople, MdPeopleAlt, MdPerson, MdSettings } from "react-icons/md";
  import { useNavigate } from "react-router-dom";
  import ItemsHeader from "../../components/header/ItemsHeader/ItemsHeader.jsx";
  
  import { MdSave } from "react-icons/md";
  import http from "../../components/axios/Axios";
  const Seller = () => {
    const [selectedImage, setSelectedImage] = useState("");
    const imageDefault = selectedImage === "";
  
    const validateEmail = (value) =>
      value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
    const navigate = useNavigate();
    const [selected, setSelected] = useState("photos");
    const sucursalesList = [
      "Aguascalientes",
      "Baja California",
      "Baja California Sur",
      "Campeche",
      "Chiapas",
      "Chihuahua",
      "Coahuila",
      "Colima",
      "Ciudad de México",
      "Durango",
      "Guanajuato",
      "Guerrero",
      "Hidalgo",
      "Jalisco",
      "México",
      "Michoacán",
      "Morelos",
      "Nayarit",
      "Nuevo León",
      "Oaxaca",
      "Puebla",
      "Querétaro",
      "Quintana Roo",
      "San Luis Potosí",
      "Sinaloa",
      "Sonora",
      "Tabasco",
      "Tamaulipas",
      "Tlaxcala",
      "Veracruz",
      "Yucatán",
      "Zacatecas",
    ];
  
    return (
      <>
        <ItemsHeader />
        <ToastContainer />
        <main>
          <div className="p-12">
            {/* <div className="p-12 bg-gray-100"> */}
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
                      onClick={() => navigate(`/Sellers`)}
                    >
                      <MdPeople sx={{ mr: 0.5 }} fontSize="inherit" />
                      Vendedores
                    </Link>
                    <Typography
                      sx={{ display: "flex", alignItems: "center" }}
                      className="text-foreground"
                    >
                      <MdPerson sx={{ mr: 0.5 }} fontSize="inherit" />
                      Vendedor
                    </Typography>
                  </Breadcrumbs>
                </div>
                <form>
                  <Spacer y={6} />
                  {/* <div className="bg-white rounded shadow-2xl px-4 md:p-8 mb-6"></div> */}
                  <div className="bg-card rounded shadow-2xl px-4 md:p-8 mb-6">
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                      <div>
                        <div className="text-gray-600 place-items-center grid lg:grid-cols-1">
                          <h2 className="font-large text-lg text-foreground">
                            Imagen de Vendedor
                          </h2>
                          {imageDefault ? (
                            <Image
                              src="../../../public/Blank-Avatar.png"
                              alt=""
                              width={300}
                              height={300}
                            />
                          ) : (
                            <Image
                              src={URL.createObjectURL(
                                new Blob([selectedImage], { type: "image" })
                              )}
                              alt=""
                              width={300}
                              height={300}
                            />
                          )}
                          <Spacer y={6} />
                          <input
                            size={"sm"}
                            type="file"
                            id="imagen"
                            style={{
                              display: "none",
                              borderColor: selectedImage ? "" : "red",
                            }}
                            name="imagen"
                          />
                          <Button
                            autoFocus
                            size="auto"
                            color="success"
                            endContent={<MdCamera />}
                          >
                            Agregar foto
                          </Button>
                        </div>
                      </div>
                      <div className="lg:col-span-2">
                        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-12 space-x-4 space-y-4 content-end">
                          <div className="md:col-span-12">
                            <Tabs
                              key="underlined"
                              variant="underlined"
                              aria-label="Tabs variants"
                              selectedKey={selected}
                              onSelectionChange={setSelected}
                            >
                              <Tab key="photos" title="Información Vendedor">
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
                                    />
                                  </div>

                                  <div className="md:col-span-6">
                                    <label htmlFor="estado">Sucursal</label>
                                    <Select
                                      id="sucursal"
                                      size="small"
                                      label=" "
                                      name="sucursal"
                                      variant="outlined"
                                    >
                                      {sucursalesList.map((estado) => (
                                        <MenuItem key={estado} value={estado}>
                                          {estado}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                  </div>
                                  <div className="md:col-span-6">
                                    <Input
                                      id="fechaAlta"
                                      size={"sm"}
                                      type="date"
                                      label="Fecha Alta"
                                      name="fechaAlta" // Asegúrate de que el nombre coincida con el campo de Email
                                      labelPlacement="outside"
                                      placeholder=" "
                                      variant="faded"
                                    />
                                  </div>
                                  <div className="md:col-span-6">
                                    <div className="flex items-center space-x-2">
                                      <Checkbox
                                        defaultSelected
                                        size="sm"
                                        id="referenciWeb"
                                      />
                                      <label htmlFor="webPageCheckbox">
                                        Referencia web
                                      </label>
                                    </div>
                                  </div>
                                  <div className="md:col-span-6">
                                    <Input
                                      id="clientes"
                                      size={"sm"}
                                      type="number"
                                      label="Clientes"
                                      name="clientes" // Asegúrate de que el nombre coincida con el campo de Contraseña
                                      labelPlacement="outside"
                                      placeholder=" "
                                      variant="faded"
                                    />
                                  </div>
                                </div>
                              </Tab>
                            </Tabs>
                          </div>
                          <Spacer y={10} />
                        </div>
                      </div>
                      <div className="md:col-span-12 text-right content-end">
                        <div className="space-x-5 space-y-5">
                          <Button
                            className="min-w-[200px]"
                            color="success"
                            type="submit"
                            endContent={<MdSave />}
                          >
                            Guardar
                          </Button>
                        </div>
                        <Spacer y={3} />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  };
  
  export default Seller;
  