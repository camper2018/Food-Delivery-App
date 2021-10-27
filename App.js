import React from "react";
import { StyleSheet } from "react-native";
import StartScreen from "./screens/StartScreen";
import Constants from "expo-constants";
const StatusBarHeight = Constants.statusBarHeight;

export default function App() {
  return <StartScreen style={styles.container} />;
}
const styles = StyleSheet.create({
  container: {
    padding: StatusBarHeight,
    flex: 1,
  },
});
