import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ResistorCalcul from '~/screens/ResistorCalcul';
import TabelaResistor from '~/components/TabelaResistor';
import TelaInicial from '~/screens/TelaInicial';

const Tab = createBottomTabNavigator();

export default function BottomRoutes() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Tela Inicial" component={TelaInicial} />
      <Tab.Screen name="Tabela de resistores" component={TabelaResistor} />
      <Tab.Screen name="Calculadora de resistores" component={ResistorCalcul} />
    </Tab.Navigator>
  );
}