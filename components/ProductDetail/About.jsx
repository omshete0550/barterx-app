import { View, Text } from "react-native";
import React from "react";

export default function About({ product }) {
  return (
    <View
      style={{
        padding: 20,
        // backgroundColor: "#FFFFFF",
        // height: "100%",
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 20,
          color: '#fff'
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
          color: '#fff'
        }}
      >
        {product?.about}
      </Text>
      <Text
        style={{
          fontSize: 15,
          marginTop: 10,
          fontFamily: "outfit-medium",
          color: '#fff'
        }}
      >
        Required: {product?.barterProduct}
      </Text>
      <Text
        style={{
          fontSize: 15,
          marginTop: 5,
          fontFamily: "outfit-medium",
          color: '#fff'
        }}
      >
        Condition: {product?.condition}
      </Text>
    </View>
  );
}
