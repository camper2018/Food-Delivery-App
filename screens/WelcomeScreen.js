import React, { useContext } from "react";
import { View, Text, Badge } from "react-native";
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
import { DishesContext } from "../HomeScreenContext";
const auth = Firebase.auth();

const Tab = createBottomTabNavigator();

const WelcomeScreen = (props) => {
  const { cartItems } = useContext(DishesContext);
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

          // return <Ionicons name={iconName} size={30} color={color} />;
          if (iconName === "ios-cart-outline") {
            return (
              <View>
                <View
                  style={{
                    // borderRadius: 100,
                    position: "absolute",
                    // zIndex: 1.2,
                    marginLeft: 12,
                    // marginTop: -12,
                    // height: 20,
                  }}
                >
                  <Text
                    style={{
                      // marginTop: -6,
                      zIndex: 1.0,
                      fontSize: 12,
                      color: "orange",
                      paddingHorizontal: 5,
                      // paddingVertical: 1,
                      position: "relative",
                      fontWeight: "bold",
                      backgroundColor: "green",
                      borderRadius: 100,
                    }}
                  >
                    {cartItems.length}
                  </Text>
                </View>
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

        // headerShown: true,
        headerTitleAlign: "center",
        headerTintColor: "white",
        headerStyle: { backgroundColor: "brown" },
        headerRight: () => (
          <View
            style={{
              // marginRight: 20,
              // flexDirection: "row",
              justifyContent: "space-between",
              width: 70,
            }}
          >
            {/* <View>
              <Ionicons
                style={{ position: "relative" }}
                name="cart-sharp"
                size={24}
                color="white"
              />
              <View
                style={{
                  position: "absolute",

                  marginLeft: 8,
                }}
              >
                <Text
                  style={{
                    marginTop: -9,
                    zIndex: 1.0,
                    fontSize: 12,
                    color: "orange",
                    paddingHorizontal: 5,
                    position: "relative",
                    fontWeight: "bold",
                    backgroundColor: "green",
                    borderRadius: 100,
                  }}
                >
                  {cartItems.length}
                </Text>
              </View>
            </View> */}
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
