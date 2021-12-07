import React, { useContext, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  Alert,
  SafeAreaView,
} from "react-native";
import { Button } from "react-native-elements";
import Card from "./Views/Card";
import DishImage from "./DishImage";
import { Ionicons } from "@expo/vector-icons";
import { DishesContext } from "../HomeScreenContext";
import * as Animatable from "react-native-animatable";
const FoodDetail = ({ route, navigation }) => {
  const { favoriteDishes, setFavoriteDishes, dishes, cartItems, setCartItems } =
    useContext(DishesContext);

  const favoriteFound = favoriteDishes.find(
    (dish) => dish.id === route.params.foodItem.id
  );
  const iconName = favoriteFound ? "heart" : "heart-outline";
  const [favoritesIcon, setFavoritesIcon] = useState(iconName);

  const addItemInCart = (foodItem) => {
    const itemFound = cartItems.find(
      (item) => item.id === route.params.foodItem.id
    );
    if (itemFound) {
      console.log("itemFound: ", itemFound);
      itemFound.amount++;
      const updatedCart = cartItems.map((item) =>
        item.id === itemFound.id ? itemFound : item
      );

      setCartItems(updatedCart);
    } else {
      setCartItems([...cartItems, { ...route.params.foodItem, amount: 1 }]);
    }
    Alert.alert(`${foodItem.name} has been added to your shopping cart.`);
    navigation.goBack();
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <Animatable.View animation="zoomInUp">
          <Card style={styles.card}>
            <View style={styles.icons}>
              <Ionicons
                name="arrow-back"
                size={30}
                color="black"
                onPress={navigation.goBack}
              />
              <Ionicons
                name={favoritesIcon}
                size={30}
                color="red"
                onPress={(e) => {
                  setFavoritesIcon(() =>
                    favoritesIcon === "heart-outline"
                      ? "heart"
                      : "heart-outline"
                  );

                  if (favoritesIcon === "heart-outline") {
                    let wasFound = favoriteDishes.some(
                      (dish) => dish.id === route.params.foodItem.id
                    );
                    if (!wasFound) {
                      setFavoriteDishes([
                        ...favoriteDishes,
                        route.params.foodItem,
                      ]);
                    }
                  } else {
                    const updatedFavoriteDishes = favoriteDishes.filter(
                      (dish) => dish.id !== route.params.foodItem.id
                    );
                    setFavoriteDishes(updatedFavoriteDishes);
                  }
                }}
              />
            </View>

            <DishImage item={route.params.foodItem} />
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{route.params.name}</Text>
              <Text style={styles.price}>${route.params.foodItem.price}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.textHeading}>Description</Text>
              <Text style={styles.text}>
                {route.params.foodItem.description}
              </Text>
              <Text style={styles.textHeading}>Delivery info</Text>
              <Text style={styles.text}>
                {route.params.foodItem.deliveryInfo}
              </Text>
              <Text style={styles.textHeading}>Return policy</Text>
              <Text style={styles.text}>
                {route.params.foodItem.returnPolicy}
              </Text>
              <Button
                title="Add to cart"
                accessibilityLabel="Add to cart"
                buttonStyle={styles.button}
                onPress={() => {
                  addItemInCart(route.params.foodItem);
                }}
              />
            </View>
          </Card>
        </Animatable.View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  card: {
    width: "85%",
    alignSelf: "center",
    marginVertical: "10%",
    borderRadius: 40,
  },
  icons: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
    marginBottom: 0,
  },
  titleContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  title: {
    fontSize: 25,
    color: "black",
    marginTop: 10,
    fontWeight: "bold",
  },
  price: {
    color: "red",
  },
  textContainer: {
    marginHorizontal: 10,
  },
  textHeading: {
    fontWeight: "bold",
    paddingTop: 10,
    paddingBottom: 5,
  },
  text: {
    color: "grey",
  },
  button: {
    backgroundColor: "red",
    marginVertical: 25,
    borderRadius: 30,
    padding: 15,
  },
});
export default FoodDetail;
