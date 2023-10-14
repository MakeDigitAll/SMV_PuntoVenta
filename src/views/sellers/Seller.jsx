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
import { useMemo, useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//import ProfileImageUpload from "../user/ProfilesImagenUploads.tsx";
import { Breadcrumbs, Typography } from "@mui/material";
import {
  RiArrowLeftLine,
  RiArrowRightLine,
  RiDashboard2Fill,
} from "react-icons/ri";
import { MdBackupTable, MdCamera, MdKeyboardReturn, MdPeople, MdPeopleAlt, MdPerson, MdSettings } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import ItemsHeader from "../../components/header/itemsHeader/ItemsHeader.jsx";

import { MdSave } from "react-icons/md";
import http from "../../components/axios/Axios";
import Images from "../../components/images/Images.tsx";
const Seller = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageDefault, setImageDefault] = useState(true);
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const [editing, setEditing] = useState(false);


  const validateEmail = (value) =>
    value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
  const navigate = useNavigate();
  const params = useParams();
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

  const [task, setTask] = useState({
    imagen: "",
    nombre: "",
    telefono: "",
    sucursal: "",
    fechaAlta: "",
    referenciaWeb: "",
    clientes: "",
  });
  


  const [validationImagen, setValidationImagen] = useState('valid')
  const [validationNombre, setValidationNombre] = useState('valid')
  const [validationTelefono, setValidationTelefono] = useState('valid')
  const [validationSucursal, setValidationSucursal] = useState('valid')
  const [validationFechaAlta, setValidationFechaAlta] = useState('valid')
  const [validationClientes, setValidationClientes] = useState('valid')
  const [idVendedor, setIdVendedor] = useState('');

  async function loadTask(id) {

    try {
      const response = await fetch(`http://localhost:4000/ListadoVendedores/${id}`);
      const data = await response.json();
      setTask({
        nombre: data.nombre,
        telefono: data.telefono,
        sucursal: data.sucursal,
        fechaAlta: data.fechaAlta,
        referenciaWeb: data.referenciaWeb,
        clientes: data.clientes,
      });
      setIdVendedor(id);
      const url = window.location.pathname
      let arr = url.split('/');

      if (arr[3] === 'EditSeller') {
        setIsInputDisabled(false);
      }
      if (arr[3] === 'ViewSeller') {
        setIsInputDisabled(true);
        document.getElementById('BTNguardar').style.display = 'none';
        document.getElementById('BTNimagen').style.display = 'none';
      }

    } catch {
      toast.error("Error al cargar los datos", {
        position: "bottom-right",
        theme: "colored",
      });
    }
  }



  useEffect(() => {
    if (params.id) {
      loadTask(params.id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id])

  const handleChange = (e) =>
    setTask({ ...task, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImageDefault(false);
    }
  };

  const fileInputRef = useRef(null);
  const handleFileButtonClick = () => {
    fileInputRef.current.click();
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const newErrors = {};

    !task.imagen ? setValidationImagen('invalid') : setValidationImagen('valid');
    !task.nombre ? setValidationNombre('invalid') : setValidationNombre('valid');
    !task.telefono ? setValidationTelefono('invalid') : setValidationTelefono('valid');
    !task.sucursal ? setValidationSucursal('invalid') : setValidationSucursal('valid');
    !task.fechaAlta ? setValidationFechaAlta('invalid') : setValidationFechaAlta('valid');
    !task.clientes ? setValidationClientes('invalid') : setValidationClientes('valid');

    if (!task.imagen || !task.nombre || !task.telefono || !task.sucursal || !task.fechaAlta || !task.clientes) {
      toast.error("Favor de llenar todos lo campos", { position: "bottom-right", theme: "colored", }); return;
    }

    
    try {
      const formData = new FormData();
      const document = JSON.stringify({
        nombre: task.nombre,
        telefono: task.telefono,
        sucursal: task.sucursal,
        fechaAlta: task.fechaAlta,
        referenciaWeb: task.referenciaWeb,
        clientes: task.clientes,
      });
      formData.append("document", document);
      formData.append("image", selectedImage);

      const result = await http.post(
        `http://localhost:4000/ListadoVendedores`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (result.status === 200) {
        toast.success("Guardando Vendedor", {
          position: "bottom-right",
          theme: "colored",
        });
        navigate('/Sellers');
      } else {
        toast.error("Error al Guardar Vendedor", {
          position: "bottom-right",
          theme: "colored",
        });
      }
    } catch (error) {
      toast.error("Error al guardar los datos", {
        position: "bottom-right",
        theme: "colored",
      });
    }
  }

  async function handleEditing(e) {
    e.preventDefault();
    const newErrors = {};

    !task.imagen ? setValidationImagen('invalid') : setValidationImagen('valid');
    !task.nombre ? setValidationNombre('invalid') : setValidationNombre('valid');
    !task.telefono ? setValidationTelefono('invalid') : setValidationTelefono('valid');
    !task.sucursal ? setValidationSucursal('invalid') : setValidationSucursal('valid');
    !task.fechaAlta ? setValidationFechaAlta('invalid') : setValidationFechaAlta('valid');
    !task.clientes ? setValidationClientes('invalid') : setValidationClientes('valid');

    if (!task.imagen || !task.nombre || !task.telefono || !task.sucursal || !task.fechaAlta || !task.clientes) {
      toast.error("Favor de llenar todos lo campos", { position: "bottom-right", theme: "colored", }); return;
    }


    try {
      const formData = new FormData();
      const document = JSON.stringify({
        nombre: task.nombre,
        telefono: task.telefono,
        sucursal: task.sucursal,
        fechaAlta: task.fechaAlta,
        referenciaWeb: task.referenciaWeb,
        clientes: task.clientes,
      });
      formData.append("document", document);
      formData.append("image", selectedImage);

      const result = await http.put(
        `http://localhost:4000/ListadoVendedoresEditing/${params.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (result.status === 200) {
        toast.success("Guardando Vendedor", {
          position: "bottom-right",
          theme: "colored",
        });
        navigate('/Sellers');
      } else {
        toast.error("Error al Editar Vendedor", {
          position: "bottom-right",
          theme: "colored",
        });
      }
      
    } catch (error) {
      toast.error("Error al Editar los datos", {
        position: "bottom-right",
        theme: "colored",
      });
    }
  }

  async function handleFormSubmit(e) {
    e.preventDefault();

    if (params.id) {
      // Si params.id existe, significa que estás editando, así que ejecuta handleEditing
      await handleEditing(e);
    } else {
      // Si params.id no existe, significa que estás creando, así que ejecuta handleSubmit
      await handleSubmit(e);
    }
  }

  const [value, setValue] = useState();

  const handleSelectionChange = (e) => {
    setValue(e.target.value)
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
              <form onChange={handleChange} onSubmit={handleFormSubmit}>
                <Spacer y={6} />
                {/* <div className="bg-white rounded shadow-2xl px-4 md:p-8 mb-6"></div> */}
                <div className="bg-card rounded shadow-2xl px-4 md:p-8 mb-6">
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                    <div>
                      <div className="text-gray-600 place-items-center grid lg:grid-cols-1">
                        <h2 className="font-large text-lg text-foreground">
                          Imagen de Vendedor
                        </h2>
                       {idVendedor && selectedImage == null ? (                          
                          <><br /><Images idImage={idVendedor} designType="avatarBig" ruta="api/sellerImage/" /></>
                        ):(
                          imageDefault ? (
                          <Image
                            src="/Blank-Avatar.png"
                            alt=""
                            width={300}
                            height={300}
                          />
                        ) : (
                          <Image
                            src={URL.createObjectURL(selectedImage)}
                            // src={URL.createObjectURL(
                            //   new Blob([selectedImage], { type: "image" })
                            // )}
                            alt=""
                            width={300}
                            height={300}
                          />                                                     
                        )         
                        )
                        }           
                        <Spacer y={6} />
                        <input
                          size={"sm"}
                          type="file"
                          id="imagen"
                          ref={fileInputRef}
                          style={{
                            display: "none",
                            borderColor: selectedImage ? "" : "red",
                          }}
                          name="imagen"
                          accept="image/*"
                          onChange={handleImageChange}
                          validationState={validationImagen}
                          required
                        />
                        <Button
                          id="BTNimagen"
                          autoFocus
                          size="auto"
                          color="success"
                          endContent={<MdCamera />}
                          onClick={handleFileButtonClick}

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
                                    value={task.nombre}
                                    onChange={handleChange}
                                    size={"sm"}
                                    type="text"
                                    label="Nombre"
                                    name="nombre"
                                    labelPlacement="outside"
                                    placeholder=" "
                                    variant="faded"
                                    disabled={isInputDisabled}
                                    validationState={validationNombre}
                                    required
                                  />
                                </div>
                                <div className="md:col-span-6">
                                  <Input
                                    value={task.telefono}
                                    onChange={handleChange}
                                    size={"sm"}
                                    type="number"
                                    label="Telefono"
                                    id="telefono"
                                    name="telefono"
                                    labelPlacement="outside"
                                    placeholder=" "
                                    variant="faded"
                                    disabled={isInputDisabled}
                                    validationState={validationTelefono}
                                    required
                                  />
                                </div>

                                <div className="md:col-span-6">
                                  <Input
                                    value={task.sucursal}
                                    onChange={handleChange}
                                    size={"sm"}
                                    type="text"
                                    label="Sucursal"
                                    id="sucursal"
                                    name="sucursal"
                                    labelPlacement="outside"
                                    placeholder=" "
                                    variant="faded"
                                    disabled={isInputDisabled}
                                    validationState={validationSucursal}
                                    required
                                  />
                                  {/* <label htmlFor="estado">Sucursal</label> */}
                                  {/* <Select
                                    value={task.sucursal}
                                    onChange={handleSelectionChange}
                                    id="sucursal"
                                    size="small"
                                    label=" "
                                    name="sucursal"
                                    variant="outlined"
                                    disabled={isInputDisabled}
                                  >
                                    {sucursalesList.map((estado) => (
                                      <MenuItem key={estado} value={estado} >
                                        {estado}
                                      </MenuItem>
                                    ))}
                                  </Select> */}
                                </div>
                                <div className="md:col-span-6">
                                  <Input
                                    value={task.fechaAlta}
                                    onChange={handleChange}
                                    size={"sm"}
                                    type="text"
                                    label="Fecha Alta"
                                    id="fechaAlta"
                                    name="fechaAlta"
                                    labelPlacement="outside"
                                    placeholder=" "
                                    variant="faded"
                                    disabled={isInputDisabled}
                                    validationState={validationFechaAlta}
                                    required
                                  />
                                  {/* <Input
                                    value={task.fechaAlta}
                                    onChange={handleChange}
                                    id="fechaAlta"
                                    size={"sm"}
                                    type="date"
                                    label="Fecha Alta"
                                    name="fechaAlta" // Asegúrate de que el nombre coincida con el campo de Email
                                    labelPlacement="outside"
                                    placeholder=" "
                                    variant="faded"
                                    disabled={isInputDisabled}
                                  /> */}
                                </div>
                                <div className="md:col-span-6">
                                  <div className="flex items-center space-x-2">
                                    <Checkbox
                                      defaultSelected
                                      size="sm"
                                      id="referenciWeb"
                                      value={task.referenciaWeb}
                                      disabled={isInputDisabled}
                                    />
                                    <label htmlFor="webPageCheckbox">
                                      Referencia web
                                    </label>
                                  </div>
                                </div>
                                <div className="md:col-span-6">
                                  <Input
                                    id="clientes"
                                    value={task.clientes}
                                    size={"sm"}
                                    type="number"
                                    label="Clientes"
                                    name="clientes" // Asegúrate de que el nombre coincida con el campo de Contraseña
                                    labelPlacement="outside"
                                    placeholder=" "
                                    variant="faded"
                                    disabled={isInputDisabled}
                                    validationState={validationClientes}
                                    required
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
                          id="BTNback"
                          className="min-w-[200px]"
                          color="danger"
                          endContent={<MdKeyboardReturn />}
                          onPress={() => navigate('/Sellers')}
                        >
                          Atras
                        </Button>
                        <Button
                          id="BTNguardar"
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