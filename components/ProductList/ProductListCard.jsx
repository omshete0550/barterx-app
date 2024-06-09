import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";
import { useRouter } from "expo-router";
export default function ProductListCard({ product }) {
  const getFirst10Words = (text) => {
    const words = text.split(" ");
    return words.slice(0, 10).join(" ") + (words.length > 10 ? "..." : "");
  };

  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => router.push("/productdetail/" + product.id)}
      style={{
        padding: 10,
        margin: 10,
        borderRadius: 15,
        backgroundColor: Colors.GRAY,
        display: "flex",
        flexDirection: "row",
        gap: 10,
      }}
    >
      <Image
        source={{ uri: product.imageUrl }}
        style={{
          width: 120,
          height: 120,
          borderRadius: 15,
        }}
      />
      <View
        style={{
          flex: 1,
          gap: 5,
        }}
      >
        <Text
          style={{
            position: "absolute",
            right: 0,
            backgroundColor: Colors.orange,
            padding: 3,
            color: "#fff",
            borderRadius: 5,
          }}
        >
          {product.condition}
        </Text>
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 18,
            color: Colors.GOLD,
          }}
        >
          {product.name}
        </Text>
        <Text
          style={{
            fontFamily: "outfit",
            color: "#fff",
          }}
        >
          {getFirst10Words(product.about)}
        </Text>
        <Text
          style={{
            fontFamily: "outfit-medium",
            color: "#fff",
          }}
        >
          Owner: {product.owner}
        </Text>
        <Text
          style={{
            fontFamily: "outfit-medium",
            color: "#fff",
          }}
        >
          Required: {product.barterProduct}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
