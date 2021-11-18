import React, { useContext, useState } from "react";
import { Text, StyleSheet, View, ScrollView, FlatList } from "react-native";
import { DishesContext } from "../HomeScreenContext";
import Card from "./Views/Card";
import Dish from "./Dish";
import DishImage from "./DishImage";
// import { FilteredItemsContext } from "../Navigation/FilteredItemsProvider";

const Dishes = (props) => {
  // const { dishes, setDishes } = useContext(DishesContext);
  // const { filteredItems, setFilteredItems } = useContext(FilteredItemsContext);
  return (
    <FlatList
      data={props.dishes}
      // data={filteredItems}
      horizontal
      renderItem={({ item, index }) => (
        <View>
          <DishImage item={item} />
          <Dish item={item} />
        </View>
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};
export default Dishes;
