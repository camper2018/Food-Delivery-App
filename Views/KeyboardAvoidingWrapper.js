import React from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";

const KeyboardAvoidingWrapper = (props) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      enabled
      keyboardVerticalOffset={Platform.select({ ios: 350, android: 78 })}
      style={{
        flex: 1,
        justifyContents: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <ScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          {props.children}
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
export default KeyboardAvoidingWrapper;
