import React, { useContext } from "react";
import { Text, StyleSheet, View } from "react-native";
import Firebase from "../config/firebase";
import { AuthenticatedUserContext } from "../Navigation/AuthenticatedUserProvider";
const auth = Firebase.auth();

const Home = (props) => {
  const { user } = useContext(AuthenticatedUserContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Delicious food for you</Text>
      <Text style={styles.title}>Welcome {user.email}!</Text>
      <Text style={styles.text}>Your UID is: {user.uid} </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "black",
  },
  text: {
    fontSize: 16,
    fontWeight: "normal",
    color: "black",
  },
});
export default Home;
