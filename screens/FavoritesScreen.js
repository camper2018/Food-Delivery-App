import React, { useState, useContext } from "react";
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
import { ListItem, Avatar } from "react-native-elements";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { DishesContext } from "../HomeScreenContext";
import Card from "../components/Views/Card";
import * as Aminatable from "react-native-animatable";

const Favorites = (props) => {
  const { favoriteDishes, setFavoriteDishes } = useContext(DishesContext);
  console.log("favoriteDishes: ", favoriteDishes);
  const deleteFavorite = (item) => {
    const updatedFavorites = favoriteDishes.filter(
      (dish) => dish.id !== item.id
    );
    setFavoriteDishes(updatedFavorites);
  };
  const handleDelete = (item) => {
    Alert.alert(
      "Delete List?",
      "Are you sure you wish to delete the list " + item.name + "?",
      [
        {
          text: "Cancel",
          onPress: () => console.log(item.name + " Not Deleted"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => deleteFavorite(item),
        },
      ],
      {
        cancelable: false,
      }
    );
  };
  const renderMenuItem = ({ item, index }) => {
    const { navigate } = props.navigation;
    const RightActions = ({ progress, dragX, onDelete, onAdd }) => {
      const scale = dragX.interpolate({
        inputRange: [-100, 30],
        outputRange: [0.9, 0],
      });

      return (
        <>
          <View
            style={{
              backgroundColor: "white",
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: 10,
            }}
          >
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
    // const rightButtons = [
    //   {
    //     text: "Delete",
    //     type: "delete",
    //     onPress: () => {
    //       Alert.alert(
    //         "Delete Favorite?",
    //         "Are you sure you wish to delete the favorite dish " +
    //           item.name +
    //           "?",
    //         [
    //           {
    //             text: "Cancel",
    //             onPress: () => console.log(item.name + " Not Deleted"),
    //             style: "cancel",
    //           },
    //           {
    //             text: "OK",
    //             onPress: () => deleteFavorite(item.id),
    //           },
    //         ],
    //         {
    //           cancelable: false,
    //         }
    //       );
    //     },
    //   },
    // ];
    return (
      <View>
        <Swipeable
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
              key={index}
              bottomDivider
              style={{ justifyContent: "center" }}
              onPress={() => navigate("Food Detail", { foodItem: item })}
            >
              <Avatar
                title={item.name}
                source={item.imageSrc}
                rounded={true}
                size={60}
              />
              <ListItem.Content>
                <ListItem.Title
                  style={{
                    paddingTop: 15,
                    fontWeight: "700",
                    fontSize: 20,
                  }}
                >
                  {item.name}
                </ListItem.Title>
                <ListItem.Subtitle>{item.detail}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          </Aminatable.View>
        </Swipeable>
      </View>
    );
  };
  if (favoriteDishes.length) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <FlatList
          data={favoriteDishes}
          renderItem={renderMenuItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  } else {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 20 }}>You have no favorites yet!</Text>
      </View>
    );
  }
};
const styles = StyleSheet.create({});
export default Favorites;
