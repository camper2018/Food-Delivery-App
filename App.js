import { StatusBar } from "expo-status-bar";
import { Button } from "react-native-elements";
import { SafeAreaProvider } from "react-native-safe-area-context";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  SafeAreaView,
} from "react-native";
export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Food For Everyone</Text>
      <ImageBackground
        source={require("./images/food_for_everyone.jpeg")}
        style={styles.image}
        resizeMode="cover"
      ></ImageBackground>
      <View
        style={{
          alignItems: "center",
          justifyContent: "flex-end",
          border: "none",
        }}
      >
        <Button
          title="Get Started"
          accessibilityLabel="get started"
          buttonStyle={styles.button}
          containerStyle={styles.btnContainer}
          onClick={() => {}}
        />
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // will apply flex grow to the component to occupy entire main axis of the flexbox container.
    backgroundColor: "brown",
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  button: {
    backgroundColor: "white",
    marginVertical: 20,
    borderRadius: 100,
    padding: 15,
    backgroundColor: "green",
  },
  btnContainer: {
    width: 220,
  },
  heading: {
    fontSize: 35,
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    backgroundColor: "green",
    paddingVertical: 20,
    marginTop: 30,
  },
});
