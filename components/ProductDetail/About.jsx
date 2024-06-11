import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";

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
          color: "#fff",
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
          color: "#fff",
        }}
      >
        {product?.about}
      </Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View>
          <Text
            style={{
              fontSize: 15,
              marginTop: 10,
              fontFamily: "outfit-medium",
              color: "#fff",
            }}
          >
            Required: {product?.barterProduct}
          </Text>
          <Text
            style={{
              fontSize: 15,
              marginTop: 5,
              fontFamily: "outfit-medium",
              color: "#fff",
            }}
          >
            Condition: {product?.condition}
          </Text>
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: Colors.orange,
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 5,
          }}
        >
          <Text
            style={{
              fontFamily: "outfit-medium",
              color: "#fff",
            }}
          >
            Barter Now
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
