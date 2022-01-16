import React, { useState, useEffect } from "react";
import { Text, StyleSheet, FlatList, View } from "react-native";
import Firebase from "../config/firebase";
import Card from "./Views/Card";
import { MaterialIcons } from "@expo/vector-icons";
const MyOrders = ({ navigation, route }) => {
  const auth = Firebase.auth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      // fetch orders
      const fetchedOrders = [];
      try {
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
        setOrders(fetchedOrders);
      } catch (e) {
        console.log(e);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [navigation]);
  // useEffect(() => {
  //   // fetch orders
  //   const fetchedOrders = [];
  //   Firebase.database()
  //     .ref("orders")
  //     .on("value", (querySnapShot) => {
  //       let data = querySnapShot.val() ? querySnapShot.val() : {};
  //       let fetchedOrdersObj = { ...data };
  //       for (const key in fetchedOrdersObj) {
  //         let fetchedOrder = fetchedOrdersObj[key];

  //         if (fetchedOrder.userId === auth.currentUser.uid) {
  //           fetchedOrder.id = key;
  //           fetchedOrders.push(fetchedOrder);
  //         }
  //       }
  //     });
  //   setOrders([...fetchedOrders]);
  // }, []);
  const renderOrder = ({ item, index }) => {
    return (
      <Card style={{ margin: 10 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <Text
              style={{ marginBottom: 10, fontWeight: "bold", color: "tomato" }}
            >
              Order# : {item.id}
            </Text>
            <Text style={{ fontWeight: "bold", fontStyle: "italic" }}>
              {item.date.split(" ").slice(0, 4).join(" ")}
            </Text>
          </View>

          <MaterialIcons
            name="keyboard-arrow-right"
            size={32}
            onPress={() =>
              navigation.navigate("Order Detail", {
                order: item,
              })
            }
          />
        </View>
      </Card>
    );
  };

  return (
    <FlatList
      data={orders}
      renderItem={renderOrder}
      showsVerticalScrollIndicator={false}
    />
  );
};
export default MyOrders;
