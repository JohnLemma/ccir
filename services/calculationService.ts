import { Motor, BoardOptions, BomItem, StarterType, OverloadData, CableData, ContactorData } from '../types';
import { IFL_PER_KW, BREAKER_SIZES, OVERLOAD_RELAY_DATA, CABLE_AMPACITY_DATA, CONTACTOR_SIZES, POWER_TERMINAL_SIZES } from '../constants';

const calculateIfl = (kw: number): number => (kw / 0.88) * IFL_PER_KW;

const selectBreaker = (amps: number): number => {
  return BREAKER_SIZES.find(size => size >= amps) || BREAKER_SIZES[BREAKER_SIZES.length - 1];
};

const selectOverload = (amps: number): OverloadData => {
  return OVERLOAD_RELAY_DATA.find(o => amps >= o.min && amps <= o.max) || OVERLOAD_RELAY_DATA[OVERLOAD_RELAY_DATA.length-1];
};

const selectContactor = (amps: number): ContactorData => {
    return CONTACTOR_SIZES.find(c => c.ac3 >= amps) || CONTACTOR_SIZES[CONTACTOR_SIZES.length - 1];
}

const selectCable = (amps: number): CableData => {
  const selected = CABLE_AMPACITY_DATA.find(c => c.ampacity >= amps) || CABLE_AMPACITY_DATA[CABLE_AMPACITY_DATA.length - 1];
  
  if (selected.size < 2.5) {
    return CABLE_AMPACITY_DATA.find(c => c.size === 2.5)!; 
  }

  return selected;
};

const selectTerminal = (amps: number): number => {
    return POWER_TERMINAL_SIZES.find(size => size >= amps) || POWER_TERMINAL_SIZES[POWER_TERMINAL_SIZES.length - 1];
}

class BomAggregator {
  private bomMap: Map<string, BomItem> = new Map();

  add(item: string, description: string, quantity: number, unit: string) {
    const key = `${item}-${description}-${unit}`;
    if (this.bomMap.has(key)) {
      const existing = this.bomMap.get(key)!;
      existing.quantity += quantity;
    } else {
      this.bomMap.set(key, { item, description, quantity, unit });
    }
  }

  getBom(): BomItem[] {
    return Array.from(this.bomMap.values()).sort((a, b) => a.item.localeCompare(b.item));
  }
}

export const generateBom = (motors: Motor[], boardOptions: BoardOptions): BomItem[] => {
  const bom = new BomAggregator();
  let totalIfl = 0;

  motors.forEach((motor) => {
    const ifl = calculateIfl(motor.kw);
    totalIfl += ifl;

    bom.add('3-Phase Breaker', `${selectBreaker(ifl * 1.25)}A`, 1, 'pcs');

    if (motor.starterType === 'StarDelta') {
      const mainContactorAmps = ifl * 0.58;
      const starContactorAmps = ifl * 0.33;
      const mainDeltaContactor = selectContactor(mainContactorAmps);
      const starContactor = selectContactor(starContactorAmps);
      
      const mainDeltaDesc = `Ith ${mainDeltaContactor.ac1}A (D${mainDeltaContactor.ac3})`;
      const starDesc = `Ith ${starContactor.ac1}A (D${starContactor.ac3})`;

      bom.add('Contactor (Main/Delta)', mainDeltaDesc, 2, 'pcs');
      bom.add('Contactor (Star)', starDesc, 1, 'pcs');
      
      const overloadAmps = ifl * 0.58;
      const selectedOverload = selectOverload(overloadAmps);
      bom.add('Overload Relay', `${selectedOverload.range}A`, 1, 'pcs');
      bom.add('Timer', 'Star-Delta', 1, 'pcs');

    } else { // DOL or ForwardReverse
      const contactorQty = motor.starterType === 'ForwardReverse' ? 2 : 1;
      const selectedContactor = selectContactor(ifl);
      const contactorItem = motor.starterType === 'ForwardReverse' ? 'Contactor (Fwd/Rev)' : 'Contactor (DOL)';
      const contactorDesc = `Ith ${selectedContactor.ac1}A (D${selectedContactor.ac3})`;
      bom.add(contactorItem, contactorDesc, contactorQty, 'pcs');

      const selectedOverload = selectOverload(ifl);
      bom.add('Overload Relay', `${selectedOverload.range}A`, 1, 'pcs');
    }
    
    if (motor.starterType === 'ForwardReverse') {
        bom.add('Auxiliary Contact Block', 'Interlocking', 2, 'pcs');
    }
    if (motor.hasOffIndicator) {
        bom.add('Auxiliary Contact Block', 'Signal Contact', 1, 'pcs');
    }

    if (motor.starterType === 'StarDelta') {
        const terminalRating = selectTerminal(ifl * 0.58 * 1.25);
        bom.add('Power Terminals', `${terminalRating}A`, 6, 'pcs');
    } else {
        const terminalRating = selectTerminal(ifl * 1.25);
        bom.add('Power Terminals', `${terminalRating}A`, 3, 'pcs');
    }

    if (motor.starterType === 'StarDelta') {
        const mainCable = selectCable(ifl);
        const deltaCable = selectCable(ifl * 0.58);
        const starCable = selectCable(ifl * 0.33);
        const starJumperCable = selectCable(ifl * 0.33);

        bom.add('Power Cable (Supply)', `${mainCable.size}mm²`, 1, 'set');
        bom.add('Power Cable (Motor Delta)', `${deltaCable.size}mm²`, 1, 'set');
        bom.add('Power Cable (Star Jumper)', `${starJumperCable.size}mm²`, 1, 'set');

        bom.add('Power Lugs', `${mainCable.size}mm²`, 8, 'pcs');
        bom.add('Power Lugs', `${deltaCable.size}mm²`, 12, 'pcs');
        bom.add('Power Lugs', `${starCable.size}mm²`, 12, 'pcs');
    } else {
        const mainCable = selectCable(ifl);
        bom.add('Power Cable (Motor)', `${mainCable.size}mm²`, 1, 'set');
        bom.add('Power Lugs', `${mainCable.size}mm²`, 15, 'pcs');
    }
    
    bom.add('Indicator Light', 'Green', 1, 'pcs');
    bom.add('Push Button', 'Green (Start)', 1, 'pcs');
    bom.add('Push Button', 'Red (Stop)', 1, 'pcs');

    if (motor.hasOffIndicator) {
      bom.add('Indicator Light', 'Red', 1, 'pcs');
    }
    if (motor.starterType === 'ForwardReverse') {
      bom.add('Indicator Light', 'Green', 1, 'pcs');
      bom.add('Push Button', 'Green (Reverse)', 1, 'pcs');
    }
  });

  if (motors.length > 0) {
    bom.add('Control Breaker', '16A, Single Phase', 1, 'pcs');
    bom.add('Phase Sequence Relay', '380V', 1, 'pcs');
    bom.add('Selector Switch', 'Auto/Manual', 1, 'pcs');
    const mainTerminalRating = selectTerminal(totalIfl * 1.25);
    bom.add('Main Power Terminals', `${mainTerminalRating}A`, 4, 'pcs');
  }

  if (boardOptions.has3PhaseIndicator) {
    bom.add('Indicator Light', 'Red', 1, 'pcs');
    bom.add('Indicator Light', 'Green', 1, 'pcs');
    bom.add('Indicator Light', 'Blue', 1, 'pcs');
  }

  if (boardOptions.hasEmergencyButton) {
    bom.add('Emergency Stop Button', 'Twist-to-release', 1, 'pcs');
  }
  
  // Create a snapshot of the BOM before adding control items
  const intermediateBom = bom.getBom();
  let controlLugs = 0, controlWireMeters = 0, cableTies = 0;

  // Calculate control items based on the components already in the BOM
  intermediateBom.forEach(item => {
    const qty = item.quantity;
    if (item.item.includes('Contactor')) {
      controlLugs += 12 * qty;
      controlWireMeters += 10 * qty;
      cableTies += 10 * qty;
    } else if (item.item.includes('Indicator Light')) {
      controlLugs += 2 * qty;
    } else if (item.item.includes('Push Button')) {
      controlLugs += 2 * qty; // Standard 1NO or 1NC block
    } else if (item.item.includes('Selector Switch')) {
      controlLugs += 4 * qty;
    } else if (item.item.includes('Emergency Stop')) {
      controlLugs += 4 * qty;
      controlWireMeters += 2 * qty;
      cableTies += 6 * qty;
    } else if (item.item.includes('Timer')) {
      controlLugs += 6 * qty;
    } else if (item.item.includes('Auxiliary')) {
      controlLugs += 6 * qty;
    } else if (item.item.includes('Phase Sequence Relay')) {
      // Assuming 3 for phases, 1 for control
      controlLugs += 4 * qty;
    }
  });
  
  if (boardOptions.has3PhaseIndicator) {
      controlWireMeters += 3;
      cableTies += 8;
  }

  if (controlLugs > 0) bom.add('Control Cable Lugs', '1.5mm²', controlLugs, 'pcs');
  if (controlWireMeters > 0) bom.add('Control Wire', '1.5mm²', controlWireMeters, 'meters');
  if (cableTies > 0) bom.add('Cable Ties', 'Assorted', cableTies, 'pcs');

  return bom.getBom();
};