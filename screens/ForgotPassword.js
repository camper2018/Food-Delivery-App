import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Input, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import ErrorMessage from "../components/ErrorMessage";
import Firebase from "../config/firebase";
const auth = Firebase.auth();

const ForgotPassword = (props) => {
  const [email, setEmail] = useState("");
  const [resetError, setResetError] = useState("");

  const handleReset = async () => {
    try {
      await auth.sendPasswordResetEmail(email);
      props.handlePasswordReset();
    } catch (error) {
      setResetError(error.message);
    }
  };
  return (
    <View style={styles.form}>
      <Text style={styles.title}>Reset Password</Text>
      <Input
        label="Email address"
        keyboardType="email-address"
        autoCapitalize="none"
        leftIcon={<Icon name="envelope" size={30} color="#3895D3" />}
        value={email}
        onChangeText={(text) => setEmail(text)}
        containerStyle={styles.formInput}
      />

      {resetError ? <ErrorMessage error={resetError} visible={true} /> : null}
      <Button
        onPress={handleReset}
        title="Send Email"
        buttonStyle={styles.formButton}
      />
      <Button
        onPress={() => props.handlePasswordReset()}
        title="Cancel"
        buttonStyle={{ ...styles.formButton, backgroundColor: "grey" }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: "5%",
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "magenta",
    alignSelf: "center",
    paddingBottom: 100,
  },
  formInput: {
    width: 300,
  },

  formButton: {
    backgroundColor: "brown",
    width: "90%",
    margin: "5%",
    padding: 10,
  },
});

export default ForgotPassword;
