import React, { useContext } from "react";
import { View, Text, Badge } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import Home from "../components/HomeComponent";
// import ShoppingCart from "./OrdersScreen";
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
              // marginRight: 20,
              // flexDirection: "row",
              justifyContent: "space-between",
              width: 70,
              marginBottom: 4,
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
