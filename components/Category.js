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
  setSelectedCategory,
  setData,
  data,
}) => {
  const isVisible = visibility[id];

  const { dishes, setDishes } = useContext(DishesContext);
  const filteredData = dishes.filter((dish) => dish.category === category);
  return (
    <View>
      <Button
        title={category}
        buttonStyle={{
          paddingBottom: 2,
          backgroundColor: "transparent",
        }}
        titleStyle={{ color: "tomato" }}
        onPress={() => {
          handleVisibility(id);
          setData(filteredData);
        }}
      />
      {/* <TouchableWithoutFeedback
        onPress={() => {
          handleVisibility(id);
          // setSelectedCategory(category);
          setData(filteredData);
        }}


      >
        <Text style={{ color: "tomato", paddingHorizontal: 10 }}>
          {category}
        </Text>
      </TouchableWithoutFeedback> */}
      <View
        style={{
          marginVertical: 2,

          borderBottomColor: "tomato",
          borderBottomWidth: 3,
          marginHorizontal: 10,
          paddingHorizontal: 25,
          display: !isVisible ? "none" : "flex",
          marginBottom: 25,
        }}
      ></View>
    </View>
  );
};
export default Category;
