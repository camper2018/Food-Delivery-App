import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { Button } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import Card from "./Views/Card";
import RadioButton from "./Views/RadioButton";
import { DishesContext } from "../HomeScreenContext";
const Checkout = ({ navigation, route }) => {
  const [paymentMethod, setPaymentMethod] = useState();
  const [deliveryMethod, setDeliveryMethod] = useState();
  const [totalPrice, setTotalPrice] = useState(0);
  // console.log("paymentMethod: ", paymentMethod);
  // console.log("deliveryMethod: ", deliveryMethod);
  const [radioBtn, setRadioBtn] = useState({
    card: false,
    bankAccout: false,
    doorDelivery: false,
    pickup: false,
  });
  const { cartItems } = useContext(DishesContext);
  const calculateTotalPrice = () => {
    const total = cartItems.reduce(
      (acc, item) => (acc += item.amount * item.price),
      0
    );
    setTotalPrice(total.toFixed(2));
    console.log("total: ", total);
  };
  useEffect(() => {
    calculateTotalPrice();
  }, []);
  return (
    <SafeAreaView>
      <Animatable.View animation="zoomInUp">
        <ScrollView>
          <View style={{ marginTop: 10, marginLeft: 20 }}>
            <Ionicons
              name="arrow-back"
              size={30}
              color="black"
              onPress={navigation.goBack}
            />
          </View>
          <Text
            style={{ fontSize: 30, fontWeight: "bold", alignSelf: "center" }}
          >
            Payment
          </Text>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 18,
              margin: 30,
            }}
          >
            Payment method
          </Text>
          <Card style={{ width: "85%", alignSelf: "center" }}>
            <View
              style={{
                flexDirection: "row",
                marginVertical: 5,
                borderBottomWidth: 1,
                marginHorizontal: 10,
                paddingBottom: 10,
                alignItems: "center",
              }}
            >
              <RadioButton
                selected={radioBtn.card}
                onPress={() => {
                  setPaymentMethod(!paymentMethod ? "card" : null);
                  setRadioBtn((state) => ({
                    ...state,
                    card: !state.card,
                    bankAccount: false,
                  }));
                }}
              />
              <View
                style={{
                  backgroundColor: "tomato",
                  width: 50,
                  height: 50,
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  marginHorizontal: 10,
                }}
              >
                <EvilIcons name="credit-card" size={30} color="white" />
              </View>
              <Text style={{ fontSize: 20 }}>Card</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginVertical: 5,
                marginHorizontal: 10,
                paddingBottom: 10,

                alignItems: "center",
              }}
            >
              <RadioButton
                selected={radioBtn.bankAccount}
                onPress={() => {
                  setPaymentMethod(!paymentMethod ? "bankAccount" : null);
                  setRadioBtn((state) => ({
                    ...state,
                    bankAccount: !state.bankAccount,
                    card: false,
                  }));
                }}
              />
              <View
                style={{
                  backgroundColor: "#ff0080",
                  width: 50,
                  height: 50,
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  marginHorizontal: 10,
                }}
              >
                <FontAwesome name="bank" size={20} color="white" />
              </View>
              <Text style={{ fontSize: 20 }}>Bank account</Text>
            </View>
          </Card>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 18,
              margin: 30,
            }}
          >
            Delivery method
          </Text>
          <Card style={{ width: "85%", alignSelf: "center" }}>
            <View
              style={{
                flexDirection: "row",
                marginVertical: 5,
                borderBottomWidth: 1,
                marginHorizontal: 10,
                paddingBottom: 20,
                alignItems: "center",
                paddingVertical: 10,
              }}
            >
              <RadioButton
                selected={radioBtn.doorDelivery}
                onPress={() => {
                  setDeliveryMethod(!deliveryMethod ? "doorDelivery" : null);
                  setRadioBtn((state) => ({
                    ...state,
                    doorDelivery: !state.doorDelivery,
                    pickup: false,
                  }));
                }}
              />

              <Text style={{ fontSize: 20, marginLeft: 10 }}>
                Door delivery
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginVertical: 5,
                marginHorizontal: 10,
                alignItems: "center",
                paddingTop: 10,
              }}
            >
              <RadioButton
                selected="true"
                selected={radioBtn.pickup}
                onPress={() => {
                  setDeliveryMethod(!deliveryMethod ? "pickup" : null);
                  setRadioBtn((state) => ({
                    ...state,
                    pickup: !state.pickup,
                    doorDelivery: false,
                  }));
                }}
              />

              <Text style={{ fontSize: 20, marginLeft: 10 }}>Pick up</Text>
            </View>
          </Card>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              margin: 30,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>Total</Text>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              ${totalPrice}
            </Text>
          </View>
          <Button
            title="Proceed to payment"
            accessibilityLabel="Add to cart"
            buttonStyle={styles.button}
          />
        </ScrollView>
      </Animatable.View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  button: {
    backgroundColor: "red",
    marginBottom: 30,
    borderRadius: 30,
    padding: 15,
    marginHorizontal: 50,
  },
});
export default Checkout;
