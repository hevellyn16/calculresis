import React from "react";
import{
    createStackNavigator,
} from "@react-navigation/stack";
import TelaInicial from "~/screens/TelaInicial";
import TabelaResistor from "~/components/TabelaResistor";
import ResistorCalcul from "~/screens/ResistorCalcul";

export default function Routes() {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator
            initialRouteName="TelaInicial"
            screenOptions={{
                headerShown: false,
                cardStyle: { backgroundColor: 'white' },
            }}
        >
            <Stack.Screen name="TelaInicial" component={TelaInicial} />
            <Stack.Screen name="TabelaResistor" component={TabelaResistor} />
            <Stack.Screen name="ResistorCalcul" component={ResistorCalcul} />
        </Stack.Navigator>
    )
}