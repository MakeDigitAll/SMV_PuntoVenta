import React, { useState, useEffect } from "react";
import {
    Modal,
    Button,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalContent,
    ScrollShadow,
    Accordion,
    AccordionItem,
    Checkbox,
} from "@nextui-org/react";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

const ModalUserInfo = ({ onClose, data }) => {
    const { t } = useTranslation();
    const [visible, setVisible] = useState(true);
    const [selectedData, setSelectedData] = useState({});
    const [selectAllDashboard, setSelectAllDashboard] = useState(false);
const [selectedDashboard, setSelectedDashboard] = useState ({
    ventas_del_mes: false,
    ventas_del_ano: false,
    ventas_del_dia_por_agente: false,
    ventas_del_mes_por_agente: false,
    top_5_desplazamiento: false,
    inventario: false,
    mensajes_desde_la_pagina: false,
    tareas_agendadas: false,
});

const [selectedAllVentas, setSelectedAllVentas] = useState(false);
const [selectedVentas, setSelectedVentas] = useState ({
    ver_cotizaciones: false,
    descuentos: false,
    crear_cotizaciones: false,
    editar_cotizaciones: false,
    generacion_de_pedidos: false,
    modificar_precios: false,
    consultar_cotizaciones_de_todos: false,
    acceso_a_cotizaciones_expiradas: false,
    consultar_reporte_de_margen_de_ventas: false,
    consultar_reporte_de_ventas: false,
    ver_tipos_de_cambio: false,
    capturar_tipos_de_cambio: false,
    eliminar_tipo_de_cambio: false,
    ver_cobranza: false,
    mover_a_cuenta_cobranza: false,
    extender_fecha: false,
    ver_movimientos: false,
    mover_a_cuenta_caja_general: false,
    mover_a_cobranza: false,
    consultar_surtido_de_pedidos: false,
    consultar_surtido_de_todos: false,
    abrir_pedidos_surtidos: false,
    ver_pedidos: false,
    capturar_formas_de_pago: false,
    surtido_de_pedidos: false,
    cancelar_pedido: false,
    procesar_pedido: false,
    guardar_pedido: false,
    cancelacion_de_pedido: false,
    consultar_pedido_de_todos: false,
    reporte_de_facturas: false,
    facturar_pedido: false,
    consultar_notas_de_credito: false,
    consultar_complementos_de_pago: false,
    generar_notas_de_credito: false,
    generar_complemento_de_pago: false,
    consultar_reporte_de_cobranza: false,
    surtir_pedido: false,
});

    const closeHandler = (response) => {
        setVisible(false);
        onClose(response);
    };

    const setDefaultValues = (tipo, valor) => {
        setSelectedData({
            ...selectedData,
            [tipo]: valor,
        });
    };


    const handleSubmmit = async () => {
        const idPerfilSeguridad = data.id;

        //Post
        try {
            const res = await fetch(`https://localhost:4000/PerfilesSeguridad/${idPerfilSeguridad}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(selectedData),
            });
            if (res.ok) {
                toast.success("Datos Guardados", {
                    position: "bottom-right",
                    theme: "colored",
                });
                onClose(true);
            } else {
                console.error("Error al crear el elemento", res.statusText);
            }
        } catch (error) {
            toast.error("Error al guardar los datos", {
                position: "bottom-right",
                theme: "colored",
            });
        }
    }


    //obtener los datos del perfil de seguridad
    const getPerfilSeguridad = async () => {
        const idPerfilSeguridad = data.id;
        try {
            const res = await fetch(`https://localhost:4000/PerfilesSeguridad/${idPerfilSeguridad}`);
            const data = await res.json();
            setSelectedData(data);
        } catch (error) {
            console.error(error);
        }
    };

    const initializeEditMode = async () => {
        await getPerfilSeguridad();
      
        console.log('Selected Dashboard Before:', selectedDashboard);
        const selectedDashboardData = Object.fromEntries(
          Object.entries(selectedDashboard).filter(([key, value]) => value)
        );
        console.log('Selected Dashboard After:', selectedDashboardData);
      
        setSelectAllDashboard(
          Object.values(selectedDashboardData).length === Object.keys(selectedDashboard).length
        );
      
        console.log('Selected Ventas Before:', selectedVentas);
        const selectedVentasData = Object.fromEntries(
          Object.entries(selectedVentas).filter(([key, value]) => value)
        );
        console.log('Selected Ventas After:', selectedVentasData);
      
        setSelectedAllVentas(Object.values(selectedVentasData).length === Object.keys(selectedVentas).length);
      
        // Update the selectedData for both sections
        const newSelectedData = {
          ...selectedDashboardData,
          ...selectedVentasData,
          // Add similar logic for other sections
        };
        console.log('Selected Data:', newSelectedData);
      
        setSelectedData((prevSelectedData) => ({ ...prevSelectedData, ...newSelectedData }));
      };
      

    useEffect(() => {
        initializeEditMode();
    }
        , []);

///////////////////////////// FUNCION DE SELECCIONAR TODO PARA LOS DIFERENTES SUBMENUS //////////////////////


const handleSelectAllDashboard = () => {
    const newSelectAll = !selectAllDashboard;
    setSelectAllDashboard(newSelectAll);

    // Update the selectedData for Dashboard
    const newSelectedData = Object.fromEntries(
      Object.keys(selectedDashboard).map((key) => [key, newSelectAll])
    );
    setSelectedData((prevSelectedData) => ({ ...prevSelectedData, ...newSelectedData }));
  };

  const handleSelectAllVentas = () => {
    setSelectedAllVentas((prevSelectAll) => !prevSelectAll);
    const newSelectedData = Object.fromEntries(
      Object.keys(selectedVentas).map((key) => [key, !selectedAllVentas])
    );
    setSelectedData(newSelectedData);
  };

////////////////////////////////////////// FIN DE SELECCIONAR TODO /////////////////////////////////////////


    return (
      <Modal
        size="5xl"
        isOpen={visible}
        aria-labelledby="modal-signup"
        onClose={closeHandler}
        backdrop="blur"
        isDismissable={false}
        scrollBehavior="inside"
        placement="auto"
      >
        <ModalContent>
          <>
            <ModalHeader></ModalHeader>
            <ModalBody>
              <ScrollShadow size={0} className="h-[700px]">
                <Accordion>
                  <AccordionItem
                    key="1"
                    aria-label="Dashboard"
                    title="Dashboard"
                  >
                    <div className="flex flex-col">
                      <div
                        className="flex flex-col items-end "
                        style={{ overflow: "hidden" }}
                      >
                        <Checkbox
                          className="mb-2"
                          onValueChange={handleSelectAllDashboard}
                          isSelected={selectAllDashboard}
                        >
                          Seleccionar Todo
                        </Checkbox>
                      </div>
                      <Checkbox
                        onValueChange={() =>
                          setDefaultValues(
                            "ventas_del_mes",
                            !selectedDashboard.ventas_del_mes ||
                              selectedData.ventas_del_mes
                              ? false
                              : true
                          )
                        }
                        isSelected={selectedData.ventas_del_mes}
                      >
                        Ventas del mes
                      </Checkbox>
                      <Checkbox
                        onValueChange={() =>
                          setDefaultValues(
                            "ventas_del_ano",
                            selectedData.ventas_del_ano ? false : true
                          )
                        }
                        isSelected={selectedData.ventas_del_ano}
                      >
                        Ventas del año
                      </Checkbox>
                      <Checkbox
                        onValueChange={() =>
                          setDefaultValues(
                            "ventas_del_dia_por_agente",
                            selectedData.ventas_del_dia_por_agente
                              ? false
                              : true
                          )
                        }
                        isSelected={selectedData.ventas_del_dia_por_agente}
                      >
                        Ventas del día por agente
                      </Checkbox>
                      <Checkbox
                        onValueChange={() =>
                          setDefaultValues(
                            "ventas_del_mes_por_agente",
                            selectedData.ventas_del_mes_por_agente
                              ? false
                              : true
                          )
                        }
                        isSelected={selectedData.ventas_del_mes_por_agente}
                      >
                        Ventas del mes por agente
                      </Checkbox>
                      <Checkbox
                        onValueChange={() =>
                          setDefaultValues(
                            "top_5_desplazamiento",
                            selectedData.top_5_desplazamiento ? false : true
                          )
                        }
                        isSelected={selectedData.top_5_desplazamiento}
                      >
                        Top 5 desplazamiento
                      </Checkbox>
                      <Checkbox
                        onValueChange={() =>
                          setDefaultValues(
                            "inventario",
                            selectedData.inventario ? false : true
                          )
                        }
                        isSelected={selectedData.inventario}
                      >
                        Inventario
                      </Checkbox>
                      <Checkbox
                        onValueChange={() =>
                          setDefaultValues(
                            "mensajes_desde_la_pagina",
                            selectedData.mensajes_desde_la_pagina ? false : true
                          )
                        }
                        isSelected={selectedData.mensajes_desde_la_pagina}
                      >
                        Mensajes desde la página
                      </Checkbox>
                      <Checkbox
                        onValueChange={() =>
                          setDefaultValues(
                            "tareas_agendadas",
                            selectedData.tareas_agendadas ? false : true
                          )
                        }
                        isSelected={selectedData.tareas_agendadas}
                      >
                        Tareas agendadas
                      </Checkbox>
                    </div>
                  </AccordionItem>

                  <AccordionItem key="2" aria-label="Ventas" title="Ventas">
                    <div className="flex flex-col">
                      <div
                        className="flex flex-col items-end "
                        style={{ overflow: "hidden" }}
                      >
                        <Checkbox
                          className="mb-2"
                          onValueChange={handleSelectAllVentas}
                          isSelected={selectedAllVentas}
                        >
                          Seleccionar Todo
                        </Checkbox>
                      </div>
                      <text>Cotizaciones</text>
                      <Checkbox
                        onValueChange={() =>
                          setDefaultValues(
                            "ver_cotizaciones",
                            !selectedVentas.ver_cotizaciones ||
                              selectedData.ver_cotizaciones
                              ? false
                              : true
                          )
                        }
                        isSelected={selectedData.ver_cotizaciones}
                      >
                        Ver cotizaciones
                      </Checkbox>
                      <Checkbox
                        onValueChange={() =>
                          setDefaultValues(
                            "descuentos",
                            selectedData.descuentos ? false : true
                          )
                        }
                        isSelected={selectedData.descuentos}
                      >
                        Ver Descuentos
                      </Checkbox>
                      <Checkbox
                        onValueChange={() =>
                          setDefaultValues(
                            "crear_cotizaciones",
                            selectedData.crear_cotizaciones ? false : true
                          )
                        }
                        isSelected={selectedData.crear_cotizaciones}
                      >
                        Crear cotizaciones
                      </Checkbox>
                      <Checkbox
                        onValueChange={() =>
                          setDefaultValues(
                            "editar_cotizaciones",
                            selectedData.editar_cotizaciones ? false : true
                          )
                        }
                        isSelected={selectedData.editar_cotizaciones}
                      >
                        Editar cotizaciones
                      </Checkbox>
                      <Checkbox>Cancelar Cotización</Checkbox>
                      <Checkbox
                        onValueChange={() =>
                          setDefaultValues(
                            "modificar_precios",
                            selectedData.modificar_precios ? false : true
                          )
                        }
                        isSelected={selectedData.modificar_precios}
                      >
                        Modificar precios
                      </Checkbox>
                      <Checkbox
                        onValueChange={() =>
                          setDefaultValues(
                            "consultar_cotizaciones_de_todos",
                            selectedData.consultar_cotizaciones_de_todos
                              ? false
                              : true
                          )
                        }
                        isSelected={
                          selectedData.consultar_cotizaciones_de_todos
                        }
                      >
                        Consultar cotizaciones de todos
                      </Checkbox>
                      <Checkbox
                        onValueChange={() =>
                          setDefaultValues(
                            "acceso_a_cotizaciones_expiradas",
                            selectedData.acceso_a_cotizaciones_expiradas
                              ? false
                              : true
                          )
                        }
                        isSelected={
                          selectedData.acceso_a_cotizaciones_expiradas
                        }
                      >
                        Acceso a cotizaciones expiradas
                      </Checkbox>
                      <text>Pedidos</text>
                      <Checkbox
                        onValueChange={() =>
                          setDefaultValues(
                            "ver_pedidos",
                            selectedData.ver_pedidos ? false : true
                          )
                        }
                        isSelected={selectedData.ver_pedidos}
                      >
                        Ver pedidos
                      </Checkbox>
                      <Checkbox
                        onValueChange={() =>
                          setDefaultValues(
                            "generacion_de_pedidos",
                            selectedData.generacion_de_pedidos ? false : true
                          )
                        }
                        isSelected={selectedData.generacion_de_pedidos}
                      >
                        Generar pedido
                      </Checkbox>
                      <Checkbox>Editar pedido</Checkbox>
                      <Checkbox
                        onValueChange={() =>
                          setDefaultValues(
                            "cancelar_pedido",
                            selectedData.cancelar_pedido ? false : true
                          )
                        }
                        isSelected={selectedData.cancelar_pedido}
                      >
                        Cancelar pedido
                      </Checkbox>
                      <Checkbox
                        onValueChange={() =>
                          setDefaultValues(
                            "procesar_pedido",
                            selectedData.procesar_pedido ? false : true
                          )
                        }
                        isSelected={selectedData.procesar_pedido}
                      >
                        Procesar pedido
                      </Checkbox>
                      <text>Surtir pedidos</text>
                      <Checkbox
                        onValueChange={() =>
                          setDefaultValues(
                            "consultar_surtido_de_pedidos",
                            selectedData.consultar_surtido_de_pedidos
                              ? false
                              : true
                          )
                        }
                        isSelected={selectedData.consultar_surtido_de_pedidos}
                      >
                        Consultar surtido de pedidos
                      </Checkbox>
                      <Checkbox
                        onValueChange={() =>
                          setDefaultValues(
                            "consultar_surtido_de_todos",
                            selectedData.consultar_surtido_de_todos
                              ? false
                              : true
                          )
                        }
                        isSelected={selectedData.consultar_surtido_de_todos}
                      >
                        Consultar surtido de todos
                      </Checkbox>
                      <Checkbox
                        onValueChange={() =>
                          setDefaultValues(
                            "abrir_pedidos_surtidos",
                            selectedData.abrir_pedidos_surtidos ? false : true
                          )
                        }
                        isSelected={selectedData.abrir_pedidos_surtidos}
                      >
                        Abrir pedidos surtidos
                      </Checkbox>
                      <Checkbox>Editar Surtido de pedidos</Checkbox>
                      <Checkbox>Cancelar surtido pedido</Checkbox>
                      <text>Pagos</text>
                      <Checkbox>Ver Pedidos</Checkbox>
                      <Checkbox>Nuevo Pago</Checkbox>
                      <Checkbox>Editar Pago</Checkbox>
                      <Checkbox>Cancelar Pago</Checkbox>
                      <text>Promociones</text>
                      <Checkbox>Ver Promociones</Checkbox>
                      <Checkbox>Agregar Promociones a productos</Checkbox>
                      <Checkbox>Editar Promocion a producto</Checkbox>
                      <Checkbox>Cancelar Promocion a producto</Checkbox>
                      <text>Inventario</text>
                      <Checkbox>Ver inventario</Checkbox>
                      <Checkbox>Agregar Inventario</Checkbox>
                      <Checkbox>Editar Inventario</Checkbox>
                      <Checkbox>Cancelar Inventario</Checkbox>
                      <text>Visitas</text>
                      <Checkbox>Ver Visitas</Checkbox>
                      <Checkbox>Agregar Visitas</Checkbox>
                      <Checkbox>Editar Visitas</Checkbox>
                      <Checkbox>Cancelar Visita</Checkbox>
                    </div>
                  </AccordionItem>

                  <AccordionItem
                    key="3"
                    aria-label="Facturación"
                    title="Facturación"
                  >
                    <div className="flex flex-col">
                      <div
                        className="flex flex-col items-end "
                        style={{ overflow: "hidden" }}
                      >
                        <Checkbox className="mb-2">Seleccionar Todo</Checkbox>
                      </div>
                      <text>Reporte Facturas</text>
                      <Checkbox>Ver Rpt. Factura</Checkbox>
                      <Checkbox>Nuevo Rpt. Factura</Checkbox>
                      <Checkbox>Editar Rpt. Factura</Checkbox>
                      <Checkbox>Deshabilitar Rpt. Factura</Checkbox>
                      <text>Fact. Global</text>
                      <Checkbox>Ver Fact. Global</Checkbox>
                      <Checkbox>Crear Fact. Global</Checkbox>
                      <Checkbox>Editar Fact. Global</Checkbox>
                      <Checkbox>Deshabilitar Fact. Global</Checkbox>
                      <text>Notas de Credito</text>
                      <Checkbox>Ver Nota de credito</Checkbox>
                      <Checkbox>Crear Nota de credito</Checkbox>
                      <Checkbox>Editar Nota de credito</Checkbox>
                      <Checkbox>Deshabilitar Nota de credito</Checkbox>
                      <text>Complementos de Pago</text>
                      <Checkbox>Ver Complemento de pago</Checkbox>
                      <Checkbox>Crear Complemento de pago</Checkbox>
                      <Checkbox>Editar Complemento de pago</Checkbox>
                      <Checkbox>Deshabilitar Complemento de pago</Checkbox>
                    </div>
                  </AccordionItem>
                  <AccordionItem
                    key="4"
                    aria-label="Administración"
                    title="Administración"
                  >
                    <div className="flex flex-col">
                      <div
                        className="flex flex-col items-end "
                        style={{ overflow: "hidden" }}
                      >
                        <Checkbox className="mb-2">Seleccionar Todo</Checkbox>
                      </div>
                      <text>Financiero: </text>
                      <text>Cobranza del Día</text>
                      <Checkbox>Ver Cobranza del día</Checkbox>
                      <Checkbox>Registrar Cobranza</Checkbox>
                      <Checkbox>Editar Cobranza</Checkbox>
                      <Checkbox>Cancelar Cobranza</Checkbox>
                      <text>Créditos</text>
                      <Checkbox>Registrar Crédito</Checkbox>
                      <Checkbox>Ver Crédito</Checkbox>
                      <Checkbox>Editar Crédito</Checkbox>
                      <Checkbox>Cancelar Crédito</Checkbox>
                      <text>Estados de Cuenta</text>
                      <Checkbox>Ver Estado de cuenta</Checkbox>
                      <Checkbox>Registrar Estado de cuenta</Checkbox>
                      <Checkbox>Editar Estado de cuenta</Checkbox>
                      <Checkbox>Cancelar Estado de cuenta</Checkbox>
                      <text>Operaciones: </text>
                      <text>Margen Ventas</text>
                      <Checkbox>Ver Margen de venta</Checkbox>
                      <Checkbox>Registrar Margen de venta</Checkbox>
                      <Checkbox>Editar Margen de venta</Checkbox>
                      <Checkbox>Cancelar Margen de venta</Checkbox>
                      <text>Reporte Ventas</text>
                      <Checkbox>Ver Reporte de venta</Checkbox>
                      <Checkbox>Registrar Reporte de venta</Checkbox>
                      <Checkbox>Editar Reporte de venta</Checkbox>
                      <Checkbox>Cancelar Reporte de venta</Checkbox>
                      <text>Listado de Precios</text>
                      <Checkbox>Ver Listado Precio</Checkbox>
                      <Checkbox>Crear Listado Precio</Checkbox>
                      <Checkbox>Editar Listado Precio</Checkbox>
                      <Checkbox>Eliminar Listado Precio</Checkbox>
                      <text>Descuentos</text>
                      <Checkbox>Ver Descuento</Checkbox>
                      <Checkbox>Registrar Descuento</Checkbox>
                      <Checkbox>Editar Descuento</Checkbox>
                      <Checkbox>Cancelar Descuento</Checkbox>
                      <text>Token de Descuentos</text>
                      <Checkbox>Ver Token de descuento</Checkbox>
                      <Checkbox>Crear Token de Descuento</Checkbox>
                      <Checkbox>Editar Token de Descuento</Checkbox>
                      <Checkbox>Eliminar Token de Descuento</Checkbox>
                      <text>Tipo de Cambio</text>
                      <Checkbox>Ver tipo de Cambio</Checkbox>
                      <Checkbox>Registrar Tipo de Cambio</Checkbox>
                      <Checkbox>Editar Tipo de Cambio</Checkbox>
                      <Checkbox>Eliminar Tipo de Cambio</Checkbox>
                      <text>Vendedores: </text>
                      <text>Comisiones</text>
                      <Checkbox>Ver comisión</Checkbox>
                      <Checkbox>Registrar Comisión</Checkbox>
                      <Checkbox>Editar Comisión</Checkbox>
                      <Checkbox>Eliminar Comisión</Checkbox>
                      <text>Rpt. Comisiones</text>
                      <Checkbox>Ver Rpt. Comision</Checkbox>
                      <Checkbox>Crear Rpt. Comision</Checkbox>
                      <Checkbox>Editar Rpt. Comision</Checkbox>
                      <Checkbox>Cancelar Rpt. Comision</Checkbox>
                      <text>Comisiones Agrupado</text>
                      <Checkbox>Ver Comisiones Agrupado</Checkbox>
                      <Checkbox>Registrar Comisiones Agrupado</Checkbox>
                      <Checkbox>Editar Comisiones Agrupado</Checkbox>
                      <Checkbox>Cancelar Comisiones Agrupado</Checkbox>
                    </div>
                  </AccordionItem>

                  <AccordionItem key="5" aria-label="Clientes" title="Clientes">
                    <div className="flex flex-col">
                      <div
                        className="flex flex-col items-end "
                        style={{ overflow: "hidden" }}
                      >
                        <Checkbox className="mb-2">Seleccionar Todo</Checkbox>
                      </div>
                      <text>Clientes</text>
                      <Checkbox>Nuevo cliente</Checkbox>
                      <Checkbox>Ver cliente</Checkbox>
                      <Checkbox>Editar cliente</Checkbox>
                      <Checkbox>Eliminar cliente</Checkbox>
                    </div>
                  </AccordionItem>

                  <AccordionItem
                    key="6"
                    aria-label="Vendedores"
                    title="Vendedores"
                  >
                    <div className="flex flex-col">
                      <div
                        className="flex flex-col items-end "
                        style={{ overflow: "hidden" }}
                      >
                        <Checkbox className="mb-2">Seleccionar Todo</Checkbox>
                      </div>
                      <text>Vendedores</text>
                      <Checkbox
                        onValueChange={() =>
                          setDefaultValues(
                            "ver_catalogo_de_vendedores",
                            selectedData.ver_catalogo_de_vendedores
                              ? false
                              : true
                          )
                        }
                        isSelected={selectedData.ver_catalogo_de_vendedores}
                      >
                        Ver vendedores
                      </Checkbox>
                      <Checkbox
                        onValueChange={() =>
                          setDefaultValues(
                            "crear_nuevo_vendedor",
                            selectedData.crear_nuevo_vendedor ? false : true
                          )
                        }
                        isSelected={selectedData.crear_nuevo_vendedor}
                      >
                        Crear nuevo vendedor
                      </Checkbox>
                      <Checkbox
                        onValueChange={() =>
                          setDefaultValues(
                            "editar_vendedor",
                            selectedData.editar_vendedor ? false : true
                          )
                        }
                        isSelected={selectedData.editar_vendedor}
                      >
                        Editar vendedor
                      </Checkbox>
                      <Checkbox
                        onValueChange={() =>
                          setDefaultValues(
                            "eliminar_vendedor",
                            selectedData.eliminar_vendedor ? false : true
                          )
                        }
                        isSelected={selectedData.eliminar_vendedor}
                      >
                        Eliminar vendedor
                      </Checkbox>
                    </div>
                  </AccordionItem>

                  <AccordionItem
                    key="7"
                    aria-label="Proveedores"
                    title="Proveedores"
                  >
                    <div className="flex flex-col">
                      <div
                        className="flex flex-col items-end "
                        style={{ overflow: "hidden" }}
                      >
                        <Checkbox className="mb-2">Seleccionar Todo</Checkbox>
                      </div>
                      <text>Proveedores</text>
                      <Checkbox
                        onValueChange={() =>
                          setDefaultValues(
                            "ver_catalogo_de_proveedores",
                            selectedData.ver_catalogo_de_proveedores
                              ? false
                              : true
                          )
                        }
                        isSelected={selectedData.ver_catalogo_de_proveedores}
                      >
                        Ver catálogo de proveedores
                      </Checkbox>
                      <Checkbox
                        onValueChange={() =>
                          setDefaultValues(
                            "crear_nuevo_proveedor",
                            selectedData.crear_nuevo_proveedor ? false : true
                          )
                        }
                        isSelected={selectedData.crear_nuevo_proveedor}
                      >
                        Crear nuevo proveedor
                      </Checkbox>
                      <Checkbox
                        onValueChange={() =>
                          setDefaultValues(
                            "editar_proveedor",
                            selectedData.editar_proveedor ? false : true
                          )
                        }
                        isSelected={selectedData.editar_proveedor}
                      >
                        Editar proveedor
                      </Checkbox>
                      <Checkbox
                        onValueChange={() =>
                          setDefaultValues(
                            "eliminar_proveedor",
                            selectedData.eliminar_proveedor ? false : true
                          )
                        }
                        isSelected={selectedData.eliminar_proveedor}
                      >
                        Eliminar proveedor
                      </Checkbox>
                    </div>
                  </AccordionItem>

                  <AccordionItem
                    key="8"
                    aria-label="Productos"
                    title="Productos"
                  >
                    <div className="flex flex-col">
                      <div
                        className="flex flex-col items-end "
                        style={{ overflow: "hidden" }}
                      >
                        <Checkbox className="mb-2">Seleccionar Todo</Checkbox>
                      </div>
                      <text>Productos</text>
                      <Checkbox
                        onValueChange={() =>
                          setDefaultValues(
                            "ver_catalogo_de_productos",
                            selectedData.ver_catalogo_de_productos
                              ? false
                              : true
                          )
                        }
                        isSelected={selectedData.ver_catalogo_de_productos}
                      >
                        Ver productos
                      </Checkbox>
                      <Checkbox>Agregar nuevos productos</Checkbox>
                      <Checkbox
                        onValueChange={() =>
                          setDefaultValues(
                            "editar_productos",
                            selectedData.editar_productos ? false : true
                          )
                        }
                        isSelected={selectedData.editar_productos}
                      >
                        Editar productos
                      </Checkbox>
                      <Checkbox
                        onValueChange={() =>
                          setDefaultValues(
                            "eliminar_productos",
                            selectedData.eliminar_productos ? false : true
                          )
                        }
                        isSelected={selectedData.eliminar_productos}
                      >
                        Eliminar productos
                      </Checkbox>
                      <Checkbox
                        onValueChange={() =>
                          setDefaultValues(
                            "consultar_productos_desactivados",
                            selectedData.consultar_productos_desactivados
                              ? false
                              : true
                          )
                        }
                        isSelected={
                          selectedData.consultar_productos_desactivados
                        }
                      >
                        Consultar productos desactivados
                      </Checkbox>
                      <text>Descuentos</text>
                      <Checkbox
                        onValueChange={() =>
                          setDefaultValues(
                            "ver_catalogo_de_descuentos",
                            selectedData.ver_catalogo_de_descuentos
                              ? false
                              : true
                          )
                        }
                        isSelected={selectedData.ver_catalogo_de_descuentos}
                      >
                        Ver catálogo de descuentos
                      </Checkbox>
                      <Checkbox
                        onValueChange={() =>
                          setDefaultValues(
                            "crear_nuevos_descuentos",
                            selectedData.crear_nuevos_descuentos ? false : true
                          )
                        }
                        isSelected={selectedData.crear_nuevos_descuentos}
                      >
                        Crear nuevos descuentos
                      </Checkbox>
                      <Checkbox
                        onValueChange={() =>
                          setDefaultValues(
                            "editar_descuentos",
                            selectedData.editar_descuentos ? false : true
                          )
                        }
                        isSelected={selectedData.editar_descuentos}
                      >
                        Editar descuentos
                      </Checkbox>
                      <Checkbox
                        onValueChange={() =>
                          setDefaultValues(
                            "eliminar_descuento",
                            selectedData.eliminar_descuento ? false : true
                          )
                        }
                        isSelected={selectedData.eliminar_descuento}
                      >
                        Eliminar descuento
                      </Checkbox>
                    </div>
                  </AccordionItem>

                  <AccordionItem key="9" aria-label="Almacén" title="Almacén">
                    <div className="flex flex-col">
                      <div
                        className="flex flex-col items-end "
                        style={{ overflow: "hidden" }}
                      >
                        <Checkbox className="mb-2">Seleccionar Todo</Checkbox>
                      </div>
                      <text>Almacén: </text>
                      <text>Surtir Pedidos</text>
                      <Checkbox>Nuevo Surtir Pedido</Checkbox>
                      <Checkbox>Ver Surtido Pedido</Checkbox>
                      <Checkbox>Editar Surtido Pedido</Checkbox>
                      <Checkbox>Cancelar Surtido Pedido</Checkbox>
                      <text>Logistica</text>
                      <Checkbox>Nuevo Logistica</Checkbox>
                      <Checkbox>Ver Logistica</Checkbox>
                      <Checkbox>Editar Logistica</Checkbox>
                      <Checkbox>Eliminar Logistica</Checkbox>
                      <text>Entradas de ALmacén</text>
                      <Checkbox>Nueva Entrada Almacén</Checkbox>
                      <Checkbox>Ver Entrada Almacén</Checkbox>
                      <Checkbox>Editar Entrada Almacén</Checkbox>
                      <Checkbox>Eliminar Entrada Almacén</Checkbox>
                      <text>Salidas de Almacén</text>
                      <Checkbox>Nuevo Salida Almacén</Checkbox>
                      <Checkbox>Ver Salida Almacén</Checkbox>
                      <Checkbox>Editar Salida Almacén</Checkbox>
                      <Checkbox>Eliminar Salida Almacén</Checkbox>
                      <text>Inventario</text>
                      {/* <Checkbox>Nuevo Inventario</Checkbox> */}
                      <Checkbox>Ver Inventario</Checkbox>
                      {/* <Checkbox>Editar Inventario</Checkbox>
                      <Checkbox>Eliminar Inventario</Checkbox> */}
                      <text>Inv. X Almacén</text>
                      <Checkbox>Nuevo Inv. X Almacén</Checkbox>
                      <Checkbox>Ver Inv. X Almacén</Checkbox>
                      <Checkbox>Editar Inv. X Almacén</Checkbox>
                      <Checkbox>Eliminar Inv. X Almacén</Checkbox>
                      <text>Transferencias</text>
                      <Checkbox>Nueva Transferencia</Checkbox>
                      <Checkbox>Ver Transferencia</Checkbox>
                      <Checkbox>Editar Transferencia</Checkbox>
                      <Checkbox>Eliminar Transferencia</Checkbox>
                      <text>Transferencias Masivas</text>
                      <Checkbox>Nueva Transferencia Masiva</Checkbox>
                      <Checkbox>Ver Transferencia Masiva</Checkbox>
                      <Checkbox>Editar Transferencia Masiva</Checkbox>
                      <Checkbox>Eliminar Transferencia Masiva</Checkbox>
                      <text>Captura: </text>
                      <text>Marcas</text>
                      <Checkbox
                        onValueChange={() =>
                          setDefaultValues(
                            "ver_catalogo_de_marcas",
                            selectedData.ver_catalogo_de_marcas ? false : true
                          )
                        }
                        isSelected={selectedData.ver_catalogo_de_marcas}
                      >
                        Ver Marca
                      </Checkbox>
                      <Checkbox
                        onValueChange={() =>
                          setDefaultValues(
                            "crear_nueva_marca",
                            selectedData.crear_nueva_marca ? false : true
                          )
                        }
                        isSelected={selectedData.crear_nueva_marca}
                      >
                        Crear nueva marca
                      </Checkbox>
                      <Checkbox
                        onValueChange={() =>
                          setDefaultValues(
                            "editar_marca",
                            selectedData.editar_marca ? false : true
                          )
                        }
                        isSelected={selectedData.editar_marca}
                      >
                        Editar marca
                      </Checkbox>
                      <Checkbox
                        onValueChange={() =>
                          setDefaultValues(
                            "eliminar_marca",
                            selectedData.eliminar_marca ? false : true
                          )
                        }
                        isSelected={selectedData.eliminar_marca}
                      >
                        Eliminar marca
                      </Checkbox>
                      <text>Categorias</text>
                      <Checkbox
                        onValueChange={() =>
                          setDefaultValues(
                            "ver_categoria",
                            selectedData.ver_categoria ? false : true
                          )
                        }
                        isSelected={selectedData.ver_categoria}
                      >
                        Ver categoría
                      </Checkbox>
                      <Checkbox
                        onValueChange={() =>
                          setDefaultValues(
                            "crear_nueva_categoria",
                            selectedData.crear_nueva_categoria ? false : true
                          )
                        }
                        isSelected={selectedData.crear_nueva_categoria}
                      >
                        Crear nueva categoría
                      </Checkbox>
                      <Checkbox
                        onValueChange={() =>
                          setDefaultValues(
                            "editar_categorias",
                            selectedData.editar_categorias ? false : true
                          )
                        }
                        isSelected={selectedData.editar_categorias}
                      >
                        Editar categoría
                      </Checkbox>
                      <Checkbox
                        onValueChange={() =>
                          setDefaultValues(
                            "eliminar_categorias",
                            selectedData.eliminar_categorias ? false : true
                          )
                        }
                        isSelected={selectedData.eliminar_categorias}
                      >
                        Eliminar categoría
                      </Checkbox>
                      <text>Importar Datos</text>
                      <Checkbox>Nuevo Importar Datos</Checkbox>
                      <Checkbox>Ver Importación Datos</Checkbox>
                      <Checkbox>Editar Importación Datos</Checkbox>
                      <Checkbox>Eliminar Importación Datos</Checkbox>
                      <text>Compras: </text>
                      <text>Ordenes de Compar</text>
                      <Checkbox>Nueva Orden de Compar</Checkbox>
                      <Checkbox>Ver Orden de Compar</Checkbox>
                      <Checkbox>Editar Orden de Compar</Checkbox>
                      <Checkbox>Eliminar Orden de Compar</Checkbox>
                    </div>
                  </AccordionItem>

                  <AccordionItem
                    key="10"
                    aria-label="Mercadotecnia"
                    title="Mercadotecnia"
                  >
                    <div className="flex flex-col">
                    <div className="flex flex-col items-end " style={{ overflow: 'hidden' }}>
                      <Checkbox className="mb-2">Seleccionar Todo</Checkbox>
                      </div>
                      <text>Rpt. Clientes</text>
                      <Checkbox>Ver Rpt. Cliente</Checkbox>
                      <Checkbox>Agregar Rpt. Cliente</Checkbox>
                      <Checkbox>Editar Rpt. Cliente</Checkbox>
                      <Checkbox>Eliminar Rpt. Cliente</Checkbox>
                      <text>Rpt. Clientes por Fecha</text>
                      <Checkbox>Ver Rpt. Clientes por Fecha</Checkbox>
                      <Checkbox>Agregar Rpt. Clientes por Fecha</Checkbox>
                      <Checkbox>Modificar Rpt. Clientes por Fecha</Checkbox>
                      <Checkbox>Eliminar Rpt. Clientes por Fecha</Checkbox>
                      <text>Cat. Giros</text>
                      <Checkbox>Ver Cat. Giros</Checkbox>
                      <Checkbox>Agregar Cat. Giros</Checkbox>
                      <Checkbox>Editar Cat. Giros</Checkbox>
                      <Checkbox>Eliminar Cat. Giros</Checkbox>
                      <text>Ventas por Cliente</text>
                      <Checkbox>Nueva Ventas por Cliente</Checkbox>
                      <Checkbox>Ver Ventas por Cliente</Checkbox>
                      <Checkbox>Editar Ventas por Cliente</Checkbox>
                      <Checkbox>Eliminar Ventas por Cliente</Checkbox>
                      <text>Margen Productos</text>
                      <Checkbox>Ver Margen Productos</Checkbox>
                      <Checkbox>Nuevo Margen Productos</Checkbox>
                      <Checkbox>Editar Margen Productos</Checkbox>
                      <Checkbox>Eliminar Margen Productos</Checkbox>
                      <text>Costo Productos</text>
                      <Checkbox>Agregar Costo Productos</Checkbox>
                      <Checkbox>Modificar Costo Productos</Checkbox>
                      <Checkbox>Ver Costo Productos</Checkbox>
                      <Checkbox>Eliminar Costo Productos</Checkbox>
                      <text>Record Productos</text>
                      <Checkbox>Ver Record Productos</Checkbox>
                      <Checkbox>Crear Record Productos</Checkbox>
                      <Checkbox>Editar Record Productos</Checkbox>
                      <Checkbox>Eliminar Record Productos</Checkbox>
                      <text>Record Compras</text>
                      <Checkbox>Ver Record Compras</Checkbox>
                      <Checkbox>Agregar Record Compras</Checkbox>
                      <Checkbox>Editar Record Compras</Checkbox>
                      <Checkbox>Eliminar Record Compras</Checkbox>
                    </div>
                  </AccordionItem>

                  <AccordionItem
                    key="11"
                    aria-label="Punto de venta"
                    title="Punto de venta"
                  >
                    <div className="flex flex-col">
                    <div className="flex flex-col items-end " style={{ overflow: 'hidden' }}>
                      <Checkbox className="mb-2">Seleccionar Todo</Checkbox>
                      </div>
                      <text>Inicio</text>
                      <Checkbox>Ver Ventas en el Turno</Checkbox>
                      <Checkbox>Ver Operaciones en el Turno</Checkbox>
                      <text>Ventas</text>
                      <Checkbox
                        onValueChange={() =>
                          setDefaultValues(
                            "nueva_venta",
                            selectedData.nueva_venta ? false : true
                          )
                        }
                        isSelected={selectedData.nueva_venta}
                      >
                        Nueva venta
                      </Checkbox>
                      <Checkbox>Editar Venta</Checkbox>
                      <Checkbox
                        onValueChange={() =>
                          setDefaultValues(
                            "eliminar_venta",
                            selectedData.eliminar_venta ? false : true
                          )
                        }
                        isSelected={selectedData.eliminar_venta}
                      >
                        Eliminar venta
                      </Checkbox>
                      <Checkbox>Nueva Entrada de efectivo</Checkbox>
                      <Checkbox
                        onValueChange={() =>
                          setDefaultValues(
                            "entrada_de_efectivo",
                            selectedData.entrada_de_efectivo ? false : true
                          )
                        }
                        isSelected={selectedData.entrada_de_efectivo}
                      >
                        Ver Entradas de efectivo
                      </Checkbox>
                      <Checkbox>Nueva Salida de efectivo</Checkbox>
                      <Checkbox>Ver Salidas de efectivo</Checkbox>
                      <Checkbox>Crear Ticket</Checkbox>
                      <Checkbox
                        onValueChange={() =>
                          setDefaultValues(
                            "cancelar_ticket",
                            selectedData.cancelar_ticket ? false : true
                          )
                        }
                        isSelected={selectedData.cancelar_ticket}
                      >
                        Cancelar ticket
                      </Checkbox>
                      <Checkbox
                        onValueChange={() =>
                          setDefaultValues(
                            "facturar_ticket",
                            selectedData.facturar_ticket ? false : true
                          )
                        }
                        isSelected={selectedData.facturar_ticket}
                      >
                        Facturar ticket
                      </Checkbox>
                      <text>Clientes</text>
                      <Checkbox
                        onValueChange={() =>
                          setDefaultValues(
                            "nuevo_cliente",
                            selectedData.nuevo_cliente ? false : true
                          )
                        }
                        isSelected={selectedData.nuevo_cliente}
                      >
                        Nuevo cliente
                      </Checkbox>
                      <Checkbox>Ver cliente</Checkbox>
                      <Checkbox
                        onValueChange={() =>
                          setDefaultValues(
                            "editar_cliente",
                            selectedData.editar_cliente ? false : true
                          )
                        }
                        isSelected={selectedData.editar_cliente}
                      >
                        Editar cliente
                      </Checkbox>
                      <Checkbox
                        onValueChange={() =>
                          setDefaultValues(
                            "eliminar_cliente_ventas",
                            selectedData.eliminar_cliente_ventas ? false : true
                          )
                        }
                        isSelected={selectedData.eliminar_cliente_ventas}
                      >
                        Eliminar cliente de ventas
                      </Checkbox>
                      <text>Reportes</text>
                      <Checkbox
                        onValueChange={() =>
                          setDefaultValues(
                            "corte_de_caja",
                            selectedData.corte_de_caja ? false : true
                          )
                        }
                        isSelected={selectedData.corte_de_caja}
                      >
                        Ver Corte de caja
                      </Checkbox>
                      <Checkbox>Obtener Corte de Caja</Checkbox>
                      <text>Productos</text>
                      <Checkbox>Ver Productos</Checkbox>
                    </div>
                  </AccordionItem>

                  <AccordionItem key="12" aria-label="Web" title="Web">
                    <div className="flex flex-col">
                    <div className="flex flex-col items-end " style={{ overflow: 'hidden' }}>
                      <Checkbox className="mb-2">Seleccionar Todo</Checkbox>
                      </div>
                      <text>Prods. Especiales</text>
                      <Checkbox>Ver Prods. Especiales</Checkbox>
                      <Checkbox>Agregar Prods. Especiales</Checkbox>
                      <Checkbox>Editar Prods. Especiales</Checkbox>
                      <Checkbox>Eliminar Prods. Especiales</Checkbox>
                      <text>Banners</text>
                      <Checkbox>Ver Banners</Checkbox>
                      <Checkbox>Agregar Banners</Checkbox>
                      <Checkbox>Editar Banners</Checkbox>
                      <Checkbox>Eliminar Banners</Checkbox>
                      <text>CMS</text>
                      <Checkbox>Ver CMS</Checkbox>
                      <Checkbox>Agregar CMS</Checkbox>
                      <Checkbox>Editar CMS</Checkbox>
                      <Checkbox>Eliminar CMS</Checkbox>
                      <text>Notificaciones Web</text>
                      <Checkbox>Ver Notificaciones Web</Checkbox>
                      <Checkbox>Agregar Notificaciones Web</Checkbox>
                      <Checkbox>Eliminar Notificaciones Web</Checkbox>
                      <text>Usuarios</text>
                      <Checkbox>Ver Usuarios</Checkbox>
                      <Checkbox>Agregar Usuarios</Checkbox>
                      <Checkbox>Editar Usuarios</Checkbox>
                      <Checkbox>Eliminar Usuarios</Checkbox>
                    </div>
                  </AccordionItem>

                  <AccordionItem key="13" aria-label="Ajustes" title="Ajustes">
                    <div className="flex flex-col">
                    <div className="flex flex-col items-end " style={{ overflow: 'hidden' }}>
                      <Checkbox className="mb-2">Seleccionar Todo</Checkbox>
                      </div>
                      <text>Usuarios</text>
                      <Checkbox>Ver Usuarios</Checkbox>
                      <Checkbox>Agregar Usuarios</Checkbox>
                      <Checkbox>Editar Usuarios</Checkbox>
                      <Checkbox>Eliminar Usuarios</Checkbox>
                      <text>Perfiles de Seguridad</text>
                      <Checkbox>Ver Perfiles de Seguridad</Checkbox>
                      <Checkbox>Agregar Perfiles de Seguridad</Checkbox>
                      <Checkbox>Editar Perfiles de Seguridad</Checkbox>
                      <Checkbox>Eliminar Perfiles de Seguridad</Checkbox>
                      <text>Sucursales</text>
                      <Checkbox>Ver Sucursales</Checkbox>
                      <Checkbox>Agregar Sucursales</Checkbox>
                      <Checkbox>Editar Sucursales</Checkbox>
                      <Checkbox>Eliminar Sucursales</Checkbox>
                      <text>Formas de Pago</text>
                      <Checkbox>Ver Formas de Pago</Checkbox>
                      <Checkbox>Agregar Formas de Pago</Checkbox>
                      <Checkbox>Editar Record Compras</Checkbox>
                      <Checkbox>Eliminar Formas de Pago</Checkbox>
                    </div>
                  </AccordionItem>
                </Accordion>
              </ScrollShadow>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onPress={handleSubmmit}>
                {t("Guardar")}
              </Button>
              <Button color="danger" onClick={closeHandler}>
                {t("Cerrar")}
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    );
};

export default ModalUserInfo;
