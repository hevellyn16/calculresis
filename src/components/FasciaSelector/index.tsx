import React from "react";
import { 
    View, 
    Text, 
    TouchableOpacity, 
    Modal,
    FlatList
} from "react-native";
import { ChevronDown } from "lucide-react-native";

type Option = {
    label: string;
    value: string | number;
}
type Props = {
    label: string;
    options: Option[];
    selectedValue: string | number;
    onSelect: (value: string | number) => void;

    containerClassName?: string;
    labelClassName?: string;
    fieldClassName?: string;
    textClassName?: string;
    dropdownClassName?: string; 
}
export default function FasciaSelector({
    label,
    options,
    selectedValue,
    onSelect,
    containerClassName,
    labelClassName,
    fieldClassName,
    textClassName,
    dropdownClassName,
}: Props) {

    const [modalVisible, setModalVisible] = React.useState(false);

    const selectedOptionLabel = options.find(
        option => option.value === selectedValue)?.label || '';

    const handleSelect = (value: string | number) => {
        onSelect(value);
        setModalVisible(false);
    };

    return (
        <View className={`w-full ${containerClassName || ''}`}>
            <Text className={`text-gray-500 text-sm mb-1 ${labelClassName || ''}`}>
                {label}
            </Text>

            <TouchableOpacity
            className={`
            flex flex-row items-center justify-between
            bg-white rounded-[5px]
            px-[15px]
            shadow-md shadow-black/20
            h-[50px]
            ${fieldClassName || ''}
        `}
        onPress={() => setModalVisible(true)} 
      >
        <Text className={`text-black text-base ${textClassName || ''}`}>
          {selectedOptionLabel}
        </Text>
        <ChevronDown size={20} color="gray" /> 
      </TouchableOpacity>

      <Modal
        transparent={true} 
        visible={modalVisible} 
        onRequestClose={() => setModalVisible(false)} 
        animationType="fade" 
      >
        {/* TouchableOpacity de fundo para fechar o modal ao clicar fora da lista de opções */}
        <TouchableOpacity
          className="flex-1 justify-center items-center bg-black/50"
          onPress={() => setModalVisible(false)} // Fecha o modal
          activeOpacity={1} // Garante que o clique não "vaze" para os elementos subjacentes
        >
          {/* View interna do modal que contém a FlatList das opções */}
          <View className="bg-white rounded-[5px] w-4/5 max-h-2/3 shadow-lg shadow-black/40 p-1">
            <FlatList
              data={options}
              keyExtractor={(item) => String(item.value)} 
              renderItem={({ item }) => (
                <TouchableOpacity
                  className={`py-[8px] px-[15px] ${dropdownClassName || ''}`}
                  onPress={() => handleSelect(item.value)} 
                >
                  <Text className="text-black text-base">
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )}
              // Componente que renderiza um separador entre cada item da lista
              ItemSeparatorComponent={() => <View className="h-[1px] bg-gray-200" />}
            />
          </View>
        </TouchableOpacity>
      </Modal>
        </View>
    );
}