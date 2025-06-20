import React from 'react';
import { View, Text } from 'react-native';

type Props = {
  label: string; 
  value: string; 
  containerClassName?: string;
  labelClassName?: string;
  valueClassName?: string;
};

export default function ResistanceDisplayField({
  label,
  value,
  containerClassName,
  labelClassName,
  valueClassName,
}: Props) {
  return (
    <View className={`w-full ${containerClassName || ''}`}>

      {/* Rótulo superior */}
      <Text className={`text-gray-500 text-sm mb-1 ${labelClassName || ''}`}>
        {label}
      </Text>

      {/* Campo de exibição do valor */}
      <View
        className={`
          flex flex-row items-center justify-end
          bg-white rounded-[5px]
          py-[10px] px-[15px]
          h-[50px] 
          bg-resistor-gray/20
        `}
      >
        <Text className={`text-black text-base font-bold ${valueClassName || ''}`}>
          {value}
        </Text>
      </View>
    </View>
  );
}