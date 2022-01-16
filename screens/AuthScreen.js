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
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen
        name="Login"
        options={{
          title: "Login",
          unmountOnBlur: true,
        }}
        children={() => (
          <Login {...props} handlePasswordReset={props.handlePasswordReset} />
        )}
      />
      <Tab.Screen
        name="Sign-up"
        component={Signup}
        options={{
          title: "Sign-up",
          unmountOnBlur: true,
        }}
      />
    </Tab.Navigator>
  );
};

const AuthScreen = (props) => {
  const [passwordReset, setPasswordReset] = useState(false);
  const handlePasswordReset = () => setPasswordReset((state) => !state);
  return (
    <NavigationContainer independent={true}>
      {!passwordReset && (
        <Card style={styles.card}>
          <Image
            source={require("./../assets/chef-head-symbol.jpeg")}
            style={styles.image}
          />
          <AuthTabScreen
            options={{
              unmountOnBlur: true,
            }}
            {...props}
            handlePasswordReset={handlePasswordReset}
          />
        </Card>
      )}

      {passwordReset && (
        <Card style={styles.card}>
          <ForgotPassword
            options={{ unmountOnBlur: true }}
            handlePasswordReset={handlePasswordReset}
          />
        </Card>
      )}
    </NavigationContainer>
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
