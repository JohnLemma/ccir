import React, { useState } from 'react';
import { BomItem } from '../types';
import { exportToExcel, exportToPdf } from '../services/exportService';

interface BomTableProps {
  bomData: BomItem[];
}

const BomTable: React.FC<BomTableProps> = ({ bomData }) => {
  const [copyButtonText, setCopyButtonText] = useState('Copy Table');

  if (bomData.length === 0) {
    return (
      <div className="text-center py-10 px-4 bg-white rounded-lg shadow-md">
        <p className="text-gray-500">
          Configure your motors and board options, then click "Generate BOM" to see the results here.
        </p>
      </div>
    );
  }
  
  const handleCopy = () => {
    // Create a tab-separated string for easy pasting into spreadsheets
    const headers = ['Item', 'Description', 'Quantity', 'Unit'].join('\t');
    const rows = bomData.map(item => 
      [item.item, item.description, item.quantity, item.unit].join('\t')
    ).join('\n');
    
    const tableString = `${headers}\n${rows}`;
    
    navigator.clipboard.writeText(tableString).then(() => {
      setCopyButtonText('Copied!');
      setTimeout(() => {
        setCopyButtonText('Copy Table');
      }, 2000); // Revert text after 2 seconds
    }).catch(err => {
      console.error('Failed to copy table: ', err);
      alert('Failed to copy table to clipboard.');
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
        <h2 className="text-2xl font-bold text-brand-green">Bill of Materials</h2>
        <div className="flex items-center space-x-2">
           <button
            onClick={handleCopy}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition-all duration-200"
          >
            {copyButtonText}
          </button>
          <button
            onClick={() => exportToPdf(bomData)}
            className="px-4 py-2 text-sm font-medium text-white bg-brand-orange rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors"
          >
            Export PDF
          </button>
          <button
            onClick={() => exportToExcel(bomData)}
            className="px-4 py-2 text-sm font-medium text-white bg-brand-green rounded-md hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
          >
            Export Excel
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-brand-green">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Item</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Description</th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider">Quantity</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Unit</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {bomData.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-brand-dark">{item.item}</td>
                <td className="px-6 py-4 whitespace-normal text-sm text-gray-600">{item.description}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 text-right">{item.quantity}</td>
                <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-600">{item.unit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BomTable;