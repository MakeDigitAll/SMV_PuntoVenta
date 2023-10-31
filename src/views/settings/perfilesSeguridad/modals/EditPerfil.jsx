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


    useEffect(() => {
        getPerfilSeguridad();
    }
        , []);




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
                                <AccordionItem key="1" aria-label="Dashboard" title="Dashboard">
                                    <div className="flex flex-col">
                                        <Checkbox

                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "ventas_del_mes",
                                                    selectedData.ventas_del_mes ? false : true
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
                                                    selectedData.ventas_del_dia_por_agente ? false : true
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
                                                    selectedData.ventas_del_mes_por_agente ? false : true
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
                                        <text>Cotizaciones</text>
                                        <Checkbox

                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "ver_cotizaciones",
                                                    selectedData.ver_cotizaciones ? false : true
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
                                            Descuentos
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
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "generacion_de_pedidos",
                                                    selectedData.generacion_de_pedidos ? false : true
                                                )
                                            }
                                            isSelected={selectedData.generacion_de_pedidos}
                                        >
                                            Generación de pedidos
                                        </Checkbox>
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
                                                    selectedData.consultar_cotizaciones_de_todos ? false : true
                                                )
                                            }
                                            isSelected={selectedData.consultar_cotizaciones_de_todos}
                                        >
                                            Consultar cotizaciones de todos
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "acceso_a_cotizaciones_expiradas",
                                                    selectedData.acceso_a_cotizaciones_expiradas ? false : true
                                                )
                                            }
                                            isSelected={selectedData.acceso_a_cotizaciones_expiradas}
                                        >
                                            Acceso a cotizaciones expiradas
                                        </Checkbox>
                                        <text>Margen De Venta</text>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "consultar_reporte_de_margen_de_ventas",
                                                    selectedData.consultar_reporte_de_margen_de_ventas ? false : true
                                                )
                                            }
                                            isSelected={selectedData.consultar_reporte_de_margen_de_ventas}
                                        >
                                            Consultar reporte de margen de ventas
                                        </Checkbox>
                                        <text>Reporte de ventas</text>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "consultar_reporte_de_ventas",
                                                    selectedData.consultar_reporte_de_ventas ? false : true
                                                )
                                            }
                                            isSelected={selectedData.consultar_reporte_de_ventas}
                                        >
                                            Consultar reporte de ventas
                                        </Checkbox>
                                        <text>Tipo de cambio</text>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "ver_tipos_de_cambio",
                                                    selectedData.ver_tipos_de_cambio ? false : true
                                                )
                                            }
                                            isSelected={selectedData.ver_tipos_de_cambio}
                                        >
                                            Ver tipos de cambio
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "capturar_tipos_de_cambio",
                                                    selectedData.capturar_tipos_de_cambio ? false : true
                                                )
                                            }
                                            isSelected={selectedData.capturar_tipos_de_cambio}
                                        >
                                            Capturar tipos de cambio
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "eliminar_tipo_de_cambio",
                                                    selectedData.eliminar_tipo_de_cambio ? false : true
                                                )
                                            }
                                            isSelected={selectedData.eliminar_tipo_de_cambio}
                                        >
                                            Eliminar tipo de cambio
                                        </Checkbox>
                                        <text>Cobranza</text>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "ver_cobranza",
                                                    selectedData.ver_cobranza ? false : true
                                                )
                                            }
                                            isSelected={selectedData.ver_cobranza}
                                        >
                                            Ver cobranza
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "mover_a_cuenta_cobranza",
                                                    selectedData.mover_a_cuenta_cobranza ? false : true
                                                )
                                            }
                                            isSelected={selectedData.mover_a_cuenta_cobranza}
                                        >
                                            Mover a cuenta cobranza
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "extender_fecha",
                                                    selectedData.extender_fecha ? false : true
                                                )
                                            }
                                            isSelected={selectedData.extender_fecha}
                                        >
                                            Extender fecha
                                        </Checkbox>
                                        <text>Caja General</text>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "ver_movimientos",
                                                    selectedData.ver_movimientos ? false : true
                                                )
                                            }
                                            isSelected={selectedData.ver_movimientos}
                                        >
                                            Ver movimientos
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "mover_a_cuenta_caja_general",
                                                    selectedData.mover_a_cuenta_caja_general ? false : true
                                                )
                                            }
                                            isSelected={selectedData.mover_a_cuenta_caja_general}
                                        >
                                            Mover a cuenta caja general
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "mover_a_cobranza",
                                                    selectedData.mover_a_cobranza ? false : true
                                                )
                                            }
                                            isSelected={selectedData.mover_a_cobranza}
                                        >
                                            Mover a cobranza
                                        </Checkbox>
                                        <text>Surtir pedidos</text>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "surtido_de_pedidos",
                                                    selectedData.surtido_de_pedidos ? false : true
                                                )
                                            }
                                            isSelected={selectedData.surtido_de_pedidos}
                                        >
                                            Surtido de pedidos
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "consultar_surtido_de_pedidos",
                                                    selectedData.consultar_surtido_de_pedidos ? false : true
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
                                                    selectedData.consultar_surtido_de_todos ? false : true
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
                                                    "capturar_formas_de_pago",
                                                    selectedData.capturar_formas_de_pago ? false : true
                                                )
                                            }
                                            isSelected={selectedData.capturar_formas_de_pago}
                                        >
                                            Capturar formas de pago
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "surtir_pedido",
                                                    selectedData.surtir_pedido ? false : true
                                                )
                                            }
                                            isSelected={selectedData.surtir_pedido}
                                        >
                                            Surtido de pedido
                                        </Checkbox>
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
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "guardar_pedido",
                                                    selectedData.guardar_pedido ? false : true
                                                )
                                            }
                                            isSelected={selectedData.guardar_pedido}
                                        >
                                            Guardar pedido
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "cancelacion_de_pedido",
                                                    selectedData.cancelacion_de_pedido ? false : true
                                                )
                                            }
                                            isSelected={selectedData.cancelacion_de_pedido}
                                        >
                                            Cancelación de pedido
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "consultar_pedido_de_todos",
                                                    selectedData.consultar_pedido_de_todos ? false : true
                                                )
                                            }
                                            isSelected={selectedData.consultar_pedido_de_todos}
                                        >
                                            Consultar pedido de todos
                                        </Checkbox>
                                        <text>Facturacion</text>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "reporte_de_facturas",
                                                    selectedData.reporte_de_facturas ? false : true
                                                )
                                            }
                                            isSelected={selectedData.reporte_de_facturas}
                                        >
                                            Reporte de facturas
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "facturar_pedido",
                                                    selectedData.facturar_pedido ? false : true
                                                )
                                            }
                                            isSelected={selectedData.facturar_pedido}
                                        >
                                            Facturar pedido
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "consultar_notas_de_credito",
                                                    selectedData.consultar_notas_de_credito ? false : true
                                                )
                                            }
                                            isSelected={selectedData.consultar_notas_de_credito}
                                        >
                                            Consultar notas de crédito
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "consultar_complementos_de_pago",
                                                    selectedData.consultar_complementos_de_pago ? false : true
                                                )
                                            }
                                            isSelected={selectedData.consultar_complementos_de_pago}
                                        >
                                            Consultar complementos de pago
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "generar_notas_de_credito",
                                                    selectedData.generar_notas_de_credito ? false : true
                                                )
                                            }
                                            isSelected={selectedData.generar_notas_de_credito}
                                        >
                                            Generar notas de crédito
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "generar_complemento_de_pago",
                                                    selectedData.generar_complemento_de_pago ? false : true
                                                )
                                            }
                                            isSelected={selectedData.generar_complemento_de_pago}
                                        >
                                            Generar complemento de pago
                                        </Checkbox>
                                        <text>Reporte de cobranza</text>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "consultar_reporte_de_cobranza",
                                                    selectedData.consultar_reporte_de_cobranza ? false : true
                                                )
                                            }
                                            isSelected={selectedData.consultar_reporte_de_cobranza}
                                        >
                                            Consultar reporte de cobranza
                                        </Checkbox>
                                    </div>
                                </AccordionItem>

                                <AccordionItem key="3" aria-label="Punto de venta" title="Punto de venta">
                                    <div className="flex flex-col">
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
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "registrar_pago",
                                                    selectedData.registrar_pago ? false : true
                                                )
                                            }
                                            isSelected={selectedData.registrar_pago}
                                        >
                                            Registrar pago
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "entrada_de_efectivo",
                                                    selectedData.entrada_de_efectivo ? false : true
                                                )
                                            }
                                            isSelected={selectedData.entrada_de_efectivo}
                                        >
                                            Entrada de efectivo
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "salida_de_efectivo",
                                                    selectedData.salida_de_efectivo ? false : true
                                                )
                                            }
                                            isSelected={selectedData.salida_de_efectivo}
                                        >
                                            Salida de efectivo
                                        </Checkbox>
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
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "adeudo_del_cliente",
                                                    selectedData.adeudo_del_cliente ? false : true
                                                )
                                            }
                                            isSelected={selectedData.adeudo_del_cliente}
                                        >
                                            Adeudo del cliente
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "consultar_ventas",
                                                    selectedData.consultar_ventas ? false : true
                                                )
                                            }
                                            isSelected={selectedData.consultar_ventas}
                                        >
                                            Consultar ventas
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "consultar_cortes",
                                                    selectedData.consultar_cortes ? false : true
                                                )
                                            }
                                            isSelected={selectedData.consultar_cortes}
                                        >
                                            Consultar cortes
                                        </Checkbox>
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
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "devolucion_de_ticket",
                                                    selectedData.devolucion_de_ticket ? false : true
                                                )
                                            }
                                            isSelected={selectedData.devolucion_de_ticket}
                                        >
                                            Devolución de ticket
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "abrir_ticket_de_pago",
                                                    selectedData.abrir_ticket_de_pago ? false : true
                                                )
                                            }
                                            isSelected={selectedData.abrir_ticket_de_pago}
                                        >
                                            Abrir ticket de pago
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
                                            Corte de caja
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "reporte_de_ventas",
                                                    selectedData.reporte_de_ventas ? false : true
                                                )
                                            }
                                            isSelected={selectedData.reporte_de_ventas}
                                        >
                                            Reporte de ventas
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "corte_de_ventas_general",
                                                    selectedData.corte_de_ventas_general ? false : true
                                                )
                                            }
                                            isSelected={selectedData.corte_de_ventas_general}
                                        >
                                            Corte de ventas general
                                        </Checkbox>
                                    </div>
                                </AccordionItem>

                                <AccordionItem key="4" aria-label="Clientes" title="Clientes">
                                    <div className="flex flex-col">
                                        <text>Clientes</text>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "consultar_lista_de_clientes",
                                                    selectedData.consultar_lista_de_clientes ? false : true
                                                )
                                            }
                                            isSelected={selectedData.consultar_lista_de_clientes}
                                        >
                                            Consultar lista de clientes
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "alta_de_nuevo_cliente",
                                                    selectedData.alta_de_nuevo_cliente ? false : true
                                                )
                                            }
                                            isSelected={selectedData.alta_de_nuevo_cliente}
                                        >
                                            Alta de nuevo cliente
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "editar_cliente_completo",
                                                    selectedData.editar_cliente_completo ? false : true
                                                )
                                            }
                                            isSelected={selectedData.editar_cliente_completo}
                                        >
                                            Editar cliente completo
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "editar_cliente_limitado",
                                                    selectedData.editar_cliente_limitado ? false : true
                                                )
                                            }
                                            isSelected={selectedData.editar_cliente_limitado}
                                        >
                                            Editar cliente limitado
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "eliminar_cliente",
                                                    selectedData.eliminar_cliente ? false : true
                                                )
                                            }
                                            isSelected={selectedData.eliminar_cliente}
                                        >
                                            Eliminar cliente
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "consultar_credito",
                                                    selectedData.consultar_credito ? false : true
                                                )
                                            }
                                            isSelected={selectedData.consultar_credito}
                                        >
                                            Consultar crédito
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "consultar_estado_de_cuenta",
                                                    selectedData.consultar_estado_de_cuenta ? false : true
                                                )
                                            }
                                            isSelected={selectedData.consultar_estado_de_cuenta}
                                        >
                                            Consultar estado de cuenta
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "acceso_a_todos_los_clientes",
                                                    selectedData.acceso_a_todos_los_clientes ? false : true
                                                )
                                            }
                                            isSelected={selectedData.acceso_a_todos_los_clientes}
                                        >
                                            Acceso a todos los clientes
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "cambiar_vendedor",
                                                    selectedData.cambiar_vendedor ? false : true
                                                )
                                            }
                                            isSelected={selectedData.cambiar_vendedor}
                                        >
                                            Cambiar vendedor
                                        </Checkbox>
                                        <text>Lista de precios</text>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "ver_listas_de_precios",
                                                    selectedData.ver_listas_de_precios ? false : true
                                                )
                                            }
                                            isSelected={selectedData.ver_listas_de_precios}
                                        >
                                            Ver listas de precios
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "crear_lista_de_precios",
                                                    selectedData.crear_lista_de_precios ? false : true
                                                )
                                            }
                                            isSelected={selectedData.crear_lista_de_precios}
                                        >
                                            Crear listas de precios
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "editar_lista_de_precios",
                                                    selectedData.editar_lista_de_precios ? false : true
                                                )
                                            }
                                            isSelected={selectedData.editar_lista_de_precios}
                                        >
                                            Editar listas de precios
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "eliminar_lista_de_precios",
                                                    selectedData.eliminar_lista_de_precios ? false : true
                                                )
                                            }
                                            isSelected={selectedData.eliminar_lista_de_precios}
                                        >
                                            Eliminar listas de precios
                                        </Checkbox>
                                        <text>Reporte de ventas de clientes</text>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "ver_reporte_de_venta_de_clientes",
                                                    selectedData.ver_reporte_de_venta_de_clientes ? false : true
                                                )
                                            }
                                            isSelected={selectedData.ver_reporte_de_venta_de_clientes}
                                        >
                                            Ver reporte de venta de clientes
                                        </Checkbox>
                                        <text>Estado de cuenta</text>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "ver_estado_de_cuenta",
                                                    selectedData.ver_estado_de_cuenta ? false : true
                                                )
                                            }
                                            isSelected={selectedData.ver_estado_de_cuenta}
                                        >
                                            Ver estado de cuenta
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "ver_detalle",
                                                    selectedData.ver_detalle ? false : true
                                                )
                                            }
                                            isSelected={selectedData.ver_detalle}
                                        >
                                            Ver detalle
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "capturar_pagos",
                                                    selectedData.capturar_pagos ? false : true
                                                )
                                            }
                                            isSelected={selectedData.capturar_pagos}
                                        >
                                            Capturar pagos
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "imprimir_ticket_de_abono",
                                                    selectedData.imprimir_ticket_de_abono ? false : true
                                                )
                                            }
                                            isSelected={selectedData.imprimir_ticket_de_abono}
                                        >
                                            Imprimir ticket de abono
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "cancelar_ticket_de_abono",
                                                    selectedData.cancelar_ticket_de_abono ? false : true
                                                )
                                            }
                                            isSelected={selectedData.cancelar_ticket_de_abono}
                                        >
                                            Cancelar ticket de abono
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "consultar_catalogo_de_mercados",
                                                    selectedData.consultar_catalogo_de_mercados ? false : true
                                                )
                                            }
                                            isSelected={selectedData.consultar_catalogo_de_mercados}
                                        >
                                            Consultar catálogo de mercados
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "crear_nuevo_mercado",
                                                    selectedData.crear_nuevo_mercado ? false : true
                                                )
                                            }
                                            isSelected={selectedData.crear_nuevo_mercado}
                                        >
                                            Crear nuevo mercado
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "editar_mercado",
                                                    selectedData.editar_mercado ? false : true
                                                )
                                            }
                                            isSelected={selectedData.editar_mercado}
                                        >
                                            Editar mercado
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "eliminar_mercado",
                                                    selectedData.eliminar_mercado ? false : true
                                                )
                                            }
                                            isSelected={selectedData.eliminar_mercado}
                                        >
                                            Editar mercado
                                        </Checkbox>





                                    </div>
                                </AccordionItem>

                                <AccordionItem key="5" aria-label="Vendedores" title="Vendedores">
                                    <div className="flex flex-col">
                                        <text>Vendedores</text>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "ver_catalogo_de_vendedores",
                                                    selectedData.ver_catalogo_de_vendedores ? false : true
                                                )
                                            }
                                            isSelected={selectedData.ver_catalogo_de_vendedores}
                                        >
                                            Ver catálogo de vendedores
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
                                        <text>Registro de visitas</text>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "consultar_registro_de_visitas",
                                                    selectedData.consultar_registro_de_visitas ? false : true
                                                )
                                            }
                                            isSelected={selectedData.consultar_registro_de_visitas}
                                        >
                                            Consultar registro de visitas
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "registrar_visitas",
                                                    selectedData.registrar_visitas ? false : true
                                                )
                                            }
                                            isSelected={selectedData.registrar_visitas}
                                        >
                                            Registrar visitas
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "eliminar_visita",
                                                    selectedData.eliminar_visita ? false : true
                                                )
                                            }
                                            isSelected={selectedData.eliminar_visita}
                                        >
                                            Eliminar visita
                                        </Checkbox>
                                        <text>Comisiones</text>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "consultar_comisiones",
                                                    selectedData.consultar_comisiones ? false : true
                                                )
                                            }
                                            isSelected={selectedData.consultar_comisiones}
                                        >
                                            Consultar comisiones
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "crear_nueva_comision",
                                                    selectedData.crear_nueva_comision ? false : true
                                                )
                                            }
                                            isSelected={selectedData.crear_nueva_comision}
                                        >
                                            Crear nueva comisión
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "editar_comision",
                                                    selectedData.editar_comision ? false : true
                                                )
                                            }
                                            isSelected={selectedData.editar_comision}
                                        >
                                            Editar comisión
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "eliminar_comisiones",
                                                    selectedData.eliminar_comisiones ? false : true
                                                )
                                            }
                                            isSelected={selectedData.eliminar_comisiones}
                                        >
                                            Eliminar comisiones
                                        </Checkbox>
                                        <text>Reporte de comisiones</text>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "consultar_reporte_de_comisiones",
                                                    selectedData.consultar_reporte_de_comisiones ? false : true
                                                )
                                            }
                                            isSelected={selectedData.consultar_reporte_de_comisiones}
                                        >
                                            Consultar reporte de comisiones
                                        </Checkbox>
                                        <text>Reporte de cliente</text>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "consultar_reporte_de_clientes",
                                                    selectedData.consultar_reporte_de_clientes ? false : true
                                                )
                                            }
                                            isSelected={selectedData.consultar_reporte_de_clientes}
                                        >
                                            Consultar reporte de clientes
                                        </Checkbox>
                                    </div>
                                </AccordionItem>

                                <AccordionItem key="6" aria-label="Productos" title="Productos">
                                    <div className="flex flex-col">
                                        <text>Productos</text>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "ver_catalogo_de_productos",
                                                    selectedData.ver_catalogo_de_productos ? false : true
                                                )
                                            }
                                            isSelected={selectedData.ver_catalogo_de_productos}
                                        >
                                            Ver catálogo de productos
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "modificar_inventarios",
                                                    selectedData.modificar_inventarios ? false : true
                                                )
                                            }
                                            isSelected={selectedData.modificar_inventarios}
                                        >
                                            Modificar inventarios
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "modificar_precio",
                                                    selectedData.modificar_precio ? false : true
                                                )
                                            }
                                            isSelected={selectedData.modificar_precio}
                                        >
                                            Modificar precio
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "modificar_costo",
                                                    selectedData.modificar_costo ? false : true
                                                )
                                            }
                                            isSelected={selectedData.modificar_costo}
                                        >
                                            Modificar costo
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "modificar_informacion_adicional",
                                                    selectedData.modificar_informacion_adicional ? false : true
                                                )
                                            }
                                            isSelected={selectedData.modificar_informacion_adicional}
                                        >
                                            Modificar información adicional
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "alta_de_nuevos_productos",
                                                    selectedData.alta_de_nuevos_productos ? false : true
                                                )
                                            }
                                            isSelected={selectedData.alta_de_nuevos_productos}
                                        >
                                            Alta de nuevos productos
                                        </Checkbox>
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
                                                    selectedData.consultar_productos_desactivados ? false : true
                                                )
                                            }
                                            isSelected={selectedData.consultar_productos_desactivados}
                                        >
                                            Consultar productos desactivados
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "record_venta_producto",
                                                    selectedData.record_venta_producto ? false : true
                                                )
                                            }
                                            isSelected={selectedData.record_venta_producto}
                                        >
                                            Record venta producto
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "inventario_inicial_en_alta",
                                                    selectedData.inventario_inicial_en_alta ? false : true
                                                )
                                            }
                                            isSelected={selectedData.inventario_inicial_en_alta}
                                        >
                                            Inventario inicial en alta
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "actualizar_precios_y_costos_por_marca",
                                                    selectedData.actualizar_precios_y_costos_por_marca ? false : true
                                                )
                                            }
                                            isSelected={selectedData.actualizar_precios_y_costos_por_marca}
                                        >
                                            Actualizar precios y costos por marca
                                        </Checkbox>
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
                                            Ver catálogo de marcas
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
                                        <text>Proveedores</text>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "ver_catalogo_de_proveedores",
                                                    selectedData.ver_catalogo_de_proveedores ? false : true
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
                                            Editar categorías
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
                                            Eliminar categorías
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "crear_y_editar_subcategorias",
                                                    selectedData.crear_y_editar_subcategorias ? false : true
                                                )
                                            }
                                            isSelected={selectedData.crear_y_editar_subcategorias}
                                        >
                                            Crear y editar subCategorías
                                        </Checkbox>
                                        <text>Descuentos</text>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "ver_catalogo_de_descuentos",
                                                    selectedData.ver_catalogo_de_descuentos ? false : true
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
                                        <text>Margen de productos</text>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "consultar_margen_de_productos",
                                                    selectedData.consultar_margen_de_productos ? false : true
                                                )
                                            }
                                            isSelected={selectedData.consultar_margen_de_productos}
                                        >
                                            Consultar margen de productos
                                        </Checkbox>
                                        <text>Insignias</text>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "ver_catalogo_de_insignias",
                                                    selectedData.ver_catalogo_de_insignias ? false : true
                                                )
                                            }
                                            isSelected={selectedData.ver_catalogo_de_insignias}
                                        >
                                            Ver catálogo de insignias
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "alta_de_nuevas_insignias",
                                                    selectedData.alta_de_nuevas_insignias ? false : true
                                                )
                                            }
                                            isSelected={selectedData.alta_de_nuevas_insignias}
                                        >
                                            Alta de nuevas insignias
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "editar_insignias",
                                                    selectedData.editar_insignias ? false : true
                                                )
                                            }
                                            isSelected={selectedData.editar_insignias}
                                        >
                                            Editar insignias
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "eliminar_insignias",
                                                    selectedData.eliminar_insignias ? false : true
                                                )
                                            }
                                            isSelected={selectedData.eliminar_insignias}
                                        >
                                            Eliminar insignias
                                        </Checkbox>
                                    </div>
                                </AccordionItem>

                                <AccordionItem key="7" aria-label="Compras" title="Compras">
                                    <div className="flex flex-col">
                                        <text>Ordenes de compra</text>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "consultar_ordenes_de_compra",
                                                    selectedData.consultar_ordenes_de_compra ? false : true
                                                )
                                            }
                                            isSelected={selectedData.consultar_ordenes_de_compra}
                                        >
                                            Consultar ordenes de compra
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "crear_nueva_orden_de_compra",
                                                    selectedData.crear_nueva_orden_de_compra ? false : true
                                                )
                                            }
                                            isSelected={selectedData.crear_nueva_orden_de_compra}
                                        >
                                            Crear nueva orden de compra
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "editar_orden_de_compra",
                                                    selectedData.editar_orden_de_compra ? false : true
                                                )
                                            }
                                            isSelected={selectedData.editar_orden_de_compra}
                                        >
                                            Editar orden de compra
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "eliminar_orden_de_compra",
                                                    selectedData.eliminar_orden_de_compra ? false : true
                                                )
                                            }
                                            isSelected={selectedData.eliminar_orden_de_compra}
                                        >
                                            Eliminar orden de compra
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "procesar_orden_de_compra",
                                                    selectedData.procesar_orden_de_compra ? false : true
                                                )
                                            }
                                            isSelected={selectedData.procesar_orden_de_compra}
                                        >
                                            Procesar orden de compra
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "cancelar_orden_de_compra",
                                                    selectedData.cancelar_orden_de_compra ? false : true
                                                )
                                            }
                                            isSelected={selectedData.cancelar_orden_de_compra}
                                        >
                                            Cancelar orden de compra
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "recibir_mercancia",
                                                    selectedData.recibir_mercancia ? false : true
                                                )
                                            }
                                            isSelected={selectedData.recibir_mercancia}
                                        >
                                            Recibir mercancía
                                        </Checkbox>
                                    </div>
                                </AccordionItem>

                                <AccordionItem key="8" aria-label="Inventario" title="Inventario">
                                    <div className="flex flex-col">
                                        <text>Entradas de almacen</text>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "consultar_entradas_de_almacen",
                                                    selectedData.consultar_entradas_de_almacen ? false : true
                                                )
                                            }
                                            isSelected={selectedData.consultar_entradas_de_almacen}
                                        >
                                            Consultar entradas de almacen
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "crear_nueva_entrada_de_almacen",
                                                    selectedData.crear_nueva_entrada_de_almacen ? false : true
                                                )
                                            }
                                            isSelected={selectedData.crear_nueva_entrada_de_almacen}
                                        >
                                            Crear nueva entrada de almacen
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "editar_entradas_de_almacen",
                                                    selectedData.editar_entradas_de_almacen ? false : true
                                                )
                                            }
                                            isSelected={selectedData.editar_entradas_de_almacen}
                                        >
                                            Editar entradas de almacen
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "eliminar_entradas_de_almacen",
                                                    selectedData.eliminar_entradas_de_almacen ? false : true
                                                )
                                            }
                                            isSelected={selectedData.eliminar_entradas_de_almacen}
                                        >
                                            Eliminar entradas de almacen
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "catalogo_de_motivos_de_entrada",
                                                    selectedData.catalogo_de_motivos_de_entrada ? false : true
                                                )
                                            }
                                            isSelected={selectedData.catalogo_de_motivos_de_entrada}
                                        >
                                            Catálogo de motivos de entrada
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "agregar_motivo_de_entrada",
                                                    selectedData.agregar_motivo_de_entrada ? false : true
                                                )
                                            }
                                            isSelected={selectedData.agregar_motivo_de_entrada}
                                        >
                                            Agregar motivo de entrada
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "modificar_motivo_de_entrada",
                                                    selectedData.modificar_motivo_de_entrada ? false : true
                                                )
                                            }
                                            isSelected={selectedData.modificar_motivo_de_entrada}
                                        >
                                            Modificar motivo de entrada
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "eliminar_motivo_de_entrada",
                                                    selectedData.eliminar_motivo_de_entrada ? false : true
                                                )
                                            }
                                            isSelected={selectedData.eliminar_motivo_de_entrada}
                                        >
                                            Eliminar motivo de entrada
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "usar_motivos_de_entrada_clase_1",
                                                    selectedData.usar_motivos_de_entrada_clase_1 ? false : true
                                                )
                                            }
                                            isSelected={selectedData.usar_motivos_de_entrada_clase_1}
                                        >
                                            Usar motivos de entrada clase 1
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "usar_motivos_de_entrada_clase_2",
                                                    selectedData.usar_motivos_de_entrada_clase_2 ? false : true
                                                )
                                            }
                                            isSelected={selectedData.usar_motivos_de_entrada_clase_2}
                                        >
                                            Usar motivos de entrada clase 2
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "usar_motivos_de_entrada_clase_3",
                                                    selectedData.usar_motivos_de_entrada_clase_3 ? false : true
                                                )
                                            }
                                            isSelected={selectedData.usar_motivos_de_entrada_clase_3}
                                        >
                                            Usar motivos de entrada clase 3
                                        </Checkbox>
                                        <text>Reporte de inventario</text>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "consultar_reporte_de_inventario",
                                                    selectedData.consultar_reporte_de_inventario ? false : true
                                                )
                                            }
                                            isSelected={selectedData.consultar_reporte_de_inventario}
                                        >
                                            Consultar reporte de inventario
                                        </Checkbox>
                                        <text>Salidas de almacen</text>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "consultar_salidas_de_almacen",
                                                    selectedData.consultar_salidas_de_almacen ? false : true
                                                )
                                            }
                                            isSelected={selectedData.consultar_salidas_de_almacen}
                                        >
                                            Consultar salidas de almacen
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "agregar_salida_manual",
                                                    selectedData.agregar_salida_manual ? false : true
                                                )
                                            }
                                            isSelected={selectedData.agregar_salida_manual}
                                        >
                                            Agregar salida manual
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "eliminar_salida",
                                                    selectedData.eliminar_salida ? false : true
                                                )
                                            }
                                            isSelected={selectedData.eliminar_salida}
                                        >
                                            Eliminar salida
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "catalogo_de_motivos_de_salida",
                                                    selectedData.catalogo_de_motivos_de_salida ? false : true
                                                )
                                            }
                                            isSelected={selectedData.catalogo_de_motivos_de_salida}
                                        >
                                            Catálogo de motivos de salida
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "agregar_motivo_de_salida",
                                                    selectedData.agregar_motivo_de_salida ? false : true
                                                )
                                            }
                                            isSelected={selectedData.agregar_motivo_de_salida}
                                        >
                                            Agregar motivo de salida
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "modificar_motivo_de_salida",
                                                    selectedData.modificar_motivo_de_salida ? false : true
                                                )
                                            }
                                            isSelected={selectedData.modificar_motivo_de_salida}
                                        >
                                            Modificar motivo de salida
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "eliminar_motivo_de_salida",
                                                    selectedData.eliminar_motivo_de_salida ? false : true
                                                )
                                            }
                                            isSelected={selectedData.eliminar_motivo_de_salida}
                                        >
                                            Eliminar motivo de salida
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "usar_motivos_de_salida_clase_1",
                                                    selectedData.usar_motivos_de_salida_clase_1 ? false : true
                                                )
                                            }
                                            isSelected={selectedData.usar_motivos_de_salida_clase_1}
                                        >
                                            Usar motivos de salida clase 1
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "usar_motivos_de_salida_clase_2",
                                                    selectedData.usar_motivos_de_salida_clase_2 ? false : true
                                                )
                                            }
                                            isSelected={selectedData.usar_motivos_de_salida_clase_2}
                                        >
                                            Usar motivos de salida clase 2
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "usar_motivos_de_salida_clase_3",
                                                    selectedData.usar_motivos_de_salida_clase_3 ? false : true
                                                )
                                            }
                                            isSelected={selectedData.usar_motivos_de_salida_clase_3}
                                        >
                                            Usar motivos de salida clase 3
                                        </Checkbox>
                                        <text>Transferencias entre almacenes</text>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "consultar_transferencias_almacenes",
                                                    selectedData.consultar_transferencias_almacenes ? false : true
                                                )
                                            }
                                            isSelected={selectedData.consultar_transferencias_almacenes}
                                        >
                                            Consultar transferencias
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "autorizar",
                                                    selectedData.autorizar ? false : true
                                                )
                                            }
                                            isSelected={selectedData.autorizar}
                                        >
                                            Autorizar
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "rechazar",
                                                    selectedData.rechazar ? false : true
                                                )
                                            }
                                            isSelected={selectedData.rechazar}
                                        >
                                            Rechazar
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "surtir",
                                                    selectedData.surtir ? false : true
                                                )
                                            }
                                            isSelected={selectedData.surtir}
                                        >
                                            Surtir
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "recibir",
                                                    selectedData.recibir ? false : true
                                                )
                                            }
                                            isSelected={selectedData.recibir}
                                        >
                                            Recibir
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "crear_nuevas_transferencias",
                                                    selectedData.crear_nuevas_transferencias ? false : true
                                                )
                                            }
                                            isSelected={selectedData.crear_nuevas_transferencias}
                                        >
                                            Crear nuevas transferencias
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "editar_transferencias",
                                                    selectedData.editar_transferencias ? false : true
                                                )
                                            }
                                            isSelected={selectedData.editar_transferencias}
                                        >
                                            Editar transferencias
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "eliminar_transferencias",
                                                    selectedData.eliminar_transferencias ? false : true
                                                )
                                            }
                                            isSelected={selectedData.eliminar_transferencias}
                                        >
                                            Eliminar transferencias
                                        </Checkbox>
                                        <text>Reporte de inventario por almacen</text>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "consultar_reporte_de_inventario_x_almacen",
                                                    selectedData.consultar_reporte_de_inventario_x_almacen
                                                        ? false
                                                        : true
                                                )
                                            }
                                            isSelected={selectedData.consultar_reporte_de_inventario_x_almacen}
                                        >
                                            Consultar reporte de inventario por almacen
                                        </Checkbox>
                                        <text>Logistica</text>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "logistica",
                                                    selectedData.logistica ? false : true
                                                )
                                            }
                                            isSelected={selectedData.logistica}
                                        >
                                            Logistica
                                        </Checkbox>
                                    </div>
                                </AccordionItem>

                                <AccordionItem key="9" aria-label="Bancos" title="Bancos">
                                    <div className="flex flex-col">
                                        <text>Bancos</text>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "consultar_catalogo_de_bancos",
                                                    selectedData.consultar_catalogo_de_bancos ? false : true
                                                )
                                            }
                                            isSelected={selectedData.consultar_catalogo_de_bancos}
                                        >
                                            Consultar catalogo de bancos
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "crear_nuevo_banco",
                                                    selectedData.crear_nuevo_banco ? false : true
                                                )
                                            }
                                            isSelected={selectedData.crear_nuevo_banco}
                                        >
                                            Crear nuevo banco
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "editar_banco",
                                                    selectedData.editar_banco ? false : true
                                                )
                                            }
                                            isSelected={selectedData.editar_banco}
                                        >
                                            Editar banco
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "eliminar_banco",
                                                    selectedData.eliminar_banco ? false : true
                                                )
                                            }
                                            isSelected={selectedData.eliminar_banco}
                                        >
                                            Eliminar banco
                                        </Checkbox>
                                        <text>Cuentas bancarias</text>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "consultar_cuentas_bancarias",
                                                    selectedData.consultar_cuentas_bancarias ? false : true
                                                )
                                            }
                                            isSelected={selectedData.consultar_cuentas_bancarias}
                                        >
                                            Consultar cuentas bancarias
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "crear_cuentas_bancarias",
                                                    selectedData.crear_cuentas_bancarias ? false : true
                                                )
                                            }
                                            isSelected={selectedData.crear_cuentas_bancarias}
                                        >
                                            Crear cuentas bancarias
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "editar_cuentas_bancarias",
                                                    selectedData.editar_cuentas_bancarias ? false : true
                                                )
                                            }
                                            isSelected={selectedData.editar_cuentas_bancarias}
                                        >
                                            Editar cuentas bancarias
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "eliminar_cuentas_bancarias",
                                                    selectedData.eliminar_cuentas_bancarias ? false : true
                                                )
                                            }
                                            isSelected={selectedData.eliminar_cuentas_bancarias}
                                        >
                                            Eliminar cuentas bancarias
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "consultar_estado_de_cuentas",
                                                    selectedData.consultar_estado_de_cuentas ? false : true
                                                )
                                            }
                                            isSelected={selectedData.consultar_estado_de_cuentas}
                                        >
                                            Consultar estado de cuentas
                                        </Checkbox>
                                        <text>Salidas</text>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "consultar_salidas",
                                                    selectedData.consultar_salidas ? false : true
                                                )
                                            }
                                            isSelected={selectedData.consultar_salidas}
                                        >
                                            Consultar salidas
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "crear_nuevas_salidas",
                                                    selectedData.crear_nuevas_salidas ? false : true
                                                )
                                            }
                                            isSelected={selectedData.crear_nuevas_salidas}
                                        >
                                            Crear nuevas salidas
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "editar_salidas",
                                                    selectedData.editar_salidas ? false : true
                                                )
                                            }
                                            isSelected={selectedData.editar_salidas}
                                        >
                                            Editar salidas
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "eliminar_salidas",
                                                    selectedData.eliminar_salidas ? false : true
                                                )
                                            }
                                            isSelected={selectedData.eliminar_salidas}
                                        >
                                            Eliminar salidas
                                        </Checkbox>
                                        <text>Entradas</text>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "consultar_entradas",
                                                    selectedData.consultar_entradas ? false : true
                                                )
                                            }
                                            isSelected={selectedData.consultar_entradas}
                                        >
                                            Consultar entradas
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "crear_nuevas_entradas",
                                                    selectedData.crear_nuevas_entradas ? false : true
                                                )
                                            }
                                            isSelected={selectedData.crear_nuevas_entradas}
                                        >
                                            Crear nuevas entradas
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "editar_entradas",
                                                    selectedData.editar_entradas ? false : true
                                                )
                                            }
                                            isSelected={selectedData.editar_entradas}
                                        >
                                            Editar entradas
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "eliminar_entradas",
                                                    selectedData.eliminar_entradas ? false : true
                                                )
                                            }
                                            isSelected={selectedData.eliminar_entradas}
                                        >
                                            Eliminar entradas
                                        </Checkbox>
                                        <text>Transferencias</text>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "consultar_transferencias",
                                                    selectedData.consultar_transferencias ? false : true
                                                )
                                            }
                                            isSelected={selectedData.consultar_transferencias}
                                        >
                                            Consultar transferencias
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "crear_nuevas_transferencias",
                                                    selectedData.crear_nuevas_transferencias ? false : true
                                                )
                                            }
                                            isSelected={selectedData.crear_nuevas_transferencias}
                                        >
                                            Crear nuevas transferencias
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "eliminar_transferencia",
                                                    selectedData.eliminar_transferencia ? false : true
                                                )
                                            }
                                            isSelected={selectedData.eliminar_transferencia}
                                        >
                                            Eliminar transferencia
                                        </Checkbox>
                                    </div>
                                </AccordionItem>

                                <AccordionItem key="10" aria-label="Nominas" title="Nominas">
                                    <div className="flex flex-col">
                                        <text>Empleados</text>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "consultar_empleados",
                                                    selectedData.consultar_empleados ? false : true
                                                )
                                            }
                                            isSelected={selectedData.consultar_empleados}
                                        >
                                            Consultar empleados
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "agregar_nuevo_empleado",
                                                    selectedData.agregar_nuevo_empleado ? false : true
                                                )
                                            }
                                            isSelected={selectedData.agregar_nuevo_empleado}
                                        >
                                            Agregar nuevo empleado
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "editar_empleado",
                                                    selectedData.editar_empleado ? false : true
                                                )
                                            }
                                            isSelected={selectedData.editar_empleado}
                                        >
                                            Editar empleado
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "eliminar_empleado",
                                                    selectedData.eliminar_empleado ? false : true
                                                )
                                            }
                                            isSelected={selectedData.eliminar_empleado}
                                        >
                                            Eliminar empleado
                                        </Checkbox>
                                        <text>Catalogos</text>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "consultar_comprobantes_emitidos",
                                                    selectedData.consultar_comprobantes_emitidos ? false : true
                                                )
                                            }
                                            isSelected={selectedData.consultar_comprobantes_emitidos}
                                        >
                                            Consultar comprobantes emitidos
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "nuevo_comprobante",
                                                    selectedData.nuevo_comprobante ? false : true
                                                )
                                            }
                                            isSelected={selectedData.nuevo_comprobante}
                                        >
                                            Nuevo comprobante
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "consultar_catalogos",
                                                    selectedData.consultar_catalogos ? false : true
                                                )
                                            }
                                            isSelected={selectedData.consultar_catalogos}
                                        >
                                            Consultar catalogos
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "consultar_catalogo_de_departamentos",
                                                    selectedData.consultar_catalogo_de_departamentos ? false : true
                                                )
                                            }
                                            isSelected={selectedData.consultar_catalogo_de_departamentos}
                                        >
                                            Consultar catalogo de departamentos
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "crear_un_nuevo_departamento",
                                                    selectedData.crear_un_nuevo_departamento ? false : true
                                                )
                                            }
                                            isSelected={selectedData.crear_un_nuevo_departamento}
                                        >
                                            Crear un nuevo departamento
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "editar_un_departamento",
                                                    selectedData.editar_un_departamento ? false : true
                                                )
                                            }
                                            isSelected={selectedData.editar_un_departamento}
                                        >
                                            Editar un departamento
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "eliminar_un_departamento",
                                                    selectedData.eliminar_un_departamento ? false : true
                                                )
                                            }
                                            isSelected={selectedData.eliminar_un_departamento}
                                        >
                                            Eliminar un departamento
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "consultar_catalogo_de_puestos_de_trabajo",
                                                    selectedData.consultar_catalogo_de_puestos_de_trabajo
                                                        ? false
                                                        : true
                                                )
                                            }
                                            isSelected={selectedData.consultar_catalogo_de_puestos_de_trabajo}
                                        >
                                            Consultar catalogo de puestos de trabajo
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "crear_nuevo_puesto_de_trabajo",
                                                    selectedData.crear_nuevo_puesto_de_trabajo ? false : true
                                                )
                                            }
                                            isSelected={selectedData.crear_nuevo_puesto_de_trabajo}
                                        >
                                            Crear nuevo puesto de trabajo
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "editar_puesto_de_trabajo",
                                                    selectedData.editar_puesto_de_trabajo ? false : true
                                                )
                                            }
                                            isSelected={selectedData.editar_puesto_de_trabajo}
                                        >
                                            Editar puesto de trabajo
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "eliminar_puesto_de_trabajo",
                                                    selectedData.eliminar_puesto_de_trabajo ? false : true
                                                )
                                            }
                                            isSelected={selectedData.eliminar_puesto_de_trabajo}
                                        >
                                            Eliminar puesto de trabajo
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "consultar_regimenes_de_contratacion",
                                                    selectedData.consultar_regimenes_de_contratacion ? false : true
                                                )
                                            }
                                            isSelected={selectedData.consultar_regimenes_de_contratacion}
                                        >
                                            Consultar regimenes de contratacion
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "crear_nuevo_regimen_de_contratacion",
                                                    selectedData.crear_nuevo_regimen_de_contratacion ? false : true
                                                )
                                            }
                                            isSelected={selectedData.crear_nuevo_regimen_de_contratacion}
                                        >
                                            Crear nuevo regimen de contratacion
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "editar_regimen_de_contratacion",
                                                    selectedData.editar_regimen_de_contratacion ? false : true
                                                )
                                            }
                                            isSelected={selectedData.editar_regimen_de_contratacion}
                                        >
                                            Editar regimen de contratacion
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "eliminar_regimen_de_contratacion",
                                                    selectedData.eliminar_regimen_de_contratacion ? false : true
                                                )
                                            }
                                            isSelected={selectedData.eliminar_regimen_de_contratacion}
                                        >
                                            Eliminar regimen de contratacion
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "consultar_tipos_de_contratos",
                                                    selectedData.consultar_tipos_de_contratos ? false : true
                                                )
                                            }
                                            isSelected={selectedData.consultar_tipos_de_contratos}
                                        >
                                            Consultar tipos de contratos
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "crear_nuevo_tipos_de_contratos",
                                                    selectedData.crear_nuevo_tipos_de_contratos ? false : true
                                                )
                                            }
                                            isSelected={selectedData.crear_nuevo_tipos_de_contratos}
                                        >
                                            Crear nuevo tipos de contratos
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "editar_tipos_de_contratos",
                                                    selectedData.editar_tipos_de_contratos ? false : true
                                                )
                                            }
                                            isSelected={selectedData.editar_tipos_de_contratos}
                                        >
                                            Editar tipos de contratos
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "eliminar_tipos_de_contratos",
                                                    selectedData.eliminar_tipos_de_contratos ? false : true
                                                )
                                            }
                                            isSelected={selectedData.eliminar_tipos_de_contratos}
                                        >
                                            Eliminar tipos de contratos
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "consultar_tipos_de_jornadas",
                                                    selectedData.consultar_tipos_de_jornadas ? false : true
                                                )
                                            }
                                            isSelected={selectedData.consultar_tipos_de_jornadas}
                                        >
                                            Consultar tipos de jornadas
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "crear_nuevo_tipo_de_jornanda",
                                                    selectedData.crear_nuevo_tipo_de_jornanda ? false : true
                                                )
                                            }
                                            isSelected={selectedData.crear_nuevo_tipo_de_jornanda}
                                        >
                                            Crear nuevo tipo de jornanda
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "editar_tipo_de_jornanda",
                                                    selectedData.editar_tipo_de_jornanda ? false : true
                                                )
                                            }
                                            isSelected={selectedData.editar_tipo_de_jornanda}
                                        >
                                            Editar tipo de jornanda
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "eliminar_tipo_de_jornada",
                                                    selectedData.eliminar_tipo_de_jornada ? false : true
                                                )
                                            }
                                            isSelected={selectedData.eliminar_tipo_de_jornada}
                                        >
                                            Eliminar tipo de jornada
                                        </Checkbox>
                                    </div>
                                </AccordionItem>

                                <AccordionItem key="11" aria-label="Configuracion" title="Configuracion">
                                    <div className="flex flex-col">
                                        <text>Configuracion</text>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "modificar_configuraciones",
                                                    selectedData.modificar_configuraciones ? false : true
                                                )
                                            }
                                            isSelected={selectedData.modificar_configuraciones}
                                        >
                                            Modificar configuraciones
                                        </Checkbox>
                                        <text>Importacion de datos</text>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "importar_productos",
                                                    selectedData.importar_productos ? false : true
                                                )
                                            }
                                            isSelected={selectedData.importar_productos}
                                        >
                                            Importar productos
                                        </Checkbox>
                                        <text>Envios</text>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "consultar_tipos_de_datos",
                                                    selectedData.consultar_tipos_de_datos ? false : true
                                                )
                                            }
                                            isSelected={selectedData.consultar_tipos_de_datos}
                                        >
                                            Consultar tipos de datos
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "consultar_las_condiciones_de_envio",
                                                    selectedData.consultar_las_condiciones_de_envio ? false : true
                                                )
                                            }
                                            isSelected={selectedData.consultar_las_condiciones_de_envio}
                                        >
                                            Consultar las condiciones de envio
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "crear_paquetes_de_envio",
                                                    selectedData.crear_paquetes_de_envio ? false : true
                                                )
                                            }
                                            isSelected={selectedData.crear_paquetes_de_envio}
                                        >
                                            Crear paquetes de envio
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "consultar_paquetes_de_envio",
                                                    selectedData.consultar_paquetes_de_envio ? false : true
                                                )
                                            }
                                            isSelected={selectedData.consultar_paquetes_de_envio}
                                        >
                                            Consultar paquetes de envio
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "crear_costos_de_envio",
                                                    selectedData.crear_costos_de_envio ? false : true
                                                )
                                            }
                                            isSelected={selectedData.crear_costos_de_envio}
                                        >
                                            Crear costos de envio
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "consultar_costos_de_envio",
                                                    selectedData.consultar_costos_de_envio ? false : true
                                                )
                                            }
                                            isSelected={selectedData.consultar_costos_de_envio}
                                        >
                                            Consultar costos de envio
                                        </Checkbox>
                                    </div>
                                </AccordionItem>

                                <AccordionItem key="12" aria-label="Pagina Web" title="Pagina Web">
                                    <div className="flex flex-col">
                                        <text>Notificaciones</text>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "ver_notificaciones",
                                                    selectedData.ver_notificaciones ? false : true
                                                )
                                            }
                                            isSelected={selectedData.ver_notificaciones}
                                        >
                                            Ver notificaciones
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "cambiar_estatus_de_notificaciones",
                                                    selectedData.cambiar_estatus_de_notificaciones ? false : true
                                                )
                                            }
                                            isSelected={selectedData.cambiar_estatus_de_notificaciones}
                                        >
                                            Cambiar estatus de notificaciones
                                        </Checkbox>
                                    </div>
                                </AccordionItem>
                            </Accordion>
                        </ScrollShadow>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onPress={handleSubmmit}>{t("Guardar")}</Button>
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
