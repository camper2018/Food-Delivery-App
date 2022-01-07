import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  SafeAreaView,
  StyleSheet,
  Modal,
  Keyboard,
} from "react-native";
import { Button } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import Card from "./Views/Card";
import RadioButton from "./Views/RadioButton";
import { DishesContext } from "../HomeScreenContext";
import Firebase from "../config/firebase";
import { formatPhone } from "../utils/formatPhone";

import { useTheme } from "react-native-paper";

const Checkout = ({ navigation, route }) => {
  const auth = Firebase.auth();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [address, setAddress] = useState({});
  const [phone, setPhone] = useState("");
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
  const [isModalVisible, setModalVisible] = useState(false);
  const { colors } = useTheme();
  // const [address, setAddress] = useState({
  //   street: "",
  //   city: "",
  //   state: "",
  //   zipCode: "",
  // });
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  useEffect(() => {
    // Fetch profile name,nickname, email, address, image, phone number here.
    const users = Firebase.database().ref("users/" + auth.currentUser.uid);
    if (users) {
      users.on("value", (snapshot) => {
        const data = snapshot.val();
        setFirstname(data.firstname);
        setLastname(data.lastname);
        setAddress(data.address);
        setPhone(formatPhone(data.phone));
      });
    }
  }, []);
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
            Checkout
          </Text>
          <Modal
            visible={isModalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={toggleModal}
          >
            <Card
              style={{
                alignItems: "center",
                alignSelf: "center",
                marginTop: 150,
                width: "80%",
              }}
            >
              <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                Delivery Address
              </Text>

              <View style={{ paddingVertical: 10 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ paddingVertical: 8, fontWeight: "bold" }}>
                    Street:
                  </Text>
                  <TextInput
                    placeholder="Street Address"
                    placeholderTextColor="#666666"
                    autoCorrect={false}
                    style={[
                      styles.textInput,
                      {
                        color: colors.text,
                      },
                    ]}
                    value={address.street}
                    onChangeText={(val) =>
                      setAddress({ ...address, street: val })
                    }
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ paddingVertical: 8, fontWeight: "bold" }}>
                    City:
                  </Text>
                  <TextInput
                    placeholder="City"
                    placeholderTextColor="#666666"
                    autoCorrect={false}
                    style={[
                      styles.textInput,
                      {
                        color: colors.text,
                      },
                    ]}
                    value={address.city}
                    onChangeText={(val) =>
                      setAddress({ ...address, city: val })
                    }
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ paddingVertical: 8, fontWeight: "bold" }}>
                    State:
                  </Text>
                  <TextInput
                    placeholder="State"
                    placeholderTextColor="#666666"
                    autoCorrect={false}
                    maxLength={2}
                    style={[
                      styles.textInput,
                      {
                        color: colors.text,
                      },
                    ]}
                    value={address.state}
                    onChangeText={(val) =>
                      setAddress({ ...address, state: val })
                    }
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ paddingVertical: 8, fontWeight: "bold" }}>
                    Zip:
                  </Text>

                  <TextInput
                    placeholder="ZIP Code"
                    placeholderTextColor="#666666"
                    keyboardType="number-pad"
                    onBlur={Keyboard.dismiss}
                    autoCorrect={false}
                    maxLength={5}
                    style={[
                      styles.textInput,
                      {
                        color: colors.text,
                      },
                    ]}
                    value={address.zipCode}
                    onChangeText={(val) =>
                      setAddress({ ...address, zipCode: val })
                    }
                  />
                </View>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: 180,
                }}
              >
                <Button title="Submit" type="clear" onPress={toggleModal} />
                <Button
                  title="Cancel"
                  type="clear"
                  onPress={() => {
                    toggleModal();
                  }}
                  titleStyle={{ color: "red" }}
                />
              </View>
            </Card>
          </Modal>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginRight: 5,
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 18,
                margin: 30,
              }}
            >
              Address details
            </Text>
            <Button
              buttonStyle={{
                padding: 0,
              }}
              type="clear"
              title="change"
              titleStyle={{ color: "orange", fontWeight: "bold", margin: 30 }}
              onPress={toggleModal}
            />
          </View>
          <Card style={{ width: "85%", alignSelf: "center" }}>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>
              {firstname} {lastname}
            </Text>
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "#ADADAD",
                marginVertical: 12,
                marginRight: 30,
              }}
            ></View>

            <Text style={{ fontSize: 15 }}>{address.street}</Text>

            <Text style={{ fontSize: 15 }}>
              {address.city} {address.state}, {address.zipCode}
            </Text>
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "#ADADAD",
                marginVertical: 12,
                marginRight: 30,
              }}
            ></View>
            <Text style={{ fontSize: 15 }}>{phone}</Text>
          </Card>
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
  textInput: {
    marginHorizontal: 5,
    color: "#05375a",
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    paddingVertical: 8,
    width: 150,
  },
});
export default Checkout;
