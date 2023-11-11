import { Breadcrumbs, Typography } from "@mui/material";
import {
  Input,
  Link, Spacer, Tab, Tabs
} from "@nextui-org/react";
import { RiDashboard2Fill } from "react-icons/ri";
import { MdDashboard,MdPeopleAlt,MdSave } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import Sidebar from "../../components/shared/Sidebar";
import SidebarMovil from "../../components/shared/SidebarMovill";
import HeaderPointofSale from "../../components/header/headerC/HederPointofSale";
import { useEffect,useState } from "react";
import { toast } from "react-toastify";
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Customer = () => {
    const navigate = useNavigate(); 
    const { id } = useParams();
    const location = useLocation();
    const clienteData = location.state ? location.state.clienteData : null;
    const customerId = location.state ? location.state.customerId : null;
    const modoVisualizacion = location.state ? location.state.modoVisualizacion : false;
    const isEditMode = location.state ? location.state.isEditMode : false;
    const [clienteform, setClienteForm] = useState({
      nombreCliente: clienteData ? clienteData.nombreCliente : "",
      numeroCliente: clienteData ? clienteData.numeroCliente : "",
      numeroComercial:clienteData ? clienteData.numeroComercial : "",
      razonSocial: clienteData ? clienteData.razonSocial : "",
      contacto: clienteData ? clienteData.contacto : "",
      rfc: clienteData ? clienteData.rfc : "",
      telefono: clienteData ? clienteData.telefono : "",
      email: clienteData ? clienteData.email : "",
      vendedor: clienteData ? clienteData.vendedor : "",
      giro: clienteData ? clienteData.giro : "",
      activo: clienteData ? clienteData.activo : false,
      registro:clienteData ? clienteData.registro : "",
    });
    
    const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
  
      const newValue = type === "checkbox" ? checked : value;
    
      setClienteForm({
        ...clienteform,
        [name]: newValue,
      });
    };

    async function handleSubmit(e) {
      e.preventDefault();
      const requiredFields = [
        'nombreCliente',
        'numeroCliente',
        'numeroComercial',
        'razonSocial',
        'contacto',
        'rfc',
        'telefono',
        'email',
        'vendedor',
        'giro',
      ];
      const missingFields = requiredFields.filter((field) => !clienteform[field]);
    
      if (missingFields.length === 0) {
        const activoValue = clienteform.activo ? 1 : 0;
        const formData = {
          nombreCliente: clienteform.nombreCliente,
          numeroCliente: clienteform.numeroCliente,
          numeroComercial: clienteform.numeroComercial,
          razonSocial: clienteform.razonSocial,
          contacto: clienteform.contacto,
          rfc: clienteform.rfc,
          telefono: clienteform.telefono,
          email: clienteform.email,
          vendedor: clienteform.vendedor,
          giro: clienteform.giro,
          activo: activoValue,
          registro: clienteform.registro,
        };
    
        let url = '';
        let method = '';
    
        if (isEditMode) {
          if (customerId) {
            // Estás en modo de edición y customerId es válido
            url = `https://localhost:4000/ClientesPosEdit/${customerId}`;
            method = 'PUT';
          } else {
            toast.error('Error al editar el cliente', {
              position: 'bottom-right',
              theme: 'colored',
            });
          }
        } else {
          // Estás en modo de creación (nuevo)
          url = 'https://localhost:4000/NuevoClientesPos';
          method = 'POST';
        }
        try {
          const response = await fetch(url, {
            method,
            body: JSON.stringify(formData),
            headers: {
              'Content-Type': 'application/json',
            },
          });
    
          if (response.ok) {
            const message = modoVisualizacion
              ? 'Cliente editado correctamente'
              : 'Cliente creado correctamente';
    
            toast.success(message, {
              theme: 'colored',
            });
    
            navigate('/PointofSale/Customers');
          } else {
            toast.error('Error al guardar el cliente', {
              position: 'bottom-right',
              theme: 'colored',
            });
          }
        } catch (error) {
          toast.error('Error al guardar el cliente', {
            position: 'bottom-right',
            theme: 'colored',
          });
        }
      } else {
        // Faltan campos obligatorios, puedes mostrar un mensaje aquí si lo deseas.
        toast.error('Por favor, complete todos los campos obligatorios', {
          position: 'bottom-right',
          theme: 'colored',
        });
      }
    }         
    
    return (
      <>
        <div className="bg-[#262837] w-full min-h-screen">
          <Sidebar />
          <SidebarMovil />
          <main className="lg:pl-28 lg:pr-90 pb-15">
            <div className="p-10" style={{ overflow: "auto" }}>
            
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
                        onClick={() => navigate(`/PointofSale`)}
                      >
                        <MdDashboard sx={{ mr: 0.5 }} fontSize="inherit" />
                        Dashboard
                      </Link>
                      <Link
                        className="text-foreground"
                        underline="hover"
                        sx={{ display: "flex", alignItems: "center" }}
                        color="foreground"
                        href="#"
                        onClick={() => navigate(`/PointofSale/Customers`)}
                      >
                        <MdDashboard sx={{ mr: 0.5 }} fontSize="inherit" />
                        Clientes
                      </Link>
                      <Typography
                        sx={{ display: "flex", alignItems: "center" }}
                        className="text-foreground"
                      >
                        <MdPeopleAlt sx={{ mr: 0.5 }} fontSize="inherit" />
                        Cliente
                      </Typography>
                    </Breadcrumbs>
                  </div>
                </div>
              </div>
            </div>
            <form>
              {/* <div className="bg-white rounded shadow-2xl px-4 md:p-8 mb-6"></div> */}
              <div className="bg-card-[#262837] rounded shadow-2xl px-4 md:p-8 mb-6">
                <div className="lg:col-span-2">
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-12 space-x-4 space-y-4 content-end">
                    <div className="md:col-span-12">
                      <Tabs
                        key="underlined"
                        variant="underlined"
                        aria-label="Tabs variants"
                      >
                        <Tab key="photos" title="Información Cliente">
                          <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-12 space-x-4 space-y-4 content-end">
                            <Spacer y={6} />
                            <div className="md:col-span-6"></div>
                            <div className="md:col-span-6">
                              <Input
                                id="nombreCliente"
                                size={"sm"}
                                type="text"
                                label="Nombre"
                                name="nombreCliente"
                                labelPlacement="outside"
                                placeholder=" "
                                variant="faded"
                                value={clienteform.nombreCliente}
                                onChange={handleChange}
                                required
                                disabled={modoVisualizacion ? true : false}
                              />
                            </div>
                            <div className="md:col-span-6">
                              <Input
                                id="numeroCliente"
                                size={"sm"}
                                type="text"
                                label="Número Cliente"
                                name="numeroCliente"
                                labelPlacement="outside"
                                placeholder=" "
                                variant="faded"
                                value={clienteform.numeroCliente}
                                onChange={handleChange}
                                required
                                disabled={modoVisualizacion ? true : false}
                              />
                            </div>
                            <div className="md:col-span-6">
                              <Input
                                id="numeroComercial"
                                size={"sm"}
                                type="text"
                                label="Número Comercial"
                                name="numeroComercial"
                                labelPlacement="outside"
                                placeholder=" "
                                variant="faded"
                                value={clienteform.numeroComercial}
                                onChange={handleChange}
                                required
                                disabled={modoVisualizacion ? true : false}
                              />
                            </div>
                            <div className="md:col-span-6">
                              <Input
                                size={"sm"}
                                type="text"
                                label="Razón Social"
                                id="razonSocial"
                                name="razonSocial"
                                labelPlacement="outside"
                                placeholder=" "
                                variant="faded"
                                value={clienteform.razonSocial}
                                onChange={handleChange}
                                required
                                disabled={modoVisualizacion ? true : false}
                              />
                            </div>
                            <div className="md:col-span-6">
                              <Input
                                id="contacto"
                                size={"sm"}
                                type="text"
                                label="Contacto"
                                name="contacto"
                                labelPlacement="outside"
                                placeholder=" "
                                variant="faded"
                                value={clienteform.contacto}
                                onChange={handleChange}
                                required
                                disabled={modoVisualizacion ? true : false}
                              />
                            </div>
                            <div className="md:col-span-6">
                              <Input
                                size={"sm"}
                                type="text"
                                label="RFC"
                                id="rfc"
                                name="rfc"
                                labelPlacement="outside"
                                placeholder=" "
                                variant="faded"
                                value={clienteform.rfc}
                                onChange={handleChange}
                                required
                                disabled={modoVisualizacion ? true : false}
                              />
                            </div>
                            <div className="md:col-span-6">
                              <Input
                                size={"sm"}
                                type="number"
                                label="Telefono"
                                id="telefono"
                                name="telefono"
                                labelPlacement="outside"
                                placeholder=" "
                                variant="faded"
                                value={clienteform.telefono}
                                onChange={handleChange}
                                required
                                disabled={modoVisualizacion ? true : false}
                              />
                            </div>
                            <div className="md:col-span-6">
                              <Input
                                size={"sm"}
                                type="text"
                                label="Correo"
                                id="email"
                                name="email"
                                labelPlacement="outside"
                                placeholder=" "
                                variant="faded"
                                value={clienteform.email}
                                onChange={handleChange}
                                required
                                disabled={modoVisualizacion ? true : false}
                              />
                            </div>
                            <div className="md:col-span-6">
                              <Input
                                id="vendedor"
                                size={"sm"}
                                type="text"
                                label="Vendedor"
                                name="vendedor"
                                labelPlacement="outside"
                                placeholder=" "
                                variant="faded"
                                value={clienteform.vendedor}
                                onChange={handleChange}
                                required
                                disabled={modoVisualizacion ? true : false}
                              />
                            </div>
                            <div className="md:col-span-6">
                              <Input
                                id="giro"
                                size={"sm"}
                                type="text"
                                label="Giro"
                                name="giro"
                                labelPlacement="outside"
                                placeholder=" "
                                variant="faded"
                                value={clienteform.giro}
                                onChange={handleChange}
                                required
                                disabled={modoVisualizacion ? true : false}
                              />
                            </div>
                            <div className="md:col-span-6">
                              <Input
                                id="registro"
                                size={"sm"}
                                type="text"
                                label="Registro"
                                name="registro"
                                labelPlacement="outside"
                                placeholder=" "
                                variant="faded"
                                value={clienteform.registro}
                                onChange={handleChange}
                                required
                                disabled={modoVisualizacion ? true : false}
                              />
                            </div>
                            <div className="md:col-span-6">
                              <div className="checkbox-container">
                                <input
                                  type="checkbox"
                                  id="activo"
                                  name="activo"
                                  checked={clienteform.activo}
                                  onChange={handleChange}
                                  disabled={modoVisualizacion ? true : false}
                                />
                                <label htmlFor="activo"> Activo</label>
                              </div>
                            </div>
                          </div>
                        </Tab>
                      </Tabs>
                    </div>
                  </div>
                  <div className="md:col-span-12 text-right content-end">
                    <div className="space-x-5 space-y-5 flex justify-end">
                      {!modoVisualizacion && (
                        <button
                          id="btnGuardar"
                          className="bg-red-500 hover-bg-red-400 text-white font-bold py-4 px-6 rounded-md focus-outline-none focus-ring-2 focus-ring-red-500 flex items-center text-md"
                          onClick={handleSubmit}
                          disabled={modoVisualizacion}
                        >
                          <MdSave className="w-6 h-6 mr-2" />
                          Guardar
                        </button>
                      )}
                    </div>
                    <Spacer y={20} />
                  </div>
                </div>
              </div>
            </form>
          </main>
        </div>
      </>
    );
}

export default Customer;