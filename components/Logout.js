import React, { useContext } from "react";
import { View } from "react-native";
import { Button } from "react-native-elements";
import IconButton from "./Views/IconButton";
import Firebase from "../config/firebase";
import { DishesContext } from "../HomeScreenContext";
const auth = Firebase.auth();

const Logout = (props) => {
  const { setFavoriteDishes, setCartItems } = useContext(DishesContext);
  const handleSignOut = async () => {
    try {
      await auth.signOut();
      setFavoriteDishes([]);
      setCartItems([]);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={{ marginTop: "70%", marginRight: 10 }}>
      <Button
        title="Logout"
        buttonStyle={{
          marginLeft: 10,
          fontSize: 10,
          backgroundColor: "brown",
        }}
        icon={<IconButton name="logout" size={24} color="white" />}
        onPress={handleSignOut}
      />
    </View>
  );
};

export default Logout;
