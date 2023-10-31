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
  Textarea,
  checkbox,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem

} from "@nextui-org/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Breadcrumbs, Typography } from "@mui/material";
import {
  RiArrowLeftLine,
  RiArrowRightLine,
  RiDashboard2Fill,
  RiProductHuntFill,
} from "react-icons/ri";
import { MdCamera, MdKeyboardArrowDown, MdProductionQuantityLimits } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import ItemsHeader from "../../components/header/itemsHeader/ItemsHeader.jsx";
import { format } from "date-fns";
import { MdSave } from "react-icons/md";
import http from "../../components/axios/Axios";
import Crop from "../../components/crop/Crop.jsx";
const Product = () => {
  const [photoURL, setPhotoURL] = useState("");
  const [openCrop, setOpenCrop] = useState(false);
  const [file, setFile] = useState(null);

  const [photoURL2, setPhotoURL2] = useState("");
  const [openCrop2, setOpenCrop2] = useState(false);
  const [file2, setFile2] = useState(null);

  const [photoURL3, setPhotoURL3] = useState("");
  const [openCrop3, setOpenCrop3] = useState(false);
  const [file3, setFile3] = useState(null);

  const [photoURL4, setPhotoURL4] = useState("");
  const [openCrop4, setOpenCrop4] = useState(false);
  const [file4, setFile4] = useState(null);



  const [status] = useState(false);

  const handleChangeImage = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoURL("");
      setFile(file);
      setPhotoURL(URL.createObjectURL(file));
      setOpenCrop(true);
    }
  };

  const handleChangeImage2 = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoURL2("");
      setFile2(file);
      setPhotoURL2(URL.createObjectURL(file));
      setOpenCrop2(true);
    }
  };

  const handleChangeImage3 = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoURL3("");
      setFile3(file);
      setPhotoURL3(URL.createObjectURL(file));
      setOpenCrop3(true);
    }
  };

  const handleChangeImage4 = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoURL4("");
      setFile4(file);
      setPhotoURL4(URL.createObjectURL(file));
      setOpenCrop4(true);
    }
  };

  const [user, setUser] = useState({
    imagen: "",


    // Datos Generales
    nombreProducto: "",
    codigoFab: "",
    codigoEmp: "",
    marcaProd: "",
    categoriaProd: "",
    codigoSatProduct: "",
    codigoSatUnidad: "",
    actualizado: format(new Date(), "yyyy-MM-dd"),
    existencia: "",
    cantidad: "",
    unidadMedida: "",
    descuento: "",
    comportamiento: "",
    activo: "",
    web: "",
    pos: "",
    venta: "",
    backOrder: "",

    //Costo y precio
    impuesto: "",
    impuestoRetenido: "",
    precio: "",
    margenGanancia: "",
    total: 0,
    precioAnterior: "",

    precioConDescuentoM1: 0,
    precioConDescuentoM2: 0,
    precioConDescuentoM3: 0,
    precioConDescuentoM4: 0,
    precioConDescuentoM5: 0,
    precioConDescuentoM6: 0,
    descuentoM1: 0,
    descuentoM2: 0,
    descuentoM3: 0,
    descuentoM4: 0,
    descuentoM5: 0,
    descuentoM6: 0,


  });
  const [validationErrors, setValidationErrors] = useState({
    imagen: "",
    imagen2: "",
    imagen3: "",
    imagen4: "",

    nombreProducto: "",
    codigoFab: "",
    codigoEmp: "",
    marcaProd: "",
    categoriaProd: "",
    codigoSatProduct: "",
    codigoSatUnidad: "",
    actualizado: "",
    existencia: "",
    cantidad: "",
    unidadMedida: "",
    descuento: "",
    comportamiento: "",
    activo: "",
    web: "",
    pos: "",
    venta: "",
    backOrder: "",

    impuesto: "",
    impuestoRetenido: "",
    precio: "",
    margenGanancia: "",
    total: "",
    precioAnterior: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedUser = { ...user };
    let updatedValidationErrors = { ...validationErrors };

    updatedUser[name] = value;

    if (name === "precio" || name === "margenGanancia") {
      const margenGananciaDecimal = parseFloat(updatedUser.margenGanancia) / 100;
      const precioBase =
        parseFloat(updatedUser.precio) + parseFloat(updatedUser.precio) * margenGananciaDecimal;
      updatedUser.total = precioBase.toFixed(2);

      // Actualiza los campos de "Precio con Descuento" según los campos de descuento individual
      updatedUser.precioConDescuentoM1 = (precioBase * (1 - parseFloat(updatedUser.descuentoM1) / 100)).toFixed(2);
      updatedUser.precioConDescuentoM2 = (precioBase * (1 - parseFloat(updatedUser.descuentoM2) / 100)).toFixed(2);
      updatedUser.precioConDescuentoM3 = (precioBase * (1 - parseFloat(updatedUser.descuentoM3) / 100)).toFixed(2);
      updatedUser.precioConDescuentoM4 = (precioBase * (1 - parseFloat(updatedUser.descuentoM4) / 100)).toFixed(2);
      updatedUser.precioConDescuentoM5 = (precioBase * (1 - parseFloat(updatedUser.descuentoM5) / 100)).toFixed(2);
      updatedUser.precioConDescuentoM6 = (precioBase * (1 - parseFloat(updatedUser.descuentoM6) / 100)).toFixed(2);
    } else if (name.startsWith("descuentoM")) {
      const index = name.replace("descuentoM", "");
      updatedUser[`precioConDescuentoM${index}`] = (updatedUser.total * (1 - parseFloat(value) / 100)).toFixed(2);
    } else if (name === "total") {
      // Si se modifica manualmente el Precio Base, actualiza los campos de "Precio con Descuento" con el nuevo valor
      const precioBaseManual = parseFloat(value);
      updatedUser.precioConDescuentoM1 = (precioBaseManual * (1 - parseFloat(updatedUser.descuentoM1) / 100)).toFixed(2);
      updatedUser.precioConDescuentoM2 = (precioBaseManual * (1 - parseFloat(updatedUser.descuentoM2) / 100)).toFixed(2);
      updatedUser.precioConDescuentoM3 = (precioBaseManual * (1 - parseFloat(updatedUser.descuentoM3) / 100)).toFixed(2);
      updatedUser.precioConDescuentoM4 = (precioBaseManual * (1 - parseFloat(updatedUser.descuentoM4) / 100)).toFixed(2);
      updatedUser.precioConDescuentoM5 = (precioBaseManual * (1 - parseFloat(updatedUser.descuentoM5) / 100)).toFixed(2);
      updatedUser.precioConDescuentoM6 = (precioBaseManual * (1 - parseFloat(updatedUser.descuentoM6) / 100)).toFixed(2);
    }

    updatedValidationErrors[name] = "";

    setUser(updatedUser);
    setValidationErrors(updatedValidationErrors);
  };


  const fileInputRef = useRef(null);
  const fileInputRef2 = useRef(null);
  const fileInputRef3 = useRef(null);
  const fileInputRef4 = useRef(null);


  const handleFileButtonClick = () => {
    fileInputRef.current.click();
  };
  const handleFileButtonClick2 = () => {
    fileInputRef2.current.click();
  };
  const handleFileButtonClick3 = () => {
    fileInputRef3.current.click();
  };
  const handleFileButtonClick4 = () => {
    fileInputRef4.current.click();
  };


  async function handleSubmit(e) {
    e.preventDefault();
    if (!file && !file2 && !file3 && !file4) {
      toast.error("Por favor, selecciona al menos una imagen", { theme: "colored" });
      return;
    }

    if (
      !photoURL ||
      !user.imagen ||
      !user.nombreProducto ||
      !user.codigoFab ||
      !user.codigoEmp ||
      !user.marcaProd ||
      !user.categoriaProd ||
      !user.codigoSatProduct ||
      !user.codigoSatUnidad ||
      !user.existencia ||
      !user.cantidad ||
      !user.unidadMedida ||
      !user.actualizado ||
      !user.descuento ||
      !user.comportamiento ||
      !user.impuesto ||
      !user.impuestoRetenido ||
      !user.precio ||
      !user.margenGanancia ||
      !user.total ||
      !user.precio !== "valid"
    ) {
      toast.error("Favor de llenar todos los campos correctamente", {
        theme: "colored",
      });
    }

    const errors = {};
    !user.nombreProducto ? (errors.nombreProducto = "Favor de llenar este campo") : "";
    !user.codigoFab ? (errors.codigoFab = "Favor de llenar este campo") : "";
    !user.codigoEmp ? (errors.codigoEmp = "Favor de llenar este campo") : "";
    !user.marcaProd ? (errors.marcaProd = "Favor de llenar este campo") : "";
    !user.categoriaProd ? (errors.categoriaProd = "Favor de llenar este campo") : "";
    !user.codigoSatProduct ? (errors.codigoSatProduct = "Favor de llenar este campo") : "";
    !user.codigoSatUnidad ? (errors.codigoSatUnidad = "Favor de llenar este campo") : "";
    !user.precio ? (errors.precio = "Favor de llenar este campo") : "";
    !user.existencia ? (errors.existencia = "Favor de llenar este campo") : "";
    !user.cantidad ? (errors.cantidad = "Favor de llenar este campo") : "";
    !user.descuento ? (errors.descuento = "Favor de llenar este campo") : "";
    !user.total ? (errors.total = "Favor de llenar este campo") : "";
    !user.unidadMedida ? (errors.unidadMedida = "Favor de llenar este campo") : "";
    !user.comportamiento ? (errors.comportamiento = "Favor de llenar este campo") : "";
    !user.impuesto ? (errors.impuesto = "Favor de llenar este campo") : "";
    !user.impuestoRetenido ? (errors.impuestoRetenido = "Favor de llenar este campo") : "";
    !user.margenGanancia ? (errors.margenGanancia = "Favor de llenar este campo") : "";
    !user.precioAnterior ? (errors.precioAnterior = "Favor de llenar este campo") : "";

    !photoURL ? (errors.imagen = "Favor de llenar este campo") : "";
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    setValidationErrors({});

    const formData = new FormData();

    file && formData.append("imagen", file);
    file2 && formData.append("imagen2", file2);
    file3 && formData.append("imagen3", file3);
    file4 && formData.append("imagen4", file4);


    const document = JSON.stringify({
      nombreProducto: user.nombreProducto,
      codigoFab: user.codigoFab,
      codigoEmp: user.codigoEmp,
      marcaProd: user.marcaId,
      categoriaProd: user.categoriaId,
      codigoSatProduct: user.codigoSatProduct,
      codigoSatUnidad: user.codigoSatUnidad,
      actualizado: user.actualizado,
      existencia: user.existencia,
      cantidad: user.cantidad,
      unidadMedida: user.unidadMedida,
      descuento: user.descuento,
      comportamiento: user.comportamiento,
      activo: activoToSave,
      web: webToSave,
      pos: posToSave,
      venta: ventaToSave,
      backOrder: backOrderToSave,

      impuesto: user.impuesto,
      impuestoRetenido: user.impuestoRetenido,
      precio: user.precio,
      margenGanancia: user.margenGanancia,
      total: user.total,
      precioAnterior: user.precioAnterior,
    });

    formData.append("document", document);
    try {
      const result = await http.post(
        `https://localhost:4000/Productos`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (result.status == 200 ? true : false) {
        toast.success("Producto creado correctamente", { theme: "colored" });
        navigate("/Products/ProductList");
      } else {
        console.log(result);
      }
    } catch (e) {
      e.response.status == 501
        ? toast.error("Favor de verificar el tipo de dato", {
          theme: "colored",
        })
        : toast.error(e.response.data.body.error, { theme: "colored" });
    }
  }


  async function loadTask() {
    try {
      const response = await fetch(
        "https://localhost:4000/Productos"
      );
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
  // useEffect(() => {
  //   loadTask();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const navigate = useNavigate();
  const [selected, setSelected] = useState("photos");

  //////////////////////// funcion para detectar los checbox ////////////////////////////
  const [isActivo, setIsActivo] = useState(false);
  const activoToSave = isActivo ? 1 : 0;
  console.log("Activo: ", activoToSave);

  const [isWeb, setIsWeb] = useState(false);
  const webToSave = isWeb ? 1 : 0;
  console.log("Web: ", webToSave);

  const [isPos, setIsPos] = useState(false);
  const posToSave = isPos ? 1 : 0;
  console.log("POS: ", posToSave);

  const [isVenta, setIsVenta] = useState(false);
  const ventaToSave = isVenta ? 1 : 0;
  console.log("venta: ", ventaToSave);

  const [isBackOrder, setIsBackOrder] = useState(false);
  const backOrderToSave = isBackOrder ? 1 : 0;
  console.log("BackOrder: ", backOrderToSave);
  //////////////////////// Fin de funcion para detectar los checbox ////////////////////////////




  ///////////////// Buscador y seleccionar las marcas //////////////////////////////
  const [getMarcas, setGetMarcas] = useState([]);

  async function loadMarcas() {
    try {
      const response = await fetch("https://localhost:4000/MarcasProducto");
      const data = await response.json();
      if (response.ok) {
        setGetMarcas(data); // Almacena las marcas en el estado
      }
    } catch {
      toast.error("Error al cargar los datos", {
        position: "bottom-right",
        theme: "colored",
      });
    }
  }

  function handleMarcaSelection(marca) {
    const selectedMarca = { marcaProd: marca.marca, marcaId: marca.id };
    setUser({ ...user, ...selectedMarca });

  }
  console.log("Marca: ", user.marcaProd)
  console.log("Marca ID: ", user.marcaId)



  useEffect(() => {
    loadMarcas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  ///////////////// Fin de buscador y seleccionar las marcas //////////////////////////////


  ///////////////// Buscador y seleccionar las categorias //////////////////////////////
  const [getCategoria, setGetCategoria] = useState([]);
  async function loadCategorias() {
    try {
      const response = await fetch(
        "https://localhost:4000/Categoria"
      );
      const data = await response.json();
      if (response.ok) {
        setGetCategoria(data);
      }
    } catch {
      toast.error("Error al cargar los datos", {
        position: "bottom-right",
        theme: "colored",
      });
    }
  }

  function handleCategoriaSelection(categoria) {
    const selectedCategoria = { categoriaProd: categoria.nombre, categoriaId: categoria.id };
    setUser({ ...user, ...selectedCategoria });

  }
  console.log("Categoria:", user.categoriaProd)
  console.log("Categoria ID : ", user.categoriaId)



  useEffect(() => {
    loadCategorias();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  ///////////////// Fin de buscador y seleccionar las categorias //////////////////////////////









  return (
    <>
      {openCrop && (
        <Crop {...{ photoURL, setOpenCrop, setPhotoURL, setFile, aspect: 1 }} />
      )}
      {openCrop2 && (
        <Crop {...{ photoURL: photoURL2, setOpenCrop: setOpenCrop2, setPhotoURL: setPhotoURL2, setFile: setFile2, aspect: 1 }} />
      )}
      {openCrop3 && (
        <Crop {...{ photoURL: photoURL3, setOpenCrop: setOpenCrop3, setPhotoURL: setPhotoURL3, setFile: setFile3, aspect: 1 }} />
      )}
      {openCrop4 && (
        <Crop {...{ photoURL: photoURL4, setOpenCrop: setOpenCrop4, setPhotoURL: setPhotoURL4, setFile: setFile4, aspect: 1 }} />
      )}
      <ItemsHeader />
      <ToastContainer />
      <main>
        <div className="p-12">
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
                    onClick={() => navigate(`/Products/ProductList`)}
                  >
                    <RiProductHuntFill sx={{ mr: 0.5 }} fontSize="inherit" />
                    Productos
                  </Link>
                  <Typography
                    sx={{ display: "flex", alignItems: "center" }}
                    className="text-foreground"
                  >
                    <MdProductionQuantityLimits sx={{ mr: 0.5 }} fontSize="inherit" />
                    Nuevo Producto
                  </Typography>
                </Breadcrumbs>
              </div>
              <form onChange={handleChange} onSubmit={handleSubmit}>
                <Spacer y={6} />
                <div className="bg-card rounded shadow-2xl px-4 md:p-8 mb-6">
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                    <div>

                      <div className="text-gray-600 place-items-center grid lg:grid-cols-1">
                        <h2 className="font-large text-lg text-foreground">
                          Imagen del Producto
                        </h2>
                        {photoURL != "" ? (
                          <Image
                            src={photoURL}
                            alt=""
                            width={300}
                            height={300}
                          />
                        ) : (
                          <Image
                            width={200}
                            height={200}
                            src="../../../public/Blank-Avatar.png"
                            alt=""
                          />
                        )}
                        <Spacer y={6} />
                        <input
                          height={"lg"}
                          type="file"
                          id="imagen"
                          ref={fileInputRef}
                          style={{
                            display: "none",
                            borderColor: photoURL ? "" : "red",
                          }}
                          accept="image"
                          onChange={handleChangeImage}
                          name="imagen"
                        />
                        <Button
                          autoFocus
                          size="auto"
                          color="success"
                          endContent={<MdCamera />}
                          onClick={handleFileButtonClick}
                          id="button-file"
                        >
                          Agregar imagen principal
                        </Button>
                      </div>

                      <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-12 space-x-4 space-y-4 content-end">
                        <br />
                        <div className="md:col-span-12 grid grid-cols-3 gap-4">

                          <div className="flex flex-col items-center">
                            {photoURL2 != "" ? (
                              <Image
                                src={photoURL2}
                                alt=""
                                width={150}
                                height={200}
                              />
                            ) : (
                              <Image
                                width={150}
                                height={200}
                                src="../../../public/Blank-Avatar.png"
                                alt=""
                              />
                            )}
                            <input
                              height={"lg"}
                              type="file"
                              id="imagen2"
                              ref={fileInputRef2}
                              style={{
                                display: "none",
                                borderColor: photoURL2 ? "" : "red",
                              }}
                              accept="image2"
                              onChange={handleChangeImage2}
                              name="imagen2"
                            />
                            <Button
                              autoFocus
                              size="auto"
                              color="success"
                              endContent={<MdCamera />}
                              onClick={handleFileButtonClick2}
                              id="button-file2"
                            >
                              Seleccionar
                            </Button>
                          </div>

                          <div className="flex flex-col items-center">
                            {photoURL3 != "" ? (
                              <Image
                                src={photoURL3}
                                alt=""
                                width={150}
                                height={200}
                              />
                            ) : (
                              <Image
                                width={150}
                                height={200}
                                src="../../../public/Blank-Avatar.png"
                                alt=""
                              />
                            )}
                            <input
                              height={"lg"}
                              type="file"
                              id="imagen3"
                              ref={fileInputRef3}
                              style={{
                                display: "none",
                                borderColor: photoURL3 ? "" : "red",
                              }}
                              accept="image3"
                              onChange={handleChangeImage3}
                              name="imagen3"
                            />
                            <Button
                              autoFocus
                              size="auto"
                              color="success"
                              endContent={<MdCamera />}
                              onClick={handleFileButtonClick3}
                              id="button-file3"
                            >
                              Seleccionar
                            </Button>
                          </div>

                          <div className="flex flex-col items-center">
                            {photoURL4 != "" ? (
                              <Image
                                src={photoURL4}
                                alt=""
                                width={150}
                                height={200}
                              />
                            ) : (
                              <Image
                                width={150}
                                height={200}
                                src="../../../public/Blank-Avatar.png"
                                alt=""
                              />
                            )}
                            <input
                              height={"lg"}
                              type="file"
                              id="imagen4"
                              ref={fileInputRef4}
                              style={{
                                display: "none",
                                borderColor: photoURL4 ? "" : "red",
                              }}
                              accept="image4"
                              onChange={handleChangeImage4}
                              name="imagen4"
                            />
                            <Button
                              autoFocus
                              size="auto"
                              color="success"
                              endContent={<MdCamera />}
                              onClick={handleFileButtonClick4}
                              id="button-file4"
                            >
                              Seleccionar
                            </Button>
                          </div>
                        </div>



                        <div className="md:col-span-12 flex flex-col items-center space-y-4">
                          <h2 className="font-large text-lg text-foreground text-center">
                            Banderas Web
                          </h2>
                        </div>
                        <div className="md:col-span-12 grid md:grid-cols-2 gap-4">
                          <div>
                            <Input
                              id="esqSupIzq"
                              isDisabled={status ? true : false}
                              onChange={handleChange}
                              size={"sm"}
                              label="Esquina Superior Izquierda"
                              name="esqSupIzq"
                              labelPlacement="outside"
                              placeholder=" "
                              variant="faded"
                            />
                          </div>
                          <div>
                            <Input
                              id="esqSupDer"
                              isDisabled={status ? true : false}
                              onChange={handleChange}
                              size={"sm"}
                              label="Esquina Superior Derecha"
                              name="esqSupDer"
                              labelPlacement="outside"
                              placeholder=" "
                              variant="faded"
                            />
                          </div>
                          <div>
                            <Input
                              id="esqinfIzq"
                              isDisabled={status ? true : false}
                              onChange={handleChange}
                              size={"sm"}
                              label="Esquina Inferior Izquierda"
                              name="esqinfIzq"
                              labelPlacement="outside"
                              placeholder=" "
                              variant="faded"
                            />
                          </div>
                          <div>
                            <Input
                              id="esqinfIzq"
                              isDisabled={status ? true : false}
                              onChange={handleChange}
                              size={"sm"}
                              label="Esquina Inferior Izquierda"
                              name="esqinfIzq"
                              labelPlacement="outside"
                              placeholder=" "
                              variant="faded"
                            />
                          </div>
                        </div>
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
                            selectedKey={selected}
                            onSelectionChange={setSelected}
                          >
                            <Tab key="photos" title="Datos generales">
                              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-12 space-x-4 space-y-4 content-end">
                                <Spacer y={6} />
                                <div className="md:col-span-6"></div>
                                <div className="md:col-span-12">
                                  <Input
                                    id="nombreProducto"
                                    value={user.nombreProducto}
                                    onValueChange={handleChange}
                                    size={"sm"}
                                    type="text"
                                    label="Nombre del producto"
                                    name="nombreProducto"
                                    labelPlacement="outside"
                                    placeholder=" "
                                    variant="faded"
                                    error={validationErrors.nombreProducto !== ""}
                                    errorMessage={validationErrors.nombreProducto}
                                  />
                                </div>
                                <div className="md:col-span-4">
                                  <Input
                                    size={"sm"}
                                    type="text"
                                    label="Código de Fabricante"
                                    id="codigoFab"
                                    value={user.codigoFab}
                                    name="codigoFab"
                                    onChange={handleChange}
                                    labelPlacement="outside"
                                    placeholder=" "
                                    variant="faded"
                                    error={validationErrors.codigoFab !== ""}
                                    errorMessage={validationErrors.codigoFab}
                                  />
                                </div>
                                <div className="md:col-span-4">
                                  <Input
                                    id="codigoEmp"
                                    onChange={handleChange}
                                    value={user.codigoEmp}
                                    size={"sm"}
                                    label="Código de Empresa"
                                    name="codigoEmp"
                                    labelPlacement="outside"
                                    placeholder=" "
                                    variant="faded"
                                    error={validationErrors.codigoEmp !== ""}
                                    errorMessage={validationErrors.codigoEmp}
                                  />
                                </div>
                                <div className="md:col-span-4">
                                  <Dropdown>
                                    <DropdownTrigger>
                                      <Input
                                        variant="faded"
                                        id="marcaProd"
                                        onChange={handleChange}
                                        value={user.marcaProd || "Sin Marca Definida"}
                                        size={"sm"}
                                        label="Marca del producto"
                                        name="marcaProd"
                                        labelPlacement="outside"
                                        placeholder=" "
                                        error={validationErrors.marcaProd !== ""}
                                        errorMessage={validationErrors.marcaProd}
                                        endContent={<MdKeyboardArrowDown />}
                                      >
                                      </Input>
                                    </DropdownTrigger>
                                    <DropdownMenu aria-label="Marcas">
                                      {getMarcas.map((marca) => (
                                        <DropdownItem key={marca.id} onPress={() => handleMarcaSelection(marca)}>
                                          {marca.marca}</DropdownItem>
                                      ))}
                                    </DropdownMenu>
                                  </Dropdown>
                                </div>

                                <div className="md:col-span-4">
                                  <Dropdown>
                                    <DropdownTrigger>
                                      <Input
                                        id="categoriaProd"
                                        value={user.categoriaProd || "Sin Categoria Definida"}
                                        onChange={handleChange}
                                        size={"sm"}
                                        label="Categoria del Producto"
                                        name="categoriaProd"
                                        labelPlacement="outside"
                                        placeholder=" "
                                        variant="faded"
                                        error={validationErrors.categoriaProd !== ""}
                                        errorMessage={validationErrors.categoriaProd}
                                        endContent={<MdKeyboardArrowDown />}
                                      >
                                      </Input>
                                    </DropdownTrigger>
                                    <DropdownMenu aria-label="Categorias">
                                      {getCategoria.map((categoria) => (
                                        <DropdownItem key={categoria.id} onPress={() => handleCategoriaSelection(categoria)}>
                                          {categoria.nombre}</DropdownItem>
                                      ))}
                                    </DropdownMenu>
                                  </Dropdown>
                                </div>

                                <div className="md:col-span-4">
                                  <Input
                                    id="codigoSatProduct"
                                    onChange={handleChange}
                                    value={user.codigoSatProduct}
                                    size={"sm"}
                                    label="Codigo de SAT Producto"
                                    name="codigoSatProduct"
                                    labelPlacement="outside"
                                    placeholder=" "
                                    variant="faded"
                                    error={validationErrors.codigoSatProduct !== ""}
                                    errorMessage={validationErrors.codigoSatProduct}
                                  />
                                </div>
                                <div className="md:col-span-4">
                                  <Input
                                    id="codigoSatUnidad"
                                    onChange={handleChange}
                                    value={user.codigoSatUnidad}
                                    size={"sm"}
                                    label="Codigo de SAT Unidad"
                                    name="codigoSatUnidad"
                                    labelPlacement="outside"
                                    placeholder=" "
                                    variant="faded"
                                    error={validationErrors.codigoSatUnidad !== ""}
                                    errorMessage={validationErrors.codigoSatUnidad}
                                  />
                                </div>

                                <div className="md:col-span-4">
                                  <Input
                                    id="existencia"
                                    onChange={handleChange}
                                    value={user.existencia}
                                    size={"sm"}
                                    label="Existencia"
                                    name="existencia"
                                    labelPlacement="outside"
                                    placeholder=" "
                                    variant="faded"
                                    error={validationErrors.existencia !== ""}
                                    errorMessage={validationErrors.existencia}
                                  />
                                </div>
                                <div className="md:col-span-4">
                                  <Input
                                    id="cantidad"
                                    onChange={handleChange}
                                    value={user.cantidad}
                                    size={"sm"}
                                    label="Cantidad"
                                    name="cantidad"
                                    labelPlacement="outside"
                                    placeholder=" "
                                    variant="faded"
                                    error={validationErrors.cantidad !== ""}
                                    errorMessage={validationErrors.cantidad}
                                  />
                                </div>
                                <div className="md:col-span-4">
                                  <Input
                                    id="unidadMedida"
                                    onChange={handleChange}
                                    value={user.unidadMedida}
                                    size={"sm"}
                                    label="Unidad de Medida"
                                    name="unidadMedida"
                                    labelPlacement="outside"
                                    placeholder=" "
                                    variant="faded"
                                    error={validationErrors.unidadMedida !== ""}
                                    errorMessage={validationErrors.unidadMedida}
                                  />
                                </div>
                                <div className="md:col-span-4">
                                  <Input
                                    id="descuento"
                                    onChange={handleChange}
                                    value={user.descuento}
                                    size={"sm"}
                                    label="Descuento"
                                    name="descuento"
                                    labelPlacement="outside"
                                    placeholder=" "
                                    variant="faded"
                                    error={validationErrors.descuento !== ""}
                                    errorMessage={validationErrors.descuento}
                                  />
                                </div>
                                <div className="md:col-span-8">
                                  <Input
                                    id="comportamiento"
                                    onChange={handleChange}
                                    value={user.comportamiento}
                                    size={"sm"}
                                    label="comportamiento"
                                    name="comportamiento"
                                    labelPlacement="outside"
                                    placeholder=" "
                                    variant="faded"
                                    error={validationErrors.comportamiento !== ""}
                                    errorMessage={validationErrors.comportamiento}
                                    endContent={<MdKeyboardArrowDown />}
                                  />
                                </div>

                                <div className="md:col-span-12">

                                </div>
                                <div className="md:col-span-2">
                                  <Checkbox
                                    onChange={setIsActivo.bind(
                                      null,
                                      !isActivo
                                    )}
                                    isSelected={isActivo}>Activo</Checkbox>
                                </div>
                                <div className="md:col-span-2">
                                  <Checkbox
                                    onChange={setIsWeb.bind(
                                      null,
                                      !isWeb
                                    )}
                                    isSelected={isWeb}>En Web</Checkbox>
                                </div>
                                <div className="md:col-span-2">
                                  <Checkbox
                                    onChange={setIsPos.bind(
                                      null,
                                      !isPos
                                    )}
                                    isSelected={isPos}>POS</Checkbox>
                                </div>
                                <div className="md:col-span-2">
                                  <Checkbox
                                    onChange={setIsVenta.bind(
                                      null,
                                      !isVenta
                                    )}
                                    selected={isVenta}>Venta</Checkbox>
                                </div>
                                <div className="md:col-span-2">
                                  <Checkbox
                                    onChange={setIsBackOrder.bind(
                                      null,
                                      !isBackOrder
                                    )}
                                    isSelected={isBackOrder}>Back Order</Checkbox>
                                </div>
                              </div>
                            </Tab>
                            <Tab key="music" title="Costo y Precio">
                              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-12 space-x-4 space-y-4 content-end">
                                <Spacer y={6} />
                                <div className="md:col-span-12"></div>

                                <div className="md:col-span-6">
                                  <Input
                                    id="impuesto"
                                    onChange={handleChange}
                                    value={user.impuesto}
                                    size={"sm"}
                                    label="Impuesto"
                                    name="impuesto"
                                    labelPlacement="outside"
                                    placeholder=" "
                                    variant="faded"
                                    error={validationErrors.impuesto !== ""}
                                    errorMessage={validationErrors.impuesto}
                                    endContent={<MdKeyboardArrowDown />}
                                  />
                                </div>
                                <div className="md:col-span-6">
                                  <Input
                                    id="impuestoRetenido"
                                    onChange={handleChange}
                                    value={user.impuestoRetenido}
                                    size={"sm"}
                                    label="Impuesto Retenido"
                                    name="impuestoRetenido"
                                    labelPlacement="outside"
                                    placeholder=" "
                                    variant="faded"
                                    error={validationErrors.impuestoRetenido !== ""}
                                    errorMessage={validationErrors.impuestoRetenido}
                                    endContent={<MdKeyboardArrowDown />}
                                  />
                                </div>
                                <div className="md:col-span-6">
                                  <Input
                                    id="precio"
                                    onChange={handleChange}
                                    value={user.precio}
                                    size={"sm"}
                                    label="Costo del Producto"
                                    name="precio"
                                    labelPlacement="outside"
                                    variant="faded"
                                    placeholder="$ 0.00"
                                    error={validationErrors.precio !== ""}
                                    errorMessage={validationErrors.precio}
                                  />
                                </div>
                                <div className="md:col-span-6">
                                  <Input
                                    size={"sm"}
                                    label="% Margen de Ganancia"
                                    id="margenGanancia"
                                    name="margenGanancia"
                                    onChange={handleChange}
                                    value={user.margenGanancia}
                                    labelPlacement="outside"
                                    placeholder="0"
                                    variant="faded"
                                    error={validationErrors.margenGanancia !== ""}
                                    errorMessage={validationErrors.margenGanancia}
                                  />
                                </div>
                                <div className="md:col-span-6">
                                  <Input
                                    id="total"
                                    onChange={handleChange}
                                    value={user.total}
                                    size={"sm"}
                                    label="Precio Base"
                                    name="total"
                                    labelPlacement="outside"
                                    variant="faded"
                                    placeholder="$ 0.00"
                                    error={validationErrors.total !== ""}
                                    errorMessage={validationErrors.total}
                                  />
                                </div>
                                <div className="md:col-span-6">
                                  <Input
                                    id="precioAnterior"
                                    onChange={handleChange}
                                    value={user.precioAnterior}
                                    size={"sm"}
                                    label="Precio Anterior"
                                    name="precioAnterior"
                                    labelPlacement="outside"
                                    placeholder="$ 0.00"
                                    variant="faded"
                                    error={validationErrors.precioAnterior !== ""}
                                    errorMessage={validationErrors.precioAnterior}
                                  />
                                </div>
                                <div className="md:col-span-12 flex flex-col  space-y-4">
                                  <h2 className="font-large text-lg text-foreground text-left">
                                    Descuento al Mayoreo
                                  </h2>
                                </div>
                                <div className="md:col-span-12 flex space-x-12">
                                  <h2 className="font-large text-lg text-foreground text-left">
                                    Mayoreo #1
                                  </h2>
                                  <h2 className="font-large text-lg text-foreground text-left">
                                    Mayoreo #2
                                  </h2>
                                  <h2 className="font-large text-lg text-foreground text-left">
                                    Mayoreo #3
                                  </h2>
                                  <h2 className="font-large text-lg text-foreground text-left">
                                    Mayoreo #4
                                  </h2>
                                  <h2 className="font-large text-lg text-foreground text-left">
                                    Mayoreo #5
                                  </h2>
                                  <h2 className="font-large text-lg text-foreground text-left">
                                    Mayoreo #6
                                  </h2>
                                </div>

                                <div className="md:col-span-2">
                                  <Input
                                    id="unidadesM1"
                                    isDisabled={status ? true : false}
                                    onChange={handleChange}
                                    size={"sm"}
                                    label="A Partir de (x) Unidades"
                                    name="unidadesM1"
                                    labelPlacement="outside"
                                    placeholder="0"
                                    variant="faded"
                                  />
                                  <br />
                                  <Input
                                    id="descuentoM1"
                                    onChange={handleChange}
                                    value={user.descuentoM1}
                                    size={"sm"}
                                    label="% de Descuento"
                                    name="descuentoM1"
                                    labelPlacement="outside"
                                    placeholder="0"
                                    variant="faded"
                                  />
                                  <br />
                                  <Input
                                    id="precioConDescuentoM1"
                                    onChange={handleChange}
                                    disabled={true}
                                    value={user.precioConDescuentoM1}
                                    size={"sm"}
                                    label="Precio con Descuento"
                                    name="precioConDescuentoM1"
                                    labelPlacement="outside"
                                    placeholder="0"
                                    variant="faded"
                                  />
                                </div>
                                <div className="md:col-span-2">
                                  <Input
                                    id="unidadesM2"
                                    onChange={handleChange}
                                    size={"sm"}
                                    label="A Partir de (x) Unidades"
                                    name="unidadesM2"
                                    labelPlacement="outside"
                                    placeholder="0"
                                    variant="faded"
                                  />
                                  <br />
                                  <Input
                                    id="descuentoM2"
                                    onChange={handleChange}
                                    value={user.descuentoM2}
                                    size={"sm"}
                                    label="% de Descuento"
                                    name="descuentoM2"
                                    labelPlacement="outside"
                                    placeholder="0"
                                    variant="faded"
                                  />
                                  <br />
                                  <Input
                                    id="precioConDescuentoM2"
                                    disabled={true}
                                    onChange={handleChange}
                                    value={user.precioConDescuentoM2}
                                    size={"sm"}
                                    label="Precio con Descuento"
                                    name="precioConDescuentoM2"
                                    labelPlacement="outside"
                                    placeholder="0"
                                    variant="faded"
                                  />
                                </div>
                                <div className="md:col-span-2">
                                  <Input
                                    id="unidadesM3"
                                    onChange={handleChange}
                                    size={"sm"}
                                    label="A Partir de (x) Unidades"
                                    name="unidadesM3"
                                    labelPlacement="outside"
                                    placeholder="0"
                                    variant="faded"
                                  />
                                  <br />
                                  <Input
                                    id="descuentoM3"
                                    onChange={handleChange}
                                    value={user.descuentoM3}
                                    size={"sm"}
                                    label="% de Descuento"
                                    name="descuentoM3"
                                    labelPlacement="outside"
                                    placeholder="0"
                                    variant="faded"
                                  />
                                  <br />
                                  <Input
                                    id="precioConDescuentoM3"
                                    disabled={true}
                                    onChange={handleChange}
                                    value={user.precioConDescuentoM3}
                                    size={"sm"}
                                    label="Precio con Descuento"
                                    name="precioConDescuentoM3"
                                    labelPlacement="outside"
                                    placeholder="0"
                                    variant="faded"
                                  />
                                </div>
                                <div className="md:col-span-2">
                                  <Input
                                    id="unidadesM4"
                                    onChange={handleChange}
                                    size={"sm"}
                                    label="A Partir de (x) Unidades"
                                    name="unidadesM4"
                                    labelPlacement="outside"
                                    placeholder="0"
                                    variant="faded"
                                  />
                                  <br />
                                  <Input
                                    id="descuentoM4"
                                    onChange={handleChange}
                                    value={user.descuentoM4}
                                    size={"sm"}
                                    label="% de Descuento"
                                    name="descuentoM4"
                                    labelPlacement="outside"
                                    placeholder="0"
                                    variant="faded"
                                  />
                                  <br />
                                  <Input
                                    id="precioConDescuentoM4"
                                    disabled={true}
                                    onChange={handleChange}
                                    value={user.precioConDescuentoM4}
                                    size={"sm"}
                                    label="Precio con Descuento"
                                    name="precioConDescuentoM4"
                                    labelPlacement="outside"
                                    placeholder="0"
                                    variant="faded"
                                  />
                                </div>
                                <div className="md:col-span-2">
                                  <Input
                                    id="unidadesM5"
                                    onChange={handleChange}
                                    size={"sm"}
                                    label="A Partir de (x) Unidades"
                                    name="unidadesM5"
                                    labelPlacement="outside"
                                    placeholder="0"
                                    variant="faded"
                                  />
                                  <br />
                                  <Input
                                    id="descuentoM5"
                                    onChange={handleChange}
                                    value={user.descuentoM5}
                                    size={"sm"}
                                    label="% de Descuento"
                                    name="descuentoM5"
                                    labelPlacement="outside"
                                    placeholder="0"
                                    variant="faded"
                                  />
                                  <br />
                                  <Input
                                    id="precioConDescuentoM5"
                                    disabled={true}
                                    onChange={handleChange}
                                    value={user.precioConDescuentoM5}
                                    size={"sm"}
                                    label="Precio con Descuento"
                                    name="precioConDescuentoM5"
                                    labelPlacement="outside"
                                    placeholder="0"
                                    variant="faded"
                                  />
                                </div>
                                <div className="md:col-span-2">
                                  <Input
                                    id="unidadesM6"
                                    onChange={handleChange}
                                    size={"sm"}
                                    label="A Partir de (x) Unidades"
                                    name="unidadesM6"
                                    labelPlacement="outside"
                                    placeholder="0"
                                    variant="faded"
                                  />
                                  <br />
                                  <Input
                                    id="descuentoM6"
                                    onChange={handleChange}
                                    value={user.descuentoM6}
                                    size={"sm"}
                                    label="% de Descuento"
                                    name="descuentoM6"
                                    labelPlacement="outside"
                                    placeholder="0"
                                    variant="faded"
                                  />
                                  <br />
                                  <Input
                                    id="precioConDescuentoM6"
                                    disabled={true}
                                    onChange={handleChange}
                                    value={user.precioConDescuentoM6}
                                    size={"sm"}
                                    label="Precio con Descuento"
                                    name="precioConDescuentoM6"
                                    labelPlacement="outside"
                                    placeholder="0"
                                    variant="faded"
                                  />
                                </div>

                              </div>
                            </Tab>
                            <Tab key="intentary" title="Inventario">
                              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-12 space-x-4 space-y-4 content-end">
                                <Spacer y={6} />
                                <div className="md:col-span-12"></div>
                                <div className="md:col-span-3">
                                  <Input
                                    id="invMinimo"
                                    isDisabled={status ? true : false}
                                    onChange={handleChange}
                                    size={"sm"}
                                    label="Inventario Minimo"
                                    name="invMinimo"
                                    labelPlacement="outside"
                                    placeholder="0"
                                    variant="faded"
                                  />
                                </div>
                                <div className="md:col-span-3">
                                  <Input
                                    id="invMaximo"
                                    isDisabled={status ? true : false}
                                    onChange={handleChange}
                                    size={"sm"}
                                    label="Inventario Maximo"
                                    name="invMaximo"
                                    labelPlacement="outside"
                                    placeholder="0"
                                    variant="faded"
                                  />
                                </div>
                                <div className="md:col-span-3">
                                  <Input
                                    id="puntoReorden"
                                    isDisabled={status ? true : false}
                                    onChange={handleChange}
                                    size={"sm"}
                                    label="Punto de Reorden"
                                    name="puntoReorden"
                                    labelPlacement="outside"
                                    placeholder="0"
                                    variant="faded"
                                  />
                                </div>
                                <div className="md:col-span-3">
                                  <Input
                                    size={"sm"}
                                    label="Cantidad a Surtir en Reorden"
                                    id="cantidadSurtReorden"
                                    isDisabled={status ? true : false}
                                    name="cantidadSurtReorden"
                                    onChange={handleChange}
                                    labelPlacement="outside"
                                    placeholder="0"
                                    variant="faded"
                                  />
                                </div>


                                <div className="md:col-span-12 flex flex-col  space-y-4">
                                  <h2 className="font-large text-lg text-foreground text-left">
                                    Ubicacion Fisica
                                  </h2>
                                </div>
                                <div className="md:col-span-12 flex">
                                  <h2 className="flex-grow font-large text-lg text-foreground text-left">
                                    Almacén
                                  </h2>
                                  <h2 className="flex-grow font-large text-lg text-foreground text-left">
                                    Zona
                                  </h2>
                                  <h2 className="flex-grow font-large text-lg text-foreground text-left">
                                    Pasillo
                                  </h2>
                                  <h2 className="flex-grow font-large text-lg text-foreground text-left">
                                    Estante
                                  </h2>
                                  <h2 className="flex-grow font-large text-lg text-foreground text-left">
                                    Nivel
                                  </h2>
                                  <h2 className="flex-grow font-large text-lg text-foreground text-left">
                                    Compartimiento
                                  </h2>
                                </div>

                                <div className="md:col-span-12 flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:space-x-4">
                                  <p className="text-sm font-medium text-foreground mb-2 md:w-1/4">
                                    Elloos <br />
                                    <span className="text-lg font-semibold">Bodega</span>
                                  </p>
                                  <Input
                                    id="zonaBodega"
                                    disabled={true}
                                    onChange={handleChange}
                                    size={"sm"}
                                    name="zonaBodega"
                                    labelPlacement="outside"
                                    placeholder=""
                                    variant="faded"
                                  />
                                  <Input
                                    id="pasilloBodega"
                                    disabled={true}
                                    onChange={handleChange}
                                    size={"sm"}
                                    name="pasilloBodega"
                                    labelPlacement="outside"
                                    placeholder=""
                                    variant="faded"
                                  />
                                  <Input
                                    id="estanteBodega"
                                    disabled={true}
                                    onChange={handleChange}
                                    size={"sm"}
                                    name="estanteBodega"
                                    labelPlacement="outside"
                                    placeholder=""
                                    variant="faded"
                                  />
                                  <Input
                                    id="nivelBodega"
                                    disabled={true}
                                    onChange={handleChange}
                                    size={"sm"}
                                    name="nivelBodega"
                                    labelPlacement="outside"
                                    placeholder=""
                                    variant="faded"
                                  />
                                  <Input
                                    id="compartimientoBodega"
                                    disabled={true}
                                    onChange={handleChange}
                                    size={"sm"}
                                    name="compartimientoBodega"
                                    labelPlacement="outside"
                                    placeholder=""
                                    variant="faded"
                                  />
                                </div>
                                <div className="md:col-span-12 flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:space-x-4">
                                  <p className="text-sm font-medium text-foreground mb-2 md:w-1/4">
                                    Página <br />
                                    <span className="text-lg font-semibold">Web</span>
                                  </p>
                                  <Input
                                    id="zonaWeb"
                                    disabled={true}
                                    onChange={handleChange}
                                    size={"sm"}
                                    name="zonaWeb"
                                    labelPlacement="outside"
                                    placeholder=""
                                    variant="faded"
                                  />
                                  <Input
                                    id="pasilloWeb"
                                    disabled={true}
                                    onChange={handleChange}
                                    size={"sm"}
                                    name="pasilloWeb"
                                    labelPlacement="outside"
                                    placeholder=""
                                    variant="faded"
                                  />
                                  <Input
                                    id="estanteWeb"
                                    disabled={true}
                                    onChange={handleChange}
                                    size={"sm"}
                                    name="estanteWeb"
                                    labelPlacement="outside"
                                    placeholder=""
                                    variant="faded"
                                  />
                                  <Input
                                    id="nivelWeb"
                                    disabled={true}
                                    onChange={handleChange}
                                    size={"sm"}
                                    name="nivelWeb"
                                    labelPlacement="outside"
                                    placeholder=""
                                    variant="faded"
                                  />
                                  <Input
                                    id="compartimientoWeb"
                                    disabled={true}
                                    onChange={handleChange}
                                    size={"sm"}
                                    name="compartimientoWeb"
                                    labelPlacement="outside"
                                    placeholder=""
                                    variant="faded"
                                  />
                                </div>
                                <div className="md:col-span-12 flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:space-x-4">
                                  <p className="text-sm font-medium text-foreground mb-2 md:w-1/4">
                                    Principal <br />
                                    <span className="text-lg font-semibold">Aparadores</span>
                                  </p>
                                  <Input
                                    id="zonaAparadores"
                                    disabled={true}
                                    onChange={handleChange}
                                    size={"sm"}
                                    name="zonaWeb"
                                    labelPlacement="outside"
                                    placeholder=""
                                    variant="faded"
                                  />
                                  <Input
                                    id="pasilloWeb"
                                    disabled={true}
                                    onChange={handleChange}
                                    size={"sm"}
                                    name="pasilloWeb"
                                    labelPlacement="outside"
                                    placeholder=""
                                    variant="faded"
                                  />
                                  <Input
                                    id="estanteWeb"
                                    disabled={true}
                                    onChange={handleChange}
                                    size={"sm"}
                                    name="estanteWeb"
                                    labelPlacement="outside"
                                    placeholder=""
                                    variant="faded"
                                  />
                                  <Input
                                    id="nivelWeb"
                                    disabled={true}
                                    onChange={handleChange}
                                    size={"sm"}
                                    name="nivelWeb"
                                    labelPlacement="outside"
                                    placeholder=""
                                    variant="faded"
                                  />
                                  <Input
                                    id="compartimientoWeb"
                                    disabled={true}
                                    onChange={handleChange}
                                    size={"sm"}
                                    name="compartimientoWeb"
                                    labelPlacement="outside"
                                    placeholder=""
                                    variant="faded"
                                  />
                                </div>
                                <div className="md:col-span-12 flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:space-x-4">
                                  <p className="text-sm font-medium text-foreground mb-2 md:w-1/4">
                                    Principal <br />
                                    <span className="text-lg font-semibold">Bodega 1</span>
                                  </p>
                                  <Input
                                    id="zonaBodega1"
                                    disabled={true}
                                    onChange={handleChange}
                                    size={"sm"}
                                    name="zonaWeb"
                                    labelPlacement="outside"
                                    placeholder=""
                                    variant="faded"
                                  />
                                  <Input
                                    id="pasilloWeb"
                                    disabled={true}
                                    onChange={handleChange}
                                    size={"sm"}
                                    name="pasilloWeb"
                                    labelPlacement="outside"
                                    placeholder=""
                                    variant="faded"
                                  />
                                  <Input
                                    id="estanteWeb"
                                    disabled={true}
                                    onChange={handleChange}
                                    size={"sm"}
                                    name="estanteWeb"
                                    labelPlacement="outside"
                                    placeholder=""
                                    variant="faded"
                                  />
                                  <Input
                                    id="nivelWeb"
                                    disabled={true}
                                    onChange={handleChange}
                                    size={"sm"}
                                    name="nivelWeb"
                                    labelPlacement="outside"
                                    placeholder=""
                                    variant="faded"
                                  />
                                  <Input
                                    id="compartimientoWeb"
                                    disabled={true}
                                    onChange={handleChange}
                                    size={"sm"}
                                    name="compartimientoWeb"
                                    labelPlacement="outside"
                                    placeholder=""
                                    variant="faded"
                                  />
                                </div>
                                <div className="md:col-span-12 flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:space-x-4">
                                  <p className="text-sm font-medium text-foreground mb-2 md:w-1/4">
                                    Principal <br />
                                    <span className="text-lg font-semibold">Bodega 2</span>
                                  </p>
                                  <Input
                                    id="zonaBodega2"
                                    disabled={true}
                                    onChange={handleChange}
                                    size={"sm"}
                                    name="zonaWeb"
                                    labelPlacement="outside"
                                    placeholder=""
                                    variant="faded"
                                  />
                                  <Input
                                    id="pasilloWeb"
                                    disabled={true}
                                    onChange={handleChange}
                                    size={"sm"}
                                    name="pasilloWeb"
                                    labelPlacement="outside"
                                    placeholder=""
                                    variant="faded"
                                  />
                                  <Input
                                    id="estanteWeb"
                                    disabled={true}
                                    onChange={handleChange}
                                    size={"sm"}
                                    name="estanteWeb"
                                    labelPlacement="outside"
                                    placeholder=""
                                    variant="faded"
                                  />
                                  <Input
                                    id="nivelWeb"
                                    disabled={true}
                                    onChange={handleChange}
                                    size={"sm"}
                                    name="nivelWeb"
                                    labelPlacement="outside"
                                    placeholder=""
                                    variant="faded"
                                  />
                                  <Input
                                    id="compartimientoWeb"
                                    disabled={true}
                                    onChange={handleChange}
                                    size={"sm"}
                                    name="compartimientoWeb"
                                    labelPlacement="outside"
                                    placeholder=""
                                    variant="faded"
                                  />
                                </div>
                                <div className="md:col-span-12 flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:space-x-4">
                                  <p className="text-sm font-medium text-foreground mb-2 md:w-1/4">
                                    Principal <br />
                                    <span className="text-lg font-semibold">Bodega 3 Basculas</span>
                                  </p>
                                  <Input
                                    id="zonaWeb"
                                    disabled={true}
                                    onChange={handleChange}
                                    size={"sm"}
                                    name="zonaWeb"
                                    labelPlacement="outside"
                                    placeholder=""
                                    variant="faded"
                                  />
                                  <Input
                                    id="pasilloWeb"
                                    disabled={true}
                                    onChange={handleChange}
                                    size={"sm"}
                                    name="pasilloWeb"
                                    labelPlacement="outside"
                                    placeholder=""
                                    variant="faded"
                                  />
                                  <Input
                                    id="estanteWeb"
                                    disabled={true}
                                    onChange={handleChange}
                                    size={"sm"}
                                    name="estanteWeb"
                                    labelPlacement="outside"
                                    placeholder=""
                                    variant="faded"
                                  />
                                  <Input
                                    id="nivelWeb"
                                    disabled={true}
                                    onChange={handleChange}
                                    size={"sm"}
                                    name="nivelWeb"
                                    labelPlacement="outside"
                                    placeholder=""
                                    variant="faded"
                                  />
                                  <Input
                                    id="compartimientoWeb"
                                    disabled={true}
                                    onChange={handleChange}
                                    size={"sm"}
                                    name="compartimientoWeb"
                                    labelPlacement="outside"
                                    placeholder=""
                                    variant="faded"
                                  />
                                </div>
                                <div className="md:col-span-12 flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:space-x-4">
                                  <p className="text-sm font-medium text-foreground mb-2 md:w-1/4">
                                    Principal <br />
                                    <span className="text-lg font-semibold">Bodega 4 Equipos</span>
                                  </p>
                                  <Input
                                    id="zonaWeb"
                                    disabled={true}
                                    onChange={handleChange}
                                    size={"sm"}
                                    name="zonaWeb"
                                    labelPlacement="outside"
                                    placeholder=""
                                    variant="faded"
                                  />
                                  <Input
                                    id="pasilloWeb"
                                    disabled={true}
                                    onChange={handleChange}
                                    size={"sm"}
                                    name="pasilloWeb"
                                    labelPlacement="outside"
                                    placeholder=""
                                    variant="faded"
                                  />
                                  <Input
                                    id="estanteWeb"
                                    disabled={true}
                                    onChange={handleChange}
                                    size={"sm"}
                                    name="estanteWeb"
                                    labelPlacement="outside"
                                    placeholder=""
                                    variant="faded"
                                  />
                                  <Input
                                    id="nivelWeb"
                                    disabled={true}
                                    onChange={handleChange}
                                    size={"sm"}
                                    name="nivelWeb"
                                    labelPlacement="outside"
                                    placeholder=""
                                    variant="faded"
                                  />
                                  <Input
                                    id="compartimientoWeb"
                                    disabled={true}
                                    onChange={handleChange}
                                    size={"sm"}
                                    name="compartimientoWeb"
                                    labelPlacement="outside"
                                    placeholder=""
                                    variant="faded"
                                  />
                                </div>
                                <div className="md:col-span-12 flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:space-x-4">
                                  <p className="text-sm font-medium text-foreground mb-2 md:w-1/4">
                                    Principal <br />
                                    <span className="text-lg font-semibold">Bodega 5 L</span>
                                  </p>
                                  <Input
                                    id="zonaWeb"
                                    disabled={true}
                                    onChange={handleChange}
                                    size={"sm"}
                                    name="zonaWeb"
                                    labelPlacement="outside"
                                    placeholder=""
                                    variant="faded"
                                  />
                                  <Input
                                    id="pasilloWeb"
                                    disabled={true}
                                    onChange={handleChange}
                                    size={"sm"}
                                    name="pasilloWeb"
                                    labelPlacement="outside"
                                    placeholder=""
                                    variant="faded"
                                  />
                                  <Input
                                    id="estanteWeb"
                                    disabled={true}
                                    onChange={handleChange}
                                    size={"sm"}
                                    name="estanteWeb"
                                    labelPlacement="outside"
                                    placeholder=""
                                    variant="faded"
                                  />
                                  <Input
                                    id="nivelWeb"
                                    disabled={true}
                                    onChange={handleChange}
                                    size={"sm"}
                                    name="nivelWeb"
                                    labelPlacement="outside"
                                    placeholder=""
                                    variant="faded"
                                  />
                                  <Input
                                    id="compartimientoWeb"
                                    disabled={true}
                                    onChange={handleChange}
                                    size={"sm"}
                                    name="compartimientoWeb"
                                    labelPlacement="outside"
                                    placeholder=""
                                    variant="faded"
                                  />
                                </div>
                                <div className="md:col-span-12 flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:space-x-4">
                                  <p className="text-sm font-medium text-foreground mb-2 md:w-1/4">
                                    Principal <br />
                                    <span className="text-lg font-semibold">Bodega 6 Cuarto Frío</span>
                                  </p>
                                  <Input
                                    id="zonaWeb"
                                    disabled={true}
                                    onChange={handleChange}
                                    size={"sm"}
                                    name="zonaWeb"
                                    labelPlacement="outside"
                                    placeholder=""
                                    variant="faded"
                                  />
                                  <Input
                                    id="pasilloWeb"
                                    disabled={true}
                                    onChange={handleChange}
                                    size={"sm"}
                                    name="pasilloWeb"
                                    labelPlacement="outside"
                                    placeholder=""
                                    variant="faded"
                                  />
                                  <Input
                                    id="estanteWeb"
                                    disabled={true}
                                    onChange={handleChange}
                                    size={"sm"}
                                    name="estanteWeb"
                                    labelPlacement="outside"
                                    placeholder=""
                                    variant="faded"
                                  />
                                  <Input
                                    id="nivelWeb"
                                    disabled={true}
                                    onChange={handleChange}
                                    size={"sm"}
                                    name="nivelWeb"
                                    labelPlacement="outside"
                                    placeholder=""
                                    variant="faded"
                                  />
                                  <Input
                                    id="compartimientoWeb"
                                    disabled={true}
                                    onChange={handleChange}
                                    size={"sm"}
                                    name="compartimientoWeb"
                                    labelPlacement="outside"
                                    placeholder=""
                                    variant="faded"
                                  />
                                </div>
                                <div className="md:col-span-12 flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:space-x-4">
                                  <p className="text-sm font-medium text-foreground mb-2 md:w-1/4">
                                    Principal <br />
                                    <span className="text-lg font-semibold">Excedente</span>
                                  </p>
                                  <Input
                                    id="zonaWeb"
                                    disabled={true}
                                    onChange={handleChange}
                                    size={"sm"}
                                    name="zonaWeb"
                                    labelPlacement="outside"
                                    placeholder=""
                                    variant="faded"
                                  />
                                  <Input
                                    id="pasilloWeb"
                                    disabled={true}
                                    onChange={handleChange}
                                    size={"sm"}
                                    name="pasilloWeb"
                                    labelPlacement="outside"
                                    placeholder=""
                                    variant="faded"
                                  />
                                  <Input
                                    id="estanteWeb"
                                    disabled={true}
                                    onChange={handleChange}
                                    size={"sm"}
                                    name="estanteWeb"
                                    labelPlacement="outside"
                                    placeholder=""
                                    variant="faded"
                                  />
                                  <Input
                                    id="nivelWeb"
                                    disabled={true}
                                    onChange={handleChange}
                                    size={"sm"}
                                    name="nivelWeb"
                                    labelPlacement="outside"
                                    placeholder=""
                                    variant="faded"
                                  />
                                  <Input
                                    id="compartimientoWeb"
                                    disabled={true}
                                    onChange={handleChange}
                                    size={"sm"}
                                    name="compartimientoWeb"
                                    labelPlacement="outside"
                                    placeholder=""
                                    variant="faded"
                                  />
                                </div>
                                <div className="md:col-span-12 flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:space-x-4">
                                  <p className="text-sm font-medium text-foreground mb-2 md:w-1/4">
                                    Principal <br />
                                    <span className="text-lg font-semibold">Recepción</span>
                                  </p>
                                  <Input
                                    id="zonaWeb"
                                    disabled={true}
                                    onChange={handleChange}
                                    size={"sm"}
                                    name="zonaWeb"
                                    labelPlacement="outside"
                                    placeholder=""
                                    variant="faded"
                                  />
                                  <Input
                                    id="pasilloWeb"
                                    disabled={true}
                                    onChange={handleChange}
                                    size={"sm"}
                                    name="pasilloWeb"
                                    labelPlacement="outside"
                                    placeholder=""
                                    variant="faded"
                                  />
                                  <Input
                                    id="estanteWeb"
                                    disabled={true}
                                    onChange={handleChange}
                                    size={"sm"}
                                    name="estanteWeb"
                                    labelPlacement="outside"
                                    placeholder=""
                                    variant="faded"
                                  />
                                  <Input
                                    id="nivelWeb"
                                    disabled={true}
                                    onChange={handleChange}
                                    size={"sm"}
                                    name="nivelWeb"
                                    labelPlacement="outside"
                                    placeholder=""
                                    variant="faded"
                                  />
                                  <Input
                                    id="compartimientoWeb"
                                    disabled={true}
                                    onChange={handleChange}
                                    size={"sm"}
                                    name="compartimientoWeb"
                                    labelPlacement="outside"
                                    placeholder=""
                                    variant="faded"
                                  />
                                </div>
                                <div className="md:col-span-12 flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:space-x-4">
                                  <p className="text-sm font-medium text-foreground mb-2 md:w-1/4">
                                    Principal <br />
                                    <span className="text-lg font-semibold">Temporal Para Igualar</span>
                                  </p>
                                  <Input
                                    id="zonaWeb"
                                    disabled={true}
                                    onChange={handleChange}
                                    size={"sm"}
                                    name="zonaWeb"
                                    labelPlacement="outside"
                                    placeholder=""
                                    variant="faded"
                                  />
                                  <Input
                                    id="pasilloWeb"
                                    disabled={true}
                                    onChange={handleChange}
                                    size={"sm"}
                                    name="pasilloWeb"
                                    labelPlacement="outside"
                                    placeholder=""
                                    variant="faded"
                                  />
                                  <Input
                                    id="estanteWeb"
                                    disabled={true}
                                    onChange={handleChange}
                                    size={"sm"}
                                    name="estanteWeb"
                                    labelPlacement="outside"
                                    placeholder=""
                                    variant="faded"
                                  />
                                  <Input
                                    id="nivelWeb"
                                    disabled={true}
                                    onChange={handleChange}
                                    size={"sm"}
                                    name="nivelWeb"
                                    labelPlacement="outside"
                                    placeholder=""
                                    variant="faded"
                                  />
                                  <Input
                                    id="compartimientoWeb"
                                    disabled={true}
                                    onChange={handleChange}
                                    size={"sm"}
                                    name="compartimientoWeb"
                                    labelPlacement="outside"
                                    placeholder=""
                                    variant="faded"
                                  />
                                </div>
                                <div className="md:col-span-12 flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:space-x-4">
                                  <p className="text-sm font-medium text-foreground mb-2 md:w-1/4">
                                    Principal <br />
                                    <span className="text-lg font-semibold">Tienda</span>
                                  </p>
                                  <Input
                                    id="zonaWeb"
                                    disabled={true}
                                    onChange={handleChange}
                                    size={"sm"}
                                    name="zonaWeb"
                                    labelPlacement="outside"
                                    placeholder=""
                                    variant="faded"
                                  />
                                  <Input
                                    id="pasilloWeb"
                                    disabled={true}
                                    onChange={handleChange}
                                    size={"sm"}
                                    name="pasilloWeb"
                                    labelPlacement="outside"
                                    placeholder=""
                                    variant="faded"
                                  />
                                  <Input
                                    id="estanteWeb"
                                    disabled={true}
                                    onChange={handleChange}
                                    size={"sm"}
                                    name="estanteWeb"
                                    labelPlacement="outside"
                                    placeholder=""
                                    variant="faded"
                                  />
                                  <Input
                                    id="nivelWeb"
                                    disabled={true}
                                    onChange={handleChange}
                                    size={"sm"}
                                    name="nivelWeb"
                                    labelPlacement="outside"
                                    placeholder=""
                                    variant="faded"
                                  />
                                  <Input
                                    id="compartimientoWeb"
                                    disabled={true}
                                    onChange={handleChange}
                                    size={"sm"}
                                    name="compartimientoWeb"
                                    labelPlacement="outside"
                                    placeholder=""
                                    variant="faded"
                                  />
                                </div>
                              </div>

                            </Tab>
                            <Tab key="aditionalinf" title="Información adicional">
                              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-12 space-x-4 space-y-4 content-end">
                                <Spacer y={6} />
                                <div className="md:col-span-12"></div>
                                <div className="md:col-span-12">
                                  <Textarea
                                    id="desComercProd"
                                    isDisabled={status ? true : false}
                                    onChange={handleChange}
                                    size={"sm"}
                                    label="Descripcion Comercial del Producto"
                                    name="desComercProd"
                                    labelPlacement="outside"
                                    placeholder=" "
                                    variant="faded"
                                  />
                                </div>
                                <div className="md:col-span-12">
                                  <Textarea
                                    id="espTecProd"
                                    isDisabled={status ? true : false}
                                    onChange={handleChange}
                                    size={"sm"}
                                    label="Especificaciones Técnicas del Prducto"
                                    name="espTecProd"
                                    labelPlacement="outside"
                                    placeholder=" "
                                    variant="faded"
                                  />
                                </div>
                                <div className="md:col-span-4">
                                  <Input
                                    id="anchoCM"
                                    isDisabled={status ? true : false}
                                    onChange={handleChange}
                                    size={"sm"}
                                    label="Ancho en cm"
                                    name="anchoCM"
                                    labelPlacement="outside"
                                    placeholder="0"
                                    variant="faded"
                                  />
                                </div>
                                <div className="md:col-span-4">
                                  <Input
                                    id="altoCM"
                                    isDisabled={status ? true : false}
                                    onChange={handleChange}
                                    size={"sm"}
                                    label="Alto en cm"
                                    name="altoCM"
                                    labelPlacement="outside"
                                    placeholder="0"
                                    variant="faded"
                                  />
                                </div>
                                <div className="md:col-span-4">
                                  <Input
                                    id="profundidadCM"
                                    isDisabled={status ? true : false}
                                    onChange={handleChange}
                                    size={"sm"}
                                    label="Profundidad en cm"
                                    name="profundidadCM"
                                    labelPlacement="outside"
                                    placeholder="0"
                                    variant="faded"
                                  />
                                </div>
                                <div className="md:col-span-4">
                                  <Input
                                    id="pesoKg"
                                    isDisabled={status ? true : false}
                                    onChange={handleChange}
                                    size={"sm"}
                                    label="Peso en Kg"
                                    name="pesoKg"
                                    labelPlacement="outside"
                                    placeholder="0"
                                    variant="faded"
                                  />
                                </div>
                                <div className="md:col-span-4">
                                  <Input
                                    id="color"
                                    isDisabled={status ? true : false}
                                    onChange={handleChange}
                                    size={"sm"}
                                    label="Color"
                                    name="color"
                                    labelPlacement="outside"
                                    placeholder="0"
                                    variant="faded"
                                  />
                                </div>
                                <div className="md:col-span-4">
                                  <Input
                                    id="energia"
                                    isDisabled={status ? true : false}
                                    onChange={handleChange}
                                    size={"sm"}
                                    label="Energía"
                                    name="energia"
                                    labelPlacement="outside"
                                    placeholder="0"
                                    variant="faded"
                                  />
                                </div>
                                <div className="md:col-span-12">
                                  <Input
                                    id="fichaTec"
                                    isDisabled={status ? true : false}
                                    onChange={handleChange}
                                    size="small"
                                    label="Ficha Técnica (enlace)"
                                    name="fichaTec"
                                    labelPlacement="outside"
                                    placeholder="$ 0.00"
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
                        {selected === "music" && (
                          <Button
                            className="min-w-[200px]"
                            color="primary"
                            type="submit"
                            startContent={<RiArrowLeftLine />}
                            onClick={() => setSelected("photos")}
                          >
                            Anterior
                          </Button>
                        )}
                        {selected === "photos" && (
                          <Button
                            className="min-w-[200px]"
                            color="primary"
                            type="button"
                            endContent={<RiArrowRightLine />}
                            onClick={() => setSelected("music")}
                          >
                            Siguiente
                          </Button>
                        )}
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
  )
};

export default Product;
