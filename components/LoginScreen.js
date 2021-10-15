import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";
import { Input, CheckBox, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import * as SecureStore from "expo-secure-store";
import Card from "../Views/Card";
import KeyboardAvoidingWrapper from "../Views/KeyboardAvoidingWrapper";

// Login Component
const LoginTab = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRemembered, setIsRemembered] = useState(false);
  useEffect(() => {
    SecureStore.getItemAsync("userinfo").then((userdata) => {
      let user = JSON.parse(userdata);
      if (user) {
        console.log(user);
        setEmail(user.email);
        setPassword(user.password);
      }
    });
  }, []);
  const handleLogin = async () => {
    if (isRemembered) {
      await SecureStore.setItemAsync(
        "userinfo",
        JSON.stringify({
          email: email,
          password: password,
        })
      ).catch((error) => console.log("Could not save user info ", error));
    } else {
      await SecureStore.deleteItemAsync("userinfo").catch((error) =>
        console.log("Could not delete user info ", error)
      );
    }
  };
  return (
    <KeyboardAvoidingWrapper>
      <View style={styles.form}>
        <Input
          label="Email address"
          keyboardType="email-address"
          autoCapitalize="none"
          leftIcon={<Icon name="envelope" size={30} color="#3895D3" />}
          onChangeText={(email) => setEmail(email)}
          value={email}
          containerStyle={styles.formInput}
        />
        <Input
          label="Password"
          leftIcon={<Icon name="key" size={30} color="#3895D3" />}
          secureTextEntry
          onChangeText={(pw) => setPassword(pw)}
          value={password}
          containerStyle={styles.formInput}
        />
        <CheckBox
          title="Remember Me"
          center
          checked={isRemembered}
          onPress={() => setIsRemembered((bool) => !bool)}
          containerStyle={styles.formCheckbox}
        />
        <Button
          onPress={handleLogin}
          accessibilityLabel="login"
          title="Login"
          icon={<Icon name="sign-in" color="white" size={24} />}
          buttonStyle={styles.formButton}
        />
      </View>
    </KeyboardAvoidingWrapper>
  );
};
const SignUpTab = (props) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRemembered, setIsRemembered] = useState(false);

  const handleSignup = () => {
    if (isRemembered) {
      SecureStore.setItemAsync(
        "userinfo",
        JSON.stringify({
          email: email,
          password: password,
        })
      ).catch((error) => console.log("Could not save user info ", error));
    }
  };
  return (
    <KeyboardAvoidingWrapper>
      <View style={styles.form}>
        <Input
          label="First name"
          leftIcon={<Icon name="user" size={30} color="#3895D3" />}
          onChangeText={(firstname) => setFirstname(firstname)}
          value={firstname}
          containerStyle={styles.formInput}
        />
        <Input
          label="Last name"
          leftIcon={<Icon name="user" size={30} color="#3895D3" />}
          onChangeText={(lastname) => setLastname(lastname)}
          value={lastname}
          containerStyle={styles.formInput}
        />
        <Input
          label="Email address"
          leftIcon={<Icon name="envelope" size={30} color="#3895D3" />}
          onChangeText={(email) => setEmail(email)}
          value={email}
          containerStyle={styles.formInput}
        />
        <Input
          label="Password"
          leftIcon={<Icon name="key" size={30} color="#3895D3" />}
          onChangeText={(password) => setPassword(password)}
          value={password}
          containerStyle={styles.formInput}
        />

        <CheckBox
          title="Remember Me"
          center
          checked={isRemembered}
          onPress={() => setIsRemembered((bool) => !bool)}
          containerStyle={styles.formCheckbox}
        />

        <Button
          onPress={handleSignup}
          title="Sign-up"
          icon={<Icon name="user-plus" color="white" size={20} />}
          buttonStyle={styles.formButton}
        />
      </View>
    </KeyboardAvoidingWrapper>
  );
};
const Tab = createMaterialTopTabNavigator();
const LoginTabScreen = ({ navigation }) => {
  return (
    <Tab.Navigator initialRouteName="Login">
      <Tab.Screen
        name="Login"
        component={LoginTab}
        options={{
          title: "Login",
        }}
      />
      <Tab.Screen
        name="Sign-up"
        component={SignUpTab}
        options={{
          title: "Sign-up",
        }}
      />
    </Tab.Navigator>
  );
};

const LoginScreen = (props) => {
  return (
    <Card style={styles.card}>
      <Image
        source={require("./../assets/chef-head-symbol.jpeg")}
        style={styles.image}
      />

      <NavigationContainer independent={true}>
        <LoginTabScreen {...props} />
      </NavigationContainer>
    </Card>
  );
};
const styles = StyleSheet.create({
  form: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: "5%",
    marginTop: 30,
  },
  formInput: {
    width: 300,
  },

  formButton: {
    backgroundColor: "brown",
    width: 200,
  },

  formCheckbox: {
    margin: 10,
    backgroundColor: null,
    borderWidth: 0,
  },

  image: {
    marginTop: 40,
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
export default LoginScreen;
