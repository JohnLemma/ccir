import React, { useState, useCallback } from 'react';
import { Motor, BoardOptions, BomItem } from './types';
import MotorConfig from './components/MotorConfig';
import BomTable from './components/BomTable';
import { generateBom } from './services/calculationService';

const App: React.FC = () => {
  const [motors, setMotors] = useState<Motor[]>([]);
  const [boardOptions, setBoardOptions] = useState<BoardOptions>({
    has3PhaseIndicator: true,
    hasEmergencyButton: true,
  });
  const [bomData, setBomData] = useState<BomItem[]>([]);

  const addMotor = () => {
    const newMotor: Motor = {
      id: Date.now(),
      kw: 5.5,
      starterType: 'DOL',
      hasOffIndicator: false,
      hasLimitSwitch: false,
    };
    setMotors([...motors, newMotor]);
  };

  const removeMotor = (id: number) => {
    setMotors(motors.filter(motor => motor.id !== id));
  };

  const updateMotor = useCallback((id: number, field: keyof Motor, value: any) => {
    setMotors(prevMotors =>
      prevMotors.map(motor =>
        motor.id === id ? { ...motor, [field]: value } : motor
      )
    );
  }, []);

  const updateBoardOption = (field: keyof BoardOptions, value: boolean) => {
    setBoardOptions(prev => ({ ...prev, [field]: value }));
  };

  const handleGenerateBom = () => {
    const generated = generateBom(motors, boardOptions);
    setBomData(generated);
  };
  
  const resetAll = () => {
    setMotors([]);
    setBomData([]);
    setBoardOptions({
        has3PhaseIndicator: true,
        hasEmergencyButton: true,
    });
  }

  return (
    <div className="flex flex-col min-h-screen text-brand-dark p-4 sm:p-6 lg:p-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-brand-green tracking-tight">
          UC Automation & Manufacturing
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          Industrial Electrical Board BOM Generator
        </p>
      </header>

      <main className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto w-full">
        <div className="bg-gray-50 p-6 rounded-lg shadow-md border border-gray-200 self-start">
          <h2 className="text-2xl font-bold text-brand-green mb-4">Configuration</h2>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6 shadow-sm">
             <h3 className="text-lg font-semibold text-brand-green mb-3">Global Board Options</h3>
             <div className="space-y-2">
               <div className="flex items-center">
                  <input
                    id="3-phase-indicator"
                    type="checkbox"
                    checked={boardOptions.has3PhaseIndicator}
                    onChange={(e) => updateBoardOption('has3PhaseIndicator', e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-brand-orange focus:ring-brand-orange"
                  />
                  <label htmlFor="3-phase-indicator" className="ml-2 block text-sm text-gray-900">
                    3-Phase Power Indicator
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="emergency-button"
                    type="checkbox"
                    checked={boardOptions.hasEmergencyButton}
                    onChange={(e) => updateBoardOption('hasEmergencyButton', e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-brand-orange focus:ring-brand-orange"
                  />
                  <label htmlFor="emergency-button" className="ml-2 block text-sm text-gray-900">
                    Emergency Stop Button
                  </label>
                </div>
             </div>
          </div>
          
          {motors.map((motor, index) => (
            <MotorConfig
              key={motor.id}
              motor={motor}
              index={index}
              updateMotor={updateMotor}
              removeMotor={removeMotor}
            />
          ))}

          <button
            onClick={addMotor}
            className="w-full mt-2 py-2 px-4 border border-dashed border-gray-400 text-gray-600 rounded-md hover:bg-gray-100 hover:text-gray-800 transition-colors"
          >
            + Add Motor
          </button>
          
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleGenerateBom}
                className="flex-1 py-3 px-4 text-lg font-semibold text-white bg-brand-orange rounded-md shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-orange transition-all"
              >
                Generate BOM
              </button>
              <button
                onClick={resetAll}
                className="flex-1 py-3 px-4 text-lg font-semibold text-gray-700 bg-gray-200 rounded-md shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition-all"
              >
                Reset
              </button>
          </div>
        </div>

        <div className="w-full self-start">
          <BomTable bomData={bomData} />
        </div>
      </main>
       <footer className="text-center mt-12 py-4 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} UC Automation & Manufacturing. All rights reserved.
          </p>
          <p className="text-xs text-gray-400 mt-1">
            For inquiries, contact: info@uc-automation.com
          </p>
        </footer>
    </div>
  );
};

export default App;