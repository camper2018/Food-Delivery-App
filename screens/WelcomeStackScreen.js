import React, { useContext } from "react";
import { View, Button } from "react-native";
// import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import DrawerMenu from "../components/Views/hamburger";
import IconButton from "../components/Views/IconButton";
// import MenuComponent from "../components/Dishes";
import FoodDetailComponent from "../components/FoodDetail";
import HomeComponent from "../components/HomeComponent";
import SearchResultComponent from "../components/SearchResult";
import Firebase from "../config/firebase";
const auth = Firebase.auth();
const Stack = createStackNavigator();

const MainStackNavigator = () => {
  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Stack.Navigator initialRoute="Food List">
      <Stack.Screen
        name="Food List"
        component={HomeComponent}
        options={({ route }) => ({
          // headerShown: false,
          tabBarActiveTintColor: "green",
          tabBarInactiveTintColor: "grey",

          tabBarLabelStyle: {
            color: "grey",
            fontSize: 12,
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
          headerTintColor: "white",
          headerStyle: { backgroundColor: "brown" },

          headerRight: () => (
            <View
              style={{
                justifyContent: "space-between",
                width: 70,
                marginBottom: 4,
              }}
            >
              <IconButton
                name="logout"
                size={24}
                color="white"
                onPress={handleSignOut}
              />
            </View>
          ),
          title: "",
          headerLeft: () => <DrawerMenu />,
        })}
        // options={{
        //   headerShown: false,

        // }}
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
      <Stack.Screen
        name="Search Result"
        component={SearchResultComponent}
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
