import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";
import { useRouter } from "expo-router";

export default function ProductListCard({ product }) {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => router.push("/productdetail/" + product?.id)}
      style={{
        backgroundColor: Colors.GRAY,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        marginTop: 15,
      }}
    >
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
        <Text style={{ fontFamily: "outfit-bold", fontSize: 18, color: Colors.GOLD, marginBottom: 10 }}>
          {product?.name}
        </Text>
        <Text
          style={{ fontFamily: "outfit", fontSize: 12, color: '#fff' }}
        >
          {product?.about}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
