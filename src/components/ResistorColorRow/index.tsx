import React from 'react';
import {
    Text,
    View,
} from 'react-native';
import ColorBlock from '~/components/ColorBlock';

type Props = {
  tailwindColorClass?: string;
  colorName: string;
  colorValued1?: string;
  colorValued2?: string;
  textColorClass?: string;
  borderColorClass?: string;
  multiplier?: string | number;
  tolerance?: string;

  onSelectValue?: (value:string, colorName:string, type:'d1'| 'd2' | 'multiplier' | 'tolerance') => void;
  onPressLastColumn?:(colorName:string) => void;
  
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
}: Props) {

  return (
    <View className="font-ubuntu flex flex-row h-[30px] items-center gap-[1px] mb-[1px] border border-transparent bg-white rounded-[5px]">

        <View className={`
    flex items-center justify-center
    h-full w-[74px]
    ${tailwindColorClass || 'bg-transparent'} rounded-[5px]
    border ${borderColorClass || 'border-transparent'}
    `}>
        <Text className={`font-bold text-xs ${textColorClass || 'text-white'}`}>
            {colorName}
        </Text>
    </View>

        <View className={`
    flex items-center justify-center
    h-full w-[74px]
    ${tailwindColorClass || 'bg-transparent'} rounded-[5px]
    border ${borderColorClass || 'border-transparent'}
    `}>
        <Text className={`font-bold text-xs ${textColorClass || 'text-white'}`}>
            {colorValued1 || ''}
        </Text>
    </View>

        <View className={`
    flex items-center justify-center
    h-full w-[74px]
    ${tailwindColorClass || 'bg-transparent'} rounded-[5px]
    border ${borderColorClass || 'border-transparent'}
    `}>
        <Text className={`font-bold text-xs ${textColorClass || 'text-white'}`}>
            {colorValued2 || ''}
        </Text>
    </View>

        <View className={`
    flex items-center justify-center
    h-full w-[74px]
    ${tailwindColorClass || 'bg-transparent'} rounded-[5px]
    border ${borderColorClass || 'border-transparent'}
    `}>
        <Text className={`font-bold text-xs ${textColorClass || 'text-white'}`}>
            {multiplier || ''}
        </Text>
    </View>

        <View className={`
    flex items-center justify-center
    h-full w-[74px]
    ${tailwindColorClass || 'bg-transparent'} rounded-[5px]
    border ${borderColorClass || 'border-transparent'}
    `}>
        <Text className={`font-bold text-xs ${textColorClass || 'text-white'}`}>
            {tolerance || ''}
        </Text>
    </View>
    </View>
  );
};