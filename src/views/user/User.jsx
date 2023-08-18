import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Image,
  Input,
  Link,
} from "@nextui-org/react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../components/header/headerC/Header.jsx";
import ProfileImageUpload from "../user/ProfilesImagenUploads.tsx";
import { Breadcrumbs, Typography } from "@mui/material";
import { RiDashboard2Fill } from "react-icons/ri";
import { MdCheck, MdPeopleAlt, MdPerson, MdSettings } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import ItemsHeader from "../../components/header/ItemsHeader/ItemsHeader.jsx";

import { Breadcrumbs, Typography } from "@mui/material";
import { RiDashboard2Fill } from "react-icons/ri";
import { MdPeopleAlt, MdPerson, MdSettings } from "react-icons/md";
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
    try {
      const response = await fetch(`http://localhost:4000/api/createuser`, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        formData,
        body: JSON.stringify({
          nombre: user.nombre,
          apellido: user.apellido,
          email: user.email,
          password: user.password,
        }),
      });
      if (response.ok) {
        const json = await response.json();
        toast.success(json.body.message, { theme: "colored" });
      } else {
        const json = await response.json();
        toast.error(json.body.error);
      }
    } catch (error) {
      toast.warning(error.message);
    }
  }
  function handleClickBreadCrumbs(event) {
    event.preventDefault();
  }
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <ItemsHeader />
      <div
        style={{ marginLeft: "50px", marginTop: "40px", marginRight: "20px" }}
      >
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
      <main
        className="flex flex-col items-center w-full h-screen"
        style={{ marginTop: "50px" }}
      >
        <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none bg-gray-800 min-w-full">
          <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
            <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
              <div className="mx-auto max-w-xs px-8">
                {imageDefault ? (
                  <Image
                    isZoomed
                    src="../../../public/Blank-Avatar.png"
                    alt=""
                    width={100}
                    height={100}
                  />
                ) : (
                  <Image
                    isZoomed
                    src={URL.createObjectURL(
                      new Blob([selectedImage], { type: "image" })
                    )}
                    alt=""
                    width={100}
                    height={100}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="p-12 sm:p-10 lg:flex-auto space space-y-4">            
            <div className=" w-96">
              <Input
                id="email"
                value={user.email}
                onChange={handleChange}
                size={"sm"}
                type="email"
                label="Email"
                name="email"
              />
            </div>
            <div>
              <Input
                id="password"
                value={user.password}
                onChange={handleChange}
                size={"sm"}
                type="password"
                label="password"
                name="password"
              />
            </div>
            <Input
              id="nombre"
              value={user.nombre}
              onChange={handleChange}
              size={"sm"}
              type="text"
              label="Nombre"
              name="nombre"
            />
            <Input
              size={"sm"}
              type="text"
              label="Apellido"
              id="apellido"
              name="apellido"
              value={user.apellido}
              onChange={handleChange}
            />
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
            <a
              href="#"
              className="mt-10 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Guardar
            </a>
          </div>
        </div>

        <div
          role="presentation"
          onClick={handleClickBreadCrumbs}
          className="text-foreground"
        ></div>
        <div style={{ marginBottom: "50px" }}></div>
        <div
          style={{
            display: "flex",
            placeItems: "center",
            backgroundColor: "black",
          }}
        >
          <div
            className="w-full grid flex-col gap-4"
            style={{ display: "grid", placeItems: "center" }}
          >
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
            <div className="md:grid-nowrap mb-6 md:mb-0 gap-4">
              <form onChange={handleChange} onSubmit={handleSubmit}></form>
              <ProfileImageUpload />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default User;
