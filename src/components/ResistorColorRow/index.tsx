import React from 'react';
import {
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native';

type Props = {
  tailwindColorClass?: string;
  colorName: string;
  colorValued1?: number | string;
  colorValued2?: number | string;
  textColorClass?: string;
  borderColorClass?: string;
  multiplier?: string | number;
  tolerance?: string;

  onSelectValue?: (value:string, colorName:string, type:'d1'| 'd2' | 'multiplier' | 'tolerance') => void;
  onBandPress?: (value: string | number | undefined, bandType: 'D1' | 'D2' | 'Multiplier' | 'Tolerance', bandColorClass: string) => void;
}

export default function ResistorColorRow({
    tailwindColorClass,
    colorName,
    colorValued1,
    colorValued2,
    textColorClass,
    borderColorClass,
    multiplier,
    tolerance,
    onSelectValue,
    onBandPress,
}: Props) {

    const nameView = (colorName === undefined || colorName === null) 
    ? 'bg-transparent'
    : (tailwindColorClass || 'bg-transparent');

    const nameBorder = (colorName === undefined || colorName === null)
    ? 'border-transparent'
    : (borderColorClass || 'border-transparent');

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



  return (
    <View className="font-ubuntu gap-[11px] flex flex-row h-[30px] items-center mb-[1px] border border-transparent bg-white rounded-[5px]">

        <View className={`
    flex items-center justify-center
    h-full w-[74px]
    ${nameView} rounded-[5px]
    border ${nameBorder}
    `}>
        <Text className={`font-bold text-xs ${textColorClass || 'text-white'}`}>
            {colorName}
        </Text>
    </View>

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

    </View>
  );
};