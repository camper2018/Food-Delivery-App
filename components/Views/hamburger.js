import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import { useNavigation } from "@react-navigation/native";
const HamburgerIcon = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{
        width: 24,
        height: 24,
        marginLeft: 25,
      }}
      onPress={() => {
        navigation.openDrawer();
      }}
    >
      <Icon name="menu" size={22} color="white" />
    </TouchableOpacity>
  );
};

export default HamburgerIcon;
