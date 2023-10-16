import {
    Button,
    Input,
    Link,
    Spacer,
    Tab,
    Tabs,
  } from "@nextui-org/react";
  import { useState } from "react";
  import { ToastContainer, toast } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";
  
  //import ProfileImageUpload from "../user/ProfilesImagenUploads.tsx";
  import { Breadcrumbs, Typography } from "@mui/material";
  import {RiDashboard2Fill} from "react-icons/ri";
  import { MdMonetizationOn, MdMoney, MdWarehouse } from "react-icons/md";
  import { useNavigate } from "react-router-dom";
  import ItemsHeader from "../../components/header/ItemsHeader/ItemsHeader.jsx";
  
  import { MdSave } from "react-icons/md";
  const NewTransfer = () => {
    const [user, setUser] = useState({
      id:"",
      folio: "",
      fecha: "",
      codigoEmpresa: "",
      nombre: "",
      cantidad: "",
      deSucursal: "",
      delAlmacen: "",
      aSucursal: "",
      aAlmacen: "",
    });
    const handleChange = (e) => {
        const{name,value}=event.target;
      setUser((prevData)=>({
        ...prevData,
        [name]:value,
      }))
    };
    
    async function handleSubmit(e) {
      e.preventDefault();
      try {
        const response = await fetch("https://localhost:443/TransIndividual", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        })
        if (response.ok) {
            const data = await response.json();
            navigate("/Store/Transfers");
            toast.success(data.message, { theme: "colored" }); // Utilizamos 'data.message' para mostrar el mensaje de éxito
          } else {
            const errorData = await response.json(); // Parseamos el cuerpo de la respuesta en caso de error
            toast.error(errorData.error, { theme: "colored" });
          }
        } catch (error) {
          toast.warning(error.message);
        }
      }
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
                      onClick={() => navigate(`/Store`)}
                    >
                      <MdWarehouse sx={{ mr: 0.5 }} fontSize="inherit" />
                      Almacén
                    </Link>
                    <Link
                      className="text-foreground"
                      underline="hover"
                      sx={{ display: "flex", alignItems: "center" }}
                      color="foreground"
                      href="#"
                      onClick={() => navigate("/Store/Transfers")}
                    >
                      <MdMoney sx={{ mr: 0.5 }} fontSize="inherit" />
                      Transferencias
                    </Link>
                    <Typography
                      sx={{ display: "flex", alignItems: "center" }}
                      className="text-foreground"
                    >
                      <MdMonetizationOn sx={{ mr: 0.5 }} fontSize="inherit" />
                      Nueva Transferencia
                    </Typography>
                  </Breadcrumbs>
                </div>
                <form onChange={handleChange} onSubmit={handleSubmit}>
                  <Spacer y={6} />
                  {/* <div className="bg-white rounded shadow-2xl px-4 md:p-8 mb-6"></div> */}
                  <div className="bg-card rounded shadow-2xl px-4 md:p-8 mb-6">
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                      
                      <div className="lg:col-span-2">
                        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-12 space-x-4 space-y-4 content-end">
                          <div className="md:col-span-12">
                            <Tabs
                              key="underlined"
                              variant="underlined"
                              aria-label="Tabs variants"
                            >
                              <Tab key="photos" title="Transferencia de Productos">
                                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-12 space-x-4 space-y-4 content-end">
                                  <Spacer y={6} />
                                  <div className="md:col-span-6"></div>
                                  <div className="md:col-span-6">
                                    <Input
                                      id="folio"
                                      value={user.folio}
                                      onChange={handleChange}
                                      size={"sm"}
                                      type="number"
                                      label="Código"
                                      name="folio"
                                      labelPlacement="outside"
                                      placeholder=" "
                                      variant="faded"
                                    />
                                  </div>
                                  <div className="md:col-span-6">
                                    <Input
                                      size={"sm"}
                                      type="date"
                                      label="Fecha"
                                      id="fecha"
                                      name="fecha"
                                      value={user.fecha}
                                      onChange={handleChange}
                                      labelPlacement="outside"
                                      placeholder=" "
                                      variant="faded"
                                    />
                                  </div>
  
                                  <div className="md:col-span-6">
                                    <Input
                                      id="codigoEmpresa"
                                      value={user.codigoEmpresa}
                                      onChange={handleChange}
                                      size={"sm"}
                                      type="number"
                                      label="Código de Empresa"
                                      name="codigoEmpresa"
                                      labelPlacement="outside"
                                      placeholder=" "
                                      variant="faded"
                                    />
                                  </div>
                                  <div className="md:col-span-6">
                                    <Input
                                      id="nombre"
                                      value={user.nombre}
                                      onChange={handleChange}
                                      size={"sm"}
                                      type="text"
                                      label="Nombre del Producto"
                                      name="nombre"
                                      labelPlacement="outside"
                                      placeholder=" "
                                      variant="faded"
                                    />
                                  </div>
  
                                  <div className="md:col-span-12">
                                    <Input
                                      id="cantidad"
                                      value={user.cantidad}
                                      onChange={handleChange}
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
                                      id="deSucursal"
                                      value={user.deSucursal}
                                      onChange={handleChange}
                                      size={"sm"}
                                      type="text"
                                      label="De Sucursal"
                                      name="deSucursal"
                                      labelPlacement="outside"
                                      placeholder=" "
                                      variant="faded"
                                    />
                                  </div>
                                  <div className="md:col-span-6">
                                    <Input
                                      id="delAlmacen"
                                      value={user.delAlmacen}
                                      onChange={handleChange}
                                      size={"sm"}
                                      type="text"
                                      label="Del Almacén"
                                      name="delAlmacen"
                                      labelPlacement="outside"
                                      placeholder=" "
                                      variant="faded"
                                    />
                                  </div>
                                  <div className="md:col-span-6">
                                    <Input
                                      id="aSucursal"
                                      value={user.aSucursal}
                                      onChange={handleChange}
                                      size={"sm"}
                                      type="text"
                                      label="A Sucursal"
                                      name="aSucursal"
                                      labelPlacement="outside"
                                      placeholder=" "
                                      variant="faded"
                                    />
                                  </div>
                                  <div className="md:col-span-6">
                                    <Input
                                      id="alAlmacen"
                                      value={user.alAlmacen}
                                      onChange={handleChange}
                                      size={"sm"}
                                      type="text"
                                      label="Al Almacén"
                                      name="alAlmacen"
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
                            onClick={handleSubmit}
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
  
  export default NewTransfer;