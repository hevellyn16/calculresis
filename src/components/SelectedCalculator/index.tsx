import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

type BandData = {
  value: string | number | undefined;
  colorClass: string;
};

type BandType = 'D1' | 'D2' | 'D3' | 'Multiplier' | 'Tolerance' | 'PPM' | null;

type SelectedDisplayProps = {
  band1: BandData;
  band2: BandData;
  band3?: BandData;
  multiplier: BandData;
  tolerance: BandData;
  ppm?: BandData;
  activeBand: BandType;
  onBandPress: (band: BandType) => void;
  selectedBandCount: string | number;
};

export default function SelectedDisplay({
  band1,
  band2,
  band3,
  multiplier,
  tolerance,
  ppm,
  activeBand,
  onBandPress,
  selectedBandCount
}: SelectedDisplayProps) {

    console.log("--- SelectedDisplay Re-rendered ---");
    console.log("Props received:");
    console.log("  band1:", band1);
    console.log("  band2:", band2);
    console.log("  band3:", band3);
    console.log("  multiplier:", multiplier);
    console.log("  tolerance:", tolerance);
    console.log("  ppm:", ppm);
    console.log("  activeBand:", activeBand);
    console.log("  selectedBandCount:", selectedBandCount);

  const renderBand = (data: BandData | undefined, bandType: BandType, isTolerance: boolean = false, isPPM: boolean = false) => {
    if (bandType === 'D3' && !(selectedBandCount === '5' || selectedBandCount === '6')) return null;
    if (bandType === 'PPM' && selectedBandCount !== '6') return null;

    const effectiveData: BandData = data || { value: undefined, colorClass: 'bg-transparent' };

    const actualColorClass = effectiveData.colorClass;

    let widthClass = 'w-[15px]';
    const isActive = activeBand === bandType;

   const activeBorderClass = isActive
  ? 'border-transparent border-[1px]' // Usar border transparente para manter o tamanho do botão
  : 'border-transparent border-[1px]';

    return (
      <TouchableOpacity
        key={bandType}
        className={`
          flex items-center justify-center
          h-[30px] ${widthClass}
          px-[7px]
          py-[6px]
          ${actualColorClass} rounded-[5px]
          ${activeBorderClass}
        `}
        onPress={() => onBandPress(bandType)}
      >

      </TouchableOpacity>
    );
  };

  return (
    <View className=" flex-row items-center justify-center gap-[10px] mb-0 p-2 rounded-[5px] shadow-md shadow-black/30 bg-resistor-tableDisplay">
      {renderBand(band1, 'D1')}
      {renderBand(band2, 'D2')}
      {renderBand(band3, 'D3')} 
      {renderBand(multiplier, 'Multiplier')}
      {renderBand(tolerance, 'Tolerance', true)}
      {renderBand(ppm, 'PPM', false, true)}
    </View>
  );
}