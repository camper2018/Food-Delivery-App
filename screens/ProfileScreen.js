import React, { useState, useContext, useEffect } from "react";
import { Icon } from "react-native-elements";
import {
  SafeAreaView,
  StyleSheet,
  View,
  FlatList,
  Animated,
  TouchableOpacity,
  Alert,
  Text,
  Button,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import EditProfile from "../components/EditProfile";
import Profile from "../components/Profile";
import DrawerMenu from "../components/Views/hamburger";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const Stack = createStackNavigator();
const ProfileScreen = ({ navigation, route }) => {
  return (
    <Stack.Navigator
      initialRoute="Profile"
      screenOptions={
        {
          // headerShown: route.name === "Home" ? false : true,
          //   backgroundColor: "#fff",
          //   shadowColor: "#fff", // works only for ios
          //   elevation: 0, // works for android
          // },
          // headerTintColor: "#000",
          // headerTitleStyle: {
          //   fontWeight: "bold",
          // },
        }
      }
    >
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={({ navigation, route }) => ({
          title: "My Profile",
          headerTintColor: "white",
          headerTitleAlign: "center",
          headerTintColor: "white",
          headerStyle: { backgroundColor: "brown" },
          headerLeft: () => <DrawerMenu />,
          headerRight: () => (
            <MaterialCommunityIcons
              style={{ marginRight: 10 }}
              name="circle-edit-outline"
              size={30}
              color="white"
              onPress={() => {
                navigation.navigate("Edit Profile");
              }}
            />
          ),
          // headerStyle: {
          // headerShown: false,
          // headerLeft: () => <DrawerMenu />,
        })}
      />
      <Stack.Screen
        name="Edit Profile"
        component={EditProfile}
        options={{ title: "", headerTintColor: "tomato" }}
        // options={{ headerShown: false }}
        // options={({ route, navigation }) => ({
        //   title: "Edit Profile",
        //   headerLeft: () => (
        //     <Button
        //       title="Go Back"
        //       onPress={() => {
        //         navigation.navigate("Profile");
        //       }}
        //     />
        //   ),
        // })}
        // options={{
        //   headerShown: false,
        // }}
      />
    </Stack.Navigator>
  );
};
export default ProfileScreen;
