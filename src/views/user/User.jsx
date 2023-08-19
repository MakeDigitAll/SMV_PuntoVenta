import {
  Button,
  Image,
  Input,
  Link,
  Spacer,
  Tab,
  Tabs,
} from "@nextui-org/react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../components/header/headerC/Header.jsx";

import { Breadcrumbs, Typography } from "@mui/material";
import { RiDashboard2Fill } from "react-icons/ri";
import { MdPeopleAlt, MdPerson, MdSave, MdSettings } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import ItemsHeader from "../../components/header/ItemsHeader/ItemsHeader.jsx";
import http from "../../components/axios/Axios";
const User = () => {
  const [selectedImage, setSelectedImage] = useState("");
  const imageDefault = selectedImage === "";
  const [user, setUser] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", selectedImage);
    formData.append(
      "document",
      JSON.stringify({
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email,
        password: user.password,
      })
    );
    try {
      await http
        .post(`/api/createuser`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          navigate("/Settings/Users")
          toast.success(response.data.body.message, { theme: "colored" });
        })
        .catch((error) => {
          toast.error(error.response.data.body.error, { theme: "colored" });
        });
    } catch (error) {
      toast.warning(error.message);
    }
  }
  const navigate = useNavigate();
  const [selected, setSelected] = useState("photos");
  return (
    <>
      <Header />
      <ItemsHeader />
      <ToastContainer />
      <main className="flex flex-col w-full h-screen">
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
              <Spacer y={6} />
              {/* <div className="bg-white rounded shadow-2xl px-4 md:p-8 mb-6"></div> */}
              <div className="bg-[#18181b] rounded shadow-2xl px-4 md:p-8 mb-6">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                  <div className="text-gray-600 place-items-center grid lg:grid-cols-1">
                    <h2 className="font-large text-lg text-foreground">
                      Imagen de perfil
                    </h2>
                    <div className="content-center">
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
                      <Input
                        size={"sm"}
                        type="file"
                        id="imagen"
                        value={user.imagen}
                        onChange={(event) => {
                          setSelectedImage(event.target.files[0]);
                        }}
                        name="imagen"
                      />
                    </div>
                  </div>

                  <div className="lg:col-span-2">
                    <form onChange={handleChange} onSubmit={handleSubmit}>
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
                                    onChange={handleChange}
                                    size={"sm"}
                                    type="text"
                                    label="Nombre"
                                    name="nombre"
                                    labelPlacement="outside"
                                    placeholder=" "
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
                                  />
                                </div>
                                <div className="md:col-span-6">
                                  <Input
                                    id="email"
                                    value={user.email}
                                    onChange={handleChange}
                                    size={"sm"}
                                    type="email"
                                    label="Confirmar email"
                                    name="email"
                                    labelPlacement="outside"
                                    placeholder=" "
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
                                  />
                                </div>
                              </div>
                            </Tab>
                            <Tab key="music" title="Test" />
                            <Tab key="videos" title="Test" />
                          </Tabs>
                        </div>
                        <Spacer y={10} />
                        <div className="md:col-span-12 text-right content-end">
                          <div className="inline-flex">
                            <Button
                              className="min-w-[200px]"
                              color="primary"
                              type="submit"
                              endContent={<MdSave />}
                            >
                              Guardar
                            </Button>
                          </div>
                          <Spacer y={3} />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default User;
