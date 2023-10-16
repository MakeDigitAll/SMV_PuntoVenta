import { Button, Input, Link, Spacer, Textarea } from "@nextui-org/react";
import { useMemo, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Breadcrumbs, Typography } from "@mui/material";
import {
  RiArrowLeftLine,
  RiArrowRightLine,
  RiDashboard2Fill,
} from "react-icons/ri";
import { MdPeopleAlt, MdPerson, MdSettings } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import ItemsHeader from "../../components/header/ItemsHeader/ItemsHeader.jsx";

import { MdSave } from "react-icons/md";
import http from "../../components/axios/Axios";
const Provider = () => {
  const [status, useStatus] = useState(false);
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
  async function handleSubmit(e) {
    e.preventDefault();
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
      toast.error("Favor de llenar todos los campos correctamente", {
        theme: "colored",
      });
    }
    user.password !== user.confirmPassword || user.email !== user.emailConfirm
      ? toast.error("Las contraseñas o correos no coinciden", {
          theme: "colored",
        })
      : "";
    const errors = {};
    !user.nombre ? (errors.nombre = "Favor de llenar este campo") : "";
    !user.apellido ? (errors.apellido = "Favor de llenar este campo") : "";
    !user.perfilSeguridad ? (errors.perfilSeguridad = "Favor de llenar este campo") : "";
    !user.vendedor ? (errors.vendedor = "Favor de llenar este campo") : "";
    !user.direccion ? (errors.direccion = "Favor de llenar este campo") : "";
    !user.colonia ? (errors.colonia = "Favor de llenar este campo") : "";
    !user.status ? (errors.status = "Favor de llenar este campo") : "";
    !user.ciudad ? (errors.ciudad = "Favor de llenar este campo") : "";
    !user.estado ? (errors.estado = "Favor de llenar este campo") : "";
    !user.codigoPostal ? (errors.codigoPostal = "Favor de llenar este campo") : "";
    !user.telefonoCelular ? (errors.telefonoCelular = "Favor de llenar este campo") : "";
    !user.telefonoContacto
      ? (errors.telefonoContacto = "Favor de llenar este campo")
      : "";
    !user.email ? (errors.email = "Favor de llenar este campo") : "";
    !user.password ? (errors.password = "Favor de llenar este campo") : "";
    !user.imagen ? (errors.imagen = "Favor de llenar este campo") : "";
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
    try {
      const result = await http.post(
        `https://localhost:443/api/createuser`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      
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
          `https://localhost:443/api/createUserData`,
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
                    onClick={() => navigate(`/Providers`)}
                  >
                    <MdPeopleAlt sx={{ mr: 0.5 }} fontSize="inherit" />
                    Proveedores
                  </Link>
                  <Typography
                    sx={{ display: "flex", alignItems: "center" }}
                    className="text-foreground"
                  >
                    <MdPerson sx={{ mr: 0.5 }} fontSize="inherit" />
                    Nuevo Proveedor
                  </Typography>
                </Breadcrumbs>
              </div>
              <form onChange={handleChange} onSubmit={handleSubmit}>
                <Spacer y={6} />
                <div className="bg-card rounded shadow-2xl px-4 md:p-8 mb-6">
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-1">
                    <div className="lg:col-span-2">
                      <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-12 space-x-4 space-y-4 content-end">
                        <div className="md:col-span-12">
                          <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-12 space-x-4 space-y-4 content-end">
                            <Spacer y={6} />
                            <div className="md:col-span-6"></div>
                            <div className="md:col-span-12">
                              <Input
                                id="nombre"
                                isDisabled={status ? true : false}
                                value={user.nombre}
                                onValueChange={handleChange}
                                size={"sm"}
                                type="text"
                                label="Nombre del Proveedor - Marca(*)"
                                name="nombre"
                                labelPlacement="outside"
                                placeholder=" "
                                variant="faded"
                                error={validationErrors.nombre !== ""}
                                errorMessage={validationErrors.nombre}
                              />
                            </div>
                            <div className="md:col-span-12">
                              <Input
                                size={"sm"}
                                type="text"
                                label="Razón Social (*)"
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
                            <div className="md:col-span-5">
                              <Input
                                id="password"
                                isDisabled={status ? true : false}
                                value={user.password}
                                onChange={handleChange}
                                size={"sm"}
                                type="text"
                                label="Descuento de Compras"
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
                              />
                            </div>
                            <div className="md:col-span-6"></div>
                            <div className="md:col-span-12">
                              <Input
                                id="confirmPassword"
                                isDisabled={status ? true : false}
                                value={user.confirmPassword}
                                onChange={handleChange}
                                size={"sm"}
                                type="password"
                                label="Dirección"
                                name="confirmPassword"
                                labelPlacement="outside"
                                placeholder=" "
                                variant="faded"
                                color={
                                  confirmPasswordValidationState === "invalid"
                                    ? "danger"
                                    : "default"
                                }
                                errorMessage={
                                  confirmPasswordValidationState ===
                                    "invalid" &&
                                  "La contraseña de confirmación debe coincidir con la contraseña"
                                }
                                validationState={confirmPasswordValidationState}
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
                                label="Colonía"
                                name="perfilSeguridad"
                                labelPlacement="outside"
                                placeholder=" "
                                variant="faded"
                                error={validationErrors.perfilSeguridad !== ""}
                                errorMessage={validationErrors.perfilSeguridad}
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
                                label="R.F.C."
                                name="vendedor"
                                labelPlacement="outside"
                                placeholder=" "
                                variant="faded"
                                error={validationErrors.vendedor !== ""}
                                errorMessage={validationErrors.vendedor}
                              />
                            </div>
                            <div className="md:col-span-3">
                              <Input
                                id="vendedor"
                                isDisabled={status ? true : false}
                                value={user.vendedor}
                                onChange={handleChange}
                                size={"sm"}
                                type="vendedor"
                                label="Ciudad"
                                name="vendedor"
                                labelPlacement="outside"
                                placeholder=" "
                                variant="faded"
                                error={validationErrors.vendedor !== ""}
                                errorMessage={validationErrors.vendedor}
                              />
                            </div>
                            <div className="md:col-span-3">
                              <Input
                                id="vendedor"
                                isDisabled={status ? true : false}
                                value={user.vendedor}
                                onChange={handleChange}
                                size={"sm"}
                                type="vendedor"
                                label="Estado"
                                name="vendedor"
                                labelPlacement="outside"
                                placeholder=" "
                                variant="faded"
                                error={validationErrors.vendedor !== ""}
                                errorMessage={validationErrors.vendedor}
                              />
                            </div>
                            <div className="md:col-span-3">
                              <Input
                                id="vendedor"
                                isDisabled={status ? true : false}
                                value={user.vendedor}
                                onChange={handleChange}
                                size={"sm"}
                                type="vendedor"
                                label="CP"
                                name="vendedor"
                                labelPlacement="outside"
                                placeholder=" "
                                variant="faded"
                                error={validationErrors.vendedor !== ""}
                                errorMessage={validationErrors.vendedor}
                              />
                            </div>
                            <div className="md:col-span-3">
                              <Input
                                id="vendedor"
                                isDisabled={status ? true : false}
                                value={user.vendedor}
                                onChange={handleChange}
                                size={"sm"}
                                type="vendedor"
                                label="País"
                                name="vendedor"
                                labelPlacement="outside"
                                placeholder=" "
                                variant="faded"
                                error={validationErrors.vendedor !== ""}
                                errorMessage={validationErrors.vendedor}
                              />
                            </div>

                            <div className="md:col-span-4">
                              <Input
                                id="vendedor"
                                isDisabled={status ? true : false}
                                value={user.vendedor}
                                onChange={handleChange}
                                size={"sm"}
                                type="vendedor"
                                label="Contacto"
                                name="vendedor"
                                labelPlacement="outside"
                                placeholder=" "
                                variant="faded"
                                error={validationErrors.vendedor !== ""}
                                errorMessage={validationErrors.vendedor}
                              />
                            </div>
                            <div className="md:col-span-3">
                              <Input
                                id="vendedor"
                                isDisabled={status ? true : false}
                                value={user.vendedor}
                                onChange={handleChange}
                                size={"sm"}
                                type="vendedor"
                                label="Telefono"
                                name="vendedor"
                                labelPlacement="outside"
                                placeholder=" "
                                variant="faded"
                                error={validationErrors.vendedor !== ""}
                                errorMessage={validationErrors.vendedor}
                              />
                            </div>
                            <div className="md:col-span-5"></div>
                            <div className="md:col-span-4">
                              <Input
                                id="vendedor"
                                isDisabled={status ? true : false}
                                value={user.vendedor}
                                onChange={handleChange}
                                size={"sm"}
                                type="vendedor"
                                label="Correo Electrónico #1"
                                name="vendedor"
                                labelPlacement="outside"
                                placeholder=" "
                                variant="faded"
                                error={validationErrors.vendedor !== ""}
                                errorMessage={validationErrors.vendedor}
                              />
                            </div>
                            <div className="md:col-span-4">
                              <Input
                                id="vendedor"
                                isDisabled={status ? true : false}
                                value={user.vendedor}
                                onChange={handleChange}
                                size={"sm"}
                                type="vendedor"
                                label="Correo Electrónico #2"
                                name="vendedor"
                                labelPlacement="outside"
                                placeholder=" "
                                variant="faded"
                                error={validationErrors.vendedor !== ""}
                                errorMessage={validationErrors.vendedor}
                              />
                            </div>
                            <div className="md:col-span-4">
                              <Input
                                id="vendedor"
                                isDisabled={status ? true : false}
                                value={user.vendedor}
                                onChange={handleChange}
                                size={"sm"}
                                type="vendedor"
                                label="Correo Electrónico #3"
                                name="vendedor"
                                labelPlacement="outside"
                                placeholder=" "
                                variant="faded"
                                error={validationErrors.vendedor !== ""}
                                errorMessage={validationErrors.vendedor}
                              />
                            </div>
                            <div className="md:col-span-12">
                              <Textarea
                                id="vendedor"
                                isDisabled={status ? true : false}
                                value={user.vendedor}
                                onChange={handleChange}
                                size={"sm"}
                                type="vendedor"
                                label="Observaciones"
                                name="vendedor"
                                labelPlacement="outside"
                                placeholder=" "
                                variant="faded"
                                error={validationErrors.vendedor !== ""}
                                errorMessage={validationErrors.vendedor}
                              />
                            </div>
                          </div>
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

export default Provider;
