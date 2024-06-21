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
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderRadius: 15,
        backgroundColor: Colors.GRAY,
        display: "flex",
        flexDirection: "row",
        gap: 15,
        marginBottom: 20
      }}
    >
      <Image
        source={{ uri: product.imageUrl }}
        style={{
          width: 120,
          height: 120,
          borderRadius: 10,
        }}
      />
      <View
        style={{
          flex: 1,
          gap: 5,
        }}
      >
        <View
          style={{
            position: "absolute",
            right: 0,
            backgroundColor: Colors.green,
            padding: 3,
            borderRadius: 5,
          }}
        >
          <Text
            style={{
              color: Colors.lightGray,
            }}
          >
            {product.condition}
          </Text>
        </View>
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 18,
            color: Colors.orange,
          }}
        >
          {product.name}
        </Text>
        <Text
          style={{
            fontFamily: "outfit",
            color: Colors.white,
          }}
        >
          About: {getFirst10Words(product.about)}
        </Text>
        <Text
          style={{
            fontFamily: "outfit-medium",
            color: Colors.white,
          }}
        >
          Owner: {product.owner}
        </Text>
        <Text
          style={{
            fontFamily: "outfit-medium",
            color: Colors.white,
          }}
        >
          Required: {product.barterProduct}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
