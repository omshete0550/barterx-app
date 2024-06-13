import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";
import { useRouter } from "expo-router";

export default function PopularProductCard({ product }) {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => router.push("/productdetail/" + product.id)}
      style={{
        marginLeft: 20,
        padding: 10,
        backgroundColor: Colors.GRAY,
        borderRadius: 15,
      }}
    >
      <Image
        source={{ uri: product?.imageUrl }}
        style={{
          width: 250,
          height: 180,
          borderRadius: 15,
          backgroundColor: "#f3f3f3",
        }}
      />

      <View style={{ marginTop: 7 }}>
        <Text
          style={{ fontFamily: "outfit-bold", fontSize: 17, color: "#fff" }}
        >
          {product.name}
        </Text>
        <Text
          style={{
            fontFamily: "outfit",
            fontSize: 13,
            marginTop: 5,
            color: Colors.GOLD,
          }}
        >
          Owner: {product.owner}
        </Text>
        <Text
          style={{ fontFamily: "outfit", fontSize: 13, color: Colors.GOLD }}
        >
          Required: {product.barterProduct}
        </Text>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 15,
          }}
        >
          <Text
            style={{
              fontFamily: "outfit",
              backgroundColor: Colors.blue,
              color: "#fff",
              fontSize: 13,
              padding: 3,
              borderRadius: 5,
              width: 75,
              height: 25,
              textAlign: "center",
            }}
          >
            {product.category}
          </Text>
          <TouchableOpacity
            style={{
              borderRadius: 15,
            }}
          >
            <Text
              style={{
                fontFamily: "outfit-bold",
                backgroundColor: Colors.orange,
                color: "#fff",
                fontSize: 15,
                paddingHorizontal: 25,
                paddingVertical: 10,
                borderRadius: 15
              }}
            >
              Barter Now
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}
