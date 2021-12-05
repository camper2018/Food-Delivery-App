import React, { useContext, useState } from "react";
import { Text, StyleSheet, View, ScrollView, FlatList } from "react-native";
import Category from "./Category";
import meals from "./data";

const Categories = (props) => {
  const categories = ["Foods", "Snacks", "Drinks", "Sauces", "Desserts"];

  const [visibility, setVisibility] = useState({
    Foods: true,
    Snacks: false,
    Drinks: false,
    Sauces: false,
    Desserts: false,
  });

  const handleVisibility = (id) => {
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
  };
  return (
    <FlatList
      data={categories}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={({ item, index }) => (
        <Category
          category={item}
          id={item}
          index={index}
          handleVisibility={handleVisibility}
          visibility={visibility}
          setSelectedCategory={props.setSelectedCategory}
          setData={props.setData}
          data={props.data}
        />
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};
export default Categories;
