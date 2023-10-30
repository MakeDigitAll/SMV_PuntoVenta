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

const ModalUserInfo = ({ onClose, data }) => {
    const { t } = useTranslation();
    const [visible, setVisible] = useState(true);
    const [selectedData, setSelectedData] = useState({});

    const closeHandler = (response) => {
        setVisible(false);
        onClose(response);
    };

    const setDefaultValues = (tipo, valor) => {
        console.log("tipo", tipo);
        console.log("valor", valor);
        setSelectedData({
            ...selectedData,
            [tipo]: valor,
        });
    };

    useEffect(() => {
        console.log(selectedData);
    }, [selectedData]);


    /*

     --- 2 - Lista de precios
    ver_listas_de_precios 
    crear_lista_de_precios 
    editar_lista_de_precios 
    eliminar_lista_de_precios 

     --- 3 - Reporte de ventas de clientes
    ver_reporte_de_venta_de_clientes 

     --- 4 - Estado de cuenta
    ver_estado_de_cuenta 
    ver_detalle 
    capturar_pagos 
    imprimir_ticket_de_abono 
    cancelar_ticket_de_abono 

     --- 5 - Catalogo de mercados
    consultar_catalogo_de_mercados 
    crear_nuevo_mercado 
    editar_mercado 
    eliminar_mercado 

     -- Vendedores
          --- 1 - Vendedores
    ver_catalogo_de_vendedores 
    crear_nuevo_vendedor 
    editar_vendedor 
    eliminar_vendedor 

     --- 2 - Registro de visitas
    consultar_registro_de_visitas 
    registrar_visitas 
    eliminar_visita 

     --- 3 - Comisiones
    consultar_comisiones 
    crear_nueva_comision 
    editar_comision 
    eliminar_comisiones 

     --- 4 - Reporte de comisiones
    consultar_reporte_de_comisiones 

     --- 5 - Reporte de cliente
    consultar_reporte_de_clientes 

     -- Productos
     --- 1 - Productos
    ver_catalogo_de_productos 
    modificar_inventarios 
    modificar_precio 
    modificar_costo 
    modificar_informacion_adicional 
    alta_de_nuevos_productos 
    editar_productos 
    eliminar_productos 
    consultar_productos_desactivados 
    record_venta_producto 
    inventario_inicial_en_alta 
    actualizar_precios_y_costos_por_marca 

     --- 2 - Marcas
    ver_catalogo_de_marcas 
    crear_nueva_marca 
    editar_marca 
    eliminar_marca 

     --- 3 - Proveedores
    ver_catalogo_de_proveedores 
    crear_nuevo_proveedor 
    editar_proveedor 
    eliminar_proveedor 

     --- 4 - Categorias
    ver_categoria 
    crear_nueva_categoria 
    editar_categorias 
    eliminar_categorias 
    crear_y_editar_subCategorias 

     --- 5 - Descuentos
    ver_catalogo_de_descuentos 
    crear_nuevos_descuentos 
    editar_descuentos 
    eliminar_descuento 

     --- 6 - Margen de productos
    consultar_margen_de_productos 

     --- 7 - Insignias
    ver_catalogo_de_insignias 
    alta_de_nuevas_insignias 
    editar_insignias 
    eliminar_insignias 

    -- Compras
     --- 1 - Ordenes de compra
    consultar_ordenes_de_compra 
    crear_nueva_orden_de_compra 
    editar_orden_de_compra 
    eliminar_orden_de_compra 
    procesar_orden_de_compra 
    cancelar_orden_de_compra 
    recibir_mercancia 

    -- Inventario
     --- 1 - Entradas de almacen
    consultar_entradas_de_almacen 
    crear_nueva_entrada_de_almacen 
    editar_entradas_de_almacen 
    eliminar_entradas_de_almacen 
    catalogo_de_motivos_de_entrada 
    agregar_motivo_de_entrada 
    modificar_motivo_de_entrada 
    eliminar_motivo_de_entrada 
    usar_motivos_de_entrada_clase_1 
    usar_motivos_de_entrada_clase_2 
    usar_motivos_de_entrada_clase_3 

     --- 2 - Reporte de inventario
    consultar_reporte_de_inventario 

     --- 3 - Salidas de almacen
    consultar_salidas_de_almacen 
    agregar_salida_manual 
    eliminar_salida 
    catalogo_de_motivos_de_salida 
    agregar_motivo_de_salida 
    modificar_motivo_de_salida 
    eliminar_motivo_de_salida 
    usar_motivos_de_salida_clase_1 
    usar_motivos_de_salida_clase_2 
    usar_motivos_de_salida_clase_3 

     --- 4 - Transferencias entre almacenes
    consultar_transferencias 
    autorizar 
    rechazar 
    surtir 
    recibir 
    crear_nuevas_tranferencias 
    editar_transferencias 
    eliminar_tranferencias 

     --- 5 - Reporte de inventario por almacen
    consultar_reporte_de_inventario_x_almacen 

     --- 6 - Logistica
    logistica 

     -- Bancos
     --- 1 - Bancos
    consultar_catalogo_de_bancos 
    crear_nuevo_banco 
    editar_banco 
    eliminar_banco 

     --- 2 - Cuentas bancarias
    consultar_cuentas_bancarias 
    crear_cuentas_bancarias 
    editar_cuentas_bancarias 
    eliminar_cuentas_bancarias 
    consultar_estado_de_cuentas 

     --- 3 - Salidas
    consultar_salidas 
    crear_nuevas_salidas 
    editar_salidas 
    eliminar_salidas 

     --- 4 - Entradas
    consultar_entradas 
    crear_nuevas_entradas 
    editar_entradas 
    eliminar_entradas 

     --- 5 - Transferencias
    consultar_tranferencias 
    crear_nuevas_tranferencias 
    eliminar_tranferencias 

    --Nominas
     --- 1 - Empleados
    consultar_empleados 
    agregar_nuevo_empleado 
    editar_empleado 
    eliminar_empleado 

     --- 2 - Catalogos
    consultar_comprobantes_emitidos 
    nuevo_comprobante 
    consultar_catalogos 
    consultar_catalogo_de_departamentos 
    crear_un_nuevo_departamento 
    editar_un_departamento 
    eliminar_un_departamento 
    consultar_catalogo_de_puestos_de_trabajo 
    crear_nuevo_puesto_de_trabajo 
    editar_puesto_de_trabajo 
    eliminar_puesto_de_trabajo 
    consultar_regimenes_de_contratacion 
    crear_nuevo_regimen_de_contratacion 
    editar_regimen_de_contratacion 
    eliminar_regimen_de_contratacion 
    consultar_tipos_de_contratos 
    crear_nuevo_tipos_de_contratos 
    editar_tipos_de_contratos 
    eliminar_tipos_de_contratos 
    consultar_tipos_de_jornadas 
    crear_nuevo_tipo_de_jornanda 
    editar_tipo_de_jornanda 
    eliminar_tipo_de_jornada 

    --Configuracion
     --- 1 - Configuracion
    modificar_configuraciones 

     --- 2 - Importacion de datos
    importar_productos 

     --- 3 - Envios
    consultar_tipos_de_datos 
    consultar_las_condiciones_de_envio 
    crear_paquetes_de_envio 
    consultar_paquetes_de_envio 
    crear_costos_de_envio 
    consultar_costos_de_envio 

     -- Pagina Web
     --- 1 - Notificaciones
    ver_notificaciones 
    cambiar_estatus_de_notificaciones 
    
    
    
    */

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
                        <ScrollShadow className="h-[600px]">
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
                                                    "mover_a_cuenta",
                                                    selectedData.mover_a_cuenta ? false : true
                                                )
                                            }
                                            isSelected={selectedData.mover_a_cuenta}
                                        >
                                            Mover a cuenta
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
                                            Mover a cuenta
                                        </Checkbox>
                                        <Checkbox
                                            onValueChange={() =>
                                                setDefaultValues(
                                                    "mover_a_cobranza_caja_general",
                                                    selectedData.mover_a_cobranza_caja_general ? false : true
                                                )
                                            }
                                            isSelected={selectedData.mover_a_cobranza_caja_general}
                                        >
                                            Mover a cuenta
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
                                                    "surtir_pedido",
                                                    selectedData.surtir_pedido ? false : true
                                                )
                                            }
                                            isSelected={selectedData.surtir_pedido}
                                        >
                                            Surtir pedido
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
                                            Surtir pedido
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
                                                    "punto_de_venta",
                                                    selectedData.punto_de_venta ? false : true
                                                )
                                            }
                                            isSelected={selectedData.punto_de_venta}
                                        >
                                            Punto de venta
                                        </Checkbox>
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
                                                    "crear_y_editar_subCategorias",
                                                    selectedData.crear_y_editar_subCategorias ? false : true
                                                )
                                            }
                                            isSelected={selectedData.crear_y_editar_subCategorias}
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

                            </Accordion>
                        </ScrollShadow>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary">{t("profile.save")}</Button>

                        <Button color="danger" onClick={closeHandler}>
                            {t("profile.cancel")}
                        </Button>
                    </ModalFooter>
                </>
            </ModalContent>
        </Modal>
    );
};

export default ModalUserInfo;
