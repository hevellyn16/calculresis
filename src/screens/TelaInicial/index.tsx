import { 
  useState,
  useEffect } 
from 'react';

import { 
  Text, 
  View, 
  SafeAreaView, 
  TouchableOpacity } 
from 'react-native';

import {GitPullRequest, Calculator} from 'lucide-react-native';

import { StatusBar } from 'expo-status-bar';



import {useNavigation, NavigationProp} from '@react-navigation/native';
import CustomButton from '~/components/Buttons';

export default function TelaInicial () {
  const navigation = useNavigation<NavigationProp<any>>();

  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const hour = now.getHours().toString().padStart(2, '0');
      const minute = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hour}h${minute}`);

      const day = now.getDate().toString().padStart(2, '0');
      const month = (now.getMonth() + 1).toString().padStart(2, '0');
      const year = now.getFullYear();
      setCurrentDate(`${day}/${month}/${year}`);
    };

    updateDateTime();
    const intervalId = setInterval(updateDateTime, 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  async function handleNavigation(routeName: string) {
    try {
      await navigation.navigate(routeName);
    } catch (error) {
      console.error('Erro ao navegar:', error);
    }
  }

  async function TabelaResistorNavegar() {
    try {
      await handleNavigation('TabelaResistor');
      navigation.navigate('TabelaResistor');
    } catch (error) {
      console.error('Erro ao navegar para Tabela de Resistência:', error);
    }
  }
  async function ResistorCalculNavegar() {
    try {
      await handleNavigation('ResistorCalcul');
      navigation.navigate('ResistorCalcul');
    } catch (error) {
      console.error('Erro ao navegar para Calculadora de Resistores:', error);
    }
  }


  return (
    
    <SafeAreaView className="flex flex-col justify-between items-center w-[402px] h-[874px] py-[50px] px-[28px] bg-white">
      <StatusBar style="auto" />

      <View className="flex justify-center items-center w-full gap-5 py-[20px] px-[0px] rounded-[10px] bg-white shadow-md shadow-black/50">
        
        <Text className="text-5xl font-bold text-gray-800">
          {currentTime}
        </Text>

        <Text className="text-lg text-gray-600">
          {currentDate}
        </Text>

      </View>

      <View className="flex flex-col items-center w-full gap-5">

        <CustomButton 
          title={'Tabela de resistência'} 
          onPress={TabelaResistorNavegar}
          icon={<GitPullRequest color="gray" size={20} />}>

        </CustomButton>

        <CustomButton 
          title={'Resistor'} 
          onPress={ResistorCalculNavegar}
          icon={<Calculator color="gray" size={20} />}>

        </CustomButton>
        
        
      </View>

    </SafeAreaView>
  );
};