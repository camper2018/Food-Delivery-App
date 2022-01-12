import React, { useContext, useState } from "react";
import {
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";
import Card from "./Views/Card";

import { Ionicons } from "@expo/vector-icons";
const SearchResult = ({ route, navigation }) => {
  console.log("route.params: ", route.params.filteredData);
  const renderSearchedItem = ({ item, index }) => (
    <View>
      <Card
        style={{
          width: 145,
          borderRadius: 20,
          margin: 18,
          marginTop: 50,
          zIndex: 5,

          alignItems: "center",
        }}
      >
        <Image
          source={{ uri: item.imageSrc }}
          style={{
            width: 120,
            height: 120,
            borderRadius: 100,
            marginTop: -60,
          }}
        />

        {Platform.OS === "ios" ? (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Food Detail", {
                name: item.name,
                foodItem: item,
              })
            }
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                marginTop: 10,
                textAlign: "center",
              }}
            >
              {item.name}
            </Text>
            <Text
              style={{
                color: "tomato",
                fontWeight: "bold",
                fontSize: 16,
                marginTop: 10,
                textAlign: "center",
                marginBottom: 15,
              }}
            >
              ${item.price}
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableNativeFeedback
            onPress={() =>
              navigation.navigate("Food Detail", {
                name: item.name,
                foodItem: item,
              })
            }
          >
            <View>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  marginTop: 60,
                  textAlign: "center",
                }}
              >
                {item.name}
              </Text>
              <Text
                style={{
                  color: "tomato",
                  fontWeight: "bold",
                  fontSize: 16,
                  marginTop: 15,
                }}
              >
                ${item.price}
              </Text>
            </View>
          </TouchableNativeFeedback>
        )}
      </Card>
    </View>
  );

  return (
    <View style={{ alignItems: "center", marginTop: 50 }}>
      <Ionicons
        name="arrow-back"
        size={35}
        color="black"
        onPress={navigation.goBack}
        style={{ alignSelf: "flex-start", marginLeft: 10 }}
      />
      <Text style={{ fontSize: 28, fontWeight: "bold", marginBottom: 5 }}>
        Found {route.params.filteredData.length} results
      </Text>
      <FlatList
        data={route.params.filteredData}
        numColumns={2}
        key={"*"}
        renderItem={renderSearchedItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};
export default SearchResult;
