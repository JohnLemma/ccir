import { OverloadData, CableData, ContactorData } from './types';

export const VOLTAGE = 380;
export const IFL_PER_KW = 1.9; // Approximation for 3-phase 380V motor

export const STANDARD_MOTOR_KW: number[] = [0.37, 0.55, 0.75, 1.1, 1.5, 2.2, 3, 4, 5.5, 7.5, 11, 15, 18.5, 22, 30, 37, 45, 55, 75, 90, 110, 132, 150, 160, 185, 200];

export const BREAKER_SIZES: number[] = [6, 10, 16, 20, 25, 32, 40, 50, 63, 80, 100, 125, 160, 200, 250, 320, 400, 500, 630];

export const POWER_TERMINAL_SIZES: number[] = [16, 25, 35, 50, 70, 95, 120, 150, 185, 240, 300, 400, 500, 630];

export const CONTACTOR_SIZES: ContactorData[] = [
    { ac3: 6, ac1: 16 }, { ac3: 9, ac1: 25 }, { ac3: 12, ac1: 25 }, { ac3: 18, ac1: 32 },
    { ac3: 25, ac1: 40 }, { ac3: 32, ac1: 50 }, { ac3: 40, ac1: 60 }, { ac3: 50, ac1: 80 },
    { ac3: 65, ac1: 80 }, { ac3: 75, ac1: 100 }, { ac3: 80, ac1: 125 }, { ac3: 95, ac1: 125 },
    { ac3: 115, ac1: 160 }, { ac3: 150, ac1: 200 }, { ac3: 185, ac1: 250 }, { ac3: 225, ac1: 275 },
    { ac3: 265, ac1: 350 }, { ac3: 330, ac1: 400 }, { ac3: 400, ac1: 500 }
];

export const OVERLOAD_RELAY_DATA: OverloadData[] = [
  { range: '0.10...0.16', min: 0.10, max: 0.16, ref: 'LRD 01', connectionType: 'Screw Clamp' },
  { range: '0.16...0.25', min: 0.16, max: 0.25, ref: 'LRD 02', connectionType: 'Screw Clamp' },
  { range: '0.25...0.40', min: 0.25, max: 0.40, ref: 'LRD 03', connectionType: 'Screw Clamp' },
  { range: '0.40...0.63', min: 0.40, max: 0.63, ref: 'LRD 04', connectionType: 'Screw Clamp' },
  { range: '0.63...1', min: 0.63, max: 1, ref: 'LRD 05', connectionType: 'Screw Clamp' },
  { range: '1...1.6', min: 1, max: 1.6, ref: 'LRD 06', connectionType: 'Screw Clamp' },
  { range: '1.6...2.5', min: 1.6, max: 2.5, ref: 'LRD 07', connectionType: 'Screw Clamp' },
  { range: '2.5...4', min: 2.5, max: 4, ref: 'LRD 08', connectionType: 'Screw Clamp' },
  { range: '4...6', min: 4, max: 6, ref: 'LRD 10', connectionType: 'Screw Clamp' },
  { range: '5.5...8', min: 5.5, max: 8, ref: 'LRD 12', connectionType: 'Screw Clamp' },
  { range: '7...10', min: 7, max: 10, ref: 'LRD 14', connectionType: 'Screw Clamp' },
  { range: '9...13', min: 9, max: 13, ref: 'LRD 16', connectionType: 'Screw Clamp' },
  { range: '12...18', min: 12, max: 18, ref: 'LRD 21', connectionType: 'Screw Clamp' },
  { range: '16...24', min: 16, max: 24, ref: 'LRD 22', connectionType: 'Screw Clamp' },
  { range: '23...32', min: 23, max: 32, ref: 'LRD 32', connectionType: 'Screw Clamp' },
  { range: '30...38', min: 30, max: 38, ref: 'LRD 35', connectionType: 'Screw Clamp' },
  { range: '37...50', min: 37, max: 50, ref: 'LRD 360', connectionType: 'EverLink' },
  { range: '48...65', min: 48, max: 65, ref: 'LRD 365', connectionType: 'EverLink' },
  { range: '63...80', min: 63, max: 80, ref: 'LRD 3363', connectionType: 'Screw Clamp' },
  { range: '80...104', min: 80, max: 104, ref: 'LRD 3365', connectionType: 'Screw Clamp' },
  { range: '95...120', min: 95, max: 120, ref: 'LRD 33676', connectionType: 'Lugs' },
  { range: '110...140', min: 110, max: 140, ref: 'LRD 33696', connectionType: 'Lugs' },
  { range: '130...160', min: 130, max: 160, ref: 'LRD4367', connectionType: 'Lugs' },
  { range: '150...200', min: 150, max: 200, ref: 'LRD4369', connectionType: 'Lugs' },
];

export const CABLE_AMPACITY_DATA: CableData[] = [
  { size: 1.5, ampacity: 18 },
  { size: 2.5, ampacity: 26 },
  { size: 4, ampacity: 34 },
  { size: 6, ampacity: 44 },
  { size: 10, ampacity: 61 },
  { size: 16, ampacity: 82 },
  { size: 25, ampacity: 108 },
  { size: 35, ampacity: 135 },
  { size: 50, ampacity: 168 },
  { size: 70, ampacity: 207 },
  { size: 95, ampacity: 250 },
  { size: 120, ampacity: 292 },
  { size: 150, ampacity: 335 },
  { size: 185, ampacity: 382 },
  { size: 240, ampacity: 453 },
  { size: 300, ampacity: 523 },
];
