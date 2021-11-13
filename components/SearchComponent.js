import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
const SearchComponent = (props) => {
  return (
    <View style={styles.container}>
      <Icon name="search" color="grey" size={30} />
      <TextInput
        placeholder="Search"
        style={{
          marginHorizontal: 15,
          fontSize: 18,
          width: 200,
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
