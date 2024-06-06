import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Intro({ product }) {
  const router = useRouter();
  return (
    <View>
      <View
        style={{
          position: "absolute",
          zIndex: 10,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          padding: 20,
        }}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back-circle" size={40} color="black" />
        </TouchableOpacity>
        <Ionicons name="heart-outline" size={40} color="black" />
      </View>
      <Image
        source={{ uri: product?.imageUrl }}
        style={{
          width: "100%",
          height: 340,
        }}
      />

      <View
        style={{
          padding: 20,
          backgroundColor: "#fff",
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          marginTop: -15,
        }}
      >
        <Text
          style={{
            fontSize: 26,
            fontFamily: "outfit-bold",
          }}
        >
          {product?.name}
        </Text>
        {/* <Text
          style={{
            fontSize: 15,
            marginTop: 5,
            fontFamily: "outfit",
          }}
        >
          {product?.about}
        </Text> */}
        <Text
          style={{
            fontSize: 15,
            marginTop: 5,
            fontFamily: "outfit",
          }}
        >
          Onwer: {product?.owner}
        </Text>
        {/* <Text
          style={{
            fontSize: 15,
            marginTop: 5,
            fontFamily: "outfit",
          }}
        >
          Required: {product?.barterProduct}
        </Text>
        <Text
          style={{
            fontSize: 15,
            marginTop: 5,
            fontFamily: "outfit",
          }}
        >
          Condition: {product?.condition}
        </Text> */}
      </View>
    </View>
  );
}
