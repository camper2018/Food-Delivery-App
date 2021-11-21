import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet, Button, Text } from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import { DishesContext } from "../../HomeScreenContext";
const PlusMinusButton = (props) => {
  const [count, setCount] = useState(props.item.amount);
  const { cartItems, setCartItems } = useContext(DishesContext);
  // console.log("cartItems in PlusMinus: ", cartItems);
  // useEffect(() => {
  //   setCount(props.item.amount);
  // }, [props.item.amount]);
  // const handleIncreaseCount = () => {
  //   let updatedCartItems;
  //   setCount((count) => {
  //     updatedCartItems = props.cartItems.map((item) => {
  //       if (item.id === props.item.id) {
  //         const updatedItem = {
  //           ...props.item,
  //           amount: count,
  //         };
  //         return updatedItem;
  //       }
  //       return item;
  //     });
  //     console.log("updatedCartItems: ", updatedCartItems);
  //     return count + 1;
  //   });

  //   props.setCartItems(updatedCartItems);
  const handleIncreaseCount = () => {
    setCount((count) => count + 1);
    // const updatedItems = props.cartItems;
    // updatedItems[props.index].amount = count + 1;
    const updatedItem = {
      ...props.item,
      amount: count + 1,
    };
    console.log("updatedItems in plus minus btn: ", updatedItem);
    // const filteredCartItems = cartItems.filter(
    //   (item) => item.id !== props.item.id
    // );
    // setCartItems([...filteredCartItems, updatedItem]);
    const updatedItems = [...cartItems];
    updatedItems[props.index] = updatedItem;
    setCartItems(updatedItems);
  };
  // const itemFound = cartItems.find((item) => item.id === props.item.id);
  // if (itemFound) {
  //   itemFound.amount++;

  // const updatedCart = props.cartItems.filter(
  //   (item) => item.id !== props.item.id
  // );
  // setCartItems([...updatedCart, { ...props.item, amount: count }]);
  // };
  const handleDecreaseCount = () => {
    setCount((count) => (count > 1 ? count - 1 : 0));
    const updatedItem = { ...props.item, amount: count > 1 ? count - 1 : 0 };
    console.log("updatedItems in plus minus btn: ", updatedItem);
    const filteredCartItems = cartItems.filter(
      (item) => item.id !== props.item.id
    );
    setCartItems([...filteredCartItems, updatedItem]);
  };
  // const handleDecreaseCount = () => {

  //   let updatedCartItems;
  //   setCount((count) => {
  //     updatedCartItems = props.cartItems.map((item) => {
  //       if (item.id === props.item.id) {
  //         const updatedItem = {
  //           ...props.item,
  //           amount: count,
  //         };
  //         return updatedItem;
  //       }
  //       return item;
  //     });
  //     console.log("updatedCartItems: ", updatedCartItems);
  //     return count - 1;
  //   });
  // };
  return (
    <View
      style={{
        // flex: 3,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",

        backgroundColor: "red",
        paddingVertical: 6,
        paddingHorizontal: 16,
      }}
    >
      <Text>
        {/* <View style={{ marginRight: 2 }}> */}
        <Icon
          name="minus"
          size={23}
          onPress={handleDecreaseCount}
          color="white"

          // paddingHorizontal="3"
        />

        {/* </View> */}
        <Text style={{ color: "white", fontSize: 19 }}>
          {"  "} {count} {"  "}
        </Text>
        {/* <View style={{ marginLeft: 2 }}> */}
        <Icon
          name="plus"
          size={23}
          onPress={handleIncreaseCount}
          color="white"
          // paddingHorizontal="3"
        />
        {/* </View> */}
      </Text>
    </View>
  );
};
export default PlusMinusButton;
