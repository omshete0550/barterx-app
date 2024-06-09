import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";

export default function CategoryCard({ category, onCategoryPress }) {
  return (
    <TouchableOpacity onPress={() => onCategoryPress(category)}>
      <View
        style={{
          // padding: 15,
          // backgroundColor: Colors.PRIMARY,
          marginRight: 10,
          // borderRadius: 99,
        }}
      >
        <Image
          source={{ uri: category.icon }}
          style={{
            width: 75,
            height: 75,
            borderRadius: 20
          }}
        />
        <Text
          style={{
            fontFamily: "outfit-medium",
            textAlign: "center",
            fontSize: 12,
            marginTop: 5,
            color: '#fff'
          }}
        >
          {category.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
