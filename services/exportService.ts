import { BomItem } from '../types';

// These are expected to be available globally from the scripts in index.html
declare const jsPDF: any;
declare const XLSX: any;

declare global {
  interface Window {
    jspdf: any;
  }
}

export const exportToExcel = (bomData: BomItem[], fileName: string = 'BOM_Export'): void => {
  const worksheet = XLSX.utils.json_to_sheet([]);
  
  // Add Title
  XLSX.utils.sheet_add_aoa(worksheet, [['UC Automation & Manufacturing - Bill of Materials']], { origin: 'A1' });
  
  // Merge title cells
  worksheet['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 3 } }];

  const dataForSheet = bomData.map(({ item, description, quantity, unit }) => ({
    Item: item,
    Value: description,
    Quantity: quantity,
    Unit: unit,
  }));

  XLSX.utils.sheet_add_json(worksheet, dataForSheet, { origin: 'A3', skipHeader: false });
  
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'BOM');

  worksheet['!cols'] = [
    { wch: 30 }, // Item
    { wch: 60 }, // Value
    { wch: 10 }, // Quantity
    { wch: 10 }, // Unit
  ];
  
  // Style Header
  const header = ['A3', 'B3', 'C3', 'D3'];
  header.forEach((cellRef) => {
    if(worksheet[cellRef]) {
        worksheet[cellRef].s = {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "166534" } }, // brand-green
        };
    }
  });


  XLSX.writeFile(workbook, `${fileName}.xlsx`);
};

export const exportToPdf = (bomData: BomItem[], fileName:string = 'BOM_Export'): void => {
  const { jsPDF: JSPDF } = window.jspdf;
  const doc = new JSPDF();
  
  // Add Header
  doc.setFontSize(18);
  doc.setTextColor('#166534'); // brand-green
  doc.text("Bill of Materials", 105, 15, { align: 'center' });
  doc.setFontSize(10);
  doc.setTextColor('#1E293B'); // brand-dark
  doc.text("UC Automation & Manufacturing", 105, 22, { align: 'center' });


  (doc as any).autoTable({
    startY: 30,
    head: [['Item', 'Value', 'Quantity', 'Unit']],
    body: bomData.map(item => [item.item, item.description, item.quantity, item.unit]),
    headStyles: { fillColor: '#166534' }, // brand-green
    styles: { fontSize: 9 },
    columnStyles: {
      0: { cellWidth: 40 },
      1: { cellWidth: 90 },
      2: { cellWidth: 'auto', halign: 'right' },
      3: { cellWidth: 'auto' },
    }
  });

  doc.save(`${fileName}.pdf`);
};
