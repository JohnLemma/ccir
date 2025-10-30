import { OverloadData, CableData, ContactorData } from './types';

export const VOLTAGE = 380;
export const IFL_PER_KW = 1.9; // Approximation for 3-phase 380V motor

export const STANDARD_MOTOR_KW: number[] = [
  0.37, 0.55, 0.75, 1.1, 1.5, 2.2, 3, 4, 5.5, 7.5, 11, 15, 18.5, 22, 30, 37, 45, 55, 75, 90, 110, 132, 160, 200
];

export const BREAKER_SIZES: number[] = [2, 4, 6, 10, 16, 20, 25, 32, 40, 50, 63, 80, 100, 125, 160, 200, 250, 320, 400, 500, 630, 800];

export const CONTACTOR_SIZES: ContactorData[] = [
  { ac3: 6, ac1: 16 },
  { ac3: 9, ac1: 25 },
  { ac3: 12, ac1: 25 },
  { ac3: 18, ac1: 32 },
  { ac3: 25, ac1: 40 },
  { ac3: 32, ac1: 50 },
  { ac3: 40, ac1: 60 },
  { ac3: 50, ac1: 80 },
  { ac3: 65, ac1: 80 },
  { ac3: 75, ac1: 100 },
  { ac3: 95, ac1: 125 },
  { ac3: 115, ac1: 200 },
  { ac3: 150, ac1: 250 },
  { ac3: 185, ac1: 315 },
  { ac3: 225, ac1: 350 },
  { ac3: 265, ac1: 400 },
  { ac3: 330, ac1: 500 },
  { ac3: 400, ac1: 600 },
  { ac3: 500, ac1: 700 },
  { ac3: 630, ac1: 800 },
];

export const OVERLOAD_RELAY_DATA: OverloadData[] = [
  // Class 10 A for connection by screw clamp terminals
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
  // Class 10 A for connection by EverLink
  { range: '9...13', min: 9, max: 13, ref: 'LRD 313', connectionType: 'EverLink' },
  { range: '12...18', min: 12, max: 18, ref: 'LRD 318', connectionType: 'EverLink' },
  { range: '17...25', min: 17, max: 25, ref: 'LRD 325', connectionType: 'EverLink' },
  { range: '23...32', min: 23, max: 32, ref: 'LRD 332', connectionType: 'EverLink' },
  { range: '30...40', min: 30, max: 40, ref: 'LRD 340', connectionType: 'EverLink' },
  { range: '37...50', min: 37, max: 50, ref: 'LRD 350', connectionType: 'EverLink' },
  { range: '48...65', min: 48, max: 65, ref: 'LRD 365', connectionType: 'EverLink' },
  // Class 10 A for connection by screw clamp terminals (larger sizes)
  { range: '17...25', min: 17, max: 25, ref: 'LRD 3322', connectionType: 'Screw Clamp' },
  { range: '23...32', min: 23, max: 32, ref: 'LRD 3353', connectionType: 'Screw Clamp' },
  { range: '30...40', min: 30, max: 40, ref: 'LRD 3355', connectionType: 'Screw Clamp' },
  { range: '37...50', min: 37, max: 50, ref: 'LRD 3357', connectionType: 'Screw Clamp' },
  { range: '48...65', min: 48, max: 65, ref: 'LRD 3359', connectionType: 'Screw Clamp' },
  { range: '55...70', min: 55, max: 70, ref: 'LRD 3361', connectionType: 'Screw Clamp' },
  { range: '63...80', min: 63, max: 80, ref: 'LRD 3363', connectionType: 'Screw Clamp' },
  { range: '80...104', min: 80, max: 104, ref: 'LRD 3365', connectionType: 'Screw Clamp' },
  { range: '80...104', min: 80, max: 104, ref: 'LRD 4365', connectionType: 'Lugs' },
  { range: '95...120', min: 95, max: 120, ref: 'LRD 4367', connectionType: 'Lugs' },
  { range: '110...140', min: 110, max: 140, ref: 'LRD 4369', connectionType: 'Lugs' },
  // Electronic Overloads (simulated for larger motors)
  { range: '90...150', min: 90, max: 150, ref: 'LR9F 7371', connectionType: 'Lugs' },
  { range: '132...220', min: 132, max: 220, ref: 'LR9F 7375', connectionType: 'Lugs' },
  { range: '200...330', min: 200, max: 330, ref: 'LR9F 7379', connectionType: 'Lugs' },
  { range: '300...500', min: 300, max: 500, ref: 'LR9F 7381', connectionType: 'Lugs' },
];

// Using "2 or 3 charged conductors" column
export const CABLE_AMPACITY_DATA: CableData[] = [
  { size: 0.75, ampacity: 12 },
  { size: 1.00, ampacity: 15 },
  { size: 1.50, ampacity: 18 },
  { size: 2.50, ampacity: 26 },
  { size: 4.00, ampacity: 34 },
  { size: 6.00, ampacity: 44 },
  { size: 10.00, ampacity: 61 },
  { size: 16.00, ampacity: 82 },
  { size: 25.00, ampacity: 108 },
  { size: 35.00, ampacity: 135 },
  { size: 50.00, ampacity: 168 },
  { size: 70.00, ampacity: 207 },
  { size: 95.00, ampacity: 250 },
  { size: 120.00, ampacity: 292 },
  { size: 150.00, ampacity: 335 },
  { size: 185.00, ampacity: 382 },
  { size: 240.00, ampacity: 453 },
  { size: 300.00, ampacity: 523 },
];