import { Picker } from "@react-native-picker/picker";
import { View } from "react-native";
import colors from "tailwindcss/colors";

type selectProps = {
  selectedValue: string;
  onValueChange: (value: string) => void;
  items: { label: string; value: string }[];
};

export function Select({ selectedValue, onValueChange, items }: selectProps) {
  return (
    <View className="overflow-hidden rounded-md mb-4 mt-2 mx-2">
      <Picker
        style={{
          backgroundColor: colors.slate[800],
          color: colors.slate[400],
        }}
        mode="dropdown"
        dropdownIconColor={colors.lime[400]}
        dropdownIconRippleColor={colors.lime[400]}
        selectedValue={selectedValue}
        onValueChange={onValueChange}
      >
        {items.map((item, index) => (
          <Picker.Item
            key={index}
            label={item.label}
            value={item.value}
          />
        ))}
      </Picker>
    </View>
  );
}
