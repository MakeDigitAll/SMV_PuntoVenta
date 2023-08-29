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
  } from "@nextui-org/react";
  import { useMemo, useRef, useState } from "react";
  import { ToastContainer, toast } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";
  import Header from "../../components/header/headerC/Header.jsx";
  //import ProfileImageUpload from "../user/ProfilesImagenUploads.tsx";
  import { Breadcrumbs, Typography } from "@mui/material";
  import {
    RiArrowLeftLine,
    RiArrowRightLine,
    RiDashboard2Fill,
  } from "react-icons/ri";
  import { MdCamera, MdPeopleAlt, MdPerson, MdSettings } from "react-icons/md";
  import { useNavigate } from "react-router-dom";
  import ItemsHeader from "../../components/header/ItemsHeader/ItemsHeader.jsx";
  
  import { MdSave } from "react-icons/md";
  import http from "../../components/axios/Axios";
  const NewEntry = () => {
    const [selectedImage, setSelectedImage] = useState("");
    const imageDefault = selectedImage === "";
    const [user, setUser] = useState({
      
    });
    const handleChange = (e) => {
      setUser({ ...user, [e.target.name]: e.target.value });
    };
    const fileInputRef = useRef(null);
    const handleFileButtonClick = () => {
      fileInputRef.current.click();
    };
    async function handleSubmit(e) {
      e.preventDefault();
      const formData = new FormData();
      const document = JSON.stringify({
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email,
        password: user.password,
      });
      formData.append("document", document);
      formData.append("image", selectedImage);
      try {
        await http
          .post(`/api/createuser`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            navigate("/Settings/Users");
            toast.success(response.data.body.message, { theme: "colored" });
          })
          .catch((error) => {
            toast.error(error.response.data.body.error, { theme: "colored" });
          });
      } catch (error) {
        toast.warning(error.message);
      }
    }
    const validateEmail = (value) =>
      value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
    const validationState = useMemo(() => {
      if (user.email === "") return undefined;
  
      return validateEmail(user.email) ? "valid" : "invalid";
    }, [user.email]);
    const navigate = useNavigate();
    const [selected, setSelected] = useState("photos");
    return (
      <>
        <Header />
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
                      onClick={() => navigate(`/Store`)}
                    >
                      <MdSettings sx={{ mr: 0.5 }} fontSize="inherit" />
                    Almacén
                    </Link>
                    <Link
                      className="text-foreground"
                      underline="hover"
                      sx={{ display: "flex", alignItems: "center" }}
                      color="foreground"
                      href="#"
                      onClick={() => navigate(`/Store/WarehouseEntries`)}
                    >
                      <MdPeopleAlt sx={{ mr: 0.5 }} fontSize="inherit" />
                      Entradas de Almacén
                    </Link>
                    <Typography
                      sx={{ display: "flex", alignItems: "center" }}
                      className="text-foreground"
                    >
                      <MdPerson sx={{ mr: 0.5 }} fontSize="inherit" />
                      Nuevo Usuario
                    </Typography>
                  </Breadcrumbs>
                </div>
                <form onChange={handleChange} onSubmit={handleSubmit}>
                  <Spacer y={6} />
                  {/* <div className="bg-white rounded shadow-2xl px-4 md:p-8 mb-6"></div> */}
                  <div className="bg-card rounded shadow-2xl px-4 md:p-8 mb-6">
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                      <div>
                        <div className="text-gray-600 place-items-center grid lg:grid-cols-1">
                          <h2 className="font-large text-lg text-foreground">
                            Imagen
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
                            ref={fileInputRef}
                            style={{ display: "none" }}
                            value={user.imagen}
                            onChange={(event) => {
                              setSelectedImage(event.target.files[0]);
                            }}
                            name="imagen"
                          />
                          <Button
                            autoFocus
                            size="auto"
                            color="success"
                            endContent={<MdCamera />}
                            onClick={handleFileButtonClick}
                          >
                            Agregar imagen
                          </Button>
                        </div>
                        <div>
                          
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
                              <Tab key="photos" title="Entrada de Alnacén">
                                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-12 space-x-4 space-y-4 content-end">
                                  <Spacer y={6} />
                                  <div className="md:col-span-6"></div>
                                  <div className="md:col-span-6">
                                    <Input
                                    //   id="nombre"
                                    //   value={user.nombre}
                                    //   onValueChange={handleChange}
                                      size={"sm"}
                                      type="text"
                                      label="Fecha de Entrada"
                                      name="fechaEntrada"
                                      labelPlacement="outside"
                                      placeholder=" "
                                      variant="faded"
                                    />
                                  </div>
                                  <div className="md:col-span-6">
                                    <Input
                                      size={"sm"}
                                      type="text"
                                      label="Proveedor"
                                      id="proveedor"
                                      name="proveedor"
                                    //   value={user.apellido}
                                    //   onChange={handleChange}
                                      labelPlacement="outside"
                                      placeholder=" "
                                      variant="faded"
                                    />
                                  </div>
  
                                  <div className="md:col-span-6">
                                    <Input
                                      id="referencia"
                                    //   value={user.email}
                                    //   onChange={handleChange}
                                      size={"sm"}
                                      type="text"
                                      label="Referencia"
                                      name="referncia"
                                      labelPlacement="outside"
                                      placeholder=" "
                                      variant="faded"
                                    />
                                  </div>
                                  <div className="md:col-span-6">
                                    <Input
                                      id="sucursal"
                                    //   value={user.emailConfirm}
                                    //   onChange={handleChange}
                                      size={"sm"}
                                      type="email"
                                      label="Sucursal"
                                      name="sucursal"
                                      labelPlacement="outside"
                                      placeholder=" "
                                      variant="faded"
                                    />
                                  </div>
  
                                  <div className="md:col-span-6">
                                    <Input
                                      id="almacen"
                                    //   value={user.password}
                                    //   onChange={handleChange}
                                      size={"sm"}
                                      type="text"
                                      label="Almacén"
                                      name="almacen"
                                      labelPlacement="outside"
                                      placeholder=" "
                                      variant="faded"
                                    />
                                  </div>
  
                                  <div className="md:col-span-6">
                                    <Input
                                      id="codigoFabrica"
                                    //   value={user.password}
                                    //   onChange={handleChange}
                                      size={"sm"}
                                      type="codigoFabrica"
                                      label="Codigo Fabrica"
                                    //   name="password"
                                      labelPlacement="outside"
                                      placeholder=" "
                                      variant="faded"
                                    />
                                  </div>
                                  <div className="md:col-span-6">
                                    <Input
                                      id="codigoEmpresa"
                                    //   value={user.password}
                                    //   onChange={handleChange}
                                      size={"sm"}
                                      type="text"
                                      label="Codigo Empresa"
                                      name="codigoEmpresa"
                                      labelPlacement="outside"
                                      placeholder=" "
                                      variant="faded"
                                    />
                                  </div>
                                  <div className="md:col-span-6">
                                    <Input
                                      id="nombre"
                                    //   value={user.password}
                                    //   onChange={handleChange}
                                      size={"sm"}
                                      type="text"
                                      label="Nombre del Producto"
                                      name="nombre"
                                      labelPlacement="outside"
                                      placeholder=" "
                                      variant="faded"
                                    />
                                  </div>
                                  <div className="md:col-span-6">
                                    <Input
                                      id="cantidad"
                                    //   value={user.password}
                                    //   onChange={handleChange}
                                      size={"sm"}
                                      type="number"
                                      label="Cantidad"
                                      name="cantidad"
                                      labelPlacement="outside"
                                      placeholder=" "
                                      variant="faded"
                                    />
                                  </div>
                                  <div className="md:col-span-6">
                                    <Input
                                      id="costoProducto"
                                    //   value={user.password}
                                    //   onChange={handleChange}
                                      size={"sm"}
                                      type="number"
                                      label="Costo del Producto"
                                      name="costoProducto"
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
                            color="primary"
                            type="submit"
                            startContent={<RiArrowLeftLine />}
                          >
                            Anterior
                          </Button>
                          <Button
                            className="min-w-[200px]"
                            color="primary"
                            type="submit"
                            endContent={<RiArrowRightLine />}
                          >
                            Siguiente
                          </Button>
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
  
  export default NewEntry;
  