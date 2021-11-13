import React, { useState, useContext } from "react";
import { Text, StyleSheet, View, TouchableWithoutFeedback } from "react-native";
import { Button } from "react-native-elements";
import { DishesContext } from "../HomeScreenContext";
const Category = ({
  category,
  id,
  index,
  handleVisibility,
  visibility,
  filterDish,
}) => {
  const isVisible = visibility[id];
  console.log(id);
  const { dishes, setDishes } = useContext(DishesContext);
  return (
    <View>
      {/* <Button
        title={category}
        buttonStyle={{
          paddingBottom: 2,
          backgroundColor: "transparent",
        }}
        titleStyle={{ color: "tomato" }}
        onPress={() => {
          handleVisibility(id);
          // filterDish(category);
        }}
      /> */}
      <TouchableWithoutFeedback
        onPress={() => {
          handleVisibility(id);
          // filterDish(category);
        }}

        // style={{
        //   padding: 5,
        //   // paddingBottom: 2,
        //   // backgroundColor: "transparent",
        //   color: "tomato",
        // }}
        // buttonStyle={{
        //   paddingBottom: 2,
        //   backgroundColor: "transparent",
        // }}
      >
        <Text style={{ color: "tomato", paddingHorizontal: 10 }}>
          {category}
        </Text>
      </TouchableWithoutFeedback>
      <View
        style={{
          // marginVertical: 1,
          // marginVertical: 8,
          // border: "none",
          borderBottomColor: "tomato",
          borderBottomWidth: 3,
          marginHorizontal: 10,
          paddingHorizontal: 5,
          display: !isVisible ? "none" : "block",
          marginBottom: 35,
        }}
      >
        <Text></Text>
      </View>
    </View>
  );
};
export default Category;
