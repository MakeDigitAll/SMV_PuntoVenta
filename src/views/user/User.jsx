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
import { useEffect, useMemo, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
const User = () => {
  const [status, useStatus] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const imageDefault = selectedImage === "";
  const [user, setUser] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    imagen: "",
    emailConfirm: "",
    passwordConfirm: "",
  });
  const [validationErrors, setValidationErrors] = useState({
    nombre: "",
    apellido: "",
    email: "",
    emailConfirm: "",
    password: "",
    confirmPassword: "",
    direccion: "",
    colonia: "",
    ciudad: "",
    estado: "",
    codigoPostal: "",
    telefonoContacto: "",
    telefonoCelular: "",
    perfilSeguridad: "",
    vendedor: "",
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
    !selectedImage
      ? toast.error("Por favor, selecciona una imagen", { theme: "colored" })
      : "";
    if (
      !user.imagen ||
      !user.nombre ||
      !user.apellido ||
      !user.password ||
      !user.direccion ||
      !user.colonia ||
      !user.estado ||
      !user.codigoPostal ||
      !user.telefonoContacto ||
      !user.telefonoCelular ||
      !user.perfilSeguridad ||
      passwordValidationState !== "valid" ||
      confirmPasswordValidationState !== "valid" ||
      emailConfirmValidationState !== "valid"
    ) {
      toast.error("Llena todos los campos correctamente", {
        theme: "colored",
      });
    }
    user.password !== user.confirmPassword || user.email !== user.emailConfirm
      ? toast.error("Las contraseñas o correos no coinciden", {
          theme: "colored",
        })
      : "";
    const errors = {};
    !user.nombre ? (errors.nombre = "Llena este campo") : "";
    !user.apellido ? (errors.apellido = "Llena este campo") : "";
    !user.perfilSeguridad ? (errors.perfilSeguridad = "Llena este campo") : "";
    !user.vendedor ? (errors.vendedor = "Llena este campo") : "";
    !user.direccion ? (errors.direccion = "Llena este campo") : "";
    !user.colonia ? (errors.colonia = "Llena este campo") : "";
    !user.status ? (errors.status = "Llena este campo") : "";
    !user.ciudad ? (errors.ciudad = "Llena este campo") : "";
    !user.estado ? (errors.estado = "Llena este campo") : "";
    !user.codigoPostal ? (errors.codigoPostal = "Llena este campo") : "";
    !user.telefonoCelular ? (errors.telefonoCelular = "Llena este campo") : "";
    !user.telefonoContacto
      ? (errors.telefonoContacto = "Llena este campo")
      : "";
    !user.email ? (errors.email = "Llena este campo") : "";
    !user.password ? (errors.password = "Llena este campo") : "";
    !user.imagen ? (errors.imagen = "Llena este campo") : "";
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    setValidationErrors({});

    const formData = new FormData();
    const document = JSON.stringify({
      nombre: user.nombre,
      apellido: user.apellido,
      email: user.email,
      password: user.password,
      perfilSeguridad: user.perfilSeguridad,
      vendedor: user.vendedor,
    });

    formData.append("document", document);
    formData.append("image", selectedImage);
    try {
      const result = await http.post(
        `http://localhost:4000/api/createuser`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(result.data.id);
      if (result) {
        const formData2 = new FormData();
        const document2 = JSON.stringify({
          idUsuario: result.data.id,
          direccion: user.direccion,
          colonia: user.colonia,
          status: user.status,
          ciudad: user.ciudad,
          estado: user.estado,
          codigoPostal: user.codigoPostal,
          telefonoContacto: user.telefonoContacto,
          telefonoCelular: user.telefonoCelular,
        });
        formData2.append("document2", document2);
        const response = await http.post(
          `http://localhost:4000/api/createUserData`,
          formData2,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status == 200 ? true : false) {
          toast.success("Usuario creado correctamente", { theme: "colored" });
          navigate("/Settings/Users");
        }
      }
    } catch (error) {
      null;
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
  const estadosDeMexico = [
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

  const passwordValidationState = useMemo(() => {
    if (user.password === "") return undefined;
    return user.password.length >= 8 ? "valid" : "invalid";
  }, [user.password]);
  const confirmPasswordValidationState = useMemo(() => {
    if (user.confirmPassword === "") return undefined;
    if (user.confirmPassword != undefined)
      return user.password === user.confirmPassword ? "valid" : "invalid";
  }, [user.confirmPassword, user.password]);
  const emailConfirmValidationState = useMemo(() => {
    if (user.emailConfirm === "") return undefined;
    return user.emailConfirm === user.email ? "valid" : "invalid";
  }, [user.emailConfirm, user.email]);
  useEffect(() => {
    status != "View"
      ? (document.getElementById("button-file").style.display = "flex")
      : (document.getElementById("button-file").style.display = "none");
  });
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
                    onClick={() => navigate(`/Home`)}
                  >
                    <MdSettings sx={{ mr: 0.5 }} fontSize="inherit" />
                    Configuración
                  </Link>
                  <Link
                    className="text-foreground"
                    underline="hover"
                    sx={{ display: "flex", alignItems: "center" }}
                    color="foreground"
                    href="#"
                    onClick={() => navigate(`/Home`)}
                  >
                    <MdPeopleAlt sx={{ mr: 0.5 }} fontSize="inherit" />
                    Usuarios
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
                          Imagen de perfil
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
                          style={{
                            display: "none",
                            borderColor: selectedImage ? "" : "red",
                          }}
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
                          id="button-file"
                        >
                          Agregar foto de perfil
                        </Button>
                      </div>
                      <div>
                        <div>
                          <CheckboxGroup
                            label="Sucursales"
                            defaultValue={["buenos-aires", "london"]}
                          >
                            <Checkbox value="buenos-aires">
                              Buenos Aires
                            </Checkbox>
                            <Checkbox value="sydney">Sydney</Checkbox>
                            <Checkbox value="san-francisco">
                              San Francisco
                            </Checkbox>
                          </CheckboxGroup>
                        </div>
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
                            <Tab key="photos" title="Información Personal">
                              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-12 space-x-4 space-y-4 content-end">
                                <Spacer y={6} />
                                <div className="md:col-span-6"></div>
                                <div className="md:col-span-6">
                                  <Input
                                    id="nombre"
                                    isDisabled={status ? true : false}
                                    value={user.nombre}
                                    onValueChange={handleChange}
                                    size={"sm"}
                                    type="text"
                                    label="Nombre (s)"
                                    name="nombre"
                                    labelPlacement="outside"
                                    placeholder=" "
                                    variant="faded"
                                    error={validationErrors.nombre !== ""}
                                    errorMessage={validationErrors.nombre}
                                  />
                                </div>
                                <div className="md:col-span-6">
                                  <Input
                                    size={"sm"}
                                    type="text"
                                    label="Apellido (s)"
                                    id="apellido"
                                    isDisabled={status ? true : false}
                                    name="apellido"
                                    value={user.apellido}
                                    onChange={handleChange}
                                    labelPlacement="outside"
                                    placeholder=" "
                                    variant="faded"
                                    error={validationErrors.apellido !== ""}
                                    errorMessage={validationErrors.apellido}
                                  />
                                </div>

                                <div className="md:col-span-6">
                                  <Input
                                    id="email"
                                    value={user.email}
                                    isDisabled={status ? true : false}
                                    onChange={handleChange}
                                    size={"sm"}
                                    type="email"
                                    label="Email"
                                    name="email"
                                    labelPlacement="outside"
                                    placeholder=" "
                                    variant="faded"
                                    color={
                                      validationState === "invalid"
                                        ? "danger"
                                        : "default"
                                    }
                                    errorMessage={
                                      validationState === "invalid" &&
                                      "Ingresa un correo valido"
                                    }
                                  />
                                </div>
                                <div className="md:col-span-6">
                                  <Input
                                    id="emailConfirm"
                                    isDisabled={status ? true : false}
                                    value={user.emailConfirm}
                                    onChange={handleChange}
                                    size={"sm"}
                                    type="email"
                                    label="Confirmar email"
                                    name="emailConfirm" // Asegúrate de que el nombre coincida con el campo de Email
                                    labelPlacement="outside"
                                    placeholder=" "
                                    variant="faded"
                                    color={
                                      emailConfirmValidationState === "invalid"
                                        ? "danger"
                                        : "default"
                                    }
                                    errorMessage={
                                      emailConfirmValidationState ===
                                        "invalid" &&
                                      "El correo de confirmación debe coincidir con el correo"
                                    }
                                    validationState={
                                      emailConfirmValidationState
                                    }
                                  />
                                </div>

                                <div className="md:col-span-6">
                                  <Input
                                    id="password"
                                    isDisabled={status ? true : false}
                                    value={user.password}
                                    onChange={handleChange}
                                    size={"sm"}
                                    type="password"
                                    label="Password"
                                    name="password"
                                    labelPlacement="outside"
                                    placeholder=" "
                                    variant="faded"
                                    color={
                                      passwordValidationState === "invalid"
                                        ? "danger"
                                        : "default"
                                    }
                                    errorMessage={
                                      passwordValidationState === "invalid" &&
                                      "La contraseña debe tener al menos 8 caracteres"
                                    }
                                    validationState={passwordValidationState}
                                  />
                                </div>

                                <div className="md:col-span-6">
                                  <Input
                                    id="confirmPassword"
                                    isDisabled={status ? true : false}
                                    value={user.confirmPassword}
                                    onChange={handleChange}
                                    size={"sm"}
                                    type="password"
                                    label="Confirmar Password"
                                    name="confirmPassword" // Asegúrate de que el nombre coincida con el campo de Contraseña
                                    labelPlacement="outside"
                                    placeholder=" "
                                    variant="faded"
                                    color={
                                      confirmPasswordValidationState ===
                                      "invalid"
                                        ? "danger"
                                        : "default"
                                    }
                                    errorMessage={
                                      confirmPasswordValidationState ===
                                        "invalid" &&
                                      "La contraseña de confirmación debe coincidir con la contraseña"
                                    }
                                    validationState={
                                      confirmPasswordValidationState
                                    }
                                  />
                                </div>
                                <div className="md:col-span-6">
                                  <Input
                                    id="perfilSeguridad"
                                    isDisabled={status ? true : false}
                                    value={user.perfilSeguridad}
                                    onChange={handleChange}
                                    size={"sm"}
                                    type="perfilSeguridad"
                                    label="Perfil de seguridad"
                                    name="perfilSeguridad"
                                    labelPlacement="outside"
                                    placeholder=" "
                                    variant="faded"
                                    error={
                                      validationErrors.perfilSeguridad !== ""
                                    }
                                    errorMessage={
                                      validationErrors.perfilSeguridad
                                    }
                                  />
                                </div>
                                <div className="md:col-span-6">
                                  <Input
                                    id="vendedor"
                                    isDisabled={status ? true : false}
                                    value={user.vendedor}
                                    onChange={handleChange}
                                    size={"sm"}
                                    type="vendedor"
                                    label="Vendedor"
                                    name="vendedor"
                                    labelPlacement="outside"
                                    placeholder=" "
                                    variant="faded"
                                    error={validationErrors.vendedor !== ""}
                                    errorMessage={validationErrors.vendedor}
                                  />
                                </div>
                              </div>
                            </Tab>
                            <Tab key="music" title="Datos adicionales">
                              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-12 space-x-4 space-y-4 content-end">
                                <Spacer y={6} />
                                <div className="md:col-span-6"></div>
                                <div className="md:col-span-12">
                                  <Input
                                    id="direccion"
                                    isDisabled={status ? true : false}
                                    value={user.direccion}
                                    onChange={handleChange}
                                    size={"sm"}
                                    type="direccion"
                                    label="Dirección"
                                    name="direccion"
                                    labelPlacement="outside"
                                    placeholder=" "
                                    variant="faded"
                                    error={validationErrors.direccion !== ""}
                                    errorMessage={validationErrors.direccion}
                                  />
                                </div>
                                <div className="md:col-span-6">
                                  <Input
                                    size={"sm"}
                                    type="colonia"
                                    label="Colonia"
                                    id="colonia"
                                    isDisabled={status ? true : false}
                                    name="colonia"
                                    value={user.colonia}
                                    onChange={handleChange}
                                    labelPlacement="outside"
                                    placeholder=" "
                                    variant="faded"
                                    error={validationErrors.colonia !== ""}
                                    errorMessage={validationErrors.colonia}
                                  />
                                </div>

                                <div className="md:col-span-6">
                                  <label htmlFor="status">Status</label>
                                  <Select
                                    id="status"
                                    isDisabled={status ? true : false}
                                    value={user.status}
                                    onChange={handleChange}
                                    size="small"
                                    label=" "
                                    name="status"
                                    variant="outlined"
                                    fullWidth
                                    error={validationErrors.status !== ""}
                                    errorMessage={validationErrors.status}
                                  >
                                    <MenuItem value="activo">Activo</MenuItem>
                                    <MenuItem value="inactivo">
                                      Inactivo
                                    </MenuItem>
                                  </Select>
                                </div>

                                <div className="md:col-span-5">
                                  <Input
                                    id="ciudad"
                                    isDisabled={status ? true : false}
                                    value={user.ciudad}
                                    onChange={handleChange}
                                    size="small"
                                    type="ciudad"
                                    label="Ciudad"
                                    name="ciudad"
                                    labelPlacement="outside"
                                    placeholder=" "
                                    variant="faded"
                                    error={validationErrors.ciudad !== ""}
                                    errorMessage={validationErrors.ciudad}
                                  />
                                </div>

                                <div className="md:col-span-4">
                                  <label htmlFor="estado">Estado</label>
                                  <Select
                                    id="estado"
                                    isDisabled={status ? true : false}
                                    value={user.estado}
                                    onChange={handleChange}
                                    size="small"
                                    label=" "
                                    name="estado"
                                    variant="outlined"
                                    error={validationErrors.estado !== ""}
                                    errorMessage={validationErrors.estado}
                                  >
                                    {estadosDeMexico.map((estado) => (
                                      <MenuItem key={estado} value={estado}>
                                        {estado}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </div>

                                <div className="md:col-span-3">
                                  <Input
                                    id="codigoPostal"
                                    isDisabled={status ? true : false}
                                    value={user.codigoPostal}
                                    onChange={handleChange}
                                    size={"sm"}
                                    type="codigoPostal"
                                    label="Código Postal"
                                    name="codigoPostal"
                                    labelPlacement="outside"
                                    placeholder=" "
                                    variant="faded"
                                    error={validationErrors.codigoPostal !== ""}
                                    errorMessage={validationErrors.codigoPostal}
                                  />
                                </div>
                                <div className="md:col-span-6">
                                  <Input
                                    id="telefonoContacto"
                                    isDisabled={status ? true : false}
                                    value={user.telefonoContacto}
                                    onChange={handleChange}
                                    size={"sm"}
                                    label="Teléfono de contacto"
                                    name="telefonoContacto"
                                    labelPlacement="outside"
                                    placeholder=" "
                                    variant="faded"
                                    error={
                                      validationErrors.telefonoContacto !== ""
                                    }
                                    errorMessage={
                                      validationErrors.telefonoContacto
                                    }
                                  />
                                </div>
                                <div className="md:col-span-6">
                                  <Input
                                    id="telefonoCelular"
                                    isDisabled={status ? true : false}
                                    value={user.telefonoCelular}
                                    onChange={handleChange}
                                    size={"sm"}
                                    type="text"
                                    label="Teléfono Celular"
                                    name="telefonoCelular"
                                    labelPlacement="outside"
                                    placeholder=" "
                                    variant="faded"
                                    error={
                                      validationErrors.telefonoCelular !== ""
                                    }
                                    errorMessage={
                                      validationErrors.telefonoCelular
                                    }
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
  );
};

export default User;
