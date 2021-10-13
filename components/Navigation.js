import React from "react";
// import { View, Text, Platform, Image, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
// import { NavigationContainer } from "@react-navigation/native";
// import {
//   createDrawerNavigator,
//   DrawerItemList,
//   DrawerContentScrollView,
// } from "@react-navigation/drawer";
import { Icon } from "react-native-elements";
import StartScreen from "./StartScreen";
// const CustomDrawerComponent = (props) => {
//   return (
//     <DrawerContentScrollView>
//       <View style={styles.drawerHeader}>
//         <View style={{ flex: 1 }}>
//           <Image
//             source={require("../assets/grocery-icon.png")}
//             style={styles.drawerImage}
//           />
//         </View>
//         <View style={{ flex: 2 }}>
//           <Text style={styles.drawerHeaderText}>Grocery Helper</Text>
//         </View>
//       </View>
//       <DrawerItemList {...props} />
//     </DrawerContentScrollView>
//   );
// };

// Using Stack Navigator
const StartScreenNavigator = createStackNavigator();
const StartScreenStack = ({ navigation }) => {
  return (
    <StartScreenNavigator.Navigator
      initialRouteName="Start Screen"
      screenOptions={{
        fontFamily: "ChalkboardSE-Light",
      }}
    >
      <StartScreenNavigator.Screen
        name="Start Screen"
        component={StartScreen}
      />
    </StartScreenNavigator.Navigator>
  );
};
const MainDra
const Main = (props) => {
  return (
    <NavigationContainer>
      <MainDrawerScreen/>
    </NavigationContainer>
  )
}
export default Main;