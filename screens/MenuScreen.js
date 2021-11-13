// import React, { useContext } from "react";
// import { View } from "react-native";
// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
// import MenuComponent from "../components/Dishes";
// import FoodDetailComponent from "../components/FoodDetail";

// const StackNavigator = createStackNavigator();
// const MenuStackScreen = ({ navigation, route }) => {
//   return (
//     <StackNavigator.Navigator
//     // screenOptions={{
//     //   headerStyle: { backgroundColor: "black" },
//     //   // headerTintColor: "#fff",
//     //   headerTitleStyle: { color: "green" },
//     //   headerShown: true,
//     //   headerTitleText: route.params.name,
//     // }}
//     >
//       <StackNavigator.Screen
//         name="Menu"
//         component={MenuComponent}
//         // options={{
//         //   title: "Menu",
//         // }}
//       />
//     </StackNavigator.Navigator>
//   );
// };
// const FoodDetailStackScreen = ({ navigation, route }) => {
//   return (
//     <StackNavigator.Navigator
//     // screenOptions={{
//     //   headerText: route.params.name,
//     //   headerStyle: { backgroundColor: "#512DA8" },
//     //   // headerTintColor: "#fff",
//     //   headerTitleStyle: { color: "green" },
//     //   headerShown: true,
//     // }}
//     >
//       <StackNavigator.Screen
//         name="Food Detail"
//         component={FoodDetailComponent}
//         options={({ route }) => ({ title: route.params.name })}
//         // options={{
//         //   title: route.params.name,
//         // }}
//       />
//     </StackNavigator.Navigator>
//   );
// };
// const FoodDetailScreen = ({ navigation, route }) => {
//   return (
//     <StackNavigator.Navigator
//       // screenOptions={
//       //   {
//       //     // headerStyle: { backgroundColor: "#512DA8" },
//       //     // headerTintColor: "#fff",
//       //     // headerTitleStyle: { color: "#fff" },
//       //   }
//       // }
//       screenOptions={({ route }) => ({
//         // headerShown: () => {
//         //   if (route.name === "Food Menu") {
//         //     return true;
//         //   }
//         //   if (route.name === "Food Detail") {
//         //     return false;
//         //   }
//         // },
//       })}
//     >
//       <StackNavigator.Screen
//         name="Menu"
//         component={MenuStackScreen}
//         options={
//           {
//             // title: "Menu",
//             // headerShown: true,
//           }
//         }
//       />
//       <StackNavigator.Screen
//         name="Food Detail"
//         // name={route.params.name}
//         component={FoodDetailStackScreen}
//         options={({ route }) => ({ title: route.params.name })}
//       />
//     </StackNavigator.Navigator>
//   );
// };
// // const MenuScreen = ({ route, navigation }) => {
// //   return (
// //     <MenuScreen.Navigator screenOptions={({ route }) => ({})}>
// //       <FoodDetailScreen />
// //     </MenuScreen.Navigator>
// //   );
// // };
// // const MenuScreen = ({ route, navigation }) => {
// //   return (
// //     <MenuScreen.Navigator screenOptions={({ route }) => ({})}>
// //       <MenuScreen.Screen name={MenuStackScreen} />
// //       <MenuScreen.Screen name={FoodDetailScreen} />
// //     </MenuScreen.Navigator>
// //   );
// // };
// export default FoodDetailScreen;
