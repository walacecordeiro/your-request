import { Image, View, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";
import { Link } from "expo-router";

type HeaderProps = {
  cartQuantityItems?: number;
};

export function Header({ cartQuantityItems = 0 }: HeaderProps) {
  return (
    <View className="flex-row justify-between items-center border-b border-slate-700 pb-8 mx-5">
      <Image source={require("@/assets/logo.png")} className="w-56 h-11" />

      <View>
        {cartQuantityItems > 0 && (
          <Link href="/cart" asChild>
            <TouchableOpacity activeOpacity={0.7}>
              <View className="bg-lime-300 w-4 h-4 rounded-full items-center justify-center top-2 z-10 -right-3.5">
                <Text className="text-slate-900 font-bold text-xs">
                  {cartQuantityItems}
                </Text>
              </View>
              <Feather name="shopping-bag" color={colors.white} size={24} />
            </TouchableOpacity>
          </Link>
        )}
      </View>
    </View>
  );
}
