export type StarterType = 'DOL' | 'ForwardReverse' | 'StarDelta';

export interface Motor {
  id: number;
  kw: number;
  starterType: StarterType;
  hasOffIndicator: boolean;
  hasLimitSwitch: boolean;
}

export interface BoardOptions {
  has3PhaseIndicator: boolean;
  hasEmergencyButton: boolean;
}

export interface BomItem {
  item: string;
  description: string;
  quantity: number;
  unit: string;
}

export interface OverloadData {
  range: string;
  min: number;
  max: number;
  ref: string;
  connectionType: 'Screw Clamp' | 'EverLink' | 'Lugs';
}

export interface CableData {
  size: number;
  ampacity: number;
}

export interface ContactorData {
  ac3: number;
  ac1: number;
}