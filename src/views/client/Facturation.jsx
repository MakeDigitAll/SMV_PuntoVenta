import React from 'react'
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
    Table
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
import { useNavigate, useParams } from "react-router-dom";
import { MdSave } from "react-icons/md";
import http from "../../components/axios/Axios";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
const Facturation = ({ id }) => {
    return (
        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-12 space-x-4 space-y-4 content-end">
            <Spacer y={6} />
            <div className="md:col-span-6"></div>
            <div className="md:col-span-6">
                <Input
                    id="Forma de pago"
                    disabled={isInputDisabled}
                    isDisabled={status ? true : false}
                    value={clientData.formaPago}
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
                    disabled={isInputDisabled}
                    type="Metodo de pago"
                    label="Metodo de pago"
                    id="Metodo de pago"
                    isDisabled={status ? true : false}
                    name="Metodo de pago"
                    value={clientData.metodoPago}
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
                    disabled={isInputDisabled}
                    isDisabled={status ? true : false}
                    value={clientData.cfdi}
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
                    disabled={isInputDisabled}
                    isDisabled={status ? true : false}
                    value={clientData.condicionesPago}
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
                    disabled={isInputDisabled}
                    isDisabled={status ? true : false}
                    value={clientData.diasCredito}
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
                    disabled={isInputDisabled}
                    isDisabled={status ? true : false}
                    value={clientData.limiteCredito}
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
                    disabled={isInputDisabled}
                    isDisabled={status ? true : false}
                    value={clientData.saldoPendiente}
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
                    disabled={isInputDisabled}
                    isDisabled={status ? true : false}
                    value={clientData.creditoDisponible}
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
    )
}

export default Facturation