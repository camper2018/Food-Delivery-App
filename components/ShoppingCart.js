import React, { useState, useContext, useEffect } from "react";
import { Icon } from "react-native-elements";
import {
  SafeAreaView,
  StyleSheet,
  View,
  FlatList,
  Alert,
  Text,
  Animated,
} from "react-native";
import { ListItem, Avatar, Button } from "react-native-elements";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { DishesContext } from "../HomeScreenContext";
import * as Aminatable from "react-native-animatable";
import { Ionicons } from "@expo/vector-icons";
import PlusMinusButton from "./Views/Plus-minusButton";

const ShoppingCart = ({ navigation, route }) => {
  const { favoriteDishes, setFavoriteDishes, cartItems, setCartItems } =
    useContext(DishesContext);
  const [myCart, setCart] = useState([]);
  const refsArray = [];
  const [favorites, setFavorites] = useState(favoriteDishes);

  const createFavoritesIcon = (item) => {
    // find if item is in the favorites and render heart icon accordingly
    const favoriteFound = favorites.find((dish) => dish.id === item.id);
    const iconName = favoriteFound ? "heart" : "heart-outline";
    return iconName;
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setCart(cartItems);
      setFavorites([...favoriteDishes]);
    });
    return () => {
      unsubscribe();
    };
  }, [navigation, favoriteDishes, cartItems]);

  const deleteCartItem = (item) => {
    refsArray[item.id].close();
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
          onPress: () => {
            console.log(item.name + " Not Deleted");
            refsArray[item.id].close();
          },
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
    const RightActions = ({ progress, dragX, onDelete, item }) => {
      const scale = dragX.interpolate({
        inputRange: [-100, 70],
        outputRange: [0.9, 0],
      });

      return (
        <>
          <Animated.View
            style={{
              backgroundColor: "transparent",
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: 10,
              flexDirection: "row",
              transform: [{ scale }],
            }}
          >
            <Icon
              name={createFavoritesIcon(item)}
              color="red"
              type="ionicon"
              reverse
              onPress={(e) => {
                let icon = createFavoritesIcon(item);
                if (icon === "heart-outline") {
                  setFavoriteDishes([...favorites, item]);
                  setFavorites([...favorites, item]);
                  Alert.alert(`${item.name} added to your favorites!`);
                } else {
                  const updatedFavoriteDishes = favorites.filter(
                    (dish) => dish.id !== item.id
                  );

                  setFavoriteDishes(updatedFavoriteDishes);
                  setFavorites(updatedFavoriteDishes);

                  Alert.alert(`${item.name} removed from your favorites!.`);
                }
                refsArray[item.id].close();
              }}
            />
            <Icon
              name="trash"
              color="red"
              type="ionicon"
              reverse
              onPress={onDelete}
            />
          </Animated.View>
        </>
      );
    };

    return (
      <Swipeable
        containerStyle={{
          shadowColor: "black",
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 6,
          shadowOpacity: 0.26,
          elevation: 8,
        }}
        ref={(ref) => {
          refsArray[item.id] = ref;
        }}
        renderRightActions={(progress, dragX) => {
          return (
            <RightActions
              progress={progress}
              dragX={dragX}
              onDelete={() => handleDelete(item)}
              item={item}
            />
          );
        }}
        autoClose={true}
      >
        <Aminatable.View animation="fadeInRightBig" duration={2000}>
          <ListItem
            containerStyle={{ borderRadius: 28, margin: 15 }}
            key={item.id}
          >
            <Avatar
              title={item.name}
              source={{ uri: item.imageSrc }}
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
                  ${(item.amount * item.price).toFixed(2)}
                </ListItem.Subtitle>
                <ListItem.Subtitle style={{ color: "red", marginLeft: 30 }}>
                  <PlusMinusButton
                    item={item}
                    index={index}
                    cartItems={myCart}
                    setCartItems={setCart}
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
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 30,
        }}
      >
        <Ionicons
          name="arrow-back"
          size={30}
          color="black"
          onPress={navigation.goBack}
          style={{ marginTop: 40, marginLeft: 20 }}
        />
        <Text
          style={{
            marginTop: 40,
            fontWeight: "bold",
            fontSize: 25,
            marginRight: "45%",
          }}
        >
          Cart
        </Text>
      </View>
      <Text style={{ alignSelf: "center", marginVertical: 10 }}>
        swipe ???? on an item to delete
      </Text>
      <FlatList
        data={cartItems}
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
