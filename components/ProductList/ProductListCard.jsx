import { View, Text, Image } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";
export default function ProductListCard({ product }) {
  const getFirst10Words = (text) => {
    const words = text.split(" ");
    return words.slice(0, 10).join(" ") + (words.length > 10 ? "..." : "");
  };

  return (
    <View
      style={{
        padding: 10,
        margin: 10,
        borderRadius: 15,
        backgroundColor: "#fff",
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
        <Text style={{
          position: "absolute",
          right: 0,
          backgroundColor: '#fb5c36',
          padding: 3,
          color: '#fff',
          borderRadius: 5
        }}>{product.condition}</Text>
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 18,
          }}
        >
          {product.name}
        </Text>
        <Text
          style={{
            fontFamily: "outfit",
            color: Colors.GRAY,
          }}
        >
          {getFirst10Words(product.about)}
        </Text>
        <Text
          style={{
            fontFamily: "outfit-medium",
          }}
        >
          Owner: {product.owner}
        </Text>
        <Text
          style={{
            fontFamily: "outfit-medium",
          }}
        >
          Required: {product.barterProduct}
        </Text>
      </View>
    </View>
  );
}
