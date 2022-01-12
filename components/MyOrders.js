import React, { useState, useEffect } from "react";
import { Text, StyleSheet } from "react-native";
import Firebase from "../config/firebase";
const MyOrders = () => {
  const auth = Firebase.auth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // fetch orders
    const fetchedOrders = [];
    Firebase.database()
      .ref("orders")
      .on("value", (querySnapShot) => {
        let data = querySnapShot.val() ? querySnapShot.val() : {};
        let fetchedOrdersObj = { ...data };
        for (const key in fetchedOrdersObj) {
          let fetchedOrder = fetchedOrdersObj[key];

          if (fetchedOrder.userId === auth.currentUser.uid) {
            fetchedOrder.id = key;
            fetchedOrders.push(fetchedOrder);
          }
        }
      });
    setOrders([...fetchedOrders]);
  }, []);

  return <Text>{JSON.stringify(orders.length)}</Text>;
};
export default MyOrders;
