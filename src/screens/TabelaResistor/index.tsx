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

export default function TabelaResistor() {
    const navigation = useNavigation<NavigationProp<any>>();

    async function handleNavigation(routeName: string) {
    try {
      await navigation.navigate(routeName);
    } catch (error) {
      console.error('Erro ao navegar:', error);
    }
  }

    async function HomeNavegar() {
    try {
      await handleNavigation('TelaInicial');
      navigation.navigate('TelaInicial');
    } catch (error) {
      console.error('Erro ao navegar para Tela inicial:', error);
    }
  }
    return (
        <SafeAreaView className="flex flex-col justify-between items-center w-full h-full py-12 px-7 bg-white">
        
        <View>
            <CustomButton 
                title={'Tabela de Resistência'}
                onPress={HomeNavegar}
                icon={<ChevronLeft color="gray" size={20} />}
                >

            </CustomButton>
        </View>
                    
        </SafeAreaView>
    );
}