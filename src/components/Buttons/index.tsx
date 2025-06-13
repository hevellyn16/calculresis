import React from 'react';
import { 
    TouchableOpacity, 
    Text, 
    View, 
    TouchableHighlightProps
} from 'react-native'; 

type Props = TouchableHighlightProps& {
  title: string;
  onPress: () => void;
  icon?: React.ReactNode;
}

export default function Button({title, onPress, icon, ...rest}: Props) {
  return (
    <TouchableOpacity
      className="flex w-[345px] py-[16px] px-[13px] flex-row justify-center items-center rounded-[5px] bg-white shadow-md shadow-black/50"
      onPress={onPress}
    >
      {icon && (
        <View className="mr-2"> 
          {icon}
        </View>
      )}
      <Text className="flex-1 text-lg font-semibold text-center text-gray-700">
        {title}
      </Text>
    </TouchableOpacity>
  );
};