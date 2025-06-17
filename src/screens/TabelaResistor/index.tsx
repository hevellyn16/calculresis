import React from 'react';
import {
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native';
import CustomButton from '~/components/Buttons';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {ChevronLeft} from 'lucide-react-native';
import ResistorColorRow from '~/components/ResistorColorRow';

export default function TabelaResistor() {
    const navigation = useNavigation<NavigationProp<any>>();

    async function handleNavigation(routeName: string) {
        try {
            await navigation.navigate(routeName);
        } catch (error) {
            console.error('Erro ao navegar:', error);
            // Optionally show a user-friendly message
        }
    }

    async function HomeNavegar() {
        await handleNavigation('TelaInicial');
    }

    const handleColorPress = (color: string) => {
        // Implement your logic for color selection
        console.log(`Color selected: ${color}`);
    };

    return (
        <SafeAreaView className="flex flex-col gap-[5px] justify-between items-center w-full h-full py-16 px-7 bg-white">
            {/* Botão de navegação para a tela inicial */} 
            <View>
                <CustomButton
                    title={'Tabela de Resistência'}
                    onPress={HomeNavegar}
                    icon={<ChevronLeft color="gray" size={20} />}
                />
            </View>

            {/* Resistor display */}
            <View className='self-stretch py-6 bg-white rounded-[10px] shadow-md shadow-black/50'>
                <View className='self-stretch text-center justify-center text-black text-4xl font-bold font-ubuntu shadow-md shadow-black/50'>
                    <Text className="self-stretch text-center justify-center text-black text-base font-light font-ubuntu">
                        Resistor
                    </Text>
                </View>
            </View>

            {/* Botôes selecionados*/}
            <View  className='flex flex-col self-stretch items-center justify-center py-6 px-9 rounded-[5px] bg-orange-300 shadow-md shadow-black/50'>
                

            </View>

            {/* Conteúdo da tabela de resistores */}
            <View className='flex flex-col self-stretch items-center justify-center gap-[20px] py-4 px-9 rounded-[5px] bg-white shadow-md shadow-black/50'> 
                <View className='flex flex-row items-center justify-between gap-[10px]'>
                        <ResistorColorRow
                        colorName={'Cor'}
                        tailwindColorClass='bg-transparent'
                        textColorClass='text-black'
                        colorValued1={'D1'}
                        colorValued2={'D2'}
                        multiplier={'Mult.'}
                        tolerance={'Toleran.'}
                    />
                    </View>
                <View className='flex flex-col items-center justify-center gap-[10px]'>
                    <ResistorColorRow
                    colorName={'preto'}
                    tailwindColorClass='bg-black'
                    colorValued1='0'
                    colorValued2='0'
                    multiplier='1Ω'

                />
                <ResistorColorRow
                    tailwindColorClass='bg-resistor-brown'
                    colorName={'marrom'}
                    colorValued1='1'
                    colorValued2='1'
                    multiplier='10Ω'
                />
                 <ResistorColorRow
                    tailwindColorClass='bg-red-500'
                    colorName={'vermelho'}
                    colorValued1='2'
                    colorValued2='2'
                    multiplier='100Ω'
                    tolerance='±1%'
                />

                <ResistorColorRow
                    tailwindColorClass='bg-orange-500'
                    colorName={'laranja'}
                    colorValued1='3'
                    colorValued2='3'
                    multiplier='1KΩ'
                    tolerance='±2%'
                />
                
                <ResistorColorRow
                    tailwindColorClass='bg-yellow-500'
                    colorName={'amarelo'}
                    colorValued1='4'
                    colorValued2='4'
                    multiplier='10KΩ'

                />

                <ResistorColorRow
                    tailwindColorClass='bg-green-500'
                    colorName={'verde'}
                    colorValued1='5'
                    colorValued2='5'
                    multiplier='100KΩ'
                    tolerance='±0.5%'
                />

                <ResistorColorRow
                    tailwindColorClass='bg-blue-500'
                    colorName={'azul'}
                    colorValued1='6'
                    colorValued2='6'
                    multiplier='1MΩ'
                    tolerance='±0.25%'
                />

                <ResistorColorRow
                    tailwindColorClass='bg-purple-500'
                    colorName={'violeta'}
                    colorValued1='7'
                    colorValued2='7'
                    multiplier='10MΩ'
                    tolerance='±0.1%'
                />

                <ResistorColorRow
                    tailwindColorClass='bg-gray-500'
                    colorName={'cinza'}
                    colorValued1='8'
                    colorValued2='8'
                    multiplier='100MΩ'
                />
                <ResistorColorRow
                    tailwindColorClass='bg-white'
                    colorName={'branco'}
                    colorValued1='9'
                    colorValued2='9'
                    borderColorClass='border-black'
                    textColorClass='text-black'
                />

                 <ResistorColorRow
                    tailwindColorClass='bg-resistor-gold'
                    colorName={'ouro'}
                    multiplier='10MΩ'
                    tolerance='±0.1%'
                    textColorClass='text-black'
                />
                 <ResistorColorRow
                    tailwindColorClass='bg-resistor-silver'
                    colorName={'prata'}
                    multiplier='10MΩ'
                    tolerance='±0.1%'
                    textColorClass='text-black'
                />
                

                </View>
            </View>

            {/* Selecionar as cores dos resistores */}
            <View>
                
            </View>
        </SafeAreaView>
    );
}
