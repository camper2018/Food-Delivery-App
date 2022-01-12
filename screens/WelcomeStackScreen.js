import React from "react";
import { View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import DrawerMenu from "../components/Views/hamburger";
import IconButton from "../components/Views/IconButton";
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
      />
      <Stack.Screen
        name="Food Detail"
        component={FoodDetailComponent}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Search Result"
        component={SearchResultComponent}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
export default MainStackNavigator;
