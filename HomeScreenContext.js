import React, { useState, createContext } from "react";
import DISHES from "./components/data";

const DishesContext = createContext();

const DishesContextProvider = ({ children }) => {
  // const [state, setState] = useState({
  //   filterDishes: (category) =>
  //     DISHES.filter((dish) => dish.category === category),
  //   filteredDishes: [],
  //   favoriteDishes: [{ name: "Biryani" }],
  //   dishes: DISHES,
  // });
  const [favoriteDishes, setFavoriteDishes] = useState([]);
  const [dishes, setDishes] = useState(DISHES);
  const [cartItems, setCartItems] = useState([]);
  return (
    <DishesContext.Provider
      // value={{ ...state, setState: (data) => setState({ ...state, ...data }) }}
      value={{
        favoriteDishes,
        setFavoriteDishes,
        dishes,
        setDishes,
        cartItems,
        setCartItems,
      }}
    >
      {children}
    </DishesContext.Provider>
  );
};
export { DishesContext, DishesContextProvider };
