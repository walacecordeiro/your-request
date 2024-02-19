import { Header } from "@/components/header";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Product } from "@/components/product";
import { ProductCartProps, useCartStore } from "@/stores/cart-store";
import { formatCurrency } from "@/utils/functions/format-currency";
import { View, Text, ScrollView, Alert, Linking } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Feather } from "@expo/vector-icons";
import { LinkButton } from "@/components/link-button";
import { useState } from "react";
import { useNavigation } from "expo-router";
import { Select } from "@/components/select";

const PHONE_NUMBER = "5521988778644";

export default function Cart() {
  const [clientName, setClientName] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [addressComplement, setAddressComplement] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [observation, setObservation] = useState("");
  const cartStore = useCartStore();
  const navigation = useNavigation();

  const total = formatCurrency(
    cartStore.products.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    )
  );

  function handleProductRemove(product: ProductCartProps) {
    Alert.alert("Remover", `Deseja remover ${product.title} do carrinho?`, [
      {
        text: "Cancelar",
      },
      {
        text: "Remover",
        onPress: () => cartStore.remove(product.id),
      },
    ]);
  }

  function handleOrder() {
    if (clientName.trim().length === 0) {
      return Alert.alert("Pedido", `Informe o nome de quem receberá o pedido!`);
    }

    const products = cartStore.products
      .map((product) => `\n ${product.quantity} ${product.title}`)
      .join("");

    const message = `
      \n🍔 MEU PEDIDO
${products}
      \nValor total: ${total}
      \n\nQuem vai receber o pedido:
${clientName}
      \n\nEntregar em:
${streetAddress}, N°${houseNumber}, ${postalCode}, ${addressComplement}
      \n\nForma de pagamento:
${paymentMethod}
      \n\nObservações:
${observation}
    `;

    Linking.openURL(
      `http://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${message}`
    );

    cartStore.clear();
    navigation.goBack();
  }

  return (
    <View className="flex-1 pt-8">
      <Header />

      <KeyboardAwareScrollView>
        <ScrollView>
          <View className="p-5 flex-1">
            {cartStore.products.length > 0 ? (
              <View>
                {cartStore.products.map((product) => (
                  <Product
                    key={product.id}
                    data={product}
                    onPress={() => handleProductRemove(product)}
                  />
                ))}
              </View>
            ) : (
              <Text className="font-body text-slate-400 text-center my-8">
                Seu carrinho está vazio.
              </Text>
            )}

            <View className="flex-row gap-2 items-center mt-5">
              <Text className="text-white text-xl font-subtitle">Total:</Text>
              <Text className="text-lime-400 text-2xl font-heading">
                {total}
              </Text>
            </View>

            <Text className="text-white text-xl font-subtitle border-t border-slate-700 pt-5 mt-4 mb-4">
              Informações para entrega
            </Text>

            <View className="gap-2">
              <Text className="text-white font-subtitle text-base">
                Nome do cliente
              </Text>
              <Input
                autoComplete="name"
                placeholder="Quem receberá o pedido?"
                onChangeText={setClientName}
              />

              <Text className="text-white font-subtitle text-base">
                Endereço
              </Text>
              <View className="flex-row justify-between flex-wrap">
                <Input
                  autoComplete="street-address"
                  placeholder="Rua"
                  onChangeText={setStreetAddress}
                  className="w-[68%]"
                />
                <Input
                  keyboardType="numeric"
                  placeholder="Número"
                  onChangeText={setHouseNumber}
                  className="w-[30%]"
                />

                <Input
                  keyboardType="numeric"
                  autoComplete="postal-code"
                  placeholder="Cep"
                  onChangeText={setPostalCode}
                  className="w-[30%]"
                />

                <Input
                  autoComplete="address-line2"
                  placeholder="Bloco, casa, apto..."
                  onChangeText={setAddressComplement}
                  className="w-[68%]"
                />
              </View>

              <Text className="text-white font-subtitle text-base">
                Forma de pagamento
              </Text>
              <Select
                selectedValue={paymentMethod}
                onValueChange={(itemValue) => setPaymentMethod(itemValue)}
                items={[
                  { label: "--Escolha uma opção--", value: "Não selecionada" },
                  { label: "Dinheiro", value: "Dinheiro" },
                  { label: "PIX", value: "PIX" },
                  { label: "Cartão de Crédito", value: "Cartão de Crédito" },
                  { label: "Cartão de Débito", value: "Cartão de Débito" },
                ]}
              />

              <Text className="text-white font-subtitle text-base">
                Observações
              </Text>
              <Input
                textAlignVertical="top"
                placeholder="Informe algum detalhe do pedido que gostaria que soubéssemos."
                onChangeText={setObservation}
                className="h-32 bg-slate-800 rounded-md px-4 py-3 font-body text-sm text-white"
                // blurOnSubmit={true}
                // onSubmitEditing={handleOrder}
                // returnKeyType="next"
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>

      <View className="p-5 gap-5">
        <Button onPress={handleOrder}>
          <Button.Text>Enviar pedido</Button.Text>
          <Button.Icon>
            <Feather name="arrow-right-circle" size={20} />
          </Button.Icon>
        </Button>

        <LinkButton title="Voltar ao cardápio" href="/" />
      </View>
    </View>
  );
}
