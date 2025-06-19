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

  const renderBand = (data: BandData, bandType: BandType, isTolerance: boolean = false, isPPM: boolean = false, alwaysRender: boolean = false) => {
    if (!alwaysRender && (data.value === undefined && data.colorClass === 'bg-transparent')) {
      return null;
    }

    const actualColorClass = data.colorClass; 


    const actualValue = data.value !== undefined && data.value !== null ? data.value : '';

    const widthClass = isTolerance ? 'w-[66px]' : (isPPM ? 'w-[66px]' : 'w-[33px]');

    const textColorClass = (actualColorClass === 'bg-black' || actualColorClass === 'bg-resistor-brown' || actualColorClass === 'bg-blue-500' || actualColorClass === 'bg-purple-500' || actualColorClass === 'bg-red-500' || actualColorClass === 'bg-gray-500')
      ? 'text-white'
      : 'text-black';

    const isActive = activeBand === bandType;

    const activeBorderClass = isActive
      ? 'border-2 border-orange-500'
      : 'border border-gray-300'; // Sempre uma borda cinza para inativas

    return (
      <TouchableOpacity
        key={bandType}
        className={`
          flex items-center justify-center
          h-[30px] ${widthClass}
          py-[6px] px-[7px]
          gap-[10px]
          ${actualColorClass} rounded-[5px] {/* Usar actualColorClass simples */}
          ${activeBorderClass}
        `}
        onPress={() => onBandPress(bandType)}
      >
  
        {actualValue !== '' && ( 
          <Text className={`font-bold text-xs ${textColorClass}`}>
            {actualValue}
          </Text>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View className="py-2 flex flex-row items-center justify-center gap-[10px] mb-6 p-2 rounded-[5px] shadow-md shadow-black/30 bg-orange-300">
      {renderBand(band1, 'D1', false, false, true)}
      {renderBand(band2, 'D2', false, false, true)}
      {renderBand(multiplier, 'Multiplier', false, false, true)}
      {renderBand(tolerance, 'Tolerance', true, false, true)}
      
      {(selectedBandCount === '5' || selectedBandCount === '6') && band3 && renderBand(band3, 'D3')}
      {selectedBandCount === '6' && ppm && renderBand(ppm, 'PPM', false, true)}
    </View>
  );
}