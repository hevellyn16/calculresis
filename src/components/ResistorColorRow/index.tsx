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
  selectedBandCount: string | number;
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
    selectedBandCount
}: Props) {

    const toleranceBgClass = (tolerance === undefined || tolerance === null)
    ? 'bg-transparent'
    : (tailwindColorClass || 'bg-transparent');

    const toleranceBorderClass = (tolerance === undefined || tolerance === null)
    ? 'border-transparent'
    : (borderColorClass || 'border-transparent');

    const multiplierBgClass = (multiplier === undefined || multiplier === null)
    ? 'bg-transparent'
    : (tailwindColorClass || 'bg-transparent');

    const multiplierBorderClass = (multiplier === undefined || multiplier === null)
    ? 'border-transparent'
    : (borderColorClass || 'border-transparent');

    const D1BgClass = (colorValued1 === undefined || colorValued1 === null)
    ? 'bg-transparent'
    : (tailwindColorClass || 'bg-transparent');

    const D1BorderClass = (colorValued1 === undefined || colorValued1 === null)
    ? 'border-transparent'
    : (borderColorClass || 'border-transparent');

    const D2BgClass = (colorValued2 === undefined || colorValued2 === null)
    ? 'bg-transparent'
    : (tailwindColorClass || 'bg-transparent');

    const D2BorderClass = (colorValued2 === undefined || colorValued2 === null)
    ? 'border-transparent'
    : (borderColorClass || 'border-transparent');

    const D3BgClass = (colorValued3 === undefined || colorValued3 === null)
    ? 'bg-transparent'
    : (tailwindColorClass || 'bg-transparent');

    const D3BorderClass = (colorValued3 === undefined || colorValued3 === null)
    ? 'border-transparent'
    : (borderColorClass || 'border-transparent');

    const ppmBgClass = (ppm === undefined || ppm === null)
    ? 'bg-transparent'
    : (tailwindColorClass || 'bg-transparent');

    const ppmBorderClass = (ppm === undefined || ppm === null)
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
    ${D1BgClass} rounded-[5px]
    border ${D1BorderClass}
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
    ${D2BgClass} rounded-[5px]
    border ${D2BorderClass}
    `}
    onPress={() => onBandPress && onBandPress(colorValued2, 'D2', tailwindColorClass || 'bg-transparent')}>
        {colorValued2 !== undefined && colorValued2 !== null && (
                <Text className={`font-bold text-xs ${textColorClass || 'text-white'}`}>
                    {colorValued2}
                </Text>
            )}
    </TouchableOpacity>

     {/* Renderização Condicional D3 */}
        {(selectedBandCount === '5' || selectedBandCount === '6') && ( // D3 aparece para 5 e 6 faixas
            <TouchableOpacity
                className={`
                flex items-center justify-center
                h-[30px] w-[33px]
                py-[6px] px-[7px]
                gap-[10px]
                ${D3BgClass} rounded-[5px]
                border ${D3BorderClass}
                `}
                onPress={() => onBandPress && onBandPress(colorValued3, 'D3', tailwindColorClass || 'bg-transparent')}>
                {colorValued3 !== undefined && colorValued3 !== null && (
                        <Text className={`font-bold text-xs ${textColorClass || 'text-white'}`}>
                            {colorValued3}
                        </Text>
                    )}
            </TouchableOpacity>
        )}

        <TouchableOpacity
    className={`
    flex items-center justify-center
    h-[30px] w-[58px]
    py-[6px] px-[7px]
    gap-[10px]
    ${multiplierBgClass} rounded-[5px]
    border ${multiplierBorderClass}
    `}
    onPress={() => onBandPress && onBandPress(multiplier, 'Multiplier', tailwindColorClass || 'bg-transparent')}>
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
    ${toleranceBgClass} rounded-[5px]
    border ${toleranceBorderClass}
    `}
    onPress={() => onBandPress && onBandPress(tolerance, 'Tolerance', tailwindColorClass || 'bg-transparent')}>
            {tolerance !== undefined && tolerance !== null && (
                <Text className={`font-bold text-xs ${textColorClass || 'text-white'}`}>
                    {tolerance}
                </Text>
            )}
    </TouchableOpacity>

     {/* Renderização Condicional PPM */}
    {selectedBandCount === '6' && ( // PPM aparece apenas para 6 faixas
        <TouchableOpacity
            className={`
            flex items-center justify-center
            h-[30px] w-[33px]
            py-[6px] px-[7px]
            gap-[10px]
            ${ppmBgClass} rounded-[5px]
            border ${ppmBorderClass}
            `}
            onPress={() => onBandPress && onBandPress(ppm, 'PPM', tailwindColorClass || 'bg-transparent')}>
            {ppm !== undefined && ppm !== null && (
                    <Text className={`font-bold text-xs ${textColorClass || 'text-white'}`}>
                        {ppm}
                    </Text>
                )}
        </TouchableOpacity>
    )}

    </View>
  );
};