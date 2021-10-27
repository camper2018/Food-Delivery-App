import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Input, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import KeyboardAvoidingWrapper from "./Views/KeyboardAvoidingWrapper";
import ErrorMessage from "./ErrorMessage";
import Firebase from "../config/firebase";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const auth = Firebase.auth();
// Login Component
const LoginTab = ({ navigation, route }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [rightIcon, setRightIcon] = useState("eye");
  const [loginError, setLoginError] = useState("");

  const handlePasswordVisibility = () => {
    if (rightIcon === "eye") {
      setRightIcon("eye-off");
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === "eye-off") {
      setRightIcon("eye");
      setPasswordVisibility(!passwordVisibility);
    }
  };
  const onLogin = async () => {
    try {
      if (email !== "" && password !== "") {
        await auth.signInWithEmailAndPassword(email, password);
      }
    } catch (error) {
      setLoginError(error.message);
    }
  };
  const handleForgotPassword = () => {};
  return (
    <KeyboardAvoidingWrapper>
      <View style={styles.form}>
        <Text style={styles.title}>Login</Text>
        <Input
          label="Email address"
          keyboardType="email-address"
          autoCapitalize="none"
          leftIcon={<Icon name="envelope" size={30} color="#3895D3" />}
          onChangeText={(email) => setEmail(email)}
          value={email}
          containerStyle={styles.formInput}
          autoFocus={true}
          autoCorrect={false}
        />
        <Input
          label="Password"
          min="8"
          leftIcon={<Icon name="lock" size={30} color="#3895D3" />}
          rightIcon={
            <TouchableOpacity onPress={handlePasswordVisibility}>
              <MaterialCommunityIcons name={rightIcon} size={30} color="grey" />
            </TouchableOpacity>
          }
          secureTextEntry={passwordVisibility}
          onChangeText={(pw) => setPassword(pw)}
          value={password}
          containerStyle={styles.formInput}
        />
        {loginError ? <ErrorMessage error={loginError} visible={true} /> : null}

        <Button
          onPress={onLogin}
          accessibilityLabel="login"
          title="Login"
          icon={<Icon name="sign-in" color="white" size={24} />}
          buttonStyle={styles.formButton}
        />
        <Button
          buttonStyle={{
            border: "none",
            backgroundColor: "transparent",
            color: "blue",
            padding: 15,
          }}
          titleStyle={{ color: "blue" }}
          onPress={() => navigation.navigate("Sign-up")}
          title="Don't have an account? Sign Up"
        />
        <Button
          title="Forgot Password?"
          onPress={handleForgotPassword}
          titleStyle={{
            color: "magenta",
          }}
          type="clear"
        />
      </View>
    </KeyboardAvoidingWrapper>
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
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#fff",
    alignSelf: "center",
    paddingBottom: 24,
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
});
export default LoginTab;
