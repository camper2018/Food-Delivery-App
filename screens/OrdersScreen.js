import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MyOrders from "../components/MyOrders";
import DrawerMenu from "../components/Views/hamburger";

const Stack = createStackNavigator();
const OrdersScreen = ({ navigation, route }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Orders Screen"
        component={MyOrders}
        options={({ navigation, route }) => ({
          title: "Orders Screen",
          headerTintColor: "white",
          headerTitleAlign: "center",
          headerTintColor: "white",
          headerStyle: { backgroundColor: "brown" },
          headerLeft: () => <DrawerMenu />,
          headerShown: true,
        })}
      />
    </Stack.Navigator>
  );
};
export default OrdersScreen;
