import React, { useState, createContext, useEffect } from "react";
import { Alert } from "react-native";
import DISHES from "./components/data";
import Firebase from "./config/firebase";
const DishesContext = createContext();

const DishesContextProvider = ({ children }) => {
  const [favoriteDishes, setFavoriteDishes] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  // const [orders, setOrders] = useState([]);
  const auth = Firebase.auth();
  // The function that fetches dishes image url from fireStore and returns it.
  const getImageUrl = async (storageRef, dish) => {
    return await storageRef.child(dish.imageName).getDownloadURL();
  };
  // function that allow us to add DISHES to the firebase real time database
  // Just run it one time to add data to the db.
  const addDishes = () => {
    DISHES.forEach((dish) => {
      let storageRef = Firebase.storage().ref();
      getImageUrl(storageRef, dish).then((url) => {
        dish.imageSrc = url;
        Firebase.database().ref("/dishes").push(dish);
      });
    });
    Alert.alert("Action!, A new dish was created");
  };

  useEffect(() => {
    // fetch dishes from the firebase database
    // and update dishes context/state
    let fetchedDishes = [];

    Firebase.database()
      .ref("/dishes")
      .on("value", (querySnapShot) => {
        let data = querySnapShot.val() ? querySnapShot.val() : {};
        let fetchedDishesObj = { ...data };
        // console.log(fetchedDishesObj);

        for (const key in fetchedDishesObj) {
          let fetchedDish = fetchedDishesObj[key];
          fetchedDish.id = key;
          // console.log("fetchedDish: *******", fetchedDish);
          fetchedDishes.push(fetchedDish);
        }

        // fetchedDishes = Object.values(fetchedDishesObj);
        setDishes([...fetchedDishes]);
      });

    // fetch orders
    // let fetchedOrders = [];
    // Firebase.database()
    //   .ref("/orders")
    //   .on("value", (querySnapShot) => {
    //     let data = querySnapShot.val() ? querySnapShot.val() : {};
    //     let fetchedOrdersObj = { ...data };

    //     for (const key in fetchedOrdersObj) {
    //       let fetchedOrder = fetchedOrdersObj[key];

    //       if (fetchedOrder.userId === auth.currentUser.uid) {
    //         // console.log("hurray");
    //         fetchedOrder.id = key;
    //         fetchedOrders.push(fetchedOrder);
    //       }
    //       // console.log("fetchedDish: *******", fetchedDish);
    //     }

    //     // fetchedDishes = Object.values(fetchedDishesObj);
    //     setOrders([...fetchedOrders]);
    //   });

    // addDishes();
  }, []);

  // console.log("orders*******: ", orders);
  return (
    <DishesContext.Provider
      value={{
        favoriteDishes,
        setFavoriteDishes,
        dishes,
        setDishes,
        cartItems,
        setCartItems,
        // orders,
        // setOrders,
      }}
    >
      {children}
    </DishesContext.Provider>
  );
};
export { DishesContext, DishesContextProvider };
