import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

type BandData = {
  value: string | number | undefined;
  colorClass: string;
};

type BandType = 'D1' | 'D2' | 'D3' | 'Multiplier' | 'Tolerance' | 'PPM' | null;

type ResistorDisplayProps = {
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
  selectedBandCount,
}: ResistorDisplayProps) {

  const renderBand = (data: BandData | undefined, bandType: BandType, isTolerance: boolean = false, isPPM: boolean = false) => {

    if (!data) return null;

    const widthClass = isTolerance ? 'w-[66px]' : (isPPM ? 'w-[66px]' : 'w-[33px]'); 
    
    
    const textColorClass = (data.colorClass === 'bg-black' || data.colorClass === 'bg-resistor-brown' || data.colorClass === 'bg-blue-500' || data.colorClass === 'bg-purple-500' || data.colorClass === 'bg-red-500' || data.colorClass === 'bg-gray-500')
      ? 'text-white'
      : 'text-black';

    const isActive = activeBand === bandType;

    const activeBorderClass = isActive
      ? 'border-2 border-orange-500'
      : (data.colorClass === 'bg-transparent' ? 'border border-transparent' : 'border border-gray-300');

    return (
      <TouchableOpacity
        key={bandType} 
        className={`
          flex items-center justify-center
          h-[30px] ${widthClass}
          py-[6px] px-[7px]
          gap-[10px]
          ${data.colorClass || 'bg-transparent'} rounded-[5px]
          ${activeBorderClass}
        `}
        onPress={() => onBandPress(bandType)}
      >
        {data.value !== undefined && data.value !== null && (
          <Text className={`font-bold text-xs ${textColorClass}`}>
            {data.value}
          </Text>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex flex-row items-center justify-center gap-[10px] mb-6 p-2 rounded-[5px] shadow-md shadow-black/30 bg-white">
      
      {renderBand(band1, 'D1')}
      {selectedBandCount !== '3' && renderBand(band2, 'D2')} 
      {selectedBandCount === '5' && renderBand(band3, 'D3')} 
      {selectedBandCount === '6' && renderBand(band3, 'D3')} 
      
      {renderBand(multiplier, 'Multiplier')}
      {renderBand(tolerance, 'Tolerance', true)}
      {selectedBandCount === '6' && renderBand(ppm, 'PPM', false, true)}
    </View>
  );
}