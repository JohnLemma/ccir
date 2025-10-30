import React from 'react';
import { Motor, StarterType } from '../types';
import { STANDARD_MOTOR_KW } from '../constants';

interface MotorConfigProps {
  motor: Motor;
  index: number;
  updateMotor: (id: number, field: keyof Motor, value: any) => void;
  removeMotor: (id: number) => void;
}

const MotorConfig: React.FC<MotorConfigProps> = ({ motor, index, updateMotor, removeMotor }) => {
  const handleStarterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateMotor(motor.id, 'starterType', e.target.value as StarterType);
  };

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 relative mb-4 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-brand-green">Motor {index + 1}</h3>
        <button
          onClick={() => removeMotor(motor.id)}
          className="text-red-500 hover:text-red-700 font-bold text-2xl leading-none"
          aria-label={`Remove Motor ${index + 1}`}
        >
          &times;
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor={`kw-${motor.id}`} className="block text-sm font-medium text-gray-700">
            Power (kW)
          </label>
          <select
            id={`kw-${motor.id}`}
            value={motor.kw}
            onChange={(e) => updateMotor(motor.id, 'kw', parseFloat(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-orange focus:ring-brand-orange sm:text-sm"
          >
            {STANDARD_MOTOR_KW.map(kwValue => (
              <option key={kwValue} value={kwValue}>
                {kwValue} kW
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={`starter-${motor.id}`} className="block text-sm font-medium text-gray-700">
            Starter Type
          </label>
          <select
            id={`starter-${motor.id}`}
            value={motor.starterType}
            onChange={handleStarterChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-orange focus:ring-brand-orange sm:text-sm"
          >
            <option value="DOL">Direct On-Line (DOL)</option>
            <option value="ForwardReverse">Forward / Reverse</option>
            <option value="StarDelta">Star / Delta</option>
          </select>
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <div className="flex items-center">
          <input
            id={`off-indicator-${motor.id}`}
            type="checkbox"
            checked={motor.hasOffIndicator}
            onChange={(e) => updateMotor(motor.id, 'hasOffIndicator', e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-brand-orange focus:ring-brand-orange"
          />
          <label htmlFor={`off-indicator-${motor.id}`} className="ml-2 block text-sm text-gray-900">
            Add "OFF" Indicator Light
          </label>
        </div>
         <div className="flex items-center">
          <input
            id={`limit-switch-${motor.id}`}
            type="checkbox"
            checked={motor.hasLimitSwitch}
            onChange={(e) => updateMotor(motor.id, 'hasLimitSwitch', e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-brand-orange focus:ring-brand-orange"
          />
          <label htmlFor={`limit-switch-${motor.id}`} className="ml-2 block text-sm text-gray-900">
            Has Limit Switch (for reference)
          </label>
        </div>
      </div>
    </div>
  );
};

export default MotorConfig;