import {
    Button,
    Image,
    Input,
    Link,
    Spacer,
    Tab,
    Tabs,
  } from "@nextui-org/react";
  import { useMemo, useRef, useState } from "react";
  import { ToastContainer, toast } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";
  
  //import ProfileImageUpload from "../user/ProfilesImagenUploads.tsx";
  import { Breadcrumbs, Typography } from "@mui/material";
  import { RiDashboard2Fill} from "react-icons/ri";
  import { MdAllInbox, MdCamera, MdInbox, MdWarehouse } from "react-icons/md";
  import { useNavigate } from "react-router-dom";
  import ItemsHeader from "../../components/header/itemsHeader/ItemsHeader.jsx";
  import { MdSave } from "react-icons/md";
  import http from "../../components/axios/Axios";
  import { useParams } from "react-router-dom";
  const NewEntry = () => {
    const [selectedImage, setSelectedImage] = useState("");
    const imageDefault = selectedImage === "";
    const [user, setUser] = useState({
      
    });

    const { id } = useParams();
    const [isEditMode, setIsEditMode] = useState(false);
    const [entryData, setEntryData] = useState({}); // Carga tus datos desde la base de datos aquí
  
    const handleEditClick = () => {
      setIsEditMode(true);
    };
  
    const handleSaveClick = () => {
      // Lógica para guardar los datos editados en la base de datos
      setIsEditMode(false);
    };
  
    const handleChange2 = (e) => {
      const { name, value } = e.target;
      setEntryData((prevData) => ({
        ...prevData,
        [name]: value,
      }));

    const handleChange = (e) => {
      setUser({ ...user, [e.target.name]: e.target.value });
    };
    const fileInputRef = useRef(null);
    const handleFileButtonClick = () => {
      fileInputRef.current.click();
    };
    
    const navigate = useNavigate();
    const [selected, setSelected] = useState("photos");
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
                      onClick={() => navigate(`/Store/WarehouseEntries`)}
                    >
                      <MdInbox sx={{ mr: 0.5 }} fontSize="inherit" />
                      Entradas de Almacén
                    </Link>
                    <Typography
                      sx={{ display: "flex", alignItems: "center" }}
                      className="text-foreground"
                    >
                      <MdAllInbox sx={{ mr: 0.5 }} fontSize="inherit" />
                      Entrada de Almacén
                    </Typography>
                  </Breadcrumbs>
                </div>
                 <form > 
                  <Spacer y={6} />
                  {/* <div className="bg-white rounded shadow-2xl px-4 md:p-8 mb-6"></div> */}
                  <div className="bg-card rounded shadow-2xl px-4 md:p-8 mb-6">
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                      <div>
                        <div className="text-gray-600 place-items-center grid lg:grid-cols-1">
                          <h2 className="font-large text-lg text-foreground">
                            Imagen del Producto
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
                              <Tab key="photos" title="Entrada de Almacén">
                                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-12 space-x-4 space-y-4 content-end">
                                  <Spacer y={6} />
                                  <div className="md:col-span-6"></div>
                                  <div className="md:col-span-6">
                                    <Input
                                      size={"sm"}
                                      type="number"
                                      label="Folio"
                                      id="folio"
                                      name="folio"
                                      value={entryData.folio || ''}
                                      onChange={handleChange2}
                                      labelPlacement="outside"
                                      placeholder=" "
                                      variant="faded"
                                      disabled={!isEditMode}
                                    />
                                  </div>
                                  <div className="md:col-span-6">
                                    <Input
                                      id="fecha"
                                      value={entryData.fecha || ''}
                                      onChange={handleChange2}
                                      size={"sm"}
                                      type="date"
                                      label="Fecha"
                                      name="fecha"
                                      labelPlacement="outside"
                                      placeholder=" "
                                      variant="faded"
                                      disabled={!isEditMode}
                                    />
                                  </div>  
                                  <div className="md:col-span-6">
                                    <Input
                                      id="codigoEmpresa"
                                      value={entryData.codigoEmpres || ''}
                                      onChange={handleChange2}
                                      size={"sm"}
                                      type="number"
                                      label="Código Empresa"
                                      name="codigoEmpresa"
                                      labelPlacement="outside"
                                      placeholder=" "
                                      variant="faded"
                                      disabled={!isEditMode}
                                    />
                                  </div>
                                  <div className="md:col-span-6">
                                    <Input
                                      id="producto"
                                      value={entryData.producto || ''}
                                      onChange={handleChange2}
                                      size={"sm"}
                                      type="text"
                                      label="Producto"
                                      name="producto"
                                      labelPlacement="outside"
                                      placeholder=" "
                                      variant="faded"
                                      disabled={!isEditMode}
                                    />
                                  </div>
                                  <div className="md:col-span-6">
                                    <Input
                                      id="cantidad"
                                      value={entryData.cantidad || ''}
                                      onChange={handleChange2}
                                      size={"sm"}
                                      type="number"
                                      label="Cantidad"
                                      name="cantidad"
                                      labelPlacement="outside"
                                      placeholder=" "
                                      variant="faded"
                                      disabled={!isEditMode}
                                    />
                                  </div>
                                  <div className="md:col-span-6">
                                    <Input
                                      id="sucursalAlmacen"
                                      value={entryData.sucursalAlmacen || ''}
                                      onChange={handleChange2}
                                      size={"sm"}
                                      type="text"
                                      label="Sucursal/Almacén"
                                      name="sucursalAlmacen"
                                      labelPlacement="outside"
                                      placeholder=" "
                                      variant="faded"
                                      disabled={!isEditMode}
                                    />
                                  </div>  
                                  <div className="md:col-span-6">
                                    <Input
                                      id="tipo"
                                      value={entryData.tipo || ''}
                                      onChange={handleChange2}
                                      size={"sm"}
                                      type="text"
                                      label="Tipo"
                                      name="tipo"
                                      labelPlacement="outside"
                                      placeholder=" "
                                      variant="faded"
                                      disabled={!isEditMode}
                                    />
                                  </div>
                                  <div className="md:col-span-6">
                                    <Input
                                      id="motivo"
                                      value={entryData.motivo || ''}
                                      onChange={handleChange2}
                                      size={"sm"}
                                      type="text"
                                      label="Motivo"
                                      name="motivo"
                                      labelPlacement="outside"
                                      placeholder=" "
                                      variant="faded"
                                      disabled={!isEditMode}
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
                            {isEditMode ?(
                                <>
                          <Button
                            className="min-w-[200px]"
                            color="success"
                            type="submit"
                            endContent={<MdSave />}
                            onClick={handleSaveClick}
                          >
                            Guardar
                          </Button>
                          <Button 
                          className="min-w-[200px]"
                          color="success"
                          type="submit"
                          onClick={() => setIsEditMode(false)}>Cancelar</Button>
                          </>
                          ):(<Button></Button>)}
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
}
  export default NewEntry;
  