import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Spinner } from '@nextui-org/react';
import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Workbook } from 'exceljs';
import CopyToClipboard from 'react-copy-to-clipboard';
const ExcelQuotes = () => {
  const [loadingExcel, setLoadingExcel] = useState(false);
  const [loadingPDF, setLoadingPDF] = useState(false);
  const [CotizacionesExcel, setCotizacionesExcel] = useState([]);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const fileInputRef = React.createRef();
  useEffect(() => {
    fetch('https://localhost:443/Cotizaciones')
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCotizacionesExcel(data);
        } else {
          console.error('Los datos recibidos no son válidos.');
        }
      })
      .catch((error) => console.error('Error al obtener los datos:', error));
  }, []);

  const handleDownloadExcel = () => {
    setLoadingExcel(true);
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('CotizacionesExcel');
    const headerStyle = {
      alignment: { horizontal: 'center', vertical: 'middle' },
    };
    const columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'Folio', key: 'folio', width: 20 },
      { header: 'Código Fabricante', key: 'codigoFabricante', width: 20 },
      { header: 'Nombre', key: 'nombre', width: 15 },
      { header: 'Marca', key: 'marca', width: 15 },
      { header: 'Categoría', key: 'categoria', width: 15 },
      { header: 'Existenncia', key: 'existencia', width: 15 },
      { header: 'BackOrder', key: 'backOrder', width: 15 },
      { header: 'Cantidad', key: 'cantidad', width: 15 },
      { header: 'Precio', key: 'precio', width: 15 },
      { header: 'Descuento', key: 'descuento', width: 15 },
      { header: 'Total', key: 'total', width: 15 },
      { header: 'isUpdated', key: 'isUpdated', width: 15 },
      { header: 'isDeleted', key: 'isDeleted', width: 15 },
      { header: 'Fecha de Creación', key: 'DateCreation', width: 25 },
      { header: 'Fecha de Modificación', key: 'DateModification', width: 25 },
    ];
    worksheet.columns = columns;
    worksheet.getRow(1).eachCell((cell) => {
      cell.fill = headerStyle.fill;
      cell.font = headerStyle.font;
      cell.alignment = headerStyle.alignment;
    });
    CotizacionesExcel.forEach((item) => {
      const row = worksheet.addRow(item);
      row.eachCell((cell) => {
        cell.alignment = { horizontal: 'center', vertical: 'middle' };
      });
    });
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Quotes.xlsx';
      document.body.appendChild(a);
      a.click();
      setLoadingExcel(false);
    });
  };
  const handleDownloadPDF = () => {
    setLoadingPDF(true);
    const doc = new jsPDF({
      orientation: 'landscape',
    });
    const columns = [
      'ID', 'Código Empresa', 'Código Fabricante', 'Nombre', 'Marca', 'Categoría', 'Existencia', 'BackOrder', 'Cantidad', 'Precio', 'Descuento', 'Total', 'isUpdated', 'isDeleted', 'Fecha de Creación', 'Fecha de Modificación',
    ];
    const rows = CotizacionesExcel.map(item => [
      item.idproducto, item.codigoEmpresa, item.codigoFabricante, item.nombre, item.marca, item.categoria, item.existencia, item.backOrder, item.cantidad, item.precio, item.descuento, item.total, item.isUpdated, item.isDeleted, item.DateCreation, item.DateModification,
    ]);
    doc.autoTable({
      head: [columns],
      body: rows,
      startY: 5,
      styles: {
        font: 'helvetica',
        fontSize: 5,
        cellPadding: { top: 0.5, right: 0.5, bottom: 0.5, left: 0.5 },
        rowHeight: 0.0000000000001,
        valign: 'middle',
        halign: 'center',
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
        lineWidth: 0.1,
      },
      columnStyles: {
        0: { halign: 'center', cellWidth: 10 },
        1: { halign: 'center', cellWidth: 15 },
        2: { halign: 'center', cellWidth: 15 },
        3: { halign: 'center', cellWidth: 15 },
        4: { halign: 'center', cellWidth: 15 },
        5: { halign: 'center', cellWidth: 15 },
        6: { halign: 'center', cellWidth: 15 },
        7: { halign: 'center', cellWidth: 15 },
        8: { halign: 'center', cellWidth: 15 },
        9: { halign: 'center', cellWidth: 15 },
        10: { halign: 'center', cellWidth: 15 },
        11: { halign: 'center', cellWidth: 15 },
        12: { halign: 'center', cellWidth: 15 },
        13: { halign: 'center', cellWidth: 15 },
        14: { halign: 'center', cellWidth: 20 },
        15: { halign: 'center', cellWidth: 20 },

      },
    });
    doc.save('Excel Quotes.pdf');
    setLoadingPDF(false);
  };
  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      <div>
        <Button size='sm' color='primary'>
        <Dropdown>
          <DropdownTrigger  color='primary' size={'sm'}>Exportar</DropdownTrigger>
          <DropdownMenu aria-label="Static Actions" color='Primary'  variant={'solid'}>
            <DropdownItem key="excel">
              {!loadingExcel ? (
                <div flat color="success" onClick={handleDownloadExcel}>
                  Descargar Excel
                </div>
              ) : (
                <Button flat color="success" disabled>
                  <Spinner size="sm" /> Descargando Excel
                </Button>
              )}
            </DropdownItem>
            <DropdownItem key="pdf">
              {!loadingPDF ? (
                <div flat color="success" onClick={handleDownloadPDF}>
                  Descargar PDF
                </div>
              ) : (
                <div flat color="success" disabled>
                  <Spinner size="sm" /> Descargando PDF
                </div>
              )}
            </DropdownItem>
            <DropdownItem key="copy">
              <CopyToClipboard text={JSON.stringify(CotizacionesExcel, null, 2)}>
                <div flat color="success">Copiar</div>
              </CopyToClipboard>
            </DropdownItem>
            <DropdownItem key="print">
              <div flat color="success" onClick={handlePrint}>
                Imprimir
              </div>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        </Button>
      </div>
    </div>
  );
};
export default ExcelQuotes;

