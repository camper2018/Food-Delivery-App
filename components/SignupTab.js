import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Input, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import KeyboardAvoidingWrapper from "./Views/KeyboardAvoidingWrapper";
import ErrorMessage from "./ErrorMessage";
import Firebase from "../config/firebase";

const auth = Firebase.auth();

const SignupTab = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState("eye-off");
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
      if (
        username !== "" &&
        email !== "" &&
        password !== "" &&
        password === confirmPassword
      ) {
        await auth
          .createUserWithEmailAndPassword(email, password)
          .then(() => {
            auth.currentUser
              .updateProfile({
                displayName: username,
              })
              .catch((error) => {
                console.error(error);
              });
            navigation.navigate("Login");
          })
          .catch((error) => console.error(error));
      } else if (password !== confirmPassword) {
        setSignupError("Passwords doesn't match!");
      }
    } catch (error) {
      setSignupError(error.message);
    }
  };

  return (
    <KeyboardAvoidingWrapper>
      <View style={styles.form}>
        <Text style={styles.title}>Create an account</Text>
        <Input
          label="Username"
          leftIcon={<Icon name="user" size={30} color="#3895D3" />}
          autoFocus={true}
          value={username}
          onChangeText={(text) => setUsername(text)}
          containerStyle={styles.formInput}
        />
        <Input
          label="Email address"
          keyboardType="email-address"
          autoCapitalize="none"
          leftIcon={<Icon name="envelope" size={30} color="#3895D3" />}
          autoFocus={true}
          value={email}
          onChangeText={(text) => setEmail(text)}
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
          onChangeText={(password) => setPassword(password)}
          value={password}
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
          onChangeText={(password) => setConfirmPassword(password)}
          value={confirmPassword}
          containerStyle={styles.formInput}
          handlePasswordVisibility={handlePasswordVisibility}
        />
        {signupError ? (
          <ErrorMessage error={signupError} visible={true} />
        ) : null}
        <Button
          onPress={handleSignup}
          title="Sign-up"
          icon={<Icon name="user-plus" color="white" size={20} />}
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
          title="Have an account?"
          onPress={() => navigation.navigate("Login")}
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

export default SignupTab;
