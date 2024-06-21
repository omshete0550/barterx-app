import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";

export default function CategoryCard({ category, onCategoryPress }) {

  const getFirst10Words = (text) => {
    const words = text.split(" ");
    return words.slice(0, 10).join(" ") + (words.length > 10 ? "..." : "");
  };
  
  return (
    <TouchableOpacity onPress={() => onCategoryPress(category)}>
      <View
        style={{
          marginRight: 10,
        }}
      >
        <Image
          source={{ uri: category.icon }}
          style={{
            width: 90,
            height: 90,
            borderRadius: 99,
          }}
        />
        <Text
          style={{
            fontFamily: "outfit-bold",
            textAlign: "center",
            fontSize: 16,
            marginTop: 5,
            color: "#fff",
          }}
        >
          {getFirst10Words(category.name)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
