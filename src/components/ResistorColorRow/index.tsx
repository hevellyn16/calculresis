import React from 'react';
import {
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native';

type Props = {
  tailwindColorClass?: string;

  colorValued1?: number | string;
  colorValued2?: number | string;
  colorValued3?: number | string;
  textColorClass?: string;
  borderColorClass?: string;
  multiplier?: string | number;
  tolerance?: string;
  ppm?: string | number;

  onSelectValue?: (value:string, colorName:string, type:'d1'| 'd2' | 'multiplier' | 'tolerance' | 'd3' | 'ppm') => void;
  onBandPress?: (value: string | number | undefined, bandType: 'D1' | 'D2' | 'D3' | 'Multiplier' | 'Tolerance' | 'PPM', bandColorClass: string) => void;
}

export default function ResistorColorRow({
    tailwindColorClass,
    colorValued1,
    colorValued2,
    colorValued3,
    textColorClass,
    borderColorClass,
    multiplier,
    tolerance,
    ppm,
    onSelectValue,
    onBandPress,
}: Props) {

    const toleranceView = (tolerance === undefined || tolerance === null) 
    ? 'bg-transparent'
    : (tailwindColorClass || 'bg-transparent');

    const toleranceBorder = (tolerance === undefined || tolerance === null) 
    ? 'border-transparent'
    : (borderColorClass || 'border-transparent');

    const multiplierView = (multiplier === undefined || multiplier === null) 
    ? 'bg-transparent'
    : (tailwindColorClass || 'bg-transparent');

    const multiplierBorder = (multiplier === undefined || multiplier === null) 
    ? 'border-transparent'
    : (borderColorClass || 'border-transparent');

    const D1View = (colorValued1 === undefined || colorValued1 === null) 
    ? 'bg-transparent'
    : (tailwindColorClass || 'bg-transparent');

    const D1Border = (colorValued1 === undefined || colorValued1 === null) 
    ? 'border-transparent'
    : (borderColorClass || 'border-transparent');

    const D2View = (colorValued2 === undefined || colorValued2 === null) 
    ? 'bg-transparent' 
    : (tailwindColorClass || 'bg-transparent');

    const D2Border = (colorValued2 === undefined || colorValued2 === null) 
    ? 'border-transparent'
    : (borderColorClass || 'border-transparent');

    const D3View = (colorValued3 === undefined || colorValued3 === null) 
    ? 'bg-transparent'
    : (tailwindColorClass || 'bg-transparent');

    const D3Border = (colorValued3 === undefined || colorValued3 === null)
    ? 'border-transparent'
    : (borderColorClass || 'border-transparent');

    const ppmView = (ppm === undefined || ppm === null)
    ? 'bg-transparent'
    : (tailwindColorClass || 'bg-transparent');

    const ppmBorder = (ppm === undefined || ppm === null)
    ? 'border-transparent'
    : (borderColorClass || 'border-transparent');



  return (
    <View className="font-ubuntu gap-[11px] flex flex-row h-[30px] items-center mb-[1px] border border-transparent bg-white rounded-[5px]">

        <TouchableOpacity 
    className={`
    flex items-center justify-center
    h-[30px] w-[33px]
    py-[6px] px-[7px]
    gap-[10px]
    ${D1View} rounded-[5px]
    border ${D1Border}
    `}
    onPress={() => onBandPress && onBandPress(colorValued1, 'D1', tailwindColorClass || 'bg-transparent')}>
        {colorValued1 !== undefined && colorValued1 !== null && (
                <Text className={`font-bold text-xs ${textColorClass || 'text-white'}`}>
                    {colorValued1}
                </Text>
            )}
    </TouchableOpacity>

        <TouchableOpacity 
    className={`
    flex items-center justify-center
    h-[30px] w-[33px]
    py-[6px] px-[7px]
    gap-[10px]
    ${D2View} rounded-[5px]
    border ${D2Border}
    `}>
        {colorValued2 !== undefined && colorValued2 !== null && (
                <Text className={`font-bold text-xs ${textColorClass || 'text-white'}`}>
                    {colorValued2}
                </Text>
            )}
    </TouchableOpacity>

    <TouchableOpacity 
    className={`
    flex items-center justify-center
    h-[30px] w-[33px]
    py-[6px] px-[7px]
    gap-[10px]
    ${D3View} rounded-[5px]
    border ${D3Border}
    `}
    onPress={() => onBandPress && onBandPress(colorValued3, 'D3', tailwindColorClass || 'bg-transparent')}>
        {colorValued3 !== undefined && colorValued3 !== null && (
                <Text className={`font-bold text-xs ${textColorClass || 'text-white'}`}>
                    {colorValued3}
                </Text>
            )}
    </TouchableOpacity>

        <TouchableOpacity 
    className={`
    flex items-center justify-center
    h-[30px] w-[58px]
    py-[6px] px-[7px]
    gap-[10px]
    ${multiplierView} rounded-[5px]
    border ${multiplierBorder}
    `}>
        {multiplier !== undefined && multiplier !== null && (
                <Text className={`font-bold text-xs ${textColorClass || 'text-white'}`}>
                    {multiplier}
                </Text>
            )}
    </TouchableOpacity>
  
    <TouchableOpacity 
    className={`
    flex items-center justify-center
    h-[30px] w-[66px]
    py-[6px] px-[7px]
    gap-[10px]
    ${toleranceView} rounded-[5px]
    border ${toleranceBorder}
    `}>
            {tolerance !== undefined && tolerance !== null && (
                <Text className={`font-bold text-xs ${textColorClass || 'text-white'}`}>
                    {tolerance}
                </Text>
            )}
    </TouchableOpacity>

    <TouchableOpacity 
    className={`
    flex items-center justify-center
    h-[30px] w-[33px]
    py-[6px] px-[7px]
    gap-[10px]
    ${ppmView} rounded-[5px]
    border ${ppmBorder}
    `}
    onPress={() => onBandPress && onBandPress(ppm, 'PPM', tailwindColorClass || 'bg-transparent')}>
        {ppm !== undefined && ppm !== null && (
                <Text className={`font-bold text-xs ${textColorClass || 'text-white'}`}>
                    {ppm}
                </Text>
            )}
    </TouchableOpacity>

    </View>
  );
};