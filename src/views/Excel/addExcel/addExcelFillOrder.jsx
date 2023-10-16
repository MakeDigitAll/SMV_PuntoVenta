import React, { useState } from 'react';
import Modal from 'react-modal';
import ExcelJS from 'exceljs';
import 'handsontable/dist/handsontable.full.css';
import { Button } from '@nextui-org/react';
import { HotTable } from '@handsontable/react';
import { toast } from 'react-toastify';
Modal.setAppElement("#root");
const AddExcelFillOrder = () => {
  const headers = [
    " ",
    "Nombre del cliente",
    "Numero cliente",
    "Numero comercial",
    "Nombre comercial",
    "Razon social",
    "Contacto",
    "RFC",
    "Telefono",
    "Email",
    "Vendedor",
    "Giro",
    "Activo",
    "Registro",
  ];

  const [data, setData] = useState([
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  ]);

  const settings = {
    data: data,
    colHeaders: headers,
    rowHeaders: true,
    contextMenu: true,
    stretchH: "all",
    readOnly: true,
  };

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleDownloadTemplate = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("FillOrders template");

    // Agrega los encabezados, excepto la primera celda
    const headersWithoutFirstCell = headers.slice(1);
    worksheet.addRow(headersWithoutFirstCell);

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "plantilla.xlsx";
    a.click();
    URL.revokeObjectURL(url);
  };
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(file);

      const worksheet = workbook.worksheets[0];
      const sheetData = worksheet.getSheetValues();

      if (sheetData.length > 0) {
        const newHeaders = sheetData[1];

        if (newHeaders && newHeaders.length === headers.length) {
          const newData = sheetData
            .slice(2)
            .filter((row) => row.some((cell) => cell !== null));
          setData(newData);
        } else if (newHeaders && newHeaders.length === headers.length + 1) {
          const newData = sheetData
            .slice(2)
            .filter((row) => row.some((cell) => cell !== null));
          setData(newData);
        }
      }
    }
  };

  const handleSaveToDatabase = async () => {
    try {
      const datosAEnviar = data.map((row) => ({
        nombreCliente: row[1] !== " " ? row[1] : null,
        numeroCliente: row[2] !== " " ? row[2] : null,
        numeroComercial: row[3] !== " " ? row[3] : null,
        nombreComercial: row[4] !== " " ? row[4] : null,
        razonSocial: row[5] !== " " ? row[5] : null,
        contacto: row[6] !== " " ? row[6] : null,
        rfc: row[7] !== " " ? row[7] : null,
        telefono: row[8] !== " " ? row[8] : null,
        email: row[9] !== " " ? row[9] : null,
        vendedor: row[10] !== " " ? row[10] : null,
        giro: row[11] !== " " ? row[11] : null,
        activo: row[12] !== " " ? row[11] : null,
        registro: row[13] !== " " ? row[13] : null,
      }));

      const responseArray = await Promise.all(
        datosAEnviar.map(async (valor) => {
          const response = await fetch(`https://localhost:4000/PedidosPendientesSurtir`, {
            method: "POST",
            body: JSON.stringify(valor),
            headers: {
              "Content-Type": "application/json",
            },
          });
          return response;
        })
      );

      const allResponsesOk = responseArray.every((response) => response.ok);

      if (allResponsesOk) {
        toast.success("Usuario creado correctamente", { theme: "colored" });
      } else {
        toast.error("Hubo un problema al guardar los datos en la base de datos.", { theme: "colored" });
      }
    } catch (error) {
      toast.error("Error al guardar los datos:", error);
    }
  };

  return (
    <div style={{ position: "relative", zIndex: "0" }}>
      <Button size="sm" color="success" onClick={() => setModalIsOpen(true)}>
        Upload Clients
      </Button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{
          overlay: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: "1000",
          },
          content: {
            width: "100%",
            maxWidth: "800px",
            maxHeight: "80vh",
            margin: "0 auto",
            border: "none",
            background: "white",
            overflow: "auto",
          },
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button onClick={handleSaveToDatabase}>
            Guardar en la base de datos
          </Button>
          <Button onClick={handleDownloadTemplate}>Descargar plantilla</Button>
          <label
            htmlFor="file-upload"
            style={{
              display: "inline-block",
              padding: "6px 12px",
              cursor: "pointer",
              backgroundColor: "#007bff",
              color: "white",
              border: "1px solid #007bff",
              borderRadius: "4px",
              transition: "background-color 0.3s ease, color 0.3s ease",
            }}
          >
            Subir archvio
          </label>
          <input
            id="file-upload"
            type="file"
            accept=".xlsx"
            onChange={handleFileUpload}
            style={{ display: "none" }}
          />
        </div>
        <HotTable settings={settings} />
        <div style={{ position: "absolute", bottom: "10px", right: "10px" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button color="Neutral" onClick={closeModal}>
              Cerrar (X)
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AddExcelFillOrder;
