import React, { useState, useContext } from "react";
import { Text, StyleSheet, View } from "react-native";
import Firebase from "../config/firebase";
import { AuthenticatedUserContext } from "../Navigation/AuthenticatedUserProvider";
import SearchComponent from "./SearchComponent";
import Categories from "./Categories";
import Dishes from "./Dishes";

// import Menu from "../screens/MenuScreen";
const auth = Firebase.auth();

const Home = (props) => {
  const { user } = useContext(AuthenticatedUserContext);
  const [selectedCategory, setSelectedCategory] = useState("Foods");
  return (
    <View>
      <Text style={styles.user}>{user.email}</Text>
      <View style={styles.container}>
        <Text style={styles.title}>Delicious</Text>
        <Text style={styles.title}>food for you</Text>
        <SearchComponent />
        {/* <Text style={styles.text}>Your UID is: {user.uid} </Text> */}
      </View>
      <Categories
        selectedCategory={selectedCategory}
        onPress={setSelectedCategory}
      />
      <Dishes />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingTop: 25,
    paddingHorizontal: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "green",
  },
  text: {
    fontSize: 16,
    fontWeight: "normal",
    color: "black",
  },
  user: {
    color: "brown",
    flexDirection: "row",
    alignSelf: "flex-end",
    fontSize: 16,
    marginRight: 5,
    marginTop: 5,
  },
});
export default Home;
