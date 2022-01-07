import React, { useState, useContext, useEffect, useCallback } from "react";
import { View, StyleSheet, Button, Text, TextInput } from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import { DishesContext } from "../../HomeScreenContext";

const PlusMinusButton = (props) => {
  const [count, setCount] = useState(props.item.amount);
  const { cartItems, setCartItems } = useContext(DishesContext);

  const handleIncreaseCount = () => {
    setCount((count) => Number(count) + 1);

    const updatedItem = {
      ...props.item,
      amount: Number(count) + 1,
    };

    const updatedItems = [...cartItems];
    updatedItems[props.index] = updatedItem;
    setCartItems(updatedItems);
  };

  const handleDecreaseCount = () => {
    setCount((count) => (Number(count) > 1 ? Number(count) - 1 : 0));
    const updatedItem = {
      ...props.item,
      amount: Number(count) > 1 ? Number(count) - 1 : 0,
    };
    const filteredCartItems = cartItems.filter(
      (item) => item.id !== props.item.id
    );
    setCartItems([...filteredCartItems, updatedItem]);
  };

  const handleChangeText = (text) => {
    const updatedItem = {
      ...props.item,
      amount: Number(text),
    };

    const updatedItems = [...cartItems];
    updatedItems[props.index] = updatedItem;
    setCartItems(updatedItems);
    setCount(Number(text));
  };

  return (
    <View
      style={{
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        backgroundColor: "red",
        paddingVertical: 6,
        paddingHorizontal: 16,
      }}
    >
      <Icon
        name="minus"
        size={23}
        onPress={handleDecreaseCount}
        color="white"
      />

      <TextInput
        style={{
          color: "white",
          fontSize: 19,
          borderBottomColor: "white",
          width: 25,
          marginLeft: 10,
          marginRight: 5,
        }}
        value={count.toString()}
        keyboardType="number-pad"
        onChangeText={handleChangeText}
      />
      <Icon name="plus" size={23} onPress={handleIncreaseCount} color="white" />
    </View>
  );
};
export default PlusMinusButton;
