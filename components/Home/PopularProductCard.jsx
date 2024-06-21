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
        padding: 15,
        backgroundColor: Colors.GRAY,
        borderRadius: 15,
      }}
    >
      <Image
        source={{ uri: product?.imageUrl }}
        style={{
          width: 280,
          height: 190,
          borderRadius: 10,
        }}
      />

      <View style={{ marginTop: 10 }}>
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
            fontSize: 14,
            marginTop: 5,
            color: Colors.white,
          }}
        >
          Owner: {product.owner}
        </Text>
        <Text
          style={{
            fontFamily: "outfit",
            fontSize: 14,
            color: Colors.white,
            marginTop: 2,
          }}
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
          <View
            style={{
              backgroundColor: Colors.green,
              borderRadius: 5,
              width: 75,
              height: 25,
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              flexDirection: "row",
              padding: 5,
            }}
          >
            <Text
              style={{
                fontFamily: "outfit",
                color: Colors.GRAY,
                fontSize: 12,
              }}
            >
              {product.category}
            </Text>
          </View>

          <View
            style={{
              backgroundColor: Colors.orange,
              borderRadius: 5,
              width: 75,
              height: 25,
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              flexDirection: "row",
              padding: 5,
            }}
          >
            <Text
              style={{
                fontFamily: "outfit",
                color: Colors.GRAY,
                fontSize: 13,
              }}
            >
              {product.condition}
            </Text>
          </View>
          {/* <TouchableOpacity
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
          </TouchableOpacity> */}
        </View>
      </View>
    </TouchableOpacity>
  );
}
