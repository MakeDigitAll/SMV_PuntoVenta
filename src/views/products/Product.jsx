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
import { MdCamera, MdProductionQuantityLimits } from "react-icons/md";
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
  const [status] = useState(false);
  const handleChangeImage = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      setPhotoURL(URL.createObjectURL(file));
      setOpenCrop(true);
    }
  };
  const [user, setUser] = useState({
    imagen: "",
    nombreProducto: "",
    codigoFab: "",
    codigoEmp: "",
    marcaProd: "",
    categoriaProd: "",
    codigoSAT: "",
    actualizado: format(new Date(), "yyyy-MM-dd"),
    activo: "",
    web: "",
    pos: "",
    venta: "",
    precio: "",
    existencia: "",
    cantidad: "",
    backOrder: "",
    descuento: "",
    total: "",    
  });
  const [validationErrors, setValidationErrors] = useState({
    imagenProduc: "",
    nombreProducto: "",
    codigoFab: "",
    codigoEmp: "",
    marcaProd: "",
    categoriaProd: "",
    codigoSAT: "",
    actualizado: "",
    activo: "",
    web: "",
    pos: "",
    venta: "",
    precio: "",
    existencia: "",
    cantidad: "",
    backOrder: "",
    descuento: "",
    total: "",    
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setValidationErrors({ ...validationErrors, [name]: "" });
  };
  const fileInputRef = useRef(null);
  const handleFileButtonClick = () => {
    fileInputRef.current.click();
  };
  async function handleSubmit(e) {
    e.preventDefault();
    !file
      ? toast.error("Por favor, selecciona una imagen", { theme: "colored" })
      : "";
    if (
      !photoURL ||
      !user.imagen ||
      !user.nombreProducto ||
      !user.codigoFab ||
      !user.codigoEmp ||
      !user.marcaProd ||
      !user.categoriaProd ||
      !user.codigoSAT ||
      !user.actualizado ||
      !user.precio ||
      !user.existencia ||
      !user.cantidad ||
      !user.descuento ||
      !user.total !== "valid"
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
    !user.codigoSAT ? (errors.codigoSAT = "Favor de llenar este campo") : "";
    !user.precio ? (errors.precio = "Favor de llenar este campo") : "";
    !user.existencia ? (errors.existencia = "Favor de llenar este campo") : "";
    !user.cantidad ? (errors.cantidad = "Favor de llenar este campo") : "";
    !user.descuento ? (errors.descuento = "Favor de llenar este campo") : "";
    !user.total ? (errors.total = "Favor de llenar este campo") : "";

    !photoURL ? (errors.imagen = "Favor de llenar este campo") : "";
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    setValidationErrors({});

    const formData = new FormData();
    const document = JSON.stringify({
      nombreProducto: user.nombreProducto,
      codigoFab: user.codigoFab,
      codigoEmp: user.codigoEmp,
      marcaProd: user.marcaProd,
      categoriaProd: user.categoriaProd,
      codigoSAT: user.codigoSAT,
      actualizado: user.actualizado,
      precio: user.precio,
      existencia: user.existencia,
      cantidad: user.cantidad,
      descuento: user.descuento,
      total: user.total,
      activo: activoToSave,
      web: webToSave,
      pos: posToSave,
      venta: ventaToSave,
      backOrder: backOrderToSave,
    });

    formData.append("document", document);
    formData.append("image", file);
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
  useEffect(() => {
    loadTask();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigate = useNavigate();
  const [selected, setSelected] = useState("photos");

  const [isActivo, setIsActivo] = useState(false);
  const activoToSave = isActivo ? 1 : 0;
  console.log("Activo: ",activoToSave);

  const [isWeb, setIsWeb] = useState(false);
  const webToSave = isWeb ? 1 : 0;
  console.log("Web: ", webToSave);

  const [isPos, setIsPos] = useState(false);
  const posToSave = isPos ? 1 : 0;
  console.log("POS: ", posToSave);

  const [isVenta, setIsVenta] = useState(false);
  const ventaToSave = isVenta ? 1 : 0;
  console.log("venta: ",ventaToSave);

  const [isBackOrder, setIsBackOrder] = useState(false);
  const backOrderToSave = isBackOrder ? 1 : 0;
  console.log("BackOrder: ", backOrderToSave);
 



  return !openCrop ? (
    <>
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
                          Imagen de perfil
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
                          Agregar foto de perfil
                        </Button>
                      </div>
                      <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-12 space-x-4 space-y-4 content-end">
                        <br />
                        <div className="md:col-span-12 flex space-x-4">
                          <Image
                            width={150}
                            height={200}
                            src="../../../public/Blank-Avatar.png"
                            alt=""
                          />
                          <Image
                            width={150}
                            height={200}
                            src="../../../public/Blank-Avatar.png"
                            alt=""
                          />
                          <Image
                            width={150}
                            height={200}
                            src="../../../public/Blank-Avatar.png"
                            alt=""
                          />
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
                                <div className="md:col-span-8">
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
                                    label="Fecha"
                                    id="actualizado"
                                    disabled={true}
                                    value={user.actualizado}
                                    name="actualizado"
                                    onChange={handleChange}
                                    labelPlacement="outside"
                                    placeholder=" "
                                    variant="faded"
                                    error={validationErrors.actualizado !== ""}
                                    errorMessage={validationErrors.actualizado}
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
                                <Input
                                    id="marcaProd"
                                    onChange={handleChange}
                                    value={user.marcaProd}
                                    size={"sm"}
                                    label="Marca del producto"
                                    name="marcaProd"
                                    labelPlacement="outside"
                                    placeholder=" "
                                    variant="faded"
                                    error={validationErrors.marcaProd !== ""}
                                    errorMessage={validationErrors.marcaProd}
                                  />
                                </div>

                                <div className="md:col-span-4">
                                  <Input
                                    id="categoriaProd"
                                    value={user.categoriaProd}
                                    onChange={handleChange}
                                    size={"sm"}
                                    label="Categoria del Producto"
                                    name="categoriaProd"
                                    labelPlacement="outside"
                                    placeholder=" "
                                    variant="faded"
                                    error={validationErrors.categoriaProd !== ""}
                                    errorMessage={validationErrors.categoriaProd}
                                  />
                                </div>

                                <div className="md:col-span-4">
                                  <Input
                                    id="codigoSAT"
                                    onChange={handleChange}
                                    value={user.codigoSAT}
                                    size={"sm"}
                                    label="Cofigo de SAT Producto"
                                    name="codigoSAT"
                                    labelPlacement="outside"
                                    placeholder=" "
                                    variant="faded"
                                    error={validationErrors.codigoSAT !== ""}
                                    errorMessage={validationErrors.codigoSAT}
                                  />
                                </div>
                                <div className="md:col-span-4">
                                  <Input
                                    id="precio"
                                    onChange={handleChange}
                                    value={user.precio}
                                    size={"sm"}
                                    label="Precio del Producto"
                                    name="precio"
                                    labelPlacement="outside"
                                    placeholder=" "
                                    variant="faded"
                                    error={validationErrors.precio !== ""}
                                    errorMessage={validationErrors.precio}
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
                                <div className="md:col-span-4"></div>
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
                                <div className="md:col-span-4">
                                  <Input
                                    id="total"
                                    onChange={handleChange}
                                    value={user.total}
                                    size={"sm"}
                                    label="Total"
                                    name="total"
                                    labelPlacement="outside"
                                    placeholder=" "
                                    variant="faded"
                                    error={validationErrors.total !== ""}
                                    errorMessage={validationErrors.total}
                                  />
                                </div>
                                <div className="md:col-span-4">

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
                                <div className="md:col-span-4">
                                  <Input
                                    id="moneda"
                                    isDisabled={status ? true : false}
                                    onChange={handleChange}
                                    size={"sm"}
                                    label="Moneda"
                                    name="moneda"
                                    labelPlacement="outside"
                                    placeholder=" "
                                    variant="faded"
                                  />
                                </div>
                                <div className="md:col-span-4">
                                  <Input
                                    id="impuesto"
                                    isDisabled={status ? true : false}
                                    onChange={handleChange}
                                    size={"sm"}
                                    label="Impuesto"
                                    name="impuesto"
                                    labelPlacement="outside"
                                    placeholder=" "
                                    variant="faded"
                                  />
                                </div>
                                <div className="md:col-span-4">
                                  <Input
                                    id="impuestoRet"
                                    isDisabled={status ? true : false}
                                    onChange={handleChange}
                                    size={"sm"}
                                    label="Impuesto Retenido"
                                    name="impuestoRet"
                                    labelPlacement="outside"
                                    placeholder=" "
                                    variant="faded"
                                  />
                                </div>
                                <div className="md:col-span-6">
                                  <Input
                                    size={"sm"}
                                    label="Costo"
                                    id="costo"
                                    isDisabled={status ? true : false}
                                    name="costo"
                                    onChange={handleChange}
                                    labelPlacement="outside"
                                    placeholder="$ 0.00"
                                    variant="faded"
                                  />
                                </div>
                                <div className="md:col-span-6">
                                  <Input
                                    size={"sm"}
                                    label="% Margen de Ganancia"
                                    id="margenGanancia"
                                    isDisabled={status ? true : false}
                                    name="margenGanancia"
                                    onChange={handleChange}
                                    labelPlacement="outside"
                                    placeholder="0"
                                    variant="faded"
                                  />
                                </div>
                                <div className="md:col-span-6">
                                  <Input
                                    id="precioBase"
                                    isDisabled={status ? true : false}
                                    onChange={handleChange}
                                    size="small"
                                    label="Precio Base"
                                    name="precioBase"
                                    labelPlacement="outside"
                                    placeholder="$ 0.00"
                                    variant="faded"
                                  />
                                </div>
                                <div className="md:col-span-6">
                                  <Input
                                    id="precioAnterior"
                                    isDisabled={status ? true : false}
                                    onChange={handleChange}
                                    size="small"
                                    label="Precio Anterior"
                                    name="precioAnterior"
                                    labelPlacement="outside"
                                    placeholder="$ 0.00"
                                    variant="faded"
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
                                    id="decuentoM1"
                                    isDisabled={status ? true : false}
                                    onChange={handleChange}
                                    size={"sm"}
                                    label="% de Descuento"
                                    name="decuentoM1"
                                    labelPlacement="outside"
                                    placeholder="0"
                                    variant="faded"
                                  />
                                  <br />
                                  <Input
                                    id="precioConDescuentoM1"
                                    isDisabled={status ? true : false}
                                    onChange={handleChange}
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
                                    isDisabled={status ? true : false}
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
                                    id="decuentoM2"
                                    isDisabled={status ? true : false}
                                    onChange={handleChange}
                                    size={"sm"}
                                    label="% de Descuento"
                                    name="decuentoM2"
                                    labelPlacement="outside"
                                    placeholder="0"
                                    variant="faded"
                                  />
                                  <br />
                                  <Input
                                    id="precioConDescuentoM2"
                                    isDisabled={status ? true : false}
                                    onChange={handleChange}
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
                                    isDisabled={status ? true : false}
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
                                    id="decuentoM3"
                                    isDisabled={status ? true : false}
                                    onChange={handleChange}
                                    size={"sm"}
                                    label="% de Descuento"
                                    name="decuentoM3"
                                    labelPlacement="outside"
                                    placeholder="0"
                                    variant="faded"
                                  />
                                  <br />
                                  <Input
                                    id="precioConDescuentoM3"
                                    isDisabled={status ? true : false}
                                    onChange={handleChange}
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
                                    isDisabled={status ? true : false}
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
                                    id="decuentoM4"
                                    isDisabled={status ? true : false}
                                    onChange={handleChange}
                                    size={"sm"}
                                    label="% de Descuento"
                                    name="decuentoM4"
                                    labelPlacement="outside"
                                    placeholder="0"
                                    variant="faded"
                                  />
                                  <br />
                                  <Input
                                    id="precioConDescuentoM4"
                                    isDisabled={status ? true : false}
                                    onChange={handleChange}
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
                                    isDisabled={status ? true : false}
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
                                    id="decuentoM5"
                                    isDisabled={status ? true : false}
                                    onChange={handleChange}
                                    size={"sm"}
                                    label="% de Descuento"
                                    name="decuentoM5"
                                    labelPlacement="outside"
                                    placeholder="0"
                                    variant="faded"
                                  />
                                  <br />
                                  <Input
                                    id="precioConDescuentoM5"
                                    isDisabled={status ? true : false}
                                    onChange={handleChange}
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
                                    isDisabled={status ? true : false}
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
                                    id="decuentoM6"
                                    isDisabled={status ? true : false}
                                    onChange={handleChange}
                                    size={"sm"}
                                    label="% de Descuento"
                                    name="decuentoM6"
                                    labelPlacement="outside"
                                    placeholder="0"
                                    variant="faded"
                                  />
                                  <br />
                                  <Input
                                    id="precioConDescuentoM6"
                                    isDisabled={status ? true : false}
                                    onChange={handleChange}
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
  ) : (
    <Crop {...{ photoURL, setOpenCrop, setPhotoURL, setFile, aspect: 1 }} />
  );
};

export default Product;
