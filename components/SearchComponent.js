import React, { useState, useContext, useRef } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { DishesContext } from "../HomeScreenContext";
const SearchComponent = ({ navigation, route }) => {
  const { dishes } = useContext(DishesContext);
  const [filteredData, setFilteredData] = useState([]);
  const [iconColor, setIconColor] = useState("grey");
  const inputRef = useRef();
  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      const newData = dishes.filter((item) => {
        const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
        const itemDescription = item.description
          ? item.description.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return (
          itemData.indexOf(textData) > -1 ||
          itemDescription.indexOf(textData) > -1
        );
      });
      setFilteredData(newData);
    }
  };

  return (
    <View style={styles.container}>
      <Icon name="search" color={iconColor} size={30} />
      <TextInput
        ref={inputRef}
        placeholder="Search here..."
        onChangeText={(text) => searchFilterFunction(text)}
        onClear={() => searchFilterFunction("")}
        style={{
          marginHorizontal: 15,
          fontSize: 18,
          width: 200,
        }}
        clearTextOnFocus={true}
        onBlur={() => {
          inputRef.current.clear();
          navigation.navigate("Search Result", {
            filteredData: filteredData,
          });
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    borderColor: "#fffafa",
    justifyContent: "flex-start",
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 100,
    padding: 16,
    margin: 30,
    backgroundColor: "#ececec",
  },
});
export default SearchComponent;
