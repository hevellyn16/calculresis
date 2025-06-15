import React from 'react';
import {
    Text,
    View,
} from 'react-native';

type Props = {
  tailwindColorClass?: string;
  colorName: string;
  textColorClass?: string;
  borderColorClass?: string;
  isRoundedLeft?: boolean;
}

export default function ColorBlock({
    tailwindColorClass,
    colorName,
    textColorClass,
    borderColorClass,
    isRoundedLeft = false,
}: Props) {

  return (
    <View className={`
    flex items-center justify-center
    h-full w-[74px]
    ${tailwindColorClass || 'bg-transparent'} ${isRoundedLeft ? 'rounded-l-[5px]' : 'rounded-[5px]'}
    border ${borderColorClass || 'border-transparent'}
    `}>
        <Text className={`text-xs ${textColorClass || 'text-white'}`}>
            {colorName}
        </Text>
    </View>
  );
};