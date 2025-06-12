import React from "react";
import { Text, View, SafeAreaView, TouchableOpacity } from "react-native";

export default function ResistorCalcul() {
    return (
        <SafeAreaView className="flex flex-col justify-between items-center w-full h-full py-12 px-7 bg-white">
            <View className="flex justify-center items-center w-full gap-5 py-5 px-0 rounded-lg bg-white shadow-md shadow-black/50">
                <Text className="text-5xl font-bold text-gray-800">Calculadora de Resistores</Text>
            </View>

            <View className="flex flex-col items-center w-full gap-5">
                <TouchableOpacity
                    className="flex w-full py-4 px-3 justify-center items-center rounded-md bg-white shadow-md shadow-black/50"
                >
                    <Text className="text-lg font-semibold text-gray-700">Iniciar Cálculo</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}