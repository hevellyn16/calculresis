import React, { useState, useEffect } from 'react';
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


type BandType = 'D1' | 'D2' | 'Multiplier' | 'Tolerance' | 'D3' | 'PPM' | null;

export default function TabelaResistor() {
    const navigation = useNavigation<NavigationProp<any>>();

    const [selectedBandCount, setSelectedBandCount] = useState<string | number>('4');

    const [activeBand, setActiveBand] = useState<BandType>('D1');
    const [band1Data, setBand1Data] = useState<{ value: string | number | undefined; colorClass: string }>({ value: undefined, colorClass: 'bg-transparent' });
    const [band2Data, setBand2Data] = useState<{ value: string | number | undefined; colorClass: string }>({ value: undefined, colorClass: 'bg-transparent' });
    const [band3Data, setBand3Data] = useState<{ value: string | number | undefined; colorClass: string }>({ value: undefined, colorClass: 'bg-transparent' });
    const [PPMData, setPPMData] = useState<{ value: string | number | undefined; colorClass: string }>({ value: undefined, colorClass: 'bg-transparent' });
    const [multiplierData, setMultiplierData] = useState<{ value: string | number | undefined; colorClass: string }>({ value: undefined, colorClass: 'bg-transparent' });
    const [toleranceData, setToleranceData] = useState<{ value: string | number | undefined; colorClass: string }>({ value: undefined, colorClass: 'bg-transparent' });

   const handleCellSelection = (
        value: string | number | undefined,
        bandTypeFromCell: 'D1' | 'D2' | 'Multiplier' | 'Tolerance',
        bandColorClass: string
    ) => {
        console.log("--- handleCellSelection Called ---");
        console.log("Value clicked:", value);
        console.log("Type from cell:", bandTypeFromCell);
        console.log("Color class from cell (from cell click):", bandColorClass); // <-- IMPORTANTE
        console.log("Current activeBand BEFORE update:", activeBand);

        if (!activeBand) {
            console.log("No active band selected. Setting to D1 and returning.");
            setActiveBand('D1');
            return;
        }

        let nextActiveBand: BandType = null;

        switch (activeBand) {
            case 'D1':
                setBand1Data({ value, colorClass: bandColorClass });
                console.log("UPDATED band1Data:", { value, colorClass: bandColorClass }); // <-- ADICIONADO
                nextActiveBand = (selectedBandCount === '3') ? 'Multiplier' : 'D2';
                break;
            case 'D2':
                setBand2Data({ value, colorClass: bandColorClass });
                console.log("UPDATED band2Data:", { value, colorClass: bandColorClass }); // <-- ADICIONADO
                nextActiveBand = (selectedBandCount === '5' || selectedBandCount === '6') ? 'D3' : 'Multiplier';
                break;
            case 'D3':
                setBand3Data({ value, colorClass: bandColorClass });
                console.log("UPDATED band3Data:", { value, colorClass: bandColorClass }); // <-- ADICIONADO
                nextActiveBand = 'Multiplier';
                break;
            case 'Multiplier':
                setMultiplierData({ value, colorClass: bandColorClass });
                console.log("UPDATED multiplierData:", { value, colorClass: bandColorClass }); // <-- ADICIONADO
                nextActiveBand = 'Tolerance';
                break;
            case 'Tolerance':
                setToleranceData({ value, colorClass: bandColorClass });
                console.log("UPDATED toleranceData:", { value, colorClass: bandColorClass }); // <-- ADICIONADO
                nextActiveBand = (selectedBandCount === '6') ? 'PPM' : null;
                break;
            case 'PPM':
                setPPMData({ value, colorClass: bandColorClass });
                console.log("UPDATED ppmData:", { value, colorClass: bandColorClass }); // <-- ADICIONADO
                nextActiveBand = null;
                break;
            default:
                console.log("Active band is not recognized or null:", activeBand);
                break;
        }
        setActiveBand(nextActiveBand);
        console.log("Next activeBand after update:", nextActiveBand);
    };

    const bandCountOptions = [
        { label: '4 Bandas', value: '4' },
        { label: '5 Bandas', value: '5' },
        { label: '6 Bandas', value: '6' },
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
        console.log("--- useEffect: selectedBandCount changed ---");
        setBand1Data({ value: undefined, colorClass: 'bg-transparent' });
        setBand2Data({ value: undefined, colorClass: 'bg-transparent' });
        setBand3Data({ value: undefined, colorClass: 'bg-transparent' });
        setMultiplierData({ value: undefined, colorClass: 'bg-transparent' });
        setToleranceData({ value: undefined, colorClass: 'bg-transparent' });
        setPPMData({ value: undefined, colorClass: 'bg-transparent' });

        if (selectedBandCount === '3' || selectedBandCount === '4' || selectedBandCount === '5' || selectedBandCount === '6') {
            setActiveBand('D1');
            console.log("Active band set to D1 due to selectedBandCount change.");
        } else {
            setActiveBand(null);
        }
        console.log("Current selectedBandCount:", selectedBandCount);
    }, [selectedBandCount]);


    return (
        <SafeAreaView className="self-stretch flex flex-col gap-[10px] justify-between items-center w-full h-full py-10 px-7 bg-white">
            {/* Botão de navegação para a tela inicial */} 
            <View>
                <CustomButton
                    title={'Tabela de Resistência'}
                    onPress={HomeNavegar}
                    icon={<ChevronLeft color="gray" size={20} />}
                />
            </View>

            {/* Resistor display */}
            <View className='self-stretch py-4 bg-white rounded-[10px] shadow-md shadow-black/50'>
                <View className='self-stretch text-center justify-center text-black text-4xl font-bold font-ubuntu shadow-md shadow-black/50'>
                    <Text className="self-stretch text-center justify-center text-black text-base font-light font-ubuntu">
                        Resistor
                    </Text>
                </View>
            </View>

            {/* Botôes selecionados*/}
            <View className='self-stretch py-2 gap-[5px]'>
                <SelectedDisplay
                    band1={band1Data}
                    band2={band2Data}
                    band3={(selectedBandCount === '5' || selectedBandCount === '6') ? band3Data : undefined}
                    multiplier={multiplierData}
                    tolerance={toleranceData}
                    ppm={selectedBandCount === '6' ? PPMData : undefined}
                    activeBand={activeBand}
                    onBandPress={setActiveBand}
                    selectedBandCount={selectedBandCount}
                />
            </View>

            {/* Conteúdo da tabela de resistores */}
            <View className='flex flex-col self-stretch items-center justify-center gap-[16px] py-2 px-8 rounded-[5px] bg-white shadow-md shadow-black/50'> 
                <View className='flex flex-row items-center justify-between gap-[10px]'>
                        <ResistorColorRow
                        // colorName={'Cor'}
                        tailwindColorClass='bg-transparent'
                        textColorClass='text-black'
                        colorValued1={'D1'}
                        colorValued2={'D2'}
                        colorValued3={'D3'}
                        multiplier={'Mult.'}
                        tolerance={'Toleran.'}
                        ppm={'ppm'}
                    />
                    </View>
                <View className='flex flex-col items-center justify-center gap-[10px]'>
                    <ResistorColorRow
                    // colorName={'preto'}
                    tailwindColorClass='bg-black'
                    colorValued1='0'
                    colorValued2='0'
                    colorValued3='0'
                    multiplier='1Ω'

                />
                <ResistorColorRow
                    tailwindColorClass='bg-resistor-brown'
                    // colorName={'marrom'}
                    colorValued1='1'
                    colorValued2='1'
                    colorValued3='1'
                    multiplier='10Ω'
                    tolerance='±1%'
                    ppm={'100PPM/C'}
                />
                 <ResistorColorRow
                    tailwindColorClass='bg-red-500'
                    // colorName={'vermelho'}
                    colorValued1='2'
                    colorValued2='2'
                    colorValued3={'2'}
                    multiplier='100Ω'
                    tolerance='±2%'
                    ppm={'50PPM/C'}
                />

                <ResistorColorRow
                    tailwindColorClass='bg-orange-500'
                    // colorName={'laranja'}
                    colorValued1='3'
                    colorValued2='3'
                    colorValued3={'3'}
                    multiplier='1KΩ'
                    ppm={'15PPM/C'}
                />
                
                <ResistorColorRow
                    tailwindColorClass='bg-yellow-500'
                    // colorName={'amarelo'}
                    colorValued1='4'
                    colorValued2='4'
                    colorValued3={'4'}
                    multiplier='10KΩ'
                    ppm={'25PPM/C'}
                />

                <ResistorColorRow
                    tailwindColorClass='bg-green-500'
                    // colorName={'verde'}
                    colorValued1='5'
                    colorValued2='5'
                    colorValued3={'5'}
                    multiplier='100KΩ'
                    tolerance='±0.5%'
                />

                <ResistorColorRow
                    tailwindColorClass='bg-blue-500'
                    // colorName={'azul'}
                    colorValued1='6'
                    colorValued2='6'
                    colorValued3={'6'}
                    multiplier='1MΩ'
                    tolerance='±0.25%'
                    ppm={'10PPM/C'}
                />

                <ResistorColorRow
                    tailwindColorClass='bg-purple-500'
                    // colorName={'violeta'}
                    colorValued1='7'
                    colorValued2='7'
                    colorValued3={'7'}
                    multiplier='10MΩ'
                    tolerance='±0.1%'
                    ppm={'5PPM/C'}
                />

                <ResistorColorRow
                    tailwindColorClass='bg-gray-500'
                    // colorName={'cinza'}
                    colorValued1='8'
                    colorValued2='8'
                     colorValued3={'8'}
                     multiplier='100MΩ'
                />
                <ResistorColorRow
                    tailwindColorClass='bg-white'
                    // colorName={'branco'}
                    colorValued1='9'
                    colorValued2='9'
                    colorValued3={'9'}
                    borderColorClass='border-black'
                    textColorClass='text-black'
                />

                 <ResistorColorRow
                    tailwindColorClass='bg-resistor-gold'
                    // colorName={'ouro'}
                    multiplier='10MΩ'
                    tolerance='±0.1%'
                    textColorClass='text-black'
                />
                 <ResistorColorRow
                    tailwindColorClass='bg-resistor-silver'
                    // colorName={'prata'}
                    multiplier='10MΩ'
                    tolerance='±0.1%'
                    textColorClass='text-black'
                />
                

                </View>
            </View>

            {/* Selecionar as cores dos resistores */}
            <View  className='flex flex-col self-stretch items-center justify-center py-3 px-9 rounded-[5px] bg-white shadow-md shadow-black/50'>
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
