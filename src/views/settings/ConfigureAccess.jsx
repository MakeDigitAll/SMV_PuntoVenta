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

//import ProfileImageUpload from "../user/ProfilesImagenUploads.tsx";
import { Breadcrumbs, Typography } from "@mui/material";
import {
    RiArrowLeftLine,
    RiArrowRightLine,
    RiDashboard2Fill,
} from "react-icons/ri";
import { MdCamera, MdPeopleAlt, MdPerson, MdSecurity, MdSettings } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import ItemsHeader from "../../components/header/itemsHeader/ItemsHeader.jsx";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { MdSave } from "react-icons/md";
import http from "../../components/axios/Axios";
const ConfigureAccess = () => {
    const [selectedImage, setSelectedImage] = useState("");
    const imageDefault = selectedImage === "";
    const [user, setTask] = useState({
        nombre: "",
        apellido: "",
        email: "",
        password: "",
        imagen: "",
        emailConfirm: "",
        passwordConfirm: "",
    });
    const handleChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value });
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
                                        onClick={() => navigate(`/Settings`)}
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
                                        onClick={() => navigate(`/Settings/SecuritProfiles`)}
                                    >
                                        <MdSecurity sx={{ mr: 0.5 }} fontSize="inherit" />
                                        Perfiles de Seguirdad
                                    </Link>
                                    <Typography
                                        sx={{ display: "flex", alignItems: "center" }}
                                        className="text-foreground"
                                    >
                                        <MdSettings sx={{ mr: 0.5 }} fontSize="inherit" />
                                        Configurar Accesos del Perfil
                                    </Typography>
                                </Breadcrumbs>
                            </div>
                            <form onChange={handleChange} onSubmit={handleSubmit}>
                                <Spacer y={6} />
                                {/* <div className="bg-white rounded shadow-2xl px-4 md:p-8 mb-6"></div> */}
                                <div className="bg-card rounded shadow-2xl px-4 md:p-8 mb-6">
                                    <div className="grid gap- gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                                        <Accordion>
                                            <AccordionItem key="1" aria-label="Accordion 1" title="Dashboard">
                                                <CheckboxGroup
                                                    label="Consultas"
                                                    defaultValue={["tareas-agendadas", "ventas-mes"]}
                                                >
                                                    <Checkbox value="ventas-mes">
                                                        CheckBox de prueba
                                                    </Checkbox>
                                                </CheckboxGroup>
                                            </AccordionItem>
                                            <AccordionItem key="2" aria-label="Accordion 2" title="Ventas">
                                                <CheckboxGroup
                                                    label="Cotizaciones"
                                                    defaultValue={["tareas-agendadas", "ventas-mes"]}
                                                >
                                                    <Checkbox value="ver-cotizaciones">
                                                        CheckBox de prueba
                                                    </Checkbox>

                                                </CheckboxGroup>
                                                <br />
                                                <CheckboxGroup
                                                    label="Margen de Ventas"
                                                    defaultValue={["tareas-agendadas", "ventas-mes"]}
                                                >
                                                    <Checkbox value="margen-ventas">
                                                        CheckBox de prueba
                                                    </Checkbox>
                                                </CheckboxGroup>
                                                <br />
                                                <CheckboxGroup
                                                    label="Reporte de Ventas"
                                                    defaultValue={["tareas-agendadas", "ventas-mes"]}
                                                >
                                                    <Checkbox value="consultar-reporte-ventas">
                                                        CheckBox de prueba
                                                    </Checkbox>
                                                </CheckboxGroup>
                                                <br />
                                                <CheckboxGroup
                                                    label="Tipo de Cambio"
                                                    defaultValue={["tareas-agendadas", "ventas-mes"]}
                                                >
                                                    <Checkbox value="ver-tipos-cambio">
                                                        CheckBox de prueba
                                                    </Checkbox>
                                                </CheckboxGroup>
                                                <br />
                                                <CheckboxGroup
                                                    label="Cobranza"
                                                    defaultValue={["tareas-agendadas", "ventas-mes"]}
                                                >
                                                    <Checkbox value="ver-cobranza">
                                                        CheckBox de prueba
                                                    </Checkbox>
                                                </CheckboxGroup>
                                                <br />
                                                <CheckboxGroup
                                                    label="Caja General"
                                                    defaultValue={["tareas-agendadas", "ventas-mes"]}
                                                >
                                                    <Checkbox value="ver-movimientos">
                                                        CheckBox de prueba
                                                    </Checkbox>
                                                </CheckboxGroup>
                                                <br />
                                                <CheckboxGroup
                                                    label="Surtir Pedidos"
                                                    defaultValue={["tareas-agendadas", "ventas-mes"]}
                                                >
                                                    <Checkbox value="surtido-pedidos">
                                                        CheckBox de prueba
                                                    </Checkbox>
                                                </CheckboxGroup>
                                                <br />
                                                <CheckboxGroup
                                                    label="Pedidos"
                                                    defaultValue={["tareas-agendadas", "ventas-mes"]}
                                                >
                                                    <Checkbox value="ver-pedidos">
                                                        CheckBox de prueba
                                                    </Checkbox>
                                                </CheckboxGroup>
                                                <br />
                                                <CheckboxGroup
                                                    label="Facturacion"
                                                    defaultValue={["tareas-agendadas", "ventas-mes"]}
                                                >
                                                    <Checkbox value="reporte-facturas">
                                                        CheckBox de prueba
                                                    </Checkbox>
                                                </CheckboxGroup>
                                                <br />
                                                <CheckboxGroup
                                                    label="Reporte de Cobranza"
                                                    defaultValue={["tareas-agendadas", "ventas-mes"]}
                                                >
                                                    <Checkbox value="consultar-reporte-cobranza">
                                                        CheckBox de prueba
                                                    </Checkbox>
                                                </CheckboxGroup>
                                            </AccordionItem>
                                            <AccordionItem key="3" aria-label="Accordion 3" title="Punto de Venta">
                                                <CheckboxGroup
                                                    label="Punto de Venta"
                                                    defaultValue={["tareas-agendadas", "ventas-mes"]}
                                                >
                                                    <Checkbox value="prueba-1">
                                                        CheckBox de prueba
                                                    </Checkbox>
                                                </CheckboxGroup>
                                            </AccordionItem>
                                            <AccordionItem key="4" aria-label="Accordion 4" title="Clientes">
                                                <CheckboxGroup
                                                    label="Clientes"
                                                    defaultValue={["tareas-agendadas", "ventas-mes"]}
                                                >
                                                    <Checkbox value="prueba-1">
                                                        CheckBox de prueba
                                                    </Checkbox>
                                                </CheckboxGroup>
                                            </AccordionItem>
                                            <AccordionItem key="5" aria-label="Accordion 5" title="Vendedores">
                                                <CheckboxGroup
                                                    label="Vendedores"
                                                    defaultValue={["tareas-agendadas", "ventas-mes"]}
                                                >
                                                    <Checkbox value="prueba-1">
                                                        CheckBox de prueba
                                                    </Checkbox>
                                                </CheckboxGroup>
                                            </AccordionItem>
                                            <AccordionItem key="6" aria-label="Accordion 6" title="Productos">
                                                <CheckboxGroup
                                                    label="Productos"
                                                    defaultValue={["tareas-agendadas", "ventas-mes"]}
                                                >
                                                    <Checkbox value="prueba-1">
                                                        CheckBox de prueba
                                                    </Checkbox>
                                                </CheckboxGroup>
                                            </AccordionItem>
                                            <AccordionItem key="7" aria-label="Accordion 7" title="Compras">
                                                <CheckboxGroup
                                                    label="Compras"
                                                    defaultValue={["tareas-agendadas", "ventas-mes"]}
                                                >
                                                    <Checkbox value="prueba-1">
                                                        CheckBox de prueba
                                                    </Checkbox>
                                                </CheckboxGroup>
                                            </AccordionItem>
                                            <AccordionItem key="8" aria-label="Accordion 8" title="Inventario">
                                                <CheckboxGroup
                                                    label="Inventario"
                                                    defaultValue={["tareas-agendadas", "ventas-mes"]}
                                                >
                                                    <Checkbox value="prueba-1">
                                                        CheckBox de prueba
                                                    </Checkbox>
                                                </CheckboxGroup>
                                            </AccordionItem>
                                            <AccordionItem key="9" aria-label="Accordion 9" title="Bancos">
                                                <CheckboxGroup
                                                    label="Bancos"
                                                    defaultValue={["tareas-agendadas", "ventas-mes"]}
                                                >
                                                    <Checkbox value="prueba-1">
                                                        CheckBox de prueba
                                                    </Checkbox>
                                                </CheckboxGroup>
                                            </AccordionItem>
                                            <AccordionItem key="10" aria-label="Accordion 10" title="Nominas">
                                                <CheckboxGroup
                                                    label="Nominas"
                                                    defaultValue={["tareas-agendadas", "ventas-mes"]}
                                                >
                                                    <Checkbox value="prueba-1">
                                                        CheckBox de prueba
                                                    </Checkbox>
                                                </CheckboxGroup>
                                            </AccordionItem>
                                            <AccordionItem key="11" aria-label="Accordion 11" title="Configuracion">
                                                <CheckboxGroup
                                                    label="Configuracion"
                                                    defaultValue={["tareas-agendadas", "ventas-mes"]}
                                                >
                                                    <Checkbox value="prueba-1">
                                                        CheckBox de prueba
                                                    </Checkbox>
                                                </CheckboxGroup>
                                            </AccordionItem>
                                            <AccordionItem key="12" aria-label="Accordion 12" title="Pagina WEB">
                                                <CheckboxGroup
                                                    label="Pagina WEB"
                                                    defaultValue={["tareas-agendadas", "ventas-mes"]}
                                                >
                                                    <Checkbox value="prueba-1">
                                                        CheckBox de prueba
                                                    </Checkbox>
                                                </CheckboxGroup>
                                            </AccordionItem>
                                        </Accordion>

                                        <div className="lg:col-span-2">
                                            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-12 space-x-4 space-y-4 content-end">
                                                <div className="md:col-span-12">

                                                </div>
                                                <Spacer y={10} />
                                            </div>
                                        </div>
                                        <div className="md:col-span-12 text-right content-end">
                                            <div className="space-x-5 space-y-5">
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

export default ConfigureAccess;
