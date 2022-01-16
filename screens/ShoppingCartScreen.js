import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ShoppingCart from "../components/ShoppingCart";
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
        }}
        unmountOnBlur={true}
      />
      <Stack.Screen
        name="Checkout"
        component={Checkout}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
export default ShoppingCartNavigator;
