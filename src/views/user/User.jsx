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
                                    value={user.nombre}
                                    onValueChange={handleChange}
                                    size={"sm"}
                                    type="text"
                                    label="Nombre (s)"
                                    name="nombre"
                                    labelPlacement="outside"
                                    placeholder=" "
                                    variant="faded"
                                  />
                                </div>
                                <div className="md:col-span-6">
                                  <Input
                                    size={"sm"}
                                    type="text"
                                    label="Apellido (s)"
                                    id="apellido"
                                    name="apellido"
                                    value={user.apellido}
                                    onChange={handleChange}
                                    labelPlacement="outside"
                                    placeholder=" "
                                    variant="faded"
                                  />
                                </div>

                                <div className="md:col-span-6">
                                  <Input
                                    id="email"
                                    value={user.email}
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
                                    validationState={validationState}
                                  />
                                </div>
                                <div className="md:col-span-6">
                                  <Input
                                    id="emailConfirm"
                                    value={user.emailConfirm}
                                    onChange={handleChange}
                                    size={"sm"}
                                    type="email"
                                    label="Confirmar email"
                                    name="emailConfirm"
                                    labelPlacement="outside"
                                    placeholder=" "
                                    variant="faded"
                                  />
                                </div>

                                <div className="md:col-span-6">
                                  <Input
                                    id="password"
                                    value={user.password}
                                    onChange={handleChange}
                                    size={"sm"}
                                    type="password"
                                    label="Password"
                                    name="password"
                                    labelPlacement="outside"
                                    placeholder=" "
                                    variant="faded"
                                  />
                                </div>

                                <div className="md:col-span-6">
                                  <Input
                                    id="password"
                                    value={user.password}
                                    onChange={handleChange}
                                    size={"sm"}
                                    type="password"
                                    label="Confirmar Password"
                                    name="password"
                                    labelPlacement="outside"
                                    placeholder=" "
                                    variant="faded"
                                  />
                                </div>
                                <div className="md:col-span-6">
                                  <Input
                                    id="password"
                                    value={user.password}
                                    onChange={handleChange}
                                    size={"sm"}
                                    type="password"
                                    label="Perfil de seguridad"
                                    name="password"
                                    labelPlacement="outside"
                                    placeholder=" "
                                    variant="faded"
                                  />
                                </div>
                                <div className="md:col-span-6">
                                  <Input
                                    id="password"
                                    value={user.password}
                                    onChange={handleChange}
                                    size={"sm"}
                                    type="password"
                                    label="Vendedor"
                                    name="password"
                                    labelPlacement="outside"
                                    placeholder=" "
                                    variant="faded"
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
                                    value={user.nombre}
                                    onChange={handleChange}
                                    size={"sm"}
                                    type="text"
                                    label="Dirección"
                                    name="direccion"
                                    labelPlacement="outside"
                                    placeholder=" "
                                    variant="faded"
                                  />
                                </div>
                                <div className="md:col-span-6">
                                  <Input
                                    size={"sm"}
                                    type="text"
                                    label="Colonia"
                                    id="apellido"
                                    name="apellido"
                                    value={user.apellido}
                                    onChange={handleChange}
                                    labelPlacement="outside"
                                    placeholder=" "
                                    variant="faded"
                                  />
                                </div>

                                <div className="md:col-span-6">
                                  <Input
                                    id="estado"
                                    value={user.email}
                                    onChange={handleChange}
                                    size={"sm"}
                                    type="estado"
                                    label="Estado"
                                    name="estado"
                                    labelPlacement="outside"
                                    placeholder=" "
                                    variant="faded"
                                  />
                                </div>
                                <div className="md:col-span-5">
                                  <Input
                                    id="ciudad"
                                    value={user.email}
                                    onChange={handleChange}
                                    size={"sm"}
                                    type="ciudad"
                                    label="Ciudad"
                                    name="ciudad"
                                    labelPlacement="outside"
                                    placeholder=" "
                                    variant="faded"
                                  />
                                </div>

                                <div className="md:col-span-4">
                                  <Input
                                    id="estado"
                                    value={user.password}
                                    onChange={handleChange}
                                    size={"sm"}
                                    type="estado"
                                    label="Estado"
                                    name="estado"
                                    labelPlacement="outside"
                                    placeholder=" "
                                    variant="faded"
                                  />
                                </div>

                                <div className="md:col-span-3">
                                  <Input
                                    id="cp"
                                    value={user.password}
                                    onChange={handleChange}
                                    size={"sm"}
                                    type="cp"
                                    label="Código Postal"
                                    name="cp"
                                    labelPlacement="outside"
                                    placeholder=" "
                                    variant="faded"
                                  />
                                </div>
                                <div className="md:col-span-6">
                                  <Input
                                    id="telefonoContact"
                                    value={user.password}
                                    onChange={handleChange}
                                    size={"sm"}
                                    label="Teléfono de contacto"
                                    name="telefonoContact"
                                    labelPlacement="outside"
                                    placeholder=" "
                                    variant="faded"
                                  />
                                </div>
                                <div className="md:col-span-6">
                                  <Input
                                    id="celular"
                                    value={user.password}
                                    onChange={handleChange}
                                    size={"sm"}
                                    type="text"
                                    label="Teléfono Celular"
                                    name="celular"
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

export default User;
