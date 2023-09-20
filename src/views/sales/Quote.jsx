import {
  Button,
  Input,
  Link,
  Spacer,
  Tab,
  Tabs,
  Checkbox,
  Select,
  Textarea,
  TableHeader,
  TableColumn,
  TableRow,
  TableBody,
  Table,
  TableCell,
  ModalContent,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  SelectItem,
} from "@nextui-org/react";
import { useMemo, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//import ProfileImageUpload from "../user/ProfilesImagenUploads.tsx";
import { Breadcrumbs, Typography } from "@mui/material";
import {
  RiArrowLeftLine,
  RiArrowRightLine,
  RiDashboard2Fill,
} from "react-icons/ri";
import {
  MdDiscount,
  MdPeopleAlt,
  MdPercent,
  MdPerson,
  MdSearch,
  MdSettings,
  MdUpload,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import ItemsHeader from "../../components/header/ItemsHeader/ItemsHeader.jsx";

import { MdSave } from "react-icons/md";
import http from "../../components/axios/Axios";
const Quote = () => {
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
    dateQuote: Date().toString().split("T")[0],
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
    } catch (error) {}
  }
  const validateEmail = (value) =>
    value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
  const validationState = useMemo(() => {
    if (user.email === "") return undefined;

    return validateEmail(user.email) ? "valid" : "invalid";
  }, [user.email]);
  const navigate = useNavigate();
  const [selected, setSelected] = useState("photos");
  const envios = ["No Aplica", "Recoger en Oficina", "Envío a domicilio"];

  const passwordValidationState = useMemo(() => {
    if (user.password === "") return undefined;
    return user.password.length >= 8 ? "valid" : "invalid";
  }, [user.password]);
  const confirmPasswordValidationState = useMemo(() => {
    if (user.confirmPassword === "") return undefined;
    return user.password === user.confirmPassword ? "valid" : "invalid";
  }, [user.confirmPassword]);
  const emailConfirmValidationState = useMemo(() => {
    if (user.emailConfirm === "") return undefined;
    return user.emailConfirm === user.email ? "valid" : "invalid";
  }, [user.emailConfirm, user.email]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenDiscount,
    onOpen: onOpenDiscount,
    onClose: onCloseDiscount,
  } = useDisclosure();

  const handleOpenAddProduct = () => {
    onOpen();
  };

  const handleOpenAddDiscount = () => {
    onOpenDiscount();
  };

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
                    Ventas
                  </Link>
                  <Link
                    className="text-foreground"
                    underline="hover"
                    sx={{ display: "flex", alignItems: "center" }}
                    color="foreground"
                    href="#"
                    onClick={() => navigate(`/Sales/Quotes`)}
                  >
                    <MdPeopleAlt sx={{ mr: 0.5 }} fontSize="inherit" />
                    Cotizaciones
                  </Link>
                  <Typography
                    sx={{ display: "flex", alignItems: "center" }}
                    className="text-foreground"
                  >
                    <MdPerson sx={{ mr: 0.5 }} fontSize="inherit" />
                    Nueva cotización
                  </Typography>
                </Breadcrumbs>
              </div>
              <form onChange={handleChange} onSubmit={handleSubmit}>
                <Spacer y={6} />
                <div className="bg-card rounded shadow-2xl px-4 md:p-8 mb-6">
                  <div className="grid gap-4 gap-y-2 text-xs grid-cols-1 lg:grid-cols-4">
                    <div className="lg:col-span-2">
                      <div className="grid gap-2 gap-y-2 text-sm grid-cols-1 md:grid-cols-12 space-x-4 space-y-4 content-end">
                        <div className="md:col-span-12">
                          <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-12 space-x-4 space-y-4 content-end">
                            <Spacer y={6} />
                            <div className="md:col-span-6"></div>
                            <div className="md:col-span-12">
                              <Input
                                id="nombre"
                                value={user.nombre}
                                onValueChange={handleChange}
                                size="sm"
                                isRequired
                                type="text"
                                label="Cliente"
                                name="nombre"
                                labelPlacement="outside"
                                placeholder=" "
                                variant="faded"
                                error={validationErrors.nombre !== ""}
                                errorMessage={validationErrors.nombre}
                                endContent={
                                  <MdSearch className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
                                }
                              />
                            </div>
                            <div className="md:col-span-8">
                              <Input
                                size={"sm"}
                                type="text"
                                label="Vendedor"
                                id="apellido"
                                isRequired
                                name="apellido"
                                value={user.apellido}
                                onChange={handleChange}
                                labelPlacement="outside"
                                placeholder=" "
                                variant="faded"
                                error={validationErrors.apellido !== ""}
                                errorMessage={validationErrors.apellido}
                                endContent={<MdSearch />}
                              />
                            </div>

                            <div className="md:col-span-4">
                              <Input
                                id="dateQuote"
                                isRequired
                                value={user.dateQuote}
                                onChange={handleChange}
                                size={"sm"}
                                isDisabled
                                type="date"
                                label="Fecha de la Cotización"
                                name="dateQuote"
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
                              <Checkbox isRequired>Es recurrente</Checkbox>
                            </div>
                          </div>
                        </div>
                        <Spacer y={10} />
                      </div>
                    </div>
                    <div className="lg:col-span-2">
                      <div className="grid gap-2 gap-y-2 text-sm grid-cols-1 md:grid-cols-12 space-x-4 space-y-4 content-end">
                        <div className="md:col-span-12">
                          <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-12 space-x-4 space-y-4 content-end">
                            <Spacer y={2} />
                            <div className="md:col-span-6"></div>
                            <div className="md:col-span-12">
                              <Select
                                isRequired
                                labelPlacement={"outside"}
                                label="Información del Cliente"
                                placeholder="Seleccione"
                                size="sm"
                              >
                                {/* {animals.map((animal) => (
                                  <SelectItem
                                    key={animal.value}
                                    value={animal.value}
                                  >
                                    {animal.label}
                                  </SelectItem>
                                ))} */}
                              </Select>
                            </div>
                            <div className="md:col-span-12">
                              <Textarea
                                isDisabled
                                label=" "
                                labelPlacement="inside"
                                placeholder=" "
                                defaultValue=" "
                              />
                            </div>
                            <div className="md:col-span-6">
                              <Select
                                labelPlacement={"outside"}
                                label="Envío"
                                placeholder="Seleccione"
                                size="sm"
                                isRequired
                              >
                                {envios.map((envios) => (
                                  <SelectItem key={envios} value={envios}>
                                    {envios}
                                  </SelectItem>
                                ))}
                              </Select>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="lg:col-span-2">
                      <div className="grid gap-2 gap-y-2 text-sm grid-cols-1 md:grid-cols-12 space-x-4 space-y-4 content-end">
                        <div className="md:col-span-12">
                          <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-12 space-x-4 space-y-4 content-end">
                            <Spacer y={2} />
                            <div className="md:col-span-6"></div>
                            <div className="md:col-span-12">
                              <Tabs
                                key={"key"}
                                variant="underlined"
                                aria-label="Tabs variants"
                              >
                                <Tab key="photos" title="Productos Cotizados">
                                  <Table
                                    removeWrapper
                                    aria-label="Example static collection table"
                                  >
                                    <TableHeader>
                                      <TableColumn>Imagen</TableColumn>
                                      <TableColumn>Código</TableColumn>
                                      <TableColumn>Nombre</TableColumn>
                                      <TableColumn>Marca</TableColumn>
                                      <TableColumn>Cantidad</TableColumn>
                                      <TableColumn>Inv.</TableColumn>
                                      <TableColumn>Precio Uni.</TableColumn>
                                      <TableColumn>Descuento</TableColumn>
                                      <TableColumn>Total</TableColumn>
                                    </TableHeader>
                                    <TableBody>
                                      {/* <TableRow key="1">
                                        <TableCell>Tony Reichert</TableCell>
                                        <TableCell>CEO</TableCell>
                                        <TableCell>Active</TableCell>
                                      </TableRow>                                       */}
                                    </TableBody>
                                  </Table>
                                </Tab>
                              </Tabs>
                            </div>
                            <div className="md:col-span-12 space-x-4">
                              <Button
                                startContent={<MdUpload />}
                                variant="flat"
                                color="primary"
                                onPress={() => handleOpenAddProduct()}
                                className="capitalize"
                              >
                                Agregar productos
                              </Button>
                              <Button
                                variant="flat"
                                color="success"
                                onPress={() => handleOpenAddDiscount()}
                                className="capitalize"
                                startContent={<MdDiscount />}
                              >
                                Aplicar descuento
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid gap-4 gap-y-2 text-xs grid-cols-1 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                      <div className="grid gap-2 gap-y-2 text-sm grid-cols-1 md:grid-cols-12 space-x-4 space-y-4 content-end">
                        <div className="md:col-span-12">
                          <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-12 space-x-4 space-y-4 content-end">
                            <Spacer y={6} />
                            <div className="md:col-span-6"></div>
                            <div className="md:col-span-12">
                              <Textarea
                                minRows={8}
                                label="Comentarios de la Cotización"
                                labelPlacement="outside"
                                placeholder=" "
                                defaultValue=" "
                              />
                            </div>
                          </div>
                        </div>
                        <Spacer y={10} />
                      </div>
                    </div>
                    <div className="lg:col-span-2">
                      <div className="grid gap-2 gap-y-2 text-sm grid-cols-1 md:grid-cols-12 space-x-4 space-y-4 content-end">
                        <div className="md:col-span-12">
                          <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-12 space-x-4 space-y-4 content-end">
                            <Spacer y={2} />
                            <div className="md:col-span-6"></div>
                            <div className="md:col-span-12">
                              <div style={{ marginLeft: "30px" }}>
                                <Table
                                  selectionMode="single"
                                  hideHeader
                                  aria-label="Example static collection table"
                                >
                                  <TableHeader>
                                    <TableColumn>NAME</TableColumn>
                                    <TableColumn>ROLE</TableColumn>
                                  </TableHeader>
                                  <TableBody>
                                    <TableRow key="1">
                                      <TableCell>Neto</TableCell>
                                      <TableCell>$</TableCell>
                                    </TableRow>
                                    <TableRow key="2">
                                      <TableCell>Descuento</TableCell>
                                      <TableCell>$</TableCell>
                                    </TableRow>
                                    <TableRow key="3">
                                      <TableCell>Sub Total</TableCell>
                                      <TableCell>$</TableCell>
                                    </TableRow>
                                    <TableRow key="4">
                                      <TableCell>Impuestos</TableCell>
                                      <TableCell>$</TableCell>
                                    </TableRow>
                                    <TableRow key="4">
                                      <TableCell>Total</TableCell>
                                      <TableCell>$</TableCell>
                                    </TableRow>
                                  </TableBody>
                                </Table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="md:col-span-12 text-right">
                      <div className="space-x-5 space-y-5">
                        <Button
                          className="min-w-[200px]"
                          color="primary"
                          type="submit"
                          endContent={<MdSave />}
                        >
                          Guardar cotización
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
      <Modal
        backdrop="blur"
        isOpen={isOpen}
        onClose={onClose}
        size="5xl"
        isDismissable={false}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Agregar producto a la cotización
              </ModalHeader>
              <ModalBody>
                <div className="grid gap-4 gap-y-2 text-xs grid-cols-1 lg:grid-cols-3">
                  <div className="lg:col-span-4">
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-12 space-x-4 space-y-4 content-end">
                      <div className="md:col-span-12">
                        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-12 space-x-4 space-y-4 content-end">
                          <div className="md:col-span-12"></div>
                          <div className="md:col-span-6">
                            <Input
                              id="nombre"
                              value={user.nombre}
                              onValueChange={handleChange}
                              size="sm"
                              type="text"
                              label="Cliente"
                              name="nombre"
                              labelPlacement="outside"
                              placeholder=" "
                              variant="faded"
                              error={validationErrors.nombre !== ""}
                              errorMessage={validationErrors.nombre}
                              endContent={
                                <MdSearch className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
                              }
                            />
                          </div>
                          <div className="md:col-span-3">
                            <Select
                              labelPlacement={"outside"}
                              label="Marca"
                              placeholder="Seleccione"
                              size="sm"
                            >
                              {/* {animals.map((animal) => (
                                  <SelectItem
                                    key={animal.value}
                                    value={animal.value}
                                  >
                                    {animal.label}
                                  </SelectItem>
                                ))} */}
                            </Select>
                          </div>
                          <div className="md:col-span-3">
                            <Select
                              labelPlacement={"outside"}
                              label="Categoría"
                              placeholder="Seleccione"
                              size="sm"
                            >
                              {/* {animals.map((animal) => (
                                  <SelectItem
                                    key={animal.value}
                                    value={animal.value}
                                  >
                                    {animal.label}
                                  </SelectItem>
                                ))} */}
                            </Select>
                          </div>
                          <div className="md:col-span-12">
                            <Table
                              removeWrapper
                              aria-label="Example static collection table"
                            >
                              <TableHeader>
                                <TableColumn>Imagen</TableColumn>
                                <TableColumn>Código</TableColumn>
                                <TableColumn>Nombre</TableColumn>
                                <TableColumn>Marca</TableColumn>
                                <TableColumn>Cantidad</TableColumn>
                                <TableColumn>Inv.</TableColumn>
                                <TableColumn>Precio Uni.</TableColumn>
                                <TableColumn>Descuento</TableColumn>
                                <TableColumn>Total</TableColumn>
                              </TableHeader>
                              <TableBody>
                                {/* <TableRow key="1">
                                        <TableCell>Tony Reichert</TableCell>
                                        <TableCell>CEO</TableCell>
                                        <TableCell>Active</TableCell>
                                      </TableRow>                                       */}
                              </TableBody>
                            </Table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" onPress={onClose}>
                  Cerrar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal
        backdrop="blur"
        isOpen={isOpenDiscount}
        onClose={onCloseDiscount}
        isDismissable={false}
      >
        <ModalContent>
          {(onCloseDiscount) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Aplicar descuento
              </ModalHeader>
              <ModalBody>
                <div className="grid gap-4 gap-y-2 text-xs grid-cols-1 lg:grid-cols-3">
                  <div className="lg:col-span-4">
                    <div className="grid gap-2 gap-y-2 text-sm grid-cols-1 md:grid-cols-12 space-x-4 space-y-4 content-center">
                      <div className="md:col-span-12">
                        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-12 space-x-4 space-y-4 content-center">
                          <div className="md:col-span-6"></div>
                          <div className="md:col-span-12">
                            <h2>Descuento expresado en porcentaje</h2>
                          </div>
                          <div className="md:col-span-12">
                            <Input
                              type="number"
                              placeholder="00.00"
                              color="success"
                              endContent={<MdPercent />}
                              label="Porcentaje"
                            />
                          </div>
                        </div>
                      </div>
                      <Spacer y={10} />
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" onPress={onCloseDiscount}>
                  Cerrar
                </Button>
                <Button color="success" onPress={onCloseDiscount}>
                  Aplicar descuento
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default Quote;
