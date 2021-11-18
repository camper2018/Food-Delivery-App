import React, { useContext } from "react";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import Home from "../components/HomeComponent";
import ShoppingCart from "./OrdersScreen";
import Favorites from "./FavoritesScreen";
import DrawerMenu from "../components/Views/hamburger";
import IconButton from "../components/Views/IconButton";
import Firebase from "../config/firebase";
import { AuthenticatedUserContext } from "../Navigation/AuthenticatedUserProvider";
import Meals from "../components/data";
import WelcomeStackScreen from "./WelcomeStackScreen";

const auth = Firebase.auth();

const Tab = createBottomTabNavigator();

const WelcomeScreen = (props) => {
  const { user } = useContext(AuthenticatedUserContext);
  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Tab.Navigator
      initialRouteName="Welcome"
      screenOptions={
        {
          // headerShown: true,
        }
      }
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Welcome") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Shopping Cart") {
            iconName = focused ? "ios-cart" : "ios-cart-outline";
          } else if (route.name === "Favorites") {
            iconName = focused ? "ios-heart" : "ios-heart-outline";
          }

          return <Ionicons name={iconName} size={30} color={color} />;
        },
        tabBarActiveTintColor: "green",
        tabBarInactiveTintColor: "grey",

        tabBarLabelStyle: {
          color: "grey",
          fontSize: 12,
          fontWeight: "bold",
        },

        // headerShown: true,
        headerTitleAlign: "center",
        headerTintColor: "white",
        headerStyle: { backgroundColor: "brown" },
        headerRight: () => (
          <View
            style={{
              marginRight: 20,
              flexDirection: "row",
              justifyContent: "space-between",
              width: 70,
            }}
          >
            <Ionicons name="cart-sharp" size={24} color="white" />
            <IconButton
              name="logout"
              size={24}
              color="white"
              onPress={handleSignOut}
            />
          </View>
        ),
        headerText: route.name,
        headerLeft: () => <DrawerMenu />,
      })}
    >
      <Tab.Screen
        name="Welcome"
        component={WelcomeStackScreen}
        // options={({ route }) => ({
        //   title: route.name,
        //   headerLeft: () => <DrawerMenu />,
        // })}
      />
      <Tab.Screen
        name="Shopping Cart"
        component={ShoppingCart}
        // options={{
        //   title: "Shopping Cart",
        // }}
      />
      <Tab.Screen
        name="Favorites"
        component={Favorites}
        // options={{
        //   title: "Favorites",
        // }}
      />
    </Tab.Navigator>
  );
};

export default WelcomeScreen;
