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
import ResistorColorRow from '~/components/ResistorColorRow';
import SelectedDisplay from '~/components/SelectedDisplay';


type BandType = 'D1' | 'D2' | 'D3' | 'Multiplier' | 'Tolerance' | 'PPM' | null;

const bandValues: { [key: string]: number } = {
  '0': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9
};

const multiplierValues: { [key: string]: number } = {
  '1Ω': 1, // Preto (x10^0)
  '10Ω': 10, // Marrom (x10^1)
  '100Ω': 100, // Vermelho (x10^2)
  '1KΩ': 1000, // Laranja (x10^3)
  '10KΩ': 10000, // Amarelo (x10^4)
  '100KΩ': 100000, // Verde (x10^5)
  '1MΩ': 1000000, // Azul (x10^6)
  '10MΩ': 10000000, // Violeta (x10^7)
  '0.1Ω': 0.1, // Ouro (x10^-1)
  '0.01Ω': 0.01, // Prata (x10^-2)
};

const toleranceValues: { [key: string]: string } = {
  '±1%': '±1%',
  '±2%': '±2%',
  '±0.5%': '±0.5%',
  '±0.25%': '±0.25%',
  '±0.1%': '±0.1%',
  '±5%': '±5%',
  '±10%': '±10%',
};

const ppmValues: { [key: string]: string } = {
  '100': '100PPM/C',
  '50': '50PPM/C',
  '15': '15PPM/C',
  '25': '25PPM/C',
  '10': '10PPM/C',
  '5': '5PPM/C',
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

    const handleBandClickOnTable = (
        value: string | number | undefined,
        bandTypeFromCell: 'D1' | 'D2' | 'D3' | 'Multiplier' | 'Tolerance' | 'PPM',
        bandColorClass: string
    ) => {
        let newBandData: { value: string | number | undefined; colorClass: string } = { value, colorClass: bandColorClass };
        
        switch (bandTypeFromCell) {
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
                console.warn("handleBandClickOnTable: Unrecognized bandTypeFromCell:", bandTypeFromCell);
                return;
        }
        
        let nextActiveBand: BandType = null;
        switch (activeBand) {
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
                nextActiveBand = 'D1';
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

        const d1 = bandValues[String(band1Data.value)];
        const d2 = bandValues[String(band2Data.value)];
        const d3 = bandValues[String(band3Data.value)];
        const multiplier = multiplierValues[String(multiplierData.value)];
        const tolerance = toleranceValues[String(toleranceData.value)];
        const ppm = ppmValues[String(ppmData.value)];

        if (d1 === undefined || multiplier === undefined) {
            return {
                resistance: '--- Ω',
                tolerance: '---',
                ppm: '---',
                details: 'Selecione D1 e Multiplicador',
            };
        }

        if (selectedBandCount === '4') {
            if (d2 === undefined) {
                return { resistance: '--- Ω', tolerance: '---', ppm: '---', details: 'Selecione D2' };
            }
            resistanceValue = (d1 * 10 + d2) * multiplier;
            displayDetails.push(`D1=${d1}`, `D2=${d2}`, `Mult.=${multiplierData.value}`);
        } else if (selectedBandCount === '5' || selectedBandCount === '6') {
            if (d2 === undefined || d3 === undefined) {
                 return { resistance: '--- Ω', tolerance: '---', ppm: '---', details: 'Selecione D2 e D3' };
            }
            resistanceValue = (d1 * 100 + d2 * 10 + d3) * multiplier;
            displayDetails.push(`D1=${d1}`, `D2=${d2}`, `D3=${d3}`, `Mult.=${multiplierData.value}`);
        } else {
            resistanceValue = d1 * multiplier; // Caso de 3 faixas, se reintroduzido.
            displayDetails.push(`D1=${d1}`, `Mult.=${multiplierData.value}`);
        }

        finalTolerance = tolerance || '---';
        if (tolerance) displayDetails.push(`Toleran.=${tolerance}`);

        finalPPM = ppm || '---';
        if (ppm) displayDetails.push(`PPM=${ppm}`);
        
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
            tolerance: finalTolerance,
            ppm: finalPPM,
            details: displayDetails.join(', '),
        };
    }, [band1Data, band2Data, band3Data, multiplierData, toleranceData, ppmData, selectedBandCount]);


    return (
        <SafeAreaView className="self-stretch flex flex-col gap-[8px] justify-between items-center w-full h-full py-10 px-7 bg-white">
            <View className="mb-4">
                <CustomButton
                    title={'Tabela de Resistência'}
                    onPress={HomeNavegar}
                    icon={<ChevronLeft color="gray" size={20} />}
                />
            </View>

            {/* Painel de Resultados da Resistência */}
            <View className='self-stretch items-center justify-center bg-white rounded-[10px] shadow-md shadow-black/50 mb-0'> 
                <View className='self-stretch text-center justify-center text-black text-4xl font-bold font-ubuntu'>
                    <Text className="text-black text-center justify-center text-3xl font-bold mb-2">
                        {calculateResistance.resistance}
                    </Text>
                    <Text className="text-black text-center justify-center text-sm font-light">
                        {`Tolerância: ${calculateResistance.tolerance} | PPM: ${calculateResistance.ppm}`}
                    </Text>
                    <Text className="text-gray-600 text-center justify-center text-xs mt-2">
                        {calculateResistance.details}
                    </Text>
                </View>
            </View>

            {/* SelectedDisplay */}
            <View className='self-stretch gap-[5px] mb-0'> 
                <SelectedDisplay
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

            {/* Conteúdo da tabela de resistores */}
            <View className='flex flex-col self-stretch items-center justify-center gap-[2px] gap-[10px] py-3 px-8 rounded-[5px] bg-white shadow-md shadow-black/50 mt-0'> {/* <-- MUDANÇA AQUI: mt-0 */}
                <View className='flex flex-row items-center justify-between gap-[10px] mt-2'>
                        <ResistorColorRow
                        colorValued1={'D1'}
                        colorValued2={'D2'}
                        colorValued3={'D3'}
                        tailwindColorClass='bg-transparent'
                        textColorClass='text-black'
                        multiplier={'Mult.'}
                        tolerance={'Toleran.'}
                        ppm={'ppm'} 
                        selectedBandCount={selectedBandCount}                    />
                    </View>
                <View className='flex flex-col items-center justify-center gap-[10px]'>
                    <ResistorColorRow
                    tailwindColorClass='bg-black'
                    colorValued1='0'
                    colorValued2='0'
                    colorValued3='0'
                    multiplier='1Ω'
                    onBandPress={handleBandClickOnTable}
                    selectedBandCount={selectedBandCount}
                />
                <ResistorColorRow
                    tailwindColorClass='bg-resistor-brown'
                    colorValued1='1'
                    colorValued2='1'
                    colorValued3='1'
                    multiplier='10Ω'
                    tolerance='±1%'
                    ppm={'100'}
                    onBandPress={handleBandClickOnTable}
                    selectedBandCount={selectedBandCount}
                />
                 <ResistorColorRow
                    tailwindColorClass='bg-red-500'
                    colorValued1='2'
                    colorValued2='2'
                    colorValued3={'2'}
                    multiplier='100Ω'
                    tolerance='±2%'
                    ppm={'50'}
                    onBandPress={handleBandClickOnTable}
                    selectedBandCount={selectedBandCount}
                />

                <ResistorColorRow
                    tailwindColorClass='bg-orange-500'
                    colorValued1='3'
                    colorValued2='3'
                    colorValued3={'3'}
                    multiplier='1KΩ'
                    ppm={'15'}
                    onBandPress={handleBandClickOnTable}
                    selectedBandCount={selectedBandCount}
                />

                <ResistorColorRow
                    tailwindColorClass='bg-yellow-500'
                    colorValued1='4'
                    colorValued2='4'
                    colorValued3={'4'}
                    multiplier='10KΩ'
                    ppm={'25'}
                    onBandPress={handleBandClickOnTable}
                    selectedBandCount={selectedBandCount}
                />

                <ResistorColorRow
                    tailwindColorClass='bg-green-500'
                    colorValued1='5'
                    colorValued2='5'
                    colorValued3={'5'}
                    multiplier='100KΩ'
                    tolerance='±0.5%'
                    onBandPress={handleBandClickOnTable}
                    selectedBandCount={selectedBandCount}
                />

                <ResistorColorRow
                    tailwindColorClass='bg-blue-500'
                    colorValued1='6'
                    colorValued2='6'
                    colorValued3={'6'}
                    multiplier='1MΩ'
                    tolerance='±0.25%'
                    ppm={'10'}
                    onBandPress={handleBandClickOnTable}
                    selectedBandCount={selectedBandCount}
                />

                <ResistorColorRow
                    tailwindColorClass='bg-purple-500'
                    colorValued1='7'
                    colorValued2='7'
                    colorValued3={'7'}
                    multiplier='10MΩ'
                    tolerance='±0.1%'
                    ppm={'5'}
                    onBandPress={handleBandClickOnTable}
                    selectedBandCount={selectedBandCount}
                />

                <ResistorColorRow
                    tailwindColorClass='bg-gray-500'
                    colorValued1='8'
                    colorValued2='8'
                    colorValued3={'8'}
                    multiplier='100MΩ'
                    onBandPress={handleBandClickOnTable}
                    selectedBandCount={selectedBandCount}
                />
                <ResistorColorRow
                    tailwindColorClass='bg-white'
                    colorValued1='9'
                    colorValued2='9'
                    colorValued3={'9'}
                    borderColorClass='border-black'
                    textColorClass='text-black'
                    onBandPress={handleBandClickOnTable}
                    selectedBandCount={selectedBandCount}
                />

                 <ResistorColorRow
                    tailwindColorClass='bg-resistor-gold'
                    multiplier='0.1Ω'
                    tolerance='±5%'
                    textColorClass='text-black'
                    onBandPress={handleBandClickOnTable}
                    selectedBandCount={selectedBandCount}
                />
                 <ResistorColorRow
                    tailwindColorClass='bg-resistor-silver'
                    multiplier='0.01Ω'
                    tolerance='±10%'
                    textColorClass='text-black'
                    onBandPress={handleBandClickOnTable}
                    selectedBandCount={selectedBandCount}
                />
                </View>
            </View>

            <View  className='flex flex-col self-stretch items-center justify-center py-1 px-9 rounded-[5px] bg-white shadow-md shadow-black/50'>
                <FasciaSelector
                    label="Quantidade de Faixas"
                    options={bandCountOptions}
                    selectedValue={selectedBandCount}
                    onSelect={setSelectedBandCount}
                />
            </View>
        </SafeAreaView>
    );
}