import React, { useState, useEffect, useMemo } from 'react';
import {
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native';
import CustomButton from '~/components/Buttons';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {ChevronLeft} from 'lucide-react-native';
import FasciaSelector from '~/components/FasciaSelector';
import SelectedDisplay from '~/components/SelectedDisplay';

import {
    BandType,
    bandValues,
    multiplierValues,
    toleranceValues,
    ppmValues
} from '~/utils/calculatorConstants';
import ResistanceDisplayField from '~/components/ResistanceDisplayField';
import SelectedCalculator from '~/components/SelectedCalculator';

const getColorClassForBand = (value: string | number | undefined, bandType: BandType): string => {
    if (value === undefined || value === null || value === '') return 'bg-transparent';

    const strValue = String(value);

    // Mapeamento para D1, D2, D3
    if (bandType === 'D1' || bandType === 'D2' || bandType === 'D3') {
        switch (strValue) {
            case 'Preto 0': return 'bg-black';
            case 'Marrom 1': return 'bg-resistor-brown';
            case 'Vermelho 2': return 'bg-red-500';
            case 'Laranja 3': return 'bg-orange-500';
            case 'Amarelo 4': return 'bg-yellow-500';
            case 'Verde 5': return 'bg-green-500';
            case 'Azul 6': return 'bg-blue-500';
            case 'Roxo 7': return 'bg-purple-500';
            case 'Cinza 8': return 'bg-gray-500';
            case 'Branco 9': return 'bg-white';
            default: return 'bg-transparent';
        }
    }
    // Mapeamento para Multiplicador
    else if (bandType === 'Multiplier') {
        switch (strValue) {
            case 'Preto 1': return 'bg-black';
            case 'Marrom 10': return 'bg-resistor-brown';
            case 'Vermelho 100': return 'bg-red-500';
            case 'Laranja 1K': return 'bg-orange-500';
            case 'Amarelo 10K': return 'bg-yellow-500';
            case 'Verde 100K': return 'bg-green-500';
            case 'Azul 1M': return 'bg-blue-500';
            case 'Roxo 10M': return 'bg-purple-500';
            case 'Cinza 100M': return 'bg-gray-500';
            case 'Ouro 0.1': return 'bg-resistor-gold';
            case 'Prata 0.01': return 'bg-resistor-silver';
            default: return 'bg-transparent';
        }
    }
    // Mapeamento para Tolerância
    else if (bandType === 'Tolerance') {
        switch (strValue) {
            case 'Marrom ±1%': return 'bg-resistor-brown';
            case 'Vermelho ±2%': return 'bg-red-500';
            case 'Verde ±0.5%': return 'bg-green-500';
            case 'Azul ±0.25%': return 'bg-blue-500';
            case 'Roxo ±0.1%': return 'bg-purple-500';
            case 'Ouro ±5%': return 'bg-resistor-gold';
            case 'Prata ±10%': return 'bg-resistor-silver';
            default: return 'bg-transparent';
        }
    }
    // Mapeamento para PPM
    else if (bandType === 'PPM') {
        switch (strValue) {
            case 'Marrom 100': return 'bg-resistor-brown';
            case 'Vermelho 50': return 'bg-red-500';
            case 'Laranja 15': return 'bg-orange-500';
            case 'Amarelo 25': return 'bg-yellow-500';
            case 'Azul 10': return 'bg-blue-500';
            case 'Roxo 5': return 'bg-purple-500';
            default: return 'bg-transparent';
        }
    }

    return 'bg-transparent';
};


export default function TabelaResistor() {
    const navigation = useNavigation<NavigationProp<any>>();

    const [selectedBandCount, setSelectedBandCount] = useState<string | number>('4');

    const [activeBand, setActiveBand] = useState<BandType>('D1');
    const [band1Data, setBand1Data] = useState<{ value: string | number | undefined; colorClass: string }>({ value: undefined, colorClass: 'bg-transparent' });
    const [band2Data, setBand2Data] = useState<{ value: string | number | undefined; colorClass: string }>({ value: undefined, colorClass: 'bg-transparent' });
    const [band3Data, setBand3Data] = useState<{ value: string | number | undefined; colorClass: string }>({ value: undefined, colorClass: 'bg-transparent' });
    const [multiplierData, setMultiplierData] = useState<{ value: string | number | undefined; colorClass: string }>({ value: undefined, colorClass: 'bg-transparent' });
    const [toleranceData, setToleranceData] = useState<{ value: string | number | undefined; colorClass: string }>({ value: undefined, colorClass: 'bg-transparent' });
    const [ppmData, setPPMData] = useState<{ value: string | number | undefined; colorClass: string }>({ value: undefined, colorClass: 'bg-transparent' });

    const handleFasciaSelectorChange = (
        newValue: string | number,
        bandType: BandType
    ) => {
        const selectedColorClass = getColorClassForBand(newValue, bandType);
        let newBandData: { value: string | number | undefined; colorClass: string } = { value: newValue, colorClass: selectedColorClass };
        
        switch (bandType) {
            case 'D1':
                setBand1Data(newBandData);
                break;
            case 'D2':
                setBand2Data(newBandData);
                break;
            case 'D3':
                setBand3Data(newBandData);
                break;
            case 'Multiplier':
                setMultiplierData(newBandData);
                break;
            case 'Tolerance':
                setToleranceData(newBandData);
                break;
            case 'PPM':
                setPPMData(newBandData);
                break;
            default:
                console.warn("handleFasciaSelectorChange: Unrecognized bandType:", bandType);
                return;
        }

        let nextActiveBand: BandType = null;
        switch (bandType) { // Avance a partir da faixa que acabou de ser selecionada no selector
            case 'D1':
                nextActiveBand = 'D2';
                break;
            case 'D2':
                nextActiveBand = (selectedBandCount === '5' || selectedBandCount === '6') ? 'D3' : 'Multiplier';
                break;
            case 'D3':
                nextActiveBand = 'Multiplier';
                break;
            case 'Multiplier':
                nextActiveBand = 'Tolerance';
                break;
            case 'Tolerance':
                nextActiveBand = (selectedBandCount === '6') ? 'PPM' : null;
                break;
            case 'PPM':
                nextActiveBand = null;
                break;
            default:
                nextActiveBand = 'D1'; // Fallback
                break;
        }
        setActiveBand(nextActiveBand);
    };

    const handleBandClickOnDisplay = (band: BandType) => {
        setActiveBand(band);
    };

    const bandCountOptions = [
        { label: '4 Faixas', value: '4' },
        { label: '5 Faixas', value: '5' },
        { label: '6 Faixas', value: '6' },
    ];

    const getDigitOptions = useMemo(() => {
        return Object.entries(bandValues).map(([key, val]) => ({
            label: key,
            value: key,
        }));
    }, []);

    const getMultiplierOptions = useMemo(() => {
        return Object.entries(multiplierValues).map(([key, val]) => ({
            label: key,
            value: key,
        }));
    }, []);

    const getToleranceOptions = useMemo(() => {
        return Object.entries(toleranceValues).map(([key, val]) => ({
            label: key,
            value: key,
        }));
    }, []);

    const getPPMOptions = useMemo(() => {
        return Object.entries(ppmValues).map(([key, val]) => ({
            label: val, // O label será "100PPM/C"
            value: key, // O valor real será "100" (a chave do ppmValues)
        }));
    }, []);

    async function handleNavigation(routeName: string) {
        try {
            await navigation.navigate(routeName);
        } catch (error) {
            console.error('Erro ao navegar:', error);
        }
    }

    async function HomeNavegar() {
        await handleNavigation('TelaInicial');
    }

     useEffect(() => {
        setBand1Data({ value: undefined, colorClass: 'bg-transparent' });
        setBand2Data({ value: undefined, colorClass: 'bg-transparent' });
        setBand3Data({ value: undefined, colorClass: 'bg-transparent' });
        setMultiplierData({ value: undefined, colorClass: 'bg-transparent' });
        setToleranceData({ value: undefined, colorClass: 'bg-transparent' });
        setPPMData({ value: undefined, colorClass: 'bg-transparent' });

        setActiveBand('D1');
    }, [selectedBandCount]);

    const calculateResistance = useMemo(() => {
        let resistanceValue: number | null = null;
        let finalTolerance: string | null = null;
        let finalPPM: string | null = null;
        let displayDetails: string[] = [];
        let baseDigits: string = '';

        const d1 = band1Data.value != null ? bandValues[String(band1Data.value)] : undefined;
        const d2 = band2Data.value != null ? bandValues[String(band2Data.value)] : undefined;
        const d3 = band3Data.value != null ? bandValues[String(band3Data.value)] : undefined;
        const multiplier = multiplierData.value != null ? multiplierValues[String(multiplierData.value)] : undefined;
        const tolerance = toleranceData.value != null ? toleranceValues[String(toleranceData.value)] : undefined;
        const ppm = ppmData.value != null ? ppmValues[String(ppmData.value)] : undefined;

        if (d1 === undefined || multiplier === undefined) {
            return {
                resistance: '--- Ω',
                details: 'Selecione D1 e Multiplicador',
                tolerance: '---',
                ppm: '---',
            };
        }

        if (selectedBandCount === '4') {
            if (d2 === undefined) {
                return { resistance: '--- Ω', tolerance: '---', ppm: '---', details: 'Selecione D2' };
            }
            resistanceValue = (d1 * 10 + d2) * multiplier;
            baseDigits = `${d1}${d2}`;
            displayDetails.push(`${baseDigits} * ${multiplierData.value}`); 
        } else if (selectedBandCount === '5' || selectedBandCount === '6') {
            if (d2 === undefined || d3 === undefined) {
                 return { resistance: '--- Ω', tolerance: '---', ppm: '---', details: 'Selecione D2 e D3' };
            }
            resistanceValue = (d1 * 100 + d2 * 10 + d3) * multiplier;
            baseDigits = `${d1}${d2}${d3}`;
            displayDetails.push(`${baseDigits} * ${multiplierData.value}`); 
        } else {
            resistanceValue = d1 * multiplier;
            baseDigits = `${d1}`;
            displayDetails.push(`${baseDigits} * ${multiplierData.value}`); 
        }

        finalTolerance = tolerance || '---';

        finalPPM = ppm || '---';

        let formattedResistance: string;
        if (resistanceValue >= 1000000000) {
            formattedResistance = `${(resistanceValue / 1000000000).toFixed(2)} GΩ`;
        } else if (resistanceValue >= 1000000) {
            formattedResistance = `${(resistanceValue / 1000000).toFixed(2)} MΩ`;
        } else if (resistanceValue >= 1000) {
            formattedResistance = `${(resistanceValue / 1000).toFixed(2)} KΩ`;
        } else {
            formattedResistance = `${resistanceValue.toFixed(2)} Ω`;
        }
        
        return {
            resistance: formattedResistance,
            details: displayDetails.join(', '),
            tolerance: finalTolerance,
            ppm: finalPPM,
        };
    }, [band1Data, band2Data, band3Data, multiplierData, toleranceData, ppmData, selectedBandCount]);


    return (
        <SafeAreaView className="flex-col gap-[8px] justify-center items-center w-full h-full py-4 px-7 bg-white">
            <View className="self-stretch justify-center items-center mb-0">
                <CustomButton
                    title={'Tabela de Resistência'}
                    onPress={HomeNavegar}
                    icon={<ChevronLeft color="gray" size={20} />}
                />
            </View>

            <View className='self-stretch bg-white rounded-[10px] shadow-md shadow-black/50 mb-0 py-[3px] px-4'>
                <View className='self-stretch text-center justify-center text-black text-4xl font-bold font-ubuntu'>
                    <Text className="text-black text-center justify-center text-3xl font-bold mb-0">
                        {calculateResistance.resistance}
                    </Text>
                    <Text className="text-black text-center justify-center text-sm font-light mb-0">
                        {`Tolerância: ${calculateResistance.tolerance} | PPM: ${calculateResistance.ppm}`}
                    </Text>
                    <Text className="text-gray-600 text-center justify-center text-xs mt-1">
                        {calculateResistance.details}
                    </Text>
                </View>
            </View>

            <View>
                <SelectedCalculator
                    band1={band1Data}
                    band2={band2Data}
                    band3={(selectedBandCount === '5' || selectedBandCount === '6') ? band3Data : undefined}
                    multiplier={multiplierData}
                    tolerance={toleranceData}
                    ppm={selectedBandCount === '6' ? ppmData : undefined}
                    activeBand={activeBand}
                    onBandPress={handleBandClickOnDisplay}
                    selectedBandCount={selectedBandCount}
                />
            </View>

            <View className='flex-col self-stretch items-center justify-center gap-[10px] py-2 px-5 rounded-[5px] bg-white shadow-md shadow-black/50 mt-1'>

                <FasciaSelector
                    label="Quantidade de Faixas"
                    options={bandCountOptions}
                    selectedValue={selectedBandCount}
                    onSelect={setSelectedBandCount}
                />

                <FasciaSelector
                    label="Faixa 1 (D1)"
                    options={getDigitOptions}
                    selectedValue={band1Data.value || ''}
                    onSelect={(value) => handleFasciaSelectorChange(value, 'D1')}
                />

                {selectedBandCount !== '3' && (
                    <FasciaSelector
                        label="Faixa 2 (D2)"
                        options={getDigitOptions}
                        selectedValue={band2Data.value || ''}
                        onSelect={(value) => handleFasciaSelectorChange(value, 'D2')}
                    />
                )}

                {(selectedBandCount === '5' || selectedBandCount === '6') && (
                    <FasciaSelector
                        label="Faixa 3 (D3)"
                        options={getDigitOptions}
                        selectedValue={band3Data.value || ''}
                        onSelect={(value) => handleFasciaSelectorChange(value, 'D3')}
                    />
                )}

                <FasciaSelector
                    label={
                        selectedBandCount === '4' ? 'Faixa 3 (Multiplicador)' :
                        'Faixa 4 (Multiplicador)' // Para 5 e 6 faixas, é sempre a Faixa 4
                    }
                    options={getMultiplierOptions}
                    selectedValue={multiplierData.value || ''}
                    onSelect={(value) => handleFasciaSelectorChange(value, 'Multiplier')}
                />

                <FasciaSelector
                    label={
                        selectedBandCount === '4' ? 'Faixa 4 (Tolerância)' :
                        selectedBandCount === '5' ? 'Faixa 5 (Tolerância)' :
                        'Faixa 5 (Tolerância)' // Para 5 e 6 faixas, é sempre a Faixa 5
                    }
                    options={getToleranceOptions}
                    selectedValue={toleranceData.value || ''}
                    onSelect={(value) => handleFasciaSelectorChange(value, 'Tolerance')}
                />

                {selectedBandCount === '6' && (
                    <FasciaSelector
                        label="Faixa 6 (PPM)"
                        options={getPPMOptions}
                        selectedValue={ppmData.value || ''}
                        onSelect={(value) => handleFasciaSelectorChange(value, 'PPM')}
                    />
                )}
                
                <ResistanceDisplayField 
                    label={'Resistência (Ω)'} 
                    value={calculateResistance.resistance}                
                />
            </View>
        </SafeAreaView>
    );
}