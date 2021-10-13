import { SafeAreaProvider } from "react-native-safe-area-context";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import LoginScreen from "./components/LoginScreen";
import StartScreen from "./components/StartScreen";
import Constants from "expo-constants";
const StatusBarHeight = Constants.statusBarHeight;
export default function App() {
  const [hasStarted, setStarted] = useState(false);
  const startScreenHandler = () => {
    setStarted((state) => !state);
  };
  let currentScreen = hasStarted ? (
    <LoginScreen style={styles.container} />
  ) : (
    <StartScreen style={styles.container} onStart={startScreenHandler} />
  );
  return currentScreen;
}
const styles = StyleSheet.create({
  container: {
    padding: StatusBarHeight,
    flex: 1,
  },
});
