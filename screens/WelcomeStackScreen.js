import React, { useContext } from "react";
import { View, Button } from "react-native";
// import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// import MenuComponent from "../components/Dishes";
import FoodDetailComponent from "../components/FoodDetail";
import HomeComponent from "../components/HomeComponent";

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator initialRoute="Food List">
      <Stack.Screen
        name="Food List"
        component={HomeComponent}
        options={{
          headerShown: false,
          headerLeft: () => <DrawerMenu />,
        }}
      />
      <Stack.Screen
        name="Food Detail"
        component={FoodDetailComponent}
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
export default MainStackNavigator;
