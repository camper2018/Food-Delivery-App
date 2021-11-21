import React from "react";
import { View, Text, Pressable } from "react-native";
const RadioButton = (props) => {
  return (
    // <View
    <Pressable
      onPress={props.onPress}
      style={[
        {
          height: 24,
          width: 24,
          borderRadius: 12,
          borderWidth: 2,
          borderColor: "tomato",
          alignItems: "center",
          justifyContent: "center",
        },
        props.style,
      ]}
    >
      {props.selected ? (
        <View
          style={{
            height: 12,
            width: 12,
            borderRadius: 6,
            backgroundColor: "tomato",
          }}
        />
      ) : null}
      {/* </View> */}
    </Pressable>
  );
};
export default RadioButton;
