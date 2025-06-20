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

import {
    BandType,
    bandValues,
    multiplierValues,
    toleranceValues,
    ppmValues
} from '~/utils/resistorConstants';
import ResistorColorTable from '~/components/ResistorColorTable'; 


export default function TabelaResistor() {
    const navigation = useNavigation<NavigationProp<any>>();

    const [selectedBandCount, setSelectedBandCount] = useState<string | number>('4');

    const [activeBand, setActiveBand] = useState<BandType>('D1');
    const [band1Data, setBand1Data] = useState<{
        value: string | number | undefined; colorClass: string }>({ 
        value: undefined, colorClass: 'bg-transparent' });

    const [band2Data, setBand2Data] = useState<{ 
        value: string | number | undefined; colorClass: string }>({ 
        value: undefined, colorClass: 'bg-transparent' });

    const [band3Data, setBand3Data] = useState<{ 
        value: string | number | undefined; colorClass: string }>({ 
        value: undefined, colorClass: 'bg-transparent' });

    const [multiplierData, setMultiplierData] = useState<{ 
        value: string | number | undefined; colorClass: string }>({ 
        value: undefined, colorClass: 'bg-transparent' });

    const [toleranceData, setToleranceData] = useState<{ 
        value: string | number | undefined; colorClass: string }>({ 
        value: undefined, colorClass: 'bg-transparent' });

    const [ppmData, setPPMData] = useState<{ 
        value: string | number | undefined; colorClass: string }>({ 
        value: undefined, colorClass: 'bg-transparent' });

    const handleBandClickOnTable = (
        value: string | number | undefined,
        bandTypeFromCell: BandType,
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
        
        let nextActiveBand: BandType = 'D1';
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
                nextActiveBand = (selectedBandCount === '6') ? 'PPM' : 'D1';
                break;
            case 'PPM':
                nextActiveBand = 'D1';
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
        } else {
            if (d2 === undefined || d3 === undefined) {
                 return { resistance: '--- Ω', tolerance: '---', ppm: '---', details: 'Selecione D2 e D3' };
            }
            resistanceValue = (d1 * 100 + d2 * 10 + d3) * multiplier;
            baseDigits = `${d1}${d2}${d3}`;
            displayDetails.push(`${baseDigits} * ${multiplierData.value}`); 
        };

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
        <SafeAreaView className="flex flex-col gap-[8px] justify-center items-center w-full h-full py-4 px-7 bg-white">
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
                    <Text className="text-gray-600  text-center justify-center text-xs mt-1">
                        {calculateResistance.details}
                    </Text>
                </View>
            </View>

            <View className='self-stretch mt-0 mb-0 py-0'>
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

            <View className='flex flex-col self-stretch items-center justify-center
             gap-[10px] py-2 px-5 rounded-[5px] bg-white shadow-md shadow-black/50 mt-1'>

                <View className='flex flex-row items-center justify-center gap-[8px] mt-1'>
                        <ResistorColorRow
                        colorValued1={'D1'}
                        colorValued2={'D2'}
                        colorValued3={'D3'}
                        tailwindColorClass='bg-transparent'
                        textColorClass='text-black'
                        multiplier={'Mult.'}
                        tolerance={'Toleran.'}
                        ppm={'ppm'} 
                        selectedBandCount={selectedBandCount}                    
                    />
                    </View>
                
                <ResistorColorTable
                    onBandPress={handleBandClickOnTable}
                    selectedBandCount={selectedBandCount}
                />
                
            </View>

            <View  className='flex flex-col self-stretch items-center 
            justify-center py-2 px-9 rounded-[5px] bg-white shadow-md shadow-black/50'>
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