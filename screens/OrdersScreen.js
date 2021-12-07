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
} from "react-native";
import { ListItem, Avatar, Button } from "react-native-elements";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { DishesContext } from "../HomeScreenContext";
import Card from "../components/Views/Card";
import * as Aminatable from "react-native-animatable";
import { Ionicons } from "@expo/vector-icons";
import PlusMinusButton from "../components/Views/Plus-minusButton";

const ShoppingCart = ({ navigation, route }) => {
  const { favoriteDishes, setFavoriteDishes, cartItems, setCartItems } =
    useContext(DishesContext);
  const [myCart, setCart] = useState([]);
  // console.log("cartItems: ", cartItems);
  const createFavoritesIcon = (item) => {
    const favoriteFound = favoriteDishes.find((dish) => dish.id === item.id);
    const iconName = favoriteFound ? "heart" : "heart-outline";
    return iconName;
  };
  const [favoritesIcon, setFavoritesIcon] = useState(
    createFavoritesIcon("heart-outline")
  );
  // const [favoritesIcon, setFavoritesIcon] = useState("heart-outline");

  useEffect(() => {
    setCart(cartItems);
  }, [cartItems]);

  const deleteCartItem = (item) => {
    const updatedCartItems = cartItems.filter((itm) => itm.id !== item.id);
    setCartItems(updatedCartItems);
  };

  const handleDelete = (item) => {
    Alert.alert(
      "Delete Item?",
      "Are you sure you wish to delete the item " +
        item.name +
        " from the cart?",
      [
        {
          text: "Cancel",
          onPress: () => console.log(item.name + " Not Deleted"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => deleteCartItem(item),
        },
      ],
      {
        cancelable: false,
      }
    );
  };

  const renderCartItem = ({ item, index }) => {
    const { navigate } = navigation;
    const RightActions = ({ progress, dragX, onDelete, onAdd }) => {
      const scale = dragX.interpolate({
        inputRange: [-100, 30],
        outputRange: [0.9, 0],
      });

      return (
        <>
          <View
            style={{
              backgroundColor: "transparent",
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: 10,
              flexDirection: "row",
            }}
          >
            <Icon
              name={createFavoritesIcon(item)}
              color="red"
              type="ionicon"
              reverse
              onPress={(e) => {
                // setFavoritesIcon(createFavoritesIcon(item));
                if (favoritesIcon === "heart-outline") {
                  let wasFound = favoriteDishes.some(
                    (dish) => dish.id === item.id
                  );
                  if (!wasFound) {
                    Alert.alert(`${item.name} added to your favorites!`);
                    setFavoriteDishes([...favoriteDishes, item]);
                    setFavoritesIcon("heart");
                  } else {
                    Alert.alert(`${item.name} is already in your favorites!`);
                    setFavoritesIcon("heart");
                    setFavoriteDishes([...favoriteDishes, item]);
                  }
                } else {
                  const updatedFavoriteDishes = favoriteDishes.filter(
                    (dish) => dish.id !== item.id
                  );
                  Alert.alert(`${item.name} removed from your favorites!.`);
                  setFavoriteDishes(updatedFavoriteDishes);
                  setFavoritesIcon("heart-outline");
                }
              }}
            />
            <Icon
              name="trash"
              color="red"
              type="ionicon"
              reverse
              onPress={onDelete}
            />
          </View>
        </>
      );
    };

    return (
      // <View>
      // <Card style={{ borderRadius: 30, margin: 15, padding: 0 }}>
      <Swipeable
        containerStyle={{
          shadowColor: "black",
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 6,
          shadowOpacity: 0.26,
          elevation: 8,
        }}
        renderRightActions={(progress, dragX) => {
          return (
            <RightActions
              progress={progress}
              dragX={dragX}
              onDelete={() => handleDelete(item)}
            />
          );
        }}
        autoClose={true}
      >
        <Aminatable.View animation="fadeInRightBig" duration={2000}>
          <ListItem
            containerStyle={{ borderRadius: 28, margin: 15 }}
            key={index}
            // bottomDivider
            // style={{ justifyContent: "center" }}
            // onPress={() => navigate("Food Detail", { foodItem: item })}
          >
            <Avatar
              title={item.name}
              source={item.imageSrc}
              rounded={true}
              size={80}
            />
            <ListItem.Content>
              <ListItem.Title
                style={{
                  fontWeight: "700",
                  fontSize: 20,
                  marginBottom: 10,
                }}
              >
                {item.name}
              </ListItem.Title>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <ListItem.Subtitle style={{ color: "red", fontWeight: "bold" }}>
                  {/* ${item.price} */}${(item.amount * item.price).toFixed(2)}
                </ListItem.Subtitle>
                <ListItem.Subtitle style={{ color: "red", marginLeft: 30 }}>
                  <PlusMinusButton
                    item={item}
                    index={index}
                    cartItems={myCart}
                    setCartItems={setCart}

                    // cartItems={cartItems}
                    // setCartItems={setCartItems}
                  />
                </ListItem.Subtitle>
              </View>
            </ListItem.Content>
          </ListItem>
        </Aminatable.View>
      </Swipeable>
    );
  };
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <View style={{ marginTop: 10, marginLeft: 10 }}>
        <Ionicons
          name="arrow-back"
          size={30}
          color="black"
          onPress={navigation.goBack}
        />
      </View>
      <Text style={{ alignSelf: "center", marginVertical: 10 }}>
        {" "}
        👈 swipe left on an item to delete
        {/* 👇 swipe left on an item to delete */}
      </Text>
      <FlatList
        data={cartItems}
        // data={myCart}
        renderItem={renderCartItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <Button
        title="Checkout"
        accessibilityLabel="Checkout"
        buttonStyle={styles.button}
        onPress={() => {
          navigation.navigate("Checkout");
        }}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  button: {
    backgroundColor: "red",
    marginVertical: 25,
    borderRadius: 30,
    padding: 15,
    width: "60%",
    alignSelf: "center",
  },
});
export default ShoppingCart;
