import React, { useContext } from "react";
import { View, Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import ShoppingCart from "./OrdersScreen";
import Checkout from "../components/Checkout";
const Stack = createStackNavigator();

const ShoppingCartNavigator = () => {
  return (
    <Stack.Navigator initialRoute="Cart">
      <Stack.Screen
        name="Cart"
        component={ShoppingCart}
        options={{
          headerShown: false,
          // headerLeft: () => <DrawerMenu />,
        }}
      />
      <Stack.Screen
        name="Checkout"
        component={Checkout}
        // options={({ route }) => ({
        //   title: route.params.name,
        //   headerLeft: () => <Button title="Go Back"></Button>,
        // })}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
export default ShoppingCartNavigator;
