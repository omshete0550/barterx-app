import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";
import { useRouter } from "expo-router";

export default function ProductListCard({ product }) {
  const getFirst10Words = (text) => {
    const words = text.split(" ");
    return words.slice(0, 10).join(" ") + (words.length > 10 ? "..." : "");
  };

  console.log(product);

  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => router.push("/productdetail/" + product?.id)}
      style={{
        backgroundColor: Colors.GRAY,
        borderRadius: 15,
        marginTop: 15,
        // width: '50%',
        position: 'relative',
      }}
    >
      <View style={{
        position: 'absolute',
        right: 0,
        backgroundColor: Colors.green,
        zIndex: 1,
        padding: 7,
        borderTopRightRadius: 15,
        borderBottomLeftRadius: 5
      }}>
        <Text style={{
          color: Colors.lightGray,
          textTransform: 'capitalize'
        }}>{product?.condition}</Text>
      </View>
      <Image
        source={{ uri: product?.imageUrl }}
        style={{
          width: "100%",
          height: 250,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
        }}
      />

      <View
        style={{
          padding: 10,
        }}
      >
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 18,
            color: Colors.GOLD,
            marginBottom: 10,
          }}
        >
          {product?.name}
        </Text>
        <Text style={{ fontFamily: "outfit", fontSize: 12, color: "#fff" }}>
          {getFirst10Words(product?.about)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
