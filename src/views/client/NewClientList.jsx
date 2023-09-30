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
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
const NewClient = () => {
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
    const handleTime = (moment) => {
        // Actualiza el valor de la fecha en tu estado o donde lo estés almacenando
        setUser({ ...user, fecha: moment });
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
                                        Clientes
                                    </Link>
                                    <Typography
                                        sx={{ display: "flex", alignItems: "center" }}
                                        className="text-foreground"
                                    >
                                        <MdPerson sx={{ mr: 0.5 }} fontSize="inherit" />
                                        Nuevo Cliente
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
                                                    Imagen del cliente
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
                                                    <div className="md:col-span-3 text-center">
                                                        <div style={{ paddingLeft: "140px" }}>
                                                            <Input
                                                                id="Numero de cliente"
                                                                isDisabled={status ? true : false}
                                                                value={user.Numerodecliente}
                                                                onChange={handleChange}
                                                                size={"sm"}
                                                                type="Numero de cliente"
                                                                label="Numero de cliente"
                                                                name="Numero de cliente"
                                                                labelPlacement="outside"
                                                                placeholder="***Nuevo***"
                                                                variant="faded"
                                                                error={validationErrors.Numerodecliente !== ""}
                                                                errorMessage={validationErrors.Numerodecliente}
                                                                readOnly={true}
                                                                className="text-sm w-24"

                                                            />

                                                        </div>
                                                        <div style={{ paddingInline: "140px" }}>

                                                        </div>
                                                    </div>


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
                                                        <Tab key="photos" title="Generales">
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
                                                                        label="Nombre comercial"
                                                                        id="Nombre comercial"
                                                                        isDisabled={status ? true : false}
                                                                        name="Nombre comercial"
                                                                        value={user.nombreComercial}
                                                                        onChange={handleChange}
                                                                        labelPlacement="outside"
                                                                        placeholder=" "
                                                                        variant="faded"
                                                                        error={validationErrors.nombreComercial !== ""}
                                                                        errorMessage={validationErrors.nombreComercial}
                                                                    />
                                                                </div>

                                                                <div className="md:col-span-6">
                                                                    <Input
                                                                        id="Razon social"
                                                                        value={user.razonSocial}
                                                                        isDisabled={status ? true : false}
                                                                        onChange={handleChange}
                                                                        size={"sm"}
                                                                        type="Razon social"
                                                                        label="Razon social"
                                                                        name="Razon social"
                                                                        labelPlacement="outside"
                                                                        placeholder=" "
                                                                        variant="faded"

                                                                    />
                                                                </div>
                                                                <div className="md:col-span-6">
                                                                    <Input
                                                                        id="Contacto"
                                                                        value={user.contacto}
                                                                        isDisabled={status ? true : false}
                                                                        onChange={handleChange}
                                                                        size={"sm"}
                                                                        type="Contacto"
                                                                        label="Contacto"
                                                                        name="Contacto"
                                                                        labelPlacement="outside"
                                                                        placeholder=" "
                                                                        variant="faded"

                                                                    />
                                                                </div>
                                                                <div className="md:col-span-12">
                                                                    <Input
                                                                        id="RFC"
                                                                        isDisabled={status ? true : false}
                                                                        value={user.rfc}
                                                                        onChange={handleChange}
                                                                        size={"sm"}
                                                                        type="RFC"
                                                                        label="RFC"
                                                                        name="RFC"
                                                                        labelPlacement="outside"
                                                                        placeholder=" "
                                                                        variant="faded"

                                                                    />
                                                                </div>


                                                                <div className="md:col-span-3">
                                                                    <Input
                                                                        id="Telefono"
                                                                        isDisabled={status ? true : false}
                                                                        value={user.telefono}
                                                                        onChange={handleChange}
                                                                        size={"sm"}
                                                                        type="Telefono"
                                                                        label="telefono"
                                                                        name="telefono"
                                                                        labelPlacement="outside"
                                                                        placeholder=" "
                                                                        variant="faded"
                                                                        error={
                                                                            validationErrors.telefono !== ""
                                                                        }
                                                                        errorMessage={
                                                                            validationErrors.telefono
                                                                        }
                                                                    />
                                                                </div>
                                                                <div className="md:col-span-3">
                                                                    <label htmlFor="estado">Giro</label>
                                                                    <Select
                                                                        id="giro"
                                                                        isDisabled={status ? true : false}
                                                                        value={user.giro}
                                                                        onChange={handleChange}
                                                                        size="small"
                                                                        label=" "
                                                                        name="giro"
                                                                        variant="outlined"
                                                                        error={validationErrors.giro !== ""}
                                                                        errorMessage={validationErrors.giro}

                                                                    >
                                                                    </Select>
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
                                                                        name="emailConfirm"
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
                                                            </div>
                                                        </Tab>
                                                        <Tab key="music" title="Facturacion">
                                                            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-12 space-x-4 space-y-4 content-end">
                                                                <Spacer y={6} />
                                                                <div className="md:col-span-6"></div>
                                                                <div className="md:col-span-6">
                                                                    <Input
                                                                        id="Forma de pago"
                                                                        isDisabled={status ? true : false}
                                                                        value={user.formaPago}
                                                                        onChange={handleChange}
                                                                        size={"sm"}
                                                                        type="Forma de pago"
                                                                        label="Forma de pago"
                                                                        name="Forma de pago"
                                                                        labelPlacement="outside"
                                                                        placeholder=" "
                                                                        variant="faded"
                                                                        error={validationErrors.formaPago !== ""}
                                                                        errorMessage={validationErrors.formaPago}
                                                                    />
                                                                </div>
                                                                <div className="md:col-span-6">
                                                                    <Input
                                                                        size={"sm"}
                                                                        type="Metodo de pago"
                                                                        label="Metodo de pago"
                                                                        id="Metodo de pago"
                                                                        isDisabled={status ? true : false}
                                                                        name="Metodo de pago"
                                                                        value={user.metodoPago}
                                                                        onChange={handleChange}
                                                                        labelPlacement="outside"
                                                                        placeholder=" "
                                                                        variant="faded"
                                                                        error={validationErrors.metodoPago !== ""}
                                                                        errorMessage={validationErrors.metodoPago}
                                                                    />
                                                                </div>



                                                                <div className="md:col-span-4">
                                                                    <Input
                                                                        id="CFDI"
                                                                        isDisabled={status ? true : false}
                                                                        value={user.cfdi}
                                                                        onChange={handleChange}
                                                                        size={"sm"}
                                                                        type="CFDI"
                                                                        label="CFDI"
                                                                        name="CFDI"
                                                                        labelPlacement="outside"
                                                                        placeholder=" "
                                                                        variant="faded"
                                                                        error={validationErrors.cfdi !== ""}
                                                                        errorMessage={validationErrors.cfdi}
                                                                    />
                                                                </div>



                                                                <div className="md:col-span-4">
                                                                    <Input
                                                                        id="Condiciones de pago"
                                                                        isDisabled={status ? true : false}
                                                                        value={user.condicionesPago}
                                                                        onChange={handleChange}
                                                                        size={"sm"}
                                                                        type="Condiciones de pago"
                                                                        label="Condiciones de pago"
                                                                        name="Condiciones de pago"
                                                                        labelPlacement="outside"
                                                                        placeholder=" "
                                                                        variant="faded"
                                                                        error={validationErrors.condicionesPago !== ""}
                                                                        errorMessage={validationErrors.condicionesPago}
                                                                    />
                                                                </div>
                                                                <div className="md:col-span-4">
                                                                    <Input
                                                                        id="Dias de credito"
                                                                        isDisabled={status ? true : false}
                                                                        value={user.diasCredito}
                                                                        onChange={handleChange}
                                                                        size={"sm"}
                                                                        label="Dias de credito"
                                                                        name="Dias de credito"
                                                                        labelPlacement="outside"
                                                                        placeholder=" "
                                                                        variant="faded"
                                                                        error={
                                                                            validationErrors.diasCredito !== ""
                                                                        }
                                                                        errorMessage={
                                                                            validationErrors.diasCredito
                                                                        }
                                                                    />
                                                                </div>
                                                                <div className="md:col-span-4">
                                                                    <Input
                                                                        id="Limite de credito"
                                                                        isDisabled={status ? true : false}
                                                                        value={user.limiteCredito}
                                                                        onChange={handleChange}
                                                                        size={"sm"}
                                                                        type="text"
                                                                        label="Limite de credito"
                                                                        name="Limite de credito"
                                                                        labelPlacement="outside"
                                                                        placeholder=" "
                                                                        variant="faded"
                                                                        error={
                                                                            validationErrors.limiteCredito !== ""
                                                                        }
                                                                        errorMessage={
                                                                            validationErrors.limiteCredito
                                                                        }
                                                                    />
                                                                </div>
                                                                <div className="md:col-span-4">
                                                                    <Input
                                                                        id="Saldo pendiente"
                                                                        isDisabled={status ? true : false}
                                                                        value={user.saldoPendiente}
                                                                        onChange={handleChange}
                                                                        size={"sm"}
                                                                        type="text"
                                                                        label="Saldo pendiente"
                                                                        name="Saldo pendiente"
                                                                        labelPlacement="outside"
                                                                        placeholder=" "
                                                                        variant="faded"
                                                                        readOnly={true}
                                                                        error={
                                                                            validationErrors.saldoPendiente !== ""
                                                                        }
                                                                        errorMessage={
                                                                            validationErrors.saldoPendiente
                                                                        }
                                                                    />
                                                                </div>
                                                                <div className="md:col-span-4">
                                                                    <Input
                                                                        id="Credito disponible"
                                                                        isDisabled={status ? true : false}
                                                                        value={user.creditoDisponible}
                                                                        onChange={handleChange}
                                                                        size={"sm"}
                                                                        type="text"
                                                                        label="Credito disponible"
                                                                        name="Credito disponible"
                                                                        labelPlacement="outside"
                                                                        placeholder=" "
                                                                        variant="faded"
                                                                        readOnly={true}
                                                                        error={
                                                                            validationErrors.creditoDisponible !== ""
                                                                        }
                                                                        errorMessage={
                                                                            validationErrors.creditoDisponible
                                                                        }
                                                                    />
                                                                </div>
                                                            </div>
                                                        </Tab>
                                                        <Tab key="Contacts" title="Contactos">
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
                                                                        name="emailConfirm"
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
                                                                        id="Contacto"
                                                                        isDisabled={status ? true : false}
                                                                        value={user.contacto}
                                                                        onChange={handleChange}
                                                                        size={"sm"}
                                                                        type="Contacto"
                                                                        label="Contacto"
                                                                        name="Contacto"
                                                                        labelPlacement="outside"
                                                                        placeholder=" "
                                                                        variant="faded"
                                                                        error={validationErrors.contacto !== ""}
                                                                        errorMessage={validationErrors.contacto}
                                                                    />
                                                                </div>
                                                                <div className="md:col-span-6">
                                                                    <Input
                                                                        id="Comentario"
                                                                        isDisabled={status ? true : false}
                                                                        value={user.comentario}
                                                                        onChange={handleChange}
                                                                        size={"sm"}
                                                                        label="Comentario"
                                                                        name="Comentario"
                                                                        labelPlacement="outside"
                                                                        placeholder=" "
                                                                        variant="faded"
                                                                        error={
                                                                            validationErrors.comentario !== ""
                                                                        }
                                                                        errorMessage={
                                                                            validationErrors.diasCredito
                                                                        }
                                                                    />
                                                                </div>
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

                                                            </div>
                                                        </Tab>
                                                        <Tab key="Addres" title="Direccion de envio">
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
                                                                    <Input
                                                                        id="ciudad"
                                                                        isDisabled={status ? true : false}
                                                                        value={user.ciudad}
                                                                        onChange={handleChange}
                                                                        size={"sm"}
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

                                                                <div className="md:col-span-5">
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
                                                            </div>
                                                        </Tab>
                                                        <Tab key="WEB" title="Acceso web">
                                                            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-12 space-x-4 space-y-4 content-end">
                                                                <Spacer y={6} />
                                                                <div className="md:col-span-6"></div>
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
                                                                        name="confirmPassword"
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
                                                                <div className="md:col-span-3">
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
                                                                <div className="md:col-span-3">
                                                                    <label htmlFor="status">Validacion</label>
                                                                    <Select
                                                                        id="Validacion"
                                                                        isDisabled={status ? true : false}
                                                                        value={user.Validacion}
                                                                        onChange={handleChange}
                                                                        size="small"
                                                                        label=" "
                                                                        name="Validacion"
                                                                        variant="outlined"
                                                                        fullWidth
                                                                        error={validationErrors.Validacion !== ""}
                                                                        errorMessage={validationErrors.Validacion}
                                                                    >
                                                                        <MenuItem value="Validado">Validado</MenuItem>
                                                                        <MenuItem value="Invalidado">
                                                                            Invalidado
                                                                        </MenuItem>
                                                                    </Select>
                                                                </div>
                                                            </div>
                                                        </Tab>
                                                        <Tab key="Acount" title="Estados de cuenta">
                                                            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-12 space-x-4 space-y-4 content-end">
                                                                <Spacer y={6} />
                                                                <div className="md:col-span-6"></div>
                                                                
                                                                <div className="md:col-span-3">
                                                               
    <Datetime
        id="Fecha"
        value={user.fecha}
        onChange={handleTime}
        inputProps={{
            disabled: status,
            placeholder: "Fecha", 
            style: {
                color: "#333",
                backgroundColor: "#f0f0f0",
                border: "1px solid #ccc", 
                borderRadius: "5px", 
                padding: "5px", 
                fontSize: "14px", 
                width: "100%",
            },
        }}
        input={true}
        timeFormat={false}
        dateFormat="DD/MM/YYYY"
    />
</div>

<div className="md:col-span-3">
                                                                    <Input
                                                                        id="Tipo"
                                                                        isDisabled={status ? true : false}
                                                                        value={user.tipo}
                                                                        onChange={handleChange}
                                                                        size={"sm"}
                                                                        type="Tipo"
                                                                        label="Tipo"
                                                                        name="Tipo"
                                                                        labelPlacement="outside"
                                                                        placeholder=" "
                                                                        variant="faded"
                                                                        error={
                                                                            validationErrors.tipo !== ""
                                                                        }
                                                                        errorMessage={
                                                                            validationErrors.tipo
                                                                        }
                                                                    />
                                                                </div>
                                                                <div className="md:col-span-3">
                                                                    <Input
                                                                        id="Detalle"
                                                                        isDisabled={status ? true : false}
                                                                        value={user.detalle}
                                                                        onChange={handleChange}
                                                                        size={"sm"}
                                                                        type="Detalle"
                                                                        label="Detalle"
                                                                        name="Detalle"
                                                                        labelPlacement="outside"
                                                                        placeholder=" "
                                                                        variant="faded"
                                                                        error={
                                                                            validationErrors.detalle !== ""
                                                                        }
                                                                        errorMessage={
                                                                            validationErrors.detalle
                                                                        }
                                                                    />
                                                                </div>
                                                                <div className="md:col-span-3">
                                                                    <Input
                                                                        id="Cargo"
                                                                        isDisabled={status ? true : false}
                                                                        value={user.cargo}
                                                                        onChange={handleChange}
                                                                        size={"sm"}
                                                                        type="Cargo"
                                                                        label="Cargo"
                                                                        name="Cargo"
                                                                        labelPlacement="outside"
                                                                        placeholder=" "
                                                                        variant="faded"
                                                                        error={
                                                                            validationErrors.cargo !== ""
                                                                        }
                                                                        errorMessage={
                                                                            validationErrors.cargo
                                                                        }
                                                                    />
                                                                </div>
                                                                <div className="md:col-span-6">
                                                                    <Input
                                                                        id="Abono"
                                                                        isDisabled={status ? true : false}
                                                                        value={user.abono}
                                                                        onChange={handleChange}
                                                                        size={"sm"}
                                                                        type="Abono"
                                                                        label="Abono"
                                                                        name="Abono"
                                                                        labelPlacement="Abono"
                                                                        placeholder=" "
                                                                        variant="faded"
                                                                        error={
                                                                            validationErrors.abono !== ""
                                                                        }
                                                                        errorMessage={
                                                                            validationErrors.abono
                                                                        }
                                                                    />
                                                                </div>
                                                                <div className="md:col-span-6">
                                                                    <Input
                                                                        id="Tc"
                                                                        isDisabled={status ? true : false}
                                                                        value={user.tc}
                                                                        onChange={handleChange}
                                                                        size={"sm"}
                                                                        type="Tc"
                                                                        label="Tc"
                                                                        name="Tc"
                                                                        labelPlacement="Tc"
                                                                        placeholder=" "
                                                                        variant="faded"
                                                                        error={
                                                                            validationErrors.tc !== ""
                                                                        }
                                                                        errorMessage={
                                                                            validationErrors.tc
                                                                        }
                                                                    />
                                                                </div>
                                                                <div className="md:col-span-6">
                                                                    <Input
                                                                        id="Saldo"
                                                                        isDisabled={status ? true : false}
                                                                        value={user.saldo}
                                                                        onChange={handleChange}
                                                                        size={"sm"}
                                                                        type="Saldo"
                                                                        label="Saldo"
                                                                        name="Saldo"
                                                                        labelPlacement="Saldo"
                                                                        placeholder=" "
                                                                        variant="faded"
                                                                        error={
                                                                            validationErrors.saldo !== ""
                                                                        }
                                                                        errorMessage={
                                                                            validationErrors.saldo
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
                                                {selected === "Contacts" && (
                                                    <Button
                                                        className="min-w-[200px]"
                                                        color="primary"
                                                        type="submit"
                                                        startContent={<RiArrowLeftLine />}
                                                        onClick={() => setSelected("music")}
                                                    >
                                                        Anterior
                                                    </Button>
                                                )}
                                                {selected === "Addres" && (
                                                    <Button
                                                        className="min-w-[200px]"
                                                        color="primary"
                                                        type="submit"
                                                        startContent={<RiArrowLeftLine />}
                                                        onClick={() => setSelected("Contacts")}
                                                    >
                                                        Anterior
                                                    </Button>
                                                )}
                                                {selected === "WEB" && (
                                                    <Button
                                                        className="min-w-[200px]"
                                                        color="primary"
                                                        type="submit"
                                                        startContent={<RiArrowLeftLine />}
                                                        onClick={() => setSelected("Addres")}
                                                    >
                                                        Anterior
                                                    </Button>
                                                )}
                                                {selected === "Acount" && (
                                                    <Button
                                                        className="min-w-[200px]"
                                                        color="primary"
                                                        type="submit"
                                                        startContent={<RiArrowLeftLine />}
                                                        onClick={() => setSelected("WEB")}
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
                                                {selected === "music" && (
                                                    <Button
                                                        className="min-w-[200px]"
                                                        color="primary"
                                                        type="button"
                                                        endContent={<RiArrowRightLine />}
                                                        onClick={() => setSelected("Contacts")}
                                                    >
                                                        Siguiente
                                                    </Button>
                                                )}
                                                {selected === "Contacts" && (
                                                    <Button
                                                        className="min-w-[200px]"
                                                        color="primary"
                                                        type="button"
                                                        endContent={<RiArrowRightLine />}
                                                        onClick={() => setSelected("Addres")}
                                                    >
                                                        Siguiente
                                                    </Button>
                                                )}
                                                {selected === "Addres" && (
                                                    <Button
                                                        className="min-w-[200px]"
                                                        color="primary"
                                                        type="button"
                                                        endContent={<RiArrowRightLine />}
                                                        onClick={() => setSelected("WEB")}
                                                    >
                                                        Siguiente
                                                    </Button>
                                                )}
                                                {selected === "WEB" && (
                                                    <Button
                                                        className="min-w-[200px]"
                                                        color="primary"
                                                        type="button"
                                                        endContent={<RiArrowRightLine />}
                                                        onClick={() => setSelected("Acount")}
                                                    >
                                                        Siguiente
                                                    </Button>

                                                )}                                                <Button
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

export default NewClient;
