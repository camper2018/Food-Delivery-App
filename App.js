import React from "react";
import { StyleSheet } from "react-native";
import StartScreen from "./screens/StartScreen";
import Constants from "expo-constants";
import { LogBox } from "react-native";
const StatusBarHeight = Constants.statusBarHeight;

export default function App() {
  LogBox.ignoreAllLogs();
  return <StartScreen style={styles.container} />;
}
const styles = StyleSheet.create({
  container: {
    padding: StatusBarHeight,
    flex: 1,
  },
});
