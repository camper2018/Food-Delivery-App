import React, { useContext } from "react";
import { View, Text, Badge } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import Home from "../components/HomeComponent";
import ShoppingCart from "./ShoppingCartScreen";
import Favorites from "./FavoritesScreen";
import DrawerMenu from "../components/Views/hamburger";
import IconButton from "../components/Views/IconButton";
import Firebase from "../config/firebase";
import { AuthenticatedUserContext } from "../Navigation/AuthenticatedUserProvider";
import Meals from "../components/data";
import WelcomeStackScreen from "./WelcomeStackScreen";
import { DishesContext } from "../HomeScreenContext";
const auth = Firebase.auth();

const Tab = createBottomTabNavigator();

const WelcomeScreen = (props) => {
  const { cartItems, setCartItems, setFavoriteDishes } =
    useContext(DishesContext);
  const { user } = useContext(AuthenticatedUserContext);
  const handleSignOut = async () => {
    setFavoriteDishes([]);
    setCartItems([]);
    try {
      await auth.signOut();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Tab.Navigator
      initialRouteName="Welcome"
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

          if (iconName === "ios-cart-outline") {
            return (
              <View>
                {cartItems.length ? (
                  <View
                    style={{
                      position: "absolute",
                      zIndex: 1.2,
                      marginLeft: 16,
                      borderRadius: 100,
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "green",
                      width: 20,
                      height: 20,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 13,
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      {cartItems.length}
                    </Text>
                  </View>
                ) : null}
                <Ionicons name={iconName} size={30} color={color} />
              </View>
            );
          } else {
            return <Ionicons name={iconName} size={30} color={color} />;
          }
        },
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
        headerText: route.name,
        headerLeft: () => <DrawerMenu />,
        headerShown: false,
      })}
    >
      <Tab.Screen name="Welcome" component={WelcomeStackScreen} />
      <Tab.Screen name="Shopping Cart" component={ShoppingCart} />
      <Tab.Screen name="Favorites" component={Favorites} />
    </Tab.Navigator>
  );
};

export default WelcomeScreen;
