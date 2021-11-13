import React, { useContext, useState } from "react";
import { Image } from "react-native";
import Card from "./Views/Card";

const DishImage = ({ item }) => {
  return (
    <Card
      style={{
        borderRadius: 100,
        width: 160,
        height: 160,
        // marginLeft: 60,
        marginLeft: 50,
        // marginTop: 30,
        zIndex: 5,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={item.imageSrc}
        style={{
          width: 160,
          height: 160,
          borderRadius: 100,
        }}
      />
    </Card>
  );
};
export default DishImage;
