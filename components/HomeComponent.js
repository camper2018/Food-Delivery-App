import React, { useState, useContext, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import Firebase from "../config/firebase";
import { AuthenticatedUserContext } from "../Navigation/AuthenticatedUserProvider";
import SearchComponent from "./SearchComponent";
import Categories from "./Categories";
import Dishes from "./Dishes";
import { DishesContext } from "../HomeScreenContext";
import { StatusBar } from "expo-status-bar";

const auth = Firebase.auth();

const Home = (props) => {
  const { user } = useContext(AuthenticatedUserContext);
  const [selectedCategory, setSelectedCategory] = useState("Foods");
  const { dishes, setDishes } = useContext(DishesContext);
  let selectedDishes = dishes.filter(
    (dish) => dish.category === selectedCategory
  );
  const [data, setData] = useState(selectedDishes);

  return (
    <ScrollView>
      <StatusBar style="dark" backgroundColor="brown" />
      <Text style={styles.user}>{user.displayName}</Text>
      <View style={styles.container}>
        <Text style={styles.title}>Delicious</Text>
        <Text style={styles.title}>food for you</Text>
        <SearchComponent navigation={props.navigation} route={props.route} />
      </View>
      {dishes.length ? (
        <>
          <Categories
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            setData={setData}
            data={data}
          />
          <Dishes dishes={data} />
        </>
      ) : (
        <ActivityIndicator />
      )}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 28,
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
