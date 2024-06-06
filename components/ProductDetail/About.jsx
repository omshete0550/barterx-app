import { View, Text } from "react-native";
import React from "react";

export default function About({ product }) {
  return (
    <View
      style={{
        padding: 20,
        backgroundColor: "#FFFFFF",
        // height: "100%",
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 20,
        }}
      >
        About
      </Text>
      <Text
        style={{
          fontSize: 15,
          marginTop: 10,
          lineHeight: 25,
          fontFamily: "outfit",
        }}
      >
        {product?.about}
      </Text>
      <Text
        style={{
          fontSize: 15,
          marginTop: 10,
          fontFamily: "outfit-medium",
        }}
      >
        Required: {product?.barterProduct}
      </Text>
      <Text
        style={{
          fontSize: 15,
          marginTop: 5,
          fontFamily: "outfit-medium",
        }}
      >
        Condition: {product?.condition}
      </Text>
    </View>
  );
}
