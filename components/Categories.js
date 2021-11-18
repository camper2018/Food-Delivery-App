import React, { useContext, useState } from "react";
import { Text, StyleSheet, View, ScrollView, FlatList } from "react-native";
import Category from "./Category";
// import Dish from "./Dish";
// import { FilteredItemsContext } from "../Navigation/FilteredItemsProvider";
import meals from "./data";

const Categories = (props) => {
  const categories = ["Foods", "Snacks", "Drinks", "Sauces", "Desserts"];
  // const { filteredItems, setFilteredItems } = useContext(FilteredItemsContext);
  const [visibility, setVisibility] = useState({
    Foods: true,
    Snacks: false,
    Drinks: false,
    Sauces: false,
    Desserts: false,
  });

  const handleVisibility = (id) => {
    // setVisibility((state) => {
    //   return {
    //     Foods: false,
    //     Snacks: false,
    //     Drinks: false,
    //     Sauces: false,
    //     Desserts: false,
    //     [id]: true,
    //   };
    // });
    setVisibility({
      Foods: false,
      Snacks: false,
      Drinks: false,
      Sauces: false,
      Desserts: false,
      [id]: true,
    });
  };
  const filterDish = (category) => {
    const filtered = meals.filter((dish) => dish.category === category);
    // setFilteredItems(filtered);
  };
  return (
    <FlatList
      data={categories}
      horizontal
      renderItem={({ item, index }) => (
        <Category
          category={item}
          id={item}
          index={index}
          handleVisibility={handleVisibility}
          visibility={visibility}
          // selectedCategory={props.selectedCategory}
          setSelectedCategory={props.setSelectedCategory}
          setData={props.setData}
          data={props.data}
          // filterDish={filterDish}
        />
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};
export default Categories;
