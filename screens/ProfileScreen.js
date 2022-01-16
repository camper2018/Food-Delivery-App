import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import EditProfile from "../components/EditProfile";
import Profile from "../components/Profile";
import DrawerMenu from "../components/Views/hamburger";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const Stack = createStackNavigator();
const ProfileScreen = ({ navigation, route }) => {
  return (
    <Stack.Navigator
      screenOptions={
        {
          // unmountOnBlur: true,
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
          unmountOnBlur: true,
        })}
      />
      <Stack.Screen
        name="Edit Profile"
        component={EditProfile}
        options={{ title: "", headerTintColor: "tomato", unmountOnBlur: true }}
      />
    </Stack.Navigator>
  );
};
export default ProfileScreen;
