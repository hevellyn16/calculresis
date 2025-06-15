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
        <SafeAreaView className="flex flex-col justify-between items-center w-full h-full py-12 px-7 bg-white">
            {/* Botão de navegação para a tela inicial */} 
            <View>
                <CustomButton
                    title={'Tabela de Resistência'}
                    onPress={HomeNavegar}
                    icon={<ChevronLeft color="gray" size={20} />}
                />
            </View>

            {/* Resistor display */}
            <View>
                
            </View>

            {/* Conteúdo da tabela de resistores */}
            <View className='flex flex-col items-center justify-center gap-4 py-10 px-9 rounded-[5px] bg-white shadow-md shadow-black/50'> 
                <View className="flex flex-col items-center justify-center gap-2">
                    <ResistorColorRow
                    colorName={'Cor'}
                        tailwindColorClass='bg-transparent'
                        textColorClass='text-black'
                        colorValued1={'D1'}
                        colorValued2={'D2'}
                        multiplier={'Mult.'}
                        tolerance={'Toleran.'}
                    />
                    <ResistorColorRow
                    colorName={'Preto'}
                    tailwindColorClass='bg-black'
                />
                <ResistorColorRow
                    tailwindColorClass='bg-red-500'
                    colorName={'Vermelho'}
                />
                </View>
            </View>

            {/* Selecionar as cores dos resistores */}
            <View>
                
            </View>
        </SafeAreaView>
    );
}
