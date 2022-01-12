import React, { useState, useContext, useEffect } from "react";
import { View, Text, Image, StyleSheet, ActivityIndicator } from "react-native";
import Firebase from "../config/firebase";
import { AuthenticatedUserContext } from "./AuthenticatedUserProvider";
import { NavigationContainer } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerItemList,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { Icon } from "react-native-elements";
import WelcomeScreen from "../screens/WelcomeScreen";
import AuthScreen from "../screens/AuthScreen";
import Logout from "../components/Logout";
import { DishesContextProvider } from "../HomeScreenContext";
import ProfileScreen from "../screens/ProfileScreen";
import OrdersScreen from "../screens/OrdersScreen";
const auth = Firebase.auth();

const CustomDrawerComponent = (props) => {
  return (
    <DrawerContentScrollView>
      <View style={styles.drawerHeader}>
        <View>
          <Image
            source={require("../assets/chef-head-symbol.jpeg")}
            style={styles.drawerImage}
          />
        </View>
        <View>
          <Text style={styles.drawerHeaderText}>Food Delivery App</Text>
        </View>
      </View>
      <DrawerItemList {...props} />
      <Logout {...props} />
    </DrawerContentScrollView>
  );
};

const MainNavigator = createDrawerNavigator();
const MainDrawerScreen = (props) => {
  return (
    <MainNavigator.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
      })}
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerComponent {...props} />}
    >
      <MainNavigator.Screen
        name="Home"
        component={WelcomeScreen}
        options={{
          drawerIcon: (props) => (
            <Icon
              name="home"
              type="font-awesome"
              size={24}
              color={props.color}
            />
          ),
        }}
      />

      <MainNavigator.Screen
        name="My Profile"
        component={ProfileScreen}
        options={{
          drawerIcon: (props) => (
            <Icon
              name="user"
              type="font-awesome"
              size={24}
              color={props.color}
            />
          ),
          // unmountOnBlur: true,
        }}
      />
      <MainNavigator.Screen
        name="My Orders"
        component={OrdersScreen}
        options={{
          drawerIcon: (props) => (
            <Icon
              name="list-alt"
              type="font-awesome"
              size={22}
              color={props.color}
            />
          ),
          // unmountOnBlur: true,
        }}
      />
    </MainNavigator.Navigator>
  );
};

const Main = () => {
  const { user, setUser } = useContext(AuthenticatedUserContext);

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // onAuthStateChanged returns an unsubscriber
    const unsubscribeAuth = auth.onAuthStateChanged(
      async (authenticatedUser) => {
        try {
          await (authenticatedUser
            ? setUser(authenticatedUser)
            : setUser(null));
          setIsLoading(false);
        } catch (error) {
          console.log(error);
        }
      }
    );

    // unsubscribe auth listener on unmount
    return unsubscribeAuth;
  }, []);
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <DishesContextProvider>
      <NavigationContainer>
        {user && user.emailVerified ? <MainDrawerScreen /> : <AuthScreen />}
      </NavigationContainer>
    </DishesContextProvider>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerHeader: {
    backgroundColor: "maroon",
    height: 140,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
  },
  drawerHeaderText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginRight: 10,
  },
  drawerImage: {
    margin: 10,
    width: 70,
    height: 70,
    borderRadius: 100,
  },
});

export default Main;
