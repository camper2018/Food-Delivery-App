import React, { useContext, useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";

import Card from "./Views/Card";
import { useNavigation } from "@react-navigation/native";
const Dish = (props) => {
  const navigation = useNavigation();
  const [selectedItem, setSelectedItem] = useState({});

  useEffect(() => {
    setSelectedItem(props.item);
  }, [props.item]);

  return Platform.OS === "ios" ? (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Food Detail", {
          name: selectedItem.name,
          foodItem: selectedItem,
        })
      }
    >
      <Card
        style={{
          width: 220,
          height: 230,
          borderRadius: 20,
          margin: 30,
          marginTop: -100,
          alignItems: "center",
          justifyContent: "center",
          marginLeft: 20,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            marginTop: 60,
            textAlign: "center",
          }}
        >
          {props.item.name}
        </Text>
        <Text
          style={{
            color: "tomato",
            fontWeight: "bold",
            fontSize: 16,
            marginTop: 15,
          }}
        >
          ${props.item.price}
        </Text>
      </Card>
    </TouchableOpacity>
  ) : (
    <TouchableNativeFeedback
      onPress={() =>
        navigation.navigate("Food Detail", {
          name: selectedItem.name,
          foodItem: selectedItem,
        })
      }
      // background={TouchableNativeFeedback.Ripple("#FFFFFF", true)}
    >
      <View>
        <Card
          style={{
            width: 220,
            height: 230,
            borderRadius: 20,
            margin: 30,
            marginTop: -100,
            alignItems: "center",
            justifyContent: "center",
            marginLeft: 20,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginTop: 60,
              textAlign: "center",
            }}
          >
            {props.item.name}
          </Text>
          <Text
            style={{
              color: "tomato",
              fontWeight: "bold",
              fontSize: 16,
              marginTop: 15,
            }}
          >
            ${props.item.price}
          </Text>
        </Card>
      </View>
    </TouchableNativeFeedback>
  );
};
export default Dish;
