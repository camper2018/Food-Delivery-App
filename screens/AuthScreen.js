import React, { useState } from "react";
import { StyleSheet, Image } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Card from "../components/Views/Card";
import Login from "../components/LoginTab";
import Signup from "../components/SignupTab";
import ForgotPassword from "./ForgotPassword";
import { NavigationContainer } from "@react-navigation/native";
const Tab = createMaterialTopTabNavigator();
const AuthTabScreen = (props) => {
  return (
    <Tab.Navigator
      headerMode="none"
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen
        name="Login"
        component={Login}
        options={{
          title: "Login",
        }}
      />
      <Tab.Screen
        name="Sign-up"
        component={Signup}
        options={{
          title: "Sign-up",
        }}
      />
    </Tab.Navigator>
  );
};

const AuthScreen = (props) => {
  const [passwordReset, setPasswordReset] = useState(false);
  const handlePasswordReset = () => {
    setPasswordReset(!passwordReset);
  };
  return (
    <Card style={styles.card}>
      <Image
        source={require("./../assets/chef-head-symbol.jpeg")}
        style={styles.image}
      />

      <NavigationContainer independent={true}>
        {!passwordReset && <AuthTabScreen {...props} />}
        {passwordReset && <ForgotPassword />}
      </NavigationContainer>
    </Card>
  );
};
const styles = StyleSheet.create({
  image: {
    marginTop: 10,
    flex: 0.4,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  card: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
  },
});
export default AuthScreen;
