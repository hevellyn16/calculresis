import React from 'react';
import {
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native';

export default function TabelaResistor() {
    return (
        <SafeAreaView className="flex flex-col justify-between items-center w-full h-full py-12 px-7 bg-white">
                    <View className="flex justify-center items-center w-full gap-5 py-5 px-0 rounded-lg bg-white shadow-md shadow-black/50">
                        <Text className="text-5xl font-bold text-gray-800">Tabela de Resistência</Text>
                    </View>
        
                
                </SafeAreaView>
    );
}