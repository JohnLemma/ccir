import React from 'react';
import { BomItem } from '../types';
import { exportToExcel, exportToPdf } from '../services/exportService';

interface BomTableProps {
  bomData: BomItem[];
}

const BomTable: React.FC<BomTableProps> = ({ bomData }) => {
  if (bomData.length === 0) {
    return (
      <div className="text-center py-10 px-4 bg-white rounded-lg shadow-md">
        <p className="text-gray-500">
          Configure your motors and board options, then click "Generate BOM" to see the results here.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
        <h2 className="text-2xl font-bold text-brand-green">Bill of Materials</h2>
        <div className="flex space-x-2">
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