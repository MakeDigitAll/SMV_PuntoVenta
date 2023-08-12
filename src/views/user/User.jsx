import { Button, Image, Input } from "@nextui-org/react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../components/header/headerC/Header.jsx";

const User = () => {
  const [selectedImage, setSelectedImage] = useState("");
  const imageDefault = selectedImage === null;
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
    formData.append('image', selectedImage);
    try {
      const response = await fetch(`http://localhost:4000/api/createuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: user.nombre,
          apellido: user.apellido,
          email: user.email,
          password: user.password,
          image: formData,
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

  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-center w-full h-screen">
        <div style={{ marginBottom: "50px" }}>
          <h1 className="text-center text-2xl font-bold">Registro</h1>
        </div>
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
              <form onChange={handleChange} onSubmit={handleSubmit}>
                <Input
                  id="email"
                  value={user.email}
                  onChange={handleChange}
                  size={"sm"}
                  type="email"
                  label="Email"
                  name="email"
                />
                <Input
                  id="password"
                  value={user.password}
                  onChange={handleChange}
                  size={"sm"}
                  type="password"
                  label="password"
                  name="password"
                />
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
                <Button type="submit">Guardar</Button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default User;
