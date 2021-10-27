import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Input, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import KeyboardAvoidingWrapper from "../components/Views/KeyboardAvoidingWrapper";
import ErrorMessage from "../components/ErrorMessage";
import Firebase from "../config/firebase";

const ForgotPassword = (props) => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [rightIcon, setRightIcon] = useState("eye");
  const [signupError, setSignupError] = useState("");
  const handlePasswordVisibility = () => {
    if (rightIcon === "eye") {
      setRightIcon("eye-off");
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === "eye-off") {
      setRightIcon("eye");
      setPasswordVisibility(!passwordVisibility);
    }
  };
  const handleSignup = async () => {
    try {
      if (email !== "" && password !== "" && password === confirmPassword) {
        await auth.createUserWithEmailAndPassword(email, password);
      } else if (password !== confirmPassword) {
        setSignupError("Passwords doesn't match!");
      }
    } catch (error) {
      setSignupError(error.message);
    }
  };
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Text>Reset Password</Text>

      <Input
        label="Email address"
        keyboardType="email-address"
        autoCapitalize="none"
        leftIcon={<Icon name="envelope" size={30} color="#3895D3" />}
        autoFocus={true}
        // value={email}
        // onChangeText={(text) => setEmail(text)}
        containerStyle={styles.formInput}
      />
      <Input
        label="Password"
        secureTextEntry={passwordVisibility}
        min="8"
        leftIcon={<Icon name="lock" size={30} color="#3895D3" />}
        rightIcon={
          <TouchableOpacity onPress={handlePasswordVisibility}>
            <MaterialCommunityIcons name={rightIcon} size={30} color="grey" />
          </TouchableOpacity>
        }
        // onChangeText={(password) => setPassword(password)}
        // value={password}
        containerStyle={styles.formInput}
      />
      <Input
        label="Confirm password"
        secureTextEntry={passwordVisibility}
        min="8"
        leftIcon={<Icon name="lock" size={30} color="#3895D3" />}
        rightIcon={
          <TouchableOpacity onPress={handlePasswordVisibility}>
            <MaterialCommunityIcons name={rightIcon} size={30} color="grey" />
          </TouchableOpacity>
        }
        // onChangeText={(password) => setConfirmPassword(password)}
        // value={confirmPassword}
        containerStyle={styles.formInput}
        handlePasswordVisibility={handlePasswordVisibility}
      />
      {signupError ? <ErrorMessage error={signupError} visible={true} /> : null}
      <Button
        // onPress={handleSignup}
        title="Sign-up"
        icon={<Icon name="user-plus" color="white" size={20} />}
        buttonStyle={styles.formButton}
        onPress={props.onReset((state) => !state)}
      />
    </View>
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
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#fff",
    alignSelf: "center",
    paddingBottom: 24,
  },
  formInput: {
    width: 300,
  },

  formButton: {
    backgroundColor: "brown",
    width: 200,
  },
});

export default ForgotPassword;
