import React, { useContext } from "react";
import { Icon } from "react-native-elements";
import {
  SafeAreaView,
  StyleSheet,
  View,
  FlatList,
  Alert,
  Text,
} from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { DishesContext } from "../HomeScreenContext";
import * as Aminatable from "react-native-animatable";

const Favorites = (props) => {
  const { favoriteDishes, setFavoriteDishes } = useContext(DishesContext);
  const refsArray = [];

  const deleteFavorite = (item) => {
    const updatedFavorites = favoriteDishes.filter(
      (dish) => dish.id !== item.id
    );
    setFavoriteDishes(updatedFavorites);
  };
  const handleDelete = (item) => {
    Alert.alert(
      "Delete List?",
      "Are you sure you wish to delete " + item.name + " from your favorites?",
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
    const RightActions = ({ progress, dragX, onDelete }) => {
      return (
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
      );
    };

    return (
      <Aminatable.View animation="fadeInRightBig" duration={2000}>
        <View
          style={{
            marginHorizontal: 20,
            marginVertical: 10,
            shadowColor: "black",
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 6,
            shadowOpacity: 0.26,
            elevation: 8,
          }}
        >
          <Swipeable
            containerStyle={{
              borderRadius: 20,
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
            ref={(ref) => {
              refsArray[item.id] = ref;
            }}
          >
            <ListItem
              key={item.id}
              style={{
                justifyContent: "center",
              }}
              onPress={() => navigate("Food Detail", { foodItem: item })}
            >
              <Avatar
                title={item.name}
                source={{ uri: item.imageSrc }}
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
          </Swipeable>
        </View>
      </Aminatable.View>
    );
  };
  if (favoriteDishes.length) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
        <Text
          style={{
            alignSelf: "center",
            fontSize: 25,
            fontWeight: "bold",
            padding: 20,
            color: "tomato",
            marginTop: 20,
          }}
        >
          My Favorites
        </Text>
        <Text style={{ alignSelf: "center", marginVertical: 10 }}>
          swipe 👈 on an item to delete
        </Text>
        <FlatList
          data={favoriteDishes}
          renderItem={renderMenuItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 20 }}>You have no favorites yet!</Text>
      </SafeAreaView>
    );
  }
};
const styles = StyleSheet.create({});
export default Favorites;
