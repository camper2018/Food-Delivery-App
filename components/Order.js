import React, { useContext } from "react";
import { Text, StyleSheet, Image, View, ScrollView } from "react-native";
import { Button } from "react-native-elements";
import Card from "./Views/Card";
import { DishesContext } from "../HomeScreenContext";

const Order = ({ route, navigation }) => {
  const { cartItems, setCartItems } = useContext(DishesContext);
  const foodItems = route.params ? route.params.order.items : null;

  if (foodItems) {
    return (
      <ScrollView>
        {foodItems.map((item) => (
          <Card
            key={item.id}
            style={{
              paddingBottom: 0,
              borderRadius: 20,
              marginTop: 15,
              marginHorizontal: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <Image
                source={{ uri: item.imageSrc }}
                alt={item.name}
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: 100,
                }}
              />

              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 20,
                    marginHorizontal: 10,
                  }}
                >
                  {item.amount} {item.name}
                </Text>
                <Text style={{ fontWeight: "bold", color: "tomato" }}>
                  ${Number(item.price) * item.amount}
                </Text>
              </View>
            </View>
            <Button
              buttonStyle={{
                alignSelf: "center",
                width: 130,
                paddingTop: 0,
              }}
              type="clear"
              accessibilityLabel="Order again"
              title="Order again"
              titleStyle={{ color: "orange", fontWeight: "bold" }}
              onPress={() => {
                setCartItems([...cartItems, item]);
                navigation.navigate("Shopping Cart");
              }}
            />
          </Card>
        ))}
      </ScrollView>
    );
  } else {
    return null;
  }
};

export default Order;
